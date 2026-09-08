import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import LegalArticle from "@/components/legal/LegalArticle";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern your use of the DOM126 website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Support"
        title="Terms & Conditions."
        description="The simple, fair terms that govern this website and the DOM126 experience."
      />
      <LegalArticle
        lastUpdated="8 September 2026"
        intro="These terms govern your use of the DOM126 website and the products and services offered through it. By using this website, you agree to them."
        sections={[
          {
            heading: "The website & our products",
            paragraphs: [
              "This website presents the DOM126 fragrance collection and the Custom-Made Signature Perfume experience. We aim for every photograph and description to be accurate; colours may vary slightly depending on your screen.",
              "Product availability and prices are shown on each product page. We reserve the right to update the collection, content and prices — the details shown at the time you place your order are what apply.",
            ],
          },
          {
            heading: "Pricing",
            paragraphs: [
              "All prices are quoted in Nigerian Naira (₦). Each fragrance in the current collection — Boss Man, Ephata and Sweet Savour — is ₦54,000 for 100ml. The Custom-Made Signature Perfume is ₦98,000 for 100ml.",
            ],
          },
          {
            heading: "Orders",
            paragraphs: [
              "Placing an order on this website submits an order request. Your order becomes a confirmed order when the DOM126 team contacts you, confirms the details, and payment and delivery are arranged.",
              "If an order cannot be fulfilled — for example if a fragrance is unavailable — we will contact you promptly to resolve it.",
            ],
          },
          {
            heading: "The Custom Signature Perfume",
            paragraphs: [
              "The Custom-Made Signature Perfume is a bespoke experience: a fragrance created specifically for one individual, on request. The details of the bespoke process, timelines and any revision arrangements are shared personally during your request. [Process terms to be confirmed by DOM126]",
            ],
          },
          {
            heading: "Intellectual property",
            paragraphs: [
              "The DOM126 name, logo, product designs, packaging, photography and website content are the property of DOM126 Fragrances and may not be copied, reproduced or used without permission.",
            ],
          },
          {
            heading: "Acceptable use",
            paragraphs: [
              "You agree to use this website lawfully and not to misuse, disrupt or attempt to gain unauthorised access to it or to information stored within it.",
            ],
          },
          {
            heading: "Liability",
            paragraphs: [
              "DOM126 takes care in presenting this website and fulfilling orders. To the extent permitted by law, DOM126 is not liable for indirect losses arising from use of this website.",
            ],
          },
          {
            heading: "Governing law",
            paragraphs: [
              "These terms are governed by the laws of the Federal Republic of Nigeria. [Formal legal review recommended before launch]",
            ],
          },
          {
            heading: "Contact",
            paragraphs: [
              "Questions about these terms? Contact DOM126 through the contact page.",
            ],
          },
        ]}
      />
    </>
  );
}
