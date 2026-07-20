namespace Telerik.SvgIcons
{
    public class PlusCircle : SvgIconBase
    {
        public PlusCircle()
        {
            Name = "plus-circle";
            Content = "<path stroke-linecap=\"round\" d=\"M8.25 12h7.5M12 8.25v7.5M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9Z\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M11.999 2.2498a9.75 9.75 0 1 0 9.7499 9.7499 9.762 9.762 0 0 0-9.7499-9.75m3.7499 10.4999h-3v3a.75.75 0 0 1-.7499.7499.7502.7502 0 0 1-.75-.7499v-3h-3a.75.75 0 0 1-.75-.75.75.75 0 0 1 .75-.75h3v-3a.75.75 0 0 1 .75-.75.75.75 0 0 1 .7499.75v3h3a.7501.7501 0 1 1 0 1.5\"/>" },
                { "outline", "<path stroke-linecap=\"round\" d=\"M8.25 12h7.5M12 8.25v7.5M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9Z\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M12 21c4.9706 0 9-4.0294 9-9s-4.0294-9-9-9-9 4.0294-9 9 4.0294 9 9 9\"/><path stroke-linecap=\"round\" d=\"M8.2495 12h7.5m-3.75-3.75v7.5m9-3.75c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0295-9 9-9 9 4.0294 9 9Z\" fill=\"none\"/>" }
            };
        }
    }
}
