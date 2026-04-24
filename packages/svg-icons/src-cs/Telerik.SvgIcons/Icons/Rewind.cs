namespace Telerik.SvgIcons
{
    public class Rewind : SvgIconBase
    {
        public Rewind()
        {
            Name = "rewind";
            Content = "<path d=\"M256 256 512 96v320zm0 160V96L0 256z\" />";
            ViewBox = "0 0 512 512";
            Tags = new string[] { "media" };
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "" },
                { "outline", "" },
                { "duotone", "" }
            };
        }
    }
}
