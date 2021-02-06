using Bridge.Html5;
using Bridge.jQuery2;
using Festival_Bridge.Api.Elements;
using System;

namespace Festival_Bridge.Api.Popups
{
    class PopupManager
    {
        /// <summary>
        /// Does not need to be initiated at start, only at use.
        /// </summary>
        static public PopupManager Instance = new PopupManager();

        private HTMLElement overlay;

        public PopupManager()
        {
            jQuery.Ready(() =>
            {
                overlay = (HTMLElement)ElementsManager.PopupsArea.Children(".overlay").Get(0);
                overlay.AddEventListener("mousedown", OnClickOverlay);
            });
        }

        public HTMLDivElement CreateCustomPopup(string name)
        {
            Element el = jQuery.ParseHTML($"<div class='popup' data-popup='{name}'></div>")[0];
            ElementsManager.PopupsArea.Prepend(el);
            return (HTMLDivElement)el;
        }

        public HTMLDivElement CreateBasicPopup(string name, string[] list)
        {
            string[] items = Array.ConvertAll(list, item =>
            {
                if (item == "")
                    return $"<hr>";
                else
                    return $"<a href=''>{item}</a>";
            });
            Element el = jQuery.ParseHTML($"<div class='popup basic' data-popup='{name}'>{string.Join("\n", items)}</div>")[0];
            ElementsManager.PopupsArea.Prepend(el);
            return (HTMLDivElement)el;
        }

        public HTMLDivElement GetPopup(string name)
        {
            jQuery popup = ElementsManager.PopupsArea.Find($"[data-popup=\"{name}\"]");
            return popup.Get(0) as HTMLDivElement;
        }
        
        public void ClosePopups()
        {
            ElementsManager.PopupsArea.Find(".popup").RemoveClass("open");
        }

        public void OpenPopupAt(string name, int x, int y)
        {
            ClosePopups();
            HTMLElement el = GetPopup(name);
            if (el != null)
            {
                el.Style.Left = $"{x}px";
                el.Style.Top = $"{y}px";
                el.ClassList.Add("open");
            }
        }

        public void OpenPopupBelow(string name, HTMLElement element)
        {
            ClosePopups();
            OpenPopupAt(name, element.OffsetLeft, element.OffsetTop + element.OffsetHeight);
        }

        public void OpenPopupBelow(string name, jQuery element)
        {
            ClosePopups();
            OpenPopupBelow(name, (HTMLElement)element.Get(0));
        }

        private void OnClickOverlay(Event ev)
        {
            Console.WriteLine("Click overlay");
            ev.PreventDefault();
            ClosePopups();
        }
    }
}
