"use client";

import { useMemo, useState } from "react";
import { materials, originBreakdown } from "@/lib/perfumery/materials";
import { ellenaOdorFields } from "@/lib/perfumery/families";
import type { Material, OdorField, Volatility } from "@/lib/perfumery/types";
import styles from "./atlas.module.css";

const ORIGINS = ["all", "natural", "synthetic", "isolated", "base", "reconstructed-natural"] as const;
const VOLATILITIES = ["all", "top", "heart", "base"] as const;
const FIELDS = ["all", ...ellenaOdorFields.map((f) => f.id)] as const;

export default function MaterialsView() {
  const [q, setQ] = useState("");
  const [origin, setOrigin] = useState<(typeof ORIGINS)[number]>("all");
  const [vol, setVol] = useState<(typeof VOLATILITIES)[number]>("all");
  const [field, setField] = useState<(typeof FIELDS)[number]>("all");
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return materials.filter((m) => {
      if (origin !== "all" && m.origin !== origin) return false;
      if (vol !== "all" && m.volatility !== vol) return false;
      if (field !== "all" && m.family !== field) return false;
      if (flaggedOnly && !["restricted", "banned-eu-cosmetics", "restricted-ifra"].includes(m.regulatory.status))
        return false;
      if (!query) return true;
      return (
        m.name.toLowerCase().includes(query) ||
        (m.chemicalName?.toLowerCase().includes(query) ?? false) ||
        (m.cas?.includes(query) ?? false) ||
        m.facet.toLowerCase().includes(query) ||
        m.odor.toLowerCase().includes(query) ||
        m.usedFor.some((u) => u.toLowerCase().includes(query)) ||
        (m.notes?.toLowerCase().includes(query) ?? false)
      );
    });
  }, [q, origin, vol, field, flaggedOnly]);

  return (
    <>
      <header className={styles.head}>
        <div className={`container-wide ${styles.headInner}`}>
          <span className={`eyebrow eyebrow--rule ${styles.headEyebrow}`}>Materials</span>
          <h1 className={styles.headTitle}>The palette</h1>
          <p className={styles.headLead}>
            {materials.length} materials — {originBreakdown.natural ?? 0} naturals,{" "}
            {(originBreakdown.synthetic ?? 0) + (originBreakdown.isolated ?? 0)} synthetics and
            isolates, {originBreakdown.base ?? 0} compound bases. Each carries its origin,
            extraction route, odour field and facet, volatility class, typical use level, cost tier,
            CAS number, regulatory posture, what it pairs with and what it is used to build.
          </p>
        </div>
      </header>

      <div className={`container-wide ${styles.section}`}>
        {/* Filters */}
        <div className={styles.toolbar}>
          <input
            className={`${styles.input} ${styles.searchInput}`}
            type="search"
            placeholder="Search by name, chemical name, CAS, facet, odour or use…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search materials"
          />
          <select className={styles.select} value={origin} onChange={(e) => setOrigin(e.target.value as typeof origin)} aria-label="Origin">
            {ORIGINS.map((o) => (
              <option key={o} value={o}>{o === "all" ? "All origins" : o.replace("-", " ")}</option>
            ))}
          </select>
          <select className={styles.select} value={vol} onChange={(e) => setVol(e.target.value as typeof vol)} aria-label="Volatility">
            {VOLATILITIES.map((v) => (
              <option key={v} value={v}>{v === "all" ? "All layers" : v}</option>
            ))}
          </select>
          <select className={styles.select} value={field} onChange={(e) => setField(e.target.value as typeof field)} aria-label="Odour field">
            {FIELDS.map((f) => (
              <option key={f} value={f}>{f === "all" ? "All fields" : ellenaOdorFields.find((x) => x.id === f)?.name ?? f}</option>
            ))}
          </select>
          <label className={styles.hint} style={{ display: "flex", gap: "0.4rem", alignItems: "center", cursor: "pointer" }}>
            <input type="checkbox" checked={flaggedOnly} onChange={(e) => setFlaggedOnly(e.target.checked)} />
            Regulatory flags only
          </label>
        </div>

        <p className={styles.hint} style={{ marginBottom: "1.2rem" }}>
          Showing <strong>{results.length}</strong> of {materials.length} materials.
        </p>

        {/* Results */}
        <div style={{ display: "grid", gap: "0.5rem" }}>
          {results.map((m) => (
            <MaterialRow key={m.id} m={m} open={open === m.id} onToggle={() => setOpen(open === m.id ? null : m.id)} />
          ))}
          {results.length === 0 && (
            <div className={styles.empty}>
              <strong>No materials match those filters.</strong>
              <span className={styles.hint}>Try clearing a filter or searching a broader term.</span>
            </div>
          )}
        </div>
      </div>

      <div className={`container-wide`} style={{ paddingBottom: "3rem" }}>
        <div className={styles.footerNote}>
          <strong>On the natural / synthetic divide.</strong> It is far less clear-cut than it looks.
          Geraniol of defined chemical structure may be extracted from palmarosa oil or produced
          synthetically from pinene; rigorous purification from either route gives the same pure
          substance, distinguishable only by sophisticated analysis. But <em>perfumery-grade</em>{" "}
          material from the two routes smells different, because neither is chemically pure: the
          natural grade carries trace materials from its source, while the synthetic grade is a
          reaction mixture often containing a large proportion of nerol and other substances not
          found in the natural product. Either can be acetylated to geranyl acetate, which is then
          synthetic in both cases — and the two grades of acetate differ just as much as the two
          geraniols did. Many naturals are also fractionated and chemically treated to produce
          derivatives of very complex composition that behave, for the perfumer&apos;s purposes, as
          naturals. And naturals are frequently &ldquo;cut&rdquo; with synthetics, either to
          standardise between crops or simply to reduce cost.
          <br />
          <br />
          One of the better consequences of GC-based quality control is that a purchaser can now know
          to what extent a so-called natural material is pure — which is why genuinely reliable
          essential oils, absolutes and resinoids are available again. Young perfumers should begin
          with pure natural products and high-quality synthetics, and learn how different qualities
          of a given material perform, before moving on to commercial grades.
          <br />
          <br />
          <strong>Cost.</strong> The cost tier is a relative indicator, not a price. For scale: the
          average cost of a synthetic aroma chemical was around $42/kg in 2011, against roughly
          $4,675/kg for synthetic irone. Cost is driven mainly by the number of synthesis steps and
          by specialised labour, only partly by the price of the starting material.
        </div>
      </div>
    </>
  );
}

