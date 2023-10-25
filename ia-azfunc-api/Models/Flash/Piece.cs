using Newtonsoft.Json;

namespace ia_azfunc_api.Models.Flash;

public class Piece
{
    [JsonProperty("id")] public string Id { get; set; }
    [JsonProperty("artist_id")] public string ArtistId { get; set; }
    [JsonProperty("title")] public string Title { get; set; }
    [JsonProperty("size_range")] public string SizeRange { get; set; }
    [JsonProperty("tags")] public string[] Tags { get; set; }
    [JsonProperty("url")] public string Url { get; set; }
}