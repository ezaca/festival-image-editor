using System;
using System.Collections.Generic;

namespace Festival_Bridge.Api.Events
{
    /// <summary>
    /// Object capable of emitting and registering listeners of custom events.
    /// Listeners register for events represented by the type the object being
    /// dispatched. These objects are from custom classes containing
    /// information about the event.
    /// </summary>
    class EventManager
    {
        static public void Init() { }
        static private Dictionary<Type, List<Delegate>> events = new Dictionary<Type, List<Delegate>>();

        static public void On<T>(Action<T> action)
        {
            if (events.ContainsKey(typeof(T)) == false)
                events.Add(typeof(T), new List<Delegate>());

            events[typeof(T)].Add(action);
        }

        static public void Off<T>(Action<T> action)
        {
            if (events.ContainsKey(typeof(T)) == false)
                return;

            if (events[typeof(T)].Remove(action) == false)
                Bridge.Utils.Console.Error($"Could not remove Action<{typeof(T)}> from event");
        }

        static public void Dispatch<T>(T eventData)
        {
            if (events.ContainsKey(typeof(T)) == false)
                return;

            for (int i = 0; i < events[typeof(T)].Count; i++)
            {
                try
                {
                    events[typeof(T)][i].Call(null, eventData);
                }
                catch (Exception e)
                {
                    Bridge.Utils.Console.Error($"On event {typeof(T)}, listener exception: {e}");
                }
            }
        }
    }

    public class EventData { }

    public class EventData<T> : EventData { }
}
