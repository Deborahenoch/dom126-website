import Ornament from "@/components/ui/Ornament";
import styles from "./TrustStrip.module.css";

const TRUST_ITEMS = [
  "Premium Nigerian fragrance brand",
  "100ml premium fragrances",
  "Custom signature fragrances available",
  "Designed for unforgettable presence",
];

export default function TrustStrip() {
  return (
    <section className={styles.strip} aria-label="Why DOM126">
      <ul className="container">
        {TRUST_ITEMS.map((item) => (
          <li key={item} className={styles.item}>
            <Ornament className={styles.ornament} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
