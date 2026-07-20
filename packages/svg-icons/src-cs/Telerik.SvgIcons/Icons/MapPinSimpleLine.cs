namespace Telerik.SvgIcons
{
    public class MapPinSimpleLine : SvgIconBase
    {
        public MapPinSimpleLine()
        {
            Name = "map-pin-simple-line";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 12c2.4853 0 4.5-2.0147 4.5-4.5S14.4853 3 12 3 7.5 5.0147 7.5 7.5 9.5147 12 12 12m0 0v8.25m-8.25 0h16.5\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M20.9989 20.2523a.75.75 0 0 1-.75.75H3.749a.75.75 0 0 1-.75-.75.75.75 0 0 1 .75-.75h7.5V12.698a5.25 5.25 0 1 1 1.4999 0v6.8043h7.5a.75.75 0 0 1 .75.75\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 12c2.4853 0 4.5-2.0147 4.5-4.5S14.4853 3 12 3 7.5 5.0147 7.5 7.5 9.5147 12 12 12m0 0v8.25m-8.25 0h16.5\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M12 12c2.4853 0 4.5-2.0147 4.5-4.5S14.4853 3 12 3 7.5 5.0147 7.5 7.5 9.5147 12 12 12\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M11.9995 12c2.4853 0 4.5-2.0147 4.5-4.5s-2.0147-4.5-4.5-4.5-4.5 2.0147-4.5 4.5 2.0147 4.5 4.5 4.5m0 0v8.25m-8.25 0h16.5\" fill=\"none\"/>" }
            };
        }
    }
}
