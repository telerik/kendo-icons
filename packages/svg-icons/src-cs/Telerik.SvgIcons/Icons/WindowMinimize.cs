namespace Telerik.SvgIcons
{
    public class WindowMinimize : SvgIconBase
    {
        public WindowMinimize()
        {
            Name = "window-minimize";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 17h16.5\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path fill-rule=\"evenodd\" d=\"M19.5 3c.3978 0 .7792.1582 1.0605.4394.2814.2814.4395.6628.4395 1.0606v15c0 .3978-.1582.7792-.4395 1.0605A1.5 1.5 0 0 1 19.5 21h-15a1.5 1.5 0 0 1-1.0606-.4395A1.5 1.5 0 0 1 3 19.5v-15A1.4999 1.4999 0 0 1 4.5 3zM6.75 16.25a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5z\" clip-rule=\"evenodd\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 17h16.5\" fill=\"none\"/>" },
                { "duotone", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 17h16.5\" fill=\"none\"/><path fill-opacity=\"0.2\" d=\"M19.3855 3.75H4.6145a.8645.8645 0 0 0-.8645.8645v14.771c0 .4774.387.8645.8645.8645h14.771a.8646.8646 0 0 0 .8645-.8645V4.6145a.8645.8645 0 0 0-.8645-.8645\"/>" }
            };
        }
    }
}
