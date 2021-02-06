using Bridge;
using Bridge.jQuery2;
using Festival_Bridge.Api;
using Festival_Bridge.Api.Types;
using Festival_Bridge.Debuggers;
using System;

namespace Festival_Bridge
{
    /// <summary>
    /// This is the Bridge.NET entry point.
    /// </summary>
    public class App
    {
        public static void Main()
        {
            Console.WriteLine("Welcome to Bridge.NET");

            jQuery.Ready(() =>
            {
                Console.WriteLine("jQuery started");
                InitAll.InitializeAll();

                jQuery.Ready(TestAndDebug);
            });

            // BRIDGE.NET says:
            
            // After building (Ctrl + Shift + B) this project, 
            // browse to the ../bridgejs or /bin/Debug folder.

            // The bridgejs/ folder contains your projects
            // JavaScript files. 

            // Open the index.html file in a browser by
            // Right-Click > Open With..., then choose a
            // web browser from the list
            // (Festival note: for now, it does not require a
            //  web server to run)

            // This application will then run in the browser.
        }

        private static void TestAndDebug()
        {
            new DebugPointerToCanvas();
        }
    }
}