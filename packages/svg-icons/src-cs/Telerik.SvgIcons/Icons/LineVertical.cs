namespace Telerik.SvgIcons
{
    public class LineVertical : SvgIconBase
    {
        public LineVertical()
        {
            Name = "line-vertical";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 2.25v19.5\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M19.4989 3.0002h-15a1.5 1.5 0 0 0-1.5 1.5v14.9999a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5V4.5002a1.5 1.5 0 0 0-1.5-1.5m-6.75 14.9999a.75.75 0 0 1-.2196.5304.7504.7504 0 0 1-1.0607 0 .75.75 0 0 1-.2197-.5304V6.0002a.75.75 0 0 1 .75-.75.75.75 0 0 1 .75.75z\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 2.25v19.5\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M19.5 3h-15A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 2.25v19.5\" fill=\"none\"/>" }
            };
        }
    }
}
