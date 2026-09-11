namespace Telerik.SvgIcons
{
    public class OvalShape : SvgIconBase
    {
        public OvalShape()
        {
            Name = "oval-shape";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 18c4.9706 0 9-2.6863 9-6s-4.0294-6-9-6-9 2.6863-9 6 4.0294 6 9 6\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 18c4.9706 0 9-2.6863 9-6s-4.0294-6-9-6-9 2.6863-9 6 4.0294 6 9 6\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 18c4.9706 0 9-2.6863 9-6s-4.0294-6-9-6-9 2.6863-9 6 4.0294 6 9 6\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M11.7344 18c4.9705 0 9-2.6863 9-6s-4.0295-6-9-6-9 2.6863-9 6 4.0294 6 9 6\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 18c4.9706 0 9-2.6863 9-6s-4.0294-6-9-6-9 2.6863-9 6 4.0294 6 9 6\" fill=\"none\"/>" }
            };
        }
    }
}
