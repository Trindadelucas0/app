"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { meetingScript, type SectionId } from "@/data/meetingScript";
import { ensureGsap } from "@/lib/motion";
import { useSheet } from "@/components/overlays/Sheet";
import { spreadsheetPremises } from "@/data/premises";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function SiteSection({
  id,
  children,
  deepen,
}: {
  id: SectionId;
  children: ReactNode;
  deepen?: boolean;
}) {
  const script = meetingScript[id];
  const root = useRef<HTMLElement>(null);
  const { openAccountant } = useSheet();

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal], [data-stagger] > *", { autoAlpha: 1, y: 0 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-reveal]", {
          autoAlpha: 0,
          y: 18,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
        });
        const stagger = root.current?.querySelector("[data-stagger]");
        if (stagger) {
          gsap.from("[data-stagger] > *", {
            autoAlpha: 0,
            y: 12,
            duration: 0.55,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
          });
        }
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id={id}
      className="scroll-mt-[calc(var(--header-h)+0.75rem)] border-t border-[var(--exito-line)] py-16 md:py-24"
    >
      <div className="site-wrap">
        <p data-reveal className="text-sm leading-snug text-muted">
          O contador nesta etapa: {script.accountant}
        </p>
        <h2 data-reveal className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-navy md:text-[2.35rem] md:leading-tight">
          {script.question}
        </h2>
        <p data-reveal className="mt-4 max-w-2xl text-base text-muted">
          {script.lead}
        </p>
        <div className="mt-10">{children}</div>
        {deepen ? (
          <button
            type="button"
            className="mt-8 text-sm font-medium text-green underline-offset-4 hover:underline"
            onClick={() =>
              openAccountant("Premissas da planilha (em revisão)", <PremisesBody />)
            }
          >
            Como o contador chegou aqui
          </button>
        ) : null}
      </div>
    </section>
  );
}

function PremisesBody() {
  return (
    <div className="space-y-4 text-sm">
      <p className="text-muted">
        Valores da aba Análise Cenário Fiscal. Não preenchem ganho, margem nem imposto na tela da reunião.
        O PPTX slide 8 pede revisar IRPJ/CSLL antes de consolidar economia.
      </p>
      <ul className="space-y-3">
        {spreadsheetPremises.map((p) => (
          <li key={p.label} className="rounded-lg bg-input px-3 py-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium">{p.label}</span>
              <StatusBadge status={p.status} />
            </div>
            <p className="mt-1 tabular">{p.formula}</p>
            <p className="mt-1 text-muted">{p.why}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
