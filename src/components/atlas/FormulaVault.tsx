"use client";

/**
 * DOM126 Perfumery Atlas — Formula Vault.
 *
 * The working app. Stores formulas on the perfumer's own device, retrieves
 * them on demand, and turns a stored formula into something that can
 * actually be compounded: batch weights, dilution maths, layer balance,
 * allergen declarations, compliance flags, craft diagnostics, comparison
 * against another formula, and a printable sheet.
 *
 * All calculation lives in `@/lib/perfumery/formula` (pure, storage-free).
 * All persistence lives in `@/components/atlas/VaultProvider`.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { useVault } from "@/components/atlas/VaultProvider";
import { materials, getMaterial } from "@/lib/perfumery/materials";
import { accords } from "@/lib/perfumery/accords";
import { reconstructions } from "@/lib/perfumery/classics";
import { concentrations, families } from "@/lib/perfumery/families";
import {
  computeAllergens,
  computeCompliance,
  computeFormula,
  compareFormulas,
  diagnose,
  dilutionAdvice,
  formulaFromAccord,
  formulaFromReconstruction,
  formulaToText,
  interpretSimilarity,
  nextDose,
  normaliseTo1000,
  round,
} from "@/lib/perfumery/formula";
import type { ConcentrationClass, Formula } from "@/lib/perfumery/types";
import styles from "@/app/atlas/atlas.module.css";

type Tab = "edit" | "batch" | "check" | "compare" | "export";

export default function FormulaVault() {
  const vault = useVault();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("edit");
  const [query, setQuery] = useState("");
  const [batchGrams, setBatchGrams] = useState(50);
  const [concentration, setConcentration] = useState<number | null>(null);
  const [compareId, setCompareId] = useState<string>("");
  const [filter, setFilter] = useState("");
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Pick the most recently updated formula once storage has been read.
  useEffect(() => {
    if (!vault.ready || selectedId) return;
    const first = [...vault.formulas].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
    if (first) setSelectedId(first.id);
  }, [vault.ready, vault.formulas, selectedId]);

  const selected = selectedId ? vault.get(selectedId) : undefined;

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return vault.formulas;
    return vault.formulas.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.brief.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [vault.formulas, filter]);

  const totals = useMemo(
    () =>
      selected
        ? computeFormula(selected, {
            batchGrams,
            concentrationPercent: concentration ?? undefined,
          })
        : null,
    [selected, batchGrams, concentration],
  );

  const flags = useMemo(() => (selected ? computeCompliance(selected) : []), [selected]);
  const allergens = useMemo(
    () => (selected ? computeAllergens(selected, concentration ?? undefined) : []),
    [selected, concentration],
  );
  const diagnoses = useMemo(() => (selected ? diagnose(selected) : []), [selected]);

  const comparison = useMemo(() => {
    if (!selected || !compareId || compareId === selected.id) return null;
    const other = vault.get(compareId);
    return other ? { other, result: compareFormulas(selected, other) } : null;
  }, [selected, compareId, vault]);

  const sheet = useMemo(() => (selected ? formulaToText(selected, batchGrams) : ""), [selected, batchGrams]);

  function handleCreate() {
    const f = vault.create("New formula");
    setSelectedId(f.id);
    setTab("edit");
  }

  function handleFromAccord(accordId: string) {
    const accord = accords.find((a) => a.id === accordId);
    if (!accord) return;
    const f = formulaFromAccord(accord);
    vault.save(f);
    setSelectedId(f.id);
    setTab("edit");
  }

  function handleFromClassic(recId: string) {
    const rec = reconstructions.find((r) => r.id === recId);
    if (!rec) return;
    const f = formulaFromReconstruction(rec);
    vault.save(f);
    setSelectedId(f.id);
    setTab("check");
  }

  function handleCopy() {
    if (!sheet) return;
    navigator.clipboard
      ?.writeText(sheet)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => setCopied(false));
  }

  function handleDownload(kind: "json" | "txt") {
    if (kind === "json") {
      download(vault.exportJson(), "dom126-formula-vault.json", "application/json");
    } else if (sheet) {
      download(sheet, `${(selected?.name ?? "formula").replace(/\W+/g, "-").toLowerCase()}.txt`, "text/plain");
    }
  }

  function handleImportFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const res = vault.importJson(String(reader.result ?? ""));
      if (res.error) window.alert(res.error);
    };
    reader.readAsText(file);
  }

  const blocking = flags.filter((f) => f.level === "block").length;
  const warning = flags.filter((f) => f.level === "warn").length;

  return (
    <div className={`container-wide ${styles.section}`}>
      {/* ---------------- Toolbar ---------------- */}
      <div className={styles.toolbar}>
        <button className={styles.btn} onClick={handleCreate}>
          New formula
        </button>

        <select
          className={styles.select}
          style={{ maxWidth: "16rem" }}
          value=""
          onChange={(e) => e.target.value && handleFromAccord(e.target.value)}
          aria-label="Start from an accord"
        >
          <option value="">Start from an accord…</option>
          {accords.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          style={{ maxWidth: "18rem" }}
          value=""
          onChange={(e) => e.target.value && handleFromClassic(e.target.value)}
          aria-label="Start from a classic study"
        >
          <option value="">Start from a classic study…</option>
          {reconstructions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.perfume} ({r.year}) — {r.house}
            </option>
          ))}
        </select>

        <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => fileRef.current?.click()}>
          Import JSON
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleImportFile(f);
            e.target.value = "";
          }}
        />
        <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => handleDownload("json")}>
          Back up all
        </button>
      </div>

      {vault.error && (
        <div className={`${styles.callout} ${styles.calloutDanger}`} role="alert">
          <span className={styles.calloutTitle}>Storage problem</span>
          <div className={styles.calloutBody}>{vault.error}</div>
        </div>
      )}

      {!vault.ready ? (
        <div className={styles.empty}>Loading your vault…</div>
      ) : (
        <div className={styles.split} style={{ marginTop: "1.4rem" }}>
          {/* ---------------- Formula list ---------------- */}
          <aside className={styles.splitSticky}>
            <div className={styles.field} style={{ marginBottom: "0.7rem" }}>
              <input
                className={styles.input}
                type="search"
                placeholder="Filter formulas…"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                aria-label="Filter saved formulas"
              />
            </div>

            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <strong>No formulas saved yet.</strong>
                <span className={styles.hint}>
                  Create one, start from an accord, or load a classic study to see how a
                  documented structure is built.
                </span>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "0.45rem" }}>
                {filtered.map((f) => {
                  const active = f.id === selectedId;
                  const count = f.lines.filter((l) => l.parts > 0).length;
                  return (
                    <button
                      key={f.id}
                      className={`${styles.listItem} ${active ? styles.listItemActive : ""}`}
                      onClick={() => setSelectedId(f.id)}
                      aria-pressed={active}
                    >
                      <span className={styles.listItemName}>{f.name}</span>
                      <span className={styles.listItemMeta}>
                        v{f.version} · {count} material{count === 1 ? "" : "s"} ·{" "}
                        {f.updatedAt.slice(0, 10)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            <p className={styles.hint} style={{ marginTop: "1rem" }}>
              Formulas are stored only in this browser. Use <strong>Back up all</strong> before
              clearing site data or switching devices.
            </p>
          </aside>

          {/* ---------------- Detail ---------------- */}
          <div>
            {!selected ? (
              <div className={styles.empty}>
                <strong>Select a formula</strong>
                <span className={styles.hint}>Choose one from the list, or create a new one.</span>
              </div>
            ) : (
              <>
                <header style={{ display: "grid", gap: "0.8rem", marginBottom: "1.2rem" }}>
                  <input
                    className={styles.input}
                    style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 500 }}
                    value={selected.name}
                    onChange={(e) => vault.save({ ...selected, name: e.target.value })}
                    aria-label="Formula name"
                  />
                  <textarea
                    className={styles.textarea}
                    style={{ minHeight: "4rem" }}
                    placeholder="Brief — what is this composition meant to do?"
                    value={selected.brief}
                    onChange={(e) => vault.save({ ...selected, brief: e.target.value })}
                  />
                  <div className={styles.toolbar} style={{ marginBottom: 0 }}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="conc">Strength</label>
                      <select
                        id="conc"
                        className={styles.select}
                        value={selected.concentration ?? "eau-de-parfum"}
                        onChange={(e) => {
                          const id = e.target.value as ConcentrationClass;
                          const c = concentrations.find((x) => x.id === id);
                          vault.save({ ...selected, concentration: id });
                          setConcentration(c?.typical ?? null);
                        }}
                      >
                        {concentrations.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label} ({c.min}–{c.max}%)
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="batch">Finished batch (g)</label>
                      <input
                        id="batch"
                        className={styles.input}
                        type="number"
                        min={1}
                        step={1}
                        value={batchGrams}
                        onChange={(e) => setBatchGrams(Math.max(1, Number(e.target.value) || 1))}
                        style={{ width: "8rem" }}
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="cpct">Concentrate %</label>
                      <input
                        id="cpct"
                        className={styles.input}
                        type="number"
                        min={1}
                        max={40}
                        step={0.5}
                        value={concentration ?? totals?.batch.concentrationPercent ?? 15}
                        onChange={(e) => setConcentration(Number(e.target.value))}
                        style={{ width: "8rem" }}
                      />
                    </div>
                    <div className={styles.field} style={{ justifyContent: "flex-end" }}>
                      <button
                        className={`${styles.btn} ${styles.btnGhost} ${styles.btnSmall}`}
                        onClick={() => vault.duplicate(selected.id)}
                      >
                        Duplicate
                      </button>
                    </div>
                    <div className={styles.field} style={{ justifyContent: "flex-end" }}>
                      <button
                        className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`}
                        onClick={() => {
                          if (window.confirm(`Delete "${selected.name}"? This cannot be undone.`)) {
                            vault.remove(selected.id);
                            setSelectedId(null);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </header>

                {/* Tabs */}
                <div className={styles.toolbar} style={{ marginBottom: "1rem" }}>
                  {(
                    [
                      ["edit", "Formula"],
                      ["batch", "Batch & weights"],
                      ["check", `Checks${blocking || warning ? ` (${blocking + warning})` : ""}`],
                      ["compare", "Compare"],
                      ["export", "Sheet & data"],
                    ] as [Tab, string][]
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      className={`${styles.btn} ${styles.btnSmall} ${tab === id ? "" : `${styles.btnGhost}`}`}
                      onClick={() => setTab(id)}
                      aria-pressed={tab === id}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {tab === "edit" && (
                  <EditorTab
                    formula={selected}
                    query={query}
                    setQuery={setQuery}
                    vault={vault}
                  />
                )}
                {tab === "batch" && totals && (
                  <BatchTab formula={selected} totals={totals} />
                )}
                {tab === "check" && (
                  <CheckTab flags={flags} diagnoses={diagnoses} allergens={allergens} />
                )}
                {tab === "compare" && (
                  <CompareTab
                    vault={vault}
                    selected={selected}
                    compareId={compareId}
                    setCompareId={setCompareId}
                    comparison={comparison}
                  />
                )}
                {tab === "export" && (
                  <ExportTab
                    sheet={sheet}
                    onCopy={handleCopy}
                    copied={copied}
                    onDownloadTxt={() => handleDownload("txt")}
                    formula={selected}
                    vault={vault}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/* Editor                                                              */
/* ================================================================== */

function EditorTab({
  formula,
  query,
  setQuery,
  vault,
}: {
  formula: Formula;
  query: string;
  setQuery: (s: string) => void;
  vault: ReturnType<typeof useVault>;
}) {
  const [pending, setPending] = useState("");

  const matches = useMemo(() => {
    const q = (query || pending).trim().toLowerCase();
    if (!q) return [];
    return materials
      .filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.chemicalName?.toLowerCase().includes(q) ||
          m.facet.toLowerCase().includes(q) ||
          m.odor.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query, pending]);

  const total = formula.lines.reduce((s, l) => s + (l.parts || 0), 0);
  const sorted = [...formula.lines].sort((a, b) => b.parts - a.parts);

  function addMaterial(id: string) {
    vault.addLine(formula.id, { materialId: id, parts: 10 });
    setQuery("");
    setPending("");
  }

  return (
    <div style={{ display: "grid", gap: "1.2rem" }}>
      <div className={styles.card}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="mat-search">
            Add a material
          </label>
          <input
            id="mat-search"
            className={styles.input}
            placeholder={`Search ${materials.length} materials — by name, facet or odour…`}
            value={pending}
            onChange={(e) => setPending(e.target.value)}
            list="atlas-materials"
          />
          <datalist id="atlas-materials">
            {materials.map((m) => (
              <option key={m.id} value={m.name} />
            ))}
          </datalist>
        </div>

        {matches.length > 0 && (
          <div style={{ display: "grid", gap: "0.35rem" }}>
            {matches.map((m) => (
              <button
                key={m.id}
                className={styles.listItem}
                onClick={() => addMaterial(m.id)}
                type="button"
              >
                <span className={styles.listItemName}>{m.name}</span>
                <span className={styles.listItemMeta}>
                  {m.origin} · {m.facet} · {m.volatility} — {m.odor.slice(0, 90)}…
                </span>
              </button>
            ))}
          </div>
        )}

        <div className={styles.toolbar} style={{ marginBottom: 0 }}>
          <button className={`${styles.btn} ${styles.btnGhost} ${styles.btnSmall}`} onClick={() => vault.addLine(formula.id, { parts: 0 })}>
            Add blank line
          </button>
          <button
            className={`${styles.btn} ${styles.btnGhost} ${styles.btnSmall}`}
            onClick={() => vault.save(normaliseTo1000(formula))}
            disabled={total <= 0}
          >
            Normalise to 1000 parts
          </button>
          <span className={styles.hint}>
            Total: <strong>{round(total, 1)}</strong> parts
            {total > 0 && ` — each part ≈ ${round(100 / total, 3)}% of the concentrate`}
          </span>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className={styles.empty}>
          <strong>No materials yet.</strong>
          <span className={styles.hint}>Search above to add your first material.</span>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
              Formula lines
            </caption>
            <thead>
              <tr>
                <th scope="col">Material</th>
                <th scope="col" className={styles.num}>Parts</th>
                <th scope="col" className={styles.num}>%</th>
                <th scope="col">Layer</th>
                <th scope="col">Step</th>
                <th scope="col">
                  <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Remove</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((line) => {
                const m = line.materialId ? getMaterial(line.materialId) : undefined;
                const pct = total > 0 ? (line.parts / total) * 100 : 0;
                const unknown = line.materialId && !m;
                return (
                  <tr key={line.id}>
                    <td>
                      {m ? (
                        <div style={{ display: "grid", gap: "0.15rem" }}>
                          <strong>{m.name}</strong>
                          <span className={styles.hint} style={{ fontSize: "0.78rem" }}>
                            {m.facet} · {m.origin}
                            {m.regulatory.status === "banned-eu-cosmetics" && " · PROHIBITED in EU cosmetics"}
                          </span>
                        </div>
                      ) : (
                        <input
                          className={styles.input}
                          placeholder="Material name or id…"
                          value={unknown ? line.materialId.replace(/^unknown:/, "") : ""}
                          onChange={(e) =>
                            vault.updateLine(formula.id, line.id, {
                              materialId: e.target.value
                                ? `unknown:${e.target.value.toLowerCase().replace(/\s+/g, "-")}`
                                : "",
                            })
                          }
                        />
                      )}
                    </td>
                    <td className={styles.num}>
                      <input
                        className={styles.input}
                        type="number"
                        min={0}
                        step={1}
                        value={line.parts}
                        onChange={(e) =>
                          vault.updateLine(formula.id, line.id, { parts: Math.max(0, Number(e.target.value) || 0) })
                        }
                        style={{ width: "6rem", textAlign: "right" }}
                        aria-label={`Parts of ${m?.name ?? "material"}`}
                      />
                    </td>
                    <td className={`${styles.num} ${styles.mono}`}>{pct.toFixed(2)}%</td>
                    <td>
                      {m && (
                        <span className={`${styles.pill} ${layerPill(m.volatility)}`}>{m.volatility}</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "0.25rem" }}>
                        <button
                          className={`${styles.btn} ${styles.btnGhost} ${styles.btnSmall}`}
                          onClick={() => vault.updateLine(formula.id, line.id, { parts: nextDose(line.parts, "up") })}
                          aria-label={`Increase ${m?.name ?? "material"}`}
                        >
                          ↑
                        </button>
                        <button
                          className={`${styles.btn} ${styles.btnGhost} ${styles.btnSmall}`}
                          onClick={() => vault.updateLine(formula.id, line.id, { parts: nextDose(line.parts, "down") })}
                          aria-label={`Decrease ${m?.name ?? "material"}`}
                        >
                          ↓
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`}
                        onClick={() => vault.removeLine(formula.id, line.id)}
                        aria-label={`Remove ${m?.name ?? "line"}`}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className={styles.hint}>
        The ↑ / ↓ buttons step a material along the perfumer&apos;s dose ladder (1, 2, 3, 5, 7, 10,
        15, 20, 30, 50, 70, 100, 150, 200, 300…). The discipline behind it: if you change a
        proportion by less than a factor of two, you probably will not smell the difference — so
        the change only adds noise to your record.
      </p>
    </div>
  );
}

/* ================================================================== */
/* Batch                                                               */
/* ================================================================== */

function BatchTab({ formula, totals }: { formula: Formula; totals: ReturnType<typeof computeFormula> }) {
  const b = totals.batch;
  const rows = totals.lines.filter((l) => l.parts > 0).sort((a, x) => x.grams - a.grams);

  return (
    <div style={{ display: "grid", gap: "1.2rem" }}>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{b.concentrateGrams.toFixed(2)} g</span>
          <span className={styles.statLabel}>Fragrance concentrate</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{b.alcoholGrams.toFixed(2)} g</span>
          <span className={styles.statLabel}>Perfumer&apos;s alcohol</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{b.concentrationPercent.toFixed(1)}%</span>
          <span className={styles.statLabel}>Concentration</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{b.totalGrams.toFixed(0)} g</span>
          <span className={styles.statLabel}>Finished product</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{rows.length}</span>
          <span className={styles.statLabel}>Materials to weigh</span>
        </div>
      </div>

      {/* Volatility balance */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Layer balance</h3>
        <div className={styles.layerBar} role="img" aria-label={`Top ${totals.byVolatilityPercent.top.toFixed(0)} percent, heart ${totals.byVolatilityPercent.heart.toFixed(0)} percent, base ${totals.byVolatilityPercent.base.toFixed(0)} percent`}>
          <div className={styles.layerTop} style={{ width: `${totals.byVolatilityPercent.top}%` }} />
          <div className={styles.layerHeart} style={{ width: `${totals.byVolatilityPercent.heart}%` }} />
          <div className={styles.layerBase} style={{ width: `${totals.byVolatilityPercent.base}%` }} />
          <div className={styles.layerUnknown} style={{ width: `${totals.byVolatilityPercent.unknown}%` }} />
        </div>
        <div className={styles.layerLegend}>
          <span><i className={styles.dot} style={{ background: "#7f9dc4" }} /> Top {totals.byVolatilityPercent.top.toFixed(1)}%</span>
          <span><i className={styles.dot} style={{ background: "var(--gold)" }} /> Heart {totals.byVolatilityPercent.heart.toFixed(1)}%</span>
          <span><i className={styles.dot} style={{ background: "var(--navy-800)" }} /> Base {totals.byVolatilityPercent.base.toFixed(1)}%</span>
          {totals.byVolatilityPercent.unknown > 0 && (
            <span><i className={styles.dot} style={{ background: "#cfc9bc" }} /> Unmatched {totals.byVolatilityPercent.unknown.toFixed(1)}%</span>
          )}
        </div>
        <p className={styles.hint}>
          The heart of a fine fragrance needs to sit in the lower part of the composition, because
          that is what remains on skin for hours. Many base materials smell unpleasant neat —
          rounding them off is what the modifiers and top notes are for.
        </p>
      </div>

      {/* Weighing sheet */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Material</th>
              <th scope="col" className={styles.num}>% of concentrate</th>
              <th scope="col" className={styles.num}>Weigh (g)</th>
              <th scope="col">Weighing advice</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((l) => (
              <tr key={l.line.id}>
                <td>{l.material?.name ?? l.line.materialId}</td>
                <td className={`${styles.num} ${styles.mono}`}>{l.percentOfConcentrate.toFixed(3)}%</td>
                <td className={`${styles.num} ${styles.mono}`}>
                  <strong>{l.grams < 0.01 ? l.grams.toFixed(4) : l.grams.toFixed(3)}</strong>
                </td>
                <td>
                  <span className={styles.hint} style={{ fontSize: "0.8rem" }}>
                    {dilutionAdvice(l.grams)}
                  </span>
                </td>
              </tr>
            ))}
            <tr>
              <td><strong>Concentrate total</strong></td>
              <td className={styles.num}>100%</td>
              <td className={`${styles.num} ${styles.mono}`}><strong>{b.concentrateGrams.toFixed(3)}</strong></td>
              <td />
            </tr>
            <tr>
              <td><strong>Perfumer&apos;s alcohol (96% ethanol, denatured for cosmetics)</strong></td>
              <td className={styles.num}>—</td>
              <td className={`${styles.num} ${styles.mono}`}><strong>{b.alcoholGrams.toFixed(3)}</strong></td>
              <td><span className={styles.hint} style={{ fontSize: "0.8rem" }}>Add to the concentrate, not the reverse.</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.callout}>
        <span className={styles.calloutTitle}>Compounding sequence</span>
        <div className={styles.calloutBody}>
          <p>
            <strong>1.</strong> Weigh the concentrate into a glass beaker, adding the least volatile
            materials first and the most volatile last. Weigh each material into the same vessel —
            do not pre-mix in separate containers and combine, because the traces left behind are a
            meaningful proportion of your smallest doses.
          </p>
          <p>
            <strong>2.</strong> Pre-dilute anything below about 0.05 g. A 0.05 g target on a 0.01 g
            balance carries a possible ±20% error, which is larger than the adjustment you are
            trying to make. Dilute 10% or 1% in benzyl benzoate, DPG or alcohol and weigh the
            dilution.
          </p>
          <p>
            <strong>3.</strong> Stir the concentrate, then add the alcohol. Add concentrate to
            alcohol only if you are working at very low concentration.
          </p>
          <p>
            <strong>4.</strong> Mature. Two to four weeks cool and dark is conventional; aldehydic
            compositions need longer, because the aldehydes have to &ldquo;go in&rdquo; through
            forming their hemi-acetals before the perfume can be judged at all. Do not evaluate an
            aldehydic formula on day one.
          </p>
          <p>
            <strong>5.</strong> Chill and filter if you are adding any water. Water can cloud a
            hydroalcoholic perfume; add it dropwise after maturation and check clarity after 24 h.
          </p>
          <p>
            <strong>6.</strong> Evaluate on blotters at 15 minutes, 2 hours, 8 hours and 24 hours —
            and on skin, because the same composition behaves differently on different people.
            Record what you find in the trial log.
          </p>
        </div>
      </div>

      <p className={styles.sourceRef}>
        Formula: {formula.name}, version {formula.version}, last edited{" "}
        {new Date(formula.updatedAt).toLocaleString()}.
      </p>
    </div>
  );
}

/* ================================================================== */
/* Checks                                                              */
/* ================================================================== */

function CheckTab({
  flags,
  diagnoses,
  allergens,
}: {
  flags: ReturnType<typeof computeCompliance>;
  diagnoses: ReturnType<typeof diagnose>;
  allergens: ReturnType<typeof computeAllergens>;
}) {
  const declaring = allergens.filter((a) => a.mustDeclare);

  return (
    <div style={{ display: "grid", gap: "1.4rem" }}>
      <div className={`${styles.callout} ${styles.calloutDanger}`}>
        <span className={styles.calloutTitle}>This is not a compliance check</span>
        <div className={styles.calloutBody}>
          <p>
            Everything on this page is a study aid built from public regulatory summaries. Before
            you sell anything, verify against the current <strong>IFRA Standards</strong> for your
            specific product category, the current <strong>EU Regulation 1223/2009</strong> annexes
            (as amended by Regulation (EU) 2023/1545), and the requirements of whatever market you
            are selling into. Get supplier allergen declarations for every natural, and have the
            finished product tested. Limits change, and product category changes the limit.
          </p>
        </div>
      </div>

      {/* Regulatory flags */}
      <section>
        <h3 className={styles.cardTitle} style={{ marginBottom: "0.8rem" }}>
          Regulatory flags ({flags.length})
        </h3>
        {flags.length === 0 ? (
          <p className={styles.hint}>No materials in this formula carry a regulatory flag in the reference data.</p>
        ) : (
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {flags.map((f, i) => (
              <div key={`${f.materialId}-${i}`} className={styles.card} style={{ padding: "0.9rem 1.1rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                  <span className={`${styles.pill} ${f.level === "block" ? styles.pillBlock : f.level === "warn" ? styles.pillWarn : styles.pillInfo}`}>
                    {f.level === "block" ? "Blocking" : f.level === "warn" ? "Check" : "Note"}
                  </span>
                  <strong>{f.name}</strong>
                </div>
                <span className={styles.cardBody}>{f.message}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Craft diagnostics */}
      <section>
        <h3 className={styles.cardTitle} style={{ marginBottom: "0.8rem" }}>
          Composition diagnostics ({diagnoses.length})
        </h3>
        {diagnoses.length === 0 ? (
          <p className={styles.hint}>Nothing to report.</p>
        ) : (
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {diagnoses.map((d) => (
              <div key={d.id} className={styles.card} style={{ padding: "0.9rem 1.1rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span className={`${styles.pill} ${d.severity === "warn" ? styles.pillWarn : d.severity === "good" ? styles.pillGood : styles.pillInfo}`}>
                    {d.severity === "warn" ? "Consider" : d.severity === "good" ? "Good" : "Note"}
                  </span>
                </div>
                <span className={styles.cardBody}>{d.message}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Allergens */}
      <section>
        <h3 className={styles.cardTitle} style={{ marginBottom: "0.8rem" }}>
          EU declarable allergens ({declaring.length} above threshold)
        </h3>
        {declaring.length === 0 ? (
          <p className={styles.hint}>
            No <em>named</em> material exceeds the 0.001% leave-on threshold at this dilution. See
            the caveat below — naturals contribute allergens that are not counted here.
          </p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Allergen</th>
                  <th scope="col">CAS</th>
                  <th scope="col" className={styles.num}>% of finished product</th>
                  <th scope="col" className={styles.num}>Threshold</th>
                  <th scope="col">Declare?</th>
                </tr>
              </thead>
              <tbody>
                {declaring.map((a) => (
                  <tr key={a.materialId}>
                    <td>{a.name}</td>
                    <td className={styles.mono}>{a.cas ?? "—"}</td>
                    <td className={`${styles.num} ${styles.mono}`}>{a.percentOfFinished.toFixed(4)}%</td>
                    <td className={`${styles.num} ${styles.mono}`}>{a.threshold}%</td>
                    <td><span className={`${styles.pill} ${styles.pillWarn}`}>Yes</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className={styles.hint} style={{ marginTop: "0.7rem" }}>
          <strong>Understated by design.</strong> This table counts only materials you added by
          name. Bergamot oil contributes linalool, limonene and linalyl acetate; lavender contributes
          linalool and linalyl acetate; rose absolute contributes citronellol and geraniol — none of
          which appear as separate lines. The true allergen load of any formula containing naturals
          is higher than shown. Obtain the supplier declaration for each natural, or have the
          finished product analysed by GC-MS.
        </p>
        <p className={styles.hint}>
          Thresholds: 0.001% (10 ppm) in leave-on products, 0.01% (100 ppm) in rinse-off. The
          original list ran to 26 substances; Regulation (EU) 2023/1545 expanded individual
          disclosure to roughly 80 entries, applying to products placed on the EU market from
          31 July 2026 with sell-through to 31 July 2028.
        </p>
      </section>
    </div>
  );
}

/* ================================================================== */
/* Compare                                                             */
/* ================================================================== */

function CompareTab({
  vault,
  selected,
  compareId,
  setCompareId,
  comparison,
}: {
  vault: ReturnType<typeof useVault>;
  selected: Formula;
  compareId: string;
  setCompareId: (s: string) => void;
  comparison: { other: Formula; result: ReturnType<typeof compareFormulas> } | null;
}) {
  return (
    <div style={{ display: "grid", gap: "1.2rem" }}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="cmp">Compare against</label>
        <select
          id="cmp"
          className={styles.select}
          value={compareId}
          onChange={(e) => setCompareId(e.target.value)}
        >
          <option value="">Choose another saved formula…</option>
          {vault.formulas
            .filter((f) => f.id !== selected.id)
            .map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} (v{f.version})
              </option>
            ))}
        </select>
      </div>

      {!comparison ? (
        <div className={styles.empty}>
          <strong>Nothing to compare yet.</strong>
          <span className={styles.hint}>
            Save two formulas — for example a target study and your trial rebuild — then compare
            them here. This is the iteration loop from the reverse-engineering workflow: overlay
            trial against target, read the gaps, adjust.
          </span>
        </div>
      ) : (
        <>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{(comparison.result.similarity * 100).toFixed(1)}%</span>
              <span className={styles.statLabel}>Structural similarity</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{comparison.result.shared.length}</span>
              <span className={styles.statLabel}>Materials in common</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{comparison.result.onlyInA.length}</span>
              <span className={styles.statLabel}>Only in {selected.name.split(" ")[0]}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{comparison.result.onlyInB.length}</span>
              <span className={styles.statLabel}>Only in {comparison.other.name.split(" ")[0]}</span>
            </div>
          </div>

          <div className={styles.callout}>
            <span className={styles.calloutTitle}>
              {interpretSimilarity(comparison.result.similarity).label}
            </span>
            <div className={styles.calloutBody}>
              {interpretSimilarity(comparison.result.similarity).guidance}
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Layer difference</h3>
            <div className={styles.pills}>
              {Object.entries(comparison.result.volatilityDelta).map(([k, v]) => (
                <span key={k} className={`${styles.pill} ${layerPill(k as "top" | "heart" | "base")}`}>
                  {k}: {v > 0 ? "+" : ""}
                  {v.toFixed(1)} pts
                </span>
              ))}
            </div>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Shared material</th>
                  <th scope="col" className={styles.num}>{selected.name.slice(0, 22)}</th>
                  <th scope="col" className={styles.num}>{comparison.other.name.slice(0, 22)}</th>
                  <th scope="col" className={styles.num}>Δ</th>
                </tr>
              </thead>
              <tbody>
                {comparison.result.shared.map((s) => (
                  <tr key={s.materialId}>
                    <td>{s.name}</td>
                    <td className={`${styles.num} ${styles.mono}`}>{s.aPercent.toFixed(2)}%</td>
                    <td className={`${styles.num} ${styles.mono}`}>{s.bPercent.toFixed(2)}%</td>
                    <td className={`${styles.num} ${styles.mono}`}>
                      <strong style={{ color: Math.abs(s.delta) > 3 ? "#7a2323" : undefined }}>
                        {s.delta > 0 ? "+" : ""}
                        {s.delta.toFixed(2)}
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {comparison.result.onlyInA.length > 0 && (
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Only in {selected.name}</h3>
              <div className={styles.pills}>
                {comparison.result.onlyInA.map((o) => (
                  <span key={o.materialId} className={styles.pill}>
                    {o.name} · {o.percent.toFixed(2)}%
                  </span>
                ))}
              </div>
            </div>
          )}
          {comparison.result.onlyInB.length > 0 && (
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Only in {comparison.other.name}</h3>
              <div className={styles.pills}>
                {comparison.result.onlyInB.map((o) => (
                  <span key={o.materialId} className={`${styles.pill} ${styles.pillGold}`}>
                    {o.name} · {o.percent.toFixed(2)}%
                  </span>
                ))}
              </div>
              <p className={styles.hint}>
                These are your gaps. Work through the largest first: a missing material at 8% matters
                more than one at 0.05%, though the reverse is sometimes true for odour impact —
                judge by nose, not by the number.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ================================================================== */
/* Export                                                              */
/* ================================================================== */

function ExportTab({
  sheet,
  onCopy,
  copied,
  onDownloadTxt,
  formula,
  vault,
}: {
  sheet: string;
  onCopy: () => void;
  copied: boolean;
  onDownloadTxt: () => void;
  formula: Formula;
  vault: ReturnType<typeof useVault>;
}) {
  const [trial, setTrial] = useState({ rating: "", top: "", heart: "", drydown: "", changes: "", dilution: "" });

  return (
    <div style={{ display: "grid", gap: "1.4rem" }}>
      <div className={styles.toolbar} style={{ marginBottom: 0 }}>
        <button className={styles.btn} onClick={onCopy}>
          {copied ? "Copied ✓" : "Copy sheet"}
        </button>
        <button className={`${styles.btn} ${styles.btnGhost}`} onClick={onDownloadTxt}>
          Download .txt
        </button>
        <button
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={() => download(JSON.stringify(formula, null, 2), `${formula.name.replace(/\W+/g, "-").toLowerCase()}.json`, "application/json")}
        >
          Download this formula
        </button>
      </div>

      <pre className={styles.pre}>{sheet}</pre>

      {/* Trial log */}
      <section className={styles.card}>
        <h3 className={styles.cardTitle}>Trial log</h3>
        <p className={styles.hint}>
          Record every smelling trial. The value of a formula vault is not the ingredient list — it
          is the accumulated evidence of what each change actually did.
        </p>

        <div className={styles.toolbar} style={{ marginBottom: 0 }}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="t-dil">Dilution %</label>
            <input id="t-dil" className={styles.input} type="number" step="0.5" min="0" style={{ width: "7rem" }}
              value={trial.dilution} onChange={(e) => setTrial({ ...trial, dilution: e.target.value })} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="t-rate">Rating</label>
            <select id="t-rate" className={styles.select} style={{ width: "7rem" }}
              value={trial.rating} onChange={(e) => setTrial({ ...trial, rating: e.target.value })}>
              <option value="">—</option>
              {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}/5</option>)}
            </select>
          </div>
          <div className={styles.field} style={{ flex: "1 1 12rem" }}>
            <label className={styles.label} htmlFor="t-top">Top (0–2 h)</label>
            <input id="t-top" className={styles.input} value={trial.top} onChange={(e) => setTrial({ ...trial, top: e.target.value })} />
          </div>
          <div className={styles.field} style={{ flex: "1 1 12rem" }}>
            <label className={styles.label} htmlFor="t-heart">Heart (2–8 h)</label>
            <input id="t-heart" className={styles.input} value={trial.heart} onChange={(e) => setTrial({ ...trial, heart: e.target.value })} />
          </div>
          <div className={styles.field} style={{ flex: "1 1 12rem" }}>
            <label className={styles.label} htmlFor="t-dry">Drydown (8 h+)</label>
            <input id="t-dry" className={styles.input} value={trial.drydown} onChange={(e) => setTrial({ ...trial, drydown: e.target.value })} />
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="t-changes">Changes to make</label>
          <textarea id="t-changes" className={styles.textarea} value={trial.changes} onChange={(e) => setTrial({ ...trial, changes: e.target.value })} />
        </div>
        <div>
          <button
            className={styles.btn}
            disabled={!trial.top && !trial.heart && !trial.drydown && !trial.changes && !trial.rating}
            onClick={() => {
              vault.addTrial(formula.id, {
                rating: trial.rating ? Number(trial.rating) : undefined,
                dilution: trial.dilution ? Number(trial.dilution) : undefined,
                top: trial.top || undefined,
                heart: trial.heart || undefined,
                drydown: trial.drydown || undefined,
                changes: trial.changes || undefined,
              });
              setTrial({ rating: "", top: "", heart: "", drydown: "", changes: "", dilution: "" });
            }}
          >
            Save trial
          </button>
        </div>

        {formula.trials.length > 0 && (
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {[...formula.trials].reverse().map((t) => (
              <div key={t.id} className={styles.card} style={{ padding: "0.85rem 1rem", background: "var(--cream-2)" }}>
                <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
                  <strong style={{ fontSize: "0.88rem" }}>{new Date(t.date).toLocaleString()}</strong>
                  {t.rating && <span className={`${styles.pill} ${styles.pillGold}`}>{t.rating}/5</span>}
                  {t.dilution !== undefined && <span className={styles.pill}>@ {t.dilution}%</span>}
                  <button className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`} style={{ marginLeft: "auto" }}
                    onClick={() => vault.removeTrial(formula.id, t.id)}>✕</button>
                </div>
                {t.top && <span className={styles.hint}><strong>Top:</strong> {t.top}</span>}
                {t.heart && <span className={styles.hint}><strong>Heart:</strong> {t.heart}</span>}
                {t.drydown && <span className={styles.hint}><strong>Drydown:</strong> {t.drydown}</span>}
                {t.changes && <span className={styles.hint}><strong>Changes:</strong> {t.changes}</span>}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Tags & family */}
      <section className={styles.card}>
        <h3 className={styles.cardTitle}>Classification</h3>
        <div className={styles.toolbar} style={{ marginBottom: 0 }}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="fam">Family</label>
            <select id="fam" className={styles.select} value={formula.family ?? ""}
              onChange={(e) => vault.save({ ...formula, family: e.target.value || undefined })}>
              <option value="">Unclassified</option>
              {families.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>
          <div className={styles.field} style={{ flex: "1 1 14rem" }}>
            <label className={styles.label} htmlFor="tags">Tags (comma separated)</label>
            <input id="tags" className={styles.input} value={formula.tags.join(", ")}
              onChange={(e) =>
                vault.save({ ...formula, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
              } />
          </div>
        </div>
        {formula.derivedFrom && (
          <p className={styles.hint}>
            Derived from {formula.derivedFrom.kind === "accord" ? "accord" : "classic study"}:{" "}
            <code className={styles.mono}>{formula.derivedFrom.id}</code>
          </p>
        )}
      </section>
    </div>
  );
}

/* ================================================================== */

function layerPill(v: string) {
  if (v === "top") return styles.pillTop;
  if (v === "heart") return styles.pillHeart;
  if (v === "base") return styles.pillBase;
  return "";
}

function download(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
