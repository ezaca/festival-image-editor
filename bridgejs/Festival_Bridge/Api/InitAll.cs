using Festival_Bridge.Api.EditorComponents;
using Festival_Bridge.Api.Elements;
using Festival_Bridge.Api.Events;
using Festival_Bridge.Api.Tabs;
using Festival_Bridge.Api.Toolbars;
using Festival_Bridge.Api.Tools;

namespace Festival_Bridge.Api
{
    /// <summary>
    /// Do one access for each static to force their creation. It may seem
    /// somewhat hacky, but man, it worked smoothly so far!
    /// </summary>
    class InitAll
    {
        static public void InitializeAll()
        {
            // API features
            EventManager.Init();
            ElementsManager.Init();
            ViewportPointerEvents.Init();
            MainMenuManager.Init();
            ToolbarsManager.Init();
            ToolManager.Init();
            Stage.Init();
            TabManager.Init();

            // Extensions
            Festival_Bridge.Tools.Index.Init();
        }
    }
}
