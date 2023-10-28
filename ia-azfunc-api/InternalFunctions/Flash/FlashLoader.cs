using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Threading.Tasks;
using ia_azfunc_api.Models.Flash;
using ia_azfunc_api.Models.Flash.Search;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Linq;
using Microsoft.Extensions.Logging;

namespace ia_azfunc_api.InternalFunctions.Flash;

public class FlashLoader
{
    private string _artistId { get; set; }
    private ILogger _log { get; set; }
    private CosmosClient _cosmosClient { get; set; }
    private int _page { get; set; }
    private Container _sheetContainer { get; set;}
    private Container _pieceContainer { get; set;}
    
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
    
    // Instantiates a class that can load flash data
    public FlashLoader(
        int startingPage,
        ILogger log
    )
    {
        _log = log;
        _artistId = Environment.GetEnvironmentVariable("PUCK_ARTIST_ID");
        _cosmosClient = new CosmosClient(connectionString: Environment.GetEnvironmentVariable("CosmosDBConnection"));
        _sheetContainer = _cosmosClient.GetContainer(databaseId: "puck", containerId: "flash_sheets");
        _pieceContainer = _cosmosClient.GetContainer(databaseId: "puck", containerId: "flash_pieces");
        _page = startingPage;
    }
    
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
                    Type = FilterType.Tag
                })
        );
        
        // Add piece titles
        filters.AddRange(
            pieces.Select( p => new Filter()
            {
                Label = p.Title,
                Type = FilterType.Piece
            })
        );
        
        // Add sheet tags
        filters.AddRange(
            sheets
                .SelectMany( s => s.Tags )
                .Select( t => new Filter()
                {
                    Label = t,
                    Type = FilterType.Tag
                })
        );
        
        // Add sheet filters
        filters.AddRange(
            sheets.Select( s => new Filter()
                {
                    Label = s.Title,
                    Type = FilterType.Sheet,
                    Count = s.PieceIds.Length
                })
        );
        

        // Sort out the count value for each of the tags. ( count shows how many pieces / sheets have that tag )
        filters = filters
            // Count = how many times the tag appears in the list ( thats how many sheets / pieces have it )
            .Select(f => {
                if (f.Type == FilterType.Tag)
                {
                    f.Count = filters.Count( fi => fi.Label == f.Label );
                }
                return f;
            })
            .Distinct( new FilterComparer() )
            .ToList();

        return filters.ToArray();
    }
    
    // This method loads only flash pieces from cosmos.
    public async Task<Piece[]> LoadPieces()
    {
        _log.LogCritical($"Loading flash pieces");

        using FeedIterator<Piece> pieceFeed = _pieceContainer.GetItemQueryIterator<Piece>(
            queryText: "SELECT * FROM c"
        );

        var pieceAccumulator = new List<Piece>();
        while (pieceFeed.HasMoreResults)
        {
            FeedResponse<Piece> piecePage = await pieceFeed.ReadNextAsync();
            pieceAccumulator.AddRange( (Piece[]) piecePage );
        }

        _log.LogCritical("Flash pieces loaded.");
        return pieceAccumulator.ToArray();
    }
    
    // This method loads sheets from cosmos and optionally populates them with flash data
    public async Task<Sheet[]> LoadSheets( Filter[] filters, bool populate = false )
    {
        _log.LogCritical($"Loading {( populate ? "populated" : "unpopulated" )} sheets.");

        string[] sheetTitles = filters
            .Where(f => f.Type == FilterType.Sheet)
            .Select(f => f.Label)
            .ToArray();

        string[] pieceTitles = filters
            .Where( f => f.Type == FilterType.Piece )
            .Select( f => f.Label )
            .ToArray();

        string[] tags = filters
            .Where( f => f.Type == FilterType.Tag )
            .Select( f => f.Label )
            .ToArray();
        
        _log.LogCritical($"{tags.Length} tags - {pieceTitles.Length} peices - {sheetTitles.Length} sheets");
        
        // Setup sheet feed
        using FeedIterator<Sheet> sheetFeed = _sheetContainer.GetItemQueryIterator<Sheet>(
            queryText: "SELECT * FROM c"
        );

        // Load sheets using the accumulator
        var sheetAccumulator = new List<Sheet>();
        while (sheetFeed.HasMoreResults)
        {
            FeedResponse<Sheet> sheetPage = await sheetFeed.ReadNextAsync();
            sheetAccumulator.AddRange( (Sheet[]) sheetPage );
        }
        _log.LogCritical("Flash sheets loaded.");

        // If populate is set to true, add the piece data for each of the pieces in the flash sheet.
        if ( populate )
        {
            _log.LogCritical("Populating sheets.");
            // Create complete list of piece IDs.
            var pieceIds = sheetAccumulator.SelectMany( s => s.PieceIds );
            string pieceQuery = $"SELECT * FROM c WHERE c.id IN (\"{ string.Join("\",\"", pieceIds )}\")";
            
            // Build piece feed
            using FeedIterator<Piece> pieceFeed = _pieceContainer.GetItemQueryIterator<Piece>( queryText: pieceQuery );

            // Send query and add pieces to accumulator.
            var pieceAccumulator = new List<Piece>();
            while (pieceFeed.HasMoreResults)
            {
                FeedResponse<Piece> piecePage = await pieceFeed.ReadNextAsync();
                pieceAccumulator.AddRange( (Piece[]) piecePage );
            }

            // Assign each of the pieces to their respective sheets
            foreach ( var sheet in sheetAccumulator )
            {
                sheet.Pieces = pieceAccumulator
                    .Where( p => sheet.PieceIds.Contains(p.Id) )
                    .ToArray();
            }
            _log.LogCritical("Sheets populated.");
        }
        
        return sheetAccumulator.ToArray();
    }


}