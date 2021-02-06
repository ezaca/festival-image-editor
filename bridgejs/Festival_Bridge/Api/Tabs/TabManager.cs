using Bridge.Html5;
using Bridge.jQuery2;
using Festival_Bridge.Api.Elements;
using System;

namespace Festival_Bridge.Api.Tabs
{
    /// <summary>
    /// Manages tabs of property windows present in the side dockable panels.
    /// Each tab is a panel with a header and many pages.
    /// </summary>
    class TabManager
    {
        static public TabManager Instance = new TabManager();

        static public void Init()
        {
            jQuery.Ready(() =>
            {
                Instance.Mount("right", ElementsManager.RightArea);
                Instance.Mount("bottom", ElementsManager.BottomArea);
            });
        }

        public jQuery GetTabElement(string tabId)
        {
            return new jQuery($".tab[data-tabid='{tabId}']");
        }

        public PageManager GetPage(string tabId, string pageId)
        {
            return new PageManager(new jQuery($".tab[data-tabid='{tabId}'] > .page[data-pageid='{pageId}']"));
        }

        public PageManager GetPage(string pageId)
        {
            return new PageManager(new jQuery($".page[data-pageid='{pageId}']"));
        }

        public PageManager CreatePage(string tabId, string pageId)
        {
            jQuery tab = GetTabElement(tabId);
            PageManager page = new PageManager(tab.Append($"<div class='tab' data-tabid='{pageId}'></div>"));
            page.DockTo(tab);
            return page;
            
        }

        public void DeletePage(string pageId)
        {
            PageManager page = GetPage(pageId);
            jQuery tab = page.GetCurrentTab();
            page.Element.Remove();
            RefreshTabHeader(tab);
        }

        public void DeletePage(string tabId, string pageId)
        {
            PageManager page = GetPage(tabId, pageId);
            jQuery tab = page.GetCurrentTab();
            page.Element.Remove();
            RefreshTabHeader(tab);
        }

        public void Mount(string tabId, jQuery docksite)
        {
            jQuery tab = docksite.Children($".tab[data-tabid='{tabId}']");
            if (tab.Length == 0)
            {
                tab = docksite.Append($"<div class='tab' data-tabid='{tabId}'><header></header></div>");
                tab.On("click", "header > a", new Action<MouseEvent>(OnClickTabHeader));
            }
            else
            {
                RefreshTabHeader(tab.First());
                tab.Off("click", "header > a");
                tab.On("click", "header > a", new Action<MouseEvent>(OnClickTabHeader));
            }
        }

        public void RefreshTabHeader(jQuery tabElement)
        {
            jQuery pages = tabElement.Children(".page");
            jQuery header = tabElement.Children("header");
            header.Remove("a");
            pages.Each((pid, page) =>
            {
                var jpage = new jQuery(page);
                header.Append($"<a href='' data-pageid='{jpage.Attr("data-pageid")}'>{jpage.Attr("data-page-title")}</a>");
            });

            jQuery active = tabElement.Children(".page.active");
            if (active.Length == 0)
            {
                active = pages.First();
            }
            ShowTab(tabElement, active);
        }

        public void ShowTab(jQuery tab, jQuery page)
        {
            CloseTabs(tab);
            page.AddClass("active");
            tab.Children("header").Children($"a[data-pageid='{page.Attr("data-pageid")}']").AddClass("active");
        }

        public void CloseTabs(jQuery tab)
        {
            tab.Children("header").Children(".active").RemoveClass("active");
            tab.Children(".active").RemoveClass("active");
        }

        private void OnClickTabHeader(MouseEvent e)
        {
            e.PreventDefault();
            GetPage(new jQuery(e.Target).Attr("data-pageid")).Show();
        }
    }
}
