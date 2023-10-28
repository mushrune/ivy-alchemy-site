using System;
using System.Linq;
using System.Reflection;
using ia_azfunc_api.Models.Flash.Search;
using Newtonsoft.Json;

namespace ia_azfunc_api.Models;

public abstract class FriendlyEnum
{
    protected FriendlyEnum(string value) { Value = value; }
    public string Value { get; protected set; }
    
    public override string ToString() { return Value; }

    public static bool operator ==(FriendlyEnum x, FriendlyEnum y)
    {
        if (ReferenceEquals(x, y)) return true;
        if (x is null || y is null) return false;
        return x.Equals(y);
    }

    public static bool operator !=(FriendlyEnum x, FriendlyEnum y)
    {
        return !( x == y );
    }
    public override bool Equals(object obj)
    {
        if (obj is FriendlyEnum other)
        {
            return Value == other.Value;
        }
        return false;
    }
    public override int GetHashCode()
    {
        return Value.GetHashCode();
    }
}


public class FriendlyEnumConverter<T> : JsonConverter<T> where T : FriendlyEnum
{
    public override void WriteJson(JsonWriter writer, T value, JsonSerializer serializer)
    {
        writer.WriteValue( value.ToString() ); 
    }

    public override T ReadJson(
        JsonReader reader, 
        Type objectType, 
        T existingValue, 
        bool hasExistingValue, 
        JsonSerializer serializer ) 
    {
        var s = (string)reader.Value;

        var properties = typeof(T)
            .GetProperties(BindingFlags.Public | BindingFlags.Static)
            .Where(p => p.PropertyType == typeof(T));

        foreach (var property in properties)
        {
            var propertyValue = (T)property.GetValue(null);
            if (propertyValue.Value == s)
            {
                return propertyValue;
            }
        }

        return (T) properties.FirstOrDefault().GetValue(null);
    }
}