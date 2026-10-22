import type { Metadata } from "next";
import { VaultProvider } from "@/components/atlas/VaultProvider";
import AtlasNav from "@/components/atlas/AtlasNav";
import styles from "./atlas.module.css";

export const metadata: Metadata = {
  title: {
    default: "Perfumery Atlas | DOM126 Fragrances",
    template: "%s | Perfumery Atlas | DOM126 Fragrances",
  },
  description:
    "A working reference for natural and synthetic perfume materials, olfactory families, structural accords, documented GC-MS reconstructions of classic perfumes, and a private formula vault for storing and reproducing compositions.",
  robots: { index: true, follow: true },
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
