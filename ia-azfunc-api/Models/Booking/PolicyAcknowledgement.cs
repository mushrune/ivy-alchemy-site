using System;
using System.Text.Json.Serialization;

namespace ia_azfunc_api.Models.Booking;

public class PolicyAcknowledgement
{
    [JsonPropertyName("ip_address")] public string IpAddress { get; set; }
    [JsonPropertyName("piece_id")] public string PieceId { get; set; } = "";
    [JsonPropertyName("piece_title")] public string PieceTitle { get; set; } = "";
    [JsonPropertyName("is_piece_selected")] public bool IsPieceSelected { get; set; } = false;
    [JsonPropertyName("time_zone")] public string TimeZone { get; set; }
    [JsonPropertyName("acknowledged_at")] public DateTime AcknowledgedAt { get; set; }
}