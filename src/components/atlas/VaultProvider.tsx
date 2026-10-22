"use client";

/**
 * DOM126 Perfumery Atlas — Formula Vault state.
 *
 * Persistence follows the same pattern as the site's cart provider:
 * `localStorage` on the customer's / perfumer's own device, restored on
 * mount, written on every change. That keeps the Atlas backend-free and
 * consistent with the rest of the codebase.
 *
 * WHY LOCAL-FIRST IS THE RIGHT DEFAULT HERE
 *   A formula is the most commercially sensitive document a fragrance house
 *   owns. Storing it on the visitor's own device means nothing leaves the
 *   browser, there is no server to breach, and there is no account to
 *   manage. The trade-off is that formulas do not follow you between
 *   devices — which is what the JSON export / import is for. Take a backup
 *   regularly; browser storage can be cleared without warning.
 *
 * ADDING A SERVER LATER
 *   The shape is already API-ready. To move to shared storage:
 *     1. Add `src/app/api/formulas/route.ts` (GET list, POST create).
 *     2. Add `src/app/api/formulas/[id]/route.ts` (GET, PATCH, DELETE).
 *     3. Swap the `persist` / `restore` functions below for fetch calls and
 *        keep the rest of the provider unchanged — nothing else in the Atlas
 *        touches storage directly.
 *   `src/lib/perfumery/formula.ts` is pure and storage-agnostic, so the
 *   maths survives that change untouched.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ExportBundle, Formula, FormulaLine, Trial } from "@/lib/perfumery/types";
import { emptyFormula, exportFormulas, makeId, parseFormulaText } from "@/lib/perfumery/formula";

const STORAGE_KEY = "dom126_formula_vault_v1";

interface VaultContextValue {
  formulas: Formula[];
  /** True once storage has been read, so the UI can avoid a flash of empty state. */
  ready: boolean;
  /** Storage failure message, if the browser refused to persist. */
  error: string | null;
  get: (id: string) => Formula | undefined;
  save: (formula: Formula) => void;
  create: (name?: string) => Formula;
  remove: (id: string) => void;
  duplicate: (id: string) => void;
  updateLine: (formulaId: string, lineId: string, patch: Partial<FormulaLine>) => void;
  addLine: (formulaId: string, line?: Partial<FormulaLine>) => void;
  removeLine: (formulaId: string, lineId: string) => void;
  addTrial: (formulaId: string, trial: Omit<Trial, "id" | "date">) => void;
  removeTrial: (formulaId: string, trialId: string) => void;
  replaceAll: (formulas: Formula[]) => void;
  importJson: (json: string) => { count: number; error?: string };
  importText: (text: string, name: string) => Formula;
  exportJson: () => string;
  clearAll: () => void;
}

const VaultContext = createContext<VaultContextValue | null>(null);

/** Defensive parse: never let a corrupt record blank the whole vault. */
function sanitise(input: unknown): Formula[] {
  if (!Array.isArray(input)) return [];
  const out: Formula[] = [];
  for (const raw of input) {
    if (!raw || typeof raw !== "object") continue;
    const f = raw as Partial<Formula>;
    if (typeof f.id !== "string" || !Array.isArray(f.lines)) continue;
    out.push({
      id: f.id,
      name: typeof f.name === "string" ? f.name : "Untitled",
      brief: typeof f.brief === "string" ? f.brief : "",
      createdAt: typeof f.createdAt === "string" ? f.createdAt : new Date().toISOString(),
      updatedAt: typeof f.updatedAt === "string" ? f.updatedAt : new Date().toISOString(),
      version: typeof f.version === "number" ? f.version : 1,
      units: f.units === "grams" || f.units === "percent" ? f.units : "parts",
      family: typeof f.family === "string" ? f.family : undefined,
      concentration: f.concentration,
      tags: Array.isArray(f.tags) ? f.tags.filter((t): t is string => typeof t === "string") : [],
      trials: Array.isArray(f.trials) ? (f.trials as Trial[]) : [],
      derivedFrom: f.derivedFrom,
      lines: f.lines
        .filter((l): l is FormulaLine => !!l && typeof l === "object" && typeof (l as FormulaLine).materialId === "string")
        .map((l) => ({
          id: typeof l.id === "string" ? l.id : makeId("ln"),
          materialId: l.materialId,
          parts: Number.isFinite(l.parts) ? Number(l.parts) : 0,
          note: typeof l.note === "string" ? l.note : undefined,
        })),
    });
  }
  return out;
}

