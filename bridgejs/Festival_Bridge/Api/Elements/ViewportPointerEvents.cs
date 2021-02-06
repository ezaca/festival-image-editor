using Bridge.Html5;
using Bridge.jQuery2;
using Festival_Bridge.Api.Events;

namespace Festival_Bridge.Api.Elements
{
    /// <summary>
    /// Manages pointer events in the drawing area (Stage).
    /// </summary>
    class ViewportPointerEvents
    {
        public delegate void OnPointerEvent(MouseEvent e);

        static public void Init()
        {
            jQuery.Ready(() =>
            {
                Assign(ElementsManager.ViewportPointerArea, "pointerdown", PointerDown);
                Assign(ElementsManager.ViewportPointerArea, "pointermove", PointerMove);
                Assign(ElementsManager.ViewportPointerArea, "pointerup", PointerUp);
                Assign(ElementsManager.ViewportPointerArea, "contextmenu", PreventDefault);
                Assign(ElementsManager.Body, "pointerup", PointerUpGlobally);
            });
        }

        static private bool isPointerDown = false;
        static private int originalClickX;
        static private int originalClickY;
        static private int clickButton;

        static void Assign(jQuery element, string eventName, OnPointerEvent pointerEvent)
        {
            element.On(eventName, pointerEvent);
        }

        static void PreventDefault(Event e)
        {
            e.PreventDefault();
        }

        static void PointerDown(MouseEvent e)
        {
            e.PreventDefault();
            ElementsManager.Viewport.Focus();
            PointerUtils.PageXYToStageXY(e.PageX, e.PageY, out int x, out int y);

            if (isPointerDown == false)
            {
                pointerUpLocally = false;
                isPointerDown = true;
                originalClickX = x;
                originalClickY = y;
                clickButton = e.Button;
                EventManager.Dispatch(new PointerDownSignal
                {
                    AltKey = e.AltKey,
                    CtrlKey = e.CtrlKey,
                    ShiftKey = e.ShiftKey,
                    ViewportX = originalClickX,
                    ViewportY = originalClickY,
                    MouseButton = clickButton,
                });
            }
        }

        static private bool pointerUpLocally = false;

        static void PointerUp(MouseEvent e)
        {
            e.PreventDefault();
            PointerUtils.PageXYToStageXY(e.PageX, e.PageY, out int x, out int y);
            pointerUpLocally = true;
            if (isPointerDown)
            {
                EventManager.Dispatch(new PointerUpSignal
                {
                    AltKey = e.AltKey,
                    CtrlKey = e.CtrlKey,
                    ShiftKey = e.ShiftKey,
                    AnchoredX = originalClickX < x ? originalClickX : x,
                    AnchoredY = originalClickY < y ? originalClickY : y,
                    ViewportX = x > originalClickX ? x : originalClickX,
                    ViewportY = y > originalClickY ? y : originalClickY,
                    MouseButton = clickButton,
                    OriginalX = originalClickX,
                    OriginalY = originalClickY,
                    ActualX = x,
                    ActualY = y,
                    ActualButton = e.Button,
                });
            }
        }

        static void PointerUpGlobally(MouseEvent e)
        {
            PointerUtils.PageXYToStageXY(e.PageX, e.PageY, out int x, out int y);

            if (isPointerDown && pointerUpLocally == false)
            {
                EventManager.Dispatch(new PointerUpSignal
                {
                    AltKey = e.AltKey,
                    CtrlKey = e.CtrlKey,
                    ShiftKey = e.ShiftKey,
                    AnchoredX = originalClickX < x ? originalClickX : x,
                    AnchoredY = originalClickY < y ? originalClickY : y,
                    ViewportX = x > originalClickX ? x : originalClickX,
                    ViewportY = y > originalClickY ? y : originalClickY,
                    MouseButton = clickButton,
                    OriginalX = originalClickX,
                    OriginalY = originalClickY,
                    ActualX = x,
                    ActualY = y,
                    ActualButton = e.Button,
                });
            }

            if (isPointerDown)
            {
                e.PreventDefault();
                isPointerDown = false;
            }
        }

        static void PointerMove(MouseEvent e)
        {
            e.PreventDefault();
            PointerUtils.PageXYToStageXY(e.PageX, e.PageY, out int x, out int y);

            if (isPointerDown)
            {
                EventManager.Dispatch(new PointerDragSignal
                {
                    AltKey = e.AltKey,
                    CtrlKey = e.CtrlKey,
                    ShiftKey = e.ShiftKey,
                    AnchoredX = originalClickX < x ? originalClickX : x,
                    AnchoredY = originalClickY < y ? originalClickY : y,
                    ViewportX = x > originalClickX ? x : originalClickX,
                    ViewportY = y > originalClickY ? y : originalClickY,
                    MouseButton = clickButton,
                    OriginalX = originalClickX,
                    OriginalY = originalClickY,
                    ActualX = x,
                    ActualY = y,
                    ActualButton = e.Button,
                });
            }
            else
            {
                EventManager.Dispatch(new PointerHoverSignal
                {
                    AltKey = e.AltKey,
                    CtrlKey = e.CtrlKey,
                    ShiftKey = e.ShiftKey,
                    ViewportX = x,
                    ViewportY = y,
                });
            }
        }
    }
}
