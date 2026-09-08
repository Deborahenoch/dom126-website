import type { Product } from "@/lib/products";
import Link from "next/link";
import ProductImage from "./ProductImage";
import Price from "@/components/ui/Price";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "./BespokeCard.module.css";

/**
 * Feature card for the Custom-Made Signature Perfume — visually distinct
 * (deep navy, gold framing) while staying unmistakably DOM126.
 */
export default function BespokeCard({ product }: { product: Product }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <ProductImage
          src={product.image}
          name={product.name}
          size={product.size}
          ratio="4 / 5"
          sizes="(max-width: 900px) 92vw, 40vw"
        />
      </div>

      <div className={styles.content}>
        <p className={`eyebrow eyebrow--rule ${styles.eyebrow}`}>
          Bespoke · Made to Order
        </p>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.tagline}>{product.tagline}</p>
        <p className={styles.copy}>
          A custom-made signature perfume, created on request for a single
          individual. Exclusive, personal and unmistakably yours — there will
          never be another like it.
        </p>

        <div className={styles.specRow}>
          <Price value={product.price} className={styles.price} />
          <span className={styles.chip}>{product.size}</span>
          <span className={styles.chip}>Made for one</span>
        </div>

        <div className={styles.actions}>
          <ButtonLink href="/custom-signature#request" variant="primary" arrow>
            Request Your Signature Perfume
          </ButtonLink>
          <Link href="/custom-signature" className={`link-arrow ${styles.discover}`}>
            Discover the experience <ArrowRightIcon size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
