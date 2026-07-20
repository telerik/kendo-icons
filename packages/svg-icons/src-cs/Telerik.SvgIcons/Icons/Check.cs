namespace Telerik.SvgIcons
{
    public class Check : SvgIconBase
    {
        public Check()
        {
            Name = "check";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 13.5 9 18.75l12-12\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M20.2489 3.7507H3.749a1.5 1.5 0 0 0-1.5 1.5v13.4999a1.5 1.5 0 0 0 1.5 1.5H20.249a1.5 1.5 0 0 0 1.5-1.5V5.2507a1.5 1.5 0 0 0-1.5-1.5m-.9694 4.2806-8.9999 9a.7505.7505 0 0 1-1.0613 0l-3.75-3.75A.7503.7503 0 1 1 6.5297 12.22l3.2194 3.2203 8.4693-8.4702a.7503.7503 0 1 1 1.0612 1.0612\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 13.5 9 18.75l12-12\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M20.25 3.75H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m5.9995 12.751 3.75 3.75 9-9\" fill=\"none\"/>" }
            };
        }
    }
}
