import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./Testimonials.module.css";

/**
 * TESTIMONIALS — placeholder structure.
 *
 * No invented reviews are presented as real. Once genuine DOM126 customer
 * reviews are supplied, add them to the array below (name, location optional,
 * quote, verified flag) and they render automatically in place of the
 * "coming soon" cards.
 */
const testimonials: { name: string; location?: string; quote: string }[] = [];

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Customer Voices"
            title="Real words. Real memories."
            intro="We only publish words from genuine DOM126 customers — the first reviews are on their way. No invented praise. Only the real thing."
          />
        </Reveal>

        {testimonials.length > 0 ? (
          <div className={styles.grid}>
            {testimonials.map((t) => (
              <figure key={t.name} className={styles.card}>
                <div className={styles.stars} aria-label="Five star review">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} filled />
                  ))}
                </div>
                <blockquote className={styles.quote}>{t.quote}</blockquote>
                <figcaption className={styles.attribution}>
                  {t.name}
                  {t.location ? <span className={styles.location}> · {t.location}</span> : null}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <Reveal delay={120}>
            <div className={styles.placeholder}>
              <div className={styles.placeholderCards} aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <div key={i} className={styles.placeholderCard}>
                    <div className={styles.starsFaint}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} />
                      ))}
                    </div>
                    <p className={styles.placeholderText}>Customer review — coming soon</p>
                  </div>
                ))}
              </div>
              <div className={styles.placeholderCta}>
                <p className={styles.placeholderLine}>
                  Be among the first to wear DOM126 — and let your experience speak.
                </p>
                <ButtonLink href="/shop" variant="outline-dark">
                  Shop the Collection
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Star({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill={filled ? "var(--gold-deep)" : "none"}
      stroke="var(--gold-deep)"
      strokeWidth="1.4"
    >
      <path d="M12 2.6 14.9 8.6 21.5 9.5 16.7 14.1 17.9 20.7 12 17.5 6.1 20.7 7.3 14.1 2.5 9.5 9.1 8.6Z" />
    </svg>
  );
}
