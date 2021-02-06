using Festival_Bridge.Api.Events;
using System.Collections.Generic;

namespace Festival_Bridge.Api.ManagedActions
{
    /// <summary>
    /// Class to store a timeline of managed actions. Managed actions are
    /// commands or actions executed to compose the application features,
    /// including actions to draw elements, change attributes (color, line,
    /// etc.), delete elements and everything else. An advantage is the ability
    /// to undo, redo and repeat actions registered in this class.
    /// </summary>
    class ActionTimeline
    {
        static public ActionTimeline Instance = new ActionTimeline();

        private List<IManagedAction> actions = new List<IManagedAction>();

        public int Index = 0;

        public IManagedAction Top => actions.Count > 0 ? actions[Index] : null;

        public bool CanRepeatAction => actions.Count > 0 ? actions[Index] is IRepeatableManagedAction : false;

        public void Do(IManagedAction action, bool preventDoCall = false)
        {
            ClampActionsAfter(Index);

            actions.Add(action);
            Index = actions.Count - 1;

            if (preventDoCall == false)
                action.Do();

            EventManager.Dispatch(new OnRegisterManagedActionEvent() { ManagedAction = action });
        }

        public void Undo()
        {
            if (actions.Count == 0)
                return;

            EventManager.Dispatch(new OnBeforeUndoManagedActionEvent() { ManagedAction = actions[Index] });
            if (actions[Index].Undo())
                Index--;
        }

        public void Redo()
        {
            if (Index < actions.Count - 1)
            {
                Index++;
                actions[Index].Do();
                EventManager.Dispatch(new OnAfterRedoManagedActionEvent() { ManagedAction = actions[Index] });
            }
        }

        public void Repeat()
        {
            if (actions.Count == 0)
                return;

            if (actions[Index] is IRepeatableManagedAction repeatable)
            {
                ClampActionsAfter(Index);
                IManagedAction clone = repeatable.Clone();
                Do(clone);
                EventManager.Dispatch(new OnRepeatManagedActionEvent() { PrototypeAction = repeatable, ClonedAction = clone });
            }
        }

        private void ClampActionsAfter(int index)
        {
            for (int i = actions.Count - 1; i > index; i--)
            {
                actions.RemoveAt(i);
            }
        }
    }
}
