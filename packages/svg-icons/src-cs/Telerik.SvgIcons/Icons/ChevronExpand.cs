namespace Telerik.SvgIcons
{
    public class ChevronExpand : SvgIconBase
    {
        public ChevronExpand()
        {
            Name = "chevron-expand";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7.5 16.5 12 21l4.5-4.5m-9-9L12 3l4.5 4.5\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M17.1918 16.2163a.751.751 0 0 1-.1622.8175l-4.5 4.5a.7505.7505 0 0 1-1.0612 0l-4.5-4.5a.75.75 0 0 1 .5306-1.2806h8.9999a.75.75 0 0 1 .6929.4631M7.499 8.2533h8.9999a.75.75 0 0 0 .6935-.463.75.75 0 0 0-.1628-.8177l-4.5-4.5a.75.75 0 0 0-.5306-.22.75.75 0 0 0-.5306.22l-4.5 4.5a.75.75 0 0 0 .5306 1.2806\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7.5 16.5 12 21l4.5-4.5m-9-9L12 3l4.5 4.5\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M7.5 16.5 12 21l4.5-4.5zM7.5 7.5 12 3l4.5 4.5z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7.5 16.5 12 21l4.5-4.5zM7.5 7.5 12 3l4.5 4.5z\" fill=\"none\"/>" }
            };
        }
    }
}
