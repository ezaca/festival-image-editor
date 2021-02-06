namespace Festival_Bridge.Api.ManagedActions
{
    internal class AbstractCustomManagedActionEvent
    {
        public IManagedAction ManagedAction;
    }

    class OnRegisterManagedActionEvent : AbstractCustomManagedActionEvent { }
    class OnBeforeUndoManagedActionEvent : AbstractCustomManagedActionEvent { }
    class OnAfterRedoManagedActionEvent : AbstractCustomManagedActionEvent { }

    class OnRepeatManagedActionEvent
    {
        public IManagedAction PrototypeAction;
        public IManagedAction ClonedAction;
    }
}
