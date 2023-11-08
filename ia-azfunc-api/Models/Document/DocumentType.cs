using ia_azfunc_api.Models.Flash.Search;
using Newtonsoft.Json;

namespace ia_azfunc_api.Models.Document;

[JsonConverter(typeof(FriendlyEnumConverter<DocumentType>))]
public class DocumentType : FriendlyEnum
{
    private DocumentType( string value ) : base(value) { }
    public static DocumentType Markdown => new DocumentType("markdown");
    public static DocumentType Text => new DocumentType("text");
}