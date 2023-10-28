using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ia_azfunc_api.InternalFunctions.Flash;
using ia_azfunc_api.Models.Flash.Search;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace ia_azfunc_api.EndpointFunctions.Flash
{
    public static class Get_SearchOptions
    {
        [FunctionName(nameof(Get_SearchOptions))]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "flash/search_filters")] HttpRequest req,
            ILogger log )
        {
            log.LogInformation($"Search options requested by {req.Host.Host}");

            // TODO: Sanitize query
            string query = req.Query["query"];
            query ??= "";
            
            // Load filters using loader
            var loader = new FlashLoader(
                startingPage: 0,
                log: log
            );
            var filters = await loader.LoadFilters(query);
            
            // Transform list of sheets with pieces into search option list
            var responseBody = JsonConvert.SerializeObject( filters );
            
            // Send list to client
            return new OkObjectResult(responseBody);
        }
    }
}
