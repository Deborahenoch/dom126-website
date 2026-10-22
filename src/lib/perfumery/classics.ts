/**
 * DOM126 Perfumery Atlas — classic-perfume study reconstructions.
 *
 * READ THIS BEFORE USING ANY OF IT
 *
 * Every entry here comes from ONE published source:
 *
 *   R. R. Calkin & J. S. Jellinek, "Perfumery: Practice and Principles",
 *   Wiley-Interscience, 1994 — chapter 12, "Selected Great Perfumes".
 *
 * That chapter states plainly what it is and is not:
 *
 *   - Its information is "based on data coming from GC analysis combined
 *     with further work carried out in conjunction with our students."
 *   - "It has not been our intention to provide complete reconstructions,
 *     or indeed formulas, for the perfumes under discussion."
 *   - "Where percentages are given, these should be regarded only as
 *     guidelines to the main structure of the perfume and as a starting
 *     point for further work."
 *   - The authors explicitly do not want the material used "for the
 *     unethical marketing of copycat, or at worst, counterfeit products."
 *
 * So these are STRUCTURAL STUDIES, not formulas. Most entries quantify
 * well under half of a composition; `quantifiedCoverage` records how much
 * of the formula the source actually puts numbers on, and that field is the
 * honest summary of each entry.
 *
 * Two further cautions:
 *
 *   1. The analyses are of the extrait versions as they existed in the
 *      early 1990s. Brands reformulate constantly, and the EDT/EDP of the
 *      same name is frequently a *different formula* built to the same idea
 *      with cheaper, more modern materials at lower concentration. There is
 *      often no such thing as "the one-and-only formula" for a fragrance.
 *   2. Many of the materials named are now restricted or banned. Lyral and
 *      Lilial are prohibited in EU cosmetics; nitro musks are banned;
 *      oakmoss, hydroxycitronellal, isoeugenol and the damascones are all
 *      tightly limited. A faithful 1994 rebuild is not a legal 2026 product.
 *      The vault flags these; `modernisation` lists the substitutions.
 *
 * These entries are teaching material: they show how perfume families are
 * constructed and how one perfume descends from another. Use them to learn
 * structure, then build something of your own.
 */

import type { Reconstruction } from "./types";

const SRC = "Calkin & Jellinek, Perfumery: Practice and Principles (Wiley, 1994), ch. 12";

