using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Festival_Bridge.Api.ManagedActions
{
    /// <summary>
    /// Describes the interface of a managed action that can be done and
    /// undone. Here, "done" includes to redo an action. Should be combinated
    /// with <see cref="ActionTimeline"/>.
    /// </summary>
    interface IManagedAction
    {
        string DisplayName { get; }
        void Do();
        bool Undo();
    }

    /// <summary>
    /// Describes an interface capable of repeating an action, doing it and
    /// doing it again. It's not about redoing an action, but applying it
    /// again, like blurring an image and blurring it again/more.
    /// </summary>
    interface IRepeatableManagedAction : IManagedAction
    {
        IManagedAction Clone();
    }
}
