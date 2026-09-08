import styles from "./PageHero.module.css";
import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Slightly reduce vertical rhythm (used on utility pages). */
  compact?: boolean;
}

/** Shared navy page header used across all inner pages. */
export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  compact = false,
}: PageHeroProps) {
  return (
    <section className={`${styles.hero} ${compact ? styles.compact : ""}`}>
      <div className="container">
        <p className={`eyebrow eyebrow--rule ${styles.eyebrow}`}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        {description ? <div className={styles.description}>{description}</div> : null}
        {children ? <div className={styles.actions}>{children}</div> : null}
      </div>
    </section>
  );
}
