"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/brand/Logo";
import Price from "@/components/ui/Price";
import { useCart } from "@/components/cart/CartProvider";
import { BagIcon, MenuIcon, SearchIcon, CloseIcon, ArrowRightIcon } from "@/components/ui/icons";
import SearchDialog from "./SearchDialog";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Fragrances", href: "/shop?category=fragrance" },
  { label: "Custom Signature", href: "/custom-signature" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { count, ready, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock scroll + Esc handling for the mobile menu.
  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    const base = href.split("?")[0];
    if (base === "/") return pathname === "/";
    if (base === "/shop") return pathname === "/shop" || pathname.startsWith("/product");
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <p className={styles.announce}>
        <Link href="/custom-signature" className={styles.announceLink}>
          <span className={styles.announceFull}>
            The Custom-Made Signature Perfume · <Price value={98000} /> · Created for
            one person only
          </span>
          <span className={styles.announceShort}>
            Custom-Made Signature Perfume · <Price value={98000} />
          </span>
          <span className={styles.announceCta}>
            Request yours <ArrowRightIcon size={13} />
          </span>
        </Link>
      </p>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container-wide ${styles.inner}`}>
          <Logo />

          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.navList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={styles.navLink}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.iconButton}
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon size={20} />
            </button>

            <button
              type="button"
              className={styles.iconButton}
              aria-label={`Open shopping bag${ready && count > 0 ? ` (${count} items)` : ""}`}
              onClick={openDrawer}
            >
              <BagIcon size={20} />
              {ready && count > 0 && (
                <span className={styles.badge} aria-hidden="true">
                  {count}
                </span>
              )}
            </button>

            <Link href="/shop" className={styles.shopNow}>
              Shop Now
            </Link>

            <button
              type="button"
              className={`${styles.iconButton} ${styles.burger}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ---------- Mobile menu ---------- */}
      <div
        id="mobile-menu"
        className={styles.mobileMenu}
        data-open={menuOpen}
        inert={!menuOpen}
      >
        <nav aria-label="Mobile" className={`container-wide ${styles.mobileNav}`}>
          <ul>
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                className={styles.mobileItem}
                style={{ transitionDelay: menuOpen ? `${80 + i * 45}ms` : "0ms" }}
              >
                <Link
                  href={link.href}
                  className={styles.mobileLink}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={styles.mobileIndex} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`container-wide ${styles.mobileFooter}`}>
          <Link
            href="/shop"
            className="btn btn--primary"
            onClick={() => setMenuOpen(false)}
          >
            Shop Our Fragrances
          </Link>
          <Link
            href="/custom-signature"
            className="btn btn--outline-light"
            onClick={() => setMenuOpen(false)}
          >
            Create Your Signature Scent
          </Link>
          <p className={styles.mobileTagline}>Smell Good. Be Remembered.</p>
        </div>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
