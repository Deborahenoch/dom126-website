import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, i) => (
          <li key={item.label} className={styles.item}>
            {item.href ? (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={styles.current}>
                {item.label}
              </span>
            )}
            {i < items.length - 1 && (
              <span aria-hidden="true" className={styles.separator}>
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
