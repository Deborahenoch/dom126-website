/**
 * DOM126 Perfumery Atlas — reverse engineering by GC-MS.
 *
 * A practical playbook plus an honest account of what the technique can and
 * cannot recover, built from:
 *
 *   - Calkin & Jellinek, "Perfumery: Practice and Principles" (Wiley, 1994),
 *     chs. 5 ("The Uses of Gas Chromatography"), 7 ("The Technique of
 *     Matching") and 12 — the perfumer-side workflow.
 *   - Ellena, "Perfume: The Alchemy of Scent" (2011), ch. III §IV "Analysis
 *     Techniques" — chromatography, headspace, SPME.
 *   - Peer-reviewed and trade analytical literature on perfume GC-MS,
 *     counterfeit detection and aroma reconstruction (cited per entry).
 *
 * The conclusion is uncomfortable and worth stating up front: GC-MS gives
 * you a very good ingredient list and a poor formula. Everything below is
 * about closing that gap, and about knowing when it cannot be closed.
 */

/* ------------------------------------------------------------------ */
/* 1. The techniques, and what each is actually for                    */
/* ------------------------------------------------------------------ */

export interface Technique {
  id: string;
  name: string;
  what: string;
  bestFor: string;
  limitation: string;
  introduced: string;
}

export const techniques: Technique[] = [
  {
    id: "gc-fid",
    name: "GC-FID (capillary gas chromatography, flame ionisation)",
    what:
      "Separates a volatile mixture into individual components and records each as a peak. Peak area is roughly proportional to amount, giving a percentage list against retention times.",
    bestFor:
      "Quality control of raw materials, batch-to-batch consistency, detecting adulteration, and quantifying known components in an existing market fragrance.",
    limitation:
      "Gives no identification on its own. Without a correction factor applied to each component, the printed percentages are not normally accurate to better than a 10-20% variation. A full perfume analysis takes roughly 90 minutes.",
    introduced:
      "Commercialised in the 1960s; capillary columns replaced packed glass columns and now detect materials representing less than 0.01% of the total mixture.",
  },
  {
    id: "gc-ms",
    name: "GC-MS",
    what:
      "Couples the column to a mass spectrometer and a library search, giving positive identification of each component along with its approximate percentage.",
    bestFor:
      "Turning an unknown blend into a named ingredient list. Typically a hundred or more materials are identified, often comprising some 95% of the compound.",
    limitation:
      "Any natural material is broken down into its individual components along with everything else, so the printout tells you 'linalool 6%, geraniol 2%' rather than 'bergamot oil 8%'. Reassembling naturals from their fragments is an interpretive act, not a measurement.",
    introduced: "1960s; made identification of essential-oil components much faster.",
  },
  {
    id: "dual-column",
    name: "Dual-column GC (polar + non-polar)",
    what:
      "Runs the same sample on two different stationary phases — typically a carbowax-type polar column and a non-polar column.",
    bestFor:
      "Resolving 'hidden peaks'. Two or more materials sometimes have identical retention times under given conditions and appear as a single peak. Changing phase or temperature programming separates them. Polar columns elute components in much the same order a perfumer smells them evaporating from a blotter, so the polar run maps onto experience.",
    limitation:
      "Non-polar columns can run hotter, which is the only way to see higher-boiling materials such as Schiff bases — those simply do not appear on polar columns. If you only run one column you will silently miss part of the formula.",
    introduced: "Standard practice once capillary columns became common.",
  },
  {
    id: "gc-o",
    name: "GC-O (gas chromatography–olfactometry)",
    what:
      "A human sniffs the column effluent as each component elutes and records what it smells like and how strong. Often combined with MS as GC-MS/O.",
    bestFor:
      "Finding the odour-active compounds, which are not the same as the abundant ones. Also the only reliable way to detect certain naturals — galbanum and juniper berry, and trace amounts of very strong materials, are most easily identified olfactorily at the exit port rather than from the integrator printout.",
    limitation:
      "Materials smell different emerging from a stream of hot gas than on a smelling strip, so this needs specific experience. It is slow, subjective, and fatigues the assessor.",
    introduced: "1970s onward; the basis of aroma-activity-value (AAV/OAV) work in flavour science.",
  },
  {
    id: "headspace",
    name: "Headspace (dynamic)",
    what:
      "An inert gas is run across a living source — flower, fruit, leaf — carrying the odour-bearing components into an adsorbent trap, which is then thermally desorbed into the GC-MS.",
    bestFor:
      "Capturing the profile of the scent *as it is actually smelled*, including the most volatile and most unstable components that are destroyed or lost during distillation or solvent extraction. The results are used to build reconstructed plant bases.",
    limitation:
      "Gives you what the living organism emits, which is not the same as what an extract of it smells like. Quantification is difficult because collection efficiency varies per compound.",
    introduced:
      "Originally a technique for analysing gas composition in oil exploration; introduced into perfumery in the early 1970s.",
  },
  {
    id: "spme",
    name: "HS-SPME (headspace solid-phase microextraction)",
    what:
      "A syringe carrying a silica fibre coated with an extraction phase is exposed to the headspace. Volatiles adsorb and concentrate on the fibre, which goes straight into the GC injector for thermal desorption. No solvent, no elaborate equipment.",
    bestFor:
      "Field and portable work — sampling a flower in situ, or a fragrance on skin over time. More sensitive than conventional headspace sampling with an airtight syringe, with analysis times under 30 minutes. Also effective in aqueous media, which matters for water-based products.",
    limitation:
      "Fibre selectivity biases the result: a PDMS fibre and a CAR/PDMS fibre give different profiles from the same sample. Equilibrium time and temperature must be controlled or the numbers are not comparable between runs.",
    introduced:
      "Invented in the early 1990s to monitor air and water quality; quickly adopted for identifying the fragrance of flowers and other odour sources.",
  },
  {
    id: "gcxgctof",
    name: "GC×GC-TOFMS (comprehensive two-dimensional)",
    what:
      "Two columns in series with a thermal modulator between them, plus a fast time-of-flight mass spectrometer. Peak capacity increases dramatically.",
    bestFor:
      "The hardest separations. Published perfume work resolves more than 100 individual peaks per sample and identifies fragrance-key compounds and suspected allergens at trace levels that 1D GC-MS leaves as co-elutions. Comparative 2D contour plots also make qualitative discrimination between an original and an imitation visually obvious.",
    limitation:
      "Expensive instrumentation, large data volumes, and it still cannot name a captive molecule that is absent from every spectral library.",
    introduced: "Applied to perfume authentication and allergen profiling from the mid-2010s.",
  },
  {
    id: "lc-ms",
    name: "LC-MS",
    what: "Liquid chromatography–mass spectrometry, for the non-volatile fraction.",
    bestFor:
      "The part of a perfume GC cannot see at all: high-molecular-weight fixatives, polymers, some encapsulated materials, dyes, UV filters and antioxidants. Direct analysis of perfume content has been demonstrated without derivatisation.",
    limitation: "Not a substitute for GC on the volatile fraction; the two are complementary.",
    introduced: "Applied to perfume matrices from the late 2010s.",
  },
  {
    id: "enose",
    name: "Electronic nose + chemometrics",
    what:
      "An array of semiconductor gas sensors produces a pattern response; principal component analysis or a classifier separates samples.",
    bestFor:
      "Authentication and discrimination rather than reconstruction. Published work on five original perfumes and their counterfeits achieved fair discrimination, with the counterfeits clearly separated from the originals; using the first three principal components captured 98.09% of the information in the database.",
    limitation:
      "Tells you two samples differ, not how. It produces no formula.",
    introduced: "Routine in food and QC; applied to perfume authentication from the 2010s.",
  },
  {
    id: "retention-index",
    name: "Linear retention indices (Kováts RI)",
    what:
      "Retention times normalised against an n-alkane ladder, so a result from your column is comparable with a published value from someone else's.",
    bestFor:
      "Reducing false positives in library matching, especially under co-elution or matrix interference. Standard practice is to use RI as a filter alongside the spectral match factor.",
    limitation: "Requires running the alkane standard under identical conditions every time.",
    introduced: "Long-standing convention; essential in modern fragrance libraries.",
  },
];

