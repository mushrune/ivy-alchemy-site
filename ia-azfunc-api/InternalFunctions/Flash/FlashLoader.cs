using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using ia_azfunc_api.Models.Flash;
using ia_azfunc_api.Models.Flash.Search;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Linq;
using Microsoft.Extensions.Logging;

namespace ia_azfunc_api.InternalFunctions.Flash;

public abstract class FlashLoader
{
    protected string _artistId { get; set; }
    protected ILogger _log { get; set; }
    protected CosmosClient _cosmosClient { get; set; }
    protected Container _sheetContainer { get; set;}
    protected Container _pieceContainer { get; set;}
    
    // Instantiates a class that can load flash data
    public FlashLoader(
        ILogger log
    )
    {
        _log = log;
        _artistId = Environment.GetEnvironmentVariable("PUCK_ARTIST_ID");
        _cosmosClient = new CosmosClient(connectionString: Environment.GetEnvironmentVariable("CosmosDBConnection"));
        _sheetContainer = _cosmosClient.GetContainer(databaseId: "puck", containerId: "flash_sheets");
        _pieceContainer = _cosmosClient.GetContainer(databaseId: "puck", containerId: "flash_pieces");
    }
    
}