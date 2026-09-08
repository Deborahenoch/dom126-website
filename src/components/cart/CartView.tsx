"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import ProductImage from "@/components/product/ProductImage";
import QuantityStepper from "./QuantityStepper";
import Price from "@/components/ui/Price";
import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { BagIcon, TrashIcon } from "@/components/ui/icons";
import styles from "./CartView.module.css";

export default function CartView() {
  const { lines, subtotal, count, setQty, remove, clear, ready } = useCart();

  return (
    <>
      <PageHero
        eyebrow="Your Bag"
        title="Review your selection."
        description="Every order is personally confirmed by the DOM126 team — payment and delivery are arranged once your order is placed."
      />

      <section className="section">
        <div className="container">
          {!ready ? null : lines.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>
                <BagIcon size={30} />
              </span>
              <h2 className={styles.emptyTitle}>Your bag is empty</h2>
              <p className={styles.emptyText}>
                Explore the collection and choose the fragrance that fits your
                presence.
              </p>
              <ButtonLink href="/shop" variant="primary">
                Explore the Collection
              </ButtonLink>
            </div>
          ) : (
            <div className={styles.grid}>
              <div className={styles.itemsCol}>
                <ul className={styles.items}>
                  {lines.map((line) => (
                    <li key={line.slug} className={styles.item}>
                      <Link
                        href={`/product/${line.slug}`}
                        className={styles.thumb}
                        aria-label={`View ${line.name}`}
                      >
                        <ProductImage
                          src={line.image}
                          name={line.name}
                          size={line.size}
                          ratio="4 / 5"
                          sizes="110px"
                        />
                      </Link>
                      <div className={styles.info}>
                        <div className={styles.infoTop}>
                          <Link href={`/product/${line.slug}`} className={styles.name}>
                            {line.name}
                          </Link>
                          <button
                            type="button"
                            className={styles.remove}
                            aria-label={`Remove ${line.name} from bag`}
                            onClick={() => remove(line.slug)}
                          >
                            <TrashIcon size={17} />
                          </button>
                        </div>
                        <p className={styles.meta}>
                          {line.size} · <Price value={line.price} /> each
                        </p>
                        <div className={styles.bottomRow}>
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
                <div className={styles.itemsFooter}>
                  <Link href="/shop" className={`link-arrow ${styles.continue}`}>
                    Continue shopping
                  </Link>
                  <button type="button" className={styles.clear} onClick={clear}>
                    Clear bag
                  </button>
                </div>
              </div>

              <aside className={styles.summary} aria-label="Order summary">
                <h2 className={styles.summaryTitle}>Summary</h2>
                <div className={styles.summaryRow}>
                  <span>Items ({count})</span>
                  <Price value={subtotal} />
                </div>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <Price value={subtotal} className={styles.summaryValue} />
                </div>
                <div className={styles.summaryRowMuted}>
                  <span>Delivery</span>
                  <span>Confirmed with your order</span>
                </div>
                <p className={styles.summaryNote}>
                  Placing your order sends a request — the DOM126 team contacts
                  you to confirm payment and delivery. Secure online payment is
                  coming soon.
                </p>
                <ButtonLink href="/checkout" variant="primary" full arrow>
                  Proceed to Checkout
                </ButtonLink>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
