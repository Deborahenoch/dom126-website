/**
 * DOM126 Perfumery Atlas — olfactory families.
 *
 * Three classification systems are kept side by side on purpose, because
 * they answer different questions and disagree usefully:
 *
 *   1. SFP  — the Société Française des Parfumeurs classification (1984,
 *             revised 1990). Seven families. This is the industry's
 *             structural standard and the one this file is keyed to.
 *             Ellena sat on the SFP classification committee and is
 *             sceptical of it; his objection is recorded below because it
 *             is a good one.
 *   2. WHEEL — Michael Edwards' Fragrance Wheel (1983, updated). Four
 *             groups / fourteen families. Consumer-facing. Note Edwards
 *             renamed "Oriental" to "Amber" in 2021.
 *   3. FIELD — Ellena's nine *odour fields* for individual materials
 *             (not whole perfumes), from "Perfume: The Alchemy of Scent"
 *             (2011), ch. IV. Used for tagging single materials in
 *             `materials.ts`.
 *
 * Fragrantica's site taxonomy (fragrantica.com/groups) is a fourth,
 * retail-oriented grouping: Floral, Oriental/Amber, Woody, Chypre,
 * Aromatic, Citrus, Fougère, Leather, Gourmand, plus many sub-groups.
 * It is closer to Edwards than to the SFP and is organised for shopping
 * rather than for formulation.
 */

import type { Family, SfpFamily } from "./types";

