using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace ia_azfunc_api.Models;

public class FlashPiece
{
    [JsonProperty("id")] public string Id { get; set; }
    [JsonProperty("artist_id")] public string ArtistId { get; set; }
    [JsonProperty("title")] public string Title { get; set; }
    [JsonProperty("size_range")] public string SizeRange { get; set; }
    [JsonProperty("tags")] public string[] Tags { get; set; }
    [JsonProperty("url")] public string Url { get; set; }
}

public class FlashSheet
{
    [JsonProperty("id")] public string Id { get; set; }
    [JsonProperty("title")] public string Title { get; set; }
    [JsonProperty("artist_id")] public string ArtistId { get; set; }
    [JsonProperty("flash_pieces")] public FlashPiece[] FlashPieces { get; set; }
    [JsonProperty("piece_ids")] public string[] PieceIds { get; set; }
    [JsonProperty("url")] public string SheetUrl { get; set; }
    [JsonProperty("tags")] public string[] Tags { get; set; }
}