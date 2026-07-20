namespace Telerik.SvgIcons
{
    public class SortDescSmall : SvgIconBase
    {
        public SortDescSmall()
        {
            Name = "sort-desc-small";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3.75v16.5m6.75-6.75L12 20.25 5.25 13.5\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"m19.2796 14.0276-6.7499 6.75a.75.75 0 0 1-.2434.1628.75.75 0 0 1-.5744 0 .75.75 0 0 1-.2435-.1628l-6.7499-6.75a.7502.7502 0 0 1 .1136-1.1544.75.75 0 0 1 .417-.1262h6v-9a.75.75 0 0 1 .75-.75.75.75 0 0 1 .75.75v9h5.9999a.75.75 0 0 1 .7362.8965.75.75 0 0 1-.2056.3841\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3.75v16.5m6.75-6.75L12 20.25 5.25 13.5\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M5.25 13.5 12 20.25l6.75-6.75z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3.75v9.75m-6.75 0L12 20.25l6.75-6.75z\" fill=\"none\"/>" }
            };
        }
    }
}
