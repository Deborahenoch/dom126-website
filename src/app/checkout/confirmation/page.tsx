import type { Metadata } from "next";
import { Suspense } from "react";
import ConfirmationView from "@/components/checkout/ConfirmationView";
import { pageMetadata } from "@/lib/seo";

/**
 * Kept out of the index, and now carries its own canonical: without one it used
 * to inherit the layout's "/", which tells crawlers this page *is* the home page.
 * `og:url` matches the canonical for the same reason.
 */
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Order Received",
    description: "Your DOM126 order request has been received.",
    path: "/checkout/confirmation",
  }),
  robots: { index: false },
};

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <section className="section">
          <div className="container" style={{ textAlign: "center", paddingBlock: "3rem" }}>
            <p style={{ color: "var(--ink-soft)" }}>Loading…</p>
          </div>
        </section>
      }
    >
      <ConfirmationView />
    </Suspense>
  );
}
