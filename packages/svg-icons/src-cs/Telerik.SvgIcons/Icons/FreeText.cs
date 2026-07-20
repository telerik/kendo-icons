namespace Telerik.SvgIcons
{
    public class FreeText : SvgIconBase
    {
        public FreeText()
        {
            Name = "free-text";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 5.25v13.5M5.25 8.25v-3h13.5v3M9 18.75h6\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M19.5 3h-15A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3m-2.25 6a.7498.7498 0 0 1-1.2803.5303A.75.75 0 0 1 15.75 9v-.75h-3v8.25h1.125a.7497.7497 0 0 1 .75.75.7497.7497 0 0 1-.75.75h-3.75a.7498.7498 0 0 1-.5303-1.2803.75.75 0 0 1 .5303-.2197h1.125V8.25h-3V9a.75.75 0 0 1-1.5 0V7.5a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75z\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 5.25v13.5M5.25 8.25v-3h13.5v3M9 18.75h6\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M5.25 5.25h13.5v12a1.5 1.5 0 0 1-1.5 1.5H6.75a1.5 1.5 0 0 1-1.5-1.5z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 5.25v13.5M5.25 8.25v-3h13.5v3M9 18.75h6\" fill=\"none\"/>" }
            };
        }
    }
}
