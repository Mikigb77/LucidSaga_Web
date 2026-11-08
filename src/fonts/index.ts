import localFont from "next/font/local";

// The app's own typefaces (PlayableAnime app/assets/fonts), cut down to the Latin letters English,
// Spanish and Catalan need (scripts/subset-fonts.sh). Both are under the SIL Open Font License,
// whose text is next to them.

/** Inter: buttons, labels and the site's small print. */
export const inter = localFont({
  src: [
    { path: "./Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "./Inter-Medium.woff2", weight: "500", style: "normal" },
    { path: "./Inter-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

/** Literata: the narrator's voice, as in the app's play screen. */
export const literata = localFont({
  src: [
    { path: "./Literata-Regular.woff2", weight: "400", style: "normal" },
    { path: "./Literata-Italic.woff2", weight: "400", style: "italic" },
    { path: "./Literata-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "Cambria", "Times New Roman", "serif"],
});

/** Literata Display: headings. */
export const literataDisplay = localFont({
  src: [{ path: "./LiterataDisplay-Medium.woff2", weight: "500", style: "normal" }],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "Cambria", "Times New Roman", "serif"],
});
