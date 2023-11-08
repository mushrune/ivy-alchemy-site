using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ia_azfunc_api.InternalFunctions.Flash;
using ia_azfunc_api.Models.Flash;
using ia_azfunc_api.Models.Flash.Search;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace ia_azfunc_api.EndpointFunctions.Flash
{
    public static class Post_Sheets
    {
        // This function runs when the endpoint is called via HTTP.
        [FunctionName(nameof(EndpointFunctions.Flash.Post_Sheets))]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "flash/sheets")] HttpRequest req,
            ILogger log )
        {
            log.LogInformation($"Flash sheets requested by {req.Host.Host}");

            var body = await new StreamReader(req.Body).ReadToEndAsync();
            Filter[] filters = JsonConvert.DeserializeObject<Filter[]>(body);
            filters ??= new Filter[] { };

            /*
             * I could use an input binding for this, but this flash loader class gives me precise control
             * over the cosmos db interactions for pagination, search options, queries, etc..
             */
            var loader = new SheetLoader(
                log: log
            );
            Sheet[] sheets = await loader.LoadSheets( populate: true, filters: filters );
            
            var responseBody = JsonConvert.SerializeObject(sheets);
            
            return new OkObjectResult(responseBody);
        }
    }
}
