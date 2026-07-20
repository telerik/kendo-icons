namespace Telerik.SvgIcons
{
    public class ChevronDown : SvgIconBase
    {
        public ChevronDown()
        {
            Name = "chevron-down";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 9 12 16.5 4.5 9\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M20.1918 8.7092a.7505.7505 0 0 0-.6929-.4631H4.4991a.75.75 0 0 0-.5307 1.2806l7.5 7.5a.75.75 0 0 0 .5306.2199.75.75 0 0 0 .2872-.0572.75.75 0 0 0 .2434-.1627l7.5-7.5a.751.751 0 0 0 .1622-.8175\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 9 12 16.5 4.5 9\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M19.5 9 12 16.5 4.5 9z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 9 12 16.5 4.5 9z\" fill=\"none\"/>" }
            };
        }
    }
}
