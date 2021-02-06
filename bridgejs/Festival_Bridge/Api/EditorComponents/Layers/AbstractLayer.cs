using Bridge.jQuery2;

namespace Festival_Bridge.Api.EditorComponents.Layers
{
    /// <summary>
    /// Represents a drawing layer that must be extended.
    /// </summary>
    abstract class CustomLayer
    {
        public StageCanvas ParentCanvas;
        public string Name;
        public jQuery Element;

        public CustomLayer(StageCanvas canvas, string name)
        {
            ParentCanvas = canvas;
            Name = name;
        }

        public jQuery AddElement(string elementOrSelector)
        {
            return new jQuery(elementOrSelector).AppendTo(Element);
        }
    }
}