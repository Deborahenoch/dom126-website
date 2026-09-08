import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    index: "01",
    title: "Discover",
    copy: "Explore the DOM126 collection.",
  },
  {
    index: "02",
    title: "Choose",
    copy: "Find the fragrance that fits your personality.",
  },
  {
    index: "03",
    title: "Order",
    copy: "Add your fragrance to your bag and proceed to order.",
  },
  {
    index: "04",
    title: "Make an Impression",
    copy: "Wear it confidently and make it part of your presence.",
  },
];

const SIGNATURE_STEPS = ["Discover", "Request", "Personalize", "Experience"];

export default function HowItWorks() {
  return (
    <section className={`section section--navy ${styles.section}`}>
      <div className="container">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="How It Works"
            title="From first spray to lasting impression."
          />
        </Reveal>

        <ol className={styles.steps}>
          {STEPS.map((step, i) => (
            <Reveal key={step.index} delay={i * 90} className={styles.stepCell}>
              <li className={styles.step}>
                <p className={styles.stepIndex} aria-hidden="true">
                  {step.index}
                </p>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepCopy}>{step.copy}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={150}>
          <div className={styles.signaturePath}>
            <p className={styles.signatureLabel}>
              The Custom Signature path
            </p>
            <ol className={styles.signatureSteps}>
              {SIGNATURE_STEPS.map((label, i) => (
                <li key={label} className={styles.signatureStep}>
                  <span>{label}</span>
                  {i < SIGNATURE_STEPS.length - 1 && (
                    <ArrowRightIcon size={14} className={styles.signatureArrow} />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
