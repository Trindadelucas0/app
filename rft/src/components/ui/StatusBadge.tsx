import type { DataStatus } from "@/data/types";
import { cn } from "@/lib/cn";

const labels: Record<DataStatus, string> = {
  confirmed: "Confirmado no material",
  simulation: "Dado de referência",
  "pending-validation": "Validação necessária",
  "not-informed": "Não informado",
};

export function StatusBadge({ status }: { status: DataStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide",
        status === "confirmed" && "bg-[color-mix(in_srgb,var(--exito-green)_16%,white)] text-navy",
        status === "simulation" && "bg-input text-navy",
        status === "pending-validation" && "bg-input text-muted",
        status === "not-informed" && "bg-page text-muted",
      )}
    >
      {labels[status]}
    </span>
  );
}

export function PendingAmount({ why }: { why: string }) {
  return (
    <div>
      <p className="tabular text-3xl font-semibold tracking-tight text-subtle">R$ —</p>
      <p className="mt-1 text-sm text-muted">{why}</p>
    </div>
  );
}
