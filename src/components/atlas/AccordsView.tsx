"use client";

import { useState } from "react";
import Link from "next/link";
import { accords, genericFloralMaterials } from "@/lib/perfumery/accords";
import { getMaterial } from "@/lib/perfumery/materials";
import type { Accord } from "@/lib/perfumery/types";
import styles from "./atlas.module.css";

const KINDS = [
  { id: "all", label: "All accords" },
  { id: "structural", label: "Structural" },
  { id: "modern", label: "Modern" },
  { id: "floral-base", label: "Floral bases" },
  { id: "fantasy", label: "Fantasy" },
  { id: "modifier", label: "Modifiers" },
] as const;

export default function AccordsView() {
  const [kind, setKind] = useState<(typeof KINDS)[number]["id"]>("all");
  const [openId, setOpenId] = useState<string | null>(accords[0]?.id ?? null);

  const shown = accords.filter((a) => kind === "all" || a.kind === kind);

  return (
    <>
      <header className={styles.head}>
        <div className={`container-wide ${styles.headInner}`}>
          <span className={`eyebrow eyebrow--rule ${styles.headEyebrow}`}>Accords &amp; bases</span>
          <h1 className={styles.headTitle}>Buildable starting formulas</h1>
          <p className={styles.headLead}>
            {accords.length} accords in parts per thousand, ready to load into the formula vault.
            The structural accords carry whole families; the floral bases are the building blocks
            that go inside them; the modifiers are used in trace to give finish. Each entry lists its
            permitted substitutions and says plainly where its architecture came from and where its
            proportions came from.
          </p>
        </div>
      </header>

      <div className={`container-wide ${styles.section}`}>
        <div className={`${styles.callout} ${styles.calloutDanger}`} style={{ marginBottom: "1.6rem" }}>
          <span className={styles.calloutTitle}>Read this before you weigh anything</span>
          <div className={styles.calloutBody}>
            <p>
              <strong>The proportions here are ours, not the sources&apos;.</strong> Calkin &amp;
              Jellinek deliberately publish their floral accords as &ldquo;compounding notes&rdquo; —
              a list of core materials plus permitted variants and modifiers, <em>without</em>{" "}
              quantities. That is a teaching choice and a good one: handing a student a finished
              proportion teaches them nothing about balancing. So the material architecture below
              comes from the books, and the parts are conventional starting proportions assembled
              for this Atlas. Treat every one of them as a first draft to be corrected by nose.
            </p>
            <p>
              Where a ratio genuinely <em>is</em> documented in the literature — the 4½:1 benzyl
              salicylate to eugenol at the heart of L&apos;Air du Temps, the 2:1:2:2 majors of Paloma
              Picasso — it is quoted in the accord&apos;s summary and attributed there.
            </p>
          </div>
        </div>

        {/* Method */}
        <div className={styles.card} style={{ marginBottom: "1.6rem" }}>
          <h3 className={styles.cardTitle}>The method for working on a base</h3>
          <ol className={styles.prose} style={{ paddingLeft: "1.2rem", listStyle: "decimal" }}>
            <li>
              <strong>Start as simple as possible</strong> — only enough materials to establish the
              essential character of the note. Bases intended as a major part of a perfume should
              usually contain no more than fifteen materials, and often fewer. More complicated
              bases, used that way or combined with other florals, are often the cause of
              &ldquo;muddiness&rdquo; and a general lack of impact in the final product.
            </li>
            <li>
              <strong>Balance the core, then embellish.</strong> Having arrived at your own preferred
              proportions within the accord, in keeping with the target type, experiment with other
              materials or alternatives from within the main categories — initially restricting
              yourself to a maximum of two or three from each. Be as adventurous as possible in the
              choice at this stage. Not every trial will succeed, but with imagination and courage
              interesting and original formulas result.
            </li>
            <li>
              <strong>Use characteristic materials in quantity.</strong> Many floral notes overlap in
              the materials they can be made from. The same eight materials — phenylethyl alcohol,
              hydroxycitronellal, benzyl acetate, phenylacetaldehyde, citronellol, hexyl cinnamic
              aldehyde, terpineol and indole — mixed in different proportions can produce a jasmine,
              a lilac, a muguet or a hyacinth. A base containing only such generally-used materials
              is liable to lose its identity and give a nondescript floral with little personality.
              Include as large a proportion of highly characteristic materials as possible, because
              those are what carry the note through into the finished product.
            </li>
            <li>
              <strong>Judge the base in composition, not alone.</strong> However pleasing and well
              balanced a base smells on its own, if it fails to hold together and perform in a
              composition it is of little value. Many hyacinth compounds are disappointing in
              exactly this respect, the fine floral character reducing to no more than a green
              effect once combined with other florals. The most successful accords seem virtually
              indestructible wherever they occur.
            </li>
            <li>
              <strong>Work with a limited set you know deeply.</strong> Most perfumers choose to work
              with only a limited number of bases whose performance they are thoroughly familiar
              with and understand. The exception is a base designed to duplicate the effect of a
              natural flower extract at lower price; those are often more complex, benefit from
              analysis, and are used as auxiliary products to bring naturalness rather than as part
              of the basic structure.
            </li>
          </ol>
          <p className={styles.hint}>
            It is not unusual to use an individual floral material as part of the main structure
            <em> and</em> back it up with a more complex base <em>and</em> a little of the natural
            flower product. Simplicity within the main structure, increasing complexity within the
            lesser components, is a principle worth returning to constantly.
          </p>
        </div>

        <div className={styles.pills} style={{ marginBottom: "1.2rem" }}>
          <span className={styles.label} style={{ alignSelf: "center" }}>The eight generic florals:</span>
          {genericFloralMaterials.map((id) => (
            <span key={id} className={styles.pill}>{getMaterial(id)?.name ?? id}</span>
          ))}
        </div>

        {/* Filters */}
        <div className={styles.toolbar}>
          {KINDS.map((k) => (
            <button
              key={k.id}
              className={`${styles.btn} ${styles.btnSmall} ${kind === k.id ? "" : styles.btnGhost}`}
              onClick={() => setKind(k.id)}
              aria-pressed={kind === k.id}
            >
              {k.label}
            </button>
          ))}
        </div>

        {/* Accord list */}
        <div style={{ display: "grid", gap: "0.8rem" }}>
          {shown.map((a) => (
            <AccordCard
              key={a.id}
              accord={a}
              open={openId === a.id}
              onToggle={() => setOpenId(openId === a.id ? null : a.id)}
            />
          ))}
        </div>
      </div>

      <div className={`container-wide`} style={{ paddingBottom: "3rem" }}>
        <div className={styles.footerNote}>
          <strong>On bases in general.</strong> A base may be as simple as an accord between three or
          four materials, or nearly as complicated as a complete perfume, and it should have a
          well-defined character because it is an essential structural element. Perfumers differ
          widely in how much they rely on them: some regard base-making as one of the most important
          aspects of their creative work and embody their most original ideas in them — Michel Hy
          told his students it could take him a year to make a good base, but once complete he could
          use it to make a perfume in a week. Others prefer &ldquo;open&rdquo; formulas, using bases
          only for special effects such as a green or fruity note; many modern perfumes appear to be
          constructed that way.
          <br />
          <br />
          Some of the most successful bases contain quite simple accords of only two or three
          materials dressed with auxiliary products. The combination of phenoxyethyl isobutyrate and
          dimethyl benzyl carbinyl acetate, used in many fruity notes, produces an unmistakable
          character that survives even at trace levels in a finished perfume. An ambergris base from
          a simple combination of labdanum, olibanum and vanilla brings an equally unmistakable
          effect. Bases are also the standard way of introducing intensely powerful materials that
          would be unacceptably harsh in isolation — many green notes fall into this category.
          <br />
          <br />
          One technique worth knowing for naturalness: <em>sur fleurs</em> products, where the
          compound is processed over the natural material — a neroli compound added to the flowers
          before distillation, or a jasmine distilled over the spent waxes after making the absolute
          from the floral concrete. The result has a naturalness the compound alone cannot reach.
          <br />
          <br />
          Sources: material architecture from R. R. Calkin &amp; J. S. Jellinek,{" "}
          <em>Perfumery: Practice and Principles</em> (Wiley, 1994) chs. 6, 9, 10 and 12, and from
          J-C. Ellena, <em>Perfume: The Alchemy of Scent</em> (2011) ch. IV. Proportions assembled
          for this Atlas.
        </div>
      </div>
    </>
  );
}