/* ------------------------------------------------------------------ */
/* 2. The reconstruction workflow                                      */
/* ------------------------------------------------------------------ */

export const reconstructionWorkflow = [
  {
    step: 1,
    title: "Sample and record before you analyse",
    detail:
      "Log the product, batch code, purchase date and concentration (extrait / EDP / EDT — these are often *different formulas*, not just different dilutions). Photograph the packaging. Note the storage history: heat and light change a perfume before you ever inject it.",
    why:
      "An old alcoholic sample examined by GC will frequently show degradation products that were never in the original formula. You need to know whether you are analysing a perfume or a perfume plus three years of chemistry.",
  },
  {
    step: 2,
    title: "Smell it properly first, on paper and on skin",
    detail:
      "Build a blotter evaporation profile: note the top at 0-15 minutes, the heart at 1-4 hours, the drydown at 8+ hours and again at 24 hours. Write down what you think is there *before* you see the chromatogram.",
    why:
      "This is the single highest-value step and the one most often skipped. The chromatogram will tell you what is present; only your nose can tell you what matters. Writing your hypothesis down first also stops the printout from overwriting your perception.",
  },
  {
    step: 3,
    title: "Prepare the sample",
    detail:
      "Typical published conditions for a commercial perfume: dilute 10-fold in ethanol or acetone, inject 1 µL in split mode at a split ratio around 100:1, injector 250 °C, MS source 230 °C, helium carrier at ~1.3 mL/min, on a 30 m × 0.25 mm × 0.25 µm capillary column. A complex essential oil may need 40-fold dilution.",
    why:
      "Over-concentrated injection saturates the detector, broadens peaks and destroys the quantitative relationships you are trying to recover.",
  },
  {
    step: 4,
    title: "Run two columns and a temperature programme",
    detail:
      "Polar (carbowax-type) first because it elutes in an order that matches how a perfumer smells the blend evaporate, then non-polar at higher temperature to pick up the heavy and thermally robust materials.",
    why:
      "Single-column runs produce hidden peaks — co-eluting materials that read as one component. Schiff bases in particular do not appear on polar columns at all.",
  },
  {
    step: 5,
    title: "Identify: library match + retention index, with deconvolution",
    detail:
      "Match each spectrum against NIST and a dedicated flavour-and-fragrance library. Apply an RI filter against n-alkane standards. Use deconvolution software to separate overlapping peaks into individual spectra. Reject matches below ~90% quality, abnormal retention times, or anything you cannot cross-validate.",
    why:
      "Library matches are probabilistic. Isomers and structurally related sesquiterpenes have near-identical spectra, and without the RI cross-check you will confidently identify the wrong compound.",
  },
  {
    step: 6,
    title: "Quantify with response factors and an internal standard",
    detail:
      "Integrate peak areas, then correct for detector response per compound using an internal standard. Expect roughly 90-98% of the composition to be accounted for in a good first pass.",
    why:
      "Raw peak area is not concentration. Without response factors the numbers are indicative only, typically good to 10-20%.",
  },
  {
    step: 7,
    title: "Reassemble the naturals — the interpretive step",
    detail:
      "The printout gives molecules, not ingredients. Recognise the characteristic peak *patterns* of specific naturals: geranium, patchouli, armoise, sandalwood and ylang all have fingerprints an experienced eye reads more easily than the integrator list, and their different qualities are distinguishable the same way. Amounts down to about 0.1% are visible on a well-produced chromatogram. For harder naturals, look for a single highly characteristic marker — myristicene indicates nutmeg oil, styrene indicates styrax.",
    why:
      "This is where the work actually is. It is pattern recognition, not data reading, and it is the reason a perfumer sitting alongside the GC-MS produces results unobtainable from the printout alone.",
  },
  {
    step: 8,
    title: "Reconstruct bases, not just ingredients",
    detail:
      "Look for combinations of materials, often in trace amounts, that suggest a pre-blended base within the composition. Well-known bases can be recognised by the presence of their major constituents. Build these separately and compound them as units rather than flattening everything into one long ingredient list.",
    why:
      "A perfume built from bases (the Carles method) cannot be read as a flat list. Flattening it gives you the right molecules in the wrong architecture, which smells wrong.",
  },
  {
    step: 9,
    title: "Build the trial compound and compare — both ways",
    detail:
      "Compound the first trial from all the major identified components. Then compare trial against original by *both* smelling and re-running GC. Overlaying the two chromatograms gives an immediate indication of adjustments to make and gaps to fill.",
    why:
      "The two-chromatogram overlay is the core iteration loop. It converts a vague 'it's not right' into a specific list of missing and excess peaks.",
  },
  {
    step: 10,
    title: "Use contrast smelling to find what the machine missed",
    detail:
      "Smell the original and the trial side by side on blotters, and at each stage of evaporation. Materials that show up more clearly by contrasting the two samples are your candidates; then confirm them in the analysis or at the column exit.",
    why:
      "Analytical smelling finds things the printout does not, especially the very low-threshold materials that are olfactorily decisive but quantitatively invisible.",
  },
  {
    step: 11,
    title: "Iterate, and know when to stop",
    detail:
      "Each additional run typically yields only marginal improvement — on the order of 1-2% more information depending on the sample. Stop when further analysis costs more than further smelling.",
    why:
      "Diminishing returns are steep. The last few percent of a match is made by nose, not by instrument.",
  },
  {
    step: 12,
    title: "Record the match honestly",
    detail:
      "Log what percentage of the target you believe you have matched, what remains unidentified, and what you substituted. Store it as a versioned formula in the vault with the trial notes attached.",
    why:
      "A reconstruction without its uncertainty recorded is indistinguishable from a fabrication, six months later, to the person who has to reformulate it.",
  },
];

