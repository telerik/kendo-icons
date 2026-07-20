namespace Telerik.SvgIcons
{
    public class XCircle : SvgIconBase
    {
        public XCircle()
        {
            Name = "x-circle";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m15 9-6 6m0-6 6 6m6-3c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M11.999 2.25a9.75 9.75 0 1 0 9.7499 9.7499A9.7604 9.7604 0 0 0 11.999 2.25m3.5306 12.2193a.752.752 0 0 1 .2197.5306.75.75 0 0 1-.2197.5306.751.751 0 0 1-.8178.1627.75.75 0 0 1-.2435-.1627l-2.4693-2.4703-2.4694 2.4703a.75.75 0 0 1-1.0613 0 .751.751 0 0 1-.1626-.8178.75.75 0 0 1 .1626-.2434l2.4703-2.4694-2.4702-2.4693a.7504.7504 0 0 1 1.0612-1.0613l2.4694 2.4703 2.4693-2.4703a.75.75 0 0 1 .8178-.1626.75.75 0 0 1 .4061.406.751.751 0 0 1-.1626.8179l-2.4703 2.4693z\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m15 9-6 6m0-6 6 6m6-3c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m15 9-6 6m0-6 6 6m6-3c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9\" fill=\"none\"/>" }
            };
        }
    }
}
