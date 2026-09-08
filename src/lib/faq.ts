/**
 * FAQ content — single source of truth for the FAQ page (and FAQ structured data).
 * Only include facts confirmed by DOM126. Slots marked [To be confirmed]
 * are deliberate placeholders the brand should complete.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    title: "The Fragrances",
    items: [
      {
        question: "What size are the perfumes?",
        answer:
          "Every DOM126 fragrance is presented in a generous 100ml bottle — made to be worn, not rationed.",
      },
      {
        question: "How much do the fragrances cost?",
        answer:
          "Each fragrance in the collection — Boss Man, Ephata and Sweet Savour — is ₦54,000 for 100ml. The Custom-Made Signature Perfume is ₦98,000 for 100ml.",
      },
      {
        question: "What fragrances are currently available?",
        answer:
          "The current DOM126 collection is Boss Man, Ephata and Sweet Savour. You can also request a Custom-Made Signature Perfume created specifically for you.",
      },
    ],
  },
  {
    title: "The Custom Signature Perfume",
    items: [
      {
        question: "Can I request a custom-made perfume?",
        answer:
          "Yes. The Custom-Made Signature Perfume is a bespoke fragrance experience — a perfume created specifically for one individual, on request. It is presented in 100ml for ₦98,000.",
      },
      {
        question: "How does the Custom Signature Perfume work?",
        answer:
          "You begin with a request — telling DOM126 about yourself, your style and the occasions you dress for. From there, the DOM126 team works with you personally to create your signature scent. The details of the process are shared with you during your request.",
      },
    ],
  },
  {
    title: "Ordering & Delivery",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "Add your fragrance to your bag and proceed to checkout. Once you place your order, a member of the DOM126 team will contact you to confirm it and arrange payment and delivery. WhatsApp ordering is also on the way.",
      },
      {
        question: "Do you deliver within Nigeria?",
        answer:
          "Yes — DOM126 serves customers across Nigeria. Delivery arrangements and fees are confirmed with you when your order is confirmed.",
      },
      {
        question: "Do you deliver outside Nigeria?",
        answer:
          "Not yet at checkout. DOM126 is a Nigerian brand preparing to serve the wider African market — contact us about international orders and we will advise you.",
      },
      {
        question: "Which payment methods do you accept?",
        answer:
          "Payment is arranged with you personally when your order is confirmed. Secure online payment is coming soon to the website.",
      },
    ],
  },
  {
    title: "Gifting & Contact",
    items: [
      {
        question: "Can I buy a perfume as a gift?",
        answer:
          "Absolutely — a fragrance is one of the most memorable gifts you can give. You can order on behalf of someone else and include a gift note at checkout.",
      },
      {
        question: "How can I contact DOM126?",
        answer:
          "Use the contact page to send a message, or submit a Custom Signature request — a member of the team will get back to you. WhatsApp and social channels are coming soon.",
      },
    ],
  },
];