export const reconstructions: Reconstruction[] = [
  /* ================================================================ */
  /* FLORAL SALICYLATE FAMILY                                         */
  /* ================================================================ */
  {
    id: "lair-du-temps",
    perfume: "L'Air du Temps",
    house: "Nina Ricci",
    year: 1948,
    family: "floral-salicylate",
    coreAccord:
      "Benzyl salicylate 15% against eugenol at 4½ : 1, with ylang and isoeugenol — the carnation complex that dominates the whole evaporation.",
    quantifiedCoverage:
      "Partial. Five loadings are given (benzyl salicylate 15%, methyl ionone 10%, hydroxycitronellal 10%, top note 14%, plus the 4½:1 salicylate/eugenol ratio). Everything else is named without a number.",
    lines: [
      { materialId: "benzyl-salicylate", percent: 15, layer: "heart", role: "Half of the defining carnation pair, at 4½ : 1 against eugenol" },
      { materialId: "eugenol", ratio: "1 (against 4½ benzyl salicylate)", layer: "heart", role: "The spicy half of the carnation complex" },
      { materialId: "ylang-oil", layer: "heart", role: "With the salicylate/eugenol pair and isoeugenol, provides the essential carnation character" },
      { materialId: "isoeugenol", layer: "heart", role: "Deepens the carnation" },
      { materialId: "methyl-ionone", percent: 10, layer: "base", role: "Part of the base accord with vetiveryl acetate, sandalwood and musk" },
      { materialId: "vetiveryl-acetate", layer: "base", role: "Elegant woody base" },
      { materialId: "sandalwood-oil", layer: "base", role: "Creamy woody base" },
      { materialId: "musk-ketone", layer: "base", role: "Nitro musk — banned in the EU today" },
      { materialId: "hydroxycitronellal", percent: 10, layer: "heart", role: "The muguet element of the simplified floral bouquet" },
      { materialId: "terpineol-alpha", layer: "heart", role: "Standing in for lilac" },
      { materialId: "styrallyl-acetate", layer: "heart", role: "Standing in for gardenia" },
      { materialId: "phenylethyl-alcohol", layer: "heart", role: "Standing in for rose" },
      { materialId: "benzyl-acetate", layer: "heart", role: "With amyl cinnamic aldehyde, standing in for jasmine" },
      { materialId: "amyl-cinnamal", layer: "heart", role: "Jasmine representation" },
      { materialId: "bergamot-oil", layer: "top", role: "Part of the 14% classic top note" },
      { materialId: "linalool", layer: "top", role: "Rosewood; naturally occurring in the bergamot/rosewood top" },
      { materialId: "linalyl-acetate", layer: "top", role: "Naturally occurring in the top-note materials" },
      { materialId: "jasmine-abs", layer: "heart", role: "Most of the richness and quality comes from jasmine and rose absolutes, which add many hundreds of individual ingredients that envelop and decorate the main structure" },
      { materialId: "rose-abs", layer: "heart", role: "As above" },
      { materialId: "aldehyde-c11-undecylenic", layer: "trace", role: "Auxiliary: brings impact, blends with the styrallyl acetate, acts as a bridge between top notes and the rest" },
      { materialId: "vanillin", layer: "trace", role: "Auxiliary: completes the carnation character" },
      { materialId: "heliotropin", layer: "trace", role: "Auxiliary: completes the carnation character" },
      { materialId: "orris-resinoid", layer: "trace", role: "Auxiliary: completes the carnation character" },
    ],
    unquantified: [
      "Rosewood oil (implied by the linalool reference)",
      "Musk ambrette (in the original version, alongside musk ketone)",
    ],
    evolution:
      "The ancestor of the whole floral-salicylate line. Its descent runs through Fidji, Charlie, Chloé, Anaïs Anaïs and Paris. It descends in turn from earlier salicylate perfumes — Quelques Fleurs and Fleurs de Rocaille with a dominant lilac note, and Je Reviens built on narcissus and jonquille — many of which combined eugenol and isoeugenol as part of a carnation complex. It was those, plus benzyl salicylate, that inspired L'Air du Temps.",
    modernisation: [
      "Musk ketone is banned in EU cosmetics — replace with a macrocyclic/polycyclic musk blend (Galaxolide, Habanolide, ethylene brassylate, cyclopentadecanolide).",
      "Musk ambrette is long unavailable.",
      "Isoeugenol is tightly IFRA-restricted — the carnation must be rebuilt around eugenol, ylang and a clove-bud trace.",
      "Hydroxycitronellal at 10% exceeds modern limits — reduce and extend with helional, citronellol and a stable muguet aldehyde.",
      "This is the textbook example of a Carles-structure perfume: well-defined top, middle and base, extraordinary simplicity, with complexity coming from naturals rather than from long ingredient lists.",
    ],
    source: SRC,
  },
  {
    id: "fidji",
    perfume: "Fidji",
    house: "Guy Laroche",
    year: 1966,
    family: "floral-salicylate",
    coreAccord:
      "L'Air du Temps with the dominant carnation largely replaced by a green hyacinth–jasmine complex. The balance between material types is almost unchanged; the materials themselves have been swapped for newer ones.",
    quantifiedCoverage:
      "Sparse. Four loadings: cis-3-hexenyl salicylate 6%, Lyral 8%, Vertofix 3%, plus a small unspecified amount of PTBCHA (Vertenex).",
    lines: [
      { materialId: "cis-3-hexenyl-salicylate", percent: 6, layer: "heart", role: "Replaces part of the benzyl salicylate — the green shift" },
      { materialId: "benzyl-salicylate", layer: "heart", role: "Retained from L'Air du Temps, partly displaced" },
      { materialId: "helional", layer: "heart", role: "Stands in for hydroxycitronellal (the source names Lyral; both are now unavailable)" },
      { materialId: "vertofix", percent: 3, layer: "base", role: "New woody material augmenting the base" },
      { materialId: "ambrettolide", layer: "base", role: "New musk, part of the modernised musk complex" },
      { materialId: "vertenex", layer: "heart", role: "Small amount of PTBCHA — relatively new at the time, more usually associated with functional products" },
      { materialId: "eugenol", layer: "heart", role: "Carnation complex, reduced" },
    ],
    unquantified: ["The green hyacinth complex itself", "Rose and jasmine naturals", "Top-note citrus"],
    evolution:
      "The link between Fidji and L'Air du Temps is generally accepted by perfumers as one of direct descent. The nineteen years between them saw an enormous increase in available synthetics; throughout the main structure there has been a deliberate replacement of old materials, wholly or partly, by new — but the balance between the types of material, allowing for their different strengths, remains almost unchanged. That is the key lesson: a family persists through proportion, not through ingredients.",
    modernisation: [
      "Lyral (HICC) is PROHIBITED in EU cosmetics. The 8% muguet element must be rebuilt from helional, citronellol and a stable acetal.",
      "Note how a dating exercise works: even without having smelled Fidji, you could date it to within a few years of 1966 from the materials it contains. Vertofix arrived in the early 1960s; ambrettolide and PTBCHA are of the same era. Material availability is a fingerprint of date.",
    ],
    source: SRC,
  },
  {
    id: "anais-anais",
    perfume: "Anaïs Anaïs",
    house: "Cacharel",
    year: 1979,
    family: "floral-salicylate",
    coreAccord:
      "White flowers (jasmine, muguet, lilac, magnolia, tuberose, honeysuckle, carnation) over a complex of woody notes, musks and salicylates 6% — with Hedione 10% and hexyl cinnamic aldehyde 12% dominating alongside the musks, together some 30% of the formula.",
    quantifiedCoverage:
      "Partial. Salicylates 6%, Hedione 10%, hexyl cinnamic aldehyde 12%, cyclopentadecanolide 4%, aldehyde C14 0.3%, and 'the two dominants plus musks ≈ 30%'.",
    lines: [
      { materialId: "hedione", percent: 10, layer: "heart", role: "One of the two dominating materials" },
      { materialId: "hexyl-cinnamal", percent: 12, layer: "heart", role: "The other dominant; with Hedione and the musks makes up ~30%" },
      { materialId: "benzyl-salicylate", percent: 6, layer: "base", role: "The salicylate complex" },
      { materialId: "cyclopentadecanolide", percent: 4, layer: "base", role: "Part of a different musk combination from Fidji's" },
      { materialId: "aldehyde-c14", percent: 0.3, layer: "trace", role: "Relatively large for a trace material — brings a touch of exotic fruit to the white-flower character" },
      { materialId: "cedryl-acetate", layer: "base", role: "Incorporated into the woody complex" },
      { materialId: "hydroxycitronellal", layer: "heart", role: "Muguet" },
      { materialId: "helional", layer: "heart", role: "Stands in for the source's Lyral — now prohibited" },
      { materialId: "cyclamen-aldehyde", layer: "heart", role: "Builds the white-flower character" },
      { materialId: "methyl-anthranilate", layer: "heart", role: "Tuberose character, either directly or as the Schiff base with Helional" },
      { materialId: "phenylacetaldehyde", layer: "top", role: "Green side, less pronounced and more floral than in Fidji" },
      { materialId: "cis-3-hexenyl-acetate", layer: "top", role: "Green side" },
      { materialId: "galbanum-oil", layer: "trace", role: "Perhaps a trace on the green side" },
      { materialId: "phenylethyl-phenylacetate", layer: "heart", role: "The honey-note innovation" },
      { materialId: "beeswax-abs", layer: "trace", role: "Cire d'abeilles backing up the honey note — excellent for giving natural character to a synthetic floral compound" },
      { materialId: "evernyl", layer: "base", role: "The mossy side" },
      { materialId: "jasmine-abs", layer: "heart", role: "Natural richness" },
    ],
    unquantified: [
      "The 'intensely powerful amber note' described as a captive material not generally available",
      "Narcissus absolute (possibly used)",
      "Magnolia, lilac and honeysuckle aspects of the white-flower bouquet",
    ],
    evolution:
      "Less closely related to L'Air du Temps than Fidji, but created in the same tradition. The striking feature is the almost complete absence of a classical fresh top note, and the dominance of Hedione and hexyl cinnamic aldehyde — a move toward the linear, monolithic structure associated with many modern perfumes. Anaïs Anaïs remains comparatively unchanged throughout its evaporation.",
    modernisation: [
      "Lyral is prohibited; the muguet must be rebuilt.",
      "The amber note is a captive material — unavailable, so substitute a labdanum/ambroxan/benzoin amber base and accept the difference.",
      "This is a good case study in what GC cannot give you: a captive material appears in the chromatogram as an unknown peak or as a set of peaks that match nothing in the library. You can see that something is there; you cannot know what.",
    ],
    source: SRC,
  },
  {
    id: "paris",
    perfume: "Paris",
    house: "Yves Saint Laurent",
    year: 1983,
    family: "floral-salicylate",
    coreAccord:
      "L'Air du Temps structure with violet and rose as the dominant florals: Iso E Super 6% as the main woody material forming an accord with the musk complex and methyl ionone 10%, plus a rose complex 10% reminiscent of White Linen's.",
    quantifiedCoverage:
      "Partial. Iso E Super 6%, methyl ionone 10%, rose complex 10%, DMBCA 2.5%, benzyl salicylate 6%, Galaxolide 5%.",
    lines: [
      { materialId: "iso-e-super", percent: 6, layer: "base", role: "The main woody material — an important innovation; a chameleon combining woody and amber aspects with methyl-ionone character" },
      { materialId: "methyl-ionone", percent: 10, layer: "base", role: "Forms the basis of the violet accord; bridges middle and base notes" },
      { materialId: "benzyl-salicylate", percent: 6, layer: "base", role: "Salicylate spine retained from L'Air du Temps" },
      { materialId: "phenylethyl-dimethyl-carbinol", percent: 2.5, layer: "heart", role: "DMBCA at an unusually high level; part of the rose note, working with the underlying woody character" },
      { materialId: "galaxolide", percent: 5, layer: "base", role: "Introduced as part of the musk complex" },
      { materialId: "musk-ketone", layer: "base", role: "In the musk complex — banned today" },
      { materialId: "cyclopentadecanolide", layer: "base", role: "In the musk complex" },
      { materialId: "tonalid", layer: "base", role: "In the musk complex" },
      { materialId: "hedione", layer: "heart", role: "Important, with the salicylates" },
      { materialId: "cis-3-hexenyl-salicylate", layer: "heart", role: "Green-salicylate" },
      { materialId: "damascone-alpha", layer: "trace", role: "Fruity note contrasting with the green side of the violet accord" },
      { materialId: "gamma-decalactone", layer: "trace", role: "Fruity" },
      { materialId: "frambinone", layer: "trace", role: "Violet and raspberry form a natural association because both contain ionones" },
      { materialId: "rose-abs", layer: "heart", role: "Part of the rose complex" },
      { materialId: "ionone-beta", layer: "heart", role: "Violet accord" },
    ],
    unquantified: ["The full rose complex composition", "Green notes of the violet accord", "Top note"],
    evolution:
      "Closely similar in structure to L'Air du Temps but with violet and rose dominant. Thinking in building blocks, the source suspects it was created from a violet accord plus a rose complex (10%) reminiscent of White Linen's. Common modern practice: use a combination of chemically different synthetic musks rather than just one, which gives a more natural and interesting effect — as with the green notes.",
    modernisation: [
      "Musk ketone banned; the four-musk complex (Galaxolide / musk ketone / cyclopentadecanolide / Tonalid) becomes a three-musk blend.",
      "Because the violet note, fruity notes and Galaxolide are all chemically stable in acid media, fragrances reminiscent of Paris turn up in household products including lavatory cleaners. Worth knowing before you build one: the structure is robust but not distinctive by itself.",
    ],
    source: SRC,
  },

  /* ================================================================ */
  /* FLORAL ALDEHYDIC FAMILY                                          */
  /* ================================================================ */
  {
    id: "chanel-no5",
    perfume: "Chanel No. 5",
    house: "Chanel",
    year: 1921,
    family: "floral-aldehydic",
    coreAccord:
      "A block of aliphatic aldehydes totalling nearly 1% — the milestone — over bergamot/linalool/linalyl acetate, with ylang leading into a rose–muguet–jasmine heart and a woody, methyl-ionone, nitro-musk and amber base. Ylang and methyl ionone (8%) form an important 1:1 combination.",
    quantifiedCoverage:
      "Partial. Aldehydes ~1% total, methyl ionone 8%, hydroxycitronellal 10%, vanillin 1.5%, coumarin 5%, nitromusks a little over 10%, rose and jasmine absolutes probably 4-5% each.",
    lines: [
      { materialId: "aldehyde-c10", layer: "top", role: "Part of the ~1% aldehyde block" },
      { materialId: "aldehyde-c11-undecylenic", layer: "top", role: "Part of the aldehyde block" },
      { materialId: "aldehyde-c12-lauric", layer: "top", role: "Part of the aldehyde block" },
      { materialId: "aldehyde-c12-mna", layer: "top", role: "Part of the aldehyde block" },
      { materialId: "methyl-ionone", percent: 8, layer: "heart", role: "In an important 1:1 combination with ylang" },
      { materialId: "ylang-oil", layer: "heart", role: "1:1 with methyl ionone; also important in softening the aldehydic character" },
      { materialId: "hydroxycitronellal", percent: 10, layer: "heart", role: "The muguet part of the accord, with cinnamic alcohol and styrax" },
      { materialId: "cinnamyl-alcohol", layer: "heart", role: "Muguet support" },
      { materialId: "styrax-oil", layer: "heart", role: "Muguet support" },
      { materialId: "vanillin", percent: 1.5, layer: "base", role: "Sweetness — the family divides on whether vanillin is significant, and No. 5 is on the significant side" },
      { materialId: "coumarin", percent: 5, layer: "base", role: "Hay-sweet base" },
      { materialId: "musk-ketone", percent: 10, layer: "base", role: "'A little over 10% of nitromusks' — banned in the EU today" },
      { materialId: "vetiveryl-acetate", layer: "base", role: "Woody base" },
      { materialId: "sandalwood-oil", layer: "base", role: "Woody base" },
      { materialId: "isoeugenol", layer: "base", role: "Base-note spice" },
      { materialId: "bergamot-oil", layer: "top", role: "Traditional top, with linalool, linalyl acetate and neroli" },
      { materialId: "linalool", layer: "top", role: "Rosewood" },
      { materialId: "linalyl-acetate", layer: "top", role: "Top note" },
      { materialId: "neroli-oil", layer: "top", role: "Top note" },
      { materialId: "labdanum-abs", layer: "base", role: "Ciste oil as part of the amber note, bringing a natural radiance in contrast to the chemical harshness of the aldehydes" },
      { materialId: "phenylacetaldehyde", layer: "heart", role: "Small amount, adding to the floral character with the rose alcohols" },
      { materialId: "phenylethyl-alcohol", layer: "heart", role: "Rose alcohols" },
      { materialId: "rose-abs", percent: 4.5, layer: "heart", role: "'Probably used at levels of around 4% or 5%, which would not have been unusual at the time'" },
      { materialId: "jasmine-abs", percent: 4.5, layer: "heart", role: "As above" },
    ],
    unquantified: [
      "Natural musk (in the original)",
      "Ambergris (in the original)",
      "Civet (in the original)",
      "Exact aldehyde split within the ~1% block",
      "Rose alcohols as a group",
    ],
    evolution:
      "Although aliphatic aldehydes had been used in earlier perfumes, their dominance here — a total of nearly 1% — marked a milestone in the history of perfumery. The central accord remains one of the most unmistakable in perfumery and is widely used in functional products from toiletries to room fresheners, where the relative chemical instability of vanillin and the aliphatic aldehydes is not too much of a problem. L'Interdit (1957) and Topaze (1959) are closely related; but No. 5's very individuality seems to have limited its potential as the origin of a widely evolved family. Arpège, which reduced the vanillin and coumarin, was far more generative — leading to Calèche, Madame Rochas, Calandre, Rive Gauche and White Linen.",
    modernisation: [
      "Nitromusks at >10% are impossible today — musk ketone and musk xylene are banned in EU cosmetics. Replace with Galaxolide/Habanolide/ethylene brassylate/cyclopentadecanolide at similar total loading.",
      "Natural musk, ambergris and civet are all unavailable — use ambroxan, a synthetic musk, and an animalic complex.",
      "Isoeugenol is tightly restricted.",
      "Hydroxycitronellal at 10% exceeds modern limits.",
      "Vanillin plus aliphatic aldehydes is chemically unstable (they react); the composition needs maturation and will discolour. This is a real formulation problem, not a defect in the original.",
    ],
    source: SRC,
  },
  {
    id: "arpege",
    perfume: "Arpège",
    house: "Lanvin",
    year: 1927,
    family: "floral-aldehydic",
    coreAccord:
      "The Chanel No. 5 structure with the floral aspect developed through compounded floral bases, greater emphasis on woody notes including vetiveryl acetate, and a stronger animalic character — with a corresponding reduction in vanillin and coumarin.",
    quantifiedCoverage:
      "None quantified. The source describes the direction of change relative to No. 5 rather than giving loadings.",
    lines: [
      { materialId: "vetiveryl-acetate", layer: "base", role: "Greater emphasis on the woody notes" },
      { materialId: "vanillin", layer: "base", role: "Reduced relative to No. 5" },
      { materialId: "coumarin", layer: "base", role: "Reduced relative to No. 5" },
      { materialId: "labdanum-abs", layer: "base", role: "Ambrarome-type amber specialty was used here" },
    ],
    unquantified: ["The compounded floral bases", "The animalic character", "The aldehyde block"],
    evolution:
      "The reduction of vanillin and coumarin within the accord is the trend that led to the greatest masterpieces of the group: Calèche (1961), Madame Rochas, Calandre, Rive Gauche and White Linen. Arpège is the more generative of the two 1920s aldehydic florals precisely because it pulled back on the sweetness.",
    modernisation: [
      "Specialty bases such as Ambrarome are historical products; approximate with a labdanum/olibanum/vanilla amber base.",
      "The compounded floral bases would today be built from the floral accord recipes in `accords.ts`.",
    ],
    source: SRC,
  },
  {
    id: "madame-rochas",
    perfume: "Madame Rochas",
    house: "Rochas",
    year: 1960,
    family: "floral-aldehydic",
    coreAccord:
      "The aldehydic structure with a much more synthetic floral heart: a muguet base (15%) using hexyl cinnamic aldehyde and phenylacetaldehyde glyceroacetal augmenting a further 15% of hydroxycitronellal, over vetiveryl acetate 10% and sandalwood 8%.",
    quantifiedCoverage:
      "Good for the base notes. Muguet base 15%, hydroxycitronellal 15%, vetiveryl acetate 10%, sandalwood 8%, coumarin 1.5%.",
    lines: [
      { materialId: "hexyl-cinnamal", percent: 15, layer: "heart", role: "Part of the introduced muguet base" },
      { materialId: "hydroxycitronellal", percent: 15, layer: "heart", role: "Augmented by the muguet base — 30% of muguet character in total" },
      { materialId: "vetiveryl-acetate", percent: 10, layer: "base", role: "Dominant woody note, as in Arpège" },
      { materialId: "sandalwood-oil", percent: 8, layer: "base", role: "A large amount, in combination with vetiveryl acetate" },
      { materialId: "coumarin", percent: 1.5, layer: "base", role: "Backed up by heliotropin rather than vanillin" },
      { materialId: "heliotropin", layer: "base", role: "Complements both the lilac and carnation notes; also an ingredient of certain muguet types" },
      { materialId: "ylang-oil", layer: "heart", role: "The ylang / methyl ionone combination is again present" },
      { materialId: "methyl-ionone", layer: "heart", role: "1:1 with ylang" },
      { materialId: "cedarwood-virginia", layer: "base", role: "Further augments the woody note" },
      { materialId: "oakmoss-abs", layer: "base", role: "Present as a major structural component — a new direction within the family, influencing Calandre and Rive Gauche" },
      { materialId: "eugenol", layer: "heart", role: "Part of the carnation bases used as auxiliary notes" },
      { materialId: "vanillin", layer: "trace", role: "Carnation bases contain both eugenol and vanillin, a convenient way of adding trace amounts of both" },
      { materialId: "rose-abs", layer: "heart", role: "Rose, jasmine and tuberose may be added, together with tonka" },
      { materialId: "jasmine-abs", layer: "heart", role: "As above" },
      { materialId: "tuberose-abs", layer: "heart", role: "As above" },
      { materialId: "tonka-abs", layer: "base", role: "Backing up the coumarin" },
      { materialId: "ambrette-seed-abs", layer: "trace", role: "A trace gives wonderful smoothness, working particularly well as part of the rose accord" },
      { materialId: "labdanum-abs", layer: "base", role: "Ambrarome-type amber" },
    ],
    unquantified: [
      "Guaial acetate and guaiacwood (work especially well with the rose notes)",
      "A special rose type using the absolute made from beeswax",
      "Lilac aspect",
      "Trace natural vanilla",
      "The aldehyde block",
    ],
    evolution:
      "Comparing it with Chanel No. 5, the striking development is in the composition of the floral notes through increased reliance on synthetics. When using vetiveryl acetate it was usual practice to put back some unprocessed vetiver oil, giving greater naturalness while preserving the fine quality of the derived acetate — a technique worth copying. Madame Rochas inspired a large number of functional fragrances; the Camay soap type, built around much the same floral-woody-aldehydic complex with oakmoss, coumarin and musks, introduced Vertofix as the main woody material with Vertenex reinforcing, and lavandin reinforcing linalool and linalyl acetate.",
    modernisation: [
      "Hydroxycitronellal at 15% is far beyond modern limits — this is the biggest single change required.",
      "Oakmoss as a major component now requires a low-atranol grade plus Evernyl.",
      "Ambrette seed absolute carries a phototoxicity concern from furocoumarins.",
      "Ambrarome is a historical specialty; approximate with labdanum/olibanum/vanilla.",
    ],
    source: SRC,
  },
  {
    id: "calandre",
    perfume: "Calandre",
    house: "Paco Rabanne",
    year: 1968,
    family: "floral-aldehydic",
    coreAccord:
      "The Madame Rochas pattern with a deliberate metallic theme: rose oxide and diphenyl oxide combined with geranium, nerol and geranyl acetate in the rose complex. Despite being classed as floral-aldehydic it is one of the least aldehydic — C10 and C12 lauric together make up only about 0.2%.",
    quantifiedCoverage:
      "Good. Hedione 6%, hexyl cinnamic aldehyde 8%, Lyral 4%, Helional 1%, vetiver 6%, jasmine 3-4%, aldehydes ~0.2%.",
    lines: [
      { materialId: "hedione", percent: 6, layer: "heart", role: "Only generally available after Madame Rochas; forms an important accord with Helional" },
      { materialId: "hexyl-cinnamal", percent: 8, layer: "heart", role: "The Hedione / hexyl cinnamic aldehyde combination went on to play an important role in many modern perfumes" },
      { materialId: "helional", percent: 1, layer: "heart", role: "With Hedione, previously used together in Eau Sauvage and Diorella" },
      { materialId: "rose-oxide", layer: "trace", role: "Provides much of the metallic character" },
      { materialId: "diphenyl-oxide", layer: "trace", role: "Metallic character, with geranium, nerol and geranyl acetate" },
      { materialId: "geranium-oil", layer: "heart", role: "Rose complex" },
      { materialId: "nerol", layer: "heart", role: "Rose complex" },
      { materialId: "geranyl-acetate", layer: "heart", role: "Rose complex" },
      { materialId: "aldehyde-c10", percent: 0.1, layer: "top", role: "With C12 lauric, ~0.2% total — one of the least aldehydic of the family" },
      { materialId: "aldehyde-c12-lauric", percent: 0.1, layer: "top", role: "As above" },
      { materialId: "hydroxycitronellal", layer: "heart", role: "Muguet, simply represented" },
      { materialId: "cyclamen-aldehyde", layer: "heart", role: "Stands in for the source's Lyral 4% (green emphasis) — Lyral is prohibited" },
      { materialId: "phenylacetaldehyde", layer: "heart", role: "A significant amount, fitting the metallic theme" },
      { materialId: "vetiver-oil", percent: 6, layer: "base", role: "Woody part, based on vetiveryl acetate with vetiver" },
      { materialId: "vetiveryl-acetate", layer: "base", role: "Main woody material" },
      { materialId: "sandalwood-oil", layer: "base", role: "Woody" },
      { materialId: "oakmoss-abs", layer: "base", role: "Backed up by Evernyl" },
      { materialId: "evernyl", layer: "base", role: "A synthetic created from the study of natural oakmoss; increasingly important in modern perfumery" },
      { materialId: "jasmine-abs", percent: 3.5, layer: "heart", role: "Natural jasmine rounds off the synthetic floral notes" },
      { materialId: "indole", layer: "trace", role: "Additional indole, with styrax oil" },
      { materialId: "styrax-oil", layer: "heart", role: "Rounds off the synthetic floral notes" },
      { materialId: "coumarin", layer: "base", role: "Again present" },
      { materialId: "vanillin", layer: "trace", role: "A trace" },
      { materialId: "musk-ketone", layer: "base", role: "Backed up by cyclopentadecanolide" },
      { materialId: "cyclopentadecanolide", layer: "base", role: "Backs up the musk ketone" },
      { materialId: "rose-abs", layer: "heart", role: "The essentially synthetic effect of the green and metallic notes is made acceptable by the use of natural rose oil, one of the most beautiful and irreplaceable products in fine perfumery" },
    ],
    unquantified: [
      "Printenyl-type specialty base (Glycolierral + phenylacetaldehyde glyceroacetal + Helional), possibly used as such",
      "The muguet aspect beyond hydroxycitronellal",
    ],
    evolution:
      "Created to reflect the metallic theme Paco Rabanne was using in fashion at the time. Although it lacks the impact required by today's standards, it remains one of the most beautifully made perfumes; its combination of green, floral and woody notes made it the starting point for a number of successful toiletry and cosmetic fragrances. Compared with Rive Gauche (1970), which has a remarkably similar structure but far greater immediate impact and less subtlety — Calandre was made for the traditionally elite couturier market, Rive Gauche deliberately looked toward the younger Left Bank culture.",
    modernisation: [
      "Lyral prohibited — substitute in the green muguet.",
      "Musk ketone banned.",
      "Oakmoss restricted; Calandre already anticipated the answer by backing it with Evernyl.",
      "This one is unusually rebuildable: it was already highly synthetic, so few of its materials are naturals that have changed character.",
    ],
    source: SRC,
  },
  {
    id: "rive-gauche",
    perfume: "Rive Gauche",
    house: "Yves Saint Laurent",
    year: 1970,
    family: "floral-aldehydic",
    coreAccord:
      "Structurally remarkably similar to Calandre, with a rose complex dominated by geranium and aldehydic notes, and Hedione plus hexyl cinnamic aldehyde again making up some 15% of the formula. The impact comes largely from the woody character.",
    quantifiedCoverage: "Sparse. Hedione + hexyl cinnamic aldehyde ≈15% combined, cedarwood 2%, Kephalis 3%.",
    lines: [
      { materialId: "hedione", percent: 8, layer: "heart", role: "With hexyl cinnamic aldehyde, ~15% of the formula" },
      { materialId: "hexyl-cinnamal", percent: 7, layer: "heart", role: "As above" },
      { materialId: "kephalis", percent: 3, layer: "base", role: "A woody amber material of great tenacity — much of the perfume's impact" },
      { materialId: "cedarwood-virginia", percent: 2, layer: "base", role: "Augments the woody character" },
      { materialId: "cyclamen-aldehyde", layer: "heart", role: "Used as part of the muguet (replacing the source's Lyral, now prohibited)" },
      { materialId: "geranium-oil", layer: "heart", role: "Greater emphasis than in Calandre" },
      { materialId: "musk-ketone", layer: "base", role: "Again present — banned today" },
      { materialId: "coumarin", layer: "base", role: "Again present" },
      { materialId: "rose-abs", layer: "heart", role: "Rose complex similar to Calandre's" },
    ],
    unquantified: ["The aldehydic emphasis in the rose complex", "Other trace materials", "The oakmoss element"],
    evolution:
      "Rive Gauche may be thought of as bringing to an end the fashion for classically formulated floral-aldehydic perfumes. The comparison with Calandre is instructive: same structure, deliberately different intent — greater immediate impact, less perfectly rounded character.",
    modernisation: [
      "Lyral prohibited; musk ketone banned.",
      "Kephalis at 3% is still available and still does the same job — one of the few cases where a key modern material has survived unchanged.",
    ],
    source: SRC,
  },
  {
    id: "white-linen",
    perfume: "White Linen",
    house: "Estée Lauder",
    year: 1978,
    family: "floral-aldehydic",
    coreAccord:
      "Bold blocks of material in a perfectly balanced accord: Vertofix 20% replaces vetiveryl acetate as the main woody material, with Galaxolide 20% as the dominant musk. Vertofix, Galaxolide, musk ketone, cyclopentadecanolide, ethylene brassylate, vetiver, Hedione and hydroxycitronellal together make up some 75% of the formula.",
    quantifiedCoverage:
      "Strong on the base. Vertofix 20%, Galaxolide 20%, and ~75% accounted for by the eight named base/heart materials. Nearly 1% aldehydes.",
    lines: [
      { materialId: "vertofix", percent: 20, layer: "base", role: "Takes the place of vetiveryl acetate as the main woody material" },
      { materialId: "galaxolide", percent: 20, layer: "base", role: "Dominant musk, with musk ketone, cyclopentadecanolide and ethylene brassylate" },
      { materialId: "musk-ketone", layer: "base", role: "Banned today" },
      { materialId: "cyclopentadecanolide", layer: "base", role: "Musk complex" },
      { materialId: "ethylene-brassylate", layer: "base", role: "Musk complex" },
      { materialId: "vetiver-oil", layer: "base", role: "Part of the ~75%" },
      { materialId: "hedione", layer: "heart", role: "Part of the ~75%" },
      { materialId: "hydroxycitronellal", layer: "heart", role: "Part of the ~75%" },
      { materialId: "aldehyde-c10", percent: 0.35, layer: "top", role: "Nearly 1% of aldehydes — following the intensely aldehydic character of No. 5" },
      { materialId: "aldehyde-c11-undecylenic", percent: 0.35, layer: "top", role: "Aldehyde block" },
      { materialId: "aldehyde-c12-lauric", percent: 0.3, layer: "top", role: "Aldehyde block" },
      { materialId: "nerol", layer: "heart", role: "An unusually high proportion in the dominant fine-quality rose note" },
      { materialId: "phenylethyl-dimethyl-carbinol", layer: "heart", role: "DMBCA forms an important link between the rose notes and the woody materials" },
      { materialId: "rose-abs", layer: "heart", role: "As in so many largely synthetic perfumes, a natural rose oil is needed as part of the rose complex to bring complexity and aesthetic quality" },
      { materialId: "eugenol", layer: "trace", role: "Small amounts of carnation materials add depth and finish" },
      { materialId: "vanillin", layer: "trace", role: "Carnation materials" },
    ],
    unquantified: [
      "Liffarome (fresh green character in the muguet)",
      "Acetaldehyde diphenylethyl acetal (more long-lasting green, backing up Liffarome)",
      "The powerful amber note completing the composition",
    ],
    evolution:
      "Although it has links to Madame Rochas and Calandre, White Linen further revolutionised the genre with a structure that looks forward to many of today's monolithic perfumes. It follows the intensely aldehydic character of No. 5 but without the modifying influence of bergamot and ylang, or the sweetness of coumarin and vanillin. The simplicity of the idea is truly amazing — bold blocks of materials in a perfectly balanced accord. Galaxolide's smell became strongly associated with washing powders and fabric conditioners; its use here alongside a high proportion of aldehydes may have been deliberate, to give the character of freshly washed white linen — or perhaps the fragrance inspired the name.",
    modernisation: [
      "Musk ketone banned — but with Galaxolide already at 20%, the loss is easy to absorb.",
      "This is the most rebuildable of the aldehydic florals: it is already essentially a synthetic formula with a natural rose oil for quality.",
      "Liffarome is a specialty; approximate with a green acetal plus a trace of cis-3-hexenyl salicylate.",
      "Galaxolide itself is now under environmental scrutiny — consider a partial swap to Habanolide, though this changes the character.",
    ],
    source: SRC,
  },

  /* ================================================================ */
  /* FLORAL SWEET FAMILY                                              */
  /* ================================================================ */
  {
    id: "lorigan",
    perfume: "L'Origan",
    house: "Coty",
    year: 1905,
    family: "floral-sweet",
    coreAccord:
      "Compounded floral bases combined with methyl ionone and an ambreine note (vanillin, coumarin, civet), with vetiveryl acetate, heliotropin and the nitromusks as additional base notes, over a traditional top of bergamot, orange, neroli and ylang.",
    quantifiedCoverage: "None. The source describes the structure qualitatively; no loadings are given for L'Origan itself.",
    lines: [
      { materialId: "jasmin-231", layer: "heart", role: "One of the compounded floral bases Firmenich introduced around this period, alongside Dianthine and Fleur d'Oranger" },
      { materialId: "methyl-ionone", layer: "base", role: "Powdery woody-floral" },
      { materialId: "vanillin", layer: "base", role: "Ambreine note" },
      { materialId: "coumarin", layer: "base", role: "Ambreine note" },
      { materialId: "vetiveryl-acetate", layer: "base", role: "Additional base note" },
      { materialId: "heliotropin", layer: "heart", role: "Powdery sweet" },
      { materialId: "musk-ketone", layer: "base", role: "Nitromusks — banned today" },
      { materialId: "bergamot-oil", layer: "top", role: "Traditional top" },
      { materialId: "sweet-orange-oil", layer: "top", role: "Traditional top" },
      { materialId: "neroli-oil", layer: "top", role: "Traditional top" },
      { materialId: "ylang-oil", layer: "top", role: "Traditional top, leading into the floral notes" },
      { materialId: "mousse-de-saxe", layer: "base", role: "A mossy character similar to Mousse de Saxe, based on isobutyl quinoline, appears in many perfumes of this genre" },
    ],
    unquantified: ["Civet (in the ambreine note)", "Dianthine", "Fleur d'Oranger"],
    evolution:
      "The style is characteristic of the first decade of the twentieth century, when many new floral aroma chemicals were being discovered and used to create compounded floral bases. Those bases became the starting point and inspiration for perfumers who often worked independently of the supply houses. L'Origan created a style that influenced Oscar de la Renta, Vanderbilt, Poison and Loulou. A similar idea was used in L'Heure Bleue (1912), but few other surviving perfumes in the genre were created until the style was revived by Oscar de la Renta in 1976.",
    modernisation: [
      "Civet and nitromusks unavailable.",
      "The Firmenich specialty bases (Jasmin 231, Dianthine, Fleur d'Oranger) are historical; build equivalents from the jasmine and orange-blossom bases in `accords.ts`.",
      "Heliotropin is a controlled drug precursor in many jurisdictions — a procurement problem as much as a formulation one.",
    ],
    source: SRC,
  },
  {
    id: "oscar-de-la-renta",
    perfume: "Oscar de la Renta",
    house: "Stern",
    year: 1976,
    family: "floral-sweet",
    coreAccord:
      "At the heart: methyl ionone, an ambreine note, carnation and orange blossom in the approximate proportions 2 : 1 : 1 : 1. Heliotropin 7.5%, coumarin and musk ketone add to the powdery sweet semi-oriental character.",
    quantifiedCoverage:
      "Good on the heart. The 2:1:1:1 ratio plus heliotropin 7.5%, Vertofix 5%, Hedione 8%, linalyl acetate ~10% including that from the bergamot.",
    lines: [
      { materialId: "methyl-ionone", ratio: "2", layer: "base", role: "The largest of the four heart components" },
      { materialId: "vanillin", ratio: "1 (ambreine note)", layer: "base", role: "Part of the ambreine" },
      { materialId: "coumarin", ratio: "1 (ambreine note)", layer: "base", role: "Part of the ambreine" },
      { materialId: "eugenol", ratio: "1 (carnation accord)", layer: "heart", role: "One of the two most important constituents, contained in the carnation accord" },
      { materialId: "methyl-anthranilate", ratio: "1 (orange blossom)", layer: "heart", role: "The other most important constituent — the Schiff bases from the orange blossom" },
      { materialId: "heliotropin", percent: 7.5, layer: "heart", role: "Powdery sweet semi-oriental character" },
      { materialId: "vertofix", percent: 5, layer: "base", role: "Used rather than vetiveryl acetate as the main woody note" },
      { materialId: "hedione", percent: 8, layer: "heart", role: "Added to a traditional jasmine complex" },
      { materialId: "linalyl-acetate", percent: 10, layer: "top", role: "A large amount, including that contributed by the bergamot" },
      { materialId: "musk-ketone", layer: "base", role: "Banned today" },
      { materialId: "benzoin-resinoid", layer: "base", role: "Resin" },
      { materialId: "opoponax-resinoid", layer: "base", role: "Resin" },
      { materialId: "sandalwood-oil", layer: "base", role: "A small amount, with Vertofix" },
      { materialId: "bergamot-oil", layer: "top", role: "Fresh top lightening the dominant sweetness" },
      { materialId: "sweet-orange-oil", layer: "top", role: "Fresh top" },
      { materialId: "mandarin-oil", layer: "top", role: "Fresh top" },
      { materialId: "linalool", layer: "top", role: "With linalyl acetate" },
      { materialId: "ylang-oil", layer: "heart", role: "Leads into the sweet floral and powdery notes" },
      { materialId: "basil-oil", layer: "top", role: "Contains a high proportion of estragole; leads into the sweet floral notes" },
      { materialId: "orris-resinoid", layer: "base", role: "Probably in the form of the resin — one of three notes completing this unusually complex perfume" },
      { materialId: "phenoxyethyl-isobutyrate", layer: "heart", role: "Fruity note, in accord with dimethyl benzyl carbinyl butyrate" },
      { materialId: "mousse-de-saxe", layer: "base", role: "The mossy note reminiscent of Mousse de Saxe" },
      { materialId: "jasmine-abs", layer: "heart", role: "Traditional jasmine complex" },
      { materialId: "rose-abs", layer: "heart", role: "Rose notes present" },
    ],
    unquantified: [
      "Jessemal (added to the jasmine complex)",
      "Hyacinth (a small amount)",
      "Dimethyl benzyl carbinyl butyrate (the fruity accord partner)",
    ],
    evolution:
      "Despite the seventy-odd years separating them, Oscar de la Renta shows a remarkable similarity in overall conception to L'Origan. Whether or not it was originally formulated around bases as L'Origan was, its composition can conveniently be described along the same lines. It revived a dormant genre.",
    modernisation: [
      "Musk ketone banned.",
      "Civet in the ambreine note unavailable.",
      "Heliotropin is a controlled precursor; isoeugenol and hydroxycitronellal are restricted.",
      "Jessemal and Mousse de Saxe are specialty products — approximate or omit.",
    ],
    source: SRC,
  },
  {
    id: "poison",
    perfume: "Poison",
    house: "Dior",
    year: 1985,
    family: "floral-sweet",
    coreAccord:
      "The Oscar de la Renta combination — methyl anthranilate with its Schiff bases, heliotropin, coumarin and vanillin — pushed much harder toward tuberose than orange blossom, with Lyral 10% reinforcing the heavy floral character in place of methyl ionone, which is almost completely absent.",
    quantifiedCoverage: "Sparse. Lyral 10% and Galaxolide 5% are the only loadings given.",
    lines: [
      { materialId: "methyl-anthranilate", layer: "heart", role: "Even greater emphasis than in Oscar; with its Schiff bases it is the starting point for both orange blossom and tuberose notes, and here the tuberose direction is taken" },
      { materialId: "helional", layer: "heart", role: "Substituted for the source's Lyral 10% — Lyral is prohibited in EU cosmetics" },
      { materialId: "heliotropin", layer: "heart", role: "With coumarin and vanillin" },
      { materialId: "coumarin", layer: "base", role: "Sweet" },
      { materialId: "vanillin", layer: "base", role: "Sweet" },
      { materialId: "aldehyde-c18", layer: "heart", role: "Creamy coconut, added for the tuberose direction" },
      { materialId: "gamma-decalactone", layer: "heart", role: "Creamy fruity" },
      { materialId: "methyl-salicylate", layer: "heart", role: "Genuinely characteristic of tuberose; strictly limited" },
      { materialId: "galaxolide", percent: 5, layer: "base", role: "Musk element greatly emphasised, with Celestolide reinforcing musk ketone" },
      { materialId: "celestolide", layer: "base", role: "Reinforcing the musk" },
      { materialId: "musk-ketone", layer: "base", role: "Banned today" },
      { materialId: "damascone-alpha", layer: "trace", role: "Fruity-floral, adding to the narcotic effect" },
      { materialId: "damascone-beta", layer: "trace", role: "As above" },
      { materialId: "rose-oxide", layer: "trace", role: "Significant amounts, adding to the fruity-floral character" },
      { materialId: "mandarin-oil", layer: "top", role: "With geranium, brings a welcome touch of freshness" },
      { materialId: "geranium-oil", layer: "top", role: "As above; the combination also occurs in Giorgio" },
    ],
    unquantified: [
      "Cypress oil (replaces the eliminated fresh top note with a somewhat narcotic effect)",
      "Canthoxal and Lilial — floral aldehydes which, like Lyral, form Schiff bases with methyl anthranilate",
    ],
    evolution:
      "The general structure is clearly related to Oscar de la Renta, the most obvious difference being the almost complete absence of methyl ionone. In its place the heavy floral character is reinforced by a large amount of Lyral. The fresh top note has been largely eliminated, replaced by the narcotic effect of cypress oil. In later perfumes such as Loulou (1987) the oriental and tuberose notes were developed further along Oscar de la Renta's lines to give a hybrid 'floriental' effect. The source's own verdict is worth keeping: much as its technical excellence is admired, it is a difficult perfume to live with, and a perfume that intrudes so ostentatiously on other people's space can be irritatingly offensive. Projection is a design decision with social consequences.",
    modernisation: [
      "Three of the floral aldehydes named — Lyral, Lilial and Canthoxal — are problematic. Lyral and Lilial are prohibited in EU cosmetics. All three form Schiff bases with methyl anthranilate, which means the composition changes chemically over time.",
      "Musk ketone banned.",
      "The Schiff-base chemistry is a real issue for shelf life and for analysis: these reaction products are not in the original formula as such, they form in it.",
    ],
    source: SRC,
  },
  {
    id: "vanderbilt",
    perfume: "Vanderbilt",
    house: "Vanderbilt",
    year: 1981,
    family: "floral-sweet",
    coreAccord:
      "Fresh citrus top notes over orange blossom and tuberose, with Hedione, methyl ionone, heliotropin, vanillin and musk ketone, and Iso E Super as the woody note — lacking most of the heavy floral sweetness of the group, with little eugenol and little or no ylang or coumarin.",
    quantifiedCoverage: "None. No loadings given.",
    lines: [
      { materialId: "hedione", layer: "heart", role: "Core floral radiance" },
      { materialId: "methyl-ionone", layer: "base", role: "Powdery woody" },
      { materialId: "heliotropin", layer: "heart", role: "Powdery sweet" },
      { materialId: "vanillin", layer: "base", role: "Sweetness" },
      { materialId: "musk-ketone", layer: "base", role: "Banned today" },
      { materialId: "iso-e-super", layer: "base", role: "The woody note" },
      { materialId: "orange-flower-abs", layer: "heart", role: "Orange blossom" },
      { materialId: "methyl-anthranilate", layer: "heart", role: "Orange blossom / tuberose" },
      { materialId: "tuberose-abs", layer: "heart", role: "Tuberose" },
      { materialId: "allyl-amyl-glycolate", layer: "top", role: "With allyl cyclohexyl propionate, gives a fruity-green note replacing the fruit and hyacinth notes in Oscar" },
      { materialId: "phenylethyl-phenylacetate", layer: "heart", role: "A honey note giving added character to the orange blossom aspect" },
      { materialId: "bergamot-oil", layer: "top", role: "Fresh citrus top" },
      { materialId: "mandarin-oil", layer: "top", role: "Fresh citrus top" },
    ],
    unquantified: ["Allyl cyclohexyl propionate", "The full citrus top"],
    evolution:
      "Included in the sweet-floral family; enjoyed particular success in the United States. As in White Linen, there is an admirable economy of structure, made remarkable by the subtle use of contrasting nuances.",
    modernisation: ["Musk ketone banned.", "Heliotropin is a controlled precursor."],
    source: SRC,
  },

  /* ================================================================ */
  /* ORIENTAL / AMBER FAMILY                                          */
  /* ================================================================ */
  {
    id: "shalimar",
    perfume: "Shalimar",
    house: "Guerlain",
    year: 1925,
    family: "amber",
    coreAccord:
      "The ambreine accord: a bergamot-dominated top (~30%) over ethyl vanillin 3% and coumarin 9%, with patchouli 4%, sandalwood, civet and vetiver, and castoreum forming the basis of the leather aspect.",
    quantifiedCoverage:
      "Good on the pillars. Bergamot ~30% of the top, ethyl vanillin 3%, coumarin 9%, patchouli 4%. Ethyl vanillin is roughly 3-4× the strength of vanillin, so 10-12% vanillin is a normal equivalent in perfumes of this type.",
    lines: [
      { materialId: "bergamot-oil", percent: 30, layer: "top", role: "The top note is dominated by some 30% bergamot" },
      { materialId: "ethyl-vanillin", percent: 3, layer: "base", role: "One of the two important synthetics discovered around the turn of the century introduced into this classical structure" },
      { materialId: "coumarin", percent: 9, layer: "base", role: "The second" },
      { materialId: "patchouli-oil", percent: 4, layer: "base", role: "Making up the rest of the ambreine accord" },
      { materialId: "sandalwood-oil", layer: "base", role: "Ambreine accord" },
      { materialId: "vetiver-oil", layer: "base", role: "Ambreine accord" },
      { materialId: "castoreum-abs", layer: "base", role: "Of particular importance — forms the basis of the leather aspect, which may be further developed with a leather base such as a classic Cuir de Russie" },
      { materialId: "cinnamon-bark-oil", layer: "heart", role: "Part of the spicy aspect; fits perfectly with the leather. Coriander, nutmeg and clove also work well" },
      { materialId: "rose-abs", layer: "heart", role: "A small amount — these orientals are among the least floral of perfumes, relying mainly on a little rose, usually both the natural oil and absolute, plus synthetics" },
      { materialId: "rose-otto", layer: "heart", role: "The natural oil as well as the absolute" },
      { materialId: "citronellol", layer: "heart", role: "In a perfume of this period, of natural origin — rhodinol from geranium" },
      { materialId: "geraniol", layer: "heart", role: "Of natural origin, from palmarosa. These products, because of the numerous trace materials retained from the starting material, have a quality and performance almost impossible to achieve with their purely synthetic counterparts" },
      { materialId: "neroli-oil", layer: "top", role: "With the other citrus oils and rosewood" },
      { materialId: "labdanum-abs", layer: "base", role: "Amber note" },
      { materialId: "vanilla-abs", layer: "base", role: "As a tincture — giving naturalness to the ethyl vanillin" },
      { materialId: "benzoin-resinoid", layer: "base", role: "As a tincture" },
      { materialId: "tonka-abs", layer: "base", role: "As a tincture" },
      { materialId: "ambroxan", layer: "base", role: "Standing in for the original ambergris tincture" },
    ],
    unquantified: [
      "Civet (in the ambreine accord)",
      "Tinctures of civet, castoreum, ambergris and musk",
      "Other citrus oils in the top",
      "Rosewood",
    ],
    evolution:
      "In structure it looks back to a nineteenth-century style based on a large proportion of expressed and distilled essential oils, to which animalic and balsamic materials were added as fixatives. Into this classical structure were introduced two of the most important synthetics discovered around the turn of the century. At the time it was made, it was customary to use a high proportion of alcoholic tinctures made from natural products rather than concentrated absolutes and resins; those tinctures retain more of the most volatile components of the starting material, giving a wonderful quality and life to the finished product. Guerlain used the same leather idea in Mitsouko, one of the earliest chypres to also contain a fruity note based on aldehyde C14. The source's verdict: one of the greatest and most aesthetically satisfying perfumes ever made.",
    modernisation: [
      "Civet, natural musk and ambergris are all unavailable and in any case restricted (ambergris is sperm-whale derived and CITES-restricted).",
      "Tinctures are largely obsolete for cost reasons; where they are used at all it is confined to fine perfumery.",
      "Ethyl vanillin and vanillin discolour heavily — expect a dark composition.",
      "Castoreum is ethically and commercially marginal; use a synthetic leather base.",
      "The natural-origin citronellol and geraniol point is still live and still true: perfumery-grade natural isolates outperform their synthetic equivalents because neither is pure.",
    ],
    source: SRC,
  },
  {
    id: "must-de-cartier",
    perfume: "Must de Cartier",
    house: "Cartier",
    year: 1981,
    family: "amber",
    coreAccord:
      "The classic oriental structure retained, plus a new accord of approximately equal amounts of Hedione, sandalwood and Galaxolide. Those three with vanillin — which replaces Shalimar's ethyl vanillin — make up some 40% of the formula.",
    quantifiedCoverage: "Moderate. The equal-parts Hedione/sandalwood/Galaxolide accord plus vanillin ≈40% total.",
    lines: [
      { materialId: "hedione", percent: 11, layer: "heart", role: "Roughly equal parts with sandalwood and Galaxolide" },
      { materialId: "sandalwood-oil", percent: 11, layer: "base", role: "Equal parts" },
      { materialId: "galaxolide", percent: 11, layer: "base", role: "Equal parts" },
      { materialId: "vanillin", percent: 7, layer: "base", role: "Replaces Shalimar's ethyl vanillin; the three plus vanillin make ~40%" },
      { materialId: "coumarin", layer: "base", role: "Again a major component" },
      { materialId: "cedryl-acetate", layer: "base", role: "Coming in to support the sandalwood" },
      { materialId: "triphenylacetaldehyde-green", layer: "top", role: "A small fruity-green accord added to the top note, with aldehyde C14" },
      { materialId: "aldehyde-c14", layer: "top", role: "Fruity-green accord" },
      { materialId: "thyme-oil", layer: "trace", role: "A trace may be added — an idea reminiscent of Mitsouko" },
      { materialId: "bergamot-oil", layer: "top", role: "Classic oriental top" },
      { materialId: "labdanum-abs", layer: "base", role: "Amber" },
    ],
    unquantified: ["The full citrus top", "Rose and woody notes of the retained classic structure"],
    evolution:
      "The seventy years separating it from Shalimar saw a revolution in perfumery style as well as in the availability of new synthetics. Although most of the classic oriental structure remains in place, the Hedione/sandalwood/Galaxolide accord is a wholly modern addition. It marks one of the important new directions opened by the oriental renaissance: a move toward dominantly sandalwood perfumes, using the newly available sandalwood synthetics (Brahmanol, Sandranol, Madranol, Sandalore) alongside natural sandalwood — as in Joop and Samsara.",
    modernisation: [
      "Remarkably rebuildable: Hedione, Galaxolide, cedryl acetate and sandalwood synthetics are all still available.",
      "Natural sandalwood is the only real problem — Santalum album is protected. Use certified plantation stock, S. spicatum, or Javanol/Bacdanol.",
      "Galaxolide is under environmental scrutiny.",
    ],
    source: SRC,
  },
  {
    id: "obsession",
    perfume: "Obsession",
    house: "Calvin Klein",
    year: 1985,
    family: "amber",
    coreAccord:
      "A classical oriental with the fruity-green and aromatic herbal notes emphasised, in a manner reminiscent of Alliage (1972): the classic combination of armoise, galbanum and methyl chavicol, with citrus oils some 25%.",
    quantifiedCoverage: "Moderate. Citrus ~25%, Galaxolide 5%.",
    lines: [
      { materialId: "bergamot-oil", percent: 12, layer: "top", role: "Part of the ~25% citrus oils" },
      { materialId: "lemon-oil", percent: 7, layer: "top", role: "Part of the citrus" },
      { materialId: "mandarin-oil", percent: 6, layer: "top", role: "Part of the citrus" },
      { materialId: "galaxolide", percent: 5, layer: "base", role: "Enhances the general sweetness, with Tonalid, ethylene brassylate and musk ketone" },
      { materialId: "tonalid", layer: "base", role: "Musk complex" },
      { materialId: "ethylene-brassylate", layer: "base", role: "Musk complex" },
      { materialId: "musk-ketone", layer: "base", role: "Banned today" },
      { materialId: "cashmeran", layer: "base", role: "An intensely sweet fruity musk material associated with the synthesis of Galaxolide" },
      { materialId: "armoise-oil", layer: "top", role: "The classic armoise/galbanum/methyl chavicol combination" },
      { materialId: "galbanum-oil", layer: "top", role: "As above — a combination that reappears in a chypre context, going back to Bandit and Cabochard" },
      { materialId: "basil-oil", layer: "top", role: "Methyl chavicol is the major constituent of basil and estragon" },
      { materialId: "tagete-oil", layer: "top", role: "Of particular interest for the natural, almost applelike nuance it brings to the fruity-green character" },
      { materialId: "triphenylacetaldehyde-green", layer: "top", role: "Small amounts, contributing to the fruity-green effect" },
      { materialId: "allyl-amyl-glycolate", layer: "top", role: "Small amounts, as above" },
      { materialId: "helional", layer: "heart", role: "Acts as a link to the Hedione" },
      { materialId: "hedione", layer: "heart", role: "Used in the same way as in Must de Cartier" },
      { materialId: "lavender-oil", layer: "top", role: "Aromatic" },
      { materialId: "sandalwood-oil", layer: "base", role: "General construction follows a classical oriental" },
      { materialId: "patchouli-oil", layer: "base", role: "As above" },
      { materialId: "vanillin", layer: "base", role: "As above" },
      { materialId: "coumarin", layer: "base", role: "As above" },
      { materialId: "castoreum-abs", layer: "base", role: "As above" },
      { materialId: "rose-abs", layer: "heart", role: "As above" },
      { materialId: "labdanum-abs", layer: "base", role: "Ciste-labdanum amber notes" },
    ],
    unquantified: [
      "The full range of ciste-labdanum amber materials — the source notes that placing the amber notes is one of the most difficult tasks to accomplish well, that the total number and olfactory variety of such products is immense, and that because of their relatively high boiling points the identification of labdanum products and other resins and balsamic materials is largely beyond the range of GC analysis",
    ],
    evolution:
      "A further development along the Must de Cartier lines, with the fruity-green and aromatic herbal notes pushed further. Otherwise it follows the general construction of a classical oriental closely.",
    modernisation: [
      "Musk ketone banned.",
      "Castoreum marginal.",
      "Cashmeran and Tonalid are both still available.",
      "This entry is the clearest illustration in the whole set of GC's hard limit: the resins and balsams simply do not come off the column in routine analysis. A perfumer recreating an amber-heavy oriental must rely on the nose for the part of the formula that matters most.",
    ],
    source: SRC,
  },
  {
    id: "youth-dew",
    perfume: "Youth Dew",
    house: "Estée Lauder",
    year: 1952,
    family: "amber",
    coreAccord:
      "The mellis accord incorporating amyl salicylate in addition to benzyl salicylate, with the patchouli and woody aspect accentuated using cedryl acetate rather than the more traditional vetiver-derived products. Dominant spices, with eugenol, are clove and cinnamon.",
    quantifiedCoverage: "None. No loadings given.",
    lines: [
      { materialId: "amyl-salicylate", layer: "base", role: "Incorporated into the mellis accord in addition to benzyl salicylate" },
      { materialId: "benzyl-salicylate", layer: "base", role: "Mellis accord" },
      { materialId: "eugenol", layer: "heart", role: "With the dominant spices" },
      { materialId: "clove-bud-oil", layer: "heart", role: "Dominant spice" },
      { materialId: "cinnamon-bark-oil", layer: "heart", role: "Dominant spice" },
      { materialId: "patchouli-oil", layer: "base", role: "Accentuated" },
      { materialId: "cedryl-acetate", layer: "base", role: "Used rather than the more traditional vetiver-derived products — Vertofix had yet to be discovered" },
      { materialId: "hydroxycitronellal", layer: "heart", role: "Mellis accord" },
      { materialId: "coumarin", layer: "base", role: "Mellis accord" },
      { materialId: "benzoin-resinoid", layer: "base", role: "Sweet balsamic materials — important" },
      { materialId: "styrax-oil", layer: "base", role: "Important" },
      { materialId: "tolu-balsam", layer: "base", role: "Important" },
      { materialId: "peru-balsam", layer: "base", role: "Important" },
      { materialId: "sandalwood-oil", layer: "base", role: "Gives the overwhelming character, with oakmoss, labdanum, vanillin and animalic notes" },
      { materialId: "oakmoss-abs", layer: "base", role: "As above" },
      { materialId: "labdanum-abs", layer: "base", role: "As above" },
      { materialId: "vanillin", layer: "base", role: "As above" },
      { materialId: "castoreum-abs", layer: "base", role: "Contributing to the animalic aspect, with nitromusks" },
      { materialId: "musk-ketone", layer: "base", role: "Banned today" },
      { materialId: "paracresyl-acetate", layer: "base", role: "An animalic complex based on the esters of paracresol in combination with phenylacetates and cedarwood is probably also used" },
      { materialId: "phenylacetic-acid", layer: "base", role: "Phenylacetates in the animalic complex" },
      { materialId: "cedarwood-virginia", layer: "base", role: "Cedarwood in the animalic complex" },
    ],
    unquantified: [],
    evolution:
      "Originally launched as a bath additive, and one of the few western fine fragrances not diluted in ethanol. As much criticised as admired for its sheer impact and lack of aesthetic subtlety, it remains one of the most original and influential of perfumes. Its enormous success, particularly in the US and Great Britain, opened the way for the demand for the style of perfumery that has since come to dominate the market. Its influence is visible in Dioressence (1970), and it was not until Opium in 1977 that the oriental theme was developed further in a perfume of major importance.",
    modernisation: [
      "Musk ketone banned; castoreum marginal; amyl salicylate has largely fallen out of favour (use cis-3-hexenyl salicylate).",
      "Hydroxycitronellal restricted.",
      "A concentrate not diluted in ethanol is a different product form entirely — relevant if you are making an oil-based attar-style product rather than a spray.",
    ],
    source: SRC,
  },
  {
    id: "opium",
    perfume: "Opium",
    house: "Yves Saint Laurent",
    year: 1977,
    family: "amber",
    coreAccord:
      "The two types of oriental brought together: the mellis accord built around benzyl salicylate 12%, eugenol with clove and pimento, patchouli 8%, hydroxycitronellal 10%, Vertofix and coumarin 2.5% — with coumarin acting as the link between the mellis and the ambreine accord, the latter based on both vanillin and ethyl vanillin.",
    quantifiedCoverage:
      "Good on the mellis core. Benzyl salicylate 12%, patchouli 8%, hydroxycitronellal 10%, coumarin 2.5%, phenylethyl dimethyl carbinol 3%.",
    lines: [
      { materialId: "benzyl-salicylate", percent: 12, layer: "base", role: "The mellis accord is built around it" },
      { materialId: "patchouli-oil", percent: 8, layer: "base", role: "Mellis accord" },
      { materialId: "hydroxycitronellal", percent: 10, layer: "heart", role: "Mellis accord" },
      { materialId: "coumarin", percent: 2.5, layer: "base", role: "Acts as the link between the mellis and ambreine accords" },
      { materialId: "eugenol", layer: "heart", role: "With clove and pimento" },
      { materialId: "clove-bud-oil", layer: "heart", role: "Spice" },
      { materialId: "vertofix", layer: "base", role: "Mellis accord" },
      { materialId: "vanillin", layer: "base", role: "Ambreine accord, based on both vanillin and ethyl vanillin" },
      { materialId: "ethyl-vanillin", layer: "base", role: "Ambreine accord" },
      { materialId: "cis-3-hexenyl-salicylate", layer: "heart", role: "Backs up the benzyl salicylate" },
      { materialId: "helional", layer: "heart", role: "Stands in for the source's Lyral backing up hydroxycitronellal — Lyral is prohibited" },
      { materialId: "hedione", layer: "heart", role: "A small amount is included" },
      { materialId: "phenylethyl-dimethyl-carbinol", percent: 3, layer: "heart", role: "An important development in the rose aspect" },
      { materialId: "geranyl-acetate", layer: "heart", role: "The fresh character of the rose derives from its use" },
      { materialId: "bergamot-oil", layer: "top", role: "Top note combines orange, lemon, mandarin and bergamot" },
      { materialId: "sweet-orange-oil", layer: "top", role: "Top note" },
      { materialId: "lemon-oil", layer: "top", role: "Top note" },
      { materialId: "mandarin-oil", layer: "top", role: "Top note" },
      { materialId: "linalool", layer: "top", role: "With linalyl acetate and lavender" },
      { materialId: "linalyl-acetate", layer: "top", role: "Top note" },
      { materialId: "lavender-oil", layer: "top", role: "Top note" },
      { materialId: "benzoin-resinoid", layer: "base", role: "Balsamic and resinous materials contributing to the oriental effect" },
      { materialId: "styrax-oil", layer: "base", role: "As above" },
      { materialId: "opoponax-resinoid", layer: "base", role: "As above" },
      { materialId: "tolu-balsam", layer: "base", role: "As above" },
      { materialId: "castoreum-abs", layer: "base", role: "Emphasis on castoreum" },
      { materialId: "rose-abs", layer: "heart", role: "The rose aspect is more fully developed than in either Youth Dew or Shalimar" },
      { materialId: "aldehyde-c11-undecylenic", layer: "top", role: "Unlike the earlier orientals there is also an important aldehydic note" },
    ],
    unquantified: ["Centifolyl (added to the rose aspect)", "Pimento", "The exact aldehyde note"],
    evolution:
      "Although Youth Dew's influence is visible in Dioressence (1970), it was not until Opium in 1977 that the oriental theme was developed further in a perfume of major importance — which in turn inspired a number of subsequent fragrances in the genre. Opium is the point where the two oriental engines, mellis and ambreine, are joined, with coumarin as the hinge between them.",
    modernisation: [
      "Lyral prohibited; hydroxycitronellal at 10% exceeds modern limits; isoeugenol-class materials restricted.",
      "Castoreum marginal.",
      "Centifolyl is a specialty.",
      "Note the structure of the substitution problem: this formula has four separate materials under restriction, and each substitution shifts the balance of a 25-line composition.",
    ],
    source: SRC,
  },
  {
    id: "coco",
    perfume: "Coco",
    house: "Chanel",
    year: 1984,
    family: "amber",
    coreAccord:
      "Much the same pattern as Opium with greater emphasis on the floral notes: Hedione as a major constituent, with Lyral replacing hydroxycitronellal in the mellis accord. Those, together with the salicylates, eugenol and patchouli, make up some 45% of the formula.",
    quantifiedCoverage: "Sparse. The Hedione/Lyral/salicylate/eugenol/patchouli group ≈45%.",
    lines: [
      { materialId: "hedione", percent: 15, layer: "heart", role: "A major constituent" },
      { materialId: "helional", percent: 10, layer: "heart", role: "Stands in for the source's Lyral, which replaced hydroxycitronellal in the mellis accord — Lyral is prohibited" },
      { materialId: "benzyl-salicylate", percent: 10, layer: "base", role: "Salicylates" },
      { materialId: "eugenol", percent: 5, layer: "heart", role: "Mellis accord" },
      { materialId: "patchouli-oil", percent: 5, layer: "base", role: "Mellis accord" },
      { materialId: "ylang-oil", layer: "heart", role: "Added to the floral side, bringing out the carnation aspect of the eugenol-salicylate accord" },
      { materialId: "methyl-ionone", layer: "base", role: "Its presence tends in the direction of the older mellis-based perfumes such as Moment Suprême" },
      { materialId: "iso-e-super", layer: "base", role: "The woody side is predominantly a combination of Iso E Super and sandalwood" },
      { materialId: "sandalwood-oil", layer: "base", role: "As above" },
      { materialId: "jasmine-abs", layer: "heart", role: "With the rose components, gives a more floral effect" },
      { materialId: "rose-abs", layer: "heart", role: "As above" },
    ],
    unquantified: ["The rest of the oriental base", "Balsamic and resinous materials"],
    evolution:
      "Follows Opium's pattern but with greater floral emphasis. Again we see the use of a strong structural accord at the heart of a modern perfume — here some 45% of the formula in five materials. The renaissance of the oriental theme over the preceding 25 years produced several new directions: toward dominantly sandalwood perfumes (Joop, Samsara) and toward the florientals such as Loulou, which combine oriental sweetness with a floral complex usually based on tuberose — a link between the true orientals and the sweet florals.",
    modernisation: [
      "Lyral prohibited — and here it is load-bearing at ~10%, not decorative.",
      "This is a good demonstration of the general point: the more a restricted material carries the structure, the harder the rebuild. Compare White Linen, where the banned musk ketone sat alongside 20% Galaxolide and was easily absorbed.",
    ],
    source: SRC,
  },

  /* ================================================================ */
  /* PATCHOULI-FLORAL FAMILY                                          */
  /* ================================================================ */
  {
    id: "eau-sauvage",
    perfume: "Eau Sauvage",
    house: "Dior",
    year: 1966,
    family: "patchouli-floral",
    coreAccord:
      "A predominantly citrus-fresh fragrance with aromatic herbs — thyme, basil, armoise — over a background of jasmine, patchouli, Helional, eugenol, methyl ionone, woody notes and coumarin. The original use of Hedione.",
    quantifiedCoverage: "None given for Eau Sauvage itself; its materials are enumerated because they were reused in Diorella.",
    lines: [
      { materialId: "hedione", layer: "heart", role: "The original use of Hedione in a commercial perfume" },
      { materialId: "helional", layer: "heart", role: "With Hedione, an accord later reused in Calandre" },
      { materialId: "thyme-oil", layer: "top", role: "Aromatic herb" },
      { materialId: "basil-oil", layer: "top", role: "Aromatic herb" },
      { materialId: "armoise-oil", layer: "top", role: "Aromatic herb" },
      { materialId: "patchouli-oil", layer: "base", role: "Background" },
      { materialId: "eugenol", layer: "heart", role: "Background" },
      { materialId: "methyl-ionone", layer: "base", role: "Background" },
      { materialId: "coumarin", layer: "base", role: "Background" },
      { materialId: "bergamot-oil", layer: "top", role: "Citrus-fresh" },
    ],
    unquantified: ["Jasmine complex", "Woody notes"],
    evolution:
      "Although it stems from the classic eau de cologne accord, it can be seen as the origin of a new direction. Many of its materials were reused in the creation of Diorella six years later. The Hedione/Helional pairing introduced here went on to Calandre and then to the whole modern watery and marine register.",
    modernisation: ["Very rebuildable — almost every material named is still available and unrestricted."],
    source: SRC,
  },
  {
    id: "diorella",
    perfume: "Diorella",
    house: "Dior",
    year: 1972,
    family: "patchouli-floral",
    coreAccord:
      "Built around the accord between patchouli, Hedione, Helional and eugenol: Hedione 10%, Helional 5%, patchouli 6%, with an intense jasmine note including cis-jasmone 2%, hexyl cinnamic aldehyde, benzyl acetate and indole, and aldehyde C14 providing the fruity aspect.",
    quantifiedCoverage: "Good. Hedione 10%, Helional 5%, patchouli 6%, cis-jasmone 2%.",
    lines: [
      { materialId: "hedione", percent: 10, layer: "heart", role: "Part of the defining four-way accord" },
      { materialId: "helional", percent: 5, layer: "heart", role: "With eugenol, makes an accord with the Hedione, carrying the essential character into the heart" },
      { materialId: "patchouli-oil", percent: 6, layer: "base", role: "Part of the defining accord" },
      { materialId: "eugenol", layer: "heart", role: "Part of the defining accord" },
      { materialId: "cis-jasmone", percent: 2, layer: "heart", role: "Intense jasmine note" },
      { materialId: "hexyl-cinnamal", layer: "heart", role: "Intense jasmine note" },
      { materialId: "benzyl-acetate", layer: "heart", role: "Intense jasmine note" },
      { materialId: "indole", layer: "trace", role: "Intense jasmine note" },
      { materialId: "aldehyde-c14", layer: "heart", role: "Provides the fruity aspect" },
      { materialId: "lemon-oil", layer: "top", role: "Top note dominated by lemon, verbena, bergamot, linalool and linalyl acetate" },
      { materialId: "bergamot-oil", layer: "top", role: "Top note" },
      { materialId: "linalool", layer: "top", role: "Top note" },
      { materialId: "linalyl-acetate", layer: "top", role: "Top note" },
      { materialId: "lavender-oil", layer: "top", role: "With estragon" },
      { materialId: "basil-oil", layer: "top", role: "Estragon (methyl chavicol is basil's major constituent)" },
      { materialId: "methyl-ionone", layer: "base", role: "With patchouli, vetiver and a colourless oakmoss" },
      { materialId: "vetiver-oil", layer: "base", role: "Base" },
      { materialId: "evernyl", layer: "base", role: "A colourless oakmoss" },
      { materialId: "rose-abs", layer: "heart", role: "A small amount of rose; the floral side is otherwise mainly jasmine" },
      { materialId: "jasmine-abs", layer: "heart", role: "The richness of the perfume comes from jasmine absolute and trace amounts of other natural products" },
      { materialId: "petitgrain-oil", layer: "top", role: "Petitgrain citronnier works well in an olfactory reconstruction" },
      { materialId: "cardamom-oil", layer: "top", role: "Cardamom also works well in a reconstruction" },
    ],
    unquantified: ["Verbena", "Trace naturals"],
    evolution:
      "A unique and brilliantly conceived perfume. The 'watery' character of Helional, which plays an important part in both Eau Sauvage and Diorella, was subsequently used to create cool fruity notes such as Calyx, and then the modern marine notes based on Calone such as New West and Escape. Diorella is therefore the missing link between the aromatic citrus cologne tradition and the entire aquatic genre of the 1990s.",
    modernisation: [
      "Highly rebuildable: Hedione, Helional, cis-jasmone, patchouli, eugenol and Evernyl are all available.",
      "Eugenol is declarable but not restricted to the point of blocking.",
      "Note the specification of a *colourless* oakmoss — colour matters in pale compositions, and Evernyl was the solution in 1972 as it is now.",
    ],
    source: SRC,
  },
  {
    id: "aromatics-elixir",
    perfume: "Aromatics Elixir",
    house: "Clinique",
    year: 1972,
    family: "patchouli-floral",
    coreAccord:
      "Also based on the combination of patchouli and Hedione, but in many ways quite different from Diorella: containing salicylates, with little of the citrus top note, and a very much greater emphasis on rose in combination with the jasmine.",
    quantifiedCoverage: "None. Materials named without loadings.",
    lines: [
      { materialId: "patchouli-oil", layer: "base", role: "With Hedione, the foundation" },
      { materialId: "hedione", layer: "heart", role: "As above" },
      { materialId: "benzyl-salicylate", layer: "base", role: "Contains salicylates, unlike Diorella" },
      { materialId: "methyl-ionone", layer: "base", role: "Base note shared with Diorella" },
      { materialId: "vetiver-oil", layer: "base", role: "Base note shared with Diorella" },
      { materialId: "eugenol", layer: "heart", role: "Small amounts" },
      { materialId: "helional", layer: "heart", role: "Small amounts; stands in for the source's Lilial, which is prohibited" },
      { materialId: "hydroxycitronellal", layer: "heart", role: "Remarkable for its absence in Diorella, but present here — forming another important accord with the patchouli" },
      { materialId: "rose-abs", layer: "heart", role: "Very much greater emphasis on rose in combination with the jasmine" },
      { materialId: "jasmine-abs", layer: "heart", role: "With the rose" },
    ],
    unquantified: ["The full rose complex"],
    evolution:
      "Launched in the same year as Diorella. The combination of patchouli, Hedione, rose, hydroxycitronellal, methyl ionone and woody notes has been used in a number of subsequent perfumes including Coriandre, Aramis 900, Paloma Picasso and Knowing, which can be thought of as forming a small but characteristic family.",
    modernisation: [
      "Lilial is prohibited in EU cosmetics — a direct substitute is needed for the muguet-floral element.",
      "Hydroxycitronellal restricted.",
      "Oakmoss-heavy chypre-adjacent bases need low-atranol grades.",
    ],
    source: SRC,
  },
  {
    id: "coriandre",
    perfume: "Coriandre",
    house: "Couturier",
    year: 1973,
    family: "patchouli-floral",
    coreAccord:
      "The Hedione slot is filled by a closely related material with a rather more jasminic character (Magnolione), at some 20% of the formula with 10% patchouli — and a rose base probably making up some 10%.",
    quantifiedCoverage:
      "Good on the majors. Magnolione ~20%, patchouli 10%, rose base ~10%. The rose base composition is given in detail: phenylethyl alcohol, citronellol, geraniol, geranyl acetate, honey notes such as ethyl phenylacetate and phenylethyl phenylacetate, phenylacetaldehyde, rosatol, camomile, and violet leaf.",
    lines: [
      { materialId: "hedione", percent: 20, layer: "heart", role: "Standing in for Magnolione, a closely related material with a very similar though rather more jasminic olfactory character — Magnolione is a specialty" },
      { materialId: "patchouli-oil", percent: 10, layer: "base", role: "The other major" },
      { materialId: "phenylethyl-alcohol", percent: 3, layer: "heart", role: "Rose base (~10% of formula)" },
      { materialId: "citronellol", percent: 2, layer: "heart", role: "Rose base" },
      { materialId: "geraniol", percent: 1.5, layer: "heart", role: "Rose base" },
      { materialId: "geranyl-acetate", percent: 0.8, layer: "heart", role: "Rose base" },
      { materialId: "ethyl-phenylacetate", percent: 0.4, layer: "heart", role: "Honey note in the rose base" },
      { materialId: "phenylethyl-phenylacetate", percent: 0.4, layer: "heart", role: "Honey note in the rose base" },
      { materialId: "phenylacetaldehyde", percent: 0.5, layer: "heart", role: "Rose base" },
      { materialId: "violet-leaf-abs", percent: 0.2, layer: "heart", role: "Rose base" },
      { materialId: "hydroxycitronellal", layer: "heart", role: "Muguet, with Lyral and phenylacetaldehyde glyceroacetal" },
      { materialId: "helional", layer: "heart", role: "Stands in for the source's Lyral — prohibited" },
      { materialId: "methyl-ionone", layer: "base", role: "Woody aspect" },
      { materialId: "vetiveryl-acetate", layer: "base", role: "Woody aspect" },
      { materialId: "cedryl-acetate", layer: "base", role: "Woody aspect" },
      { materialId: "vertofix", layer: "base", role: "Woody aspect" },
      { materialId: "sandalwood-oil", layer: "base", role: "Woody aspect" },
      { materialId: "galaxolide", layer: "base", role: "A small amount, as the musk" },
      { materialId: "coriander-seed-oil", layer: "top", role: "Top note of coriander, ylang, styrallyl acetate and undecylenic aldehyde" },
      { materialId: "ylang-oil", layer: "top", role: "Top note" },
      { materialId: "styrallyl-acetate", layer: "top", role: "Top note" },
      { materialId: "aldehyde-c11-undecylenic", layer: "top", role: "Top note" },
      { materialId: "geranium-oil", layer: "heart", role: "Part of the rose note" },
    ],
    unquantified: ["Rosatol (a specialty)", "Camomile (Roman camomile)", "Phenylacetaldehyde glyceroacetal"],
    evolution:
      "Knowing (1988), although launched fifteen years later, follows a very similar pattern and the two are closely related in odour. Knowing adds a fruity-tuberose character and heliotropin, with the woody side dominated by vetiver and a small amount of Iso E Super.",
    modernisation: [
      "Magnolione is a specialty; Hedione is the practical substitute, accepting a slightly less jasminic character.",
      "Lyral prohibited.",
      "Rosatol is a specialty — omit or approximate with a trace of rose absolute plus phenylethyl alcohol.",
      "The rose base is given in enough detail here to rebuild directly, which makes this one of the most useful entries in the set for learning base construction.",
    ],
    source: SRC,
  },
  {
    id: "paloma-picasso",
    perfume: "Paloma Picasso",
    house: "Paloma Picasso",
    year: 1984,
    family: "patchouli-floral",
    coreAccord:
      "All the main elements of the group brought together, with the four major components — patchouli, Hedione, rose and hydroxycitronellal — in the approximate ratio 2 : 1 : 2 : 2. On the same scale the main woody material, Vertofix, is 2 and Lyral 1.",
    quantifiedCoverage:
      "Ratio-based rather than percentage-based: patchouli : Hedione : rose : hydroxycitronellal = 2:1:2:2, Vertofix 2, Lyral 1. Of the perfumes in this group it is the most chypre in character, with a pronounced mossy character.",
    lines: [
      { materialId: "patchouli-oil", ratio: "2", layer: "base", role: "Major" },
      { materialId: "hedione", ratio: "1", layer: "heart", role: "Major" },
      { materialId: "rose-abs", ratio: "2", layer: "heart", role: "Major — the rose complex" },
      { materialId: "hydroxycitronellal", ratio: "2", layer: "heart", role: "Major" },
      { materialId: "vertofix", ratio: "2", layer: "base", role: "Main woody material" },
      { materialId: "helional", ratio: "1", layer: "heart", role: "Stands in for the source's Lyral 1 — prohibited" },
      { materialId: "methyl-ionone", layer: "base", role: "Again important" },
      { materialId: "castoreum-abs", layer: "base", role: "Providing the sweet leathery note" },
      { materialId: "oakmoss-abs", layer: "base", role: "Pronounced mossy character — the most chypre of the group" },
    ],
    unquantified: ["Trace auxiliary notes"],
    evolution:
      "What is frequently found in a perfume showing descent through a number of previous perfumes is that the original idea, which may have been quite simple, has been greatly developed — both by the introduction of an increasing number of auxiliary notes, sometimes in the form of bases, and by single materials being replaced by complex mixtures. Paloma Picasso is a case in point, lacking perhaps some of the clarity of either Aromatics Elixir or Coriandre. Sometimes a simple reinterpretation of the original idea is needed to give new life to an old and overworked family. That is a directly actionable piece of advice: when a family feels exhausted, go back to the simple version and re-read it.",
    modernisation: [
      "Lyral prohibited, castoreum marginal, oakmoss restricted.",
      "The ratio format is actually more useful than percentages here: it tells you the *relationship* between the majors, which is what survives reformulation.",
    ],
    source: SRC,
  },

  /* ================================================================ */
  /* CLASSICAL CHYPRE FAMILY                                          */
  /* ================================================================ */
  {
    id: "chypre-coty",
    perfume: "Chypre",
    house: "Coty",
    year: 1917,
    family: "chypre",
    coreAccord:
      "Oakmoss in combination with bergamot, jasmine, labdanum and animal notes including civet and musk, with woody notes such as vetiveryl acetate, methyl ionone and usually patchouli added — the characteristic structure of most of the great chypre perfumes.",
    quantifiedCoverage: "None. This is the family definition, given qualitatively.",
    lines: [
      { materialId: "oakmoss-abs", layer: "base", role: "The foundation" },
      { materialId: "bergamot-oil", layer: "top", role: "The bright top" },
      { materialId: "jasmine-abs", layer: "heart", role: "Floral heart" },
      { materialId: "labdanum-abs", layer: "base", role: "Amber-leather" },
      { materialId: "vetiveryl-acetate", layer: "base", role: "Woody" },
      { materialId: "methyl-ionone", layer: "base", role: "Powdery bridge" },
      { materialId: "patchouli-oil", layer: "base", role: "Usually present" },
    ],
    unquantified: ["Civet", "Musk (natural)"],
    evolution:
      "Into this combination may be introduced a variety of materials — aldehydes, green notes, fruity notes, leather — emphasising different aspects of the chypre accord to give a number of distinct subfamilies. The great diversity of chypres has led some perfumers to classify perfumes under three headings only: florals, orientals, and all the rest, which may be generally described as chypres. Certainly the widespread use of the materials making up the typical chypre accord in all types of perfume gives some support to that view. The non-perfumer, faced with the unnerving task of commenting on a new perfume, can usually get away with 'floral with chypre aspects' unless it is clearly an oriental.",
    modernisation: [
      "Civet and natural musk unavailable.",
      "Oakmoss severely restricted — the single biggest obstacle to working in this family today.",
      "Today the classic chypres and their descendants are no longer much in fashion. In the US consumer preference moved toward sweet powdery floral notes (linked to the conditioning effect of Johnson's Baby Powder); in Europe, the former stronghold of the chypre, oriental and floriental notes came to dominate. In Ysatis (1984), one of the few successful recent chypres, a more modern effect was obtained by greatly developing the jasmine and musk aspects with some 20% each of Hedione and Galaxolide — and with Evernyl replacing natural oakmoss, the overall effect is of a floral musk rather than a true chypre. That is a candid diagnosis of what the oakmoss restriction has done to the family.",
    ],
    source: SRC,
  },
  {
    id: "ma-griffe",
    perfume: "Ma Griffe",
    house: "Carven",
    year: 1944,
    family: "chypre",
    coreAccord:
      "All the essential elements of a chypre plus the bold use of strong materials — citronellal 1%, the aliphatic aldehydes 1%, styrallyl acetate 4% and styrax — in an accord that gives the perfume its enormous individuality. The classical chypre accord sits between vetiveryl acetate 10%, methyl ionone, oakmoss, aldehyde C14, coumarin, sandalwood, patchouli, musk ketone and amber.",
    quantifiedCoverage:
      "Good. Citronellal 1%, aliphatic aldehydes 1%, styrallyl acetate 4%, vetiveryl acetate 10%, hydroxycitronellal 10%.",
    lines: [
      { materialId: "vetiveryl-acetate", percent: 10, layer: "base", role: "At the heart of the classical chypre accord" },
      { materialId: "hydroxycitronellal", percent: 10, layer: "heart", role: "Muguet — a structural material Carles dressed up as a base" },
      { materialId: "styrallyl-acetate", percent: 4, layer: "top", role: "Bold use of a strong material; part of the accord giving enormous individuality" },
      { materialId: "aldehyde-c10", percent: 0.5, layer: "top", role: "Part of the 1% aliphatic aldehydes" },
      { materialId: "aldehyde-c11-undecylenic", percent: 0.5, layer: "top", role: "Part of the aldehyde block" },
      { materialId: "methyl-ionone", layer: "base", role: "Chypre accord" },
      { materialId: "oakmoss-abs", layer: "base", role: "Chypre accord" },
      { materialId: "aldehyde-c14", layer: "heart", role: "Chypre accord — the fruity facet" },
      { materialId: "coumarin", layer: "base", role: "Chypre accord" },
      { materialId: "sandalwood-oil", layer: "base", role: "Chypre accord" },
      { materialId: "patchouli-oil", layer: "base", role: "Chypre accord" },
      { materialId: "musk-ketone", layer: "base", role: "Chypre accord — banned today" },
      { materialId: "styrax-oil", layer: "heart", role: "Part of the individualising accord" },
      { materialId: "bergamot-oil", layer: "top", role: "A simple mixture of bergamot and orange in the top note" },
      { materialId: "sweet-orange-oil", layer: "top", role: "Top note" },
      { materialId: "labdanum-abs", layer: "base", role: "The amber note can be reproduced by the simple but effective combination of labdanum, olibanum and vanilla" },
      { materialId: "olibanum-oil", layer: "base", role: "Amber note" },
      { materialId: "vanilla-abs", layer: "base", role: "Amber note" },
      { materialId: "jasmine-abs", layer: "heart", role: "The middle note is dominated by a traditional jasmine base, with muguet and rose" },
      { materialId: "rose-abs", layer: "heart", role: "Middle note" },
    ],
    unquantified: [
      "Citronellal 1% — a strong material whose use in insecticides and household cleansers has given Ma Griffe a superficial association that is less than it deserves",
      "Small amounts of other animalic notes such as civet",
      "The Roure specialty bases probably used: Selvone, Aldehone Alpha (based on hydroxycitronellal) and Muguet Invar",
    ],
    evolution:
      "Created by Jean Carles, and the perfume reflects every aspect of his art so completely that the source breaks its own self-imposed restriction on attribution to name him. It was part of Carles's technique to take structural materials such as vetiveryl acetate, methyl ionone and hydroxycitronellal and dress them up with a number of natural and synthetic materials to produce bases that could then be used, rather than the individual materials, in the creation of his perfumes. The resultant complexity gave a wonderful velvety quality to the end product which is difficult to duplicate by the normal processes of analysis and matching. That last clause is the single most important sentence in this whole dataset for anyone attempting reverse engineering.",
    modernisation: [
      "The large amount of aliphatic aldehydes together with the citronellal makes the perfume difficult to assess when first put into ethanol. A considerable period of maturation is needed for the aldehydes to 'go in' with the formation of their hemi-acetals. Do not judge an aldehydic composition on day one.",
      "Musk ketone banned, civet unavailable, oakmoss restricted, citronellal restricted.",
      "The Roure specialty bases are historical. This is the clearest case in the set where GC analysis *cannot* recover the perfume, because the character lives in pre-blended bases whose internal proportions are invisible in a chromatogram of the finished product.",
    ],
    source: SRC,
  },
  {
    id: "femme",
    perfume: "Femme",
    house: "Rochas",
    year: 1942,
    family: "chypre",
    coreAccord:
      "A relatively high proportion of fresh top notes based on bergamot and lemon plus petitgrain citronnier, over an underlying chypre accord whose heart is a fruity jasmine note, with oakmoss, methyl ionone, patchouli and labdanum, and a fruity note probably introduced as a base such as the famous Prunol of de Laire containing aldehyde C14.",
    quantifiedCoverage: "None. No loadings given.",
    lines: [
      { materialId: "bergamot-oil", layer: "top", role: "A relatively high proportion of fresh top notes, reminiscent of an earlier style of formulation" },
      { materialId: "lemon-oil", layer: "top", role: "Fresh top" },
      { materialId: "petitgrain-oil", layer: "top", role: "Petitgrain citronnier" },
      { materialId: "aldehyde-c14", layer: "heart", role: "The fruity note, probably introduced in the form of a base such as Prunol" },
      { materialId: "oakmoss-abs", layer: "base", role: "Underlying chypre accord" },
      { materialId: "methyl-ionone", layer: "base", role: "Chypre accord" },
      { materialId: "patchouli-oil", layer: "base", role: "Chypre accord" },
      { materialId: "labdanum-abs", layer: "base", role: "Chypre accord" },
      { materialId: "jasmine-abs", layer: "heart", role: "A fruity jasmine note; a jasmine benzoin type may be used here" },
      { materialId: "eugenol", layer: "heart", role: "A carnation based on eugenol, isoeugenol, heliotropin and ylang" },
      { materialId: "isoeugenol", layer: "heart", role: "Carnation" },
      { materialId: "heliotropin", layer: "heart", role: "Carnation" },
      { materialId: "ylang-oil", layer: "heart", role: "Carnation" },
      { materialId: "cumin-oil", layer: "heart", role: "Spices, supported by the carnation" },
      { materialId: "cardamom-oil", layer: "top", role: "Spices" },
      { materialId: "opoponax-resinoid", layer: "base", role: "With the fruity notes and lilac, used as in Mitsouko; the underlying warmth comes from balsamic materials" },
      { materialId: "terpineol-alpha", layer: "heart", role: "Lilac played an important part in the floral side of compositions of this period" },
    ],
    unquantified: ["Prunol base (de Laire)", "Small amounts of woody materials"],
    evolution:
      "One of the earliest perfumes to use undecalactone (so-called aldehyde C14) was Mitsouko, created by Guerlain in 1919. That marvellous chypre still survives as one of the great artistic masterpieces of perfumery. As with many perfumes created around that time, lilac played an important part in the floral side of the composition, and this, with the fruity notes and opoponax, was again used in the creation of Femme.",
    modernisation: [
      "Isoeugenol tightly restricted, heliotropin a controlled precursor, oakmoss restricted.",
      "Prunol is a historical specialty — build the equivalent from the fruit base in `accords.ts`.",
    ],
    source: SRC,
  },
  {
    id: "miss-dior",
    perfume: "Miss Dior",
    house: "Dior",
    year: 1947,
    family: "chypre",
    coreAccord:
      "The central chypre accord — bergamot, jasmine, oakmoss, patchouli, vetiveryl acetate, labdanum and animalic notes — comprises some 60% of the formula, with a green top built on galbanum and an accord of aldehydes C11 undecylenic and C10, styrallyl acetate and a styrax note, plus a dry spicy note based on pepper and coriander.",
    quantifiedCoverage: "Moderate. Central chypre accord ~60%, patchouli 10%.",
    lines: [
      { materialId: "bergamot-oil", layer: "top", role: "Central chypre accord (~60% total)" },
      { materialId: "jasmine-abs", layer: "heart", role: "Central accord; a conventional jasmine base provides the main floral aspect" },
      { materialId: "oakmoss-abs", layer: "base", role: "Central accord" },
      { materialId: "patchouli-oil", percent: 10, layer: "base", role: "The base note differs from Ma Griffe's in the very much higher level of patchouli" },
      { materialId: "vetiveryl-acetate", layer: "base", role: "Central accord" },
      { materialId: "labdanum-abs", layer: "base", role: "Central accord" },
      { materialId: "galbanum-oil", layer: "top", role: "Green notes, taking up the emphasis pioneered by Vent Vert two years earlier" },
      { materialId: "aldehyde-c11-undecylenic", layer: "top", role: "The green accord found in Ma Griffe" },
      { materialId: "aldehyde-c10", layer: "top", role: "Green accord" },
      { materialId: "styrallyl-acetate", layer: "top", role: "Green accord" },
      { materialId: "styrax-oil", layer: "top", role: "Green accord" },
      { materialId: "black-pepper-oil", layer: "top", role: "Dry spicy note, with coriander" },
      { materialId: "coriander-seed-oil", layer: "top", role: "Dry spicy note" },
      { materialId: "lavender-oil", layer: "top", role: "With neroli" },
      { materialId: "neroli-oil", layer: "top", role: "Top note" },
      { materialId: "hydroxycitronellal", layer: "heart", role: "Jasmine base; in more modern versions such as the EDT, Lyral replaces part or all of it" },
      { materialId: "orris-resinoid", layer: "base", role: "Warm amber and animalic notes contrasted with the powdery softness of orris and vanillin" },
      { materialId: "vanillin", layer: "base", role: "Powdery softness" },
      { materialId: "tuberose-abs", layer: "heart", role: "Natural jasmine and tuberose may be used to give richness" },
      { materialId: "castoreum-abs", layer: "base", role: "Animalic notes" },
    ],
    unquantified: [
      "Phenylpropyl alcohol (reinforces the styrax note; one of its major constituents)",
      "A trace of celery seed oil, which forms an interesting accord with tuberose",
    ],
    evolution:
      "The versatility of the chypre type of formulation in providing a starting point for compositions of remarkably different character is nowhere better seen than here. At the time of its launch it was a perfume of startling originality, and even today it remains one of the most easily recognised, both on a smelling strip and in use. This extraordinary balancing act between contrasting materials has always made Miss Dior one of the most admired perfumes among perfumers themselves. Two years earlier Vent Vert had been created by Balmain, based on galbanum oil in combination with geranium, both at unusually high levels — sadly, the extreme character of that beautiful perfume has since been modified to appeal to a wider market.",
    modernisation: [
      "Most natural tuberose was obtained by traditional enfleurage when Miss Dior was created. Today, partly because of high labour cost but also because of religious restrictions on animal fats in producing countries such as India, most tuberose absolutes are obtained by solvent extraction. The two products are very different in olfactory character, the modern one being greener and lacking much of the jammy richness of the original, which was so important in many earlier perfumes. This is a substitution you cannot engineer your way out of — the raw material itself has changed.",
      "Lyral in the EDT version is prohibited.",
      "Miss Dior types found their way into many functional products, being particularly valuable in soap perfumery: the combination of green notes, lavandin, styrallyl acetate and the aliphatic aldehydes; a floral character of ylang, fruity jasmine notes and rose; PTBCHA, methyl ionone and Vertofix; with a mossy amber background — formed the basis of the famous Lux fragrance created in the 1960s, still the model for numerous subsequent brands.",
    ],
    source: SRC,
  },
  {
    id: "cabochard",
    perfume: "Cabochard",
    house: "Grès",
    year: 1958,
    family: "chypre",
    coreAccord:
      "All the typical ingredients of a classical chypre present, but with a marvellous unity built around various accords based on isobutyl quinoline. Its somewhat earthy character blends perfectly with a top note of armoise 2%, galbanum and basil.",
    quantifiedCoverage:
      "Good. Armoise 2%, styrallyl acetate 2%, hydroxycitronellal 15%, Jessemal 4%, hexyl cinnamic aldehyde 6%, sandalwood 6%.",
    lines: [
      { materialId: "isobutyl-quinoline", layer: "base", role: "Various accords based on it give the perfume its unity" },
      { materialId: "armoise-oil", percent: 2, layer: "top", role: "Top note combination with galbanum and basil" },
      { materialId: "galbanum-oil", layer: "top", role: "Top note" },
      { materialId: "basil-oil", layer: "top", role: "Top note" },
      { materialId: "hydroxycitronellal", percent: 15, layer: "heart", role: "The floral aspect is dominated by jasmine and hydroxycitronellal" },
      { materialId: "hexyl-cinnamal", percent: 6, layer: "heart", role: "The jasmine is no longer the classic type found in Ma Griffe and Miss Dior but one based on benzyl acetate, Jessemal and hexyl cinnamic aldehyde" },
      { materialId: "benzyl-acetate", layer: "heart", role: "Jasmine base" },
      { materialId: "sandalwood-oil", percent: 6, layer: "base", role: "A relatively large amount compared with other chypre types" },
      { materialId: "styrallyl-acetate", percent: 2, layer: "top", role: "In Bandit this had formed part of a fully developed gardenia complex; again combined with undecylenic aldehyde" },
      { materialId: "aldehyde-c11-undecylenic", layer: "top", role: "With styrallyl acetate" },
      { materialId: "mandarin-oil", layer: "top", role: "As in many modern perfumes containing green notes, mandarin is used as part of the fresh note" },
      { materialId: "bergamot-oil", layer: "top", role: "Traditional fresh note with linalool and linalyl acetate" },
      { materialId: "linalool", layer: "top", role: "Fresh note" },
      { materialId: "linalyl-acetate", layer: "top", role: "Fresh note" },
      { materialId: "geraniol", layer: "heart", role: "A fresh rose note" },
      { materialId: "oakmoss-abs", layer: "base", role: "Classical chypre ingredient" },
      { materialId: "patchouli-oil", layer: "base", role: "Classical chypre ingredient" },
      { materialId: "vetiveryl-acetate", layer: "base", role: "Classical chypre ingredient" },
      { materialId: "labdanum-abs", layer: "base", role: "Classical chypre ingredient" },
    ],
    unquantified: [
      "A small amount of hyacinth backing up the galbanum",
      "Jessemal 4% — a specialty jasmine material",
    ],
    evolution:
      "In 1944, two or three years before Ma Griffe and Miss Dior, another very great and original chypre had been launched by Piguet: Bandit, based on the use of isobutyl quinoline. That perfume became the inspiration for Cabochard, a softer and more commercial reworking of the same idea. Yet despite the resulting complexity, the perfume has a marvellous unity. The sandalwood-plus-hexyl-cinnamic-aldehyde combination here may, in another context, have influenced the creation a year later of Madame Rochas.",
    modernisation: [
      "Hydroxycitronellal at 15% is far beyond modern limits — this is the dominant problem.",
      "Jessemal is a specialty.",
      "Isobutyl quinoline is still available and still does the job — the leather spine of this perfume survives intact.",
      "Note the softer-commercial-reworking pattern: Bandit → Cabochard is a case study in taking an extreme idea and moderating it for a wider market, exactly what happened to Vent Vert.",
    ],
    source: SRC,
  },
];

