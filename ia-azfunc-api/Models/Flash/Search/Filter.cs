using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace ia_azfunc_api.Models.Flash.Search;

public class Filter
{
    [JsonProperty("label")] public string Label { get; set; }
    [JsonProperty("type")] public FilterType Type { get; set; }
    // If the type is tag, count shows how many pieces + sheets with that tag
    // If the type is sheet, count shows how many pieces in that sheet
    // If the type is piece, count always shows 0
    [JsonProperty("count")] public int Count { get; set; }
}

public class FilterComparer : IEqualityComparer<Filter> 
{
    public bool Equals(Filter a, Filter b)
    {
        if (ReferenceEquals(a, b)) return true;
        if (ReferenceEquals(a, null) || ReferenceEquals(b, null)) return false;
        return a.Label == b.Label && a.Type == b.Type;
    }

    public int GetHashCode(Filter filter)
    {
        int labelHash = filter.Label == null ? 0 : filter.Label.GetHashCode();
        int typeHash = filter.Type == null ? 0 : filter.Type.GetHashCode();
        return labelHash ^ typeHash;
    }
}