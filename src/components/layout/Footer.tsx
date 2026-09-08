import Link from "next/link";
import Logo from "@/components/brand/Logo";
import { siteConfig } from "@/lib/site-config";
import styles from "./Footer.module.css";

const shopLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Boss Man", href: "/product/boss-man" },
  { label: "Ephata", href: "/product/ephata" },
  { label: "Sweet Savour", href: "/product/sweet-savour" },
  { label: "Custom Signature", href: "/custom-signature" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const supportLinks = [
  { label: "Shipping", href: "/shipping" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hasSocial = Object.values(siteConfig.social).some((v) => v !== "");

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <Logo size="lg" />
          <p className={styles.tagline}>Smell Good. Be Remembered.</p>
          <p className={styles.brandLine}>
            A premium Nigerian fragrance house — crafting scents designed for
            confidence, individuality and unforgettable presence.
          </p>
          <div className={styles.social}>
            <p className={styles.socialTitle}>Follow DOM126</p>
            {hasSocial ? (
              <ul className={styles.socialList}>
                {Object.entries(siteConfig.social)
                  .filter(([, url]) => url !== "")
                  .map(([name, url]) => (
                    <li key={name}>
                      <a href={url} rel="noopener noreferrer" target="_blank">
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </a>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className={styles.socialSoon}>
                Instagram · Facebook · TikTok — official channels coming soon
              </p>
            )}
          </div>
        </div>

        <nav className={styles.linkCol} aria-label="Shop">
          <h2 className={styles.colTitle}>Shop</h2>
          <ul>
            {shopLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.linkCol} aria-label="Company">
          <h2 className={styles.colTitle}>Company</h2>
          <ul>
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.linkCol} aria-label="Support">
          <h2 className={styles.colTitle}>Support</h2>
          <ul>
            {supportLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className={styles.watermark} aria-hidden="true">
        DOM126
      </p>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} DOM126 Fragrances. All rights reserved.
        </p>
        <p className={styles.bottomTagline}>Smell Good. Be Remembered.</p>
        <p className={styles.bottomLinks}>
          <Link href="/privacy">Privacy</Link>
          <span aria-hidden="true">·</span>
          <Link href="/terms">Terms</Link>
          <span aria-hidden="true">·</span>
          <Link href="/shipping">Shipping</Link>
        </p>
      </div>
    </footer>
  );
}