/* ------------------------------------------------------------------ */
/* 3. What GC-MS cannot do — the hard limits                           */
/* ------------------------------------------------------------------ */

export const limitations = [
  {
    id: "captives",
    title: "Captive molecules",
    problem:
      "A fragrance house's proprietary material is not in any spectral library. It appears as an unknown peak or a cluster of peaks matching nothing.",
    consequence:
      "You can see that something is there and how much, but not what it is. Anaïs Anaïs is documented as using an intensely powerful amber note described as a captive material that is not generally available — an unfillable gap.",
    mitigation:
      "Approximate by odour character from the effluent, and accept the difference. Record the substitution explicitly.",
    severity: "block" as const,
  },
  {
    id: "nonvolatiles",
    title: "Non-volatile and semi-volatile materials",
    problem:
      "GC only sees what can be vaporised without decomposition. Resins, balsams, high-molecular-weight fixatives, some musks and encapsulated materials are wholly or partly outside the range.",
    consequence:
      "The source is explicit that because of their relatively high boiling points, the identification of labdanum products and other resins and balsamic materials is largely beyond the range of GC analysis. For an amber-heavy oriental that means the most important part of the base is invisible, and you must rely on purely olfactory skill.",
    mitigation: "Use LC-MS for the non-volatile fraction, and the nose for the resins.",
    severity: "block" as const,
  },
  {
    id: "naturals-decomposed",
    title: "Naturals arrive as fragments",
    problem:
      "Every natural in the sample is broken into its individual constituents and merged with everything else in the list.",
    consequence:
      "A printout showing linalool, linalyl acetate, limonene and pinene does not tell you whether the formulator used bergamot oil, or lavender plus a synthetic linalool, or three separate naturals. Many different formulas produce the same molecule list.",
    mitigation:
      "Learn the characteristic peak patterns and the isomeric ratios. Natural and synthetic linalool differ in enantiomeric ratio, which chiral GC can resolve — but that is a separate, deliberate analysis.",
    severity: "warn" as const,
  },
  {
    id: "bases",
    title: "Pre-blended bases flatten out",
    problem:
      "A perfume built from specialty bases reads as a flat molecule list, losing the architecture.",
    consequence:
      "Ma Griffe's velvety quality came from Carles dressing structural materials into bases such as Selvone, Aldehone Alpha and Muguet Invar. The source states that this resultant complexity is difficult to duplicate by the normal processes of analysis and matching. You can recover the molecules and still miss the perfume.",
    mitigation: "Look for tell-tale combinations in trace and rebuild them as discrete bases (workflow step 8).",
    severity: "warn" as const,
  },
  {
    id: "schiff",
    title: "Reaction products form in the bottle",
    problem:
      "Aldehydes react with alcohols to form hemi-acetals and with anthranilates to form Schiff bases. These are not in the original formula; they develop during maturation.",
    consequence:
      "You may identify a compound the perfumer never weighed out. Conversely, an aldehyde-heavy perfume is genuinely difficult to assess when first put into ethanol — a considerable maturation period is needed before the aldehydes 'go in'. Judging too early gives you the wrong target.",
    mitigation: "Mature your own trial for weeks before comparing. Run a non-polar column hot to see the Schiff bases.",
    severity: "warn" as const,
  },
  {
    id: "quantity",
    title: "Quantification error",
    problem:
      "Detector response varies per compound; peak area is not concentration.",
    consequence:
      "Without per-component correction factors, printed values are not normally accurate to better than a 10-20% variation. A '15%' in a printout may be 12% or 18% in reality.",
    mitigation: "Internal standards and response factors. Budget for error in the rebuild.",
    severity: "warn" as const,
  },
  {
    id: "coelution",
    title: "Co-elution and hidden peaks",
    problem:
      "Complex mixtures overlap. Isomers and related sesquiterpenes have near-identical spectra.",
    consequence: "Components are missed or misidentified, and quantification of a co-eluting pair is wrong for both.",
    mitigation:
      "Dual columns, altered temperature programming, deconvolution, and GC×GC-TOFMS for the hardest cases.",
    severity: "warn" as const,
  },
  {
    id: "trace",
    title: "Trace materials below the detection threshold",
    problem:
      "Detection limits sit around 0.1% in a single run; some materials are decisive at far lower levels.",
    consequence:
      "The materials that give a perfume its finish are often exactly the ones you cannot measure. Vanillin at 0.5% can destroy a balanced accord; orris in minute quantities markedly improves lift and finish; rose oxide works in parts per billion.",
    mitigation: "GC-O and contrast smelling. Selected-ion monitoring helps but yields only marginal gains.",
    severity: "warn" as const,
  },
  {
    id: "thresholds",
    title: "Abundance is not impact",
    problem:
      "A peak's size says nothing about its odour contribution. Odour thresholds span many orders of magnitude.",
    consequence:
      "A 20% component with a high threshold may contribute less to the smell than a 0.02% component with a very low one. Rebuilding by peak area alone produces something quantitatively faithful and qualitatively wrong.",
    mitigation:
      "Calculate odour activity values (concentration ÷ odour threshold) where thresholds are known, and always weight the rebuild by nose. GC/MS-O work on commercial and natural-derived floral perfumes found that sensory detection can be more efficient than the analytical one.",
    severity: "block" as const,
  },
  {
    id: "reformulation",
    title: "There may be no single formula to find",
    problem:
      "Most perfumes exist in several forms, and the extrait, EDP and EDT are frequently based on rather different formulas — more modern and less expensive ingredients used to recreate the same idea at lower concentration.",
    consequence:
      "Older perfumes have also changed over decades. The source is candid that with this variation between line products, and the changes that have taken place in the formulas of many older perfumes, it is not always possible to talk of the one-and-only formula for a particular fragrance.",
    mitigation:
      "Decide which version you are targeting and record it. Do not blend analyses of the EDT and the extrait into one formula.",
    severity: "warn" as const,
  },
  {
    id: "regulatory",
    title: "A faithful reconstruction may be illegal to sell",
    problem:
      "Many materials in vintage formulas are now restricted or banned.",
    consequence:
      "Lyral and Lilial are prohibited in EU cosmetics; nitro musks such as musk ketone and musk xylene are banned; oakmoss, hydroxycitronellal, isoeugenol, cinnamal and the damascones are tightly limited. A perfume analysed as containing 15% hydroxycitronellal and 10% Lyral cannot be legally rebuilt as found.",
    mitigation:
      "Treat every reconstruction as a *structural* document, then reformulate for compliance. The vault flags affected materials automatically.",
    severity: "block" as const,
  },
];

