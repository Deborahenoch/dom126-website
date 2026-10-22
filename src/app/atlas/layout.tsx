import type { Metadata } from "next";
import { VaultProvider } from "@/components/atlas/VaultProvider";
import AtlasNav from "@/components/atlas/AtlasNav";
import styles from "@/components/atlas/atlas.module.css";

/**
 * Section-level fallback only.
 *
 * Every Atlas route sets its own title, canonical URL and Open Graph block
 * through `pageMetadata()` (`@/lib/seo`), so the section stays consistent with
 * the rest of the site. A `title.template` here is deliberately *not* used:
 * it would override the root template and double-brand the section index
 * ("Perfumery Atlas | Perfumery Atlas | DOM126 Fragrances").
 *
 * `/atlas/vault` opts out of the index in its own metadata, the same way
 * `/cart` and `/checkout` do.
 */
export const metadata: Metadata = {
  description:
    "A working reference for natural and synthetic perfume materials, olfactory families, structural accords, documented GC-MS reconstructions of classic perfumes, and a private formula vault.",
};

export default function AtlasLayout({ children }: { children: React.ReactNode }) {
  return (
    <VaultProvider>
      <div className={styles.atlas}>
        <AtlasNav />
        {children}
      </div>
    </VaultProvider>
  );
}
