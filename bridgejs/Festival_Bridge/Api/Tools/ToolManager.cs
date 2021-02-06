using Festival_Bridge.Api.Toolbars;
using System.Collections.Generic;

namespace Festival_Bridge.Api.Tools
{
    /// <summary>
    /// Manages the drawing tools.
    /// </summary>
    class ToolManager
    {
        static public void Init() { }
        static public ToolManager Instance = new ToolManager();

        public ITool Current = null;

        List<ITool> tools = new List<ITool>();
        Dictionary<char, List<ITool>> toolsHotKeys = new Dictionary<char, List<ITool>>();

        public void Register(ITool tool)
        {
            if (toolsHotKeys.ContainsKey(tool.HotKey) == false)
                toolsHotKeys.Add(tool.HotKey, new List<ITool>());

            toolsHotKeys[tool.HotKey].Add(tool);
            tools.Add(tool);
            ToolbarsManager.Instance.GetToolBox().AddToolBoxButton(tool);
            tool.Awake();

            if (Current == null)
                Select(tool);
        }

        public void Select(ITool tool)
        {
            if (Current != null)
                ToolbarsManager.Instance.GetToolBox().FindElement($"[data-toolid]").RemoveClass("active");

            Current?.Disable();
            Current = tool;
            Current.Enable();
            ToolbarsManager.Instance.GetToolBox().FindElement($"[data-toolid='{tool.ToolId}']").AddClass("active");
        }

        public bool SelectByHotkey(char hotkey)
        {
            List<ITool> list = toolsHotKeys.GetValueOrDefault(hotkey, null);
            if (list == null || list.Count == 0)
                return false;

            int index = list.IndexOf(Current);
            if (index < 0 || index == list.Count - 1)
                Select(list[0]);
            else
                Select(list[index + 1]);

            return true;
        }
    }

    public enum CategoryName
    {
        NoCategory,
        Shape,
    }

    /// <summary>
    /// Describes the interface of a drawing tool.
    /// </summary>
    interface ITool
    {
        string ToolId { get; }
        char HotKey { get; }
        CategoryName Category { get; }
        string DisplayName { get; }
        string IconName { get; }

        void Awake();
        void Enable();
        void Disable();
    }
}
