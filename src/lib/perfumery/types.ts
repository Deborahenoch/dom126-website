/**
 * DOM126 Perfumery Atlas — shared types.
 *
 * A note on sources and honesty (please read before editing this data):
 *
 *   1. Nothing in `src/lib/perfumery/*` is a real manufacturer's secret
 *      formula. Trade formulas are confidential and are not published.
 *   2. The percentage figures attached to named commercial perfumes in
 *      `classics.ts` come from a published *study* — R. R. Calkin &
 *      J. S. Jellinek, "Perfumery: Practice and Principles" (Wiley, 1994),
 *      ch. 12 — which is itself derived from GC analysis plus classroom
 *      reconstruction. That book states explicitly that its figures are
 *      "only guidelines to the main structure" and not complete formulas.
 *      They are reproduced here as structured teaching data, not as
 *      recipes for copying a brand.
 *   3. Odour descriptions, CAS numbers, volatility classes and regulatory
 *      flags are factual reference data and may be corrected freely.
 *   4. Safety limits change. IFRA Standards and EU Regulation 1223/2009
 *      (as amended by 2023/1545) are the authoritative sources; the flags
 *      here are a study aid, never a substitute for a compliance check.
 */

/* ------------------------------------------------------------------ */
/* Materials                                                           */
/* ------------------------------------------------------------------ */

/** Where a material comes from. */
export type MaterialOrigin =
  | "natural"
  | "synthetic"
  | "isolated"
  | "reconstructed-natural"
  | "base";

/** Extraction / production route for naturals. */
export type ExtractionMethod =
  | "steam-distilled"
  | "expressed"
  | "solvent-extracted-absolute"
  | "concrete"
  | "resinoid"
  | "enfleurage"
  | "co2-extract"
  | "tincture"
  | "molecular-distilled"
  | "fractionated"
  | "synthesised"
  | "compounded";

/**
 * Evaporation class. Drives the top / heart / base maths in the vault.
 * `top` evaporates in minutes-to-2h, `heart` over 2-8h, `base` persists
 * for many hours to days.
 */
export type Volatility = "top" | "heart" | "base";

/** Regulatory posture. Deliberately coarse — see the note above. */
export type RegulatoryStatus =
  | "ok"
  | "restricted"
  | "banned-eu-cosmetics"
  | "restricted-ifra"
  | "allergen-declare"
  | "watch"
  | "legacy";

/** The nine odour fields used by Ellena's teaching classification. */
export type OdorField =
  | "flower"
  | "fruit"
  | "wood"
  | "grass"
  | "spice"
  | "sweet"
  | "animal"
  | "marine"
  | "mineral";

/** The seven SFP families (1984 / 1990), used for whole-composition tagging. */
export type SfpFamily =
  | "hesperides"
  | "floral"
  | "fougere"
  | "chypre"
  | "woody"
  | "amber"
  | "leather";

export interface Regulatory {
  status: RegulatoryStatus;
  /** EU Annex III / IFRA declaration entry, if this material is a listed allergen. */
  euAllergen?: boolean;
  /** Short plain-language reason. Kept factual and brief. */
  note?: string;
}

export interface Material {
  id: string;
  /** Perfumer's trade name. */
  name: string;
  /** Chemical / INCI name where one applies. */
  chemicalName?: string;
  /** CAS registry number — omit rather than guess. */
  cas?: string;
  origin: MaterialOrigin;
  family: OdorField;
  /** Sub-group inside the family, e.g. "rose", "white flower", "sandal". */
  facet: string;
  volatility: Volatility;
  /** Free-text odour description in perfumers' vocabulary. */
  odor: string;
  /**
   * Approximate tenacity on a smelling strip. Expressed as a coarse band
   * rather than a false-precision number.
   */
  tenacity: "minutes" | "hours" | "days" | "weeks";
  /** Vapour pressure in microns at 20 °C where a measured value exists. */
  vaporPressure?: number;
  /** Water solubility in ppm where a measured value exists. */
  waterSolubility?: number;
  /** Typical use level inside a fragrance concentrate, % w/w. */
  typicalUse: [number, number];
  /** Indicative relative cost, 1 = cheap commodity, 5 = extremely expensive. */
  costTier: 1 | 2 | 3 | 4 | 5;
  regulatory: Regulatory;
  /** What it is typically used to build. */
  usedFor: string[];
  /** Materials it pairs with unusually well. */
  pairsWith: string[];
  /** Practical handling notes: solubility, discolouration, stability. */
  notes?: string;
  /** Botanical or trade source, for naturals. */
  source?: string;
  extraction?: ExtractionMethod;
  /** Year first available to perfumers, where historically documented. */
  yearIntroduced?: number;
}

/* ------------------------------------------------------------------ */
/* Accords                                                             */
/* ------------------------------------------------------------------ */

export interface AccordComponent {
  materialId: string;
  /** Parts in a 1000-part accord. */
  parts: number;
  role?: string;
}

