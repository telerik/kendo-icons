namespace Telerik.SvgIcons
{
    public class ChevronUp : SvgIconBase
    {
        public ChevronUp()
        {
            Name = "chevron-up";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4.5 15 12 7.5l7.5 7.5\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"m20.0296 14.4731-7.5-7.5a.75.75 0 0 0-.5306-.22.75.75 0 0 0-.5306.22l-7.5 7.5a.7502.7502 0 0 0 .1137 1.1544.75.75 0 0 0 .417.1262h14.9998a.7499.7499 0 0 0 .5307-1.2806\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4.5 15 12 7.5l7.5 7.5\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M4.5 15 12 7.5l7.5 7.5z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4.5 15 12 7.5l7.5 7.5z\" fill=\"none\"/>" }
            };
        }
    }
}
