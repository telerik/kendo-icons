namespace Telerik.SvgIcons
{
    public class ArrowShape : SvgIconBase
    {
        public ArrowShape()
        {
            Name = "arrow-shape";
            Content = "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 18 18 6m0 9.75V6H8.25\" fill=\"none\"/>";
            ViewBox = "0 0 24 24";
            Variants = new System.Collections.Generic.Dictionary<string, string>
            {
                { "solid", "<path d=\"M18.749 6.0002v9.75a.7498.7498 0 0 1-.8965.7361.75.75 0 0 1-.3841-.2055l-4.3444-4.3453-6.5943 6.5953a.7505.7505 0 0 1-1.0613-1.0613l6.5953-6.5943-4.3453-4.3443a.75.75 0 0 1 .5307-1.2807h9.7499a.75.75 0 0 1 .75.75\"/>" },
                { "outline", "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 18 18 6m0 9.75V6H8.25\" fill=\"none\"/>" },
                { "duotone", "<path fill-opacity=\"0.2\" d=\"M8.25 6H18v9.75z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m6 18 7.125-7.125M8.25 6H18v9.75z\" fill=\"none\"/>" }
            };
        }
    }
}
