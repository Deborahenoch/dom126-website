import Link from "next/link";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="section section--navy" style={{ minHeight: "55vh", display: "grid", alignContent: "center" }}>
      <div className="container" style={{ textAlign: "center", display: "grid", justifyItems: "center", gap: "1.2rem" }}>
        <p className="eyebrow eyebrow--rule" style={{ color: "var(--gold)" }}>
          404
        </p>
        <h1 className="h2" style={{ color: "var(--on-dark-heading)" }}>
          This page has faded like a trace of perfume.
        </h1>
        <p style={{ color: "var(--on-dark-body)", maxWidth: "48ch" }}>
          The page you are looking for doesn&rsquo;t exist or has moved. Let us
          guide you back to the collection.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem", justifyContent: "center", marginTop: "1rem" }}>
          <ButtonLink href="/" variant="primary">
            Return Home
          </ButtonLink>
          <ButtonLink href="/shop" variant="outline-light">
            Shop Fragrances
          </ButtonLink>
        </div>
        <p style={{ marginTop: "1.4rem", fontSize: "0.85rem", color: "var(--on-dark-faint)" }}>
          Need help? <Link href="/contact" style={{ color: "var(--gold-bright)", textDecoration: "underline", textUnderlineOffset: 3 }}>Contact DOM126</Link>
        </p>
      </div>
    </section>
  );
}
