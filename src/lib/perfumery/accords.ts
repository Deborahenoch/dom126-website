/**
 * DOM126 Perfumery Atlas — accords.
 *
 * WHAT THESE ARE
 *   Structural building blocks, expressed in parts out of 1000 so they drop
 *   straight into the Formula Vault. Each is a *starting point*: the whole
 *   point of an accord is that you then balance it by nose.
 *
 * WHERE THEY COME FROM
 *   - The qualitative architecture (which materials belong in a rose, what
 *     defines a chypre, the carnation pairing) is taken from R. R. Calkin &
 *     J. S. Jellinek, "Perfumery: Practice and Principles" (Wiley, 1994),
 *     chs. 6, 9, 10 and 12, and from J-C. Ellena, "Perfume: The Alchemy of
 *     Scent" (2011), ch. IV.
 *   - Calkin & Jellinek deliberately publish their floral accords as
 *     "compounding notes" — a list of core materials plus permitted
 *     variants and modifiers, *without* proportions. That is a teaching
 *     choice and a good one. The parts below are therefore conventional
 *     starting proportions assembled by us, NOT figures from either book.
 *     They are marked `provenance` accordingly.
 *   - Where a ratio IS documented in the literature it is quoted in the
 *     accord's `summary` or in `classics.ts`, and attributed there.
 *
 * HOW TO USE THEM (Calkin & Jellinek's method, ch. 6)
 *   1. Start as simple as possible — only enough materials to establish the
 *      essential character. Bases intended as a major part of a perfume
 *      should usually be under 15 materials, often far fewer. Over-complex
 *      bases cause "muddiness" and loss of impact.
 *   2. Balance the core by nose, then add modifiers two or three at a time.
 *   3. Use a large proportion of *highly characteristic* materials. If a
 *      base is made only from generally-used materials (phenylethyl alcohol,
 *      hydroxycitronellal, benzyl acetate, phenylacetaldehyde, citronellol,
 *      hexyl cinnamic aldehyde, terpineol, indole — the eight that between
 *      them can make jasmine, lilac, muguet or hyacinth depending on
 *      proportion) it loses its identity and gives a nondescript floral.
 *   4. Judge a base by whether it survives inside a composition, not by how
 *      nice it smells alone. A beautiful base that collapses in the finished
 *      perfume is worthless — many hyacinth bases fail exactly this way,
 *      reducing to a mere green effect.
 */

import type { Accord } from "./types";