/* ------------------------------------------------------------------ */
/* 4. Comparison with published analytical work                        */
/* ------------------------------------------------------------------ */

export interface CaseStudy {
  id: string;
  title: string;
  context: string;
  method: string;
  finding: string;
  relevance: string;
  citation: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "mowery-imposters",
    title: "Brand-name fragrances vs. 'impressions'",
    context:
      "An undergraduate analytical chemistry experiment comparing designer fragrances with cheap fragrance 'impressions' sold as duplicates.",
    method:
      "Direct GC-MS with minimal sample preparation, capillary columns, library identification.",
    finding:
      "The complexity of most perfume samples demonstrates the power of capillary GC as a separation technique, and minimal preparation means the analyst's time goes into interpretation rather than extraction. The published comparison shows impressions sharing a general profile with the original while differing in specific components and ratios.",
    relevance:
      "This is the closest published analogue to what a small house can actually do: no exotic instrumentation, just a GC-MS and a trained reader. It also sets expectations — an impression is recognisably related, not identical.",
    citation:
      "Mowery, K. A., Blanchard, D. E., Smith, S., Betts, T. A. 'Investigation of Imposter Perfumes Using GC-MS.' Journal of Chemical Education 81(1), 87-89 (2004).",
  },
  {
    id: "leco-differential",
    title: "Differential analysis: brand vs. two imitations",
    context:
      "A trade application note using GC-TOFMS to compare one brand perfume with two imitations, as competitive analysis.",
    method:
      "Samples diluted 50:1 in ethanol; non-targeted peak finding with automated deconvolution; NIST library matching at similarity >700.",
    finding:
      "Nearly 200 peaks were detected in the brand perfume at signal-to-noise above 50; 119 of those matched library analytes. The brand's own packaging listed 16 specific ingredients — so the label disclosed a small fraction of what analysis found. Differential plotting against the imitations showed which of the ~119 identified components the copies had omitted or substituted, including coumarin, isomethyl ionone, farnesol, benzyl benzoate, benzyl salicylate and benzyl cinnamate.",
    relevance:
      "Two directly useful facts. First, the gap between a declared ingredient list (16) and an analytical one (~119) is the gap between marketing and formulation. Second, differential analysis against a target is a far more efficient use of instrument time than absolute reconstruction — you only need to find what differs.",
    citation: "LECO application note, 'Differential Analysis of Perfumes with GC-TOFMS' (Pegasus HT / ChromaTOF).",
  },
  {
    id: "gcxgc-authentication",
    title: "Perfume authentication: 1D GC-MS vs GC×GC-MS",
    context:
      "A feasibility study comparing one-dimensional and comprehensive two-dimensional GC-MS for authenticating a commercial eau de parfum against a counterfeit.",
    method:
      "Samples analysed without pretreatment on an Agilent 7890B GC with a Zoex ZX2 thermal modulator and 5977A MS; 2D visualisation in GC Image.",
    finding:
      "1D GC-MS profiles clearly differentiated the imitation from the authentic perfume but showed many unresolved co-elutions in the genuine sample. GC×GC-MS dramatically increased peak capacity and sensitivity, revealing numerous fragrance-key compounds and potential allergens not resolved in 1D. The 2D contour plots gave unique spot patterns per sample, enabling qualitative discrimination with minimal preprocessing. A related study resolved over 100 peaks across three products and confidently identified more than 20 known fragrance compounds and suspected allergens, including hydroxycitronellal at trace level.",
    relevance:
      "This quantifies the co-elution problem: the genuine article — the more complex sample — is the one 1D GC-MS fails on. If your target is a rich, natural-heavy vintage composition, 1D analysis will under-report it.",
    citation:
      "'Feasibility study of perfume authentication by GC-MS and GC×GC-MS'; and 'GC×GC-MS analysis of aroma compounds and allergens in perfumes' (Agilent 7890B / Zoex ZX2 / Agilent 5977A).",
  },
  {
    id: "counterfeit-enose",
    title: "Counterfeit detection by GC-MS plus electronic nose",
    context:
      "Five original eau de toilette perfumes and their counterfeits, analysed to protect consumers and to test whether an e-nose could discriminate them.",
    method:
      "Agilent 6890 GC with 5975 Inert XL MS at 70 eV; NIST 14 library; Kováts retention index; cross-validation among samples; matches below 90% quality or with abnormal retention times rejected. Plus a TGS-type semiconductor-sensor e-nose with PCA classification.",
    finding:
      "The imitations contained significantly more volatile compounds than the originals, while some allergens were present in much higher concentration or only in the imitations. Benzyl alcohol (2.17%) and hydroxycitronellal (2.18%) were found only in one counterfeit; d-limonene appeared in all of them. Linalool was at 1.21% in one counterfeit against 6.6% and 6.04% in two originals. PCA on the e-nose data separated counterfeits from originals, with the first three principal components representing 98.09% of the information.",
    relevance:
      "Counterfeits are not dilutions of the original — they are different formulations, often with more named components at lower quality and higher allergen load. This is a safety argument as much as a commercial one, and it is the strongest available reason not to build a business on copying.",
    citation:
      "'Detection of Counterfeit Perfumes by Using GC-MS Technique and Electronic Nose System Combined with Chemometric Tools.' Micromachines 14(3), 524 (2023).",
  },
  {
    id: "volatilomics-counterfeit",
    title: "Volatilomics profiling of counterfeit perfume",
    context: "Authentication of an original perfume against suspected counterfeits, including water-based formulations.",
    method:
      "ATR-FTIR fingerprinting combined with GC-MS and headspace GC-MS, using a 45-250 °C gradient at 10 °C/min.",
    finding:
      "45 compounds were detected in the original sample; only four to five were detected in the counterfeit products — linalool, citronellol, methyl jasmonate, acetic acid and propanol. Relative quantification put linalool in the counterfeit at about 5.1% of the amount in the original. Cheaper and hazardous materials including methanol and 6,7-dihydrogeraniol were detected in the counterfeits. The optimised HS-GC-MS method gave consistent linalool signal intensity even in the presence of water, providing an alternative route for water-based perfume formulation.",
    relevance:
      "The 45-versus-4 compound gap is the clearest published measure of how far a cheap copy can be from an original while still passing as one on a blotter in a shop. It also shows HS-GC-MS as the practical route for water-based and low-alcohol products, which matters if you are making non-ethanol formats.",
    citation:
      "'Volatilomics Profiling of Counterfeit Perfume by Gas Chromatography Hyphenated to Mass Spectrometry and Fourier-Transformed Infrared Spectroscopy' (2024); and 'The potential of LC-MS technique in direct analysis of perfume content' (2019).",
  },
  {
    id: "gco-perfume-twins",
    title: "GC-sniffing perfume 'twins'",
    context: "Comparative analysis of an original perfume and its marketed 'twin' using GC-olfactometry with time-of-flight MS.",
    method: "GC-O-ToFMS; target-ion searching at key retention times; sensory profiling by descriptor and intensity.",
    finding:
      "63 VOCs were identified in perfume A and 54 in perfume B, with the highest concentrations in both being terpenes and esters, and broadly similar chromatographic profiles. But the sensory profiles differed clearly. Specific terpenes — beta-myrcene, (-)-beta-pinene, longifolene and alpha-guaiene — and certain esters distinguished the original from its twin.",
    relevance:
      "Directly on point for anyone building a 'close match'. Two products can have near-identical chemical inventories and still smell distinguishable, because a handful of terpenes and esters carry the difference. It also shows why GC-O earns its keep: the chemical and sensory results told different stories, and only the sensory one predicted perception.",
    citation:
      "Chemical Engineering Transactions vol. 54 (2016), 'GC-sniffing methodology to determine differences in perfume twins' (AIDIC).",
  },
  {
    id: "skin-headspace",
    title: "HS-SPME on skin: what a perfume actually does in wear",
    context: "Characterising scent profiles and fragrance longevity in vivo, before and after application.",
    method:
      "Wearable HS-SPME with 15-minute collection, thermal desorption to GC-MS, sampled from the same site at 0, 1 and 2 hours after application; identities confirmed by retention-index matching within ±10 RI units; Spearman rank correlation of peak areas across time.",
    finding:
      "51 compounds were identified on participants' skin — 19 endogenous and 32 fragrance-derived. Several endogenous skin volatiles were suppressed after application. Seven compounds were common to all participants at all time points, including two endogenous (2,6-dimethyl-2,6-octadiene and n-hexadecanoic acid) and five fragrance-derived.",
    relevance:
      "This is the method for answering the question customers actually ask — how long does it last, and how does it change? It also documents something a formula cannot predict: a perfume modifies the odour of the skin it sits on, and different skins give different results. Worth measuring on your own products rather than assuming.",
    citation:
      "'Headspace Solid-Phase Microextraction Gas Chromatography-Mass Spectrometry Analysis of Scent Profiles from Human Skin' (2018).",
  },
  {
    id: "rose-reconstruction",
    title: "Aroma reconstruction with odour activity values",
    context:
      "Reconstructing a natural rose aroma, used as a model system for a general 'divide-and-conquer, precise reconstruction' strategy.",
    method:
      "Non-targeted GC-MS identified 67 volatile organic compounds; key odorants were then screened by combining GC-MS with odour activity value (OAV) analysis, reducing 67 candidates to seven key aroma-active compounds. The reconstruction blended those seven in proportions calibrated to their actual loading content and headspace release profiles.",
    finding:
      "Seven compounds, correctly proportioned by OAV rather than by peak area, replicated the aroma profile of the original rose extract. The same work then studied host-guest encapsulation with beta-cyclodextrin using molecular docking, molecular dynamics and free-energy calculations to control release.",
    relevance:
      "This is the most actionable published method in the set, and it inverts the naive approach. Do not rebuild from the 67 compounds ranked by abundance; rank them by odour activity value and rebuild from the handful that actually matter. A 7-material reconstruction beating a 67-material analysis is the whole argument for weighting by nose.",
    citation:
      "'A Universal Divide-and-Conquer, Precise Reconstruction Strategy: Multiscale Simulation-Guided High-Fidelity Restoration and Controlled Release of Rose Aroma' (2026).",
  },
  {
    id: "chromatographic-spectrum",
    title: "The chromatographic-spectrum approach to naturals",
    context:
      "Addressing the fact that determining raw ingredients in fragrances is still often manual, based on molecular markers, and therefore subjective and unreliable given natural variability and chromatographic challenges.",
    method:
      "Introduces the concept of a 'chromatographic spectrum', evaluated on a commercial database containing the molecular composition of 4106 perfumery ingredients and on both real and simulated mixtures.",
    finding:
      "An alternative to manual marker-based identification of naturals, tested against a four-thousand-ingredient composition database.",
    relevance:
      "This is workflow step 7 formalised. The 'fingerprints' experienced perfumers recognise by eye are exactly what a chromatographic-spectrum database encodes — and the fact that the standard method is described as subjective and unreliable is a candid admission of how interpretive the naturals-reassembly step really is.",
    citation: "'The importance of GC and GC-MS in perfume analysis' (2002).",
  },
  {
    id: "allergen-quant",
    title: "Quantifying regulated allergens in finished products",
    context:
      "Compliance work: measuring the 26-27 EU-declarable fragrance allergens in cosmetics and perfume raw materials, and at trace level by GC-MS/MS.",
    method:
      "Weak-polar capillary column, EI source, methanol extraction; and for trace work, extraction with internal standard at 55 °C, 1:1000 dilution, SPE on C18, then GC-MS/MS in multiple-reaction-monitoring mode.",
    finding:
      "Limits of detection reached 1.2 mg/kg for musk xylene, 15 mg/kg for hydroxycitronellal and 15 mg/kg for Lyral, with 3.0 mg/kg for the other 24 fragrances; calibration correlations ≥0.996; RSD below 10%; recoveries 73-118%. In an undiluted deodorant, GC-MS measured 102 ppm benzyl alcohol, 1028 ppm linalool, 141 ppm citronellol, 136 ppm geraniol and 614 ppm linalyl acetate. A separate GC-MS/MS study identified 10 allergenic compounds in a single retail perfume sample.",
    relevance:
      "Compliance analysis is a different job from reconstruction and needs a targeted method, not a survey. These are the detection levels you should expect a lab to quote you, and they map directly onto the EU declaration thresholds (0.001% leave-on = 10 ppm) that the vault calculates.",
    citation:
      "'Determination of 27 fragrances in cosmetics and perfume raw materials by GC-MS' (2019); 'Allergens in perfumes: GC-MS' (1997); 'The Smell of Success: Using GC-MS-MS for Low Level Allergenic Fragrance Detection'.",
  },
  {
    id: "zenodo-dataset",
    title: "A public GC-MS dataset of four commercial perfumes",
    context: "Open research data: four commercial perfumes analysed and deposited publicly.",
    method:
      "Agilent 7890B GC with a Supelcowax-10 polar capillary column (30 m × 0.25 mm × 0.25 µm) coupled to a 5977 MS; helium at 1.3 mL/min; samples diluted 1:10 v/v in ethanol; 1.0 µL injected in split mode at 100:1; injector and detector at 250 °C, MS source at 230 °C; samples stored at 12 °C.",
    finding:
      "Full chromatographic data published for four named commercial fragrances, on a polar (Supelcowax / carbowax-type) column.",
    relevance:
      "Useful twice over. It is a worked example of exactly the conditions recommended above, and — because Supelcowax is a polar phase, which elutes in the order a perfumer smells a blotter evaporate — it is a legitimate practice dataset for learning to read a fragrance chromatogram before you spend money on your own samples.",
    citation: "'GC-MS of 4 commercial perfumes', Zenodo record 3249821 (2020).",
  },
  {
    id: "industry-practice",
    title: "Trade practice: what a commercial reconstruction service reports",
    context: "First-hand accounts from operators who build formulas from GC-MS reports for a living.",
    method: "GC-MS analysis of the target, then iterative matching against the original sample before release.",
    finding:
      "Operators report that exact replication of a commercial perfume is not achievable, because the original contains captive molecules, proprietary bases, essential oils and other ingredients that are unavailable and cannot simply be replaced — but that formulas derived from GC-MS reports can come close, and that every release is checked by comparing the original sample with the reconstruction side by side.",
    relevance:
      "This is the professional consensus, and it agrees with the 1994 textbook: GC-MS gets you a close match, never an identity, and the final arbiter is always a side-by-side smell against a retained original. Note also the legal dimension — reverse-engineering technologies cannot always provide exact and complete information about a fragrance's composition, which is precisely why trade-secret litigation in this industry so often turns on whether a formula was lifted rather than independently reconstructed.",
    citation:
      "Practitioner reports from commercial fragrance-formulation services; and 'The Impact of Gas Chromatography-Mass Spectrometry (GC-MS) Technologies on the Fragrance Industry', USC Law School Legal Studies Working Paper Series.",
  },
];

