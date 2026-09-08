/**
 * Generates `src/lib/image-manifest.json` — the list of image files present
 * in `public/images`. The build uses it so that product photographs that have
 * not yet been supplied render as elegant placeholders WITHOUT a failed
 * network request (no console errors).
 *
 * Runs automatically before `dev` and `build` (see package.json pre-hooks).
 * After dropping real photography into public/images, simply rebuild.
 */
import { readdirSync, statSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const IMAGES_DIR = join(ROOT, "public", "images");
const OUT = join(ROOT, "src", "lib", "image-manifest.json");

const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg"]);

function walk(dir) {
  if (!existsSync(dir)) return [];
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else {
      const ext = entry.slice(entry.lastIndexOf(".")).toLowerCase();
      if (EXTENSIONS.has(ext)) files.push(full);
    }
  }
  return files;
}

const manifest = walk(IMAGES_DIR)
  .map((f) => "/" + relative(join(ROOT, "public"), f).split("\\").join("/"))
  .sort();

mkdirSync(join(ROOT, "src", "lib"), { recursive: true });
writeFileSync(OUT, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Image manifest: ${manifest.length} images → src/lib/image-manifest.json`);
