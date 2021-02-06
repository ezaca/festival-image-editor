using Bridge.jQuery2;

namespace Festival_Bridge.Api.Elements
{
    /// <summary>
    /// Contains references to the main elements of the application.
    /// </summary>
    class ElementsManager
    {
        static protected ElementsManager Instance = new ElementsManager();

        static public jQuery Body => Instance.body;
        static public jQuery MainMenu => Instance.mainMenu;
        static public jQuery Viewport => Instance.viewport;
        static public jQuery ViewportStage => Instance.viewportStage;
        static public jQuery ViewportCanvas => Instance.viewportCanvas;
        static public jQuery ViewportPointerArea => Instance.viewportPointerArea;
        static public jQuery MainEditorArea => Instance.mainEditorArea;
        static public jQuery FarLeftArea => Instance.farLeftArea;
        static public jQuery LeftArea => Instance.leftArea;
        static public jQuery RightArea => Instance.rightArea;
        static public jQuery FarRightArea => Instance.farRightArea;
        static public jQuery BottomArea => Instance.bottomArea;
        static public jQuery PopupsArea => Instance.popupsArea;

        private jQuery body;
        private jQuery mainMenu;
        private jQuery viewport;
        private jQuery viewportStage;
        private jQuery viewportCanvas;
        private jQuery viewportPointerArea;
        private jQuery mainEditorArea;
        private jQuery farLeftArea;
        private jQuery leftArea;
        private jQuery rightArea;
        private jQuery farRightArea;
        private jQuery bottomArea;
        private jQuery popupsArea;

        static public void Init() { }

        public ElementsManager()
        {
            jQuery.Ready(Initialize);
        }

        private void Initialize()
        {
            body = new jQuery("body");
            mainMenu = new jQuery("body > main > header");
            viewport = new jQuery("body > main > .viewport");
            viewportStage = new jQuery("body > main > .viewport > .stage");
            viewportCanvas = new jQuery("body > main > .viewport > .stage > .canvas");
            viewportPointerArea = new jQuery("body > main > .viewport .editor-mouse");
            farLeftArea = new jQuery("body > main > .docksite-farleft");
            leftArea = new jQuery("body > main > .docksite-left");
            rightArea = new jQuery("body > main > .docksite-right");
            farRightArea = new jQuery("body > main > .docksite-farright");
            bottomArea = new jQuery("body > main > .docksite-bottom");
            mainEditorArea = new jQuery("body > main > .docksite-main");
            popupsArea = new jQuery("body > .popups");
        }
    }
}
