namespace Telerik.SvgIcons
{
    public class ChartPie : SvgIconBase
    {
        public ChartPie()
        {
            Name = "chart-pie";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3c-4.9706 0-9 4.0294-9 9s4.0294 9 9 9 9-4.0294 9-9-4.0294-9-9-9m0 0v9m7.7943-4.5-15.5887 9\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M11.999 2.2517a9.75 9.75 0 1 0 9.7499 9.7499 9.7604 9.7604 0 0 0-9.7499-9.7499m0 1.5a8.25 8.25 0 0 1 6.7377 3.494l-6.7377 3.8897zm0 16.4999a8.251 8.251 0 0 1-6.7378-3.4941l14.2274-8.2133a8.25 8.25 0 0 1-7.4896 11.7074\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3c-4.9706 0-9 4.0294-9 9s4.0294 9 9 9 9-4.0294 9-9-4.0294-9-9-9m0 0v9m7.7943-4.5-15.5887 9\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"m11.9999 12-7.7944 4.5A9 9 0 0 1 12 3z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3.001c-4.9706 0-9 4.0294-9 9s4.0294 9 9 9 9-4.0295 9-9-4.0294-9-9-9m0 0v9m7.7943-4.5-15.5887 9\" fill=\"none\"/>" }
            };
        }
    }
}
