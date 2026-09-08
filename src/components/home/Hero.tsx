import Link from "next/link";
import { fragrances } from "@/lib/products";
import Price from "@/components/ui/Price";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={`grain ${styles.hero}`}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.shade} aria-hidden="true" />

      <div className={`container-wide ${styles.content}`}>
        <p className={`eyebrow eyebrow--rule ${styles.kicker} ${styles.a1}`}>
          DOM126 Fragrances
        </p>
        <h1 className={styles.title}>
          <span className={`${styles.line} ${styles.a2}`}>Smell Good.</span>
          <span className={`${styles.line} ${styles.accent} ${styles.a3}`}>
            Be Remembered.
          </span>
        </h1>
        <p className={`${styles.lead} ${styles.a4}`}>
          Your scent speaks before you do. DOM126 creates premium fragrances
          designed to elevate presence, express individuality and leave a
          memorable impression.
        </p>
        <div className={`${styles.ctas} ${styles.a5}`}>
          <ButtonLink href="/shop" variant="primary" arrow>
            Shop Our Fragrances
          </ButtonLink>
          <ButtonLink href="/custom-signature" variant="outline-light">
            Create Your Signature Scent
          </ButtonLink>
        </div>
      </div>

      <div className={`container-wide ${styles.a6}`}>
        <p className={styles.stripLabel}>The Collection — 100ml</p>
        <ul className={styles.strip}>
          {fragrances.map((f) => (
            <li key={f.slug} className={styles.stripItem}>
              <Link href={`/product/${f.slug}`} className={styles.stripLink}>
                <span className={styles.stripName}>{f.name}</span>
                <span className={styles.stripPrice}>
                  <Price value={f.price} />
                </span>
                <ArrowRightIcon size={15} className={styles.stripArrow} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
