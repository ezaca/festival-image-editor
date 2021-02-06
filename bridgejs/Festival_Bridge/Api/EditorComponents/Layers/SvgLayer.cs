using Bridge.jQuery2;
using Festival_Bridge.Api.Tools;
using static Retyped.dom;

namespace Festival_Bridge.Api.EditorComponents.Layers
{
    /// <summary>
    /// A Canvas drawing layer, capable of managing an SVG drawing.
    /// </summary>
    class SvgLayer : CustomLayer
    {
        public SVGSVGElement SvgElement;

        public SvgLayer(StageCanvas canvas, string name)
            : base(canvas, name)
        {
            SvgElement = document.createElementNS(ToolUtils.SvgNamespace, "svg") as SVGSVGElement;
            Element = new jQuery(SvgElement);
            Element.AppendTo(canvas.Element);
        }

        #region Interactions with layer

        #endregion
    }
}