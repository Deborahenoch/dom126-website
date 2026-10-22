import type { Metadata } from "next";
import Link from "next/link";
import {
  techniques,
  reconstructionWorkflow,
  limitations,
  caseStudies,
  whatGcActuallyDelivers,
  gcHistory,
  legalNote,
  benchProtocol,
} from "@/lib/perfumery/gcms";
import styles from "../atlas.module.css";

export const metadata: Metadata = {
  title: "Reverse Engineering by GC-MS",
  description:
    "How perfume reverse engineering by gas chromatography actually works: the techniques, a twelve-step reconstruction workflow, eleven documented limits of the method, and a comparison against published analytical studies of perfume twins, counterfeits and aroma reconstruction.",
};

export default function GcmsPage() {
  const blocks = limitations.filter((l) => l.severity === "block").length;

  return (
    <>
      <header className={styles.head}>
        <div className={`container-wide ${styles.headInner}`}>
          <span className={`eyebrow eyebrow--rule ${styles.headEyebrow}`}>Reverse engineering</span>
          <h1 className={styles.headTitle}>What gas chromatography can and cannot tell you</h1>
          <p className={styles.headLead}>
            GC-MS gives you a very good ingredient list and a poor formula. Everything on this page
            is about closing that gap — and about knowing when it cannot be closed. It combines the
            perfumer-side workflow from the standard textbooks with {caseStudies.length} published or
            trade analytical studies, so that the method can be judged against what has actually been
            achieved rather than against what is claimed for it.
          </p>
        </div>
      </header>

      <div className={`container-wide ${styles.section}`}>
        {/* Headline verdict */}
        <div className={`${styles.grid} ${styles.grid2}`} style={{ marginBottom: "2rem" }}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>What it delivers</h3>
            <ul className={styles.prose} style={{ paddingLeft: "1.1rem", listStyle: "disc" }}>
              {whatGcActuallyDelivers.delivers.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>What it does not</h3>
            <ul className={styles.prose} style={{ paddingLeft: "1.1rem", listStyle: "disc" }}>
              {whatGcActuallyDelivers.doesNotDeliver.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        </div>

        <div className={`${styles.callout} ${styles.calloutDark}`} style={{ marginBottom: "2.5rem" }}>
          <span className={styles.calloutTitle}>The bottom line</span>
          <div className={styles.calloutBody}>{whatGcActuallyDelivers.bottomLine}</div>
        </div>

        {/* Techniques */}
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>1 · Techniques</span>
          <h2 className="h3">Ten methods, each answering a different question</h2>
        </div>
        <div style={{ display: "grid", gap: "0.6rem", marginBottom: "2.5rem" }}>
          {techniques.map((t) => (
            <details key={t.id} className={styles.details}>
              <summary className={styles.detailsSummary}>
                <span style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap", minWidth: 0 }}>
                  <strong>{t.name}</strong>
                  <span className={styles.pill}>{t.introduced.split(";")[0]}</span>
                </span>
                <span className={styles.chevron} aria-hidden>▸</span>
              </summary>
              <div className={styles.detailsBody}>
                <div><span className={styles.label}>What it does</span><p className={styles.cardBody}>{t.what}</p></div>
                <div><span className={styles.label}>Best for</span><p className={styles.cardBody}>{t.bestFor}</p></div>
                <div><span className={styles.label}>Limitation</span><p className={styles.cardBody}>{t.limitation}</p></div>
                <p className={styles.sourceRef}>{t.introduced}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Workflow */}
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>2 · Workflow</span>
          <h2 className="h3">The twelve-step reconstruction loop</h2>
          <p className={styles.sectionLead}>
            Steps 1 and 2 are the ones most often skipped and the ones that matter most. Steps 9 to
            11 are the iteration loop: build, compare both ways, use contrast smelling to find what
            the machine missed, repeat until further analysis costs more than further smelling.
          </p>
        </div>
        <div className={`${styles.grid} ${styles.grid2}`} style={{ marginBottom: "2.5rem" }}>
          {reconstructionWorkflow.map((s) => (
            <div key={s.step} className={styles.card}>
              <span className={styles.cardMeta}>Step {String(s.step).padStart(2, "0")}</span>
              <h3 className={styles.cardTitle} style={{ fontSize: "1.15rem" }}>{s.title}</h3>
              <p className={styles.cardBody}>{s.detail}</p>
              <p className={styles.hint}><strong>Why:</strong> {s.why}</p>
            </div>
          ))}
        </div>

        {/* Limitations */}
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>3 · Limits</span>
          <h2 className="h3">
            {limitations.length} documented limits, {blocks} of them hard stops
          </h2>
          <p className={styles.sectionLead}>
            A hard stop means no amount of better instrumentation fixes it. The rest can be worked
            around with method changes, at a cost.
          </p>
        </div>
        <div className={styles.tableWrap} style={{ marginBottom: "2.5rem" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Limit</th>
                <th scope="col">Severity</th>
                <th scope="col">The problem</th>
                <th scope="col">What it means in practice</th>
                <th scope="col">Mitigation</th>
              </tr>
            </thead>
            <tbody>
              {limitations.map((l) => (
                <tr key={l.id}>
                  <td><strong>{l.title}</strong></td>
                  <td>
                    <span className={`${styles.pill} ${l.severity === "block" ? styles.pillBlock : styles.pillWarn}`}>
                      {l.severity === "block" ? "Hard stop" : "Workaround"}
                    </span>
                  </td>
                  <td className={styles.hint}>{l.problem}</td>
                  <td className={styles.hint}>{l.consequence}</td>
                  <td className={styles.hint}>{l.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Case studies */}
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>4 · Published work</span>
          <h2 className="h3">Comparison against what has actually been done</h2>
          <p className={styles.sectionLead}>
            Eleven studies, ordered from the most accessible to the most specialised. Read together
            they answer the question this page exists to answer: how close does a GC-MS
            reconstruction get, and where does it stop?
          </p>
        </div>
        <div style={{ display: "grid", gap: "1rem", marginBottom: "2.5rem" }}>
          {caseStudies.map((c) => (
            <article key={c.id} id={c.id} className={styles.card} style={{ scrollMarginTop: "5rem", padding: "1.5rem 1.6rem" }}>
              <h3 className={styles.cardTitle} style={{ fontSize: "1.35rem" }}>{c.title}</h3>
              <p className={styles.cardBody}><strong>Context.</strong> {c.context}</p>
              <p className={styles.cardBody}><strong>Method.</strong> {c.method}</p>
              <p className={styles.cardBody}><strong>Finding.</strong> {c.finding}</p>
              <div className={`${styles.callout} ${styles.calloutDark}`}>
                <span className={styles.calloutTitle}>Why it matters for this work</span>
                <div className={styles.calloutBody}>{c.relevance}</div>
              </div>
              <p className={styles.sourceRef}>{c.citation}</p>
            </article>
          ))}
        </div>

        {/* Synthesis */}
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>5 · Synthesis</span>
          <h2 className="h3">What the published numbers say, side by side</h2>
        </div>
        <div className={styles.tableWrap} style={{ marginBottom: "1.4rem" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Question</th>
                <th scope="col">Published answer</th>
                <th scope="col">Source</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["How many compounds does GC-MS identify in a real perfume?", "Nearly 200 peaks detected at S/N>50 in one brand perfume, of which 119 matched library analytes — against 16 ingredients declared on the packaging.", "LECO GC-TOFMS differential analysis"],
                ["Does 1D GC-MS resolve a genuine perfume?", "No. It clearly separates an imitation from an authentic product, but shows many unresolved co-elutions in the genuine sample. GC×GC-MS is needed to reveal the fragrance-key compounds and trace allergens.", "GC×GC-MS authentication feasibility study"],
                ["How far can a counterfeit be from the original and still pass?", "45 compounds detected in the original, four to five in the counterfeit. Linalool at about 5.1% of the original's amount, plus methanol and 6,7-dihydrogeraniol.", "Volatilomics profiling of counterfeit perfume"],
                ["Are counterfeits simply dilutions?", "No — they contain significantly more volatile compounds than the originals, with some allergens at much higher concentration or present only in the imitation. Benzyl alcohol 2.17% and hydroxycitronellal 2.18% appeared only in one counterfeit; d-limonene in all of them.", "Micromachines 14(3) 524, 2023"],
                ["Can two chemically near-identical perfumes smell different?", "Yes. 63 VOCs in the original against 54 in its twin, with broadly similar chromatographic profiles but clearly different sensory profiles. Specific terpenes (beta-myrcene, (-)-beta-pinene, longifolene, alpha-guaiene) and certain esters carried the difference.", "Chemical Engineering Transactions 54, 2016"],
                ["How few materials can actually reconstruct an aroma?", "Seven. From 67 volatiles identified by non-targeted GC-MS, odour-activity-value analysis screened out seven key odorants, and blending those seven in proportions calibrated to loading content and headspace release replicated the original rose aroma profile.", "Divide-and-conquer rose aroma reconstruction, 2026"],
                ["What does a perfume do on skin over time?", "51 compounds identified on skin — 19 endogenous and 32 fragrance-derived — with several endogenous skin volatiles suppressed after application, and 7 compounds common to all participants at 0, 1 and 2 hours.", "HS-SPME skin scent profiles, 2018"],
                ["What detection level should a compliance lab quote?", "LODs of 1.2 mg/kg (musk xylene), 15 mg/kg (hydroxycitronellal and Lyral) and 3.0 mg/kg for the other 24 regulated fragrances; correlations ≥0.996; recoveries 73-118%. In an undiluted deodorant: linalool 1028 ppm, linalyl acetate 614 ppm, citronellol 141 ppm, geraniol 136 ppm, benzyl alcohol 102 ppm.", "27-fragrance GC-MS method, 2019; allergen GC-MS"],
                ["What is the professional consensus on exact replication?", "That it is not achievable. Captive molecules, proprietary bases and unavailable essential oils cannot simply be replaced; formulas derived from GC-MS reports can come close, and every release is verified by comparing the reconstruction against a retained original sample side by side.", "Commercial reconstruction practitioners; USC law working paper on GC-MS and the fragrance industry"],
              ].map(([q, a, s]) => (
                <tr key={q}>
                  <td><strong>{q}</strong></td>
                  <td className={styles.hint}>{a}</td>
                  <td className={styles.hint} style={{ fontSize: "0.8rem" }}>{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`${styles.callout} ${styles.calloutDanger}`}>
          <span className={styles.calloutTitle}>The number that settles it</span>
          <div className={styles.calloutBody}>
            <p>
              Sixty-seven compounds identified. Seven reconstructed the aroma. That ratio — roughly
              one in ten — is the practical summary of everything on this page. Ranking by peak area
              tells you what is abundant; ranking by odour activity value tells you what matters. A
              naive rebuild from the full list, weighted by abundance, produces something
              quantitatively faithful and qualitatively wrong.
            </p>
            <p>
              The same logic runs through the counterfeit data. A copy with four compounds against
              the original&apos;s forty-five can still pass as that original on a blotter in a shop,
              because a handful of high-impact materials carry the recognition — and a twin with a
              near-identical inventory of sixty-odd compounds can still be told apart, because a few
              terpenes differ. Abundance is not impact, in either direction.
            </p>
          </div>
        </div>

        {/* Bench protocol */}
        <div className={styles.sectionHead} style={{ marginTop: "2.5rem" }}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>6 · Bench protocol</span>
          <h2 className="h3">Starting conditions, from the published methods</h2>
        </div>
        <div className={`${styles.grid} ${styles.grid2}`} style={{ marginBottom: "2.5rem" }}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Equipment</h3>
            <ul className={styles.prose} style={{ paddingLeft: "1.1rem", listStyle: "disc" }}>
              {benchProtocol.equipment.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Conditions</h3>
            <div className={styles.tableWrap}>
              <table className={styles.table} style={{ minWidth: 0 }}>
                <tbody>
                  {Object.entries(benchProtocol.conditions).map(([k, v]) => (
                    <tr key={k}>
                      <td><strong>{k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}</strong></td>
                      <td className={styles.hint}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: "0.8rem" }}>
              <span className={styles.label}>QC checks</span>
              <ul className={styles.prose} style={{ paddingLeft: "1.1rem", listStyle: "disc", marginTop: "0.4rem" }}>
                {benchProtocol.qcChecks.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* History */}
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>7 · History</span>
          <h2 className="h3">How this changed the industry</h2>
          <p className={styles.sectionLead}>
            Some thirty years before the 1994 textbook was written, the commercialisation of the gas
            chromatograph shook the perfumery profession. The initial reaction — panic that the
            instrument would make the perfumer redundant — soon calmed into a second reaction: that
            the chromatograph, while useful to the analytical chemist and to quality control, would
            have little effect on the perfumer&apos;s essential job of creating perfumes. The
            textbook&apos;s judgement is that this business-as-usual reaction was as misguided as the
            panic had been.
          </p>
        </div>
        <div style={{ display: "grid", gap: "0.6rem", marginBottom: "2.5rem" }}>
          {gcHistory.map((h) => (
            <div key={h.period} className={styles.card} style={{ padding: "1rem 1.2rem" }}>
              <span className={styles.cardMeta}>{h.period}</span>
              <p className={styles.cardBody}>{h.what}</p>
            </div>
          ))}
        </div>

        {/* Legal */}
        <div className={styles.sectionHead}>
          <span className={`eyebrow eyebrow--rule ${styles.sectionEyebrow}`}>8 · Legal and ethical</span>
          <h2 className="h3">{legalNote.summary}</h2>
        </div>
        <div className={`${styles.grid} ${styles.grid2}`} style={{ marginBottom: "1.4rem" }}>
          {legalNote.points.map((p) => (
            <div key={p.heading} className={styles.card}>
              <h3 className={styles.cardTitle} style={{ fontSize: "1.1rem" }}>{p.heading}</h3>
              <p className={styles.cardBody}>{p.body}</p>
            </div>
          ))}
        </div>

        <div className={`${styles.callout} ${styles.calloutDark}`}>
          <span className={styles.calloutTitle}>Recommendation for DOM126</span>
          <div className={styles.calloutBody}>
            <p>
              Use these reconstructions as structural education. Learn how a family is built — the
              carnation pair, the mellis accord, the ambreine accord, the Hedione/patchouli
              relationship — and then compose an original fragrance in that family under your own
              name. That is both the legally clean route and the commercially stronger one: a house
              with its own accords has something to sell that a house selling other people&apos;s
              shapes does not, and it is the only route that survives the next round of IFRA
              revisions, because you own the structure rather than borrowing it.
            </p>
            <p>
              Practically: keep the vault private, do not publish brand names alongside formulas, and
              do not market anything as &ldquo;the same as&rdquo; a named designer fragrance. Work
              from the family, not from the product.
            </p>
          </div>
        </div>
      </div>

      <div className={`container-wide`} style={{ paddingBottom: "3rem" }}>
        <div className={styles.footerNote}>
          Sources. Perfumer-side workflow and the &ldquo;super blotter&rdquo; framing: R. R. Calkin
          &amp; J. S. Jellinek, <em>Perfumery: Practice and Principles</em> (Wiley, 1994), chs. 5, 7,
          9 and 12. Technique overview including headspace and SPME: J-C. Ellena,{" "}
          <em>Perfume: The Alchemy of Scent</em> (2011), ch. III §IV. Analytical studies as cited per
          entry above, including Mowery et al. in <em>J. Chem. Educ.</em> 81(1) 2004;{" "}
          <em>Micromachines</em> 14(3) 524, 2023; <em>Chemical Engineering Transactions</em> 54,
          2016; LECO and Agilent application notes; GC×GC-MS authentication work; Zenodo record
          3249821; HS-SPME skin profiling, 2018; OAV-based rose aroma reconstruction, 2026; and the
          USC Law School working paper on GC-MS and the fragrance industry. Regulatory thresholds
          from EU Regulation 1223/2009 as amended by Regulation (EU) 2023/1545, and from the IFRA
          Standards.
          <br />
          <br />
          Bench conditions are compiled from published methods and are a starting point, not a
          validated method for your instrument. Develop and validate against your own matrix.
          <br />
          <br />
          Next: build a trial against a target in the{" "}
          <Link href="/atlas/vault">formula vault</Link> and use the comparison tab — that is step 9
          of the workflow, and the only step that reliably improves a match.
        </div>
      </div>
    </>
  );
}
