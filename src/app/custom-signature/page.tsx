import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Ornament from "@/components/ui/Ornament";
import Price from "@/components/ui/Price";
import InquiryForm from "@/components/forms/InquiryForm";
import styles from "./custom-signature.module.css";

export const metadata: Metadata = {
  title: "Custom Signature Perfume — Your Scent. Your Identity.",
  description:
    "A custom-made signature perfume created specifically for one individual, on request. Exclusive, personal and unmistakably yours — ₦98,000, 100ml.",
  alternates: { canonical: "/custom-signature" },
};

const MEANS = [
  {
    term: "Exclusivity",
    def: "Created for one person only. No one else will ever wear your scent.",
  },
  {
    term: "Individuality",
    def: "Composed around who you are — not around a trend or a category.",
  },
  {
    term: "Personal expression",
    def: "Your personality, style and moments, translated into fragrance.",
  },
  {
    term: "Bespoke craftsmanship",
    def: "Made to order, by request, with the care a signature deserves.",
  },
  {
    term: "Luxury",
    def: "An experience measured in detail and attention — not noise.",
  },
  {
    term: "Identity",
    def: "The scent people associate with you. Your signature, in glass.",
  },
];

const PROCESS = [
  {
    index: "01",
    title: "Discover",
    copy: "Explore the DOM126 collection and imagine a scent that could only be yours.",
  },
  {
    index: "02",
    title: "Request",
    copy: "Tell us about yourself — your style, your personality, the moments you dress for.",
  },
  {
    index: "03",
    title: "Personalize",
    copy: "DOM126 crafts a fragrance created specifically for you. The details of the process are shared with you during your request.",
  },
  {
    index: "04",
    title: "Experience",
    copy: "Receive your signature perfume — 100ml, made for one person only.",
  },
];

export default function CustomSignaturePage() {
  return (
    <>
      <PageHero
        eyebrow="Custom Signature"
        title={
          <>
            Your scent.
            <br />
            <span className="text-serif-italic" style={{ color: "var(--gold-bright)" }}>
              Your identity.
            </span>
          </>
        }
        description="A custom-made signature perfume created specifically for an individual, on request. Not chosen from a shelf — composed around you."
      />

      {/* ---------- What it means ---------- */}
      <section className="section">
        <div className={`container ${styles.meansGrid}`}>
          <Reveal>
            <div className={styles.meansIntro}>
              <SectionHeading
                eyebrow="An Experience, Not a Product"
                title="Some fragrances are made for everyone. This one is made for you."
              />
              <p className={styles.meansCopy}>
                The DOM126 Custom-Made Signature Perfume is a bespoke creation —
                the most personal expression of the house. From your
                personality to the moments you live in, every detail shapes a
                scent that could belong to no one else.
              </p>
              <p className={styles.meansCopy}>
                One fragrance. One person. One signature.
              </p>
            </div>
          </Reveal>
          <div className={styles.meansList}>
            {MEANS.map((m, i) => (
              <Reveal key={m.term} delay={i * 60}>
                <div className={styles.mean}>
                  <h3 className={styles.meanTerm}>{m.term}</h3>
                  <p className={styles.meanDef}>{m.def}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section id="process" className={`section section--navy grain ${styles.process}`}>
        <div className="container">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="How It Works"
              title="How the experience unfolds."
            />
          </Reveal>
          <ol className={styles.processGrid}>
            {PROCESS.map((step, i) => (
              <Reveal key={step.index} delay={i * 90}>
                <li className={styles.processStep}>
                  <p className={styles.processIndex} aria-hidden="true">
                    {step.index}
                  </p>
                  <h3 className={styles.processTitle}>{step.title}</h3>
                  <p className={styles.processCopy}>{step.copy}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={140}>
            <div className={styles.priceBand}>
              <div>
                <p className={styles.priceLabel}>The Custom-Made Signature Perfume</p>
                <Price value={98000} className={styles.priceValue} />
              </div>
              <div className={styles.priceChips}>
                <span className={styles.priceChip}>100ml</span>
                <span className={styles.priceChip}>Made to Order</span>
                <span className={styles.priceChip}>By Request Only</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Request form ---------- */}
      <section id="request" className="section">
        <div className="container">
          <div className={styles.requestGrid}>
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Begin Your Request"
                  title="Tell us who you are."
                  intro="Share a few details about yourself and how you want to be remembered. A member of the DOM126 team will contact you personally to begin your signature experience."
                />
                <ul className={styles.requestNotes}>
                  <li>
                    <Ornament className={styles.requestOrnament} />
                    We only ask for what your request needs — nothing sensitive, nothing unnecessary.
                  </li>
                  <li>
                    <Ornament className={styles.requestOrnament} />
                    Formulation details remain with the DOM126 house — your
                    signature stays yours.
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className={styles.formWrap}>
                <InquiryForm type="custom-signature" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
