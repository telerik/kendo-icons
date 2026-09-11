namespace Telerik.SvgIcons
{
    public class LinePointRounded : SvgIconBase
    {
        public LinePointRounded()
        {
            Name = "line-point-rounded";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20.2496 9.7501C18.985 9.7506 7.2431 9.75 6.0005 9.75s-2.25 1.0074-2.25 2.25 1.0074 2.25 2.25 2.25h14.2491\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.7505 12c0 1.2426 1.0074 2.25 2.25 2.25h14.2491V9.7501C18.985 9.7506 7.2431 9.75 6.0005 9.75s-2.25 1.0074-2.25 2.25\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20.2496 9.7501C18.985 9.7506 7.2431 9.75 6.0005 9.75s-2.25 1.0074-2.25 2.25 1.0074 2.25 2.25 2.25h14.2491\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M20.25 14.2501H6.0005c-1.2426 0-2.25-1.0073-2.25-2.25s1.0074-2.25 2.25-2.25c.6537 0 9.3112-.0003 14.2495.0002z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20.2496 9.7501C18.985 9.7506 7.2431 9.75 6.0005 9.75s-2.25 1.0074-2.25 2.25 1.0074 2.25 2.25 2.25h14.2491\" fill=\"none\"/>" }
            };
        }
    }
}
