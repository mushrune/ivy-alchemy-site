using System;
using Newtonsoft.Json;

namespace ia_azfunc_api.Models.Flash;

public class Sheet
{
    [JsonProperty("artist_id")] public string ArtistIdSetter { get; set; }
    [JsonIgnore] public string ArtistId { get; set; }
    
    [JsonProperty("id")] public string Id { get; set; }
    [JsonProperty("title")] public string Title { get; set; }
    [JsonProperty("created_date")] public DateTime CreatedDate { get; set; }
    [JsonProperty("flash_pieces")] public Piece[] Pieces { get; set; }
    [JsonProperty("piece_ids")] public string[] PieceIds { get; set; }
    [JsonProperty("url")] public string SheetUrl { get; set; }
    [JsonProperty("tags")] public string[] Tags { get; set; }
}