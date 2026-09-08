import localFont from "next/font/local";

/**
 * Self-hosted brand typography (Google Fonts, OFL licensed — served locally
 * for performance and privacy, no third-party requests).
 *
 * - Cormorant Garamond: editorial display serif (headlines, product names)
 * - Manrope: clean modern sans (body, navigation, buttons, forms)
 */

export const cormorant = localFont({
  src: [
    { path: "../fonts/cormorant-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cormorant-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/cormorant-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cormorant-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/cormorant-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/cormorant-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

export const manrope = localFont({
  src: [
    { path: "../fonts/manrope-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/manrope-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/manrope-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/manrope-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});
