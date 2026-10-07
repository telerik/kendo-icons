namespace Telerik.SvgIcons
{
    public class Underline : SvgIconBase
    {
        public Underline()
        {
            Name = "underline";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 21h12m-.75-15.75v7.5a5.2499 5.2499 0 0 1-8.9623 3.7123A5.25 5.25 0 0 1 6.75 12.75v-7.5\" fill=\"none\" stroke-width=\"var(--kendo-icon-stroke-width, 1.5)\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M19.4989 2.9963H4.499a1.5 1.5 0 0 0-1.5 1.5v14.9999a1.5 1.5 0 0 0 1.5 1.5H19.499a1.5 1.5 0 0 0 1.5-1.5V4.4963a1.5 1.5 0 0 0-1.5-1.5m-12 3.75a.75.75 0 0 1 1.5 0v4.5a3 3 0 0 0 6 0v-4.5a.75.75 0 0 1 .75-.75.7503.7503 0 0 1 .75.75v4.5a4.5 4.5 0 0 1-9 0zm9 11.9999h-9a.75.75 0 0 1-.75-.75.75.75 0 0 1 .75-.75h9a.7497.7497 0 0 1 .75.75.75.75 0 0 1-.75.75\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 21h12m-.75-15.75v7.5a5.2499 5.2499 0 0 1-8.9623 3.7123A5.25 5.25 0 0 1 6.75 12.75v-7.5\" fill=\"none\" stroke-width=\"var(--kendo-icon-stroke-width, 1.5)\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M17.25 5.25v7.5a5.2499 5.2499 0 0 1-8.9623 3.7123A5.25 5.25 0 0 1 6.75 12.75v-7.5z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 21h12m-.75-15.75v7.5a5.2499 5.2499 0 0 1-8.9623 3.7123A5.25 5.25 0 0 1 6.75 12.75v-7.5\" fill=\"none\" stroke-width=\"var(--kendo-icon-stroke-width, 1.5)\"/>" },
                { "legacy", "<path d=\"M6 19.5h12V21H6zM15 3v10.5c0 .5437-.1641.75-.4828.9516C13.9641 14.7985 13.05 15 12 15s-1.9641-.2016-2.5172-.5484C9.1641 14.25 9 14.0438 9 13.5V3H6v10.5c0 3.3 3.0141 4.5 6 4.5s6-1.2 6-4.5V3z\"/>" }
            };
        }
    }
}
