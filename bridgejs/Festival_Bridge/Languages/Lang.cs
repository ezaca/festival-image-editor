using Bridge.Html5;

namespace Festival_Bridge.Languages
{
    /// <summary>
    /// A silly consideration about multi-language and internationalization. It
    /// is not currently in use.
    /// </summary>
    static class Lang
    {
        static public string Translate(string phrase)
        {
            bool hasKey = Window.Instance.HasOwnProperty("lang")
                && Window.Instance["lang"].HasOwnProperty("current")
                && Window.Instance["lang"]["current"].HasOwnProperty(phrase);

            return hasKey ? (string)Window.Instance["lang"]["current"][phrase] : phrase;
        }
    }
}
