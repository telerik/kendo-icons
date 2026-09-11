namespace Telerik.SvgIcons
{
    public class LinePointAngular : SvgIconBase
    {
        public LinePointAngular()
        {
            Name = "line-point-angular";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20.9996 9.75H4.5005v4.5h16.4991\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20.9996 9.75H4.5005v4.5h16.4991z\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20.9996 9.75H4.5005v4.5h16.4991\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M4.5004 9.75h16.499v4.5H4.5004z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20.9995 9.75H4.5004v4.5h16.4991\" fill=\"none\"/>" }
            };
        }
    }
}
