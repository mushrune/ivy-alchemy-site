using System;
using System.ComponentModel;
using ia_azfunc_api.InternalFunctions;
using Newtonsoft.Json;

namespace ia_azfunc_api.Models.Flash.Search;

[JsonConverter(typeof(FriendlyEnumConverter<FilterType>))]
public class FilterType : FriendlyEnum
{
    private FilterType(string value) : base(value) { }
    public static FilterType SheetTitle => new FilterType("sheet_title");
    public static FilterType PieceTag => new FilterType("piece_tag");
    public static FilterType SheetTag => new FilterType("sheet_tag");
    public static FilterType PieceTitle => new FilterType("piece_title");
}

