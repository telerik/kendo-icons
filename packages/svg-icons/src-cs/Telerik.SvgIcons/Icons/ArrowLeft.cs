namespace Telerik.SvgIcons
{
    public class ArrowLeft : SvgIconBase
    {
        public ArrowLeft()
        {
            Name = "arrow-left";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20.25 12H3.75m6.75 6.75L3.75 12l6.75-6.75\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M20.9989 11.9969a.75.75 0 0 1-.75.75H11.249v5.9999a.7501.7501 0 0 1-1.2806.5306l-6.75-6.7499a.75.75 0 0 1-.22-.5306.75.75 0 0 1 .22-.5307l6.75-6.7499a.7502.7502 0 0 1 1.1544.1136.75.75 0 0 1 .1262.417v6h8.9999c.1989 0 .3897.079.5304.2196a.75.75 0 0 1 .2196.5304\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20.25 12H3.75m6.75 6.75L3.75 12l6.75-6.75\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M10.5 5.25 3.75 12l6.75 6.75z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20.25 12H10.5m0-6.75L3.75 12l6.75 6.75z\" fill=\"none\"/>" }
            };
        }
    }
}
