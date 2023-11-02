using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ia_azfunc_api.Models.Flash;
using ia_azfunc_api.Models.Flash.Search;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;

namespace ia_azfunc_api.InternalFunctions.Flash;
public class FilterLoader : FlashLoader
{
    public FilterLoader(ILogger log) : base(log) { }
    
    // This method returns a list of search filters given a search criteria
    public async Task<Filter[]> LoadFilters( string searchQuery )
    {
        _log.LogCritical($"Loading search filters");

        Task<Piece[]> pieceTask = _searchPieces(searchQuery);
        Task<Sheet[]> sheetTask = _searchSheets(searchQuery);

        await Task.WhenAll( pieceTask, sheetTask );

        var pieces = pieceTask.Result;
        var sheets = sheetTask.Result;
        
        _log.LogCritical($"Loaded {pieces.Length} pieces and {sheets.Length} sheets.");

        var filters = new List<Filter>();
        
        // Add piece tags
        filters.AddRange(
            pieces
                .SelectMany( p => p.Tags )
                .Select( t => new Filter()
                {
                    Label = t,
                    Type = FilterType.PieceTag
                })
        );
        
        // Add piece titles
        filters.AddRange(
            pieces.Select( p => new Filter()
            {
                Label = p.Title,
                Type = FilterType.PieceTitle
            })
        );
        
        // Add sheet tags
        filters.AddRange(
            sheets
                .SelectMany( s => s.Tags )
                .Select( t => new Filter()
                {
                    Label = t,
                    Type = FilterType.SheetTag
                })
        );
        
        // Add sheet filters
        filters.AddRange(
            sheets.Select( s => new Filter()
                {
                    Label = s.Title,
                    Type = FilterType.SheetTitle,
                    Count = s.PieceIds.Length
                })
        );
        

        // Sort out the count value for each of the tags. ( count shows how many pieces / sheets have that tag )
        filters = filters
            // Count = how many times the tag appears in the list ( thats how many sheets / pieces have it )
            .Select( f => {
                if ( f.Type == FilterType.PieceTag || f.Type == FilterType.SheetTag )
                {
                    f.Count = filters.Count( fi => fi.Label == f.Label );
                }
                return f;
            })
            .Distinct( new FilterComparer() )
            .ToList();

        return filters.ToArray();
    }
    
    private async Task<Sheet[]> _searchSheets(string query )
    {
        var sqlQuery = new QueryDefinition(query: "SELECT * FROM c");
        
        if (query != "")
        {
            sqlQuery = new QueryDefinition(
                    // TODO: ARRAY_CONTAINS is not sufficient here. Need a way to search the array of tags that includes incomplete matches
                    query: "SELECT * FROM c WHERE CONTAINS(LOWER(c.title), @search_query) OR ARRAY_CONTAINS(c.tags, @search_query)"
                )
                .WithParameter("@search_query", query);
        }

        using FeedIterator<Sheet> sheetFeed = _sheetContainer.GetItemQueryIterator<Sheet>(queryDefinition: sqlQuery);
        var sheetAccumulator = new List<Sheet>();
        while (sheetFeed.HasMoreResults)
        {
            FeedResponse<Sheet> piecePage = await sheetFeed.ReadNextAsync();
            sheetAccumulator.AddRange( (Sheet[]) piecePage );
        }

        _log.LogCritical("Sheets searched.");
        return sheetAccumulator.ToArray();
    }
    
    private async Task<Piece[]> _searchPieces(string query)
    {        
        var sqlQuery = new QueryDefinition(query: "SELECT * FROM c");
        
        if (query != "")
        {
            sqlQuery = new QueryDefinition(
                    query: "SELECT * FROM c WHERE CONTAINS(LOWER(c.title), @search_query) OR ARRAY_CONTAINS(c.tags, @search_query)"
                )
                .WithParameter("@search_query", query);
        }

        using FeedIterator<Piece> pieceFeed = _pieceContainer.GetItemQueryIterator<Piece>(queryDefinition: sqlQuery);
        var pieceAccumulator = new List<Piece>();
        while (pieceFeed.HasMoreResults)
        {
            FeedResponse<Piece> piecePage = await pieceFeed.ReadNextAsync();
            pieceAccumulator.AddRange( (Piece[]) piecePage );
        }

        _log.LogCritical("Flash pieces searched.");
        return pieceAccumulator.ToArray();
    }
}