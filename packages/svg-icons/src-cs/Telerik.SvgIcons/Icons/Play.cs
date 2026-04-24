namespace Telerik.SvgIcons
{
    public class Play : SvgIconBase
    {
        public Play()
        {
            Name = "play";
            Content = "<path d=\"M0 512V0l512 256z\" />";
            ViewBox = "0 0 512 512";
            Tags = new string[] { "media" };
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "" },
                { "outline", "" },
                { "duotone", "" }
            };
        }
    }
}
