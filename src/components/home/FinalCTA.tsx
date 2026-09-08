import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./FinalCTA.module.css";

export default function FinalCTA() {
  return (
    <section className={`grain ${styles.section}`} aria-label="Shop DOM126">
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.shade} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <p className={`eyebrow eyebrow--rule ${styles.eyebrow}`}>DOM126 Fragrances</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className={styles.title}>What will they remember about you?</h2>
        </Reveal>
        <Reveal delay={220}>
          <p className={styles.copy}>
            Choose a fragrance that becomes part of your presence.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className={styles.ctas}>
            <ButtonLink href="/shop" variant="primary" arrow>
              Shop DOM126
            </ButtonLink>
            <ButtonLink href="/custom-signature" variant="outline-light">
              Create My Signature Scent
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