function MaterialRow({ m, open, onToggle }: { m: Material; open: boolean; onToggle: () => void }) {
  const flag = m.regulatory.status;
  return (
    <details className={styles.details} open={open} onToggle={onToggle}>
      <summary className={styles.detailsSummary}>
        <span style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap", minWidth: 0 }}>
          <strong>{m.name}</strong>
          {m.chemicalName && <span className={`${styles.hint} ${styles.mono}`}>{m.chemicalName}</span>}
          <span className={`${styles.pill} ${layerPill(m.volatility)}`}>{m.volatility}</span>
          <span className={styles.pill}>{m.origin.replace("-", " ")}</span>
          {flag !== "ok" && (
            <span
              className={`${styles.pill} ${
                flag === "banned-eu-cosmetics" ? styles.pillBlock : flag === "restricted" || flag === "restricted-ifra" ? styles.pillWarn : styles.pillInfo
              }`}
            >
              {flag.replace(/-/g, " ")}
            </span>
          )}
        </span>
        <span className={styles.chevron} aria-hidden>▸</span>
      </summary>
      <div className={styles.detailsBody}>
        <p className={styles.cardBody}>{m.odor}</p>

        <div className={styles.pills}>
          <span className={styles.pill}>{fieldLabel(m.family)}</span>
          <span className={`${styles.pill} ${styles.pillGold}`}>{m.facet}</span>
          <span className={styles.pill}>tenacity: {m.tenacity}</span>
          <span className={styles.pill}>use {m.typicalUse[0]}–{m.typicalUse[1]}%</span>
          <span className={styles.pill}>cost {"◆".repeat(m.costTier)}{"◇".repeat(5 - m.costTier)}</span>
          {m.cas && <span className={`${styles.pill} ${styles.mono}`}>CAS {m.cas}</span>}
          {m.yearIntroduced && <span className={styles.pill}>from {m.yearIntroduced}</span>}
          {typeof m.vaporPressure === "number" && <span className={`${styles.pill} ${styles.mono}`}>VP {m.vaporPressure} µ @20 °C</span>}
          {typeof m.waterSolubility === "number" && <span className={`${styles.pill} ${styles.mono}`}>sol. {m.waterSolubility} ppm</span>}
        </div>

        {m.regulatory.note && (
          <div className={`${styles.callout} ${flag === "banned-eu-cosmetics" || flag === "restricted" ? styles.calloutDanger : ""}`}>
            <span className={styles.calloutTitle}>Regulatory</span>
            <div className={styles.calloutBody}>{m.regulatory.note}</div>
          </div>
        )}

        <div className={`${styles.grid} ${styles.grid2}`}>
          <div>
            <span className={styles.label}>Used for</span>
            <div className={styles.pills} style={{ marginTop: "0.4rem" }}>
              {m.usedFor.map((u) => <span key={u} className={styles.pill}>{u}</span>)}
            </div>
          </div>
          <div>
            <span className={styles.label}>Pairs well with</span>
            <div className={styles.pills} style={{ marginTop: "0.4rem" }}>
              {m.pairsWith.map((p) => <span key={p} className={`${styles.pill} ${styles.pillGold}`}>{p}</span>)}
            </div>
          </div>
        </div>

        {(m.source || m.extraction) && (
          <p className={styles.hint}>
            {m.source && <><strong>Source:</strong> {m.source}. </>}
            {m.extraction && <><strong>Obtained by:</strong> {m.extraction.replace(/-/g, " ")}.</>}
          </p>
        )}
        {m.notes && <p className={styles.cardBody}><strong>Notes.</strong> {m.notes}</p>}
      </div>
    </details>
  );
}

function layerPill(v: Volatility) {
  if (v === "top") return styles.pillTop;
  if (v === "heart") return styles.pillHeart;
  return styles.pillBase;
}

function fieldLabel(f: OdorField) {
  return ellenaOdorFields.find((x) => x.id === f)?.name ?? f;
}
