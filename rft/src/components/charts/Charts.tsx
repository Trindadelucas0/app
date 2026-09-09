"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { products } from "@/data/products";
import { jpgFunctionsProposed, jpgFunctionsToday } from "@/data/functions";
import { brl } from "@/lib/format";

const GREEN = "#2EA44E";
const NAVY = "#1D2029";
const MUTED = "#7C7C7C";
const GRID = "rgba(29,32,41,0.08)";

function Tip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[var(--exito-line)] bg-card px-3 py-2 text-xs text-navy shadow-[0_4px_16px_rgba(29,32,41,0.08)]">
      <p className="font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="mt-0.5 tabular" style={{ color: p.color }}>
          {p.name}: {typeof p.value === "number" && p.value > 0 && p.name !== "Funções" ? brl(p.value) : p.value}
        </p>
      ))}
    </div>
  );
}

export function ProductPricesChart() {
  const data = products.map((p) => ({
    name: p.name.replace(" Treatment", "").replace(" Anti-Wrinkle", ""),
    Distribuidor: p.distributor,
    Revenda: p.retail,
  }));
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <BarChart data={data} barGap={4} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="name" tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} interval={0} />
          <YAxis tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}`} />
          <Tooltip content={<Tip />} cursor={{ fill: "rgba(46,164,78,0.06)" }} />
          <Bar dataKey="Distribuidor" fill={GREEN} radius={[4, 4, 0, 0]} maxBarSize={28} />
          <Bar dataKey="Revenda" fill={NAVY} radius={[4, 4, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FunctionsChart() {
  const data = [
    { name: "JPG hoje", Funções: jpgFunctionsToday.length },
    { name: "JPG proposta", Funções: jpgFunctionsProposed.length },
  ];
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="name" tick={{ fill: MUTED, fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<Tip />} cursor={{ fill: "rgba(46,164,78,0.06)" }} />
          <Bar dataKey="Funções" fill={GREEN} radius={[4, 4, 0, 0]} maxBarSize={64} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ScenarioStoryChart({
  distributor,
  retail,
}: {
  distributor: number;
  retail: number;
}) {
  const data = [
    { name: "Distribuidor", Referência: distributor },
    { name: "Revenda", Referência: retail },
  ];
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="name" tick={{ fill: MUTED, fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<Tip />} cursor={{ fill: "rgba(46,164,78,0.06)" }} />
          <Bar dataKey="Referência" fill={GREEN} radius={[4, 4, 0, 0]} maxBarSize={56} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export const cascadeSlots = [
  { label: "Ganho tributário", sign: "+" },
  { label: "Margem comercial", sign: "+" },
  { label: "Custo da estrutura", sign: "−" },
  { label: "Extras operacionais", sign: "−" },
  { label: "Royalties", sign: "−" },
] as const;
