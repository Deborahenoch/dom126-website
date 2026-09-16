# Deploying DOM126 Fragrances

The website is a Next.js 15 app with no database and no server-side secrets, so
it deploys to Vercel as-is. This guide covers the two things that matter:
**importing the repository** and **pointing `dom126fragrance.store` at it**.

---

## 1. Import the repository into Vercel

1. Sign in at [vercel.com](https://vercel.com) (GitHub account recommended).
2. **Add New… → Project**.
3. **Import Git Repository** → choose `Deborahenoch/dom126-website` (authorise
   Vercel to read the repository the first time).
4. Configure the project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** repository root (leave as-is)
   - **Build Command:** `npm run build` (default)
   - **Install Command:** `npm install` (default)
   - **Output Directory:** leave empty (Next.js default)
5. **Environment Variables** — optional overrides (the live values are already
   in `src/lib/site-config.ts`, so the site is correct without them):

   | Name | Value | Purpose |
   | --- | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://dom126fragrance.store` | Canonical URLs, Open Graph, sitemap |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | `2349129168474` | WhatsApp ordering link |
   | `NEXT_PUBLIC_CONTACT_EMAIL` | *(leave empty until confirmed)* | Shown on Contact page |
   | `NEXT_PUBLIC_GA_ID` | *(empty = analytics off)* | Google Analytics 4 |
   | `NEXT_PUBLIC_META_PIXEL_ID` | *(empty = pixel off)* | Meta Pixel |

   Set them for **Production, Preview and Development** if you add any.
6. **Deploy**. The first build takes a couple of minutes; the project then gets a
   `*.vercel.app` address.

Every push to `main` afterwards redeploys production automatically; pull requests
get their own preview URL.

---

## 2. Add the domain in Vercel

1. Open the project → **Settings → Domains**.
2. Add `dom126fragrance.store` → **Add**.
3. Add `www.dom126fragrance.store` as well and choose **Redirect to
   dom126fragrance.store** (single canonical host — matches the site's
   `alternates.canonical`).
4. Vercel shows the DNS records to create (same values as the table below).

### Canonical host — pick one and match the code

The site emits canonical URLs (`siteConfig.url`, `alternates.canonical`, sitemap,
JSON-LD) on the **apex** host, `https://dom126fragrance.store`. A domain that
redirects to the other host therefore contradicts the canonical tag. Keep both
in sync:

| Preferred host | What to do |
| --- | --- |
| `dom126fragrance.store` (current code default) | In **Settings → Domains**, open the apex domain and set it as **Primary** — Vercel then redirects `www` → apex. |
| `www.dom126fragrance.store` | Keep `www` primary, and set `NEXT_PUBLIC_SITE_URL="https://www.dom126fragrance.store"` in **Settings → Environment Variables**, then redeploy. |

> As deployed, `www` is currently the primary domain (apex 301s to `www`), so set
> the apex to primary **or** set `NEXT_PUBLIC_SITE_URL` to the `www` host.

---

## 3. DNS records at Hostinger

Log in to Hostinger → **Domains → dom126fragrance.store → DNS / Nameservers →
DNS zone editor**, then add (or edit) these records:

| Type | Name / Host | Value / Points to | TTL |
| --- | --- | --- | --- |
| `A` | `@` | `76.76.21.21` | `3600` (or default) |
| `CNAME` | `www` | `cname.vercel-dns.com` | `3600` (or default) |

Notes:

- **Remove conflicting records.** An existing `A`/`AAAA` record on `@` pointing
  at Hostinger's parking page, or a `CNAME` on `www` pointing at the old host,
  must be deleted or replaced — otherwise the domain keeps resolving elsewhere.
- Keep the nameservers as Hostinger's (`ns1.dns-parking.com` /
  `ns2.dns-parking.com`) — only the records inside the zone change when you use
  the DNS editor. (Alternatively you can point the whole zone at Vercel with
  `ns1.vercel-dns.com` / `ns2.vercel-dns.com`; not required.)
- Do **not** keep a `CNAME` on `@` — apex domains use the `A` record above.
- Vercel's per-project records can differ; if the dashboard shows a
  project-specific value, use the dashboard's value.

DNS usually propagates within minutes (allow up to 24–48 hours worst case).
SSL/HTTPS is issued automatically by Vercel once the domain resolves; nothing
needs to be configured.

---

## 4. Verify the deployment

```bash
curl -I https://dom126fragrance.store                 # 200 + x-content-type-options: nosniff
curl -s https://dom126fragrance.store/robots.txt      # allow all + sitemap line
curl -s https://dom126fragrance.store/sitemap.xml     # 15 URLs (no /cart, /checkout)
curl -I https://dom126fragrance.store/favicon.ico     # 200
curl -I https://dom126fragrance.store/manifest.webmanifest
```

Then:

1. Open `https://dom126fragrance.store` in a private window and place a test
   order through to the confirmation page.
2. Check the WhatsApp order button opens a chat with **+234 912 916 8474**.
3. Submit `https://dom126fragrance.store/sitemap.xml` in **Google Search
   Console** (add the domain property) so indexing starts immediately.
4. Share the homepage link in a WhatsApp chat to confirm the Open Graph preview
   image renders.

---

## 5. Going live checklist

- [ ] Vercel project imported and building green
- [ ] `dom126fragrance.store` added in Vercel and verified (green tick)
- [ ] `www` redirecting to the apex domain
- [ ] Hostinger DNS: `A @ 76.76.21.21`, `CNAME www cname.vercel-dns.com`
- [ ] Real product photography dropped into `public/images/products/` (see README)
- [ ] Sitemap submitted to Google Search Console
- [ ] Analytics IDs added to Vercel env when they exist, then redeploy

---

© DOM126 Fragrances. Smell Good. Be Remembered.
