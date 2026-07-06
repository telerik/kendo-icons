namespace Telerik.SvgIcons
{
    public class Blur : SvgIconBase
    {
        public Blur()
        {
            Name = "blur";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 13.5c0-6.75-7.5-12-7.5-12s-7.5 5.25-7.5 12a7.5 7.5 0 0 0 15 0\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M16.3125 4.4766A23.83 23.83 0 0 0 12.4266.886a.75.75 0 0 0-.8607 0 23.83 23.83 0 0 0-3.8784 3.5906C5.1103 7.4363 3.75 10.5563 3.75 13.5a8.25 8.25 0 1 0 16.5 0c0-2.9437-1.3603-6.0637-3.9375-9.0234\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 13.5c0-6.75-7.5-12-7.5-12s-7.5 5.25-7.5 12a7.5 7.5 0 0 0 15 0\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M19.5 13.5c0-6.75-7.5-12-7.5-12s-7.5 5.25-7.5 12a7.5 7.5 0 0 0 15 0\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 13.5c0-6.75-7.5-12-7.5-12s-7.5 5.25-7.5 12a7.5 7.5 0 0 0 15 0\" fill=\"none\"/>" }
            };
        }
    }
}
