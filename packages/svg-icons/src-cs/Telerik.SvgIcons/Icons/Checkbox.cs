namespace Telerik.SvgIcons
{
    public class Checkbox : SvgIconBase
    {
        public Checkbox()
        {
            Name = "checkbox";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 3.75h-15a.75.75 0 0 0-.75.75v15a.75.75 0 0 0 .75.75h15a.75.75 0 0 0 .75-.75v-15a.75.75 0 0 0-.75-.75\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M19.4994 3.0002H4.4995c-.8284 0-1.5.6716-1.5 1.5v14.9999c0 .8284.6716 1.5 1.5 1.5h14.9999c.8284 0 1.5-.6716 1.5-1.5V4.5002c0-.8284-.6716-1.5-1.5-1.5\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 3.75h-15a.75.75 0 0 0-.75.75v15a.75.75 0 0 0 .75.75h15a.75.75 0 0 0 .75-.75v-15a.75.75 0 0 0-.75-.75\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M19.5 3.75h-15a.75.75 0 0 0-.75.75v15a.75.75 0 0 0 .75.75h15a.75.75 0 0 0 .75-.75v-15a.75.75 0 0 0-.75-.75\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 3.751h-15a.75.75 0 0 0-.75.75v15a.75.75 0 0 0 .75.75h15a.75.75 0 0 0 .75-.75v-15a.75.75 0 0 0-.75-.75\" fill=\"none\"/>" }
            };
        }
    }
}
