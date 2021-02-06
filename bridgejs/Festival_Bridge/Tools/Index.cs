using Bridge.jQuery2;
using Festival_Bridge.Api.Tools;

namespace Festival_Bridge.Tools
{
    /// <summary>
    /// The index of tools currently active in the application. Each entry in
    /// its array represents a new tool available to use through an icon in the
    /// drawing tools toolbar.
    /// </summary>
    class Index
    {
        static protected ITool[] Tools =
        {
            new DebugRectTool(),
            new DebugRectTool(),
            new RectTool(),
        };

        static public void Init()
        {
            jQuery.Ready(() =>
            {
                foreach (var tool in Tools)
                {
                    ToolManager.Instance.Register(tool);
                }
            });
        }
    }
}