/* ------------------------------------------------------------------ */
/* 5. The verdict, stated plainly                                      */
/* ------------------------------------------------------------------ */

export const whatGcActuallyDelivers = {
  delivers: [
    "A named ingredient list covering typically 90-98% of the volatile composition.",
    "Approximate relative proportions, good to roughly 10-20% without per-compound response factors and better with them.",
    "Reliable detection of specific naturals down to about 0.1%, by fingerprint pattern rather than by peak-by-peak reading.",
    "Marker-based confirmation of individual naturals (myristicene for nutmeg, styrene for styrax).",
    "An objective, repeatable basis for batch QC, adulteration detection and allergen compliance.",
    "A differential overlay — target versus trial — that converts 'not right' into a specific list of gaps and excesses.",
    "Raw-material verification: GC-based QC is what made genuinely pure essential oils, absolutes and resinoids reliably available again, by letting a purchaser know to what extent a so-called natural material actually is pure.",
  ],
  doesNotDeliver: [
    "The formula. A molecule list is not a formula: the same list can arise from many different recipes, and the recipe is what you need.",
    "Identification of captive molecules, which are absent from every library.",
    "The non-volatile fraction — resins, balsams, heavy fixatives — which for an amber oriental is the most important part of the base.",
    "The architecture of a base-built perfume, which flattens into a molecule list.",
    "Trace materials below roughly 0.1%, which are frequently the ones that give a composition its finish.",
    "Odour impact. Peak area is not perceived intensity; thresholds span orders of magnitude.",
    "Reaction products' history: hemi-acetals and Schiff bases formed during maturation were never weighed out by the perfumer.",
    "A single ground truth, where the extrait, EDP and EDT are different formulas and the perfume itself has been reformulated over decades.",
  ],
  bottomLine:
    "The gas chromatograph has been called a 'super blotter': it does what a smelling strip does — separating a blend roughly into its most volatile, less volatile and most tenacious groups — but far faster and far more thoroughly. That framing is the right one. It is an enormously better blotter, and it is not a perfumer. In the hands of a skilled operator a perfume can be nearly completely separated into its individual components; converting that information into a formula requires considerable experience from both the GC analyst and the perfumer, and some perfumers learn to specialise in exactly this combination, producing results unobtainable from a straight reading of the analytical printout.",
};

