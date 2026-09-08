import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./StoryQuote.module.css";

export default function StoryQuote() {
  return (
    <section className={`grain ${styles.section}`} aria-label="The DOM126 story">
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.shade} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <p className={`eyebrow eyebrow--rule ${styles.eyebrow}`}>Why It Matters</p>
        </Reveal>
        <Reveal delay={120}>
          <blockquote className={styles.quote}>
            <p>
              People may forget what you wore.
              <br />
              They may forget what you said.
              <br />
              <span className={styles.accent}>But sometimes, they remember how you smelled.</span>
            </p>
          </blockquote>
        </Reveal>
        <Reveal delay={220}>
          <p className={styles.support}>
            Scent is memory&rsquo;s quiet signature. A fragrance can recall a person, a
            moment, a feeling — years later. DOM126 exists to make that memory yours:
            confidence, attraction, identity and presence, carried in glass.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className={styles.cta}>
            <ButtonLink href="/about" variant="outline-light">
              The DOM126 Story
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
