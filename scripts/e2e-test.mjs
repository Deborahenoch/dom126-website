/**
 * DOM126 Fragrances — end-to-end QA suite.
 *
 * Runs against a local server (default http://localhost:3000) using Playwright
 * and a Chromium binary (set CHROMIUM_PATH, defaults to /tmp/chromium).
 *
 * Usage:
 *   npm install --no-save playwright   # if not already installed
 *   node scripts/e2e-test.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const EXECUTABLE = process.env.CHROMIUM_PATH || "/tmp/chromium";

const ROUTES = [
  "/",
  "/shop",
  "/shop?category=fragrance",
  "/product/boss-man",
  "/product/ephata",
  "/product/sweet-savour",
  "/product/custom-signature",
  "/custom-signature",
  "/about",
  "/faq",
  "/contact",
  "/cart",
  "/checkout",
  "/shipping",
  "/privacy",
  "/terms",
];

let passed = 0;
let failed = 0;
const failures = [];

function ok(name) {
  passed++;
  console.log(`  ✓ ${name}`);
}

function fail(name, detail = "") {
  failed++;
  failures.push(`${name} ${detail}`);
  console.log(`  ✗ ${name} ${detail}`);
}

async function assert(condition, name, detail = "") {
  if (condition) ok(name);
  else fail(name, detail);
}

const browser = await chromium.launch({
  executablePath: EXECUTABLE,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
});

const consoleErrors = [];

async function newPage(viewport, isMobile = false) {
  const context = await browser.newContext({
    viewport,
    isMobile,
    hasTouch: isMobile,
  });
  const page = await context.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(`${page.url()}: ${m.text()}`);
  });
  page.on("pageerror", (e) => consoleErrors.push(`${page.url()}: PAGEERROR ${e}`));
  return { context, page };
}

/* ============================================================
   1. PAGE LOADS — desktop: console errors, overflow, broken images
   ============================================================ */
console.log("\n[1] Desktop page loads");
{
  const { context, page } = await newPage({ width: 1440, height: 900 });
  for (const route of ROUTES) {
    const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
    await assert(res.status() === 200, `200 ${route}`, `got ${res.status()}`);
    await page.waitForTimeout(150);
    const overflow = await page.evaluate(() => {
      const el = document.scrollingElement;
      return el.scrollWidth - el.clientWidth;
    });
    await assert(overflow <= 0, `no horizontal overflow ${route}`, `overflow ${overflow}px`);
    const brokenImgs = await page.evaluate(() =>
      [...document.querySelectorAll("img")].filter((i) => i.complete && i.naturalWidth === 0).length
    );
    await assert(brokenImgs === 0, `no broken images ${route}`, `${brokenImgs} broken`);
  }
  // Placeholder product plates are visible (since real photos are not yet supplied)
  await page.goto(BASE + "/shop", { waitUntil: "networkidle" });
  const placeholders = await page.locator('[role="img"]').count();
  await assert(placeholders >= 4, "product placeholder plates render", `${placeholders} found`);
  await context.close();
}

/* ============================================================
   2. MOBILE — overflow + menu + hero
   ============================================================ */
console.log("\n[2] Mobile (iPhone-class viewport)");
{
  const { context, page } = await newPage({ width: 390, height: 844 }, true);
  for (const route of ["/", "/shop", "/product/boss-man", "/checkout"]) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(120);
    const overflow = await page.evaluate(() => {
      const el = document.scrollingElement;
      return el.scrollWidth - el.clientWidth;
    });
    await assert(overflow <= 0, `no horizontal overflow (mobile) ${route}`, `overflow ${overflow}px`);
  }

  // mobile menu
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForTimeout(500);
  const menuVisible = await page.locator("#mobile-menu").evaluate((el) => getComputedStyle(el).visibility === "visible");
  await assert(menuVisible, "mobile menu opens");
  await page.getByRole("link", { name: "Custom Signature" }).first().click();
  await page.waitForURL("**/custom-signature");
  ok("mobile menu navigates to /custom-signature");

  // hero CTAs present and tappable size
  const ctaBox = await page.getByRole("link", { name: "SHOP OUR FRAGRANCES" }).boundingBox();
  await assert(ctaBox && ctaBox.height >= 40, "hero CTA touch target ≥ 40px", ctaBox ? `${ctaBox.height}px` : "missing");
  await context.close();
}

/* ============================================================
   3. SEARCH DIALOG
   ============================================================ */