export interface Accord {
  id: string;
  name: string;
  /** What kind of building block this is. */
  kind:
    | "structural"
    | "floral-base"
    | "fantasy"
    | "modifier"
    | "modern";
  family: SfpFamily | OdorField | "bouquet" | "patchouli-floral";
  summary: string;
  components: AccordComponent[];
  /** Materials that can be swapped in to vary the accord. */
  variants: { insteadOf: string; use: string; effect: string }[];
  /** Where this accord shows up in the literature. */
  provenance: string;
}

/* ------------------------------------------------------------------ */
/* Families                                                            */
/* ------------------------------------------------------------------ */

export interface Family {
  id: SfpFamily;
  name: string;
  french: string;
  /** The accord that defines the family. */
  signature: string;
  /** Materials that must be present for the family to read as itself. */
  keyMaterials: string[];
  subfamilies: { name: string; character: string }[];
  /** Named historical anchor of the family. */
  anchor: { name: string; house: string; year: number };
  history: string;
}

/* ------------------------------------------------------------------ */
/* Classic-perfume study reconstructions                               */
/* ------------------------------------------------------------------ */

export interface ReconstructionLine {
  materialId: string;
  /**
   * Percentage of the concentrate, where the source states one.
   * `undefined` means the source names the material without quantifying it.
   */
  percent?: number;
  /** Ratio figures such as "4.5 : 1" where the source gives a ratio instead. */
  ratio?: string;
  layer?: "top" | "heart" | "base" | "trace";
  /** What this line is doing in the composition. */
  role: string;
}

export interface Reconstruction {
  id: string;
  perfume: string;
  house: string;
  year: number;
  family: SfpFamily | "floral-salicylate" | "floral-aldehydic" | "floral-sweet" | "patchouli-floral";
  /** The structural accord that defines this perfume, in one line. */
  coreAccord: string;
  /**
   * How much of the composition the source actually quantifies.
   * This is the single most important field for honesty: most
   * reconstructions cover only part of the formula.
   */
  quantifiedCoverage: string;
  lines: ReconstructionLine[];
  /** Materials named by the source but not quantified. */
  unquantified: string[];
  /** What changed relative to its predecessor in the family line. */
  evolution: string;
  /** Practical notes for a modern perfumer rebuilding the idea. */
  modernisation: string[];
  source: string;
}

/* ------------------------------------------------------------------ */
/* Formula vault                                                       */
/* ------------------------------------------------------------------ */

export interface FormulaLine {
  id: string;
  materialId: string;
  /** Parts by weight. Units are relative — see `Formula.units`. */
  parts: number;
  note?: string;
}

export type FormulaUnits = "parts" | "grams" | "percent";

export type ConcentrationClass =
  | "extrait"
  | "eau-de-parfum"
  | "eau-de-toilette"
  | "eau-de-cologne"
  | "eau-fraiche";

export interface Formula {
  id: string;
  name: string;
  /** Short description of the intent. */
  brief: string;
  createdAt: string;
  updatedAt: string;
  /** Monotonic counter — every save bumps it so history is traceable. */
  version: number;
  units: FormulaUnits;
  lines: FormulaLine[];
  family?: SfpFamily | string;
  /** Target strength of the finished alcoholic product. */
  concentration?: ConcentrationClass;
  tags: string[];
  /** Perfumer's own evaluation notes from smelling trials. */
  trials: Trial[];
  /** Optional link to a reconstruction or accord this was derived from. */
  derivedFrom?: { kind: "classic" | "accord"; id: string };
}

export interface Trial {
  id: string;
  date: string;
  /** Dilution actually smelled. */
  dilution?: number;
  rating?: number;
  top?: string;
  heart?: string;
  drydown?: string;
  changes?: string;
}

export interface ExportBundle {
  format: "dom126-formula-vault";
  version: 1;
  exportedAt: string;
  formulas: Formula[];
}

/* ------------------------------------------------------------------ */
/* Derived calculations                                                */
/* ------------------------------------------------------------------ */

export interface ComputedLine {
  line: FormulaLine;
  material?: Material;
  parts: number;
  percentOfConcentrate: number;
  /** Grams needed for the requested batch of concentrate. */
  grams: number;
  volatility: Volatility | "unknown";
  /** % of the *finished* alcoholic product, after dilution. */
  percentOfFinished: number;
}

export interface FormulaTotals {
  lines: ComputedLine[];
  totalParts: number;
  /** Sum of parts — 100 if the formula is already normalised. */
  partsSum: number;
  byVolatility: Record<Volatility | "unknown", number>;
  byVolatilityPercent: Record<Volatility | "unknown", number>;
  /** Concentrate grams, alcohol grams and water grams for the batch. */
  batch: {
    concentrateGrams: number;
    alcoholGrams: number;
    waterGrams: number;
    totalGrams: number;
    concentrationPercent: number;
  };
  /** Indicative cost, only when every material has a price. */
  cost?: { total: number; perGram: number; missingPrices: string[] };
}

export interface AllergenHit {
  materialId: string;
  name: string;
  cas?: string;
  /** % of the finished leave-on product. */
  percentOfFinished: number;
  /** EU declaration threshold for leave-on products, in %. */
  threshold: number;
  mustDeclare: boolean;
}

export interface ComplianceFlag {
  materialId: string;
  name: string;
  level: "block" | "warn" | "info";
  message: string;
}
