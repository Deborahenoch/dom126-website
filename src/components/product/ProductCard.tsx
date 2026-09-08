import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductImage from "./ProductImage";
import Price from "@/components/ui/Price";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

/** Vertical product card for the fragrance collection. */
export default function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <Link
        href={`/product/${product.slug}`}
        className={styles.media}
        aria-label={`View ${product.name}`}
      >
        <ProductImage
          src={product.image}
          name={product.name}
          size={product.size}
          priority={priority}
          sizes="(max-width: 700px) 92vw, (max-width: 1100px) 44vw, 30vw"
        />
      </Link>

      <div className={styles.body}>
        <div className={styles.topRow}>
          <h3 className={styles.name}>
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <Price value={product.price} className={styles.price} />
        </div>

        <p className={styles.tagline}>{product.tagline}</p>

        <p className={styles.blurb}>{product.blurb}</p>

        <div className={styles.actions}>
          <Link href={`/product/${product.slug}`} className={`link-arrow ${styles.view}`}>
            View Product <ArrowRightIcon size={15} />
          </Link>
          <AddToCartButton
            slug={product.slug}
            label="Add to Bag"
            variant="outline-dark"
            className={styles.addBtn}
          />
        </div>
      </div>
    </article>
  );
}
