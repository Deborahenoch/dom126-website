/**
 * DOM126 Perfumery Atlas — formula vault engine.
 *
 * Pure functions only: no React, no storage, no side effects. Everything
 * here is deterministic and unit-tested by inspection, so the vault UI can
 * stay thin and the same maths can be reused in a future API route.
 *
 * UNITS CONVENTION
 *   A formula's `lines` carry relative `parts`. Whether the author thinks of
 *   them as grams, drops or percentages is recorded in `units` but does not
 *   change the maths: everything is normalised to a share of the total, then
 *   multiplied out to whatever batch size is requested. This is the same
 *   discipline Ellena describes — he formulates on a 1,000 g base so that
 *   proportions stay memorable — and it means a formula never has to be
 *   rewritten when you scale it.
 */

import {
  EU_LEAVE_ON_THRESHOLD_PERCENT,
  getMaterial,
  materials as ALL_MATERIALS,
} from "./materials";
import { concentrations, ellenaDoseScale } from "./families";
import type {
  Accord,
  AllergenHit,
  ExportBundle,
  ComplianceFlag,
  ComputedLine,
  ConcentrationClass,
  Formula,
  FormulaLine,
  FormulaTotals,
  Material,
  Reconstruction,
  Volatility,
} from "./types";

/* ------------------------------------------------------------------ */
/* IDs                                                                 */
/* ------------------------------------------------------------------ */

