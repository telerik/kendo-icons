namespace Telerik.SvgIcons
{
    public class ChevronLeft : SvgIconBase
    {
        public ChevronLeft()
        {
            Name = "chevron-left";
            Content = "<path d=\"M15.67 19.67a.607.607 0 1 1-.86.858l-8.1-8.1a.607.607 0 0 1 0-.859l8.1-8.1a.607.607 0 0 1 .86.859L8 11.999z\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M16.05 3.9v16.2a.81.81 0 0 1-1.384.574l-8.1-8.1a.81.81 0 0 1 0-1.146l8.1-8.1a.81.81 0 0 1 1.384.573z\"/>" },
                { "outline", "<path d=\"M15.67 19.67a.607.607 0 1 1-.86.858l-8.1-8.1a.607.607 0 0 1 0-.859l8.1-8.1a.607.607 0 0 1 .86.859L8 11.999z\"/>" },
                { "duotone", "<path d=\"M15.24 3.9v16.2L7.14 12z\" opacity=\"0.2\"/><path d=\"M15.55 3.151a.81.81 0 0 0-.884.175l-8.1 8.1a.81.81 0 0 0 0 1.146l8.1 8.1a.81.81 0 0 0 1.384-.573v-16.2a.81.81 0 0 0-.5-.749zm-1.12 14.993-6.145-6.145 6.145-6.145z\"/>" }
            };
        }
    }
}
