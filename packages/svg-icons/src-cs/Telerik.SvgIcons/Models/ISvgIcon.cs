using System.Collections.Generic;

namespace Telerik.SvgIcons
{
    public interface ISvgIcon
    {
        string Name { get; set; }

        string Content { get; set; }

        string ViewBox { get; set; }

        string[] Tags { get; set; }

        Dictionary<string, string> Variants { get; set; }
    }
}
