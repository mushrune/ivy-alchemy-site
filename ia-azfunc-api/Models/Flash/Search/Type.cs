namespace ia_azfunc_api.Models.Flash.Search;

public class Type
{
    private Type(string value) { Value = value; }
    public string Value { get; private set; }
    public override string ToString() { return Value; }
    public static Type Piece { get => new Type("piece"); }
    public static Type Sheet { get => new Type("sheet"); }
    public static Type Tag { get => new Type("tag"); }
}