"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section section--navy" style={{ minHeight: "55vh", display: "grid", alignContent: "center" }}>
      <div className="container" style={{ textAlign: "center", display: "grid", justifyItems: "center", gap: "1.2rem" }}>
        <p className="eyebrow eyebrow--rule" style={{ color: "var(--gold)" }}>
          Something went wrong
        </p>
        <h1 className="h2" style={{ color: "var(--on-dark-heading)" }}>
          An unexpected error occurred.
        </h1>
        <p style={{ color: "var(--on-dark-body)", maxWidth: "48ch" }}>
          Please try again. If the problem continues, we apologise — reach us
          through the contact page.
        </p>
        <div style={{ display: "flex", gap: "0.9rem", justifyContent: "center", marginTop: "1rem" }}>
          <button type="button" className="btn btn--primary" onClick={reset}>
            Try Again
          </button>
          <ButtonLink href="/" variant="outline-light">
            Return Home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