/* ------------------------------------------------------------------ */

const byId = new Map(reconstructions.map((r) => [r.id, r]));
export function getReconstruction(id: string): Reconstruction | undefined {
  return byId.get(id);
}

/** Family groupings used by the source, for the comparison table. */
export const reconstructionFamilies = [
  {
    id: "floral-salicylate",
    name: "Floral salicylate",
    definition:
      "Predominantly floral perfumes based on salicylates in combination with woody notes and musk. One of the most successful underlying accords in perfumery, and the starting point for many varied creations.",
    members: ["lair-du-temps", "fidji", "anais-anais", "paris"],
  },
  {
    id: "floral-aldehydic",
    name: "Floral aldehydic",
    definition:
      "Significant amounts of aliphatic aldehydes with floral, woody and animalic notes. Divides conveniently into two families depending on whether or not they contain a significant amount of vanillin.",
    members: ["chanel-no5", "arpege", "madame-rochas", "calandre", "rive-gauche", "white-linen"],
  },
  {
    id: "floral-sweet",
    name: "Floral sweet",
    definition:
      "Lying somewhere in character between the florals and the orientals, originating in the style of the first decade of the twentieth century when compounded floral bases were new.",
    members: ["lorigan", "oscar-de-la-renta", "poison", "vanderbilt"],
  },
  {
    id: "amber-oriental",
    name: "Oriental / amber",
    definition:
      "Two distinct groups. The ambreine accord (bergamot, vanillin or ethyl vanillin, coumarin, civet, with woody and rose notes), and the mellis accord (benzyl salicylate with eugenol, patchouli and hydroxycitronellal, plus spices, woods and coumarin). All contain sweet balsamic notes, amber notes based on labdanum, castoreum, and rose as the dominant floral.",
    members: ["shalimar", "must-de-cartier", "obsession", "youth-dew", "opium", "coco"],
  },
  {
    id: "patchouli-floral",
    name: "Patchouli floral",
    definition:
      "Built on Hedione's relationship with patchouli. Sometimes classified as chypres, but the dominance of floral notes and patchouli, and the comparative lack of musk and animalic notes other than castoreum, justifies a separate group.",
    members: ["eau-sauvage", "diorella", "aromatics-elixir", "coriandre", "paloma-picasso"],
  },
  {
    id: "chypre",
    name: "Classical chypre",
    definition:
      "Descended from Coty's Chypre (1917): oakmoss with bergamot, jasmine, labdanum and animal notes, plus vetiveryl acetate, methyl ionone and usually patchouli.",
    members: ["chypre-coty", "ma-griffe", "femme", "miss-dior", "cabochard"],
  },
] as const;

/**
 * How much of each reconstruction the source actually quantifies. Useful
 * for calibrating expectations about reverse engineering in general: even
 * a professional GC/MS-plus-perfumer study leaves most of the formula
 * unnamed or unnumbered.
 */
export const quantifiedLineCounts = reconstructions.map((r) => {
  const quantified = r.lines.filter((l) => l.percent !== undefined || l.ratio !== undefined).length;
  return {
    id: r.id,
    perfume: r.perfume,
    totalLines: r.lines.length,
    quantifiedLines: quantified,
    unquantifiedNamed: r.unquantified.length,
    percentQuantified: Math.round((quantified / Math.max(r.lines.length, 1)) * 100),
  };
});