/* ------------------------------------------------------------------ */
/* 6. History — why this changed the industry                          */
/* ------------------------------------------------------------------ */

export const gcHistory = [
  {
    period: "Pre-1960s",
    what: "Perfumery was steeped in secrecy. Formulas lived in books held by their creators or their houses.",
  },
  {
    period: "1960s",
    what:
      "Commercialisation of the gas chromatograph. The profession initially panicked that the instrument would make the perfumer redundant, then settled into a business-as-usual view that it would matter only for QC. Both reactions turned out to be wrong.",
  },
  {
    period: "1960s-70s",
    what:
      "Capillary columns, then the mass spectrometer, then quantitative headspace analysis. GC combined with MS made identification of essential-oil components much faster: in rose oil, about 50 molecules had been identified by 1950, 200 by 1970, and 400 by the 1990s. Some of those newly identified molecules were then synthesised and became new perfumery materials in their own right.",
  },
  {
    period: "1970s",
    what:
      "Headspace introduced into perfumery, allowing direct analysis of the fragrance as it leaves the living plant. GC used to identify and quantify known components in existing market fragrances — the start of routine competitive analysis.",
  },
  {
    period: "Consequences",
    what:
      "Four effects the 1994 text identifies: the erosion of secrecy and the intensification of competition; the acceleration of trends and of the trickle-down phenomenon; the rise of safety and environmental concerns; and the refinement of performance measurement. Any company could, for an initial investment little more than the cost of a car at the time, acquire analytical capability that had previously been limited to the largest houses.",
  },
  {
    period: "Early 1990s",
    what:
      "SPME invented for air and water monitoring, then rapidly adopted for floral and odour-source identification because it needs neither solvent nor elaborate equipment and works in aqueous media.",
  },
  {
    period: "2010s-now",
    what:
      "GC×GC-TOFMS for the hardest separations; LC-MS for the non-volatile fraction; e-nose plus chemometrics for authentication; HS-SPME for in-vivo wear profiling; odour-activity-value methods for principled reconstruction. Compliance analysis of regulated allergens becomes a routine targeted service.",
  },
];