export function VaultProvider({ children }: { children: ReactNode }) {
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setFormulas(sanitise(JSON.parse(raw)));
    } catch {
      setError("Could not read saved formulas from this browser.");
    } finally {
      setReady(true);
    }
  }, []);

  const persist = useCallback((next: Formula[]) => {
    setFormulas(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setError(null);
    } catch {
      setError(
        "This browser would not save your formulas (storage may be full or blocked). Export a JSON backup now so nothing is lost.",
      );
    }
  }, []);

  const mutate = useCallback(
    (fn: (list: Formula[]) => Formula[]) => {
      setFormulas((current) => {
        const next = fn(current);
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          setError(null);
        } catch {
          setError(
            "This browser would not save your formulas (storage may be full or blocked). Export a JSON backup now so nothing is lost.",
          );
        }
        return next;
      });
    },
    [],
  );

  const touch = (f: Formula): Formula => ({
    ...f,
    version: f.version + 1,
    updatedAt: new Date().toISOString(),
  });

  const value = useMemo<VaultContextValue>(() => {
    return {
      formulas,
      ready,
      error,
      get: (id) => formulas.find((f) => f.id === id),

      save: (formula) =>
        mutate((list) => {
          const i = list.findIndex((f) => f.id === formula.id);
          const next = touch(formula);
          if (i === -1) return [next, ...list];
          const copy = [...list];
          copy[i] = next;
          return copy;
        }),

      create: (name) => {
        const f = emptyFormula(name);
        mutate((list) => [f, ...list]);
        return f;
      },

      remove: (id) => mutate((list) => list.filter((f) => f.id !== id)),

      duplicate: (id) =>
        mutate((list) => {
          const src = list.find((f) => f.id === id);
          if (!src) return list;
          const copy: Formula = {
            ...src,
            id: makeId("fml"),
            name: `${src.name} (copy)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: 1,
            lines: src.lines.map((l) => ({ ...l, id: makeId("ln") })),
            trials: [],
          };
          return [copy, ...list];
        }),

      updateLine: (formulaId, lineId, patch) =>
        mutate((list) =>
          list.map((f) =>
            f.id === formulaId
              ? touch({
                  ...f,
                  lines: f.lines.map((l) => (l.id === lineId ? { ...l, ...patch } : l)),
                })
              : f,
          ),
        ),

      addLine: (formulaId, line) =>
        mutate((list) =>
          list.map((f) =>
            f.id === formulaId
              ? touch({
                  ...f,
                  lines: [
                    ...f.lines,
                    { id: makeId("ln"), materialId: line?.materialId ?? "", parts: line?.parts ?? 0, note: line?.note },
                  ],
                })
              : f,
          ),
        ),

      removeLine: (formulaId, lineId) =>
        mutate((list) =>
          list.map((f) =>
            f.id === formulaId
              ? touch({ ...f, lines: f.lines.filter((l) => l.id !== lineId) })
              : f,
          ),
        ),

      addTrial: (formulaId, trial) =>
        mutate((list) =>
          list.map((f) =>
            f.id === formulaId
              ? touch({
                  ...f,
                  trials: [
                    ...f.trials,
                    { ...trial, id: makeId("trl"), date: new Date().toISOString() },
                  ],
                })
              : f,
          ),
        ),

      removeTrial: (formulaId, trialId) =>
        mutate((list) =>
          list.map((f) =>
            f.id === formulaId
              ? touch({ ...f, trials: f.trials.filter((t) => t.id !== trialId) })
              : f,
          ),
        ),

      replaceAll: (next) => persist(sanitise(next)),

      importJson: (json) => {
        try {
          const parsed = JSON.parse(json);
          const incoming = sanitise(
            Array.isArray(parsed) ? parsed : (parsed as ExportBundle)?.formulas,
          );
          if (!incoming.length) return { count: 0, error: "No valid formulas found in that file." };
          let added = 0;
          mutate((list) => {
            const existing = new Set(list.map((f) => f.id));
            const fresh = incoming.map((f) =>
              existing.has(f.id) ? { ...f, id: makeId("fml"), name: `${f.name} (imported)` } : f,
            );
            added = fresh.length;
            return [...fresh, ...list];
          });
          return { count: added };
        } catch {
          return { count: 0, error: "That file is not valid JSON." };
        }
      },

      importText: (text, name) => {
        const f = parseFormulaText(text, name);
        mutate((list) => [f, ...list]);
        return f;
      },

      exportJson: () => exportFormulas(formulas),

      clearAll: () => persist([]),
    };
  }, [formulas, ready, error, mutate, persist]);

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault(): VaultContextValue {
  const ctx = useContext(VaultContext);
  if (!ctx) throw new Error("useVault must be used inside a VaultProvider");
  return ctx;
}
