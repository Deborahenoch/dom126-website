import type { Metadata } from "next";
import Link from "next/link";
import { materials, originBreakdown, euAllergens } from "@/lib/perfumery/materials";
import { accords } from "@/lib/perfumery/accords";
import { families } from "@/lib/perfumery/families";
import { reconstructions, quantifiedLineCounts } from "@/lib/perfumery/classics";
import { techniques, limitations, caseStudies } from "@/lib/perfumery/gcms";
import styles from "./atlas.module.css";

export const metadata: Metadata = {
  title: "Perfumery Atlas",
  description:
    "A working reference on natural and synthetic perfume materials, olfactory families, structural accords, documented GC-MS reconstructions of classic perfumes, and a private formula vault.",
};

const SECTIONS = [
  {
    href: "/atlas/materials",
    title: "Materials",
    body: "Every natural and synthetic in the palette: origin, extraction route, odour field and facet, volatility class, typical use level, cost tier, CAS number, regulatory posture, what it pairs with and what it is used to build.",
  },
  {
    href: "/atlas/families",
    title: "Families & structure",
    body: "The SFP seven families, Edwards' wheel, Ellena's nine odour fields, the Carles structural triangle against the modern Grojsman structure, concentration classes, and the perfumer's dose ladder.",
  },
  {
    href: "/atlas/accords",
    title: "Accords & bases",
    body: "Buildable starting formulas in parts per thousand — the structural accords that carry whole families, the floral bases, and the modifier accords. Each with variants, substitutions and provenance.",
  },
  {
    href: "/atlas/classics",
    title: "Classic studies",
    body: "Twenty-one documented structural reconstructions of great perfumes, grouped into six families, with the quantified loadings the source gives, the lineage between them, and what has to change to rebuild any of them legally today.",
  },
  {
    href: "/atlas/gcms",
    title: "Reverse engineering by GC-MS",
    body: "The techniques and what each is for, a twelve-step reconstruction workflow, the eleven hard limits of the method, and a comparison against published analytical studies of perfume twins, counterfeits and aroma reconstruction.",
  },
  {
    href: "/atlas/vault",
    title: "Formula vault",
    body: "The working app. Store formulas privately, retrieve them on demand, scale to any batch, get gram weights and dilution advice, check allergens and compliance, compare a trial against a target, print the sheet.",
  },
];

