namespace Telerik.SvgIcons
{
    public class ChevronRight : SvgIconBase
    {
        public ChevronRight()
        {
            Name = "chevron-right";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m9 4.5 7.5 7.5L9 19.5\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"m17.0295 11.4728-7.5-7.5a.75.75 0 0 0-1.2805.5307v14.9999a.75.75 0 0 0 .4629.6935.75.75 0 0 0 .8177-.1629l7.4999-7.4999a.75.75 0 0 0 .22-.5306.75.75 0 0 0-.0572-.2872.75.75 0 0 0-.1628-.2435\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m9 4.5 7.5 7.5L9 19.5\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"m9 4.5 7.5 7.5L9 19.5z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m9 4.5 7.5 7.5L9 19.5z\" fill=\"none\"/>" }
            };
        }
    }
}
