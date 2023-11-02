using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ia_azfunc_api.Models.Flash;
using ia_azfunc_api.Models.Flash.Search;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Linq;
using Microsoft.Extensions.Logging;

namespace ia_azfunc_api.InternalFunctions.Flash;

public class SheetLoader : FlashLoader
{
    public SheetLoader( ILogger log ) : base(log) { }

    // loads a parent flash sheet given a piece's id
    private async Task<Sheet[]> _getSheetsByPieceId(string[] pieceIds)
    {
        // Get iterator for sheets
        IOrderedQueryable<Sheet> sheetQueryable = _sheetContainer.GetItemLinqQueryable<Sheet>();
        // LINQ:
        var sheetMatches = sheetQueryable
            .Where( s => s.PieceIds.Where( id => pieceIds.Contains(id) ).Count() > 0 );
        var sheetIterator = sheetMatches.ToFeedIterator();
        
        // Query sheets
        var sheetAccumulator = new List<Sheet>();
        while (sheetIterator.HasMoreResults)
        {
            FeedResponse<Sheet> sheetPage = await sheetIterator.ReadNextAsync();
            sheetAccumulator.AddRange( (Sheet[]) sheetPage );
        }
        var sheets = sheetAccumulator.ToArray();

        sheets = await _populateSheets( sheets );
        
        return sheets.OrderByDescending( s => s.CreatedDate ).ToArray();
    }
    
    // takes an array of flash sheets as input and populates them
    private async Task<Sheet[]> _populateSheets( Sheet[] sheets )
    {
        _log.LogCritical("Populating sheets.");
        // Create complete list of piece IDs.
        var pieceIds = sheets.SelectMany( s => s.PieceIds );
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
        foreach ( var sheet in sheets )
        {
            sheet.Pieces = pieceAccumulator
                .Where( p => sheet.PieceIds.Contains(p.Id) )
                .ToArray();
        }
        _log.LogCritical("Sheets populated.");

        return sheets;
    }

    // This method loads flash sheets with no filters.
    private async Task<Sheet[]> _getSheetsNoFilters( bool populate )
    {
        // Init Sheet iterator
        FeedIterator<Sheet> sheetIterator = _sheetContainer.GetItemQueryIterator<Sheet>(
            queryText: "SELECT * FROM c"
        );
        
        var sheetAccumulator = new List<Sheet>();
        while (sheetIterator.HasMoreResults)
        {
            FeedResponse<Sheet> sheetPage = await sheetIterator.ReadNextAsync();
            sheetAccumulator.AddRange( (Sheet[]) sheetPage );
        }
        var sheets = sheetAccumulator.ToArray();
        
        if ( populate ) { sheets = await _populateSheets( sheets ); }
        
        return sheets.ToArray();
    }

    // loads flash pieces that intersect with given filters
    private async Task<Piece[]> _getPiecesWithFilter( Filter[] filters )
    {
        string[] pieceTitles = filters
            .Where( f => f.Type == FilterType.PieceTitle )
            .Select( f => SqlFunctions.SanitizeInput( f.Label ).ToLower() )
            .ToArray();

        string[] pieceTags = filters
            .Where( f => f.Type == FilterType.PieceTag )
            .Select( f => SqlFunctions.SanitizeInput( f.Label ).ToLower() )
            .ToArray();
        
        // Create iterator for pieces
        IOrderedQueryable<Piece> pieceQueryable = _pieceContainer.GetItemLinqQueryable<Piece>();
        // LINQ:
        var pieceMatches = pieceQueryable
            .Where( p => 
                // Piece title type filters
                (
                    pieceTitles.Contains( p.Title.ToLower() )
                    // || pieceTitles.Length == 0
                )
                // Piece tag type filters
                || (
                    p.Tags.Where( t => pieceTags.Contains( t ) ).Count() > 0
                )
            );
        var pieceIterator = pieceMatches.ToFeedIterator();
        
        // Query pieces
        var pieceAccumulator = new List<Piece>();
        while (pieceIterator.HasMoreResults)
        {
            FeedResponse<Piece> piecePage = await pieceIterator.ReadNextAsync();
            pieceAccumulator.AddRange( (Piece[]) piecePage );
        }
        
        return pieceAccumulator.OrderByDescending( p => p.CreatedDate ).ToArray();
    }
    
