using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ia_azfunc_api.Models.Document;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace ia_azfunc_api.EndpointFunctions.Documents
{
    public static class Get_Documents
    {
        [FunctionName("Get_Documents")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "documents")] HttpRequest req,
            [CosmosDB(
                databaseName: "puck", 
                containerName: "artist_docs", 
                PartitionKey = "%PUCK_ARTIST_ID%",
                Connection = "CosmosDBConnection" 
            )] IEnumerable<Document> docs,
            ILogger log)
        {
            log.LogInformation($"Artist docs requested by {req.Host.Host}");

            if ( docs == null || docs.Count() == 0 )
            {
                log.LogError("No documents found");
                return new NoContentResult();
            }

            var responseBody = JsonConvert.SerializeObject( docs );
            
            return new OkObjectResult(responseBody);
        }
    }
}
