import Link from "next/link";
import styles from "./Logo.module.css";

interface LogoProps {
  size?: "md" | "lg";
  className?: string;
}

/**
 * DOM126 wordmark.
 * Typographic treatment (deep navy + gold brand palette) that can be swapped
 * for the official logo file — see ASSETS.md.
 */
export default function Logo({ size = "md", className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="DOM126 Fragrances — home"
      className={`${styles.logo} ${styles[size]} ${className}`}
    >
      <span className={styles.word} aria-hidden="true">
        DOM<span className={styles.gold}>126</span>
      </span>
      <span className={styles.sub} aria-hidden="true">
        Fragrances
      </span>
    </Link>
  );
}
