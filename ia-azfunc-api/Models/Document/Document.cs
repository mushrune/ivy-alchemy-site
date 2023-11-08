using System;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace ia_azfunc_api.Models.Document;

public class Document
{
    // Properties I do not want to deliver to the client ( non-serializable )
    [JsonProperty("artist_id")] public string ArtistIdSetter { set => ArtistId = value; }
    [JsonIgnore] public string ArtistId { get; set; }

    [JsonProperty("created_date")] public DateTime CreatedDateSetter { set => CreatedDate = value; }
    [JsonIgnore] public DateTime CreatedDate { get; set; }
    
    [JsonProperty("last_modified")] public DateTime LastModifiedSetter { set => LastModified = value; }
    [JsonIgnore] public DateTime LastModified { get; set; }
    
    // Safe to deliver to client
    [JsonProperty("id")] public string Id { get; set; }
    [JsonProperty("description")] public string Description { get; set; }
    [JsonProperty("title")] public string Title { get; set; }
    [JsonProperty("type")] public DocumentType Type { get; set; }
    [JsonProperty("body")] public string Body { get; set; }
}

