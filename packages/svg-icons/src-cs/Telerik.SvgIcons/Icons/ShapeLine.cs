namespace Telerik.SvgIcons
{
    public class ShapeLine : SvgIconBase
    {
        public ShapeLine()
        {
            Name = "shape-line";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.6014 4.3988 4.3986 19.6016\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path fill-rule=\"evenodd\" d=\"M4.5 21a1.5 1.5 0 0 1-1.0606-.4395A1.5 1.5 0 0 1 3 19.5v-15A1.4999 1.4999 0 0 1 4.5 3h15c.3978 0 .7792.1582 1.0605.4394.2814.2814.4395.6628.4395 1.0606v15c0 .3978-.1581.7792-.4395 1.0605A1.5 1.5 0 0 1 19.5 21zm.7822-2.2822c.2928.2926.7677.2924 1.0606 0l12.375-12.375a.7503.7503 0 0 0 0-1.0606.75.75 0 0 0-1.0606 0l-12.375 12.374a.751.751 0 0 0 0 1.0616\" clip-rule=\"evenodd\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.6014 4.3988 4.3986 19.6016\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M18.3345 4.3984H5.6655a1.267 1.267 0 0 0-1.267 1.267v12.6688a1.267 1.267 0 0 0 1.267 1.2669h12.669a1.267 1.267 0 0 0 1.2669-1.2669V5.6653a1.267 1.267 0 0 0-1.2669-1.2669\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.6013 4.3984 4.3985 19.6012\" fill=\"none\"/>" }
            };
        }
    }
}
