namespace Telerik.SvgIcons
{
    public class ArrowsTopBottom : SvgIconBase
    {
        public ArrowsTopBottom()
        {
            Name = "arrows-top-bottom";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m15 5.25-3-3-3 3m3-3v19.5m-3-3 3 3 3-3\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M15.6918 18.4655a.7504.7504 0 0 1-.1622.8175l-3 3a.75.75 0 0 1-.5306.22.75.75 0 0 1-.5306-.22l-3-3a.75.75 0 0 1-.1629-.8177.75.75 0 0 1 .6935-.4629h2.25V6.0025h-2.25a.75.75 0 0 1-.5306-1.2806l3-3a.75.75 0 0 1 .5306-.22.75.75 0 0 1 .5306.22l3 3a.7501.7501 0 0 1-.5306 1.2806h-2.25v11.9999h2.25a.75.75 0 0 1 .6928.4631\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m15 5.25-3-3-3 3m3-3v19.5m-3-3 3 3 3-3\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"m9 5.25 3-3 3 3v13.5l-3 3-3-3z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m15 5.25-3-3-3 3m3-3v19.5m-3-3 3 3 3-3\" fill=\"none\"/>" }
            };
        }
    }
}
