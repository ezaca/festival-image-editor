using Bridge.Html5;
using Bridge.jQuery2;
using Festival_Bridge.Api.Elements;

namespace Festival_Bridge.Api.EditorComponents
{
    /// <summary>
    /// Controls the Stage, an element that has a Canvas and the space where
    /// the interactions of the pointer focused on the drawing occur.
    /// </summary>
    class Stage
    {
        static public Stage Current = new Stage(null);

        static public void Init() { }

        public jQuery Element;
        public StageCanvas Canvas;

        public Stage(jQuery element)
        {
            Element = element;
            jQuery.Ready(InitializeStage);
        }

        private void InitializeStage()
        {
            if (Element == null)
                Element = new jQuery(".stage").First();

            Element.Data("instance", this);
            Canvas = new StageCanvas(Element.Children(".canvas"));
            CenterScroll();
        }

        public void CenterScroll()
        {
            HTMLElement el = (HTMLElement)ElementsManager.Viewport.Get(0);
            
            el.ScrollTop = el.ScrollHeight;
            el.ScrollTop = el.ScrollTop / 2;

            el.ScrollLeft = el.ScrollWidth;
            el.ScrollLeft = el.ScrollLeft / 2;
        }
    }
}
