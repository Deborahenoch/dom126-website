/**
 * DOM126 design & accessibility audit.
 * - WCAG contrast audit of all visible text (programmatic, per element)
 * - Layout geometry checks (grids, hero, header shrink, touch targets)
 * - Screenshots for the record (shots/)
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const EXECUTABLE = process.env.CHROMIUM_PATH || "/tmp/chromium";
mkdirSync("shots", { recursive: true });

const browser = await chromium.launch({
  executablePath: EXECUTABLE,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
});

let issues = 0;
function logIssue(msg) {
  issues++;
  console.log(`  ⚠ ${msg}`);
}
function logOk(msg) {
  console.log(`  ✓ ${msg}`);
}

/* ---------- WCAG relative luminance & contrast ---------- */
function luminance({ r, g, b }) {
  const f = (v) => {
    v /= 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(fg, bg) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (a + 0.05) / (b + 0.05);
}

async function auditContrast(page) {
  const results = await page.evaluate(() => {
    function parse(s) {
      const m = s.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
      if (!m) return null;
      return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
    }
    const out = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set();
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = node.textContent.trim();
      if (!text) continue;
      const el = node.parentElement;
      if (!el || seen.has(el)) continue;
      seen.add(el);
      if (el.closest("script,style,noscript")) continue;
      if (el.closest('[aria-hidden="true"]')) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      const rects = range.getClientRects();
      if (rects.length === 0) continue;
      const style = getComputedStyle(el);
      if (style.visibility === "hidden" || style.display === "none") continue;
      // find effective background
      let bg = null;
      let cursor = el;
      while (cursor && cursor !== document.documentElement) {
        const c = parse(getComputedStyle(cursor).backgroundColor);
        if (c && c.a > 0.85) { bg = c; break; }
        if (c && c.a > 0) { bg = c; break; }
        cursor = cursor.parentElement;
      }
      if (!bg) {
        // fall back: body background color or known section colors
        const bodyBg = parse(getComputedStyle(document.body).backgroundColor);
        bg = bodyBg && bodyBg.a > 0 ? bodyBg : { r: 247, g: 244, b: 237, a: 1 };
      }
      const fg = parse(style.color);
      if (!fg) continue;
      const fontSize = parseFloat(style.fontSize);
      const fontWeight = parseInt(style.fontWeight) || 400;
      const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
      out.push({
        text: text.slice(0, 40),
        tag: el.tagName,
        cls: String(el.className).slice(0, 50),
        fontSize,
        isLarge,
        fg,
        bg,
      });
    }
    return out;
  });

  const flagged = [];
  for (const item of results) {
    const ratio = contrast(item.fg, item.bg);
    const need = item.isLarge ? 3 : 4.5;
    if (ratio < need - 0.05) {
      flagged.push({ ...item, ratio: ratio.toFixed(2), need });
    }
  }
  return flagged;
}

/* ---------- run audits ---------- */
const PAGES = ["/", "/shop", "/product/boss-man", "/custom-signature", "/faq", "/contact", "/cart", "/checkout", "/about", "/shipping"];

console.log("[Contrast audit]");
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const uniqueIssues = new Map();
  for (const route of PAGES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(200);
    const flagged = await auditContrast(page);
    for (const f of flagged) {
      const key = `${f.cls}|${f.ratio}`;
      if (!uniqueIssues.has(key)) uniqueIssues.set(key, f);
    }
  }
  if (uniqueIssues.size === 0) logOk("all text meets WCAG AA contrast");
  else {
    for (const f of uniqueIssues.values()) {
      logIssue(`contrast ${f.ratio}:1 (need ${f.need}) — ${f.tag}.${f.cls} "${f.text}" ${f.fontSize}px`);
    }
  }
  await ctx.close();
}

