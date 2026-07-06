namespace Telerik.SvgIcons
{
    public class ChevronDoubleUp : SvgIconBase
    {
        public ChevronDoubleUp()
        {
            Name = "chevron-double-up";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4.5 18.75 7.5-7.5 7.5 7.5m-15-7.5 7.5-7.5 7.5 7.5\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M13.8093 12.0027h5.6896a.7499.7499 0 0 0 .5307-1.2806l-7.5-7.5a.75.75 0 0 0-.5306-.2199.75.75 0 0 0-.5306.22l-7.5 7.4999a.7502.7502 0 0 0 .1137 1.1544.75.75 0 0 0 .417.1262h5.6896L3.9684 18.222a.75.75 0 0 0 .5307 1.2807h14.9998a.7499.7499 0 0 0 .5307-1.2807z\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4.5 18.75 7.5-7.5 7.5 7.5m-15-7.5 7.5-7.5 7.5 7.5\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"m4.5 18.75 7.5-7.5 7.5 7.5z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4.5 11.25 7.5-7.5 7.5 7.5m-15 7.5 7.5-7.5 7.5 7.5z\" fill=\"none\"/>" }
            };
        }
    }
}
