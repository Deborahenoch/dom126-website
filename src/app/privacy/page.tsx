import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import LegalArticle from "@/components/legal/LegalArticle";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How DOM126 collects, uses and protects your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Support"
        title="Privacy Policy."
        description="Your information, treated with the same care as everything else we do."
      />
      <LegalArticle
        lastUpdated="8 September 2026"
        intro="This policy explains what information DOM126 collects, how it is used, and the choices you have. It applies to this website and the services offered through it."
        sections={[
          {
            heading: "Information we collect",
            paragraphs: [
              "We collect the information you provide directly: your name and contact details when you place an order or submit a request (for example a Custom Signature request or a contact message), and the delivery details needed to fulfil your order.",
              "Your bag, order references and requests are also stored locally on your own device (in your browser) so the website functions smoothly for you. This information stays on your device unless you send it to us.",
            ],
          },
          {
            heading: "How we use your information",
            paragraphs: [
              "We use your information to confirm and fulfil your orders, to respond to your messages and requests, to arrange payment and delivery, and to keep you informed about your order.",
              "We do not sell your personal information, and we do not use it for unrelated purposes.",
            ],
          },
          {
            heading: "Sharing your information",
            paragraphs: [
              "We share information only as needed to fulfil your order — for example with delivery partners once your order is confirmed — and when required by law.",
              "When secure online payment becomes available, payment details will be processed by a licensed payment provider and handled according to their security standards.",
            ],
          },
          {
            heading: "Cookies & local storage",
            paragraphs: [
              "This website uses local storage (not advertising cookies) to remember your bag and your order and request references between visits. You can clear this at any time through your browser settings.",
              "If analytics or advertising tools are enabled in future, this section will be updated with clear details before they are activated.",
            ],
          },
          {
            heading: "Your choices",
            paragraphs: [
              "You can ask us to update or remove the personal information you have shared, or to stop contacting you, at any time. Reach us through the contact page and we will respond personally.",
            ],
          },
          {
            heading: "Changes to this policy",
            paragraphs: [
              "If we update this policy, the new version will be published on this page with an updated date. Material changes will be highlighted to customers they affect.",
            ],
          },
          {
            heading: "Contact",
            paragraphs: [
              "Questions about privacy? Contact DOM126 through the contact page — every message is answered personally.",
            ],
          },
        ]}
      />
    </>
  );
}
