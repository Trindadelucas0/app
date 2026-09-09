"use client";

import { companies, type Company } from "@/data/companies";
import type { DetailPayload } from "@/data/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useSheet } from "@/components/overlays/Sheet";

export function companyDetail(c: Company): DetailPayload {
  return {
    id: c.id,
    title: c.name,
    timeframe: c.timeframe,
    functionLabel: c.role,
    context: `${c.context} Pessoas: ${c.peopleMeaning}`,
    numbers: [
      {
        label: "Participação / vínculo",
        value: c.ownership,
        status: c.ownershipStatus,
        why:
          c.ownershipStatus === "not-informed"
            ? "O material não informa percentual ou sócio desta caixa."
            : c.ownershipStatus === "pending-validation"
              ? "Quadro do cliente — pendente de confirmação documental."
              : "Leitura do fluxo operacional no PPTX, não um contrato societário extra.",
      },
      {
        label: "Tributos / margem nesta entidade",
        value: "R$ —",
        status: "pending-validation",
        why: "O contador ainda valida as premissas. Este site não calcula imposto.",
      },
    ],
    breakdown: [],
    responsibilities: c.responsibilities,
    source: c.source,
  };
}

export function EntityCard({ company }: { company: Company }) {
  const { openDetail } = useSheet();
  return (
    <button
      type="button"
      onClick={() => openDetail(companyDetail(company))}
      className="card card-hover flex h-full w-full flex-col items-start text-left"
    >
      <div className="flex w-full items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
          {company.timeframe === "proposto" ? "Proposto" : company.kind === "fornecedor" ? "Fornecedor" : "Quadro atual"}
        </p>
        <StatusBadge status={company.ownershipStatus} />
      </div>
      <h3 className="mt-3 text-lg font-semibold tracking-tight">{company.name}</h3>
      <p className="mt-1 text-sm text-muted">{company.role}</p>
      <p className="mt-4 text-sm">
        <span className="text-muted">Pessoa indicada: </span>
        {company.people}
      </p>
      <p className="mt-1 text-sm">
        <span className="text-muted">Participação: </span>
        <span className="tabular">{company.ownership}</span>
      </p>
    </button>
  );
}

export function byId(id: string) {
  const c = companies.find((x) => x.id === id);
  if (!c) throw new Error(`Empresa ausente: ${id}`);
  return c;
}
