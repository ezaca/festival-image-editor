using Bridge.Html5;
using Bridge.jQuery2;
using Festival_Bridge.Api.Popups;
using System;

namespace Festival_Bridge.Api.Elements
{
    /// <summary>
    /// Manages the main menu.
    /// </summary>
    class MainMenuManager
    {
        static public MainMenuManager Instance = new MainMenuManager();

        static public void Init()
        {
            jQuery.Ready(() =>
            {
                ElementsManager.MainMenu.On("click", "a[data-popup]", new Action<MouseEvent>(OnClickMainMenu));
            });
        }

        static private void OnClickMainMenu(MouseEvent e)
        {
            e.PreventDefault();
            jQuery target = new jQuery(e.Target);
            string popupName = target.Attr("data-popup");
            PopupManager.Instance.OpenPopupBelow(popupName, (HTMLElement)target.Get(0));
        }
    }
}
