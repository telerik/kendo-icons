namespace Telerik.SvgIcons
{
    public class ArrowRight : SvgIconBase
    {
        public ArrowRight()
        {
            Name = "arrow-right";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 12h16.5m-6.75 6.75L20.25 12 13.5 5.25\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"m20.7795 12.527-6.7499 6.75a.7502.7502 0 0 1-1.2807-.5307v-5.9999H3.749a.7498.7498 0 0 1-.5303-1.2803.75.75 0 0 1 .5303-.2197h8.9999v-6a.7502.7502 0 0 1 1.2807-.5306l6.7499 6.75a.749.749 0 0 1 .22.5306.75.75 0 0 1-.22.5306\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 12h16.5m-6.75 6.75L20.25 12 13.5 5.25\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M13.5 5.25 20.25 12l-6.75 6.75z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 12h9.75m0-6.75L20.25 12l-6.75 6.75z\" fill=\"none\"/>" }
            };
        }
    }
}
