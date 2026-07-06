namespace Telerik.SvgIcons
{
    public class Bed : SvgIconBase
    {
        public Bed()
        {
            Name = "bed";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10.5 15.75V7.5m0 0h9.75a3 3 0 0 1 3 3v5.25M10.5 7.5H2.25m21 8.25h-21m21 0v3.75m-21 0v-15\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<g clip-path=\"url(#a)\"><path d=\"M20.2489 6.751H2.999v-2.25a.75.75 0 0 0-1.5 0v14.9999a.75.75 0 0 0 1.5 0v-3H22.499v3a.75.75 0 0 0 .75.75.7503.7503 0 0 0 .75-.75v-9a3.75 3.75 0 0 0-3.75-3.75M2.999 8.251h6.75v6.7499h-6.75z\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M0 0h23.9998v23.9998H0z\"/></clipPath></defs>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10.5 15.75V7.5m0 0h9.75a3 3 0 0 1 3 3v5.25M10.5 7.5H2.25m21 8.25h-21m21 0v3.75m-21 0v-15\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M10.5 7.5h9.75a3 3 0 0 1 3 3v5.25H10.5z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10.5 15.75V7.5m0 0h9.75a3 3 0 0 1 3 3v5.25M10.5 7.5H2.25m21 8.25h-21m21 0v3.75m-21 0v-15\" fill=\"none\"/>" }
            };
        }
    }
}
