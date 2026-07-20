namespace Telerik.SvgIcons
{
    public class HandleResizeAlt : SvgIconBase
    {
        public HandleResizeAlt()
        {
            Name = "handle-resize-alt";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 12v7.5H12\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M19.5 12v7.5H12\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 12v7.5H12z\" fill=\"none\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 12v7.5H12\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M19.5 12v7.5H12\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 12v7.5H12\" fill=\"none\"/>" }
            };
        }
    }
}
