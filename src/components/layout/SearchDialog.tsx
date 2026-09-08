"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/lib/products";
import ProductImage from "@/components/product/ProductImage";
import Price from "@/components/ui/Price";
import { ArrowRightIcon, CloseIcon, SearchIcon } from "@/components/ui/icons";
import styles from "./SearchDialog.module.css";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.tagline, p.blurb, p.category].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.root} onClick={(e) => e.target === panelRef.current?.parentElement && onClose()}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
      >
        <div className={styles.searchBar}>
          <SearchIcon size={20} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="search"
            className={styles.input}
            placeholder="Search fragrances…"
            aria-label="Search fragrances"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results.length > 0) {
                window.location.assign(`/product/${results[0].slug}`);
              }
            }}
          />
          <button
            type="button"
            className={styles.close}
            aria-label="Close search"
            onClick={onClose}
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className={styles.resultsWrap}>
          <p className={styles.resultsLabel}>
            {query.trim()
              ? `${results.length} result${results.length === 1 ? "" : "s"}`
              : "The Collection"}
          </p>
          {results.length === 0 ? (
            <p className={styles.noResults}>
              No fragrances match “{query.trim()}”. Try a name — Boss Man, Ephata or
              Sweet Savour.
            </p>
          ) : (
            <ul className={styles.results}>
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/product/${p.slug}`}
                    className={styles.result}
                    onClick={onClose}
                  >
                    <span className={styles.thumb}>
                      <ProductImage
                        src={p.image}
                        name={p.name}
                        size={p.size}
                        ratio="1 / 1"
                        sizes="56px"
                      />
                    </span>
                    <span className={styles.resultInfo}>
                      <span className={styles.resultName}>{p.name}</span>
                      <span className={styles.resultTagline}>{p.tagline}</span>
                    </span>
                    <span className={styles.resultRight}>
                      <Price value={p.price} className={styles.resultPrice} />
                      <ArrowRightIcon size={16} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className={styles.hint}>
          Looking for something made only for you?{" "}
          <Link href="/custom-signature" onClick={onClose} className={styles.hintLink}>
            The Custom Signature Perfume
          </Link>
        </p>
      </div>
    </div>
  );
}