console.log("\n[3] Search dialog");
{
  const { context, page } = await newPage({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Search products" }).click();
  await page.waitForTimeout(400);
  await assert(await page.getByRole("dialog", { name: "Search products" }).isVisible(), "search dialog opens");
  await page.getByLabel("Search fragrances").fill("ephata");
  await page.waitForTimeout(250);
  const resultCount = await page.locator('[class*="result"]').count();
  await assert(resultCount > 0, "search 'ephata' returns results");
  await page.getByRole("link", { name: /Ephata/ }).first().click();
  await page.waitForURL("**/product/ephata");
  ok("search result navigates to product page");
  await context.close();
}

/* ============================================================
   4. FAQ ACCORDION
   ============================================================ */
console.log("\n[4] FAQ accordion");
{
  const { context, page } = await newPage({ width: 1440, height: 900 });
  await page.goto(BASE + "/faq", { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: "How do I place an order?" });
  await assert(await trigger.isVisible(), "FAQ question present");
  await trigger.click();
  await page.waitForTimeout(500);
  const expanded = await trigger.getAttribute("aria-expanded");
  await assert(expanded === "true", "accordion expands (aria-expanded)");
  await context.close();
}

/* ============================================================
   5. FULL PURCHASE FLOW
   ============================================================ */
console.log("\n[5] Purchase flow: product → add to bag → qty → checkout → order");
{
  const { context, page } = await newPage({ width: 1440, height: 900 });

  // Product page content
  await page.goto(BASE + "/product/boss-man", { waitUntil: "networkidle" });
  await assert(await page.getByRole("heading", { name: "Boss Man" }).isVisible(), "product name shown");
  const priceText = await page.locator("h1 ~ *, [class*='price']").filter({ hasText: "54,000" }).first().isVisible();
  await assert(priceText, "₦54,000 price shown");
  await assert((await page.getByText("100ml").count()) > 0, "100ml size shown");

  // Add to bag (qty 2)
  await page.getByRole("button", { name: "Increase quantity of Boss Man" }).click();
  await page.getByRole("button", { name: "Add Boss Man to bag" }).click();
  await page.waitForTimeout(600);
  await assert(await page.getByRole("dialog", { name: "Shopping bag" }).isVisible(), "cart drawer opens on add");
  await assert(await page.getByText("108,000").first().isVisible(), "drawer subtotal ₦108,000 for qty 2");

  // Change quantity inside drawer to 1
  await page.getByRole("dialog", { name: "Shopping bag" }).getByRole("button", { name: "Decrease quantity of Boss Man" }).click();
  await page.waitForTimeout(300);
  await assert(await page.getByText("54,000").first().isVisible(), "drawer subtotal updates to ₦54,000");

  // Add a second product: close drawer, visit Ephata, add to bag
  await page.getByRole("button", { name: "Close bag" }).click();
  await page.waitForTimeout(400);
  await page.goto(BASE + "/product/ephata", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Add Ephata to bag" }).click();
  await page.waitForTimeout(500);
  await assert(await page.getByText("108,000").first().isVisible(), "two products subtotal ₦108,000");

  // Remove Ephata via trash button
  await page.getByRole("button", { name: "Remove Ephata from bag" }).click();
  await page.waitForTimeout(300);
  await assert(await page.getByText("54,000").first().isVisible(), "subtotal back to ₦54,000 after remove");

  // Proceed to checkout
  await page.getByRole("link", { name: "Proceed to Checkout" }).click();
  await page.waitForURL("**/checkout");

  // Empty-field validation
  await page.getByRole("button", { name: "Place Order" }).click();
  await page.waitForTimeout(400);
  await assert((await page.locator(".field-error").count()) > 0, "validation errors shown on empty submit");

  // Fill the form
  await page.fill("#co-name", "Adaeze Okafor");
  await page.fill("#co-email", "adaeze@example.com");
  await page.fill("#co-phone", "0803 555 0182");
  await page.fill("#co-address", "12 Adeola Odeku Street, Victoria Island");
  await page.fill("#co-city", "Lagos");
  await page.selectOption("#co-state", "Lagos");
  await page.getByLabel(/This is a gift/).click();
  await page.fill("#co-giftnote", "Happy birthday — wear it well.");
  await page.getByRole("button", { name: "Place Order" }).click();

  // Confirmation
  await page.waitForURL("**/checkout/confirmation**", { timeout: 10000 });
  await page.getByRole("heading", { name: "Order request received" }).waitFor({ timeout: 10000 });
  ok("confirmation page shown");
  const refText = await page.locator("[class*='ref']").first().innerText();
  await assert(/DOM-/.test(refText), "order reference generated", refText);
  await assert(await page.getByText("54,000").first().isVisible(), "order subtotal shown on confirmation");
  await assert(await page.getByText("Adaeze Okafor").first().isVisible(), "customer name on confirmation");
  await assert(await page.getByText("Happy birthday").first().isVisible(), "gift note preserved");
  await assert(await page.getByRole("link", { name: "Send order via WhatsApp" }).isVisible(), "WhatsApp order button on confirmation");

  // Cart now empty
  await page.goto(BASE + "/cart", { waitUntil: "networkidle" });
  await page.locator("main").getByRole("heading", { name: "Your bag is empty" }).waitFor({ timeout: 8000 });
  ok("cart cleared after order");

  // Cart persists across reload when not ordered
  await page.goto(BASE + "/product/sweet-savour", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Add Sweet Savour to bag" }).click();
  await page.waitForTimeout(400);
  await page.goto(BASE + "/cart", { waitUntil: "networkidle" });
  await assert(await page.getByText("Sweet Savour").first().isVisible(), "cart persists across navigation");
  await context.close();
}

/* ============================================================
   6. CUSTOM SIGNATURE REQUEST
   ============================================================ */
console.log("\n[6] Custom signature request form");
{
  const { context, page } = await newPage({ width: 1440, height: 900 });
  await page.goto(BASE + "/custom-signature", { waitUntil: "networkidle" });
  await assert(await page.getByRole("heading", { name: /Your scent/i }).isVisible(), "signature headline present");
  await assert(await page.getByText("98,000").first().isVisible(), "₦98,000 price shown");

  await page.locator("#custom-signature-name").scrollIntoViewIfNeeded();
  await page.fill("#custom-signature-name", "Tunde Bakare");
  await page.fill("#custom-signature-email", "tunde@example.com");
  await page.fill("#custom-signature-phone", "0805 555 0199");
  await page.selectOption("#custom-signature-personality", "Bold & confident");
  await page.selectOption("#custom-signature-occasion", "Everyday signature");
  await page.getByRole("button", { name: "Request Your Signature Perfume" }).click();
  await page.waitForTimeout(500);
  await assert(await page.getByText("Your request has been received").isVisible(), "request confirmation shown");
  await assert(/DOM-SIG/.test(await page.locator("[class*='confirmRef']").innerText()), "DOM-SIG reference generated");
  await context.close();
}

/* ============================================================
   7. WHATSAPP ORDERING (LIVE) & PAYMENT HONESTY
   ============================================================ */
console.log("\n[7] WhatsApp ordering (official number) & payment honesty");
{
  const { context, page } = await newPage({ width: 1440, height: 900 });

  // Product page: WhatsApp order button with the official number
  await page.goto(BASE + "/product/boss-man", { waitUntil: "networkidle" });
  const waBtn = page.getByRole("link", { name: "Order via WhatsApp" });
  await assert(await waBtn.isVisible(), "product page shows WhatsApp order button");
  const href = await waBtn.getAttribute("href");
  await assert(href.startsWith("https://wa.me/2349129168474"), "WhatsApp link uses official +234 number", href);

  // Cart drawer: WhatsApp ordering option
  await page.getByRole("button", { name: "Add Boss Man to bag" }).click();
  await page.waitForTimeout(500);
  await assert(await page.getByRole("link", { name: "Or order via WhatsApp" }).isVisible(), "cart drawer offers WhatsApp ordering");
  await page.getByRole("button", { name: "Close bag" }).click();
  await page.waitForTimeout(400);

  // Checkout payment section: online payment honestly disabled
  await page.goto(BASE + "/checkout", { waitUntil: "networkidle" });
  const onlinePay = page.locator("#pay-online");
  await assert(await onlinePay.isDisabled(), "online payment option disabled until integrated");
  await assert(await page.getByText("Coming soon", { exact: true }).isVisible(), "online payment honestly marked coming soon");

  // Contact page: WhatsApp channel live
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  await assert(await page.getByRole("link", { name: "Message DOM126" }).isVisible(), "contact page shows WhatsApp button");

  const home = await (await page.request.get(BASE + "/")).text();
  await assert(home.includes("DOM126"), "homepage renders DOM126 content");
  await context.close();
}

/* ============================================================
   8. SEO / a11y spot checks
   ============================================================ */
console.log("\n[8] SEO & accessibility spot checks");
{
  const { context, page } = await newPage({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const title = await page.title();
  await assert(title.includes("DOM126"), "homepage title", title);
  const h1Count = await page.locator("h1").count();
  await assert(h1Count === 1, "exactly one h1 on homepage", `${h1Count} h1s`);
  const html = await page.content();
  await assert(html.includes('application/ld+json'), "structured data present");
  await assert(html.includes('Skip to content'), "skip link present");

  await page.goto(BASE + "/product/boss-man", { waitUntil: "networkidle" });
  const productTitle = await page.title();
  await assert(productTitle.includes("Boss Man"), "product page title", productTitle);
  const imgs = await page.locator("img[alt='']").count();
  await assert(imgs === 0, "no empty alt attributes", `${imgs} empty`);
  await context.close();
}

/* ============================================================
   9. CONSOLE ERRORS
   ============================================================ */
console.log("\n[9] Console errors across all tests");
if (consoleErrors.length === 0) {
  ok("zero browser console errors");
} else {
  const unique = [...new Set(consoleErrors)];
  for (const e of unique.slice(0, 10)) console.log(`    • ${e}`);
  fail(`${unique.length} unique console errors`, "(see above)");
}

await browser.close();

console.log(`\n══════════════════════════════════════`);
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.log("FAILURES:");
  failures.forEach((f) => console.log(`  - ${f}`));
  process.exit(1);
}
