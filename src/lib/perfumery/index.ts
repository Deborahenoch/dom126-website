/**
 * DOM126 Perfumery Atlas — public entry point for the reference data.
 *
 * Import from "@/lib/perfumery" rather than reaching into individual modules.
 *
 * WHAT IS IN HERE
 *   materials      177 natural and synthetic raw materials, fully tagged
 *   families       SFP seven families, Edwards' wheel, Ellena's nine odour
 *                  fields, the Carles triangle vs. the Grojsman structure,
 *                  concentration classes, the dose ladder
 *   accords        Buildable starting formulas in parts per thousand
 *   classics       Documented structural reconstructions of great perfumes
 *   gcms           Reverse-engineering techniques, workflow, limits and a
 *                  comparison against published analytical studies
 *   formula        The vault engine — pure calculation, no storage
 *
 * HONESTY RULES THIS DATA FOLLOWS
 *   1. No trade formula appears anywhere. Nothing here is a manufacturer's
 *      secret; those are not published.
 *   2. Percentages attached to named commercial perfumes come from one
 *      published study and are labelled as guidelines to structure, not as
 *      formulas. Where that study names a material without quantifying it,
 *      no number has been invented.
 *   3. Accord proportions are conventional starting points assembled for
 *      this Atlas and are labelled as such. They are not figures from the
 *      source books, which deliberately publish accords without quantities.
 *   4. CAS numbers are omitted rather than guessed.
 *   5. Regulatory flags summarise public information and are a study aid.
 *      IFRA Standards and the current EU annexes are authoritative.
 */

export * from "./types";
export * from "./materials";
export * from "./families";
export * from "./accords";
export * from "./classics";
export * from "./gcms";
export * from "./formula";
