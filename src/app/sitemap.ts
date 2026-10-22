import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/shop", priority: 0.9, changeFrequency: "weekly" },
    { path: "/custom-signature", priority: 0.9, changeFrequency: "monthly" },
    // Perfumery Atlas — reference library. `/atlas/vault` is omitted on
    // purpose: it is an internal tool marked `noindex`, so listing it here
    // would contradict its own metadata.
    { path: "/atlas", priority: 0.6, changeFrequency: "monthly" },
    { path: "/atlas/materials", priority: 0.5, changeFrequency: "monthly" },
    { path: "/atlas/families", priority: 0.5, changeFrequency: "monthly" },
    { path: "/atlas/accords", priority: 0.5, changeFrequency: "monthly" },
    { path: "/atlas/classics", priority: 0.5, changeFrequency: "monthly" },
    { path: "/atlas/gcms", priority: 0.5, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/shipping", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteConfig.url}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p.category === "bespoke" ? 0.8 : 0.85,
  }));

  return [...staticRoutes, ...productRoutes];
}
