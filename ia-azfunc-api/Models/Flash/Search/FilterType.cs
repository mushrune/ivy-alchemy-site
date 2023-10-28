using System;
using System.ComponentModel;
using ia_azfunc_api.InternalFunctions;
using Newtonsoft.Json;

namespace ia_azfunc_api.Models.Flash.Search;

[JsonConverter(typeof(FriendlyEnumConverter<FilterType>))]
public class FilterType : FriendlyEnum
{
    private FilterType(string value) : base(value) { }
    public static FilterType Sheet => new FilterType("sheet");
    public static FilterType Tag => new FilterType("tag");
    public static FilterType Piece => new FilterType("piece");
}