function AccordCard({ accord, open, onToggle }: { accord: Accord; open: boolean; onToggle: () => void }) {
  const total = accord.components.reduce((s, c) => s + c.parts, 0);
  const sorted = [...accord.components].sort((a, b) => b.parts - a.parts);

  return (
    <details className={styles.details} open={open} onToggle={onToggle} id={accord.id} style={{ scrollMarginTop: "5rem" }}>
      <summary className={styles.detailsSummary}>
        <span style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap", minWidth: 0 }}>
          <strong style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem" }}>{accord.name}</strong>
          <span className={`${styles.pill} ${styles.pillGold}`}>{accord.kind.replace("-", " ")}</span>
          <span className={styles.pill}>{accord.components.length} materials</span>
          <span className={styles.pill}>{total} parts</span>
        </span>
        <span className={styles.chevron} aria-hidden>▸</span>
      </summary>

      <div className={styles.detailsBody}>
        <p className={styles.cardBody}>{accord.summary}</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Material</th>
                <th scope="col" className={styles.num}>Parts</th>
                <th scope="col" className={styles.num}>%</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c) => {
                const m = getMaterial(c.materialId);
                return (
                  <tr key={c.materialId}>
                    <td>
                      <strong>{m?.name ?? c.materialId}</strong>
                      {m?.regulatory.status === "banned-eu-cosmetics" && (
                        <span className={`${styles.pill} ${styles.pillBlock}`} style={{ marginLeft: "0.5rem" }}>
                          prohibited in EU
                        </span>
                      )}
                    </td>
                    <td className={`${styles.num} ${styles.mono}`}>{c.parts}</td>
                    <td className={`${styles.num} ${styles.mono}`}>
                      {total > 0 ? ((c.parts / total) * 100).toFixed(1) : "0.0"}%
                    </td>
                    <td className={styles.hint} style={{ fontSize: "0.85rem" }}>{c.role}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {accord.variants.length > 0 && (
          <div>
            <span className={styles.label}>Variants and substitutions</span>
            <div className={styles.tableWrap} style={{ marginTop: "0.4rem" }}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Instead of</th>
                    <th scope="col">Use</th>
                    <th scope="col">Effect</th>
                  </tr>
                </thead>
                <tbody>
                  {accord.variants.map((v, i) => (
                    <tr key={i}>
                      <td className={styles.mono}>{v.insteadOf}</td>
                      <td>{v.use}</td>
                      <td className={styles.hint}>{v.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/atlas/vault" className={`${styles.btn} ${styles.btnSmall}`}>
            Open the vault to build this →
          </Link>
          <span className={styles.hint}>In the vault: &ldquo;Start from an accord…&rdquo;</span>
        </div>

        <p className={styles.sourceRef}>{accord.provenance}</p>
      </div>
    </details>
  );
}
