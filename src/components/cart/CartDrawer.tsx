"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Price from "@/components/ui/Price";
import ProductImage from "@/components/product/ProductImage";
import { ButtonLink } from "@/components/ui/Button";
import QuantityStepper from "./QuantityStepper";
import { useCart } from "./CartProvider";
import { BagIcon, CloseIcon, TrashIcon } from "@/components/ui/icons";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, subtotal, count, setQty, remove, ready } =
    useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Focus management + keyboard escape.
  useEffect(() => {
    if (!drawerOpen) return;
    lastFocused.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lastFocused.current?.focus?.();
    };
  }, [drawerOpen, closeDrawer]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!drawerOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [drawerOpen]);

  return (
    <div className={styles.root} data-open={drawerOpen}>
      <div className={styles.overlay} onClick={closeDrawer} aria-hidden="true" />
      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        aria-hidden={!drawerOpen}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>
            Your Bag{count > 0 ? <span className={styles.count}> ({count})</span> : null}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            aria-label="Close bag"
            onClick={closeDrawer}
          >
            <CloseIcon size={20} />
          </button>
        </header>

        {!ready ? null : lines.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>
              <BagIcon size={30} />
            </span>
            <p className={styles.emptyTitle}>Your bag is empty</p>
            <p className={styles.emptyText}>
              Explore the collection and choose the fragrance that fits your presence.
            </p>
            <ButtonLink href="/shop" variant="primary" onClick={closeDrawer}>
              Explore the Collection
            </ButtonLink>
          </div>
        ) : (
          <>
            <ul className={styles.items}>
              {lines.map((line) => (
                <li key={line.slug} className={styles.item}>
                  <Link
                    href={`/product/${line.slug}`}
                    className={styles.thumb}
                    onClick={closeDrawer}
                    aria-label={`View ${line.name}`}
                  >
                    <ProductImage
                      src={line.image}
                      name={line.name}
                      size={line.size}
                      ratio="4 / 5"
                      sizes="72px"
                    />
                  </Link>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemTop}>
                      <Link
                        href={`/product/${line.slug}`}
                        className={styles.itemName}
                        onClick={closeDrawer}
                      >
                        {line.name}
                      </Link>
                      <button
                        type="button"
                        className={styles.remove}
                        aria-label={`Remove ${line.name} from bag`}
                        onClick={() => remove(line.slug)}
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                    <p className={styles.itemMeta}>
                      {line.size} · <Price value={line.price} /> each
                    </p>
                    <div className={styles.itemBottom}>
                      <QuantityStepper
                        value={line.qty}
                        onChange={(q) => setQty(line.slug, q)}
                        label={`Quantity of ${line.name}`}
                      />
                      <Price value={line.lineTotal} className={styles.lineTotal} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className={styles.footer}>
              <div className={styles.subtotalRow}>
                <span className={styles.subtotalLabel}>Subtotal</span>
                <Price value={subtotal} className={styles.subtotalValue} />
              </div>
              <p className={styles.note}>
                Delivery is confirmed with you when your order is placed.
              </p>
              <ButtonLink href="/checkout" variant="primary" full onClick={closeDrawer}>
                Proceed to Checkout
              </ButtonLink>
              <ButtonLink
                href="/cart"
                variant="outline-dark"
                full
                onClick={closeDrawer}
              >
                View Bag
              </ButtonLink>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
