namespace Telerik.SvgIcons
{
    public class MinusCircle : SvgIconBase
    {
        public MinusCircle()
        {
            Name = "minus-circle";
            Content = "<path stroke-linecap=\"round\" stroke-miterlimit=\"10\" d=\"M8.25 12h7.5M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9Z\" fill=\"none\" stroke-width=\"var(--kendo-icon-stroke-width, 1.5)\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M11.999 2.2495a9.75 9.75 0 1 0 9.7499 9.7499 9.7604 9.7604 0 0 0-9.7499-9.7499m3.7499 10.4999h-7.5a.75.75 0 0 1-.75-.75.75.75 0 0 1 .75-.75h7.5a.7502.7502 0 0 1 0 1.5\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-miterlimit=\"10\" d=\"M8.25 12h7.5M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9Z\" fill=\"none\" stroke-width=\"var(--kendo-icon-stroke-width, 1.5)\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9\"/><path stroke-linecap=\"round\" stroke-miterlimit=\"10\" d=\"M8.2495 12h7.5m5.25 0c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0295-9 9-9 9 4.0294 9 9Z\" fill=\"none\" stroke-width=\"var(--kendo-icon-stroke-width, 1.5)\"/>" },
                { "legacy", "<path d=\"M12 1.5C6.2016 1.5 1.5 6.2016 1.5 12S6.2016 22.5 12 22.5 22.5 17.7984 22.5 12 17.7984 1.5 12 1.5m-6 12v-3h12v3z\"/>" }
            };
        }
    }
}
