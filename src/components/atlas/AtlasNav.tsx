"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/atlas/atlas.module.css";

export const ATLAS_NAV = [
  { href: "/atlas", label: "Overview" },
  { href: "/atlas/materials", label: "Materials" },
  { href: "/atlas/families", label: "Families" },
  { href: "/atlas/accords", label: "Accords" },
  { href: "/atlas/classics", label: "Classic studies" },
  { href: "/atlas/gcms", label: "Reverse engineering" },
  { href: "/atlas/vault", label: "Formula vault" },
] as const;

export default function AtlasNav() {
  const pathname = usePathname();
  return (
    <nav className={styles.subnav} aria-label="Perfumery Atlas sections">
      <div className={`container-wide ${styles.subnavInner}`}>
        {ATLAS_NAV.map((item) => {
          const active =
            item.href === "/atlas" ? pathname === "/atlas" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.subnavLink} ${active ? styles.subnavLinkActive : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
