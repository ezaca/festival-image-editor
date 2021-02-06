using Bridge.jQuery2;
using Festival_Bridge.Api.EditorComponents;
using Festival_Bridge.Api.Elements;
using Festival_Bridge.Api.Events;
using Festival_Bridge.Api.ManagedActions;
using Festival_Bridge.Api.Tools;
using Festival_Bridge.ManagedActions;
using System;
using static Retyped.dom;
using Console = System.Console;

namespace Festival_Bridge.Tools
{
    /// <summary>
    /// The rectangle drawing tool.
    /// </summary>
    class RectTool : ITool
    {
        public string ToolId => "rect-" + GetHashCode();

        public char HotKey => 'U';

        public string DisplayName => "Rectangle";

        public string IconName => "icons8-rectangular-32";

        public CategoryName Category => CategoryName.Shape;


        private CreateSvgRect currentAction = null;

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
            currentAction = null;
        }

        private void OnPointerDown(PointerDownSignal ev)
        {
            if (currentAction != null)
                currentAction.Undo();

            currentAction = new CreateSvgRect(Stage.Current.Canvas.CurrentLayer.Element);
            currentAction.Do();
            currentAction.SetSelectedRect(ev.StageX, ev.StageY, ev.StageX, ev.StageY);
            currentAction.Element.style.pointerEvents = "none";
        }

        private void OnPointerUp(PointerUpSignal ev)
        {
            if (currentAction != null)
            {
                if (ev.MouseButton != ev.ActualButton)
                {
                    currentAction.Undo();
                }
                else
                {
                    currentAction.SetSelectedRect(ev.AnchoredStageX, ev.AnchoredStageY, ev.StageX, ev.StageY);
                    ConfirmShape();
                }
                currentAction = null;
            }
        }

        private void ConfirmShape()
        {
            if (currentAction.IsNullSize())
                currentAction.Undo();
            else
                ActionTimeline.Instance.Do(currentAction, true);
        }

        private void OnPointerDrag(PointerDragSignal ev)
        {
            currentAction.SetSelectedRect(ev.AnchoredStageX, ev.AnchoredStageY, ev.StageX, ev.StageY);
        }
    }
}
