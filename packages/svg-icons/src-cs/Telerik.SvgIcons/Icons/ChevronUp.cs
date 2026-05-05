namespace Telerik.SvgIcons
{
    public class ChevronUp : SvgIconBase
    {
        public ChevronUp()
        {
            Name = "chevron-up";
            Content = "<path d=\"M20.53 15.67a.607.607 0 0 1-.858 0L12.001 8l-7.67 7.67a.607.607 0 0 1-.859-.86l8.1-8.1a.607.607 0 0 1 .859 0l8.1 8.1a.607.607 0 0 1 0 .86z\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M20.849 15.55a.81.81 0 0 1-.749.5H3.9a.81.81 0 0 1-.574-1.384l8.1-8.1a.81.81 0 0 1 1.146 0l8.1 8.1a.81.81 0 0 1 .176.884z\"/>" },
                { "outline", "<path d=\"M20.53 15.67a.607.607 0 0 1-.858 0L12.001 8l-7.67 7.67a.607.607 0 0 1-.859-.86l8.1-8.1a.607.607 0 0 1 .859 0l8.1 8.1a.607.607 0 0 1 0 .86z\"/>" },
                { "duotone", "<path d=\"M20.1 15.24H3.9l8.1-8.1z\" opacity=\"0.2\"/><path d=\"m20.674 14.666-8.1-8.1a.81.81 0 0 0-1.146 0l-8.1 8.1a.81.81 0 0 0 .573 1.384h16.2a.81.81 0 0 0 .574-1.384zM5.856 14.43l6.145-6.145 6.145 6.145z\"/>" }
            };
        }
    }
}
