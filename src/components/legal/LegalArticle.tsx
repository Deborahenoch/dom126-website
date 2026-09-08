import styles from "./LegalArticle.module.css";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalArticleProps {
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

/**
 * Shared layout for policy pages. All policy content on this site is a
 * clearly-labelled working draft for DOM126 to review, complete and approve
 * before launch.
 */
export default function LegalArticle({
  lastUpdated,
  intro,
  sections,
}: LegalArticleProps) {
  return (
    <article className="section">
      <div className={`container ${styles.wrap}`}>
        <p className={styles.draftNote}>
          <strong>Working draft.</strong> This page is a starting point prepared
          for DOM126 and should be reviewed, completed and approved by the brand
          before launch. Slots marked “to be confirmed” await official details.
        </p>
        <p className={styles.updated}>Last updated: {lastUpdated}</p>
        <p className={styles.intro}>{intro}</p>

        {sections.map((s) => (
          <section key={s.heading} className={styles.section}>
            <h2 className={styles.heading}>{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 32)} className={styles.paragraph}>
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