export default function AtlasPage() {
  const avgQuantified = Math.round(
    quantifiedLineCounts.reduce((s, r) => s + r.percentQuantified, 0) /
      Math.max(quantifiedLineCounts.length, 1),
  );

  return (
    <>
      <header className={styles.head}>
        <div className={`container-wide ${styles.headInner}`}>
          <span className={`eyebrow eyebrow--rule ${styles.headEyebrow}`}>
            DOM126 · Internal reference
          </span>
          <h1 className={styles.headTitle}>The Perfumery Atlas</h1>
          <p className={styles.headLead}>
            A working reference for building fragrance from raw materials: what each material is
            and does, how the olfactory families are constructed, the accords that carry them, how
            great perfumes have been taken apart by gas chromatography, what that technique can and
            cannot tell you — and a vault for storing your own formulas so a composition can be
            reproduced months later at a different scale.
          </p>
          <p className={styles.headLead}>
            It is not a public shop page. Nothing here is for sale and nothing here is a
            manufacturer&apos;s formula.
          </p>
        </div>
      </header>

      <section className={`container-wide ${styles.section}`}>
        <div className={styles.stats} style={{ marginBottom: "2rem" }}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{materials.length}</span>
            <span className={styles.statLabel}>Materials catalogued</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{originBreakdown.natural ?? 0}</span>
            <span className={styles.statLabel}>Naturals</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {(originBreakdown.synthetic ?? 0) + (originBreakdown.isolated ?? 0)}
            </span>
            <span className={styles.statLabel}>Synthetics & isolates</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{accords.length}</span>
            <span className={styles.statLabel}>Buildable accords</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{reconstructions.length}</span>
            <span className={styles.statLabel}>Classic studies</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{euAllergens.length}</span>
            <span className={styles.statLabel}>EU-declarable allergens</span>
          </div>
        </div>

        <div className={`${styles.grid} ${styles.grid2}`}>
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href} className={`${styles.card} ${styles.linkCard}`}>
              <h2 className={styles.cardTitle}>{s.title}</h2>
              <p className={styles.cardBody}>{s.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Sources ---------------- */}
      <section className={`container-wide ${styles.section}`}>
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>Sources</span>
          <h2 className="h3">Where this came from, and what it is not</h2>
        </div>

        <div className={`${styles.grid} ${styles.grid2}`}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Primary texts</h3>
            <div className={styles.prose}>
              <p>
                <strong>R. R. Calkin &amp; J. S. Jellinek, <em>Perfumery: Practice and Principles</em></strong>{" "}
                (Wiley-Interscience, 1994). The technical backbone: raw materials and how they are
                obtained, the learning and classification of materials, floral compounding notes,
                the technique of matching, perfume structure, the use of bases, the uses of gas
                chromatography, the physical basis of perfumery (including measured vapour
                pressures and water solubilities), and chapter 12&apos;s structural analyses of
                great perfumes. Jellinek was at Dragoco; Calkin was a perfumery training consultant,
                and the book is written as a teaching text rather than a trade manual.
              </p>
              <p>
                <strong>Jean-Claude Ellena, <em>Perfume: The Alchemy of Scent</em></strong>{" "}
                (Arcade, 2011; trans. John Crisp). The perfumer&apos;s-eye view: materials of
                natural origin and the techniques for obtaining them, synthetic materials in order
                of discovery, analysis techniques (chromatography, headspace, SPME), the nine odour
                fields, formulation method and the dose ladder, perfume classification, and
                concentrations. Ellena was perfumer at Hermès and sat on the Société Française des
                Parfumeurs classification committee.
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Classification and regulation</h3>
            <div className={styles.prose}>
              <ul>
                <li>
                  <strong>Société Française des Parfumeurs</strong> — the seven-family
                  classification published 1984 and revised 1990, which is the industry standard
                  this Atlas is keyed to.
                </li>
                <li>
                  <strong>Michael Edwards&apos; Fragrance Wheel</strong> (1983, updated) — four
                  groups, fourteen families; &ldquo;Oriental&rdquo; renamed &ldquo;Amber&rdquo; in
                  2021.
                </li>
                <li>
                  <strong>Fragrantica&apos;s perfume-group taxonomy</strong> — a retail-facing
                  grouping (Floral, Oriental, Woody, Chypre, Aromatic, Citrus, Fougère, Leather and
                  their sub-groups), closer to Edwards than to the SFP and organised for shopping
                  rather than formulation.
                </li>
                <li>
                  <strong>IFRA Standards</strong> and <strong>EU Regulation 1223/2009</strong> as
                  amended by <strong>Regulation (EU) 2023/1545</strong> — the regulatory flags on
                  every material.
                </li>
                <li>
                  <strong>Analytical literature</strong> on perfume GC-MS, counterfeit detection,
                  GC×GC-MS authentication, HS-SPME wear profiling and odour-activity-value
                  reconstruction — cited per entry on the reverse-engineering page.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={`${styles.callout} ${styles.calloutDanger}`} style={{ marginTop: "1.4rem" }}>
          <span className={styles.calloutTitle}>Three things this Atlas is not</span>
          <div className={styles.calloutBody}>
            <p>
              <strong>It is not a source of real formulas.</strong> Trade formulas are confidential
              and are not published anywhere. The percentages attached to named commercial perfumes
              come from one published <em>study</em> — Calkin &amp; Jellinek chapter 12 — which is
              itself derived from GC analysis plus classroom reconstruction. That book states that
              it does not intend to provide complete reconstructions or formulas, and that its
              percentages &ldquo;should be regarded only as guidelines to the main structure.&rdquo;
              They are treated as structural teaching data here, and labelled as such on every
              entry.
            </p>
            <p>
              <strong>It is not a compliance service.</strong> The regulatory flags summarise public
              information and are a study aid. IFRA Standards are category-specific and change;
              EU annexes change. Verify before selling anything, get supplier allergen declarations
              for every natural, and have finished products tested.
            </p>
            <p>
              <strong>It is not a licence to copy.</strong> The same source that provides the
              structural analyses explicitly does not want them used for the unethical marketing of
              copycat or counterfeit products, and declines to give complete reconstructions on the
              grounds that doing so would be of little value to a student who actually wants to
              develop as a perfumer. The recommendation for DOM126 is on the reverse-engineering
              page: learn how a family is built, then compose something original in it under your
              own name. That is both the legally clean route and the commercially stronger one.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- The honest headline number ---------------- */}
      <section className={`container-wide ${styles.section}`}>
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>Calibration</span>
          <h2 className="h3">How much of a perfume does analysis actually recover?</h2>
          <p className={styles.sectionLead}>
            Averaged across the {reconstructions.length} classic studies, the source quantifies{" "}
            <strong>{avgQuantified}%</strong> of the named materials — and this from a professional
            GC/MS study worked on by an experienced perfumer alongside the instrument. That number
            is the single best calibration available for anyone planning to reverse engineer a
            fragrance.
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Study</th>
                <th scope="col">House · Year</th>
                <th scope="col" className={styles.num}>Materials named</th>
                <th scope="col" className={styles.num}>Quantified</th>
                <th scope="col" className={styles.num}>Coverage</th>
              </tr>
            </thead>
            <tbody>
              {quantifiedLineCounts
                .slice()
                .sort((a, b) => b.percentQuantified - a.percentQuantified)
                .map((r) => {
                  const rec = reconstructions.find((x) => x.id === r.id);
                  return (
                    <tr key={r.id}>
                      <td>
                        <Link href={`/atlas/classics#${r.id}`} style={{ fontWeight: 600 }}>
                          {r.perfume}
                        </Link>
                      </td>
                      <td className={styles.hint}>
                        {rec?.house} · {rec?.year}
                      </td>
                      <td className={`${styles.num} ${styles.mono}`}>{r.totalLines}</td>
                      <td className={`${styles.num} ${styles.mono}`}>{r.quantifiedLines}</td>
                      <td className={`${styles.num} ${styles.mono}`}>{r.percentQuantified}%</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <p className={styles.hint} style={{ marginTop: "0.9rem" }}>
          &ldquo;Materials named&rdquo; counts only the materials the source identifies and that
          exist in this Atlas&apos;s reference data; each study also lists further materials named
          without any structural detail. &ldquo;Quantified&rdquo; means the source gives a
          percentage or an explicit ratio. A low coverage figure does not mean the study was poor —
          it means the perfume has more to it than analysis reached, which is the normal case.
        </p>
      </section>

      {/* ---------------- Start here ---------------- */}
      <section className={`container-wide ${styles.section}`}>
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>Start here</span>
          <h2 className="h3">A route through the material, if you are learning this from nothing</h2>
        </div>

        <div className={`${styles.grid} ${styles.grid3}`}>
          {[
            {
              n: "01",
              t: "Learn the odour fields before the materials",
              b: "Nine fields, each defined by the molecules that characterise it — rose flowers by phenylethyl alcohol and geraniol, white flowers by methyl anthranilate plus indole, yellow flowers by beta-ionone, spiced flowers by benzyl salicylate plus eugenol, anise flowers by anisaldehyde or heliotropin. Knowing the defining molecule tells you which material to reach for, which is more useful than memorising a list.",
            },
            {
              n: "02",
              t: "Smell in sets of ten, an hour apart",
              b: "The standard training method: study odours in sets of ten, each set at least an hour apart, each material sampled on a blotter at a 5% dilution in perfumer's alcohol. Naturals are easier at first — essence of orange smells of orange. Synthetics are not: benzyl acetate smells of benzyl acetate, and it takes a few months to realise it is inside jasmine.",
            },
            {
              n: "03",
              t: "Build two-material accords in every proportion",
              b: "Take two materials of similar volatility and blend them 9:1, 8:2, 7:3 through to 1:9, then pick the mixture that seems most pleasing — usually the one where both are smelled at equal intensity. Most of the time nothing interesting happens. Occasionally the mixture takes on a character distinct from its parts. That is an accord, and finding them is the whole craft.",
            },
            {
              n: "04",
              t: "Build a floral base from as little as possible",
              b: "Start with only enough materials to establish the essential character — under fifteen, often far fewer. Balance that by nose, then add modifiers two or three at a time. Use a large proportion of highly characteristic materials; a base built only from generally-used floral materials loses its identity and gives a nondescript floral.",
            },
            {
              n: "05",
              t: "Assemble a structure, then a perfume",
              b: "Bring several lesser accords together as building blocks around one main structural accord that defines the character — a chypre, an oriental, or a modern accord of four materials. Then judge the base notes first, because that is what remains on skin for hours, and remember that many base materials smell unpleasant neat until the modifiers round them off.",
            },
            {
              n: "06",
              t: "Record everything in the vault",
              b: "Log the trial, the dilution smelled, the top / heart / drydown, and what you changed. A formula without its trial history is a guess you cannot improve on. This is the habit that separates a house that gets better from one that repeats itself.",
            },
          ].map((s) => (
            <div key={s.n} className={styles.card}>
              <span className={styles.cardMeta}>{s.n}</span>
              <h3 className={styles.cardTitle} style={{ fontSize: "1.15rem" }}>{s.t}</h3>
              <p className={styles.cardBody}>{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Technique at a glance ---------------- */}
      <section className={`container-wide ${styles.section}`}>
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>Analysis</span>
          <h2 className="h3">The techniques, at a glance</h2>
          <p className={styles.sectionLead}>
            Each one answers a different question, and none of them answers the question you
            actually care about on its own. Full detail on the reverse-engineering page.
          </p>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Technique</th>
                <th scope="col">Best for</th>
                <th scope="col">Main limitation</th>
              </tr>
            </thead>
            <tbody>
              {techniques.map((t) => (
                <tr key={t.id}>
                  <td><strong>{t.name}</strong></td>
                  <td className={styles.hint}>{t.bestFor}</td>
                  <td className={styles.hint}>{t.limitation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`${styles.callout} ${styles.calloutDark}`} style={{ marginTop: "1.4rem" }}>
          <span className={styles.calloutTitle}>The bottom line</span>
          <div className={styles.calloutBody}>
            <p>
              The gas chromatograph has been called a &ldquo;super blotter&rdquo; — it does what a
              smelling strip does, separating a blend roughly into its most volatile, less volatile
              and most tenacious groups, but far faster and far more thoroughly. That framing is the
              right one. It is an enormously better blotter and it is not a perfumer. Of{" "}
              {limitations.length} documented limits on the method, three are hard stops rather than
              inconveniences: captive molecules that exist in no library, the non-volatile fraction
              that never reaches the column, and the fact that peak area is not odour impact.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Families ---------------- */}
      <section className={`container-wide ${styles.section}`}>
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>Families</span>
          <h2 className="h3">Seven families, and what actually defines each one</h2>
          <p className={styles.sectionLead}>
            A family names an <em>accord</em>, not a natural object. Fougère claims no connection
            with the smell of a fern; it is simply produced with lavender, oakmoss, coumarin,
            bergamot and geranium. Reading the definitions that way makes them usable.
          </p>
        </div>
        <div className={`${styles.grid} ${styles.grid3}`}>
          {families.map((f) => (
            <Link key={f.id} href={`/atlas/families#${f.id}`} className={`${styles.card} ${styles.linkCard}`}>
              <span className={styles.cardMeta}>
                {f.french} · {f.anchor.year}
              </span>
              <h3 className={styles.cardTitle}>{f.name}</h3>
              <p className={styles.cardBody}>{f.signature}</p>
              <span className={styles.hint}>
                Anchor: {f.anchor.name} ({f.anchor.house})
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Case studies ---------------- */}
      <section className={`container-wide ${styles.section}`}>
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>Published work</span>
          <h2 className="h3">What the analytical literature actually found</h2>
          <p className={styles.sectionLead}>
            {caseStudies.length} published or trade studies compared here in full, including the
            brand-versus-imitation work, GC×GC authentication, counterfeit profiling, GC-sniffing of
            perfume twins, in-vivo wear profiling and odour-activity-value reconstruction.
          </p>
        </div>
        <div className={`${styles.grid} ${styles.grid2}`}>
          {caseStudies.slice(0, 4).map((c) => (
            <Link key={c.id} href={`/atlas/gcms#${c.id}`} className={`${styles.card} ${styles.linkCard}`}>
              <h3 className={styles.cardTitle} style={{ fontSize: "1.15rem" }}>{c.title}</h3>
              <p className={styles.cardBody}>{c.finding.slice(0, 220)}…</p>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: "1.2rem" }}>
          <Link href="/atlas/gcms" className={`${styles.btn} ${styles.btnGhost}`}>
            All {caseStudies.length} studies →
          </Link>
        </div>
      </section>

      <div className={`container-wide`} style={{ paddingBottom: "3rem" }}>
        <div className={styles.footerNote}>
          Compiled for DOM126 Fragrances as an internal working reference. Data extracted from the
          two primary texts listed above and from the cited analytical and regulatory sources, then
          restructured into queryable form. Odour descriptions, CAS numbers, volatility classes and
          regulatory flags are factual reference data and are corrected in place as better sources
          become available. Proportions in the accord recipes are conventional starting points
          assembled for this Atlas and are labelled as such — they are not figures taken from either
          book.
        </div>
      </div>
    </>
  );
}