export const families: Family[] = [
  {
    id: "hesperides",
    name: "Citrus / Hesperides",
    french: "Hespéridée",
    signature:
      "Expressed citrus peel oils over a light aromatic or woody base. Definition comes from volatility: almost everything in it evaporates within an hour or two.",
    keyMaterials: ["bergamot-oil", "lemon-oil", "sweet-orange-oil", "mandarin-oil", "petitgrain-oil", "neroli-oil", "linalool", "linalyl-acetate"],
    subfamilies: [
      { name: "Hesperides floral / chyprée", character: "Citrus opening over a mossy-floral heart — the classic cologne-chypre hybrid." },
      { name: "Hesperides aromatic", character: "Citrus with lavender, rosemary, thyme — the barbershop register." },
      { name: "Hesperides spiced", character: "Citrus lifted by pepper, cardamom, ginger." },
      { name: "Hesperides woody", character: "Citrus over cedar, vetiver or sandalwood for extra tenacity." },
    ],
    anchor: { name: "Eau de Cologne / 4711", house: "Muelhens", year: 1792 },
    history:
      "Added to the SFP scheme in the 1990 revision, which also introduced men's fragrances and the Woody family. The style itself is far older — western perfumery arguably begins with Hungary Water, Lavender Water and Eau de Cologne, simple mixtures of distilled and expressed oils in alcohol with animal and balsamic fixatives.",
  },
  {
    id: "floral",
    name: "Floral",
    french: "Florale",
    signature:
      "A single flower (soliflore) or a bouquet. The largest family by volume, and the one with the most sub-structure.",
    keyMaterials: ["jasmine-abs", "rose-abs", "hydroxycitronellal", "hedione", "ylang-oil", "phenylethyl-alcohol", "benzyl-acetate", "hexyl-cinnamal"],
    subfamilies: [
      { name: "Single flower / soliflore", character: "One flower rendered as faithfully as possible." },
      { name: "Floral bouquet", character: "Several flowers in balance; no single note dominates." },
      { name: "Floral aldehydic", character: "Bouquet lifted by a block of aliphatic aldehydes. See the floral-aldehydic study set." },
      { name: "Floral green", character: "Flowers with galbanum, violet leaf, cis-3-hexenyl materials." },
      { name: "Floral fruity", character: "Flowers with lactones and berry notes." },
      { name: "Floral powdery", character: "Flowers softened by orris, ionones, heliotropin, vanillin." },
      { name: "Floral woody musk", character: "The modern default: floral heart over Iso E / sandalwood / macrocyclic musks." },
    ],
    anchor: { name: "Chanel No. 5", house: "Chanel", year: 1921 },
    history:
      "The aliphatic aldehydes made this family possible in its modern form. Before them, florals were built almost entirely from naturals; after, a perfumer could construct a flower that had never existed.",
  },
  {
    id: "fougere",
    name: "Fougère",
    french: "Fougère",
    signature:
      "Lavender + coumarin + oakmoss, with bergamot and often geranium. A fantasy accord: it does not smell of fern, and never claimed to.",
    keyMaterials: ["lavender-oil", "coumarin", "oakmoss-abs", "bergamot-oil", "geranium-oil", "linalyl-acetate", "tonka-abs"],
    subfamilies: [
      { name: "Fougère aromatic", character: "Herbal-forward: rosemary, thyme, clary sage over the lavender-coumarin core." },
      { name: "Fougère ambrée / spicy", character: "Warmed with spices and amber materials." },
      { name: "Fougère woody", character: "Base extended with cedar, vetiver, patchouli or sandalwood." },
    ],
    anchor: { name: "Fougère Royale", house: "Houbigant", year: 1882 },
    history:
      "Ellena is blunt about how these definitions actually work: the family is described as evocative and claims no connection with the smell of a fern — it is simply produced with lavender, oakmoss, coumarin, bergamot and geranium. That is the honest way to read every family definition on this page: they name an *accord*, not a natural object. The coumarin in Fougère Royale was itself newly synthetic, which is why the family dates from the moment industrial aroma chemistry arrived.",
  },
  {
    id: "chypre",
    name: "Chypre",
    french: "Chypre",
    signature:
      "Bergamot top over a dark base of oakmoss, labdanum and patchouli, usually with a floral or fruity heart. Dry, elegant, faintly bitter.",
    keyMaterials: ["oakmoss-abs", "labdanum-abs", "bergamot-oil", "patchouli-oil", "vetiveryl-acetate", "methyl-ionone", "isobutyl-quinoline"],
    subfamilies: [
      { name: "Chypre floral", character: "The classic: rose or jasmine heart on the mossy base." },
      { name: "Chypre fruity", character: "Lactone-driven — aldehyde C14 in Mitsouko and Femme." },
      { name: "Chypre vert", character: "Galbanum and armoise push it green and sharp." },
      { name: "Chypre cuir / animalic", character: "Isobutyl quinoline, castoreum, birch tar — Bandit and Cabochard." },
      { name: "Chypre aromatique", character: "Herbal top notes over the moss." },
    ],
    anchor: { name: "Chypre", house: "Coty", year: 1917 },
    history:
      "The name comes from Cyprus, for centuries the meeting point of the Mediterranean and Arabian aromatic trades — citrus oils and labdanum from the west, resins, gums, civet and musk from the east. By the twentieth century the word had stopped meaning 'from Cyprus' and started meaning a specific accord. Some perfumers reduce all of perfumery to three headings: florals, orientals, and everything else, which they call chypres — a defensible view given how widely the chypre accord is used outside the family. The family is now commercially weak, largely because IFRA restrictions on oakmoss (atranol and chloroatranol) make a faithful vintage mossy drydown very hard to build.",
  },
  {
    id: "woody",
    name: "Woody",
    french: "Boisée",
    signature:
      "Sandalwood, cedar, vetiver, patchouli and oud as the subject rather than as support. Can be creamy or bone-dry.",
    keyMaterials: ["sandalwood-oil", "cedarwood-virginia", "vetiver-oil", "patchouli-oil", "iso-e-super", "javanol", "vertofix"],
    subfamilies: [
      { name: "Woody sandalwood", character: "Creamy, milky, soft — the Samsara direction." },
      { name: "Woody dry / cedar-vetiver", character: "Pencil-shavings, smoke, earth." },
      { name: "Woody mossy", character: "The chypre overlap." },
      { name: "Woody spicy", character: "Pepper, cardamom, ginger over the wood." },
      { name: "Woody aromatic", character: "Herbal-citrus top, woody base — most modern masculines." },
      { name: "Woody amber", character: "Iso E Super, ambroxan, Cashmeran — the transparent modern woody." },
    ],
    anchor: { name: "Vétiver", house: "Guerlain", year: 1959 },
    history:
      "Also added in the SFP's 1990 revision. Its real expansion came with the synthetic woody-amber materials: Vertofix (acetyl cedrene) in the early 1960s gave a fine woody note at low cost with excellent functional performance, then Iso E Super and the sandalwood synthetics (Brahmanol, Sandranol, Madranol, Sandalore, Javanol) let a perfumer build wood without depending on scarce and protected Santalum album.",
  },
  {
    id: "amber",
    name: "Amber / Oriental",
    french: "Ambrée",
    signature:
      "Sweet, soft, powdery and warm: vanilla, labdanum, balsams, musks, resins and animalic notes. Edwards renamed the family 'Amber' in 2021.",
    keyMaterials: ["vanillin", "ethyl-vanillin", "coumarin", "labdanum-abs", "benzoin-resinoid", "ambroxan", "galaxolide", "tolu-balsam"],
    subfamilies: [
      { name: "Amber / oriental classique", character: "The ambreine accord — bergamot, vanillin, coumarin, civet — plus woods and rose. Shalimar." },
      { name: "Oriental épicé / spicy", character: "Clove, cinnamon, pepper dominant. Opium." },
      { name: "Oriental floral / floriental", character: "Sweet oriental with a heavy floral heart, often tuberose. Loulou, Poison." },
      { name: "Oriental vanillé / gourmand", character: "Vanilla, caramel, coffee, chocolate pushed to the front." },
      { name: "Oriental boisé", character: "Sandalwood-led, the Must de Cartier / Samsara direction." },
      { name: "Oriental fougère", character: "A lavender-coumarin core inside an oriental envelope — most modern 'blue' masculines." },
    ],
    anchor: { name: "Shalimar", house: "Guerlain", year: 1925 },
    history:
      "Calkin & Jellinek divide the family into two distinct engines, which is more useful than any list of sub-families. The first is the ambreine accord (Shalimar, Must de Cartier, Obsession). The second is the mellis accord — benzyl salicylate with eugenol, patchouli and hydroxycitronellal, plus spices, woods and coumarin (Youth Dew, Opium, Coco). Opium is interesting precisely because it joins the two.",
  },
  {
    id: "leather",
    name: "Leather",
    french: "Cuir",
    signature:
      "A dry, smoky, tanned-hide impression: birch tar, castoreum, isobutyl quinoline, tobacco, styrax.",
    keyMaterials: ["isobutyl-quinoline", "castoreum-abs", "birch-tar", "labdanum-abs", "tobacco-abs", "styrax-oil", "cumin-oil"],
    subfamilies: [
      { name: "Cuir de Russie", character: "Birch tar and castoreum softened by iris and jasmine — the classic Russian leather." },
      { name: "Leather floral", character: "Leather heart with a prominent floral, usually jasmine." },
      { name: "Leather smoky / burnt wood", character: "Tar, incense, cade — austere and modern." },
      { name: "Leather suede / soft", character: "Softer, powdery hide; Cabochard's commercial direction after Bandit." },
    ],
    anchor: { name: "Cuir de Russie", house: "Chanel", year: 1924 },
    history:
      "The hardest family to work in today for ethical rather than olfactory reasons: the traditional materials are castoreum (beaver) and birch tar (PAH content). Modern leather accords are built on isobutyl quinoline, synthetic bases, tobacco, labdanum and styrax instead.",
  },
];

