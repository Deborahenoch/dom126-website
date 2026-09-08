"use client";

import { useEffect, useState } from "react";
import { bespoke, fragrances, type ProductCategory } from "@/lib/products";
import ProductCard from "./ProductCard";
import BespokeCard from "./BespokeCard";
import Reveal from "@/components/ui/Reveal";
import styles from "./ShopGrid.module.css";

type Filter = "all" | ProductCategory;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "fragrance", label: "Fragrances" },
  { value: "bespoke", label: "Custom Signature" },
];

interface ShopGridProps {
  initialCategory?: Filter;
}

export default function ShopGrid({ initialCategory = "all" }: ShopGridProps) {
  const [filter, setFilter] = useState<Filter>(initialCategory);

  // Keep in sync when arriving via a category link (e.g. /shop?category=fragrance).
  useEffect(() => {
    setFilter(initialCategory);
  }, [initialCategory]);

  return (
    <div>
      <div className={styles.filters} role="group" aria-label="Filter products">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className={styles.filter}
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filter !== "bespoke" && (
        <div className={styles.grid}>
          {fragrances.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90} className={styles.cell}>
              <ProductCard product={p} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      )}

      {filter !== "fragrance" && (
        <Reveal delay={fragrances.length * 90}>
          <BespokeCard product={bespoke[0]} />
        </Reveal>
      )}
    </div>
  );
}
