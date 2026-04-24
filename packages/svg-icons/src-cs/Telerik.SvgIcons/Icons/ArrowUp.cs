namespace Telerik.SvgIcons
{
    public class ArrowUp : SvgIconBase
    {
        public ArrowUp()
        {
            Name = "arrow-up";
            Content = "<path d=\"M384 288h-96v128h-64l-.001-128H128L255.999 96z\" />";
            ViewBox = "0 0 512 512";
            Tags = new string[] { "navigation", "arrows" };
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "" },
                { "outline", "" },
                { "duotone", "" }
            };
        }
    }
}