/* ------------------------------------------------------------------ */

export function getFamily(id: SfpFamily | string): Family | undefined {
  return families.find((f) => f.id === id);
}

/** Michael Edwards' Fragrance Wheel, for cross-referencing retail language. */
export const edwardsWheel = {
  groups: [
    {
      name: "Fresh",
      families: ["Citrus", "Water", "Green", "Fruity"],
      note: "Renamed from 'Oriental' → the amber families sit opposite these on the wheel.",
    },
    { name: "Floral", families: ["Floral", "Soft Floral", "Floral Amber"], note: "The largest family by volume." },
    { name: "Amber", families: ["Soft Amber", "Amber", "Woody Amber"], note: "Formerly 'Oriental'; renamed 2021." },
    { name: "Woody", families: ["Woods", "Mossy Woods", "Dry Woods", "Aromatic Fougère"], note: "Aromatic Fougère sits here rather than under Fresh." },
  ],
  note:
    "Four groups, fourteen families, arranged so that adjacent families share character and blend easily. It is a shopping and briefing tool, not a formulation tool.",
} as const;

/**
 * Ellena's nine odour *fields*, for classifying single materials rather
 * than finished perfumes. Each field names the molecule(s) that define it —
 * that is the genuinely useful part of the system, because it tells you
 * which material to reach for.
 */
