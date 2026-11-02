import { Archivo, Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";

// Display: variable width axis lets us go semi-condensed for big headings.
export const archivo = Archivo({
  subsets: ["latin", "vietnamese"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Body: designed for Vietnamese, diacritics render cleanly at small sizes.
export const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

// Mono: section labels, indices, small meta text.
export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
