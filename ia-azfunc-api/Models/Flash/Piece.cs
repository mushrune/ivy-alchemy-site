using System;
using Newtonsoft.Json;

namespace ia_azfunc_api.Models.Flash;

public class Piece
{
    // I do not want to send the Artist ID to the client
    [JsonProperty("artist_id")] public string ArtistIdSetter { get; set; }
    [JsonIgnore] public string ArtistId { get; set; }
    
    [JsonProperty("id")] public string Id { get; set; }
    [JsonProperty("created_date")] public DateTime CreatedDate { get; set; }
    [JsonProperty("title")] public string Title { get; set; }
    [JsonProperty("size_range")] public string SizeRange { get; set; }
    [JsonProperty("tags")] public string[] Tags { get; set; }
    [JsonProperty("url")] public string Url { get; set; }
}