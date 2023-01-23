namespace Telerik.SvgIcons
{
    public class SvgIconBase : ISvgIcon
    {
        public string Name { get; set; }

        public string Content { get; set; }

        public string ViewBox { get; set; }

        public override bool Equals(object obj)
        {
            var other = obj as SvgIconBase;

            if (obj == null)
            {
                return false;
            }

            return Name == other.Name && Content == other.Content && ViewBox == other.ViewBox;
        }

        public override int GetHashCode()
        {
            return (Name + Content + ViewBox).GetHashCode();
        }
    }
}
