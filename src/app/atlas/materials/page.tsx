import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import MaterialsView from "@/components/atlas/MaterialsView";

/**
 * Server shell for the materials browser.
 *
 * The browser itself is interactive (free-text search plus origin, volatility
 * and odour-field filters), and a client component cannot export `metadata`.
 * So the UI lives in `MaterialsView` and the title, canonical URL and Open
 * Graph block stay here — the same split `/cart` and `/checkout` use.
 */
export const metadata: Metadata = pageMetadata({
  title: "Perfumery Atlas — Materials",
  description:
    "177 natural and synthetic perfume materials: origin, extraction route, odour field, volatility, typical use level, cost tier and regulatory posture.",
  path: "/atlas/materials",
});

export default function MaterialsPage() {
  return <MaterialsView />;
}
