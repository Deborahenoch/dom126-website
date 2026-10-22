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
| WhatsApp ordering (official number: +234 912 916 8474) | ✅ Live — product pages, cart drawer & order confirmation |
| FAQ accordion (+ FAQ structured data) | ✅ Live |
| Contact, About, Shipping, Privacy, Terms | ✅ Live (policies marked as drafts) |
| **Perfumery Atlas** (internal reference + Formula Vault) | ✅ Live — `/atlas` |
| Online payment (Paystack or similar) | 🔜 Integration point ready |
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

## Perfumery Atlas (`/atlas`) — internal reference and formula vault

A private working reference for building fragrance from raw materials. It is
not a shop surface: nothing in it is for sale, and it is deliberately kept out
of marketing navigation.

| Route | Contents |
| --- | --- |
| `/atlas` | Overview, sources, and a calibration table showing how much of each classic study is actually quantified |
| `/atlas/materials` | ~145 natural and synthetic materials, filterable by origin, volatility, odour field and regulatory flag |
| `/atlas/families` | SFP seven families, Edwards' wheel, Ellena's nine odour fields, Carles' triangle vs. the modern minimal structure, concentration classes, the dose ladder |
| `/atlas/accords` | 23 buildable accords in parts per thousand, with substitutions and provenance |
| `/atlas/classics` | 21 documented structural reconstructions of great perfumes in six families |
| `/atlas/gcms` | Reverse engineering by GC-MS: techniques, a 12-step workflow, 11 documented limits, 11 published case studies, bench protocol, legal note |
| `/atlas/vault` | **The app.** Store formulas on-device, scale to any batch, get gram weights and dilution advice, check allergens and compliance, compare a trial against a target, print the sheet |

### Where the data lives

All of it is in `src/lib/perfumery/` as typed TypeScript modules, with
`index.ts` as the single entry point:

```
src/lib/perfumery/
  types.ts        shared shapes (Material, Accord, Reconstruction, Formula…)
  materials.ts    the raw-materials reference
  families.ts     classification systems + structural theory
  accords.ts      buildable starting formulas
  classics.ts     documented study reconstructions
  gcms.ts         reverse-engineering playbook + literature comparison
  formula.ts      the vault engine — pure calculation, no storage, no React
```

`formula.ts` is deliberately storage-agnostic and side-effect-free so the same
maths can be reused in a future API route. Persistence lives entirely in
`src/components/atlas/VaultProvider.tsx`, which follows the same `localStorage`
pattern as the cart.

### Formula Vault storage model

Formulas are stored in the visitor's own browser (`dom126_formula_vault_v1`)
and nowhere else — no account, no server. That is deliberate: a formula is the
most commercially sensitive document a fragrance house owns. The trade-off is
that formulas do not follow you between devices, which is what the JSON
export/import is for.

**To move to shared storage later:** add `src/app/api/formulas/route.ts` and
`src/app/api/formulas/[id]/route.ts`, then swap the persistence functions in
`VaultProvider.tsx` for fetch calls. Nothing else changes — no calculation code
moves, because `formula.ts` never touches storage.

### Content rules baked into the Atlas data

These are enforced in the data files themselves and documented in the header of
each one:

1. **No trade formula appears anywhere.** Formulas are confidential and are not
   published. Nothing here claims otherwise.
2. **Percentages on named commercial perfumes come from one published study** —
   Calkin & Jellinek, *Perfumery: Practice and Principles* (Wiley, 1994), ch. 12
   — which states its own figures are "only guidelines to the main structure",
   not complete formulas. Every entry carries its source and a
   `quantifiedCoverage` field recording how much of the formula the source
   actually puts numbers on. Where the source names a material without
   quantifying it, **no number has been invented**.
3. **Accord proportions are labelled as ours.** The source books deliberately
   publish accords as material lists without quantities; the parts-per-thousand
   figures are conventional starting points assembled for this Atlas and marked
   as such in each `provenance` field.
4. **CAS numbers are omitted rather than guessed.**
5. **Regulatory flags are a study aid, never a compliance check.** They
   summarise IFRA Standards and EU Regulation 1223/2009 as amended by
   Regulation (EU) 2023/1545. The vault shows a standing disclaimer to that
   effect, and flags materials that are prohibited outright (Lyral, Lilial,
   nitro musks) as blocking rather than merely cautionary.
6. **No therapeutic or aromatherapy claims** anywhere in the data.

### Verifying the Atlas

```bash
npm run typecheck && npm run lint && npm run build
```

The calculation engine is covered by a standalone sanity script that checks
referential integrity (every accord component and reconstruction line resolves
to a real material), batch and dilution maths, allergen scaling, formula
comparison reflexivity, compliance blocking, the dose ladder, and the text
import/export round-trip.

---

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
                        # shipping, privacy, terms, sitemap, robots,
                        # manifest.webmanifest, favicon/apple icons)
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
  lib/                  # products, site-config, seo (shared metadata), faq,
                        # orders, whatsapp, fonts
                        # perfumery/ — Atlas reference data + formula vault engine
scripts/                # build tooling + QA suites
public/images/          # drop real photography here (see table above)
```

## Deployment

Deploys cleanly to Vercel (or any Node host): set the environment variables
above, point the domain at the deployment, and `NEXT_PUBLIC_SITE_URL` makes all
canonical URLs, Open Graph tags and the sitemap production-ready.

Step-by-step instructions — Vercel import, the `dom126fragrance.store` domain and
the Hostinger DNS records — are in **[DEPLOYMENT.md](DEPLOYMENT.md)**.

---

© DOM126 Fragrances. Smell Good. Be Remembered.
