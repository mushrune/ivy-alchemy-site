using Newtonsoft.Json;

namespace ia_azfunc_api.Models.Flash;

public class Sheet
{
    [JsonProperty("id")] public string Id { get; set; }
    [JsonProperty("title")] public string Title { get; set; }
    [JsonProperty("artist_id")] public string ArtistId { get; set; }
    [JsonProperty("flash_pieces")] public Piece[] Pieces { get; set; }
    [JsonProperty("piece_ids")] public string[] PieceIds { get; set; }
    [JsonProperty("url")] public string SheetUrl { get; set; }
    [JsonProperty("tags")] public string[] Tags { get; set; }
}

public record SheetRecord
{
    public string id;
    public string title;
    public string artist_id;
    public string[] piece_ids; 
    public string url; 
    public string[] tags;
}