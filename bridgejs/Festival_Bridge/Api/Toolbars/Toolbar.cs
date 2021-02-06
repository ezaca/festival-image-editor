using Bridge.Html5;
using Bridge.jQuery2;
using Festival_Bridge.Api.Tools;
using System;

namespace Festival_Bridge.Api.Toolbars
{
    /// <summary>
    /// A toolbar element mounted by the <see cref="ToolbarsManager"/>. It
    /// references an HTML element with the buttons and other elements.
    /// </summary>
    class Toolbar
    {
        public jQuery Element;

        public Toolbar(jQuery element)
        {
            Element = element;
        }

        public jQuery FindElement(string selector)
        {
            return Element.Find(selector);
        }

        public jQuery AddButton(string hint, string backgroundImage, Action<MouseEvent> onClick)
        {
            jQuery button = new jQuery(jQuery.ParseHTML($"<a href='' class='toolbar-button' title='{hint}'></a>"));
            Element.Append(button);
            ((HTMLElement)button.Get(0)).Style.BackgroundImage = backgroundImage;
            button.On("click", onClick);
            return button;
        }

        public void AddSeparator()
        {
            Element.Append("<hr>");
        }

        public jQuery AddToolBoxButton(ITool tool)
        {
            jQuery button = ToolbarsManager.Instance.GetToolBox().AddButton($"{tool.DisplayName} ({tool.HotKey})", $"url(pictures/tools/{tool.IconName}.png)", e =>
            {
                e.PreventDefault();
                ToolManager.Instance.Select(tool);
            });
            button.Attr("data-toolid", tool.ToolId);
            return button;
        }
    }
}