namespace Telerik.SvgIcons
{
    public class CaretAltToRight : SvgIconBase
    {
        public CaretAltToRight()
        {
            Name = "caret-alt-to-right";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m6 4.5 7.5 7.5L6 19.5m11.25-15v15\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M14.0295 11.4675a.7486.7486 0 0 1 .1628.8178.75.75 0 0 1-.1628.2434l-7.5 7.4999a.7495.7495 0 0 1-.8176.1629.75.75 0 0 1-.463-.6935V4.4981a.7499.7499 0 0 1 1.2807-.5306zm3.2194-7.7193a.75.75 0 0 0-.75.75V19.498a.7501.7501 0 1 0 1.5 0V4.4981a.75.75 0 0 0-.75-.75\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m6 4.5 7.5 7.5L6 19.5m11.25-15v15\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"m6 4.5 7.5 7.5L6 19.5z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M17.25 4.5v15M6 4.5l7.5 7.5L6 19.5z\" fill=\"none\"/>" }
            };
        }
    }
}