console.log("\n[Layout geometry]");
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  // Home hero
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const h1 = await page.locator("h1 span").first().evaluate((el) => {
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { font: s.fontSize, family: s.fontFamily.slice(0, 30), top: r.top, height: r.height };
  });
  if (parseFloat(h1.font) >= 44) logOk(`hero h1 ${h1.font} (${h1.family})`);
  else logIssue(`hero h1 too small: ${h1.font}`);
  if (h1.top >= 0 && h1.top < 900) logOk(`hero h1 above the fold (top ${Math.round(h1.top)}px)`);
  else logIssue("hero h1 off-fold");

  // Product grid columns
  await page.goto(BASE + "/shop", { waitUntil: "networkidle" });
  const gridCols = await page.evaluate(() => {
    const grid = document.querySelector('[class*="ShopGrid_grid"], [class*="grid"]');
    return grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").length : 0;
  });
  if (gridCols === 3) logOk("shop grid: 3 columns on desktop");
  else logIssue(`shop grid columns: ${gridCols}`);

  // Header shrink on scroll
  const padBefore = await page.evaluate(() => getComputedStyle(document.querySelector("header [class*='inner']")).paddingTop);
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(400);
  const padAfter = await page.evaluate(() => getComputedStyle(document.querySelector("header [class*='inner']")).paddingTop);
  if (parseFloat(padAfter) < parseFloat(padBefore)) logOk(`header shrinks on scroll (${padBefore} → ${padAfter})`);
  else logIssue(`header did not shrink (${padBefore} → ${padAfter})`);
  const headerTop = await page.evaluate(() => document.querySelector("header").getBoundingClientRect().top);
  if (headerTop === 0) logOk("header sticks to top");
  else logIssue(`header top ${headerTop}`);
  await page.evaluate(() => window.scrollTo(0, 0));

  // Touch targets (buttons/links in header & nav)
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const smallTargets = await page.evaluate(() => {
    const els = [...document.querySelectorAll("header button, header a")];
    return els
      .filter((el) => {
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return s.display !== "none" && s.visibility !== "hidden" && r.height > 0 && r.height < 24 && !el.className.includes("badge");
      })
      .map((el) => `${el.tagName}.${String(el.className).slice(0, 30)} ${el.getBoundingClientRect().height}px`);
  });
  if (smallTargets.length === 0) logOk("all header targets ≥ 24px (WCAG 2.5.8)");
  else logIssue(`small targets: ${smallTargets.join(", ")}`);

  // Footer watermark doesn't create overflow (already covered) & footer links
  const footerLinks = await page.evaluate(() =>
    [...document.querySelectorAll("footer a")].map((a) => a.getAttribute("href"))
  );
  const badLinks = footerLinks.filter((h) => !h || h === "#" || h.startsWith("javascript"));
  if (badLinks.length === 0) logOk(`footer: ${footerLinks.length} valid links, no placeholders`);
  else logIssue(`bad footer links: ${badLinks}`);

  // Serif/sans application
  const fonts = await page.evaluate(() => ({
    h2: getComputedStyle(document.querySelector("h2")).fontFamily,
    p: getComputedStyle(document.querySelector("main p")).fontFamily,
  }));
  if (fonts.h2.toLowerCase().includes("cormorant")) logOk("headings use the serif");
  else logIssue(`h2 font: ${fonts.h2}`);
  if (fonts.p.toLowerCase().includes("manrope")) logOk("body uses the sans");
  else logIssue(`p font: ${fonts.p}`);

  await ctx.close();
}

console.log("\n[Screenshots]");
{
  const shots = [
    { route: "/", name: "home-desktop", viewport: { width: 1440, height: 900 } },
    { route: "/shop", name: "shop-desktop", viewport: { width: 1440, height: 900 } },
    { route: "/product/boss-man", name: "product-desktop", viewport: { width: 1440, height: 900 } },
    { route: "/custom-signature", name: "signature-desktop", viewport: { width: 1440, height: 900 } },
    { route: "/checkout", name: "checkout-desktop", viewport: { width: 1440, height: 900 } },
    { route: "/", name: "home-mobile", viewport: { width: 390, height: 844 }, mobile: true },
    { route: "/shop", name: "shop-mobile", viewport: { width: 390, height: 844 }, mobile: true },
    { route: "/product/boss-man", name: "product-mobile", viewport: { width: 390, height: 844 }, mobile: true },
  ];
  for (const s of shots) {
    const ctx = await browser.newContext({ viewport: s.viewport, isMobile: !!s.mobile, hasTouch: !!s.mobile });
    const page = await ctx.newPage();
    await page.goto(BASE + s.route, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    await page.screenshot({ path: `shots/${s.name}.png`, fullPage: false });
    await page.screenshot({ path: `shots/${s.name}-full.png`, fullPage: true });
    await ctx.close();
    console.log(`  📸 shots/${s.name}.png (+ full page)`);
  }

  // cart drawer open (desktop)
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/product/boss-man", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Add Boss Man to bag" }).click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: "shots/cart-drawer.png" });
  console.log("  📸 shots/cart-drawer.png");
  await ctx.close();
}

await browser.close();
console.log(`\n${issues === 0 ? "AUDIT CLEAN — no issues" : `${issues} issue(s) to review`}`);
process.exit(issues === 0 ? 0 : 1);
