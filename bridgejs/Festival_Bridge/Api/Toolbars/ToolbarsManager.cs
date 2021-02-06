using Bridge.jQuery2;
using Festival_Bridge.Api.Elements;

namespace Festival_Bridge.Api.Toolbars
{
    /// <summary>
    /// Manages all the toolbars, including horizontal and vertical ones.
    /// Vertical toolbars are mostly used for the toolbar with the drawing
    /// tools. The toolbars try to be flexible and adapt its children elements
    /// for horizontal and vertical layouts.
    /// </summary>
    class ToolbarsManager
    {
        static public ToolbarsManager Instance = new ToolbarsManager();

        static public void Init()
        {
            jQuery.Ready(() =>
            {
                Instance.Mount("tools", ElementsManager.LeftArea);
            });
        }

        public void Mount(string toolbarId, jQuery element)
        {
            element.Append($"<div class='toolbar' data-toolbarid='{toolbarId}'></div>");
        }

        public Toolbar GetToolbar(string toolbarId)
        {
            return new Toolbar(new jQuery($".toolbar[data-toolbarid='{toolbarId}']"));
        }

        public Toolbar GetToolBox()
        {
            return GetToolbar("tools");
        }
    }
}
