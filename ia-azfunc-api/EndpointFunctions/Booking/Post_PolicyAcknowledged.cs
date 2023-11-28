using System.IO;
using System.Threading.Tasks;
using System.Web.Http;
using ia_azfunc_api.Models.Booking;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace ia_azfunc_api.EndpointFunctions.Booking;

public class Post_PolicyAcknowledged
{
    [FunctionName(nameof(EndpointFunctions.Booking.Post_PolicyAcknowledged))]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "booking/policy_acknowledged")]
        HttpRequest req,
        ILogger log )
    {
        log.LogInformation($"Policy acknowledged by {req.HttpContext.Connection.RemoteIpAddress}");

        var body = await new StreamReader( req.Body ).ReadToEndAsync();
        var data = JsonConvert.DeserializeObject<PolicyAcknowledgement>( body );
        if ( data is null )
        {
            log.LogError("Could not parse policy acknowledgement.");
            return new BadRequestResult();
        }

        return new OkObjectResult("accepted");
    }
}