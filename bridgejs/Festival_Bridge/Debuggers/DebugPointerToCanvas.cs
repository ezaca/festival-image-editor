using Bridge.jQuery2;
using Bridge.Utils;
using Festival_Bridge.Api.Elements;
using Festival_Bridge.Api.Events;
using Festival_Bridge.Api.ManagedActions;

namespace Festival_Bridge.Debuggers
{
    /// <summary>
    /// This class is for debugging and helps to see information about hand
    /// events in Stage and Canvas. It is intended for developers, not end
    /// users.
    /// </summary>
    class DebugPointerToCanvas
    {
        public DebugPointerToCanvas()
        {
            jQuery debug = new jQuery("#debugArea");

            EventManager.On<PointerDownSignal>(e =>
            {
                debug.Children(".pointer-event").Text("Down");
                debug.Children(".pointer-button").Text(Modifiers(e));
                debug.Children(".pointer-start").Text($"({e.StageX}, {e.StageY})");
                debug.Children(".pointer-end").Text($"n/a");
                debug.Children(".pointer-size").Text($"(0, 0)");
            });

            EventManager.On<PointerUpSignal>(e =>
            {
                debug.Children(".pointer-event").Text("Up");
                debug.Children(".pointer-button").Text(Modifiers(e));
                debug.Children(".pointer-start").Text($"({e.AnchoredStageX}, {e.AnchoredStageY})");
                debug.Children(".pointer-end").Text($"({e.StageX}, {e.StageY})");
                debug.Children(".pointer-size").Text($"({e.Width}, {e.Height})");
            });

            EventManager.On<PointerHoverSignal>(e =>
            {
                debug.Children(".pointer-event").Text("Hover");
                debug.Children(".pointer-button").Text(Modifiers(e));
                debug.Children(".pointer-start").Text($"({e.StageX}, {e.StageY})");
                debug.Children(".pointer-end").Text($"n/a");
                debug.Children(".pointer-size").Text($"n/a");
            });

            EventManager.On<PointerDragSignal>(e =>
            {
                debug.Children(".pointer-event").Text("Drag");
                debug.Children(".pointer-button").Text(Modifiers(e));
                debug.Children(".pointer-start").Text($"({e.AnchoredStageX}, {e.AnchoredStageY})");
                debug.Children(".pointer-end").Text($"({e.StageX}, {e.StageY})");
                debug.Children(".pointer-size").Text($"({e.Width}, {e.Height})");
            });

            EventManager.On<OnRegisterManagedActionEvent>(e =>
            {
                Console.Log($"Undo {e.ManagedAction.DisplayName}");
                jQuery undo = new jQuery("#main-menu-undo").Attr("title", $"Undo {e.ManagedAction.DisplayName}");
            });
        }

        private string Modifiers(PointerSignalBase e)
        {
            string s = "";
            if (e.ShiftKey)
                s += "Shift+";
            if (e.CtrlKey)
                s += "Ctrl+";
            if (e.AltKey)
                s += "Alt+";

            int mb = -1;
            if (e is PointerDownSignal down)
                mb = down.MouseButton;
            if (e is PointerUpSignal up)
                mb = up.MouseButton;
            if (e is PointerDragSignal drag)
                mb = drag.MouseButton;

            if (mb == -1)
                s += "None";
            if (mb < -1 || mb > 3)
                s += "Custom(" + mb+")";
            if (mb == 0)
                s += "Left";
            if (mb == 1)
                s += "Middle";
            if (mb == 2)
                s += "Right";

            return s;
        }
    }
}
