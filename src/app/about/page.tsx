import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Ornament from "@/components/ui/Ornament";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import styles from "./about.module.css";

export const metadata: Metadata = pageMetadata({
  title: "About DOM126",
  description:
    "DOM126 is a premium Nigerian fragrance house crafting scents for confidence, individuality and unforgettable presence — born in Nigeria, made for the continent.",
  path: "/about",
});

const BELIEFS = [
  {
    term: "Confidence",
    def: "Fragrance as part of the way you carry yourself.",
  },
  {
    term: "Identity",
    def: "A scent that becomes part of who you are.",
  },
  {
    term: "Presence",
    def: "The impression that arrives before you speak.",
  },
  {
    term: "Individuality",
    def: "A signature that could belong to no one else.",
  },
  {
    term: "Memorability",
    def: "The trace people carry with them, long after you have gone.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A premium Nigerian fragrance house."
        description="DOM126 creates fragrances designed to elevate presence, express individuality and leave a memorable impression — born in Nigeria, made for the continent."
      />

      {/* ---------- The idea ---------- */}
      <section className="section">
        <div className={`container ${styles.ideaGrid}`}>
          <Reveal>
            <div className={styles.ideaSticky}>
              <SectionHeading
                eyebrow="The Idea"
                title="We don't simply sell perfume."
              />
              <p className={styles.ideaCopy}>
                DOM126 represents fragrance as part of personal identity — the
                scent associated with someone&rsquo;s presence, confidence,
                personality, attraction, individuality and memories. Our
                fragrances are made for people who don&rsquo;t merely want to
                smell nice.
              </p>
              <p className={styles.ideaCopy}>
                They want to stand out. Feel confident. Express themselves.
                Create a presence. Be remembered.
              </p>
            </div>
          </Reveal>
          <div className={styles.beliefs}>
            {BELIEFS.map((b, i) => (
              <Reveal key={b.term} delay={i * 70}>
                <div className={styles.belief}>
                  <h3 className={styles.beliefTerm}>{b.term}</h3>
                  <p className={styles.beliefDef}>{b.def}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Tagline band ---------- */}
      <section className={`grain ${styles.band}`}>
        <div className={styles.bandBg} aria-hidden="true" />
        <div className={`container ${styles.bandInner}`}>
          <Reveal>
            <p className={styles.bandTagline}>
              Smell Good.
              <br />
              <span className={styles.bandAccent}>Be Remembered.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Where we're going ---------- */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Where We Are Going"
              title="Born in Nigeria. Made for the continent."
              intro="DOM126 serves customers across Nigeria today — with the ambition to carry the same standard of fragrance and experience across the wider African market."
            />
          </Reveal>
          <div className={styles.pillars}>
            <Reveal delay={80}>
              <div className={styles.pillar}>
                <Ornament className={styles.pillarOrnament} />
                <h3 className={styles.pillarTitle}>A growing collection</h3>
                <p className={styles.pillarCopy}>
                  Today: Boss Man, Ephata and Sweet Savour — each 100ml. The
                  collection is designed to grow, fragrance by fragrance.
                </p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className={styles.pillar}>
                <Ornament className={styles.pillarOrnament} />
                <h3 className={styles.pillarTitle}>A bespoke experience</h3>
                <p className={styles.pillarCopy}>
                  The Custom-Made Signature Perfume — a fragrance created for
                  one person only, on request.
                </p>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className={styles.pillar}>
                <Ornament className={styles.pillarOrnament} />
                <h3 className={styles.pillarTitle}>A premium standard</h3>
                <p className={styles.pillarCopy}>
                  Every interaction with DOM126 — from discovery to delivery —
                  should feel elevated. That standard does not change as we grow.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className={styles.ctaRow}>
              <ButtonLink href="/shop" variant="primary" arrow>
                Shop the Collection
              </ButtonLink>
              <ButtonLink href="/custom-signature" variant="outline-dark">
                Create Your Signature Scent
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
