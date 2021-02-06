using Bridge.jQuery2;
using Festival_Bridge.Api.ManagedActions;
using Festival_Bridge.Api.Tools;
using static Festival_Bridge.Externals;
using static Retyped.dom;

namespace Festival_Bridge.ManagedActions.Base
{
    /// <summary>
    /// A managed action that creates SVG elements. This action is not used
    /// directly, but is the basis of drawing actions, such as the rectangle or
    /// ellipse tool.
    /// </summary>
    /// <typeparam name="TSvg">The class of the SVG element.</typeparam>
    abstract class CreateSvgElement<TSvg> : IManagedAction
    {
        public abstract string DisplayName { get; }

        public abstract string SvgTagName { get; }

        public TSvg Element;
        public jQuery ParentElement;

        protected int StartX;
        protected int StartY;
        protected int EndX;
        protected int EndY;
        protected int Width => EndX - StartX;
        protected int Height => EndY - StartY;

        public CreateSvgElement(jQuery parent)
        {
            ParentElement = parent;
        }

        virtual public void RefreshElement(TSvg element)
        {
            ToolUtils.ApplyUserStyle(Untype<SVGElement>(element).style);
        }

        public void Do()
        {
            Element = Untype<TSvg>(document.createElementNS(ToolUtils.SvgNamespace, SvgTagName));
            ParentElement.Append(Untype<Bridge.Html5.Element>(Element));
            RefreshElement(Element);
        }

        public bool IsNullSize()
        {
            return Width == 0 || Height == 0;
        }

        public void SetSelectedRect(int startX, int startY, int endX, int endY)
        {
            StartX = startX;
            StartY = startY;
            EndX = endX;
            EndY = endY;
            RefreshElement(Element);
        }

        public bool Undo()
        {
            if (Element != null)
                Untype<SVGElement>(Element).remove();
            Element = default(TSvg);
            return true;
        }
    }
}
