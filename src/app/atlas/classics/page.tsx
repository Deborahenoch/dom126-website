import type { Metadata } from "next";
import Link from "next/link";
import { reconstructions, reconstructionFamilies, quantifiedLineCounts } from "@/lib/perfumery/classics";
import { getMaterial } from "@/lib/perfumery/materials";
import styles from "../atlas.module.css";
import type { Reconstruction } from "@/lib/perfumery/types";

export const metadata: Metadata = {
  title: "Classic Studies",
  description:
    "Twenty-one documented structural reconstructions of great perfumes from published GC analysis, grouped into six families, with quantified loadings, lineage, and the substitutions needed to rebuild any of them legally today.",
};

export default function ClassicsPage() {
  const totalQuantified = quantifiedLineCounts.reduce((s, r) => s + r.quantifiedLines, 0);
  const totalLines = quantifiedLineCounts.reduce((s, r) => s + r.totalLines, 0);

  return (
    <>
      <header className={styles.head}>
        <div className={`container-wide ${styles.headInner}`}>
          <span className={`eyebrow eyebrow--rule ${styles.headEyebrow}`}>Classic studies</span>
          <h1 className={styles.headTitle}>How the great perfumes are put together</h1>
          <p className={styles.headLead}>
            {reconstructions.length} structural reconstructions from one published source, grouped
            into {reconstructionFamilies.length} families. Across the whole set, {totalQuantified} of{" "}
            {totalLines} named materials carry a number — and this from a professional GC/MS study
            worked on by an experienced perfumer sitting alongside the instrument. That gap is the
            most useful thing on this page.
          </p>
        </div>
      </header>

      <div className={`container-wide ${styles.section}`}>
        <div className={`${styles.callout} ${styles.calloutDanger}`} style={{ marginBottom: "1.6rem" }}>
          <span className={styles.calloutTitle}>What these entries are, and what they are not</span>
          <div className={styles.calloutBody}>
            <p>
              Every entry comes from a single source: R. R. Calkin &amp; J. S. Jellinek,{" "}
              <em>Perfumery: Practice and Principles</em> (Wiley, 1994), chapter 12. That chapter is
              explicit about its own limits, and it is worth reading them before using any of this:
            </p>
            <ul style={{ paddingLeft: "1.1rem", listStyle: "disc", display: "grid", gap: "0.4rem" }}>
              <li>
                Its information is &ldquo;based on data coming from GC analysis combined with further
                work carried out in conjunction with our students.&rdquo;
              </li>
              <li>
                &ldquo;It has not been our intention to provide complete reconstructions, or indeed
                formulas, for the perfumes under discussion.&rdquo;
              </li>
              <li>
                &ldquo;Where percentages are given, these should be regarded only as guidelines to
                the main structure of the perfume and as a starting point for further work.&rdquo;
              </li>
              <li>
                The authors state they would not wish such formulas to be used &ldquo;for the
                unethical marketing of copycat, or at worst, counterfeit products,&rdquo; and that it
                remains for the individual perfumer or student to carry out the reconstruction and
                arrive at their own interpretative formulas.
              </li>
            </ul>
            <p>
              Two further cautions the same chapter raises. First, most perfumes exist in more than
              one form — extrait, eau de parfum, eau de toilette — and those are frequently based on
              rather different formulas, using more modern and less expensive ingredients to recreate
              the same idea at lower concentration. With that variation between line products, and
              the changes that have taken place in the formulas of many older perfumes, it is not
              always possible to talk of the one-and-only formula for a particular fragrance. Second,
              the analyses are of the extrait versions as they existed in the early 1990s. Three
              decades of reformulation have happened since.
            </p>
            <p>
              <strong>So: these are structural teaching data.</strong> They show how a family is
              built and how one perfume descends from another. Use them to learn architecture, then
              compose something of your own.
            </p>
          </div>
        </div>

        {/* Coverage table */}
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>Calibration</span>
          <h2 className="h3">How much of each formula is actually quantified</h2>
        </div>
        <div className={styles.tableWrap} style={{ marginBottom: "2.5rem" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Perfume</th>
                <th scope="col">House · Year</th>
                <th scope="col">Family</th>
                <th scope="col" className={styles.num}>Named</th>
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
                        <a href={`#${r.id}`} style={{ fontWeight: 600 }}>{r.perfume}</a>
                      </td>
                      <td className={styles.hint}>{rec?.house} · {rec?.year}</td>
                      <td className={styles.hint}>{rec?.family}</td>
                      <td className={`${styles.num} ${styles.mono}`}>{r.totalLines}</td>
                      <td className={`${styles.num} ${styles.mono}`}>{r.quantifiedLines}</td>
                      <td className={`${styles.num} ${styles.mono}`}>
                        <strong>{r.percentQuantified}%</strong>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Families */}
        {reconstructionFamilies.map((fam) => {
          const members = fam.members
            .map((id) => reconstructions.find((r) => r.id === id))
            .filter((r): r is NonNullable<typeof r> => Boolean(r));
          if (!members.length) return null;
          return (
            <section key={fam.id} style={{ marginBottom: "3rem" }}>
              <div className={styles.sectionHead}>
                <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>{fam.name}</span>
                <h2 className="h3">{members.length} studies</h2>
                <p className={styles.sectionLead}>{fam.definition}</p>
              </div>

              <div style={{ display: "grid", gap: "1rem" }}>
                {members.map((rec) => (
                  <ReconstructionCard key={rec.id} rec={rec} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Cross-cutting lessons */}
        <div className={styles.sectionHead} style={{ marginTop: "2rem" }}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>What the set teaches</span>
          <h2 className="h3">Seven patterns that run through all twenty-one studies</h2>
        </div>
        <div className={`${styles.grid} ${styles.grid2}`}>
          {[
            {
              t: "A family persists through proportion, not ingredients",
              b: "Between L'Air du Temps (1948) and Fidji (1966) there was an enormous increase in available synthetics, and throughout the main structure old materials were deliberately replaced by new — but the balance between the types of material, allowing for their different comparative strengths, remained almost unchanged. That is the single most transferable lesson in the set: learn the ratio, not the ingredient list.",
            },
            {
              t: "You can date a perfume from its materials",
              b: "Even without having examined Fidji before, you could be confident of dating it to within a few years of its creation just from the materials it contains. Vertofix arrived in the early 1960s; Hedione in the early 1960s; Iso E Super in 1967; Galaxolide in 1967; the damascones around 1970. Material availability is a fingerprint of date — which also means any 'vintage formula' containing a post-1970 material is not vintage.",
            },
            {
              t: "Descent is real and traceable",
              b: "L'Air du Temps begat Fidji, Charlie, Chloé, Anaïs Anaïs and Paris. Chanel No. 5's individuality limited its generative power, while Arpège — which reduced the vanillin and coumarin — led to Calèche, Madame Rochas, Calandre, Rive Gauche and White Linen. Bandit led to Cabochard. Eau Sauvage led to Diorella, which led to the whole aquatic genre via Helional's watery character. Perfumes are a family tree, and knowing your position in it is a creative resource.",
            },
            {
              t: "Complexity goes in the minor components, not the structure",
              b: "L'Air du Temps has an extraordinary simplicity, relying on naturals to give complexity and richness: most of its quality comes from jasmine and rose absolutes, which add many hundreds of individual ingredients that envelop and decorate the main structure. Simplicity within the main structure, increasing complexity within the lesser components. A perfume built the other way round — complex structure, cheap minor materials — reads as muddy.",
            },
            {
              t: "Trace materials do disproportionate work",
              b: "Vanillin, heliotropin and orris complete the carnation character in L'Air du Temps at trace levels. Aldehyde C11 undecylenic acts as a bridge between top notes and the rest. A trace of ambrette seed gives wonderful smoothness to Madame Rochas, working particularly well inside the rose accord. A trace of celery seed forms an interesting accord with tuberose in Miss Dior. Vanillin behaves like a pinch of salt in cooking: most compositions benefit, and too much is a disaster.",
            },
            {
              t: "Simplification is often the right move",
              b: "What is frequently found in a perfume showing descent through several predecessors is that the original idea, which may have been quite simple, has been greatly developed — by adding auxiliary notes and by replacing single materials with complex mixtures. Paloma Picasso is cited as a case in point, lacking perhaps some of the clarity of either Aromatics Elixir or Coriandre. Sometimes a simple reinterpretation of the original idea is what gives new life to an old and overworked family.",
            },
            {
              t: "Projection is a social decision, not just a technical one",
              b: "On Poison: much as its technical excellence is admired, it is a difficult perfume to live with — or to sit too close to in a theatre or concert hall. For a perfume to intrude so ostentatiously upon other people's space can at times be irritatingly offensive. Sillage is a design parameter with consequences for other people. Decide it deliberately, and decide it for the wearer's actual context, not for the blotter.",
            },
          ].map((l) => (
            <div key={l.t} className={styles.card}>
              <h3 className={styles.cardTitle} style={{ fontSize: "1.15rem" }}>{l.t}</h3>
              <p className={styles.cardBody}>{l.b}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`container-wide`} style={{ paddingBottom: "3rem" }}>
        <div className={styles.footerNote}>
          All structural information, percentages, ratios, lineage and quoted judgements on this page
          derive from R. R. Calkin &amp; J. S. Jellinek, <em>Perfumery: Practice and Principles</em>{" "}
          (Wiley-Interscience, 1994), chapter 12, &ldquo;Selected Great Perfumes.&rdquo; Where a
          percentage is absent, the source named the material without quantifying it, and this Atlas
          has not supplied a number. Where a substitution has been made for a banned or restricted
          material — Lyral and Lilial (prohibited in EU cosmetics), musk ketone and musk xylene
          (banned), civet, natural musk and ambergris (unavailable), castoreum (marginal) — the
          substitution is recorded in the entry&apos;s modernisation notes and is ours, not the
          source&apos;s.
          <br />
          <br />
          Load these into the <Link href="/atlas/vault">formula vault</Link> with &ldquo;Start from a
          classic study…&rdquo;. Only the lines the source actually quantifies become parts;
          everything else is carried at zero with a note, so you can see what is missing rather than
          being handed a falsely complete formula. The comparison tab then lets you build a trial
          against it and read the gaps — which is exactly the iteration loop the reverse-engineering
          workflow describes.
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

function ReconstructionCard({ rec }: { rec: Reconstruction }) {
  const quantified = rec.lines.filter((l) => l.percent !== undefined || l.ratio !== undefined);
  const named = rec.lines.filter((l) => l.percent === undefined && !l.ratio);
  const totalPercent = quantified.reduce((s, l) => s + (l.percent ?? 0), 0);

  return (
    <article id={rec.id} className={styles.card} style={{ scrollMarginTop: "5rem", padding: "1.6rem 1.7rem" }}>
      <div style={{ display: "flex", gap: "0.6rem", alignItems: "baseline", flexWrap: "wrap" }}>
        <h3 className={styles.cardTitle} style={{ fontSize: "1.6rem" }}>{rec.perfume}</h3>
        <span className={styles.cardMeta}>
          {rec.house} · {rec.year} · {rec.family}
        </span>
      </div>

      <div className={styles.pills}>
        <span className={`${styles.pill} ${styles.pillGold}`}>
          {quantified.length} of {rec.lines.length} materials quantified
        </span>
        <span className={styles.pill}>~{totalPercent.toFixed(0)}% of the formula accounted for</span>
        {rec.unquantified.length > 0 && (
          <span className={styles.pill}>{rec.unquantified.length} named without detail</span>
        )}
      </div>

      <div>
        <span className={styles.label}>Core accord</span>
        <p className={styles.cardBody}>{rec.coreAccord}</p>
      </div>

      <div>
        <span className={styles.label}>Quantified structure</span>
        <div className={styles.tableWrap} style={{ marginTop: "0.4rem" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Material</th>
                <th scope="col" className={styles.num}>%</th>
                <th scope="col" className={styles.num}>Ratio</th>
                <th scope="col">Layer</th>
                <th scope="col">Role in the composition</th>
              </tr>
            </thead>
            <tbody>
              {quantified.map((l) => {
                const m = getMaterial(l.materialId);
                return (
                  <tr key={l.materialId}>
                    <td>
                      <strong>{m?.name ?? l.materialId}</strong>
                      {m?.regulatory.status === "banned-eu-cosmetics" && (
                        <span className={`${styles.pill} ${styles.pillBlock}`} style={{ marginLeft: "0.4rem" }}>
                          prohibited
                        </span>
                      )}
                    </td>
                    <td className={`${styles.num} ${styles.mono}`}>
                      {l.percent !== undefined ? `${l.percent}%` : "—"}
                    </td>
                    <td className={`${styles.num} ${styles.mono}`}>{l.ratio ?? "—"}</td>
                    <td>
                      {l.layer && (
                        <span className={`${styles.pill} ${l.layer === "top" ? styles.pillTop : l.layer === "heart" ? styles.pillHeart : l.layer === "base" ? styles.pillBase : ""}`}>
                          {l.layer}
                        </span>
                      )}
                    </td>
                    <td className={styles.hint} style={{ fontSize: "0.85rem" }}>{l.role}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {named.length > 0 && (
        <div>
          <span className={styles.label}>Named but not quantified</span>
          <div className={styles.pills} style={{ marginTop: "0.4rem" }}>
            {named.map((l) => {
              const m = getMaterial(l.materialId);
              return (
                <span key={l.materialId} className={styles.pill} title={l.role}>
                  {m?.name ?? l.materialId}
                  {l.layer ? ` · ${l.layer}` : ""}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {rec.unquantified.length > 0 && (
        <div>
          <span className={styles.label}>Also recorded by the source</span>
          <ul style={{ paddingLeft: "1.1rem", listStyle: "disc", display: "grid", gap: "0.25rem", marginTop: "0.4rem" }}>
            {rec.unquantified.map((u) => (
              <li key={u} className={styles.hint}>{u}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <span className={styles.label}>Coverage of the formula</span>
        <p className={styles.cardBody}>{rec.quantifiedCoverage}</p>
      </div>

      <div>
        <span className={styles.label}>Lineage and evolution</span>
        <p className={styles.cardBody}>{rec.evolution}</p>
      </div>

      <div className={`${styles.callout} ${rec.modernisation.some((m) => /PROHIBITED|banned|Banned/i.test(m)) ? styles.calloutDanger : ""}`}>
        <span className={styles.calloutTitle}>Rebuilding this today</span>
        <div className={styles.calloutBody}>
          <ul style={{ paddingLeft: "1.1rem", listStyle: "disc", display: "grid", gap: "0.4rem" }}>
            {rec.modernisation.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </div>
      </div>

      <p className={styles.sourceRef}>Source: {rec.source}</p>
    </article>
  );
}
