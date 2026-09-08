# DOM126 Fragrances — Official E-Commerce Website

**SMELL GOOD. BE REMEMBERED.**

The production foundation for the official DOM126 e-commerce website — a premium,
mobile-first shopping experience for the Nigerian fragrance house, built to grow
into a complete online store (payments, WhatsApp ordering, accounts, and more).

---

## Quick start

```bash
npm install
npm run dev        # develop at http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

Requirements: Node.js ≥ 18.18.

---

## What's inside

| Area | Status |
| --- | --- |
| Homepage (hero, story, experience, collection, benefits, how-it-works, final CTA) | ✅ Live |
| Shop with category filtering + product search | ✅ Live |
| Individual product pages (SSG, SEO, structured data) | ✅ Live |
| Custom Signature experience + request form | ✅ Live |
| Shopping cart (drawer + page, persistent, quantity controls) | ✅ Live & tested |
| Checkout (customer + delivery + gift notes, validation, order references) | ✅ Live & tested |
| Order confirmation with reference lookup | ✅ Live |
| FAQ accordion (+ FAQ structured data) | ✅ Live |
| Contact, About, Shipping, Privacy, Terms | ✅ Live (policies marked as drafts) |
| Online payment (Paystack or similar) | 🔜 Integration point ready |
| WhatsApp ordering | 🔜 One env variable away |
| Analytics (GA4 / Meta Pixel) | 🔜 Env-configured, off by default |

**Stack:** Next.js 15 (App Router, TypeScript, static generation) · self-hosted
fonts (Cormorant Garamond + Manrope, OFL) · hand-crafted CSS design system (no
CSS framework) · zero runtime dependencies beyond React/Next.

---

## Using real DOM126 photography (important)

Until official photography is supplied, products render an elegant branded
placeholder plate. **To add a real photo, simply drop the file at the exact
path — no code changes, just rebuild:**

| Product | Path |
| --- | --- |
| Boss Man | `public/images/products/boss-man.jpg` |
| Ephata | `public/images/products/ephata.jpg` |
| Sweet Savour | `public/images/products/sweet-savour.jpg` |
| Custom Signature | `public/images/products/custom-signature.jpg` |
| Gallery shots | `boss-man-2.jpg`, `boss-man-3.jpg`, … then list them in the product's `gallery` array |

- Recommended: JPG, roughly 1200×1500 (4:5 portrait), well-lit, sRGB.
- The build's image manifest (`npm run build` regenerates it automatically)
  detects new files and switches the site to the real photograph.
- **Logo:** the site currently uses a typographic wordmark in the brand palette
  (deep navy + gold). To use the official logo file, drop it at
  `public/brand/logo.svg` (or `.png`) and reference it inside
  `src/components/brand/Logo.tsx`.
- Brand textures used for cinematic sections live in `public/images/brand/` and
  can be replaced with real brand photography the same way.

## Managing the catalogue (add a 5th, 6th, 10th fragrance)

All product data lives in **one file**: [`src/lib/products.ts`](src/lib/products.ts).

Copy a fragrance object, update name/price/description, drop the photo in
`public/images/products/`, and rebuild. The shop, product page, search, cart,
checkout, sitemap and structured data all update automatically.

**Content rules baked into the code:** fragrance notes are never invented — the
`notes` field is reserved and only renders when the brand supplies it. The same
discipline applies to policies, reviews (a clearly-labelled placeholder until
real reviews exist) and delivery details.

## Site configuration

- **Brand-level values** (name, tagline, socials): `src/lib/site-config.ts`
- **FAQ content:** `src/lib/faq.ts`
- **Environment variables:** copy `.env.example` → `.env.local`

```bash
NEXT_PUBLIC_SITE_URL=""            # canonical URL, e.g. https://dom126.com
NEXT_PUBLIC_WHATSAPP_NUMBER=""     # international format, digits only — enables WhatsApp ordering everywhere
NEXT_PUBLIC_CONTACT_EMAIL=""       # shown on the contact page
NEXT_PUBLIC_GA_ID=""               # enables Google Analytics 4 when set
NEXT_PUBLIC_META_PIXEL_ID=""       # enables Meta Pixel when set
```

Until `NEXT_PUBLIC_WHATSAPP_NUMBER` is set, every WhatsApp surface shows an
honest "coming soon" state — no invented numbers. Never commit real secrets.

## How ordering works today (and the payment integration point)

Today the site is backend-free by design: a customer places an **order request**
(contact + delivery details validated, order reference generated, stored on
their device, shown on a confirmation page). Payment is honestly presented as
"arranged with our team when your order is confirmed", with online payment
labelled *coming soon*.

**To integrate Paystack (or any provider) later:**
1. Create an API route (e.g. `src/app/api/orders/route.ts`) that receives the
   order payload — `src/lib/orders.ts` already defines the exact data shapes.
2. Initialise the provider's transaction and redirect to their checkout.
3. Verify via webhook, then mark the order confirmed.
The checkout UI (`src/components/checkout/CheckoutView.tsx`) is structured so
only the payment step changes.

## Testing & quality

```bash
npm run lint           # ESLint (next/core-web-vitals + typescript)
npm run typecheck      # TypeScript, strict
node scripts/e2e-test.mjs       # 91-check browser E2E suite (needs playwright + chromium)
node scripts/design-audit.mjs   # WCAG contrast + layout geometry audit + screenshots
```

The E2E suite covers the full purchase journey (add → quantity → remove →
checkout validation → order → confirmation), cart persistence, search, the FAQ
accordion, the mobile menu, mobile overflow, console errors and SEO basics.
The design audit verifies WCAG AA contrast for every text element and layout
geometry (grid columns, sticky header, touch targets).

*(QA tooling expects a local prod server on :3000 and a Chromium binary at
`/tmp/chromium`; install with `npm i --no-save playwright` if needed.)*

## Project structure

```
src/
  app/                  # routes (home, shop, product/[slug], custom-signature,
                        # cart, checkout(+confirmation), about, faq, contact,
                        # shipping, privacy, terms, sitemap, robots)
  components/
    brand/              # Logo
    cart/               # CartProvider (state + persistence), drawer, steppers
    checkout/           # Checkout + confirmation views
    forms/              # InquiryForm (contact + signature requests)
    home/               # Homepage sections
    layout/             # Header (sticky/shrink/mobile menu/search), Footer, Analytics
    legal/              # Policy page layout
    product/            # Cards, gallery w/ placeholder fallback, buy box
    ui/                 # Buttons, accordion, breadcrumbs, reveal, price…
  lib/                  # products, site-config, faq, orders, whatsapp, fonts
scripts/                # build tooling + QA suites
public/images/          # drop real photography here (see table above)
```

## Deployment

Deploys cleanly to Vercel (or any Node host): set the environment variables
above, point the domain at the deployment, and `NEXT_PUBLIC_SITE_URL` makes all
canonical URLs, Open Graph tags and the sitemap production-ready.

---

© DOM126 Fragrances. Smell Good. Be Remembered.
