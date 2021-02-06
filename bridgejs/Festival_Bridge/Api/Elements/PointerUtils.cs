using Bridge.jQuery2;

namespace Festival_Bridge.Api.Elements
{
    /// <summary>
    /// Utilities to manage the pointer.
    /// </summary>
    static class PointerUtils
    {
        static public void PageXYToStageXY(int pageX, int pageY, out int stageX, out int stageY)
        {
            Point offset = ElementsManager.ViewportStage.Offset();
            stageX = pageX - offset.Left + ElementsManager.ViewportStage.ScrollLeft();
            stageY = pageY - offset.Top + ElementsManager.ViewportStage.ScrollTop();
        }

        static public void PageXYToCanvasXY(int pageX, int pageY, out int canvasX, out int canvasY)
        {
            PageXYToStageXY(pageX, pageY, out int stageX, out int stageY);
            StageXYToCanvasXY(stageX, stageY, out canvasX, out canvasY);
        }

        static public void StageXYToCanvasXY(int stageX, int stageY, out int canvasX, out int canvasY)
        {
            Point position = ElementsManager.ViewportCanvas.Position();
            canvasX = stageX - position.Left;
            canvasY = stageY - position.Top;
        }

        static public int StageXToCanvasX(int stageX)
        {
            Point position = ElementsManager.ViewportCanvas.Position();
            return stageX - position.Left;
        }

        static public int StageYToCanvasY(int stageY)
        {
            Point position = ElementsManager.ViewportCanvas.Position();
            return stageY - position.Top;
        }
    }
}
