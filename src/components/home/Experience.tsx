import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import styles from "./Experience.module.css";

const PILLARS = [
  {
    index: "01",
    title: "More Than a Fragrance",
    copy: "Your scent becomes part of your identity — the trace that is unmistakably you.",
  },
  {
    index: "02",
    title: "Designed to Be Remembered",
    copy: "Create a presence people associate with you, long after the moment has passed.",
  },
  {
    index: "03",
    title: "Made for Your Personality",
    copy: "Choose a fragrance that complements who you are — and how you want to be known.",
  },
  {
    index: "04",
    title: "A Premium Experience",
    copy: "Every interaction with DOM126 — from first discovery to delivery — should feel elevated.",
  },
];

export default function Experience() {
  return (
    <section className={`section section--navy grain ${styles.section}`}>
      <div className="container">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="The DOM126 Experience"
            title="More than a fragrance."
            intro="DOM126 is not simply selling perfume. Fragrance is part of personal identity — the scent associated with your presence, confidence and memory."
          />
        </Reveal>

        <div className={styles.grid}>
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.index} delay={i * 90} className={styles.cell}>
              <div className={styles.pillar}>
                <p className={styles.index} aria-hidden="true">
                  {pillar.index}
                </p>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarCopy}>{pillar.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
