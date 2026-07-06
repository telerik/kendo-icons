namespace Telerik.SvgIcons
{
    public class Menu : SvgIconBase
    {
        public Menu()
        {
            Name = "menu";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 12h16.5M3.75 6h16.5M3.75 18h16.5\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M19.4989 3.0005h-15a1.5 1.5 0 0 0-1.5 1.5v14.9999a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5v-15a1.5 1.5 0 0 0-1.5-1.5m-1.5 14.2499h-12a.7498.7498 0 0 1-.5303-1.2803.75.75 0 0 1 .5304-.2197h11.9999a.7497.7497 0 0 1 .75.75.7497.7497 0 0 1-.75.75m0-4.5h-12a.7498.7498 0 0 1-.5303-1.2803.75.75 0 0 1 .5304-.2197h11.9999a.7497.7497 0 0 1 .75.75.7497.7497 0 0 1-.75.75m0-4.5h-12a.75.75 0 0 1 0-1.5h12a.7499.7499 0 1 1 0 1.5\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 12h16.5M3.75 6h16.5M3.75 18h16.5\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M20.25 6H3.75v12h16.5z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 12h16.5M3.75 6h16.5M3.75 18h16.5\" fill=\"none\"/>" }
            };
        }
    }
}
