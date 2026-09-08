import { fragrances } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import Price from "@/components/ui/Price";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import Link from "next/link";
import styles from "./CollectionPreview.module.css";

export default function CollectionPreview() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="The Collection"
            title="Fragrances designed to be remembered."
            intro="Three signature fragrances — each presented in a generous 100ml bottle, each priced with complete clarity. Choose the one that complements who you are."
          />
        </Reveal>

        <div className={styles.grid}>
          {fragrances.map((product, i) => (
            <Reveal key={product.slug} delay={i * 100} className={styles.cell}>
              <ProductCard product={product} priority={i === 0} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className={styles.bespokeBanner}>
            <div>
              <p className={`eyebrow eyebrow--rule ${styles.bannerEyebrow}`}>
                Bespoke · Made to Order
              </p>
              <p className={styles.bannerTitle}>
                Or have a signature perfume created for you alone —{" "}
                <span className={styles.bannerPrice}>
                  <Price value={98000} />
                </span>{" "}
                · 100ml
              </p>
            </div>
            <Link href="/custom-signature" className={`link-arrow ${styles.bannerLink}`}>
              Discover Custom Signature <ArrowRightIcon size={16} />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className={styles.ctaRow}>
            <ButtonLink href="/shop" variant="outline-dark">
              View All Fragrances
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
