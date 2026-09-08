import styles from "./SectionHeading.module.css";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${styles.root} ${styles[tone]} ${styles[align]} ${className}`}
    >
      <p className={`eyebrow eyebrow--rule ${styles.eyebrow}`}>{eyebrow}</p>
      <h2 className={`h2 ${styles.title}`}>{title}</h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </div>
  );
}
