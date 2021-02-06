using Bridge.jQuery2;
using Festival_Bridge.Api.EditorComponents.Layers;
using System.Collections.Generic;

namespace Festival_Bridge.Api.EditorComponents
{
    /// <summary>
    /// Controls the Canvas where the layers of the drawing will be built.
    /// </summary>
    class StageCanvas
    {
        public jQuery Element;
        public List<CustomLayer> Layers = new List<CustomLayer>();
        public CustomLayer CurrentLayer;

        public SvgLayer CurrentLayerAsSVG => (SvgLayer)CurrentLayer;

        public Stage ParentStage => Element.Parent(".stage").Data("instance") as Stage;

        public StageCanvas(jQuery element)
        {
            Element = element;
            Element.Data("instance", this);
            CreateSvgLayer("Default");
        }

        public SvgLayer CreateSvgLayer(string name)
        {
            SvgLayer layer = new SvgLayer(this, name);
            Layers.Add(layer);
            CurrentLayer = layer;
            return layer;
        }
    }
}