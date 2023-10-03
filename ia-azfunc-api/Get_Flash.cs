using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ia_azfunc_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace ia_azfunc_api
{
    public static class Get_Flash
    {
        [FunctionName("Get_Flash")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "flash/sheets")] HttpRequest req,
            [CosmosDB(
                databaseName: "puck",
                containerName: "flash_sheets",
                PartitionKey = "%PUCK_ARTIST_ID%",
                SqlQuery = "SELECT * FROM c",
                Connection = "CosmosDBConnection"
            )] IEnumerable<FlashSheet> sheets,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string artistId = Environment.GetEnvironmentVariable("PUCK_ARTIST_ID");
            
            // Create cosmos client
            var cosmosClient = new CosmosClient(connectionString: Environment.GetEnvironmentVariable("CosmosDBConnection"));
            var container = cosmosClient.GetContainer(databaseId: "puck", containerId: "flash_pieces");
            
            // Iterate through each sheet and populate the flash pieces.
            foreach ( var sheet in sheets )
            {
                log.LogCritical($"{sheet.Title} - {sheet.PieceIds.Length} flash pieces.");
                foreach (var id in sheet.PieceIds)
                {
                    FlashPiece flashPiecePiece = await container.ReadItemAsync<FlashPiece>(id: id, partitionKey: new PartitionKey(artistId) );
                    // If there are existing pieces in the collection, concatenate. else, create new array.
                    if (sheet.FlashPieces is not null && sheet.FlashPieces.Length > 0 ) { sheet.FlashPieces = sheet.FlashPieces.Concat( new[] { flashPiecePiece } ).ToArray(); }
                    else { sheet.FlashPieces = new[] { flashPiecePiece }; }
                    // Do the same for tags
                    if (sheet.Tags is not null && sheet.FlashPieces.Length > 0) { sheet.Tags = sheet.Tags.Concat(flashPiecePiece.Tags).ToArray(); }
                    else { sheet.Tags = flashPiecePiece.Tags; }
                }
            }

            var responseBody = JsonConvert.SerializeObject(sheets);
            
            return new OkObjectResult(responseBody);
        }
    }
}
