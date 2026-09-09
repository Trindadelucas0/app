"use client";

import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ageElementScenario } from "@/data/ageScenario";

const MUTED = "#7C7C7C";
const GREEN = "#2EA44E";

export function AgeBars({ dark = false }: { dark?: boolean }) {
  const s = ageElementScenario;
  const tick = dark ? "rgba(255,255,255,0.55)" : MUTED;
  const data = [
    { key: "a", name: "Margem A", value: s.atual.margemPrecoMenosTributos, fill: dark ? "#d8dce4" : "#1D2029" },
    { key: "b1", name: "B hoje", value: s.atual.margemLinhaPlanilha, fill: MUTED },
    { key: "b2", name: "B com dist.", value: s.comDistribuidor.margemLinhaPlanilha, fill: GREEN },
  ];

  return (
    <div className="age-bars">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 4, left: 4, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fill: tick, fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis hide domain={[0, 360]} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={64} isAnimationActive={false}>
            {data.map((row) => (
              <Cell key={row.key} fill={row.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
