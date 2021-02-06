namespace Festival_Bridge.Api.Elements
{
    internal abstract class PointerSignalBase
    {
        public int ViewportX;
        public int ViewportY;
        public bool CtrlKey;
        public bool ShiftKey;
        public bool AltKey;

        public int StageX => PointerUtils.StageXToCanvasX(ViewportX);
        public int StageY => PointerUtils.StageYToCanvasY(ViewportY);
    }

    internal abstract class PointerAnchoredSignalBase : PointerSignalBase
    {
        public int AnchoredX;
        public int AnchoredY;
        public int Width => ViewportX - AnchoredX;
        public int Height => ViewportY - AnchoredY;

        public int OriginalX;
        public int OriginalY;
        public int ActualX;
        public int ActualY;
        public int ActualButton;

        public int AnchoredStageX => PointerUtils.StageXToCanvasX(AnchoredX);
        public int AnchoredStageY => PointerUtils.StageYToCanvasY(AnchoredY);
    }

    class PointerDownSignal : PointerSignalBase
    {
        public int MouseButton;
    }

    class PointerUpSignal : PointerAnchoredSignalBase
    {
        public int MouseButton;
    }

    class PointerDragSignal : PointerAnchoredSignalBase
    {
        public int MouseButton;
    }

    class PointerHoverSignal : PointerSignalBase
    {
    }
}
