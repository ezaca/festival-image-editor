using Bridge.Html5;
using Festival_Bridge.Api.Types;
using static Retyped.dom;
using CSSStyleDeclaration = Retyped.dom.CSSStyleDeclaration;

namespace Festival_Bridge.Api.Tools
{
    /// <summary>
    /// Utilities to help the drawing tools.
    /// </summary>
    static class ToolUtils
    {
        public const string SvgNamespace = "http://www.w3.org/2000/svg";

        static public RGBA ForegroundColor = "#000";
        static public RGBA BackgroundColor = "#fff";

        static public void ApplyUserStyle(CSSStyleDeclaration style)
        {
            style.fill = BackgroundColor;
            style.stroke = ForegroundColor;
        }
    }
}