/* ------------------------------------------------------------------ */
/* 7. Legal and ethical note                                           */
/* ------------------------------------------------------------------ */

export const legalNote = {
  summary:
    "Reverse engineering a fragrance you lawfully own, to learn from it, is normal professional practice and is discussed openly in the standard textbooks. Selling the result as a copy of a branded product is a different activity with different consequences.",
  points: [
    {
      heading: "Trade secret vs. patent",
      body:
        "Fragrance formulas are protected as trade secrets rather than by patent, precisely because publication would disclose them. Reverse engineering is the lawful way a trade secret can be defeated — which is why the erosion of secrecy after GC-MS was so disruptive to the industry.",
    },
    {
      heading: "What is actually protected",
      body:
        "The name, the bottle, the packaging and the branding are protected by trademark and design rights, and in some jurisdictions the fragrance itself has been argued for protection. Ellena devotes a chapter to the question and the position remains that protecting a fragrance as such is difficult. Copying a *scent profile* is therefore in a different legal category from copying a name or a bottle.",
    },
    {
      heading: "Where the real risk sits",
      body:
        "Passing off and consumer confusion. Marketing a product as 'inspired by' or 'the same as' a named designer fragrance invites trademark and unfair-competition claims, and invites them regardless of how the formula was obtained. The counterfeit studies above show that enforcement attention in this space is largely driven by consumer-safety findings — methanol, elevated allergens, undeclared substances — rather than by olfactory similarity.",
    },
    {
      heading: "The authors' own position",
      body:
        "Calkin & Jellinek publish their structural analyses explicitly for teaching, and state that they do not intend them to be used for the unethical marketing of copycat, or at worst counterfeit, products. They also decline to give complete reconstructions, on the grounds that doing so would be of little value to a student who actually wants to develop as a perfumer.",
    },
    {
      heading: "What we recommend for DOM126",
      body:
        "Use reconstructions as structural education: learn how a family is built, then compose an original fragrance in that family under your own name. That is both the legally clean route and the commercially stronger one — a house with its own accords has something to sell that a house selling other people's shapes does not. Keep the vault private; do not publish brand names alongside formulas.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 8. Suggested bench protocol                                         */
/* ------------------------------------------------------------------ */

export const benchProtocol = {
  equipment: [
    "GC-MS with a 30 m × 0.25 mm × 0.25 µm capillary column; a polar phase (WAX / carbowax type) plus a non-polar phase (5% phenyl methyl siloxane)",
    "n-Alkane standard mixture (C8-C32) for retention indices",
    "An internal standard for quantification — benzyl alcohol is used in the published water-solubility work",
    "NIST mass spectral library plus a dedicated flavour-and-fragrance library",
    "Deconvolution software",
    "Optional but high-value: a sniffing port for GC-O; HS-SPME fibres (PDMS and CAR/PDMS) for headspace work",
  ],
  conditions: {
    dilution: "1:10 v/v in ethanol or acetone for a commercial perfume; up to 1:40 for a complex essential oil",
    injection: "1.0 µL, split mode, split ratio 100:1",
    injector: "250 °C",
    msSource: "230 °C, 70 eV electron impact",
    carrier: "Helium, ~1.3 mL/min constant flow",
    oven: "45 °C hold, then 10 °C/min to 250 °C (published counterfeit-profiling gradient); adjust the ramp for heavier samples",
    runTime: "~90 minutes for a full perfume analysis",
  },
  qcChecks: [
    "Run the alkane ladder with every batch, or retention indices are meaningless",
    "Reject library matches below ~90% quality",
    "Reject identifications with abnormal retention times or that cannot be cross-validated between samples",
    "Run a blank solvent injection between samples",
    "Store samples cool and dark, and record storage history — 12 °C is used in published work",
    "Keep a retained reference sample of every target so you can re-compare months later",
  ],
};