export const accords: Accord[] = [
  /* ================================================================ */
  /* STRUCTURAL — the great load-bearing accords                       */
  /* ================================================================ */
  {
    id: "carnation",
    name: "Carnation accord",
    kind: "structural",
    family: "flower",
    summary:
      "Benzyl salicylate + eugenol, at roughly 4½ : 1 — the documented ratio at the heart of L'Air du Temps (benzyl salicylate 15%). Add ylang to complete the basic carnation note. Isoeugenol deepens it but is now tightly IFRA-restricted, so a modern build leans harder on eugenol plus ylang.",
    components: [
      { materialId: "benzyl-salicylate", parts: 450, role: "Soft balsamic carrier; half of the defining pair" },
      { materialId: "eugenol", parts: 100, role: "The spicy-phenolic half of the defining pair" },
      { materialId: "ylang-oil", parts: 120, role: "Completes the carnation; softens the eugenol" },
      { materialId: "isoeugenol", parts: 40, role: "Depth and sweetness — reduce or omit for strict IFRA compliance" },
      { materialId: "phenylethyl-alcohol", parts: 80, role: "Rounds the phenolic edge" },
      { materialId: "hydroxycitronellal", parts: 60, role: "Sweet floral bridge" },
      { materialId: "vanillin", parts: 8, role: "Trace — Calkin & Jellinek cite vanillin, heliotropin and orris as the three trace materials that complete the carnation character" },
      { materialId: "heliotropin", parts: 8, role: "Trace finish" },
      { materialId: "orris-resinoid", parts: 4, role: "Trace lift and finish" },
      { materialId: "benzyl-benzoate", parts: 130, role: "Diluent and blender" },
    ],
    variants: [
      { insteadOf: "isoeugenol", use: "eugenol (increased)", effect: "Fully compliant but flatter; compensate with a trace of clove bud oil for naturalness." },
      { insteadOf: "heliotropin", use: "anisaldehyde", effect: "Powdery rather than cherry-almond; reads more like a vintage lilac-carnation." },
      { insteadOf: "benzyl-benzoate", use: "benzyl salicylate (increased)", effect: "Richer, more substantive, but pushes the salicylate further forward." },
    ],
    provenance:
      "Ratio and trace-material practice documented in Calkin & Jellinek ch. 12 (L'Air du Temps). Proportions assembled here.",
  },
  {
    id: "mellis",
    name: "Mellis accord",
    kind: "structural",
    family: "amber",
    summary:
      "One of the two great oriental engines: benzyl salicylate + eugenol, extended with patchouli, hydroxycitronellal, spices, woods and coumarin. Basis of the de Laire specialties Melysflor and Pimenal; the structural frame of Youth Dew, Opium and Coco. Documented loadings in Opium: benzyl salicylate 12%, patchouli 8%, hydroxycitronellal 10%, coumarin 2.5%.",
    components: [
      { materialId: "benzyl-salicylate", parts: 198, role: "Sweet balsamic spine" },
      { materialId: "eugenol", parts: 60, role: "Spicy warmth" },
      { materialId: "patchouli-oil", parts: 119, role: "Earthy depth; the mellis-defining pairing is with hydroxycitronellal" },
      { materialId: "hydroxycitronellal", parts: 129, role: "Sweet floral; check current IFRA limit" },
      { materialId: "coumarin", parts: 40, role: "Hay-sweet link between mellis and ambreine" },
      { materialId: "vanillin", parts: 30, role: "Sweetness and smoothing" },
      { materialId: "labdanum-abs", parts: 69, role: "Amber-leathery depth" },
      { materialId: "vertofix", parts: 89, role: "Modern woody; Vertofix replaced vetiveryl acetate here from the 1960s" },
      { materialId: "galaxolide", parts: 119, role: "Clean musk volume" },
      { materialId: "clove-bud-oil", parts: 15, role: "Spice reinforcement" },
      { materialId: "cinnamon-bark-oil", parts: 8, role: "Spice; strict IFRA limit on cinnamal" },
      { materialId: "benzoin-resinoid", parts: 79, role: "Balsamic sweetness" },
      { materialId: "rose-abs", parts: 25, role: "Natural richness" },
      { materialId: "cis-3-hexenyl-salicylate", parts: 20, role: "Modern green-salicylate lift" },
    ],
    variants: [
      { insteadOf: "hydroxycitronellal", use: "helional + citronellol", effect: "Compliant muguet replacement; greener and more watery, loses some of the honeyed weight." },
      { insteadOf: "amyl-salicylate (if used)", use: "cis-3-hexenyl-salicylate", effect: "The documented modern substitution — amyl salicylate has largely fallen out of favour in fine perfumery." },
      { insteadOf: "vertofix", use: "vetiveryl-acetate", effect: "More elegant, more expensive, more vintage." },
    ],
    provenance:
      "Composition and documented loadings from Calkin & Jellinek ch. 12 (Youth Dew, Opium, Coco). Proportions assembled here.",
  },
  {
    id: "ambreine",
    name: "Ambreine accord",
    kind: "structural",
    family: "amber",
    summary:
      "The other great oriental engine, and the older one: bergamot + vanillin (or ethyl vanillin) + coumarin + civet, usually with woody and rose notes. Shalimar's frame. Documented loadings there: bergamot-led citrus ~30%, coumarin 9%, ethyl vanillin 3%, patchouli 4%. Ethyl vanillin is roughly 3-4× the strength of vanillin, so 10-12% vanillin is a normal equivalent.",
    components: [
      { materialId: "bergamot-oil", parts: 350, role: "The defining citrus top; also acts against the sweetness" },
      { materialId: "lemon-oil", parts: 50, role: "Citrus lift" },
      { materialId: "petitgrain-oil", parts: 31, role: "Green-orange facet, bridges top to heart" },
      { materialId: "ethyl-vanillin", parts: 37, role: "Or use vanillin at 3-4× this level" },
      { materialId: "coumarin", parts: 112, role: "Hay-sweet pillar" },
      { materialId: "labdanum-abs", parts: 87, role: "Amber-leather heart" },
      { materialId: "patchouli-oil", parts: 50, role: "Documented at 4% in Shalimar" },
      { materialId: "sandalwood-oil", parts: 62, role: "Creamy woody" },
      { materialId: "vetiver-oil", parts: 44, role: "Dry woody counterweight to the sweetness" },
      { materialId: "rose-abs", parts: 31, role: "The orientals in this group are among the least floral of perfumes — rose is used sparingly" },
      { materialId: "castoreum-abs", parts: 7, role: "The leather aspect; substitute a synthetic leather base" },
      { materialId: "ambroxan", parts: 56, role: "Modern ambergris replacement" },
      { materialId: "vanilla-abs", parts: 15, role: "Naturalness behind the ethyl vanillin" },
      { materialId: "benzoin-resinoid", parts: 62, role: "Balsamic sweetness" },
      { materialId: "cinnamon-bark-oil", parts: 6, role: "Spice that fits the leather" },
    ],
    variants: [
      { insteadOf: "castoreum-abs", use: "isobutyl-quinoline (trace) + labdanum", effect: "Ethical and legal substitute for the leather facet; less animalic, more mineral." },
      { insteadOf: "civet (traditional)", use: "indole (trace) + ambroxan", effect: "The civet of the original ambreine accord is not usable today. A trace of indole gives some of the radiant animalic bloom." },
      { insteadOf: "ethyl-vanillin", use: "vanillin ×3.5", effect: "Softer, less caramel; closer to what a 1925 tincture-based formula would have given." },
    ],
    provenance:
      "Composition and documented loadings from Calkin & Jellinek ch. 12 (Shalimar, Must de Cartier, Obsession). Proportions assembled here.",
  },
  {
    id: "chypre",
    name: "Chypre accord (classical)",
    kind: "structural",
    family: "chypre",
    summary:
      "Bergamot top over oakmoss + labdanum + patchouli, with a jasmine heart, plus vetiveryl acetate, methyl ionone and animalic notes. Derived from Coty's Chypre (1917). In Miss Dior this central accord makes up some 60% of the formula — a useful sense of how much of a chypre the accord actually is.",
    components: [
      { materialId: "bergamot-oil", parts: 233, role: "The bright top; without it there is no chypre" },
      { materialId: "lemon-oil", parts: 32, role: "Citrus lift" },
      { materialId: "oakmoss-abs", parts: 95, role: "The soul of the family — IFRA restricted, so use a low-atranol grade plus Evernyl" },
      { materialId: "evernyl", parts: 26, role: "Synthetic moss reinforcement" },
      { materialId: "labdanum-abs", parts: 74, role: "Amber-leather" },
      { materialId: "patchouli-oil", parts: 95, role: "Earthy depth; 10% in Miss Dior" },
      { materialId: "vetiveryl-acetate", parts: 63, role: "Elegant woody" },
      { materialId: "methyl-ionone", parts: 63, role: "Powdery bridge between heart and base" },
      { materialId: "hydroxycitronellal", parts: 74, role: "Muguet in the floral heart" },
      { materialId: "hedione", parts: 63, role: "Jasmine radiance" },
      { materialId: "benzyl-acetate", parts: 37, role: "Jasmine top facet" },
      { materialId: "rose-abs", parts: 21, role: "Floral richness" },
      { materialId: "aldehyde-c14", parts: 16, role: "Fruity-chypre facet, as in Mitsouko and Femme" },
      { materialId: "coumarin", parts: 32, role: "Hay sweetness" },
      { materialId: "isobutyl-quinoline", parts: 13, role: "Leather-earthy; the Bandit/Cabochard direction" },
      { materialId: "galaxolide", parts: 63, role: "Modern musk; historically musk ketone" },
    ],
    variants: [
      { insteadOf: "oakmoss-abs", use: "evernyl + treemoss (low-atranol) + patchouli", effect: "Compliant, but loses the damp-inky depth. This is the single hardest substitution in perfumery today and the reason classical chypres are commercially rare." },
      { insteadOf: "hydroxycitronellal", use: "helional + citronellol", effect: "Greener, more watery muguet." },
      { insteadOf: "aldehyde-c14", use: "gamma-decalactone + damascone-alpha (trace)", effect: "More apricot, less creamy-peach." },
      { insteadOf: "isobutyl-quinoline", use: "castoreum-free leather base", effect: "Softer leather." },
    ],
    provenance:
      "Composition from Calkin & Jellinek ch. 12 (Chypre, Ma Griffe, Miss Dior, Cabochard). Proportions assembled here.",
  },
  {
    id: "fougere",
    name: "Fougère accord",
    kind: "structural",
    family: "fougere",
    summary:
      "Lavender + coumarin + oakmoss with bergamot and geranium. A fantasy accord with no reference in nature — the name is evocative only. The architecture of nearly every masculine fragrance since Fougère Royale (1882).",
    components: [
      { materialId: "lavender-oil", parts: 220, role: "The fresh aromatic pole" },
      { materialId: "linalyl-acetate", parts: 90, role: "Extends and sweetens the lavender" },
      { materialId: "linalool", parts: 70, role: "Fresh floral-woody bridge" },
      { materialId: "coumarin", parts: 180, role: "The sweet hay pole — the other half of the accord" },
      { materialId: "tonka-abs", parts: 40, role: "Natural richness behind the coumarin" },
      { materialId: "oakmoss-abs", parts: 70, role: "Mossy base; restricted" },
      { materialId: "evernyl", parts: 20, role: "Moss reinforcement" },
      { materialId: "bergamot-oil", parts: 130, role: "Citrus top" },
      { materialId: "geranium-oil", parts: 55, role: "Rosy-minty heart, links lavender to the base" },
      { materialId: "vertofix", parts: 60, role: "Woody fixation" },
      { materialId: "galaxolide", parts: 50, role: "Musk volume" },
      { materialId: "clary-sage-oil", parts: 15, role: "Herbal-amber warmth" },
    ],
    variants: [
      { insteadOf: "lavender-oil", use: "lavandin-oil", effect: "Cheaper and sharper; more camphoraceous, less sweet. Standard for functional products." },
      { insteadOf: "oakmoss-abs", use: "evernyl + patchouli (trace)", effect: "Compliant but flatter." },
      { insteadOf: "coumarin", use: "tonka-abs (increased)", effect: "Richer and more natural, far more expensive, less tenacious." },
    ],
    provenance:
      "Family definition from the SFP classification as described in Ellena ch. VI; lavender/coumarin/oakmoss/bergamot/geranium core named there and in Calkin & Jellinek ch. 12 (Fougère Royal, Canoe). Proportions assembled here.",
  },
  {
    id: "floral-aldehydic",
    name: "Floral-aldehydic accord",
    kind: "structural",
    family: "floral",
    summary:
      "A block of aliphatic aldehydes over a floral (rose / muguet / jasmine) heart with woody, musk and amber base. The aldehydes totalled nearly 1% in Chanel No. 5, which was the milestone — but note that Calandre, also classed in this family, uses only ~0.2% of C10 + C12 lauric, and White Linen returns to ~1%. The aldehyde level is a dial, not a rule.",
    components: [
      { materialId: "aldehyde-c10", parts: 8, role: "Citrus-waxy lift" },
      { materialId: "aldehyde-c11-undecylenic", parts: 10, role: "The most useful of the aliphatics; bridges top to heart" },
      { materialId: "aldehyde-c12-lauric", parts: 8, role: "Soapy-waxy body" },
      { materialId: "aldehyde-c12-mna", parts: 6, role: "Amber-aldehydic" },
      { materialId: "bergamot-oil", parts: 119, role: "Traditional top, with linalool and linalyl acetate" },
      { materialId: "linalool", parts: 54, role: "Rosewood facet" },
      { materialId: "linalyl-acetate", parts: 44, role: "Fresh floral-citrus" },
      { materialId: "ylang-oil", parts: 59, role: "Essential for softening the chemical harshness of the aldehydes; forms a documented 1:1 combination with methyl ionone in Chanel No. 5" },
      { materialId: "methyl-ionone", parts: 59, role: "1:1 with ylang in No. 5; powdery bridge" },
      { materialId: "hydroxycitronellal", parts: 89, role: "Muguet — 10% in both No. 5 and Ma Griffe" },
      { materialId: "phenylethyl-alcohol", parts: 54, role: "Rose alcohols" },
      { materialId: "citronellol", parts: 40, role: "Rose" },
      { materialId: "geraniol", parts: 35, role: "Rose" },
      { materialId: "hedione", parts: 59, role: "Jasmine radiance (post-1960s builds)" },
      { materialId: "hexyl-cinnamal", parts: 59, role: "Jasmine bulk" },
      { materialId: "vetiveryl-acetate", parts: 54, role: "The classic woody base of the family" },
      { materialId: "sandalwood-oil", parts: 44, role: "Creamy wood" },
      { materialId: "coumarin", parts: 40, role: "5% in No. 5, reduced in Arpège and successors" },
      { materialId: "vanillin", parts: 15, role: "1.5% in No. 5; the family splits on whether vanillin is significant" },
      { materialId: "labdanum-abs", parts: 30, role: "Ciste/labdanum oil brings natural radiance against the chemical harshness of the aldehydes" },
      { materialId: "galaxolide", parts: 79, role: "Modern replacement for the nitromusks (a little over 10% in No. 5)" },
      { materialId: "oakmoss-abs", parts: 35, role: "Present from Madame Rochas onward — a new direction within the family" },
    ],
    variants: [
      { insteadOf: "vanillin", use: "heliotropin", effect: "The Madame Rochas move: heliotropin backs up coumarin instead of vanillin, and complements both lilac and carnation." },
      { insteadOf: "vetiveryl-acetate", use: "vertofix", effect: "The White Linen move — Vertofix 20% replaced vetiveryl acetate as the main woody material." },
      { insteadOf: "hydroxycitronellal", use: "hexyl-cinnamal + phenylacetaldehyde glycerol acetal", effect: "The Madame Rochas muguet base (15%) augmenting hydroxycitronellal." },
      { insteadOf: "musk-ketone", use: "galaxolide + cyclopentadecanolide", effect: "Modern practice uses a combination of chemically different musk types rather than one; more natural and more interesting." },
    ],
    provenance:
      "Composition, ratios and documented loadings from Calkin & Jellinek ch. 12 (Chanel No. 5, Arpège, Madame Rochas, Calandre, Rive Gauche, White Linen). Proportions assembled here. Note: aldehydes form hemi-acetals in ethanol and need a considerable maturation period before the composition can be judged — Ma Griffe is cited as difficult to assess when first put into alcohol for exactly this reason.",
  },
  {
    id: "hedione-patchouli",
    name: "Hedione–patchouli accord (modern)",
    kind: "modern",
    family: "patchouli-floral",
    summary:
      "The most influential pairing of the last fifty years. Hedione's ability to combine with almost anything produced a whole family built on its relationship with patchouli: Eau Sauvage, Diorella, Aromatics Elixir, Coriandre, Knowing, Paloma Picasso. Documented loadings in Diorella: Hedione 10%, patchouli 6%, Helional 5%. In Paloma Picasso the four majors — patchouli, Hedione, rose, hydroxycitronellal — run at roughly 2 : 1 : 2 : 2, with Vertofix 2 and Lyral 1 on the same scale.",
    components: [
      { materialId: "hedione", parts: 141, role: "Radiance and transparency" },
      { materialId: "patchouli-oil", parts: 157, role: "Earthy depth — the defining partner" },
      { materialId: "hydroxycitronellal", parts: 110, role: "Forms another important accord with patchouli in its own right" },
      { materialId: "rose-abs", parts: 47, role: "Rose is much more emphasised here than in Diorella" },
      { materialId: "phenylethyl-alcohol", parts: 71, role: "Rose alcohols" },
      { materialId: "citronellol", parts: 47, role: "Rose" },
      { materialId: "geraniol", parts: 35, role: "Rose" },
      { materialId: "helional", parts: 47, role: "Watery freshness; 5% in Diorella" },
      { materialId: "eugenol", parts: 16, role: "Makes an accord with Hedione and Helional in Diorella" },
      { materialId: "methyl-ionone", parts: 55, role: "Present in every member of this family" },
      { materialId: "vetiver-oil", parts: 39, role: "Woody" },
      { materialId: "vetiveryl-acetate", parts: 31, role: "Woody elegance" },
      { materialId: "vertofix", parts: 63, role: "Main woody material in Paloma Picasso" },
      { materialId: "cis-jasmone", parts: 12, role: "2% in Diorella — jasmine realism" },
      { materialId: "hexyl-cinnamal", parts: 55, role: "Jasmine bulk" },
      { materialId: "oakmoss-abs", parts: 24, role: "Mossy; colourless grades were used in Diorella" },
      { materialId: "galaxolide", parts: 47, role: "Musk — deliberately low, since the comparative lack of musk and animalics is what separates this group from the chypres" },
      { materialId: "castoreum-abs", parts: 3, role: "Sweet leathery note in Paloma Picasso — substitute" },
    ],
    variants: [
      { insteadOf: "hedione", use: "magnolia-type hedione analogue", effect: "Coriandre uses a closely related material with a rather more jasminic character, at some 20% of the formula with 10% patchouli." },
      { insteadOf: "hydroxycitronellal", use: "helional + citronellol", effect: "Compliant; Diorella is remarkable for the near-absence of hydroxycitronellal altogether." },
      { insteadOf: "cis-jasmone", use: "hedione (increased) + benzyl acetate", effect: "Cheaper jasmine direction." },
    ],
    provenance:
      "Composition, ratios and loadings from Calkin & Jellinek ch. 12. Proportions assembled here.",
  },
  {
    id: "grojsman",
    name: "Grojsman-type minimal accord",
    kind: "modern",
    family: "floral",
    summary:
      "The modern structure: as few as four or five materials forming up to ~80% of the formula, with bases and naturals arranged around them for richness. Trésor is the textbook case — methyl ionone, Iso E Super, Hedione and Galaxolide make up roughly 80%. Frequently there is no traditional fresh top note at all, replaced by trace amounts of intensely powerful materials, so the character arrives immediately on skin rather than after the top evaporates. That is a commercial advantage in a department store, and it is also why these perfumes smell more-or-less unchanged for hours.",
    components: [
      { materialId: "methyl-ionone", parts: 224, role: "Powdery woody-floral" },
      { materialId: "iso-e-super", parts: 222, role: "Velvety amber-woody; the diffusion engine" },
      { materialId: "hedione", parts: 222, role: "Transparent floral radiance" },
      { materialId: "galaxolide", parts: 222, role: "Clean musk volume" },
      { materialId: "rose-abs", parts: 22, role: "Natural richness around the simple core" },
      { materialId: "phenylethyl-alcohol", parts: 44, role: "Rose alcohols" },
      { materialId: "cassis-abs", parts: 3, role: "Trace powerful material replacing a fresh top note" },
      { materialId: "patchouli-oil", parts: 28, role: "Depth" },
      { materialId: "vanillin", parts: 13, role: "Sweet smoothing" },
    ],
    variants: [
      { insteadOf: "galaxolide", use: "habanolide", effect: "More elegant, less 'laundry'; costs more." },
      { insteadOf: "cassis-abs", use: "damascone-alpha (trace)", effect: "Fruity-rosy top impact at similar power levels." },
      { insteadOf: "iso-e-super", use: "kephalis + iso-e-super (halved each)", effect: "More tenacious, more tobacco-leathery." },
    ],
    provenance:
      "Structure and the Trésor example from Calkin & Jellinek ch. 9. Proportions assembled here.",
  },

  /* ================================================================ */
  /* FLORAL BASES                                                     */
  /* ================================================================ */
  {
    id: "rose-base",
    name: "Rose base",
    kind: "floral-base",
    family: "flower",
    summary:
      "Ellena defines the whole rose-flower field by two molecules: phenylethyl alcohol and geraniol. Calkin & Jellinek's compounding notes for rose give nine functional groups — rose alcohols and esters, other rose chemicals (rose oxides, damascones), floral modifiers, green notes, aldehydic notes, citrus notes, spicy notes, carbinols, and honey notes. A documented working rose base (Coriandre, ~10% of the formula): phenylethyl alcohol, citronellol, geraniol, geranyl acetate, honey notes such as ethyl phenylacetate and phenylethyl phenylacetate, phenylacetaldehyde, rosatol, camomile, violet leaf.",
    components: [
      { materialId: "phenylethyl-alcohol", parts: 308, role: "The soft rosy backbone" },
      { materialId: "citronellol", parts: 201, role: "Fresh dry rose" },
      { materialId: "geraniol", parts: 178, role: "Sweet full rose — with phenylethyl alcohol, the defining pair" },
      { materialId: "nerol", parts: 59, role: "Fresh green-magnolia lift; unusually high in White Linen and Calandre" },
      { materialId: "geranyl-acetate", parts: 65, role: "Fruity-rosy freshness" },
      { materialId: "phenylacetaldehyde", parts: 30, role: "Green hyacinth facet — prefer the acetal for stability" },
      { materialId: "ionone-beta", parts: 24, role: "Violet-yellow flower facet" },
      { materialId: "damascone-alpha", parts: 4, role: "Trace — modern rosy-fruity power" },
      { materialId: "rose-oxide", parts: 2, role: "Trace metallic-green, as in Calandre" },
      { materialId: "eugenol", parts: 14, role: "Spicy clove facet, present in nearly all rose compounds" },
      { materialId: "ethyl-phenylacetate", parts: 9, role: "Honey note" },
      { materialId: "phenylethyl-phenylacetate", parts: 9, role: "Honey-waxy note" },
      { materialId: "violet-leaf-abs", parts: 7, role: "Green leaf realism" },
      { materialId: "dimethyl-benzyl-carbinyl-acetate", parts: 30, role: "Fresh fruity-plum lift" },
      { materialId: "rose-abs", parts: 24, role: "Natural rose — Calkin & Jellinek's standing advice for any largely synthetic rose" },
      { materialId: "phenylethyl-dimethyl-carbinol", parts: 30, role: "DMBCA — forms an important link between rose notes and woody materials; 2.5% in Paris" },
      { materialId: "citral", parts: 6, role: "Citrus facet" },
    ],
    variants: [
      { insteadOf: "phenylacetaldehyde", use: "phenylacetaldehyde dimethyl acetal", effect: "Far more stable; slightly softer green." },
      { insteadOf: "damascone-alpha", use: "cassis-abs (trace)", effect: "Fruity-green rather than tea-tobacco." },
      { insteadOf: "eugenol", use: "clove-bud-oil (trace)", effect: "More natural spice." },
      { insteadOf: "rose-abs", use: "geranium-oil", effect: "Cheaper, more minty-green, less honeyed." },
      { insteadOf: "violet-leaf-abs", use: "cis-3-hexenol (trace) + methyl heptine carbonate", effect: "Sharper green, less creamy." },
    ],
    provenance:
      "Group structure and the Coriandre rose base from Calkin & Jellinek chs. 6 and 12; field definition from Ellena ch. IV. Proportions assembled here. Calkin & Jellinek's challenge to the student: making a rose with 50% phenylethyl alcohol is no problem, but beginning with 20% diphenyl oxide is something of a challenge.",
  },
  {
    id: "jasmine-base",
    name: "Jasmine base",
    kind: "floral-base",
    family: "flower",
    summary:
      "Calkin & Jellinek give two basic formulas — a 'classic' and an 'absolute type' — plus variants. Classic: benzyl acetate, phenylethyl alcohol (+ acetate), hydroxycitronellal, linalool, geraniol, eugenol, amyl cinnamic aldehyde, aurantiol, indole, paracresol, aldehyde C14, maltol, ylang extra, Roman camomile, benzyl alcohol, benzyl benzoate. Absolute type shifts toward benzyl acetate, phenylethyl alcohol, Lilial, linalool, DMBCA, isoeugenol, cis-3-hexenyl acetate, violet leaf, cis-3-hexenyl benzoate, hexyl cinnamic aldehyde, Hedione, cis-jasmone, methyl anthranilate, paracresyl acetate, aldehyde C18, gamma-decalactone, cananga, foin, celery seed, immortelle, mimosa, benzoin, nerolidol, isophytol. Benzyl acetate + amyl cinnamic aldehyde + indole was the earliest jasmine imitation.",
    components: [
      { materialId: "benzyl-acetate", parts: 225, role: "Fresh sweet floral top — the earliest jasmine material" },
      { materialId: "hexyl-cinnamal", parts: 162, role: "Substantive floral bulk (classic used amyl cinnamic aldehyde)" },
      { materialId: "hedione", parts: 119, role: "Transparent radiance — the single biggest modern improvement to jasmine" },
      { materialId: "linalool", parts: 76, role: "Fresh floral-woody" },
      { materialId: "phenylethyl-alcohol", parts: 65, role: "Soft rosy blender" },
      { materialId: "hydroxycitronellal", parts: 65, role: "Sweet muguet facet" },
      { materialId: "benzyl-salicylate", parts: 86, role: "Soft balsamic blender and fixative" },
      { materialId: "indole", parts: 13, role: "The animalic-floral heart of real jasmine; faecal above ~1%" },
      { materialId: "methyl-anthranilate", parts: 11, role: "Orange-blossom facet; forms Schiff bases with the aldehydes" },
      { materialId: "paracresyl-acetate", parts: 4, role: "Animalic-leathery realism" },
      { materialId: "cis-jasmone", parts: 13, role: "Tea-celery jasmine character" },
      { materialId: "ylang-oil", parts: 32, role: "Creamy spicy-floral" },
      { materialId: "aldehyde-c14", parts: 11, role: "Fruity peach facet" },
      { materialId: "aldehyde-c18", parts: 9, role: "Creamy coconut facet (absolute type)" },
      { materialId: "cis-3-hexenyl-acetate", parts: 6, role: "Green freshness (absolute type)" },
      { materialId: "benzyl-alcohol", parts: 49, role: "Blender" },
      { materialId: "benzyl-benzoate", parts: 32, role: "Blender and diluent for the indole" },
      { materialId: "jasmine-abs", parts: 22, role: "Natural richness" },
    ],
    variants: [
      { insteadOf: "hydroxycitronellal", use: "helional + citronellol", effect: "Compliant; greener, less honeyed." },
      { insteadOf: "hexyl-cinnamal", use: "amyl-cinnamal", effect: "The classic version — greener and drier." },
      { insteadOf: "paracresyl-acetate", use: "paracresol (even smaller trace)", effect: "Harsher, more animalic; harder to control." },
      { insteadOf: "ylang-oil", use: "cananga-oil", effect: "Cheaper, rougher, more woody." },
      { insteadOf: "indole", use: "indole at half + methyl anthranilate at double", effect: "Softer, more orange-blossom, less faecal." },
    ],
    provenance:
      "Material groups and both basic formulas from Calkin & Jellinek ch. 6. Proportions assembled here.",
  },
  {
    id: "muguet-base",
    name: "Muguet (lily-of-the-valley) base",
    kind: "floral-base",
    family: "flower",
    summary:
      "Historically hydroxycitronellal, which formed the starting point for the whole muguet idea. Calkin & Jellinek's compounding notes add aldehydic notes (cyclamen aldehyde, muguet aldehyde, Dupical, C7, C10), linalool and its derivatives, phenylethyl alcohol and esters, rose alcohols, floral modifiers, green notes, floral cinnamic derivatives, sweet floral (heliotropin), indolic, naturals and blenders. Modern rebuilds must work around three restricted or banned materials: hydroxycitronellal (restricted), Lyral and Lilial (both prohibited in EU cosmetics).",
    components: [
      { materialId: "hydroxycitronellal", parts: 240, role: "The historic backbone — check the current IFRA limit before use" },
      { materialId: "helional", parts: 140, role: "Watery-fresh muguet; the main modern workhorse" },
      { materialId: "phenylethyl-alcohol", parts: 130, role: "Soft rosy blender" },
      { materialId: "linalool", parts: 90, role: "Fresh floral" },
      { materialId: "citronellol", parts: 80, role: "Rose-muguet bridge" },
      { materialId: "cyclamen-aldehyde", parts: 25, role: "Fresh green-floral cyclamen facet" },
      { materialId: "phenylacetaldehyde", parts: 20, role: "Green hyacinth lift — use the acetal for stability" },
      { materialId: "cis-3-hexenol", parts: 4, role: "Trace green stem freshness" },
      { materialId: "hexyl-cinnamal", parts: 70, role: "Floral cinnamic body" },
      { materialId: "benzyl-acetate", parts: 40, role: "Floral modifier" },
      { materialId: "geraniol", parts: 35, role: "Rose alcohols" },
      { materialId: "hedione", parts: 50, role: "Radiance" },
      { materialId: "heliotropin", parts: 12, role: "Sweet floral finish" },
      { materialId: "indole", parts: 3, role: "Trace floral-animalic depth" },
      { materialId: "farnesol", parts: 20, role: "Blender, linden-green" },
      { materialId: "benzyl-benzoate", parts: 41, role: "Blender" },
    ],
    variants: [
      { insteadOf: "hydroxycitronellal", use: "helional (increased) + citronellol + a trace of Dupical-type material", effect: "The compliant rebuild. Greener and more watery; loses some honeyed weight, so add a trace of beeswax absolute for roundness." },
      { insteadOf: "lyral or lilial (historic)", use: "helional + cyclamen-aldehyde", effect: "Both are prohibited in EU cosmetics. Any classic reconstruction using them must be re-engineered, not merely reduced." },
      { insteadOf: "phenylacetaldehyde", use: "phenylacetaldehyde glycerol acetal", effect: "The stable form used in the Madame Rochas and Calandre muguet bases." },
      { insteadOf: "hexyl-cinnamal", use: "amyl-cinnamal + linalyl cinnamate", effect: "Softer, more vintage." },
    ],
    provenance:
      "Material groups from Calkin & Jellinek ch. 6. Proportions assembled here. Regulatory status from EU Regulation 1223/2009 Annex II (Lyral, Lilial prohibited).",
  },
  {
    id: "lilac-base",
    name: "Lilac base",
    kind: "floral-base",
    family: "flower",
    summary:
      "One of the first flowers successfully imitated, from a combination of terpineol, heliotropin and cinnamic alcohol. Calkin & Jellinek's compounding notes add phenylethyl alcohol, ylang extra, muguet notes (hydroxycitronellal, Lilial, Lyral, cyclamen aldehyde, citronellol, geraniol), green notes (phenylacetaldehyde, syringa aldehyde, para-tolyl aldehyde, methyl acetophenone, cuminic aldehyde) and anisic notes (anisaldehyde, anisic alcohol, anisyl acetate). Ellena places lilac in his 'anise flowers' group, created using anisaldehyde or heliotropin.",
    components: [
      { materialId: "terpineol-alpha", parts: 280, role: "The lilac workhorse" },
      { materialId: "phenylethyl-alcohol", parts: 200, role: "Soft rosy sweetness" },
      { materialId: "hydroxycitronellal", parts: 130, role: "Muguet facet" },
      { materialId: "heliotropin", parts: 70, role: "Powdery-sweet; one of the three founding materials" },
      { materialId: "cinnamyl-alcohol", parts: 45, role: "Balsamic hyacinth; the third founding material" },
      { materialId: "anisaldehyde", parts: 30, role: "Anise-hawthorn facet — defines Ellena's anise-flower group" },
      { materialId: "ylang-oil", parts: 30, role: "Creamy floral" },
      { materialId: "phenylacetaldehyde", parts: 18, role: "Green hyacinth lift" },
      { materialId: "citronellol", parts: 45, role: "Rose facet" },
      { materialId: "geraniol", parts: 30, role: "Rose facet" },
      { materialId: "linalool", parts: 40, role: "Freshness" },
      { materialId: "benzyl-acetate", parts: 35, role: "Floral lift" },
      { materialId: "vanillin", parts: 8, role: "Sweet finish" },
      { materialId: "benzyl-benzoate", parts: 39, role: "Blender" },
    ],
    variants: [
      { insteadOf: "heliotropin", use: "anisaldehyde (increased) + vanillin (trace)", effect: "Avoids heliotropin's drug-precursor controls; loses some cherry-almond richness." },
      { insteadOf: "hydroxycitronellal", use: "helional + citronellol", effect: "Compliant; greener." },
      { insteadOf: "terpineol-alpha", use: "terpineol + a trace of methyl acetophenone", effect: "Adds the hawthorn-spicy facet from the green-notes group." },
    ],
    provenance:
      "Material groups from Calkin & Jellinek chs. 6 and 10; field placement from Ellena ch. IV. Proportions assembled here.",
  },
  {
    id: "hyacinth-base",
    name: "Hyacinth base",
    kind: "floral-base",
    family: "flower",
    summary:
      "Built from the same eight generally-used materials that make jasmine, lilac and muguet, in different proportions — which is exactly why hyacinth bases are the ones Calkin & Jellinek single out as disappointing: the fine floral character often reduces to a mere 'green' effect once the base goes into a composition. Judge a hyacinth base in the finished perfume, never alone.",
    components: [
      { materialId: "phenylacetaldehyde", parts: 120, role: "The defining green-floral; use the dimethyl acetal for stability" },
      { materialId: "phenylethyl-alcohol", parts: 200, role: "Rosy sweetness" },
      { materialId: "cis-3-hexenol", parts: 8, role: "Green stem" },
      { materialId: "cis-3-hexenyl-acetate", parts: 25, role: "Green-fruity" },
      { materialId: "hydroxycitronellal", parts: 120, role: "Muguet sweetness" },
      { materialId: "terpineol-alpha", parts: 80, role: "Lilac facet" },
      { materialId: "benzyl-acetate", parts: 70, role: "Floral lift" },
      { materialId: "cinnamyl-alcohol", parts: 40, role: "Balsamic-hyacinth" },
      { materialId: "indole", parts: 6, role: "Floral-animalic depth" },
      { materialId: "galbanum-oil", parts: 5, role: "Trace sharp green" },
      { materialId: "diphenyl-oxide", parts: 15, role: "Metallic-green; a characteristic material that carries the note through a composition" },
      { materialId: "ylang-oil", parts: 30, role: "Creamy floral" },
      { materialId: "geraniol", parts: 40, role: "Rose facet" },
      { materialId: "benzyl-benzoate", parts: 241, role: "Blender" },
    ],
    variants: [
      { insteadOf: "diphenyl-oxide", use: "rose-oxide (much smaller trace)", effect: "Sharper, more metallic, greener." },
      { insteadOf: "phenylacetaldehyde", use: "phenylacetaldehyde dimethyl acetal", effect: "Stable but softer — you lose some of the diffusive green top, so increase slightly." },
      { insteadOf: "galbanum-oil", use: "cis-3-hexenol (increased)", effect: "Cheaper, less complex green." },
    ],
    provenance: "Material groups from Calkin & Jellinek ch. 6, including the warning about hyacinth bases collapsing in composition. Proportions assembled here.",
  },
  {
    id: "tuberose-base",
    name: "Tuberose base",
    kind: "floral-base",
    family: "flower",
    summary:
      "The narcotic white flower. Ellena's white-flower field is defined by methyl anthranilate + indole; the tuberose direction pushes methyl anthranilate hard and adds creamy lactones. Poison took this route, with greater emphasis on methyl anthranilate than Oscar de la Renta, plus aldehyde C18, gamma-decalactone and methyl salicylate, and a Schiff base formed between methyl anthranilate and the floral aldehydes present.",
    components: [
      { materialId: "methyl-anthranilate", parts: 130, role: "The defining heavy sweet floral" },
      { materialId: "indole", parts: 20, role: "Narcotic animalic-floral depth" },
      { materialId: "aldehyde-c18", parts: 60, role: "Creamy coconut" },
      { materialId: "gamma-decalactone", parts: 40, role: "Creamy peach" },
      { materialId: "benzyl-acetate", parts: 100, role: "Fresh floral lift" },
      { materialId: "benzyl-salicylate", parts: 110, role: "Soft balsamic blender" },
      { materialId: "ylang-oil", parts: 70, role: "Creamy spicy-floral" },
      { materialId: "helional", parts: 80, role: "Watery freshness; forms a Schiff base with methyl anthranilate" },
      { materialId: "hydroxycitronellal", parts: 90, role: "Sweet floral body" },
      { materialId: "methyl-salicylate", parts: 4, role: "Trace wintergreen lift — genuinely characteristic of tuberose, strictly limited" },
      { materialId: "phenylethyl-alcohol", parts: 80, role: "Rosy blender" },
      { materialId: "tuberose-abs", parts: 15, role: "Natural; the modern solvent-extracted absolute is greener and less jammy than the old enfleurage product" },
      { materialId: "methyl-jasmonate", parts: 30, role: "Waxy floral depth" },
      { materialId: "vanillin", parts: 12, role: "Sweet smoothing" },
      { materialId: "benzyl-benzoate", parts: 159, role: "Blender" },
    ],
    variants: [
      { insteadOf: "hydroxycitronellal", use: "helional (increased) + citronellol", effect: "Compliant; more watery." },
      { insteadOf: "tuberose-abs", use: "orange-flower-abs (trace) + beeswax-abs", effect: "Cheaper natural richness; loses the green-camphoraceous facet." },
      { insteadOf: "aldehyde-c18", use: "aldehyde-c14 + a trace of delta-decalactone", effect: "More peach, less coconut." },
    ],
    provenance: "Composition from Calkin & Jellinek ch. 12 (Poison, Knowing, Loulou) and Ellena ch. IV. Proportions assembled here.",
  },
  {
    id: "orange-blossom-base",
    name: "Orange blossom base",
    kind: "floral-base",
    family: "flower",
    summary:
      "Neroli (distilled from the flower) and orange flower absolute (solvent-extracted) are the two naturals; methyl anthranilate is the key synthetic. Schiff bases such as aurantiol give the waxy-honeyed depth. Petitgrain (leaf and twig) supplies the green bitterness that makes the whole thing read as the orange tree rather than as a generic white flower.",
    components: [
      { materialId: "methyl-anthranilate", parts: 90, role: "The defining sweet grape-floral" },
      { materialId: "aurantiol", parts: 60, role: "Schiff base — waxy honeyed orange blossom" },
      { materialId: "neroli-oil", parts: 40, role: "Fresh green-floral sparkle; expensive" },
      { materialId: "orange-flower-abs", parts: 25, role: "Rich indolic depth" },
      { materialId: "petitgrain-oil", parts: 70, role: "Green bitter-orange leaf" },
      { materialId: "linalool", parts: 130, role: "Fresh floral volume" },
      { materialId: "linalyl-acetate", parts: 90, role: "Sweet floral-citrus" },
      { materialId: "hydroxycitronellal", parts: 100, role: "Sweet floral body" },
      { materialId: "phenylethyl-alcohol", parts: 90, role: "Rosy blender" },
      { materialId: "indole", parts: 8, role: "Animalic-floral depth" },
      { materialId: "benzyl-acetate", parts: 80, role: "Floral lift" },
      { materialId: "mandarin-oil", parts: 35, role: "Citrus-anthranilate bridge" },
      { materialId: "heliotropin", parts: 25, role: "Powdery-sweet finish" },
      { materialId: "vanillin", parts: 10, role: "Sweetness" },
      { materialId: "benzyl-benzoate", parts: 147, role: "Blender" },
    ],
    variants: [
      { insteadOf: "neroli-oil", use: "petitgrain-oil (increased) + linalool", effect: "The standard economic substitution; loses the metallic sparkle." },
      { insteadOf: "aurantiol", use: "methyl-anthranilate + hydroxycitronellal (allowed to react)", effect: "Forms the Schiff base in situ — but note this makes the formula chemically unstable over time, which is exactly why Schiff bases defeat polar GC columns." },
      { insteadOf: "hydroxycitronellal", use: "helional + citronellol", effect: "Compliant." },
    ],
    provenance: "From Calkin & Jellinek chs. 6 and 12 (Oscar de la Renta, Vanderbilt) and Ellena ch. IV. Proportions assembled here.",
  },
  {
    id: "violet-base",
    name: "Violet base",
    kind: "floral-base",
    family: "flower",
    summary:
      "The ionones made this possible; they are what allow the recreation of violet at all. Paris is built on a violet accord with methyl ionone (10%) and Iso E Super (6%) as the woody partner, contrasted against green notes, with fruity notes including alpha damascone and gamma-decalactone. Violet and raspberry form a natural association because both contain ionones — a trace of frambinone works well here.",
    components: [
      { materialId: "ionone-beta", parts: 180, role: "Sweet rich violet" },
      { materialId: "ionone-alpha", parts: 120, role: "Dry woody violet" },
      { materialId: "methyl-ionone", parts: 200, role: "Powdery orris-violet; 10% in Paris, the bridge between heart and base" },
      { materialId: "iso-e-super", parts: 150, role: "Velvety woody partner; 6% in Paris" },
      { materialId: "violet-leaf-abs", parts: 10, role: "Green cucumber leaf realism" },
      { materialId: "cis-3-hexenol", parts: 3, role: "Trace green" },
      { materialId: "orris-resinoid", parts: 12, role: "Powdery luxury lift" },
      { materialId: "heliotropin", parts: 40, role: "Powdery-sweet" },
      { materialId: "damascone-alpha", parts: 4, role: "Fruity-tea contrast against the green" },
      { materialId: "gamma-decalactone", parts: 15, role: "Creamy fruity" },
      { materialId: "frambinone", parts: 8, role: "Trace raspberry — natural association via shared ionones" },
      { materialId: "phenylethyl-alcohol", parts: 60, role: "Rosy blender" },
      { materialId: "cedarwood-virginia", parts: 45, role: "Dry woody" },
      { materialId: "vanillin", parts: 10, role: "Sweet smoothing" },
      { materialId: "benzyl-benzoate", parts: 143, role: "Blender" },
    ],
    variants: [
      { insteadOf: "orris-resinoid", use: "methyl-ionone (increased)", effect: "Economical; loses the waxy-carrot naturalness." },
      { insteadOf: "violet-leaf-abs", use: "cis-3-hexenol + nonadienal (trace)", effect: "Sharper green cucumber; far cheaper, far less subtle." },
      { insteadOf: "iso-e-super", use: "vertofix", effect: "More leathery-woody, less transparent." },
    ],
    provenance: "From Calkin & Jellinek chs. 10 and 12 (Paris) . Proportions assembled here.",
  },

  /* ================================================================ */
  /* FANTASY / MODIFIER ACCORDS                                       */
  /* ================================================================ */
  {
    id: "amber-base",
    name: "Amber / ambergris base",
    kind: "fantasy",
    family: "amber",
    summary:
      "The simple, effective combination Calkin & Jellinek recommend for the amber note in Ma Griffe: labdanum, olibanum and vanilla. They note that some of the most successful bases contain quite simple accords of only two or three materials dressed with auxiliary products — this is the clearest example.",
    components: [
      { materialId: "labdanum-abs", parts: 300, role: "Warm balsamic-leathery amber core" },
      { materialId: "olibanum-oil", parts: 150, role: "Fresh resinous-incense lift" },
      { materialId: "vanilla-abs", parts: 80, role: "Sweet natural depth" },
      { materialId: "vanillin", parts: 90, role: "Sweetness" },
      { materialId: "benzoin-resinoid", parts: 130, role: "Balsamic-caramel" },
      { materialId: "ambroxan", parts: 90, role: "Ambergris diffusion — the modern replacement for grey amber" },
      { materialId: "coumarin", parts: 60, role: "Hay sweetness" },
      { materialId: "clary-sage-oil", parts: 30, role: "Herbal-amber warmth; source of sclareol for ambroxan" },
      { materialId: "patchouli-oil", parts: 40, role: "Earthy depth" },
      { materialId: "galaxolide", parts: 30, role: "Musk rounding" },
    ],
    variants: [
      { insteadOf: "vanilla-abs", use: "vanillin (increased)", effect: "Cheaper, flatter, and risks discolouration." },
      { insteadOf: "ambroxan", use: "labdanum (increased) + a trace of seaweed absolute", effect: "Gets some of the marine-ambergris effect without ambroxan, but far less diffusive." },
    ],
    provenance: "The labdanum/olibanum/vanilla trio is documented in Calkin & Jellinek ch. 10. Proportions assembled here.",
  },
  {
    id: "leather-base",
    name: "Leather base (Cuir de Russie type)",
    kind: "fantasy",
    family: "leather",
    summary:
      "Traditional Russian leather is birch tar + castoreum, both now problematic — birch tar for its PAH content, castoreum on ethical and commercial grounds. The modern build uses isobutyl quinoline as the dry leathery spine, with labdanum, styrax, tobacco and iris for the suede softness. Guerlain used the same idea in Mitsouko as in Shalimar's leather aspect.",
    components: [
      { materialId: "isobutyl-quinoline", parts: 100, role: "Dry leathery-earthy spine" },
      { materialId: "labdanum-abs", parts: 200, role: "Amber-leather warmth" },
      { materialId: "styrax-oil", parts: 100, role: "Balsamic-leathery" },
      { materialId: "castoreum-abs", parts: 17, role: "Traditional — substitute a synthetic leather specialty" },
      { materialId: "birch-tar", parts: 4, role: "Rectified, PAH-controlled grade only; smoke and tar" },
      { materialId: "tobacco-abs", parts: 67, role: "Dry hay-leather" },
      { materialId: "cumin-oil", parts: 7, role: "Sweaty-animalic leather realism; trace only" },
      { materialId: "orris-resinoid", parts: 44, role: "Powdery suede softness — the Cuir de Russie signature" },
      { materialId: "jasmine-abs", parts: 28, role: "Floral counterpoint; leather florals need this" },
      { materialId: "cinnamon-bark-oil", parts: 9, role: "Warm spice that fits the leather" },
      { materialId: "patchouli-oil", parts: 78, role: "Earthy depth" },
      { materialId: "cedarwood-virginia", parts: 100, role: "Dry wood" },
      { materialId: "vanillin", parts: 22, role: "Sweet smoothing" },
      { materialId: "benzyl-salicylate", parts: 111, role: "Blender and fixative" },
      { materialId: "galaxolide", parts: 113, role: "Musk rounding" },
    ],
    variants: [
      { insteadOf: "castoreum-abs", use: "isobutyl-quinoline (increased) + labdanum", effect: "Ethical and legal; less animalic, drier." },
      { insteadOf: "birch-tar", use: "cade oil (rectified, trace) or a synthetic smoky specialty", effect: "Similar smoke with better-controlled PAHs." },
      { insteadOf: "cumin-oil", use: "phenylacetic acid (trace)", effect: "Sweaty-animalic without cumin's polarising sharpness." },
    ],
    provenance: "From Calkin & Jellinek chs. 10 and 12 (Bandit, Cabochard, Shalimar's leather aspect). Proportions assembled here.",
  },
  {
    id: "fruit-base",
    name: "Fruit base (peach / apricot)",
    kind: "modifier",
    family: "fruit",
    summary:
      "Lactone-driven. Aldehyde C14 (gamma-undecalactone — a lactone despite the name) is the peach material, first used prominently in Mitsouko (1919). Fruit bases are among the most widely used trace ingredients in perfumery today: combinations of powerful fruity materials, often carried on phenoxyethyl isobutyrate or hexyl cinnamic aldehyde, give an effect unobtainable from single materials. The phenoxyethyl isobutyrate + dimethyl benzyl carbinyl acetate pairing produces an unmistakable character that survives even at trace levels.",
    components: [
      { materialId: "aldehyde-c14", parts: 200, role: "Creamy peach — the core" },
      { materialId: "gamma-decalactone", parts: 140, role: "Peach-apricot" },
      { materialId: "aldehyde-c18", parts: 90, role: "Coconut-creamy" },
      { materialId: "damascone-alpha", parts: 6, role: "Trace powerful fruity-floral" },
      { materialId: "frambinone", parts: 40, role: "Raspberry jam" },
      { materialId: "cassis-abs", parts: 8, role: "Sulphurous berry-green" },
      { materialId: "phenoxyethyl-isobutyrate", parts: 90, role: "Honeyed-fruity carrier" },
      { materialId: "dimethyl-benzyl-carbinyl-acetate", parts: 80, role: "Fresh green-plum; the documented pairing" },
      { materialId: "cis-3-hexenyl-acetate", parts: 35, role: "Green skin freshness" },
      { materialId: "allyl-amyl-glycolate", parts: 25, role: "Sharp pineapple-metallic" },
      { materialId: "vanillin", parts: 25, role: "Sweet smoothing" },
      { materialId: "ionone-beta", parts: 40, role: "Violet-fruity bridge" },
      { materialId: "hexyl-cinnamal", parts: 130, role: "Carrier and blender" },
      { materialId: "benzyl-benzoate", parts: 91, role: "Blender" },
    ],
    variants: [
      { insteadOf: "aldehyde-c14", use: "gamma-undecalactone + delta-decalactone", effect: "More apricot-skin, less creamy." },
      { insteadOf: "damascone-alpha", use: "frambinone (increased)", effect: "Cheaper, jam-sweet, loses the tea-tobacco sophistication." },
      { insteadOf: "hexyl-cinnamal", use: "benzyl-salicylate", effect: "Softer, more balsamic carrier." },
    ],
    provenance: "From Calkin & Jellinek chs. 10 and 12 (Mitsouko, Femme's Prunol, Oscar de la Renta). Proportions assembled here.",
  },
  {
    id: "green-base",
    name: "Green base",
    kind: "modifier",
    family: "grass",
    summary:
      "Green notes are the clearest case for using a base rather than a single material: many are so intense that in isolation they give an unacceptably harsh effect, but combined into a carefully worked accord they bring a naturalness that is very difficult to duplicate any other way. Vent Vert (1945) used galbanum with geranium at unusually high levels; Miss Dior took up the same emphasis on green, combining galbanum with an accord of aldehydes C11 undecylenic and C10, styrallyl acetate and a styrax note.",
    components: [
      { materialId: "galbanum-oil", parts: 91, role: "Intensely green, bitter, cut-stem" },
      { materialId: "cis-3-hexenol", parts: 25, role: "Fresh-cut grass" },
      { materialId: "cis-3-hexenyl-acetate", parts: 71, role: "Green pear-skin" },
      { materialId: "cis-3-hexenyl-salicylate", parts: 91, role: "Tenacious green-floral" },
      { materialId: "styrallyl-acetate", parts: 111, role: "Sharp rhubarb-green — 4% of Ma Griffe, 2% of Cabochard" },
      { materialId: "phenylacetaldehyde", parts: 61, role: "Green hyacinth" },
      { materialId: "violet-leaf-abs", parts: 30, role: "Cucumber-leaf" },
      { materialId: "triphenylacetaldehyde-green", parts: 12, role: "Powerful green-apple" },
      { materialId: "geranium-oil", parts: 81, role: "Rosy-minty; the Vent Vert pairing with galbanum" },
      { materialId: "aldehyde-c11-undecylenic", parts: 20, role: "Green-citrus bridge" },
      { materialId: "diphenyl-oxide", parts: 25, role: "Metallic-green" },
      { materialId: "armoise-oil", parts: 20, role: "Bitter herbal-green" },
      { materialId: "hexyl-cinnamal", parts: 182, role: "Carrier and softener — essential to stop the accord being harsh" },
      { materialId: "benzyl-salicylate", parts: 180, role: "Carrier and fixative" },
    ],
    variants: [
      { insteadOf: "galbanum-oil", use: "triphenylacetaldehyde-green (increased) + cis-3-hexenol", effect: "Cheaper and more controllable, but loses galbanum's bitter complexity." },
      { insteadOf: "violet-leaf-abs", use: "nonadienal (trace)", effect: "Cucumber-green at a fraction of the cost, far less natural." },
      { insteadOf: "hexyl-cinnamal", use: "phenylethyl-alcohol", effect: "Softer, sweeter carrier — moves the base toward floral-green rather than sharp green." },
    ],
    provenance: "From Calkin & Jellinek chs. 10 and 12 (Vent Vert, Miss Dior, Ma Griffe, Cabochard). Proportions assembled here.",
  },
  {
    id: "marine-base",
    name: "Marine / aquatic base",
    kind: "modern",
    family: "marine",
    summary:
      "Ellena's entire marine field is seaweed absolute plus Calone. The lineage is documented: the 'watery' character of Helional, important in both Eau Sauvage and Diorella, was subsequently used to create cool fruity notes such as Calyx and then the modern marine notes based on Calone, such as New West and Escape.",
    components: [
      { materialId: "calone", parts: 180, role: "Marine-ozone, watermelon rind" },
      { materialId: "helional", parts: 150, role: "Watery-floral freshness — the ancestor of the whole category" },
      { materialId: "hedione", parts: 160, role: "Transparent floral radiance" },
      { materialId: "dihydromyrcenol", parts: 90, role: "Fresh citrus-lime lift" },
      { materialId: "seaweed-abs", parts: 6, role: "Briny iodine realism; trace only" },
      { materialId: "iso-e-super", parts: 130, role: "Transparent woody-amber body" },
      { materialId: "ambroxan", parts: 70, role: "Mineral-ambergris diffusion" },
      { materialId: "cyclamen-aldehyde", parts: 30, role: "Watery-floral" },
      { materialId: "galaxolide", parts: 100, role: "Clean musk" },
      { materialId: "bergamot-oil", parts: 60, role: "Citrus top" },
      { materialId: "phenylethyl-alcohol", parts: 24, role: "Soft floral blender" },
    ],
    variants: [
      { insteadOf: "calone", use: "helional (increased) + a trace of seaweed absolute", effect: "Less watermelon, more mineral-briny." },
      { insteadOf: "seaweed-abs", use: "a trace of ambroxan + vetiver", effect: "Salt-mineral without the iodine." },
      { insteadOf: "dihydromyrcenol", use: "grapefruit-oil + lime-oil", effect: "Natural citrus freshness, far less tenacious." },
    ],
    provenance: "Lineage from Calkin & Jellinek ch. 12 (Diorella → Calyx → New West / Escape); field definition from Ellena ch. IV. Proportions assembled here.",
  },
  {
    id: "animalic-base",
    name: "Animalic complex",
    kind: "modifier",
    family: "animal",
    summary:
      "The standard animalic complex is built on esters of paracresol in combination with phenylacetates and cedarwood — identified in this form in the Youth Dew reconstruction. Calkin & Jellinek advise making animalic accords up in solution before adding them to the composition: they are so powerful that dosing them neat is unworkable.",
    components: [
      { materialId: "paracresyl-acetate", parts: 60, role: "Animalic-leathery" },
      { materialId: "phenylacetic-acid", parts: 40, role: "Honeyed-sweaty" },
      { materialId: "ethyl-phenylacetate", parts: 50, role: "Honey-floral-animalic" },
      { materialId: "cedarwood-virginia", parts: 200, role: "The carrier that makes the whole thing usable" },
      { materialId: "indole", parts: 45, role: "Faecal-floral at strength, radiant in dilution" },
      { materialId: "skatole", parts: 10, role: "Deeper animalic" },
      { materialId: "castoreum-abs", parts: 20, role: "Leathery-smoky — substitute" },
      { materialId: "labdanum-abs", parts: 120, role: "Amber-leather" },
      { materialId: "cumin-oil", parts: 10, role: "Sweaty-spicy" },
      { materialId: "benzyl-salicylate", parts: 200, role: "Blender and diluent" },
      { materialId: "benzyl-benzoate", parts: 245, role: "Diluent — make this up as a 10% solution before use" },
    ],
    variants: [
      { insteadOf: "castoreum-abs", use: "isobutyl-quinoline", effect: "Dry leathery without the animal source." },
      { insteadOf: "skatole", use: "indole (increased)", effect: "Softer, more floral, less faecal." },
      { insteadOf: "civet (traditional)", use: "this complex at trace level", effect: "Civet is not a viable modern ingredient; this complex supplies the radiant animalic bloom." },
    ],
    provenance: "From Calkin & Jellinek chs. 10 and 12 (Youth Dew). Proportions assembled here.",
  },
  {
    id: "eaud-de-cologne",
    name: "Eau de cologne accord",
    kind: "structural",
    family: "hesperides",
    summary:
      "The oldest surviving structure in western perfumery: citrus peel oils over a light aromatic heart with a minimal base. Because everything in it is highly volatile, the composition is short-lived by design — which is why colognes are dosed low (2-4% concentrate) and applied generously. Limonene's vapour pressure is 1540 microns and alpha-pinene's is 2900, against benzyl salicylate's 0.086: that four-order-of-magnitude spread is the whole story of the family.",
    components: [
      { materialId: "bergamot-oil", parts: 260, role: "The backbone" },
      { materialId: "lemon-oil", parts: 160, role: "Sharp citrus lift" },
      { materialId: "sweet-orange-oil", parts: 120, role: "Sweet rounded citrus" },
      { materialId: "mandarin-oil", parts: 60, role: "Sweet floral-citrus" },
      { materialId: "petitgrain-oil", parts: 90, role: "Green bitter-orange leaf" },
      { materialId: "neroli-oil", parts: 35, role: "Orange-blossom sparkle" },
      { materialId: "lavender-oil", parts: 80, role: "Aromatic heart" },
      { materialId: "rosemary-oil", parts: 20, role: "Herbal-camphoraceous" },
      { materialId: "linalool", parts: 60, role: "Extends the citrus into the floral" },
      { materialId: "linalyl-acetate", parts: 50, role: "Soft floral-citrus" },
      { materialId: "geranium-oil", parts: 20, role: "Rosy-minty bridge" },
      { materialId: "benzyl-salicylate", parts: 20, role: "Minimal fixation" },
      { materialId: "oakmoss-abs", parts: 12, role: "Trace mossy depth — pushes it toward a cologne-chypre" },
      { materialId: "galaxolide", parts: 13, role: "Trace musk to slow the evaporation" },
    ],
    variants: [
      { insteadOf: "neroli-oil", use: "petitgrain-oil (increased) + methyl anthranilate (trace)", effect: "The standard economic substitution; neroli is among the most expensive citrus-derived materials." },
      { insteadOf: "oakmoss-abs", use: "evernyl (trace)", effect: "Compliant moss." },
      { insteadOf: "rosemary-oil", use: "basil-oil (trace)", effect: "Sweeter, more anise-like herbal." },
    ],
    provenance: "From Calkin & Jellinek ch. 9 (origins of western perfumery) and ch. 12 (Eau Sauvage as a citrus-fresh fragrance with aromatic herbs). Proportions assembled here. Vapour-pressure figures from that book's Table 13.2.",
  },
];

/* ------------------------------------------------------------------ */

const byId = new Map(accords.map((a) => [a.id, a]));
export function getAccord(id: string): Accord | undefined {
  return byId.get(id);
}

/**
 * Calkin & Jellinek's "eight generally-used materials" — the set that can
 * produce jasmine, lilac, muguet or hyacinth depending only on proportion.
 * A base built *only* from these loses its identity, so the app uses this
 * list to warn about nondescript florals.
 */
export const genericFloralMaterials = [
  "phenylethyl-alcohol",
  "hydroxycitronellal",
  "benzyl-acetate",
  "phenylacetaldehyde",
  "citronellol",
  "hexyl-cinnamal",
  "terpineol-alpha",
  "indole",
] as const;

/** Accords that can act as a load-bearing structure for a whole perfume. */
export const structuralAccords = accords.filter((a) => a.kind === "structural" || a.kind === "modern");

/** Accords used as modifiers or building blocks inside a larger formula. */
export const modifierAccords = accords.filter((a) => a.kind === "modifier" || a.kind === "floral-base" || a.kind === "fantasy");
