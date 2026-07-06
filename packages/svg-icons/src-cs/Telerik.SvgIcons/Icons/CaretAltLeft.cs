namespace Telerik.SvgIcons
{
    public class CaretAltLeft : SvgIconBase
    {
        public CaretAltLeft()
        {
            Name = "caret-alt-left";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 19.5 7.5 12 15 4.5\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M15.2858 3.8104a.75.75 0 0 0-.8175.1622l-7.5 7.5a.75.75 0 0 0-.2199.5306.75.75 0 0 0 .22.5306l7.4999 7.4999a.75.75 0 0 0 .8177.1629.75.75 0 0 0 .4629-.6935V4.5032a.75.75 0 0 0-.4631-.6928\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 19.5 7.5 12 15 4.5\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M15 19.5 7.5 12 15 4.5z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 19.5 7.5 12 15 4.5z\" fill=\"none\"/>" }
            };
        }
    }
}
