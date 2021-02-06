using Bridge.Html5;
using System;
using System.Text.RegularExpressions;

namespace Festival_Bridge.Api.Types
{
    /// <summary>
    /// This class is used by <see cref="Tools.ToolUtils"/> to describe the
    /// user selected foreground and background colors. It can implicitly
    /// convert to a CSS string, being it either an hexa representation
    /// (<c>#......</c>) or a RGBA representation with alpha channel
    /// (<c>rgba(...,...,...,...)</c>). The class can receive implicitly some
    /// CSS string formats, like the hexa # syntax and the rgb, hsl and rgba
    /// patterns.
    /// </summary>
    /// <remarks>This class can be either: (1) removed if replaced by the
    /// string representation itself in CSS; (2) it can be refactored to fix
    /// any problem; or it can be modified to support patterns, textures and
    /// gradients. I still don't know which path to take.</remarks>
    struct RGBA
    {
        static public RGBA FromRGB(byte r, byte g, byte b, byte a = 255)
        {
            return new RGBA()
            {
                Red = r,
                Green = g,
                Blue = b,
                Alpha = a
            };
        }

        static public RGBA FromHSL(float h, float s, float l, float a = 255f)
        {
            return FromHexa(Externals.HslToHex(h, s, l) + ((int)a).ToString("x").PadLeft(2, '0'));
        }

        static public RGBA FromHexa(string hexa)
        {
            string value = hexa;
            if (value.StartsWith("#"))
                value = value.Substr(1);

            if (value.Length == 3)
                value = $"{value[0]}{value[0]}{value[1]}{value[1]}{value[2]}{value[2]}FF";

            if (value.Length == 4)
                value = $"{value[0]}{value[0]}{value[1]}{value[1]}{value[2]}{value[2]}{value[3]}{value[3]}";

            if (value.Length == 6)
                value += "FF";

            byte r = Externals.NumberToByte("0x" + value.Substring(0, 2));
            byte g = Externals.NumberToByte("0x" + value.Substring(2, 2));
            byte b = Externals.NumberToByte("0x" + value.Substring(4, 2));
            byte a = Externals.NumberToByte("0x" + value.Substring(6, 2));
            return FromRGB(r, g, b, a);
        }

        public const int RedOffset = 24;
        public const int GreenOffset = 16;
        public const int BlueOffset = 8;
        public const int AlphaOffset = 0;

        public uint Value;

        public byte Red {
            get => (byte)((Value & 0xFF000000u) >> RedOffset);
            set => Value |= (uint)value << RedOffset;
        }

        public byte Green {
            get => (byte)((Value & 0x00FF0000u) >> GreenOffset);
            set => Value |= (uint)value << GreenOffset;
        }

        public byte Blue {
            get => (byte)((Value & 0x0000FF00u) >> BlueOffset);
            set => Value |= (uint)value << BlueOffset;
        }

        public byte Alpha {
            get => (byte)((Value & 0x000000FFu) >> AlphaOffset);
            set => Value |= (uint)value << AlphaOffset;
        }

        public override string ToString()
        {
            return this;
        }

        static public implicit operator string(RGBA rgba)
        {
            if (rgba.Alpha == 255)
                return $"#{rgba.Red.ToString("x").PadLeft(2, '0')}{rgba.Green.ToString("x").PadLeft(2, '0')}{rgba.Blue.ToString("x").PadLeft(2, '0')}";
            else
                return $"rgba({rgba.Red},{rgba.Green},{rgba.Blue},{rgba.Alpha / 255f})";
        }

        static public implicit operator RGBA(string value)
        {
            if (value.StartsWith("#"))
            {
                return FromHexa(value);
            }
            else
            if (value.ToLowerCase().StartsWith("hsl"))
            {
                Match m = Regex.Match(value.Trim().ToLower(), @"hsl *\( *(\d*[.]\d+|\d+)(?:deg)? *, *(\d*[.]\d+|\d+)%? *, *(\d*[.]\d+|\d+)%? *(?:, *(\d*[.]\d+|\d+) *)?\)");
                if (m.Groups[4].Success)
                {
                    return FromHSL(
                        Externals.NumberToFloat(m.Groups[1].Value),
                        Externals.NumberToFloat(m.Groups[2].Value),
                        Externals.NumberToFloat(m.Groups[3].Value),
                        Externals.NumberToFloat(m.Groups[4].Value) * 255f
                    );
                }
                else
                {
                    return FromHSL(
                        Externals.NumberToFloat(m.Groups[1].Value),
                        Externals.NumberToFloat(m.Groups[2].Value),
                        Externals.NumberToFloat(m.Groups[3].Value)
                    );
                }
            }
            else
            if (value.ToLowerCase().StartsWith("rgba"))
            {
                Match m = Regex.Match(value.Trim().ToLower(), @"rgba *[(] *(\d*[.]\d+|\d+) *, *(\d*[.]\d+|\d+) *, *(\d*[.]\d+|\d+) *, *(\d*[.]\d+|\d+) *[)]");
                return FromRGB(
                    Externals.NumberToByte(m.Groups[1].Value),
                    Externals.NumberToByte(m.Groups[2].Value),
                    Externals.NumberToByte(m.Groups[3].Value),
                    (byte)(Externals.NumberToFloat(m.Groups[4].Value) * 255f)
                );
            }
            else
            if (value.ToLowerCase().StartsWith("rgb"))
            {
                Match m = Regex.Match(value.Trim().ToLower(), @"rgb *[(] *(\d*[.]\d+|\d+) *, *(\d*[.]\d+|\d+) *, *(\d*[.]\d+|\d+) *[)]");
                return FromRGB(
                    Externals.NumberToByte(m.Groups[1].Value),
                    Externals.NumberToByte(m.Groups[2].Value),
                    Externals.NumberToByte(m.Groups[3].Value)
                );
            }
            else
            {
                throw new Exception("Not implemented RGBA converter for: " + value);
            }
        }
    }
}
