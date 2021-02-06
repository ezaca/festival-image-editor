using Bridge.jQuery2;
using Festival_Bridge.ManagedActions.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Retyped.dom;

namespace Festival_Bridge.ManagedActions
{
    /// <summary>
    /// A managed action for the rectangle drawing tool.
    /// </summary>
    class CreateSvgRect : CreateSvgElement<SVGRectElement>
    {
        public CreateSvgRect(jQuery parent) : base(parent) { }

        public override string DisplayName => "Create Rectangle";

        public override string SvgTagName => "rect";

        public override void RefreshElement(SVGRectElement element)
        {
            base.RefreshElement(element);
            var el = Externals.Untype<Bridge.Html5.HTMLElement>(element);
            el.SetAttributeNS(null, "x", $"{StartX}px");
            el.SetAttributeNS(null, "y", $"{StartY}px");
            el.SetAttributeNS(null, "width", $"{Width}px");
            el.SetAttributeNS(null, "height", $"{Height}px");
        }
    }
}
