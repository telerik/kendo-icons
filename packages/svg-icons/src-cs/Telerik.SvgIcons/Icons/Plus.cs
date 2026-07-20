namespace Telerik.SvgIcons
{
    public class Plus : SvgIconBase
    {
        public Plus()
        {
            Name = "plus";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 12h16.5M12 3.75v16.5\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M19.4989 3H4.499a1.5 1.5 0 0 0-1.5 1.5v14.9999a1.5 1.5 0 0 0 1.5 1.5H19.499a1.5 1.5 0 0 0 1.5-1.5v-15a1.4999 1.4999 0 0 0-1.5-1.5m-2.25 9.7499h-4.5v4.5a.75.75 0 1 1-1.4999 0v-4.5h-4.5a.75.75 0 0 1-.75-.75.75.75 0 0 1 .75-.75h4.5v-4.5a.75.75 0 0 1 .75-.75.75.75 0 0 1 .7499.75v4.5h4.5a.7501.7501 0 0 1 0 1.5\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 12h16.5M12 3.75v16.5\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M18.75 3.75H5.25c-.8284 0-1.5.6716-1.5 1.5v13.5c0 .8284.6716 1.5 1.5 1.5h13.5c.8284 0 1.5-.6716 1.5-1.5V5.25c0-.8284-.6716-1.5-1.5-1.5\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.7495 12h8.25m0 0h8.25m-8.25 0V3.75m0 8.25v8.25\" fill=\"none\"/>" }
            };
        }
    }
}
