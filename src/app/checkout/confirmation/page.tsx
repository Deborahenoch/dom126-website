import type { Metadata } from "next";
import { Suspense } from "react";
import ConfirmationView from "@/components/checkout/ConfirmationView";

export const metadata: Metadata = {
  title: "Order Received",
  description: "Your DOM126 order request has been received.",
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
