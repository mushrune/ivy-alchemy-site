using Newtonsoft.Json;

namespace ia_azfunc_api.Models.Flash.Search;

public class Filter
{
    [JsonProperty("label")] public string Label { get; set; }
    [JsonProperty("type")] public Type Type { get; set; }
    // If the type is tag, count shows how many pieces + sheets with that tag
    // If the type is sheet, count shows how many pieces in that sheet
    // If the type is piece, count always shows 0
    [JsonProperty("count")] public int Count { get; set; }
}