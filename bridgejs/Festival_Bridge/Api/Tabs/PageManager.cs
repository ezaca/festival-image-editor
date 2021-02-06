using Bridge.jQuery2;
using Bridge.Utils;

namespace Festival_Bridge.Api.Tabs
{
    /// <summary>
    /// Manages a page in the tabs of property areas. Each page can be docked
    /// to a tab (<see cref="TabManager"/>) and contain custom UI.
    /// </summary>
    class PageManager
    {
        public jQuery Element;

        public PageManager(jQuery page)
        {
            Element = page;

            if (page.HasClass("page") == false || page.Attr("data-pageid") == "")
                throw new System.Exception($"Given element is not an actual page");

            if (page.Length > 1)
                throw new System.Exception($"Too many pages selected at once, is pageid repeated across pages?");
        }

        public jQuery GetCurrentTab()
        {
            return Element.Parent(".tab[data-tabid]");
        }

        public void DockTo(jQuery tab)
        {
            TabManager.Instance.RefreshTabHeader(tab);
            tab.Append(Element);
        }

        public void DockTo(string tabId)
        {
            DockTo(new jQuery($".tab[data-tabid='{tabId}']"));
        }

        public void Show()
        {
            TabManager.Instance.ShowTab(GetCurrentTab(), Element);
        }
    }
}
