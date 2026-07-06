namespace Telerik.SvgIcons
{
    public class DragAndDrop : SvgIconBase
    {
        public DragAndDrop()
        {
            Name = "drag-and-drop";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10.4999 12h9.7499M3.75 8.25 7.5 12l-3.75 3.7499z\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M3.75 8.25 7.5 12l-3.75 3.7499\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10.4999 12h9.7499M3.75 8.25 7.5 12l-3.75 3.7499z\" fill=\"none\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10.4999 12h9.7499M3.75 8.25 7.5 12l-3.75 3.7499z\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M3.75 8.25 7.5 12l-3.75 3.7499\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10.5 11.9995h9.7499m-16.4998-3.75 3.75 3.75-3.75 3.7499z\" fill=\"none\"/>" }
            };
        }
    }
}
