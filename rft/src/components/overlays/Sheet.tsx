"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { DetailPayload } from "@/data/types";
import { sources } from "@/data/sources";
import { StatusBadge } from "@/components/ui/StatusBadge";

type SheetState =
  | { kind: "detail"; payload: DetailPayload }
  | { kind: "accountant"; title: string; body: ReactNode }
  | null;

const SheetCtx = createContext<{
  openDetail: (payload: DetailPayload) => void;
  openAccountant: (title: string, body: ReactNode) => void;
} | null>(null);

export function useSheet() {
  const ctx = useContext(SheetCtx);
  if (!ctx) throw new Error("useSheet fora do provider");
  return ctx;
}

export function SheetProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SheetState>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const close = useCallback(() => {
    dialogRef.current?.close();
    setState(null);
  }, []);

  const openDetail = useCallback((payload: DetailPayload) => {
    setState({ kind: "detail", payload });
  }, []);

  const openAccountant = useCallback((title: string, body: ReactNode) => {
    setState({ kind: "accountant", title, body });
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (state) {
      if (!d.open) d.showModal();
    } else if (d.open) {
      d.close();
    }
  }, [state]);

  return (
    <SheetCtx.Provider value={{ openDetail, openAccountant }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="fixed inset-y-0 right-0 left-auto m-0 h-full max-h-none w-full max-w-[28rem] border-0 bg-card p-0 text-navy shadow-[0_8px_32px_rgba(29,32,41,0.12)] backdrop:bg-[color-mix(in_srgb,var(--exito-navy)_28%,transparent)] open:flex open:flex-col"
        onClose={() => setState(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        {state ? (
          <div className="flex h-full flex-col">
            <header className="flex items-start justify-between gap-4 border-b border-[var(--exito-line)] px-6 py-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  {state.kind === "detail" ? "Detalhe" : "Como o contador chegou aqui"}
                </p>
                <h2 id={titleId} className="mt-1 text-xl font-semibold tracking-tight">
                  {state.kind === "detail" ? state.payload.title : state.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-lg border border-green bg-card px-2.5 py-1.5 text-sm text-navy"
              >
                Fechar
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {state.kind === "accountant" ? state.body : <DetailBody payload={state.payload} />}
            </div>
          </div>
        ) : null}
      </dialog>
    </SheetCtx.Provider>
  );
}

function DetailBody({ payload }: { payload: DetailPayload }) {
  const src = sources[payload.source];
  return (
    <div className="space-y-6 text-sm">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
        {payload.timeframe === "hoje" ? "Situação hoje" : payload.timeframe === "proposto" ? "Estrutura proposta" : "Referência"}
      </p>
      <section>
        <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Função</h3>
        <p className="mt-1 text-base text-navy">{payload.functionLabel}</p>
      </section>
      <section>
        <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Contexto</h3>
        <p className="mt-1 leading-relaxed text-muted">{payload.context}</p>
      </section>
      <section>
        <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Números</h3>
        <ul className="mt-2 space-y-3">
          {payload.numbers.map((n) => (
            <li key={n.label} className="rounded-lg bg-input px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{n.label}</span>
                <StatusBadge status={n.status} />
              </div>
              <p className="tabular mt-1 text-lg font-semibold">{n.value}</p>
              <p className="mt-1 text-muted">{n.why}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Composição</h3>
        {payload.breakdown.length === 0 ? (
          <p className="mt-1 text-muted">Sem breakdown: o material não traz essa composição.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {payload.breakdown.map((n) => (
              <li key={n.label} className="flex items-start justify-between gap-3 border-b border-[var(--exito-line)] py-2">
                <span>
                  {n.label}
                  <span className="mt-0.5 block text-xs text-muted">{n.why}</span>
                </span>
                <span className="tabular font-medium">{n.value}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      {payload.responsibilities.length > 0 ? (
        <section>
          <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Responsabilidades</h3>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-muted">
            {payload.responsibilities.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
      ) : null}
      {payload.accountantNote ? <p className="text-muted">{payload.accountantNote}</p> : null}
      <p className="border-t border-[var(--exito-line)] pt-4 text-xs leading-relaxed text-muted">
        <strong className="font-medium text-navy">{src.label}.</strong> {src.meaning}
      </p>
    </div>
  );
}