export const ellenaOdorFields = [
  {
    id: "flower" as const,
    name: "Flowers",
    subgroups: [
      { name: "Rose flowers", definedBy: "Phenylethyl alcohol and geraniol", examples: "Rose, geranium, hyacinth, lily of the valley, peony" },
      { name: "White flowers", definedBy: "Methyl anthranilate + indole", examples: "Orange flower, jasmine, tuberose, sweet pea, gardenia, honeysuckle" },
      { name: "Yellow flowers", definedBy: "Beta-ionone (from carotene breakdown)", examples: "Freesia, wallflower, cassia absolute, osmanthus absolute" },
      { name: "Exotic / spiced flowers", definedBy: "Benzyl salicylate + eugenol", examples: "Carnation, lily, ylang-ylang" },
      { name: "Anise flowers", definedBy: "Anisaldehyde or heliotropin", examples: "Mimosa, lilac, wisteria" },
    ],
  },
  {
    id: "fruit" as const,
    name: "Fruits",
    subgroups: [
      { name: "Citrus", definedBy: "Expressed peel oils", examples: "Lemon, bergamot, orange" },
      { name: "Orchard fruits", definedBy: "Aldehyde C14, fructone", examples: "Peach, apple, pear" },
      { name: "Soft fruits", definedBy: "Blackcurrant absolute, frambinone", examples: "Raspberry, blackcurrant, strawberry" },
    ],
  },
  {
    id: "wood" as const,
    name: "Woods",
    subgroups: [
      { name: "Sandal", definedBy: "Sandalwood oil", examples: "Mysore, Australian sandalwood" },
      { name: "Patchouli", definedBy: "Patchouli oil", examples: "Indonesia, India" },
      { name: "Vetiver", definedBy: "Vetiver oil, vetiveryl acetate", examples: "Haiti, Java, Réunion" },
      { name: "Cedar", definedBy: "Virginia and Atlas cedarwood", examples: "Pencil-shavings, warm cedar" },
      { name: "Lichen", definedBy: "Oakmoss absolute", examples: "Evernia prunastri" },
    ],
  },
  {
    id: "grass" as const,
    name: "Grasses",
    subgroups: [
      { name: "Green / fresh-cut grass", definedBy: "Hexenol, galbanum oil", examples: "Cut stem, pea pod, leaf" },
      { name: "Aromatic", definedBy: "Lavender, rosemary, thyme", examples: "Herbal, camphoraceous" },
      { name: "Aniseed", definedBy: "Basil, tarragon, anise", examples: "Estragole-driven" },
    ],
  },
  {
    id: "spice" as const,
    name: "Spices",
    subgroups: [
      { name: "Cool spices", definedBy: "Pepper, cardamom, nutmeg, pink pepper", examples: "Terpenic, camphoraceous" },
      { name: "Hot spices", definedBy: "Cinnamon, clove, pimento", examples: "Phenolic, warm" },
    ],
  },
  {
    id: "sweet" as const,
    name: "Sweet products",
    subgroups: [
      { name: "Vanillas", definedBy: "Vanilla absolute, vanillin, benzoin resinoid", examples: "Creamy, balsamic" },
      { name: "Coumarins", definedBy: "Tonka absolute, coumarin", examples: "Hay, almond, tobacco" },
      { name: "Musks", definedBy: "Synthetic musks", examples: "Clean, powdery, skin-like" },
    ],
  },
  {
    id: "animal" as const,
    name: "Animal products",
    subgroups: [
      { name: "Ambers", definedBy: "Labdanum absolute, cistus oil", examples: "Warm, balsamic, leathery" },
      { name: "Castoreums", definedBy: "Castoreum absolute, birch tree oil", examples: "Smoky, tarry" },
      { name: "Civets", definedBy: "Civet, skatole, indole", examples: "Faecal at strength, radiant in dilution" },
    ],
  },
  {
    id: "marine" as const,
    name: "Marine products",
    subgroups: [{ name: "Marine", definedBy: "Seaweed absolute, Calone", examples: "Briny, ozonic, watermelon-rind" }],
  },
  {
    id: "mineral" as const,
    name: "Minerals",
    subgroups: [{ name: "Aldehydic", definedBy: "Aliphatic aldehydes", examples: "Waxy, soapy, metallic-fresh" }],
  },
];