    // loads populated flash sheets that intersect with given filters
    private async Task<Sheet[]> _getSheetsWithFilter( Filter[] filters )
    {
        string[] sheetTitles = filters
            .Where( f => f.Type == FilterType.SheetTitle )
            .Select( f => SqlFunctions.SanitizeInput( f.Label ).ToLower() )
            .ToArray();

        string[] sheetTags = filters
            .Where( f => f.Type == FilterType.SheetTag )
            .Select( f => SqlFunctions.SanitizeInput(f.Label) )
            .ToArray();
        
        // Get iterator for sheets
        IOrderedQueryable<Sheet> sheetQueryable = _sheetContainer.GetItemLinqQueryable<Sheet>();
        // LINQ:
        var sheetMatches = sheetQueryable
            .Where( s =>
                (
                    sheetTitles.Contains( s.Title.ToLower() )
                    // || sheetTitles.Length == 0
                )
                || (
                    s.Tags.Where( t => sheetTags.Contains( t ) ).Count() > 0
                )
            );
        var sheetIterator = sheetMatches.ToFeedIterator();
        
        // Query sheets
        var sheetAccumulator = new List<Sheet>();
        while (sheetIterator.HasMoreResults)
        {
            FeedResponse<Sheet> sheetPage = await sheetIterator.ReadNextAsync();
            sheetAccumulator.AddRange( (Sheet[]) sheetPage );
        }
        var sheets = sheetAccumulator.ToArray();

        sheets = await _populateSheets( sheets );
        
        return sheets.OrderByDescending( s => s.CreatedDate ).ToArray();
    }
    
    // loads sheets from cosmos and optionally loads only sheets and pieces that intersect with provided filters. optionally does not populate sheets
    public async Task<Sheet[]> LoadSheets( Filter[] filters = null, bool populate = true )
    {
        _log.LogCritical($"Loading {( populate ? "populated" : "unpopulated" )} sheets.");
        
        Sheet[] sheets;
        Piece[] pieces;
        
        // FILTER CASE 0: There are no filters.
        if ( filters == null || filters.Length == 0 )
        {
            _log.LogCritical("Executing filter case 0: there are no filters");
            sheets = await _getSheetsNoFilters(populate);
            
            return sheets.OrderByDescending(s => s.CreatedDate).ToArray();
        }
        
        // Separate sheet filters and piece filters
        Filter[] sheetFilters = filters.Where( f => f.Type == FilterType.SheetTag || f.Type == FilterType.SheetTitle ).ToArray();
        Filter[] pieceFilters = filters.Where( f => f.Type == FilterType.PieceTag || f.Type == FilterType.PieceTitle ).ToArray();
        
        // FILTER CASE 1: There are sheet filters, but no piece filters.
        if (sheetFilters.Length > 0 && pieceFilters.Length == 0)
        {
            _log.LogCritical("Executing filter case 1: there are sheet filters, but no piece filters");
            sheets = await _getSheetsWithFilter( sheetFilters );
            
            return sheets;
        }
        
        // FILTER CASE 2: There are piece filters, but no sheet filters.
        if (sheetFilters.Length == 0 && pieceFilters.Length > 0)
        {
            _log.LogCritical("Executing filter case 2: there are piece filters, but no sheet filters");
            pieces = await _getPiecesWithFilter( pieceFilters );
            sheets = await _getSheetsByPieceId( pieces.Select(p => p.Id).ToArray() );
            foreach ( var sheet in sheets )
            {
                sheet.Pieces = pieces
                    .Where( p => sheet.PieceIds.Contains(p.Id) )
                    .ToArray();
            }
            
            return sheets;
        }
        
        // TODO: Optimize further? Search pieces that have already been loaded, restrict third query to only filters that are not represented by the pieces in the loaded sheets.
        // FILTER CASE 3: There are sheet filters and piece filters.
        _log.LogCritical("Executing filter case 3: there are both sheet and piece filters");
        sheets = await _getSheetsWithFilter( sheetFilters );
        pieces = await _getPiecesWithFilter( pieceFilters );

        // handle pieces without parent sheets.
        var orphanPieces = pieces
            .Where( p => !sheets.SelectMany( s => s.PieceIds ).Contains( p.Id ) );
        var fosterSheets = await _getSheetsByPieceId( orphanPieces.Select(p => p.Id).ToArray() );
        foreach ( var sheet in fosterSheets )
        {
            sheet.Pieces = orphanPieces
                .Where( p => sheet.PieceIds.Contains(p.Id) )
                .ToArray();
        }
        sheets = sheets.Concat( fosterSheets ).ToArray();
            
        return sheets.OrderByDescending(s => s.CreatedDate).ToArray();
    }
}