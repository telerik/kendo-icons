namespace Telerik.SvgIcons
{
    public class LevelDown : SvgIconBase
    {
        public LevelDown()
        {
            Name = "level-down";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M21 14.5 16.5 19 12 14.5m4.5 4.5V5.5H3\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"m21.5295 15.5325-4.5 4.5a.75.75 0 0 1-1.0612 0l-4.5-4.5a.75.75 0 0 1-.1628-.8177.75.75 0 0 1 .6934-.4629h3.75v-7.5H2.999a.75.75 0 0 1 0-1.5H16.499a.75.75 0 0 1 .75.75v8.25h3.75a.75.75 0 0 1 .6934.4629.749.749 0 0 1-.1628.8177\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M21 14.5 16.5 19 12 14.5m4.5 4.5V5.5H3\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"m12 15 4.5 4.5L21 15z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 6h13.5v9M12 15l4.5 4.5L21 15z\" fill=\"none\"/>" }
            };
        }
    }
}
