using Bridge;

namespace Festival_Bridge
{
    /// <summary>
    /// Reference to the "external" Javascript functions, they are functions
    /// that are not implemented in C#, but in Javascript language itself.
    /// </summary>
    [External]
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Style", "IDE0060:Remover o parâmetro não utilizado", Justification = "<Pendente>")]
    static class Externals
    {
        /// <summary>
        /// Convert HSL colors in RGB formatted has CSS hexa format (#rrggbb).
        /// </summary>
        /// <param name="h">Hue from 0 to 360 (in degrees).</param>
        /// <param name="s">Saturation from 0 to 100 (in %).</param>
        /// <param name="l">Luminosity from 0 to 100 (in %).</param>
        /// <returns>A 6 digits hexa color compatible with CSS.</returns>
        [Template("HslToHex({h}, {s}, {l})")]
        static public string HslToHex(float h, float s, float l) { return ""; }

        /// <summary>
        /// Converts any Javascript value to number, then to byte number.
        /// </summary>
        /// <param name="n">Any value.</param>
        /// <returns>A Bridge.NET byte.</returns>
        [Template("Number({n})")]
        static public byte NumberToByte(string n) { return 0; }

        /// <summary>
        /// Converts any Javascript value to number, the to float.
        /// </summary>
        /// <param name="n">Any value.</param>
        /// <returns>A Bridge.NET float.</returns>
        [Template("Number({n})")]
        static public float NumberToFloat(string n) { return 0f; }

        /// <summary>
        /// This function tricks CSharp. Javascript does not care about types,
        /// but CSharp does. This function returns the object passed by
        /// parameter in Javascript, but in CSharp, it seems the object got
        /// converted magically from any type to any type. Use with care and
        /// only with compatible types, the returned object is exactly what it
        /// is, this means the function IS NOT suitable, for example, to
        /// convert an object to string or between types, it just tricks CSharp
        /// to think the conversion occurred. Use case: in Retyped, the SVGRect
        /// is not a SVGElement, but they share the same properties.
        /// </summary>
        /// <typeparam name="T">The type you expect to receive.</typeparam>
        /// <param name="obj">Any value/object that Javascript can use, but
        /// CSharp is complaining about the conversion.</param>
        /// <returns>The object itself with no conversion at all.</returns>
        [Template("Untype({obj})")]
        static public T Untype<T>(object obj) { return default(T); }
    }
}
