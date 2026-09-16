namespace Telerik.SvgIcons
{
    public class Sharpen : SvgIconBase
    {
        public Sharpen()
        {
            Name = "sharpen";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3 6.25 20.25h11.5z\" fill=\"none\" stroke-width=\"var(--kendo-icon-stroke-width, 1.5)\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3 6.25 20.25h11.5z\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3 6.25 20.25h11.5z\" fill=\"none\" stroke-width=\"var(--kendo-icon-stroke-width, 1.5)\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M12 3 6.25 20.25h11.5z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3 6.25 20.25h11.5z\" fill=\"none\" stroke-width=\"var(--kendo-icon-stroke-width, 1.5)\"/>" }
            };
        }
    }
}
