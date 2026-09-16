import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import LegalArticle from "@/components/legal/LegalArticle";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Shipping & Delivery",
  description:
    "How DOM126 orders are confirmed and delivered — across Nigeria today, with international delivery on the horizon.",
  path: "/shipping",
});

export default function ShippingPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Support"
        title="Shipping & Delivery."
        description="How your DOM126 order reaches you — clearly, personally, and without surprises."
      />
      <LegalArticle
        lastUpdated="8 September 2026"
        intro="DOM126 personally confirms and coordinates every order. This page explains how ordering and delivery work today."
        sections={[
          {
            heading: "Placing an order",
            paragraphs: [
              "When you place an order on this website, you submit an order request. A member of the DOM126 team then contacts you — using the details you provided — to confirm your order, arrange payment and schedule delivery.",
              "This personal approach keeps every order accurate and secure. Secure online payment is being prepared and will be announced when available.",
            ],
          },
          {
            heading: "Delivery within Nigeria",
            paragraphs: [
              "DOM126 serves customers across Nigeria. Delivery is available to all states, arranged when your order is confirmed.",
              "Delivery fees and timelines are confirmed with you as part of your order confirmation. Detailed delivery fees and zones will be published on this page once finalised. [To be confirmed by DOM126]",
            ],
          },
          {
            heading: "Delivery outside Nigeria",
            paragraphs: [
              "International delivery is not yet available at checkout. DOM126 is a Nigerian brand preparing to serve the wider African market — if you are outside Nigeria, contact us and we will advise you on what is possible.",
            ],
          },
          {
            heading: "Order updates",
            paragraphs: [
              "From confirmation to delivery, the DOM126 team keeps you informed every step of the way. If you have any questions about an order, contact us through the contact page.",
            ],
          },
        ]}
      />
    </>
  );
}
