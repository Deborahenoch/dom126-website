import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Web app manifest (served at /manifest.webmanifest).
 * Colours match the brand palette: deep navy surface + gold accent.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070d1a",
    theme_color: "#070d1a",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
