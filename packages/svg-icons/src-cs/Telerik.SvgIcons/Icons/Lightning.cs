namespace Telerik.SvgIcons
{
    public class Lightning : SvgIconBase
    {
        public Lightning()
        {
            Name = "lightning";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 1.5 13.5 9l6 2.25L9 22.5l1.5-7.5-6-2.25z\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<g clip-path=\"url(#a)\"><path d=\"m20.0473 11.7604-10.5 11.2499a.75.75 0 0 1-1.2834-.6562l1.3744-6.8747-5.4028-2.0287a.75.75 0 0 1-.468-.5338.75.75 0 0 1 .1868-.6849L14.4542.982a.75.75 0 0 1 1.2834.6563l-1.3781 6.8821 5.4028 2.026a.7495.7495 0 0 1 .4582.8959.75.75 0 0 1-.177.3181z\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M0 0h23.9998v23.9998H0z\"/></clipPath></defs>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 1.5 13.5 9l6 2.25L9 22.5l1.5-7.5-6-2.25z\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M15 1.5 13.5 9l6 2.25L9 22.5l1.5-7.5-6-2.25z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 1.5 13.5 9l6 2.25L9 22.5l1.5-7.5-6-2.25z\" fill=\"none\"/>" }
            };
        }
    }
}