export function makeId(prefix: string): string {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}_${rand}`;
}

/* ------------------------------------------------------------------ */
/* Construction                                                        */
/* ------------------------------------------------------------------ */

export function emptyFormula(name = "Untitled"): Formula {
  const now = new Date().toISOString();
  return {
    id: makeId("fml"),
    name,
    brief: "",
    createdAt: now,
    updatedAt: now,
    version: 1,
    units: "parts",
    lines: [],
    tags: [],
    trials: [],
  };
}

/** Build a draft formula from an accord in `accords.ts`. */
export function formulaFromAccord(accord: Accord, name?: string): Formula {
  const f = emptyFormula(name ?? accord.name);
  f.brief = accord.summary;
  f.units = "parts";
  f.lines = accord.components
    .filter((c) => c.parts > 0 && getMaterial(c.materialId))
    .map((c) => ({
      id: makeId("ln"),
      materialId: c.materialId,
      parts: c.parts,
      note: c.role,
    }));
  f.derivedFrom = { kind: "accord", id: accord.id };
  return f;
}

/**
 * Build a draft formula from a classic reconstruction.
 *
 * Only lines the source actually quantifies become parts; everything else is
 * carried as an unquantified placeholder at 0 parts with a note, so the user
 * can see what is missing rather than being handed a falsely complete
 * formula. Percentages are converted to parts directly (1% = 10 parts on a
 * 1000-part base), and ratios are resolved against the formula's total.
 */
export function formulaFromReconstruction(rec: Reconstruction, name?: string): Formula {
  const f = emptyFormula(name ?? `${rec.perfume} — study reconstruction`);
  f.brief = rec.coreAccord;
  f.units = "parts";
  f.family = rec.family;
  f.derivedFrom = { kind: "classic", id: rec.id };

  const lines: FormulaLine[] = [];
  for (const l of rec.lines) {
    if (!getMaterial(l.materialId)) continue;
    if (typeof l.percent === "number") {
      lines.push({
        id: makeId("ln"),
        materialId: l.materialId,
        parts: Math.round(l.percent * 10),
        note: l.role,
      });
    } else if (l.ratio) {
      // Ratio figures such as "4½:1" or "2" are recorded but not converted:
      // converting them would require knowing the total, which the source
      // does not give. Keep at 0 and tell the user.
      lines.push({
        id: makeId("ln"),
        materialId: l.materialId,
        parts: 0,
        note: `Ratio given as ${l.ratio} — resolve by nose. ${l.role}`,
      });
    }
  }

  f.lines = lines;
  f.tags = [rec.family, "study-reconstruction", `${rec.year}`];
  return f;
}

/* ------------------------------------------------------------------ */
/* Normalisation and totals                                            */
/* ------------------------------------------------------------------ */

export function totalParts(lines: FormulaLine[]): number {
  return lines.reduce((s, l) => s + (Number.isFinite(l.parts) ? l.parts : 0), 0);
}

/** Re-express every line so the parts sum to 1000. */
export function normaliseTo1000(formula: Formula): Formula {
  const total = totalParts(formula.lines);
  if (total <= 0) return formula;
  return {
    ...formula,
    units: "parts",
    lines: formula.lines.map((l) => ({
      ...l,
      parts: round((l.parts / total) * 1000, 1),
    })),
  };
}

/**
 * Snap every part value to the nearest rung of Ellena's dose ladder
 * (1, 2, 3, 5, 7, 10, 15, 20, 30, 50, 70, 100, 150, 200, 300, …), extended
 * geometrically above 300. His rule is that a proportion change smaller than
 * a factor of two is not worth recording, because you cannot smell it.
 */
export function snapToDoseScale(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  const scale = [...ellenaDoseScale];
  // Extend the ladder: ×1.5 steps above 300 up to 100k.
  let v = 300;
  while (v < 100000) {
    v = Math.round(v * 1.5);
    scale.push(v);
  }
  let best = scale[0];
  let bestDist = Infinity;
  for (const s of scale) {
    // Compare on a log scale so that 1 vs 2 and 200 vs 300 are weighted fairly.
    const d = Math.abs(Math.log(value) - Math.log(s));
    if (d < bestDist) {
      bestDist = d;
      best = s;
    }
  }
  return best;
}

export function concentrationFor(id?: ConcentrationClass) {
  return concentrations.find((c) => c.id === id) ?? concentrations[1];
}

/**
 * The main calculation. Returns per-line parts, percentages, grams for the
 * requested batch, volatility grouping, and the dilution maths.
 */
export function computeFormula(
  formula: Formula,
  options: {
    /** Grams of finished alcoholic product to make. */
    batchGrams?: number;
    /** Concentrate strength, in %. Overrides `formula.concentration`. */
    concentrationPercent?: number;
    /** Optional per-material price in currency per kg, for costing. */
    prices?: Record<string, number>;
    /** Currency label for the cost output. */
    currency?: string;
  } = {},
): FormulaTotals {
  const total = totalParts(formula.lines);
  const conc = concentrationFor(formula.concentration);
  const concentrationPercent = clamp(
    options.concentrationPercent ?? conc.typical,
    conc.min,
    conc.max,
  );
  const batchGrams = Math.max(0, options.batchGrams ?? 50);

  const lines: ComputedLine[] = formula.lines.map((line) => {
    const material = getMaterial(line.materialId);
    const parts = Number.isFinite(line.parts) ? line.parts : 0;
    const percentOfConcentrate = total > 0 ? (parts / total) * 100 : 0;
    const concentrateGrams = (batchGrams * concentrationPercent) / 100;
    return {
      line,
      material,
      parts,
      percentOfConcentrate,
      grams: (percentOfConcentrate / 100) * concentrateGrams,
      volatility: (material?.volatility ?? "unknown") as Volatility | "unknown",
      percentOfFinished: percentOfConcentrate * (concentrationPercent / 100),
    };
  });

  type LayerKey = Volatility | "unknown";
  const byVolatility: Record<LayerKey, number> = { top: 0, heart: 0, base: 0, unknown: 0 };
  for (const l of lines) byVolatility[l.volatility as LayerKey] += l.parts;

  const byVolatilityPercent: Record<LayerKey, number> = { top: 0, heart: 0, base: 0, unknown: 0 };
  for (const key of Object.keys(byVolatility) as LayerKey[]) {
    byVolatilityPercent[key] = total > 0 ? (byVolatility[key] / total) * 100 : 0;
  }

  const concentrateGrams = (batchGrams * concentrationPercent) / 100;
  const alcoholGrams = batchGrams - concentrateGrams;

  let cost: FormulaTotals["cost"];
  if (options.prices) {
    const missingPrices: string[] = [];
    let sum = 0;
    for (const l of lines) {
      const price = l.material ? options.prices[l.material.id] : undefined;
      if (price === undefined) {
        if (l.material) missingPrices.push(l.material.name);
        continue;
      }
      sum += (l.grams / 1000) * price;
    }
    cost = {
      total: round(sum, 2),
      perGram: concentrateGrams > 0 ? round(sum / concentrateGrams, 2) : 0,
      missingPrices,
    };
  }

  return {
    lines,
    totalParts: total,
    partsSum: total,
    byVolatility,
    byVolatilityPercent,
    batch: {
      concentrateGrams: round(concentrateGrams, 3),
      alcoholGrams: round(alcoholGrams, 3),
      // A small water fraction is conventional in EDT and below. Kept at 0
      // by default because adding water risks cloudiness — see `waterAdvice`.
      waterGrams: 0,
      totalGrams: round(batchGrams, 3),
      concentrationPercent: round(concentrationPercent, 2),
    },
    cost,
  };
}

/**
 * Water in a hydroalcoholic perfume. Adding water can help round a harsh
 * composition but risks cloudiness, because solubility depends on both the
 * water fraction and the specific materials present. The vault therefore
 * defaults to zero and tells the user to test.
 */
export function waterAdvice(formula: Formula): string {
  const totals = computeFormula(formula, { batchGrams: 100 });
  const lowSolubility = totals.lines.filter(
    (l) => typeof l.material?.waterSolubility === "number" && l.material.waterSolubility < 200,
  );
  if (lowSolubility.length === 0) {
    return "No materials in this formula have a recorded water solubility below 200 ppm, so a small water fraction (up to ~5% of the finished product) is unlikely to cloud. Test anyway.";
  }
  const names = lowSolubility
    .slice(0, 6)
    .map((l) => `${l.material?.name} (${l.material?.waterSolubility} ppm)`)
    .join(", ");
  return `Water risks cloudiness here: ${names} are poorly water-soluble. Add concentrate to alcohol first, mature, then add any water dropwise with stirring and check clarity after 24 h.`;
}

/* ------------------------------------------------------------------ */
/* Allergens and compliance                                            */
/* ------------------------------------------------------------------ */

/**
 * EU declarable allergens present in the finished product, against the
 * leave-on threshold of 0.001% (10 ppm).
 *
 * IMPORTANT LIMITATION, stated because it matters: this sums the *named
 * materials* only. A natural such as bergamot oil contributes linalool,
 * limonene and linalyl acetate without any of them appearing as separate
 * lines, so the true allergen load is higher than calculated. Real
 * compliance requires the supplier's allergen declaration for every natural,
 * or laboratory analysis of the finished product.
 */
export function computeAllergens(
  formula: Formula,
  concentrationPercent?: number,
): AllergenHit[] {
  const totals = computeFormula(formula, { batchGrams: 100, concentrationPercent });
  const hits: AllergenHit[] = [];
  for (const l of totals.lines) {
    const m = l.material;
    if (!m?.regulatory.euAllergen) continue;
    hits.push({
      materialId: m.id,
      name: m.name,
      cas: m.cas,
      percentOfFinished: round(l.percentOfFinished, 6),
      threshold: EU_LEAVE_ON_THRESHOLD_PERCENT,
      mustDeclare: l.percentOfFinished > EU_LEAVE_ON_THRESHOLD_PERCENT,
    });
  }
  return hits.sort((a, b) => b.percentOfFinished - a.percentOfFinished);
}

/**
 * Materials that should block or warn on a formula. Ordered so that the
 * hardest problems surface first.
 */
export function computeCompliance(formula: Formula): ComplianceFlag[] {
  const totals = computeFormula(formula, { batchGrams: 100 });
  const flags: ComplianceFlag[] = [];

  for (const l of totals.lines) {
    const m = l.material;
    if (!m || l.parts <= 0) continue;
    const r = m.regulatory;
    const pct = l.percentOfConcentrate;

    if (r.status === "banned-eu-cosmetics") {
      flags.push({
        materialId: m.id,
        name: m.name,
        level: "block",
        message: `Prohibited in EU cosmetic products. ${r.note ?? ""} Remove and substitute — reducing the level is not a fix.`,
      });
      continue;
    }
    if (
      r.status === "restricted" &&
      /\bBanned\b|\bprohibited\b|CITES|whale|Beaver|\bPAH\b/i.test(r.note ?? "")
    ) {
      flags.push({
        materialId: m.id,
        name: m.name,
        level: "block",
        message: r.note ?? "Restricted for ethical, legal or safety reasons.",
      });
      continue;
    }
    if (r.status === "restricted-ifra" && r.note) {
      flags.push({
        materialId: m.id,
        name: m.name,
        level: "warn",
        message: `IFRA Standard applies. ${r.note} At ${pct.toFixed(2)}% of the concentrate, verify against the current Standard for your product category.`,
      });
      continue;
    }
    if (r.status === "restricted" && r.note) {
      flags.push({
        materialId: m.id,
        name: m.name,
        level: "warn",
        message: r.note,
      });
      continue;
    }
    if (r.status === "watch" && r.note) {
      flags.push({
        materialId: m.id,
        name: m.name,
        level: "info",
        message: r.note,
      });
    }
  }

  // Composition-level advice, not tied to one material.
  const unknown = totals.lines.filter((l) => !l.material && l.parts > 0);
  if (unknown.length) {
    flags.push({
      materialId: "",
      name: `${unknown.length} unrecognised material${unknown.length > 1 ? "s" : ""}`,
      level: "info",
      message:
        "Some lines do not match anything in the reference database, so they cannot be checked for volatility, allergens or compliance.",
    });
  }

  const allergens = computeAllergens(formula);
  const declaring = allergens.filter((a) => a.mustDeclare);
  if (declaring.length) {
    flags.push({
      materialId: "",
      name: "EU allergen declaration",
      level: "warn",
      message: `${declaring.length} named material${declaring.length > 1 ? "s exceed" : " exceeds"} the 0.001% leave-on threshold and must appear on the label. This count excludes allergens contributed inside naturals, so the real list is longer — obtain supplier declarations or test the finished product.`,
    });
  }

  return flags.sort((a, b) => rank(a.level) - rank(b.level));
}

function rank(level: ComplianceFlag["level"]): number {
  return level === "block" ? 0 : level === "warn" ? 1 : 2;
}

/* ------------------------------------------------------------------ */
/* Structural diagnostics                                              */
/* ------------------------------------------------------------------ */

export interface Diagnosis {
  id: string;
  severity: "warn" | "info" | "good";
  message: string;
}

/**
 * Composition-level craft diagnostics, drawn from the guidance in Calkin &
 * Jellinek chs. 6 and 9. These are heuristics, not rules — they exist to
 * prompt a question, not to give an answer.
 */
export function diagnose(formula: Formula): Diagnosis[] {
  const out: Diagnosis[] = [];
  const totals = computeFormula(formula, { batchGrams: 100 });
  const active = totals.lines.filter((l) => l.parts > 0);

  if (active.length === 0) {
    out.push({ id: "empty", severity: "info", message: "No materials with a non-zero amount yet." });
    return out;
  }

  // Complexity
  if (active.length > 40) {
    out.push({
      id: "too-complex",
      severity: "warn",
      message: `${active.length} materials. Complex formulas are harder to balance and harder to adjust: changing one thing shifts everything. Consider whether several lines can be replaced by a pre-blended base.`,
    });
  } else if (active.length <= 12) {
    out.push({
      id: "lean",
      severity: "good",
      message: `${active.length} materials — a lean, workable composition. The modern Grojsman-style structure gets by on as few as four or five materials for up to ~80% of the formula.`,
    });
  }

  // Volatility balance
  const { top, base } = totals.byVolatilityPercent;
  if (base < 20) {
    out.push({
      id: "weak-base",
      severity: "warn",
      message: `Base notes are only ${base.toFixed(0)}% of the formula. The heart of a perfume needs to live in the low-volatility materials, because that is what remains on skin for hours. Expect poor longevity.`,
    });
  }
  if (top < 5) {
    out.push({
      id: "no-top",
      severity: "info",
      message: `Top notes are ${top.toFixed(0)}%. That is legitimate — many modern linear perfumes omit a fresh top note entirely so the character arrives immediately on skin — but check it is deliberate.`,
    });
  }
  if (top > 45) {
    out.push({
      id: "top-heavy",
      severity: "warn",
      message: `Top notes are ${top.toFixed(0)}%. Highly volatile materials dominate, so the composition will collapse quickly. Citrus-heavy colognes are dosed low (2-4%) for exactly this reason.`,
    });
  }

  // Nondescript floral check
  const generic = [
    "phenylethyl-alcohol",
    "hydroxycitronellal",
    "benzyl-acetate",
    "phenylacetaldehyde",
    "citronellol",
    "hexyl-cinnamal",
    "terpineol-alpha",
    "indole",
  ];
  const genericShare =
    totals.totalParts > 0
      ? active
          .filter((l) => generic.includes(l.line.materialId))
          .reduce((s, l) => s + l.parts, 0) / totals.totalParts
      : 0;
  if (genericShare > 0.6) {
    out.push({
      id: "nondescript-floral",
      severity: "warn",
      message: `${(genericShare * 100).toFixed(0)}% of this formula is made of generally-used floral materials. Eight materials — phenylethyl alcohol, hydroxycitronellal, benzyl acetate, phenylacetaldehyde, citronellol, hexyl cinnamic aldehyde, terpineol and indole — can produce jasmine, lilac, muguet or hyacinth depending only on proportion; a base built mainly from them loses its identity and gives a nondescript floral with little personality. Add highly characteristic materials that will carry the note through the finished product.`,
    });
  }

  // Trace power materials
  const powerful = active.filter((l) => {
    const [lo] = l.material?.typicalUse ?? [0, 0];
    return l.material && lo <= 0.05 && l.percentOfConcentrate > 1;
  });
  for (const p of powerful) {
    out.push({
      id: `overdose-${p.line.materialId}`,
      severity: "warn",
      message: `${p.material?.name} at ${p.percentOfConcentrate.toFixed(2)}% — its usual range starts at ${(p.material?.typicalUse[0] ?? 0)}%. Very powerful materials are normally dosed pre-diluted and in trace.`,
    });
  }

  // Under-dosed materials
  const under = active.filter((l) => l.percentOfConcentrate < 0.01);
  if (under.length > 3) {
    out.push({
      id: "sub-threshold",
      severity: "info",
      message: `${under.length} materials are below 0.01% of the concentrate. Some will still be perceptible (materials with very low odour thresholds work in parts per billion), but others are simply too small to do anything. Check each one earns its place.`,
    });
  }

  // Vanillin warning
  const vanillin = active.find((l) => l.line.materialId === "vanillin");
  if (vanillin && vanillin.percentOfConcentrate > 0 && vanillin.percentOfConcentrate < 1) {
    out.push({
      id: "vanillin",
      severity: "info",
      message: `Vanillin at ${vanillin.percentOfConcentrate.toFixed(2)}%. In an oriental it may form 10% or more of the formula, but in another type of perfume as little as 0.5% can totally obscure an otherwise finely balanced accord. Add it near the end of composition, by trial — never to cover up faults in a badly built perfume, because once it is in, the balance of everything else becomes hard to assess.`,
    });
  }

  // Aldehyde maturation
  const aldehydes = active.filter((l) => l.line.materialId.startsWith("aldehyde-c") && !["aldehyde-c14", "aldehyde-c16", "aldehyde-c18"].includes(l.line.materialId));
  if (aldehydes.length) {
    out.push({
      id: "aldehyde-maturation",
      severity: "info",
      message: "Aliphatic aldehydes present. Do not judge this composition when first put into ethanol: a considerable maturation period is needed for the aldehydes to 'go in' through formation of their hemi-acetals. Aldehydic formulas are also chemically unstable alongside vanillin, and will discolour.",
    });
  }

  return out;
}

/* ------------------------------------------------------------------ */
/* Comparison                                                          */
/* ------------------------------------------------------------------ */

export interface ComparisonResult {
  /** Cosine similarity of the two formulas over shared material space, 0-1. */
  similarity: number;
  shared: { materialId: string; name: string; aPercent: number; bPercent: number; delta: number }[];
  onlyInA: { materialId: string; name: string; percent: number }[];
  onlyInB: { materialId: string; name: string; percent: number }[];
  volatilityDelta: Record<string, number>;
}

/**
 * Compare two formulas the way the reconstruction workflow compares a trial
 * against its target: what is shared and in what proportion, what is missing
 * each side, and how the volatility profile differs.
 *
 * Similarity is cosine over the percentage vector. It rewards matching
 * *shape* rather than matching ingredient count, which is the right notion
 * here: two formulas with the same majors and different traces are close.
 */
export function compareFormulas(a: Formula, b: Formula): ComparisonResult {
  const ta = computeFormula(a, { batchGrams: 100 });
  const tb = computeFormula(b, { batchGrams: 100 });

  const mapA = new Map(ta.lines.filter((l) => l.parts > 0).map((l) => [l.line.materialId, l]));
  const mapB = new Map(tb.lines.filter((l) => l.parts > 0).map((l) => [l.line.materialId, l]));

  const allIds = new Set([...mapA.keys(), ...mapB.keys()]);
  const shared: ComparisonResult["shared"] = [];
  const onlyInA: ComparisonResult["onlyInA"] = [];
  const onlyInB: ComparisonResult["onlyInB"] = [];

  for (const id of allIds) {
    const la = mapA.get(id);
    const lb = mapB.get(id);
    const name = (la?.material?.name ?? lb?.material?.name ?? id) as string;
    if (la && lb) {
      shared.push({
        materialId: id,
        name,
        aPercent: round(la.percentOfConcentrate, 3),
        bPercent: round(lb.percentOfConcentrate, 3),
        delta: round(la.percentOfConcentrate - lb.percentOfConcentrate, 3),
      });
    } else if (la) {
      onlyInA.push({ materialId: id, name, percent: round(la.percentOfConcentrate, 3) });
    } else if (lb) {
      onlyInB.push({ materialId: id, name, percent: round(lb.percentOfConcentrate, 3) });
    }
  }

  shared.sort((x, y) => Math.abs(y.delta) - Math.abs(x.delta));
  onlyInA.sort((x, y) => y.percent - x.percent);
  onlyInB.sort((x, y) => y.percent - x.percent);

  // Cosine similarity over the union of materials.
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (const id of allIds) {
    const va = mapA.get(id)?.percentOfConcentrate ?? 0;
    const vb = mapB.get(id)?.percentOfConcentrate ?? 0;
    dot += va * vb;
    magA += va * va;
    magB += vb * vb;
  }
  const similarity = magA > 0 && magB > 0 ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;

  const volatilityDelta: Record<string, number> = {};
  const layerKeys = ["top", "heart", "base", "unknown"] as const;
  for (const key of layerKeys) {
    volatilityDelta[key] = round(
      (ta.byVolatilityPercent[key] ?? 0) - (tb.byVolatilityPercent[key] ?? 0),
      1,
    );
  }

  return { similarity, shared, onlyInA, onlyInB, volatilityDelta };
}

/**
 * Read a similarity score the way the reconstruction literature reads a
 * match. Calibrated to the published counterfeit and 'twin' studies, where
 * chemically near-identical products were still sensorially distinguishable.
 */
export function interpretSimilarity(s: number): { label: string; guidance: string } {
  if (s >= 0.97)
    return {
      label: "Very close",
      guidance:
        "Same majors in nearly the same proportions. Remaining differences are likely in trace materials, which is exactly where a match stops improving from analysis and starts depending on the nose.",
    };
  if (s >= 0.9)
    return {
      label: "Close",
      guidance:
        "Structurally the same family with proportion differences. Published 'perfume twin' work found products with near-identical chemical inventories still distinguishable by a handful of terpenes and esters — expect to be in that territory.",
    };
  if (s >= 0.75)
    return {
      label: "Related",
      guidance:
        "Shares the architecture but differs materially in the balance. Useful as a starting point; expect several iteration rounds.",
    };
  if (s >= 0.5)
    return {
      label: "Distantly related",
      guidance: "Some overlap in materials, different composition. Treat as a variation on a theme, not a match.",
    };
  return {
    label: "Different",
    guidance: "Little structural overlap.",
  };
}

/* ------------------------------------------------------------------ */
/* Serialisation                                                       */
/* ------------------------------------------------------------------ */

export function exportFormulas(formulas: Formula[]): string {
  const bundle: ExportBundle = {
    format: "dom126-formula-vault",
    version: 1,
    exportedAt: new Date().toISOString(),
    formulas,
  };
  return JSON.stringify(bundle, null, 2);
}

/** A human-readable formula sheet, in the six-column layout perfumers use. */
export function formulaToText(formula: Formula, batchGrams = 100): string {
  const totals = computeFormula(formula, { batchGrams });
  const rows = totals.lines
    .filter((l) => l.parts > 0)
    .sort((a, b) => b.percentOfConcentrate - a.percentOfConcentrate);
  const width = Math.max(28, ...rows.map((r) => (r.material?.name ?? r.line.materialId).length));
  const head = [
    `FORMULA: ${formula.name}  (v${formula.version})`,
    formula.brief ? `BRIEF:   ${formula.brief}` : "",
    `DATE:    ${formula.updatedAt.slice(0, 10)}`,
    `BATCH:   ${batchGrams} g of finished product at ${totals.batch.concentrationPercent}% concentrate`,
    `         = ${totals.batch.concentrateGrams} g concentrate + ${totals.batch.alcoholGrams} g perfumer's alcohol`,
    "",
    `${"MATERIAL".padEnd(width)}  ${"PARTS".padStart(9)}  ${"% CONC".padStart(8)}  ${"GRAMS".padStart(8)}  LAYER`,
    "-".repeat(width + 40),
  ].filter(Boolean);

  const body = rows.map((r) =>
    [
      (r.material?.name ?? r.line.materialId).padEnd(width),
      String(round(r.parts, 1)).padStart(9),
      `${round(r.percentOfConcentrate, 2)}%`.padStart(8),
      round(r.grams, 3).toFixed(3).padStart(8),
      ` ${r.volatility}`,
    ].join("  "),
  );

  const foot = [
    "-".repeat(width + 40),
    `${"TOTAL".padEnd(width)}  ${String(round(totals.totalParts, 1)).padStart(9)}`,
    "",
    `LAYER SPLIT   top ${totals.byVolatilityPercent.top.toFixed(1)}%  ·  heart ${totals.byVolatilityPercent.heart.toFixed(1)}%  ·  base ${totals.byVolatilityPercent.base.toFixed(1)}%`,
  ];

  const flags = computeCompliance(formula);
  if (flags.length) {
    foot.push("", "COMPLIANCE FLAGS");
    for (const f of flags) foot.push(`  [${f.level.toUpperCase()}] ${f.name}: ${f.message}`);
  }

  const allergens = computeAllergens(formula).filter((a) => a.mustDeclare);
  if (allergens.length) {
    foot.push("", `EU DECLARABLE ALLERGENS ABOVE 0.001% (named materials only — naturals contribute more):`);
    for (const a of allergens) foot.push(`  ${a.name.padEnd(32)} ${a.percentOfFinished.toFixed(4)}%${a.cas ? `  CAS ${a.cas}` : ""}`);
  }

  if (formula.trials.length) {
    foot.push("", "TRIAL NOTES");
    for (const t of formula.trials) {
      foot.push(`  ${t.date.slice(0, 10)}${t.rating ? `  ${t.rating}/5` : ""}${t.dilution ? `  @${t.dilution}%` : ""}`);
      if (t.top) foot.push(`    top:     ${t.top}`);
      if (t.heart) foot.push(`    heart:   ${t.heart}`);
      if (t.drydown) foot.push(`    drydown: ${t.drydown}`);
      if (t.changes) foot.push(`    changes: ${t.changes}`);
    }
  }

  return [...head, ...body, ...foot].join("\n");
}