/**
 * Ellena's second, orthogonal system: describing odours with words borrowed
 * from *touch* rather than from the source object. Worth keeping because it
 * gives a beginner a vocabulary that does not depend on having smelled
 * anything yet.
 */
export const tactileVocabulary = [
  "hard",
  "soft",
  "cold",
  "hot",
  "velvety",
  "dry",
  "flat",
  "sharp",
  "silky",
  "prickly",
  "gentle",
  "thin",
  "heavy",
  "light",
  "harsh",
  "fragile",
  "oily",
  "greasy",
] as const;

/**
 * Ellena's alternative typology for *finished* perfumes — classification by
 * perceived form rather than by constituent materials. He proposes this
 * because he does not believe material-based classification actually
 * communicates anything to someone who has not smelled the materials.
 */
export const ellenaForms = [
  { name: "Baroque", character: "Exaggeration and occupied space; tension created by accentuating detail." },
  { name: "Classical", character: "Perfumes that have become emblems and archetypes." },
  { name: "Abstract", character: "Does not imitate nature in any way." },
  { name: "Figurative", character: "Seeks a faithful representation of one specific odour." },
  { name: "Narrative", character: "Tells a story; describes a place or a journey." },
  { name: "Minimalist", character: "Expresses odour for its own sake, stripped of sentiment." },
] as const;

/**
 * Carles' structural triangle, as described in Calkin & Jellinek ch. 9.
 * The proportions apply to a compound intended for dilution at 12-18% in
 * alcohol. They are a starting point, not a rule — the book is explicit
 * that the optimum dosage differs per compound and must be found by trial.
 */
export const carlesTriangle = {
  top: { label: "Top notes", share: "most volatile", role: "Immediate impact; disappears in minutes to ~2 hours." },
  heart: { label: "Middle / modifying notes", share: "medium volatility", role: "The character; 2-8 hours." },
  base: {
    label: "Base notes",
    share: "least volatile",
    role: "The heart of the perfume must live here, because this is what remains on skin for hours. Many base materials smell unpleasant neat — it is the job of the modifiers and top notes to subdue and round them off.",
  },
  note:
    "Two competing modern structures. (1) Carles: three layers of differing volatility, giving transparency and a three-dimensional unfolding — L'Air du Temps, Ma Griffe, Cabochard. (2) Grojsman: as few as four or five materials forming up to ~80% of the formula, with bases and naturals arranged around them for richness — no traditional fresh top note at all, so the character arrives immediately on application. Trésor is the textbook case: methyl ionone, Iso E Super, Hedione and Galaxolide make up roughly 80%.",
} as const;

/**
 * Concentration classes. Two sources disagree slightly and both are worth
 * carrying: the ranges below are Ellena's (ch. IX), with the practical
 * dilution window Calkin & Jellinek give for the Carles triangle.
 */
export const concentrations = [
  { id: "extrait" as const, label: "Extrait / Parfum", min: 15, max: 35, typical: 20, note: "The concentrate itself; often a different formula from the EDT." },
  { id: "eau-de-parfum" as const, label: "Eau de Parfum", min: 10, max: 20, typical: 15, note: "" },
  { id: "eau-de-toilette" as const, label: "Eau de Toilette", min: 5, max: 20, typical: 10, note: "US 'cologne' ≈ European eau de toilette." },
  { id: "eau-de-cologne" as const, label: "Eau de Cologne", min: 2, max: 4, typical: 3, note: "" },
  { id: "eau-fraiche" as const, label: "Eau Fraîche", min: 1, max: 3, typical: 2, note: "Not in Ellena's list; included for completeness." },
] as const;

/**
 * Ellena's dose ladder. He formulates on a 1,000 g base so proportions are
 * memorable, and refuses to change a proportion by less than a factor of
 * two — sub-factor-of-two changes are below the threshold at which he can
 * smell the difference, so they only add noise to the record.
 */
export const ellenaDoseScale: readonly number[] = [1, 2, 3, 5, 7, 10, 15, 20, 30, 50, 70, 100, 150, 200, 300];
