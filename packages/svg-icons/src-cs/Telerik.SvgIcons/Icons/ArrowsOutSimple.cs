namespace Telerik.SvgIcons
{
    public class ArrowsOutSimple : SvgIconBase
    {
        public ArrowsOutSimple()
        {
            Name = "arrows-out-simple";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 9V4.5H15m4.5 0-6 6m-9 4.5v4.5H9m-4.5 0 6-6\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M20.2489 4.5039v4.5a.7501.7501 0 0 1-1.2806.5306l-1.7194-1.7203-3.2194 3.2203a.7505.7505 0 1 1-1.0612-1.0613l3.2203-3.2193-1.7203-1.7194a.7501.7501 0 0 1 .5306-1.2806h4.5a.75.75 0 0 1 .75.75M9.9683 12.9732 6.749 16.1935l-1.7194-1.7203a.7501.7501 0 0 0-1.2806.5306v4.5a.75.75 0 0 0 .75.75h4.5a.7502.7502 0 0 0 .736-.8965.75.75 0 0 0-.2054-.3841l-1.7203-1.7194 3.2203-3.2193a.7507.7507 0 0 0 0-1.0613.7507.7507 0 0 0-1.0613 0\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 9V4.5H15m4.5 0-6 6m-9 4.5v4.5H9m-4.5 0 6-6\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M19.5 3h-15C3.6716 3 3 3.6716 3 4.5v15c0 .8284.6716 1.5 1.5 1.5h15c.8284 0 1.5-.6716 1.5-1.5v-15c0-.8284-.6716-1.5-1.5-1.5\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 9V4.5H15m4.5 0-6 6m-9 4.5v4.5H9m-4.5 0 6-6\" fill=\"none\"/>" }
            };
        }
    }
}
