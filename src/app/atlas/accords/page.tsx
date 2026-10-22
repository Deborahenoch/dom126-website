import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AccordsView from "@/components/atlas/AccordsView";

/**
 * Server shell for the accord library — see `materials/page.tsx` for why the
 * interactive part is split out into a client component.
 */
export const metadata: Metadata = pageMetadata({
  title: "Perfumery Atlas — Accords",
  description:
    "23 buildable perfume accords in parts per thousand: structural, modern, floral bases, fantasy and modifiers, each with substitutions and provenance.",
  path: "/atlas/accords",
});

export default function AccordsPage() {
  return <AccordsView />;
}
