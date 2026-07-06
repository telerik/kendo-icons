namespace Telerik.SvgIcons
{
    public class CaretAltUp : SvgIconBase
    {
        public CaretAltUp()
        {
            Name = "caret-alt-up";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4.5 15 12 7.5l7.5 7.5\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"m20.0295 14.4731-7.4999-7.5a.75.75 0 0 0-.5306-.22.75.75 0 0 0-.5307.22l-7.4999 7.5a.75.75 0 0 0 .5306 1.2806H19.499a.75.75 0 0 0 .7362-.8965.75.75 0 0 0-.2056-.3841\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4.5 15 12 7.5l7.5 7.5\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M4.5 15 12 7.5l7.5 7.5z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4.5 15 12 7.5l7.5 7.5z\" fill=\"none\"/>" }
            };
        }
    }
}
