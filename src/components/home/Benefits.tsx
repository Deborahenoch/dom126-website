import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Ornament from "@/components/ui/Ornament";
import styles from "./Benefits.module.css";

const BENEFITS = [
  {
    title: "Be Memorable",
    copy: "Leave a scent people associate with you.",
  },
  {
    title: "Feel More Confident",
    copy: "Make fragrance part of the way you carry yourself.",
  },
  {
    title: "Express Yourself",
    copy: "Choose a scent that complements your personality and style.",
  },
  {
    title: "Create Lasting Impressions",
    copy: "Make every entrance, meeting, date, event and moment count.",
  },
];

export default function Benefits() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Why Fragrance Matters"
            title="The quiet advantage of a signature scent."
          />
        </Reveal>

        <div className={styles.grid}>
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 90} className={styles.cell}>
              <div className={styles.benefit}>
                <Ornament className={styles.ornament} />
                <h3 className={styles.title}>{b.title}</h3>
                <p className={styles.copy}>{b.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
