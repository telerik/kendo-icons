namespace Telerik.SvgIcons
{
    public class LinePointSquare : SvgIconBase
    {
        public LinePointSquare()
        {
            Name = "line-point-square";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9.1482 12.0015h11.8513M4.5004 9.75h4.5v4.5h-4.5z\" fill=\"none\" stroke-width=\"var(--kendo-icon-stroke-width, 1.5)\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9.1482 12.0015h11.8513M4.5004 9.75h4.5v4.5h-4.5z\" fill=\"none\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9.1482 12.0015h11.8513M4.5004 9.75h4.5v4.5h-4.5z\" fill=\"none\" stroke-width=\"var(--kendo-icon-stroke-width, 1.5)\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M4.5004 9.75h4.5v4.5h-4.5z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9.1482 12.0015h11.8513M4.5004 9.75h4.5v4.5h-4.5z\" fill=\"none\" stroke-width=\"var(--kendo-icon-stroke-width, 1.5)\"/>" },
                { "legacy", "<path d=\"M4.2727 9.0352c-.218.0703-.4219.2766-.4875.4968-.0516.1688-.0516 4.7672 0 4.936.0445.1453.1547.2977.2836.389.2063.15.0938.1453 2.7328.1383l2.3976-.007.1125-.0539c.143-.0727.3-.2297.3727-.3727.0539-.1102.0539-.1242.0609-.9633l.007-.8484h5.679c4.7531 0 5.6953-.0047 5.7867-.0328.3-.0891.532-.4008.532-.7149 0-.3187-.2391-.6352-.5531-.7242-.0727-.0211-1.4789-.0281-5.7703-.0281H9.7523l-.007-.8508c-.007-.8367-.007-.8508-.0609-.9609-.0727-.143-.2297-.3-.3727-.3727l-.1125-.0539-2.414-.0047c-1.9664-.0023-2.4328.0023-2.5125.0282M8.25 12v1.5h-3v-3h3z\" clip-rule=\"evenodd\"/>" }
            };
        }
    }
}
