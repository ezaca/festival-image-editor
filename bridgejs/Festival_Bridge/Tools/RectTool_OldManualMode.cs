using Bridge.jQuery2;
using Festival_Bridge.Api.EditorComponents;
using Festival_Bridge.Api.Elements;
using Festival_Bridge.Api.Events;
using Festival_Bridge.Api.Tools;
using static Retyped.dom;

namespace Festival_Bridge.Tools
{
    /// <summary>
    /// The old tool to draw rectangles, but it is abandoned because it does
    /// not use the <see cref="Api.ManagedActions.ActionTimeline"/> and does
    /// not provide the history + undo/redo capacities. It also changes the SVG
    /// directly, which is undesired.
    /// </summary>
    [System.Obsolete("This tool does not use the Managed Action system.")]
    class RectTool_OldManualMode : ITool
    {
        public string ToolId => "rect-" + GetHashCode();

        public char HotKey => 'U';

        public string DisplayName => "Rectangle";

        public string IconName => "icons8-rectangular-32";

        public CategoryName Category => CategoryName.Shape;

        private SVGRectElement currentSvgRect = null;

        public void Awake()
        {
        }

        public void Enable()
        {
            EventManager.On<PointerDownSignal>(OnPointerDown);
            EventManager.On<PointerUpSignal>(OnPointerUp);
            EventManager.On<PointerDragSignal>(OnPointerDrag);
        }

        public void Disable()
        {
            EventManager.Off<PointerUpSignal>(OnPointerUp);
            EventManager.Off<PointerDownSignal>(OnPointerDown);
            EventManager.Off<PointerDragSignal>(OnPointerDrag);
            currentSvgRect = null;
        }

        private void OnPointerDown(PointerDownSignal ev)
        {
            currentSvgRect = currentSvgRect = document.createElementNS(ToolUtils.SvgNamespace, "rect") as SVGRectElement;
            currentSvgRect.setAttributeNS(null, "x", $"{ev.StageX}px");
            currentSvgRect.setAttributeNS(null, "y", $"{ev.StageY}px");
            currentSvgRect.setAttributeNS(null, "width", "0");
            currentSvgRect.setAttributeNS(null, "height", "0");
            currentSvgRect.setAttributeNS(null, "stroke", "black");
            currentSvgRect.setAttributeNS(null, "fill", "transparent");
            currentSvgRect.style.pointerEvents = "none";
            Stage.Current.Canvas.CurrentLayer.Element.Append(new jQuery(currentSvgRect));
        }

        private void OnPointerUp(PointerUpSignal ev)
        {
            if (currentSvgRect != null)
            {
                if (ev.MouseButton != ev.ActualButton)
                {
                    currentSvgRect.remove();
                    currentSvgRect = null;
                }
                else
                {
                    currentSvgRect = null;
                }
            }
        }

        private void OnPointerDrag(PointerDragSignal ev)
        {
            currentSvgRect.setAttributeNS(null, "x", $"{ev.AnchoredStageX}px");
            currentSvgRect.setAttributeNS(null, "y", $"{ev.AnchoredStageY}px");
            currentSvgRect.setAttributeNS(null, "width", $"{ev.Width}px");
            currentSvgRect.setAttributeNS(null, "height", $"{ev.Height}px");
        }
    }
}
