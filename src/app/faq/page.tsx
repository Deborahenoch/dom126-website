import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Accordion from "@/components/ui/Accordion";
import Reveal from "@/components/ui/Reveal";
import { faqGroups } from "@/lib/faq";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import styles from "./faq.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Sizes, prices, the Custom Signature experience, ordering, delivery within Nigeria and more — answers to common DOM126 questions.",
  path: "/faq",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    }))
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered."
        description="Everything you need to know about the collection, the Custom Signature experience, ordering and delivery."
      />

      <section className="section">
        <div className={`container ${styles.wrap}`}>
          {faqGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 60}>
              <div className={styles.group}>
                <h2 className={styles.groupTitle}>{group.title}</h2>
                <Accordion items={group.items} idPrefix={`faq-group-${i}`} />
              </div>
            </Reveal>
          ))}

          <Reveal delay={100}>
            <div className={styles.stillQuestions}>
              <p className={styles.stillTitle}>Still have a question?</p>
              <p className={styles.stillCopy}>
                Send us a message — a member of the DOM126 team will get back to
                you personally.
              </p>
              <ButtonLink href="/contact" variant="outline-dark">
                Contact DOM126
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
