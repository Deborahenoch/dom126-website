import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * DOM126 Fragrances — shared SEO helpers.
 *
 * Every page/section builds its metadata through `pageMetadata()` so that
 * canonical URLs, Open Graph tags and social previews stay consistent across
 * the whole site (one place to change, every page updated).
 */

interface PageMetadataInput {
  /** Page title without the brand suffix, e.g. "Shop Fragrances". */
  title: string;
  /** Meta description — keep to 160 characters or fewer. */
  description: string;
  /** Route path used for the canonical URL, e.g. "/shop". */
  path: string;
}

const OG_IMAGE = {
  url: "/images/brand/hero-texture.jpg",
  width: 1376,
  height: 768,
  alt: "DOM126 Fragrances — premium Nigerian fragrance house",
} as const;

/**
 * Builds the metadata for a single page: title, description, canonical URL and
 * a complete Open Graph block (type, url, title, description, image).
 *
 * The `<title>` itself is still rendered through the root layout template
 * ("%s | DOM126 Fragrances"); `og:title` uses the shorter brand form.
 */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_NG",
      url: `${siteConfig.url}${path}`,
      title: `${title} | DOM126`,
      description,
      images: [OG_IMAGE],
    },
  };
}
