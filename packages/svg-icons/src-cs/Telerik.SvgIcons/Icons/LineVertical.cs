namespace Telerik.SvgIcons
{
    public class LineVertical : SvgIconBase
    {
        public LineVertical()
        {
            Name = "line-vertical";
            Content = "<path d=\"M12.506 3.225v17.55a.507.507 0 0 1-1.013 0V3.225a.506.506 0 0 1 1.012 0z\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M18.75 3.9H5.25A1.35 1.35 0 0 0 3.9 5.25v13.5a1.35 1.35 0 0 0 1.35 1.35h13.5a1.35 1.35 0 0 0 1.35-1.35V5.25a1.35 1.35 0 0 0-1.35-1.35m-6.075 13.5a.675.675 0 0 1-1.35 0V6.6a.675.675 0 0 1 1.35 0z\"/>" },
                { "outline", "<path d=\"M12.506 3.225v17.55a.507.507 0 0 1-1.013 0V3.225a.506.506 0 0 1 1.012 0z\"/>" },
                { "duotone", "<path d=\"M20.1 5.25v13.5a1.35 1.35 0 0 1-1.35 1.35H5.25a1.35 1.35 0 0 1-1.35-1.35V5.25A1.35 1.35 0 0 1 5.25 3.9h13.5a1.35 1.35 0 0 1 1.35 1.35\" opacity=\"0.2\"/><path d=\"M12.675 3.225v17.55a.675.675 0 0 1-1.35 0V3.225a.675.675 0 0 1 1.35 0\"/>" }
            };
        }
    }
}
