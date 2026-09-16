import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * robots.txt
 *
 * Nothing is disallowed: /cart and /checkout are marked `noindex` in their own
 * metadata (the pattern Google recommends — a page that cannot be crawled can
 * never be seen to carry a `noindex` directive).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
