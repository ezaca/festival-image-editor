using Bridge.Html5;
using Festival_Bridge.Api.Elements;
using Festival_Bridge.Api.Events;
using Festival_Bridge.Api.Toolbars;
using Festival_Bridge.Api.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Festival_Bridge.Tools
{
    /// <summary>
    /// A debug tool that draws a dotted rectangle like a selection tool, but
    /// it does nothing than showing the rectangle on pointer down and removing
    /// it on pointer up. It was the first and the inspirational tool.
    /// </summary>
    class DebugRectTool : ITool
    {
        public string ToolId => "debug-rect-"+GetHashCode();

        public string IconName => "icons8-cursor-32";

        public char HotKey => 'V';

        public string DisplayName => "DebugRect";

        public CategoryName Category => CategoryName.NoCategory;

        public HTMLDivElement element;

        private string borderColor;

        public void Awake()
        {
            Random random = new Random();
            borderColor = $"hsl({random.Next(360)}, 100%, 40%)";
        }

        public void Enable()
        {
            element = Document.CreateElement<HTMLDivElement>("DIV");
            element.Style.Border = $"1px dashed {borderColor}";
            element.Style.Position = "absolute";
            element.Style.Display = "none";
            element.Style.PointerEvents = "none";
            element.Style.ZIndex = "999999";
            SetDivPosition(0, 0, 0, 0);
            ElementsManager.ViewportStage.Append(element);

            EventManager.On<PointerDownSignal>(PointerDown);
            EventManager.On<PointerDragSignal>(PointerDrag);
            EventManager.On<PointerUpSignal>(PointerUp);
        }

        public void Disable()
        {
            EventManager.Off<PointerDownSignal>(PointerDown);
            EventManager.Off<PointerDragSignal>(PointerDrag);
            EventManager.Off<PointerUpSignal>(PointerUp);
            element?.Remove();
            element = null;
        }

        void PointerDown(PointerDownSignal e)
        {
            element.Style.Display = "";
            SetDivPosition(e.ViewportX, e.ViewportY, 0, 0);
        }

        void PointerDrag(PointerDragSignal e)
        {
            SetDivPosition(e.AnchoredX, e.AnchoredY, e.Width, e.Height);
        }

        void PointerUp(PointerUpSignal e)
        {
            element.Style.Display = "none";
        }

        void SetDivPosition(int x, int y, int width, int height)
        {
            element.Style.Left = $"{x}px";
            element.Style.Top = $"{y}px";
            element.Style.Width = $"{width}px";
            element.Style.Height = $"{height}px";
        }
    }
}