/**
 * Parse a pasted formula in common hand-written formats. Accepts:
 *   Bergamot 200
 *   Bergamot oil   20%
 *   200  Bergamot
 * Unmatched names are kept as lines with an unknown materialId so nothing
 * is silently dropped.
 */
export function parseFormulaText(text: string, name = "Imported formula"): Formula {
  const f = emptyFormula(name);
  const lines: FormulaLine[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || /^[-=#*]/.test(line)) continue;
    const m =
      line.match(/^([0-9]+(?:\.[0-9]+)?)\s*%?\s+([A-Za-z0-9'’\-.,/() ]{3,})$/) ??
      line.match(/^([A-Za-z0-9'’\-.,/() ]{3,}?)\s+([0-9]+(?:\.[0-9]+)?)\s*%?$/);
    if (!m) continue;
    const first = m[1].trim();
    const second = m[2].trim();
    const isPercent = line.includes("%");
    const numericFirst = /^[0-9.]+$/.test(first);
    const value = Number(numericFirst ? first : second);
    const nameText = numericFirst ? second : first;
    if (!Number.isFinite(value)) continue;
    const found = findMaterialLoose(nameText);
    lines.push({
      id: makeId("ln"),
      materialId: found ? found.id : `unknown:${nameText.toLowerCase().replace(/\s+/g, "-")}`,
      parts: isPercent ? value * 10 : value,
      note: found ? undefined : `Unmatched name — "${nameText}". Add it to the materials list or map it manually.`,
    });
  }
  f.lines = lines;
  return f;
}

function findMaterialLoose(query: string): Material | undefined {
  const q = query.trim().toLowerCase();
  const direct = getMaterial(q);
  if (direct) return direct;
  return ALL_MATERIALS.find(
    (m) =>
      m.name.toLowerCase() === q ||
      m.chemicalName?.toLowerCase() === q ||
      m.name.toLowerCase().startsWith(q) ||
      q.startsWith(m.name.toLowerCase()),
  );
}

/* ------------------------------------------------------------------ */
/* Small utilities                                                     */
/* ------------------------------------------------------------------ */

export function round(n: number, dp: number): number {
  const f = 10 ** dp;
  return Math.round((n + Number.EPSILON) * f) / f;
}

export function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

/**
 * Practical weighing advice. A 0.05 g target on a 0.01 g balance is a 20%
 * possible error, which is why powerful materials are dosed as dilutions.
 */
export function dilutionAdvice(grams: number): string {
  if (grams <= 0) return "Nothing to weigh.";
  if (grams < 0.01)
    return "Below the reliable range of a 0.01 g balance. Make a 10% or 1% dilution in benzyl benzoate, DPG or alcohol and weigh the dilution instead.";
  if (grams < 0.05)
    return "Marginal on a 0.01 g balance — up to ±20% error. Prefer a 10% dilution, or scale the whole batch up.";
  if (grams < 0.2) return "Weighable on a 0.01 g balance, but a 10% dilution will give better repeatability.";
  return "Comfortably weighable. A 0.01 g balance is adequate; 0.001 g is better for formulas with trace materials.";
}

/** Suggested next dose on Ellena's ladder, for stepping a material up or down. */
export function nextDose(current: number, direction: "up" | "down"): number {
  const scale = [...ellenaDoseScale];
  let v = 300;
  while (v < 100000) {
    v = Math.round(v * 1.5);
    scale.push(v);
  }
  const sorted = [...new Set(scale)].sort((a, b) => a - b);
  const idx = sorted.findIndex((s) => s >= current);
  if (direction === "up") return sorted[Math.min(sorted.length - 1, idx < 0 ? sorted.length - 1 : idx + (sorted[idx] === current ? 1 : 0))];
  return sorted[Math.max(0, (idx < 0 ? sorted.length : idx) - 1)];
}
