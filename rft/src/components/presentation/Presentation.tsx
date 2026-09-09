"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArchitectureMap,
  ArchitectureNode,
  MoneyRail,
} from "@/components/diagrams/ArchitectureMap";
import { EntityStage, type EntityCard } from "@/components/diagrams/EntityStage";
import { SlideFrame } from "@/components/presentation/SlideFrame";
import { ageElementScenario } from "@/data/ageScenario";
import { companies } from "@/data/companies";
import { journeySteps, pillars, slideIds } from "@/data/slides";
import { brl } from "@/lib/format";

gsap.registerPlugin(useGSAP);

function company(id: string) {
  const found = companies.find((c) => c.id === id);
  if (!found) throw new Error(`Empresa não encontrada: ${id}`);
  return found;
}

function scrollToSlide(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function currentSlideIndex(): number {
  const ids = [...slideIds];
  const found = ids.findIndex((id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.top >= -80 && r.top < window.innerHeight * 0.45;
  });
  return found < 0 ? 0 : found;
}

const entities: EntityCard[] = [
  {
    id: "holding-ip",
    kind: "Holding IP",
    name: company("holding-marcas").name,
    role: "Titular da marca — proposta",
    faz: "Titular da marca. Fora da cadeia física.",
    ganha: "Licença por canal — sem R$ de royalty neste deck.",
    assume: "Não compra nem vende mercadoria.",
  },
  {
    id: "jpg",
    kind: "Operação",
    name: company("jpg").name,
    role: "Atacado",
    faz: "Operação principal. Atacado para o B2B.",
    ganha: "Margem operacional — sem R$.",
    assume: "90% ANW / 10% Newton — quadro, a validar.",
  },
  {
    id: "b2b",
    kind: "B2B",
    name: company("distribuidor-b2b").name,
    role: "Distribuição",
    faz: "Exclusividade, metas, equipe e carteira.",
    ganha: "Margem do canal de revenda.",
    assume: "Risco comercial. Proposta, não fato.",
  },
  {
    id: "b2c",
    kind: "B2C",
    name: "Canal digital",
    role: "E-commerce",
    faz: "Site, marketplace, consumidor final.",
    ganha: "Política comercial própria.",
    assume: "Simples = pessoas indicadas. Intervalue = fornecedor.",
  },
];

function CountBRL({
  value,
  play,
  prefix = "",
}: {
  value: number;
  play: boolean;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (!play || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = `${prefix}${brl(value)}`;
        return;
      }
      const obj = { n: 0 };
      gsap.to(obj, {
        n: value,
        duration: 1.05,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${prefix}${brl(obj.n)}`;
        },
      });
    },
    { dependencies: [play, value, prefix] },
  );

  return (
    <span ref={ref}>
      {prefix}
      {brl(value)}
    </span>
  );
}

export function Presentation() {
  const [index, setIndex] = useState(0);
  const revealed = useRef(new Set<string>());
  const rootRef = useRef<HTMLElement>(null);

  const go = useCallback((next: number) => {
    const ids = [...slideIds];
    const i = Math.max(0, Math.min(ids.length - 1, next));
    scrollToSlide(ids[i]);
    setIndex(i);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "Escape") return;
      const i = currentSlideIndex();
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        go(i + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(i - 1);
      }
    }

    function onScroll() {
      setIndex(currentSlideIndex());
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [go]);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const id = slideIds[index];
      const section = document.getElementById(id);
      if (!section) return;
      if (reduced || revealed.current.has(id)) return;
      revealed.current.add(id);
      const items = section.querySelectorAll("[data-reveal]");
      gsap.from(items, {
        y: 18,
        opacity: 0,
        duration: 0.45,
        stagger: 0.07,
        ease: "power2.out",
      });
    },
    { dependencies: [index], scope: rootRef },
  );

  const on09 = index === 8;
  const on10 = index === 9;

  return (
    <main ref={rootRef}>
      <a className="skip-link" href="#s02">
        Pular capa
      </a>
      <button type="button" className="deck-nav prev" aria-label="Slide anterior" disabled={index === 0} onClick={() => go(index - 1)}>
        ←
      </button>
      <button
        type="button"
        className="deck-nav next"
        aria-label="Próximo slide"
        disabled={index === slideIds.length - 1}
        onClick={() => go(index + 1)}
      >
        →
      </button>

      <Slide01 />
      <Slide02 />
      <Slide03 />
      <Slide04 />
      <Slide05 />
      <Slide06 />
      <Slide07 />
      <Slide08 />
      <Slide09 play={on09} />
      <Slide10 play={on10} />
      <Slide11 />
      <Slide12 />
      <Slide13 />
      <Slide14 />
    </main>
  );
}

const coverOrbit = [
  { title: "Importação", pos: "n" },
  { title: "B2B", pos: "e" },
  { title: "Digital", pos: "s" },
  { title: "Marca", pos: "w" },
] as const;

const moneyChips = ["receita", "margem", "tributo", "risco"];

function Slide01() {
  return (
    <SlideFrame
      id="s01"
      n={1}
      tone="cover"
      headCenter
      kicker="Setembro 2026"
      title="Grupo JPG"
      lead="A nova arquitetura operacional"
      bodyReveal={false}
    >
      <div className="cover-stage">
        <p className="cover-promise" data-reveal>
          Separar funções · ver margem · medir resultado
        </p>
        <div className="cover-orbit cover-orbit-teaser" aria-label="Funções na JPG">
          <ArchitectureNode title="JPG" variant="anchor" size="lg" className="cover-orbit-center" reveal />
          {coverOrbit.map((item) => (
            <p key={item.title} className={`cover-orbit-label pos-${item.pos}`} data-reveal>
              {item.title}
            </p>
          ))}
        </div>
        <div className="cover-actions" data-reveal>
          <a className="cover-cta" href="#s02">
            Começar a apresentação
          </a>
          <p className="caption">Material preliminar · confidencial · diretoria</p>
        </div>
      </div>
    </SlideFrame>
  );
}

function Slide02() {
  return (
    <SlideFrame id="s02" n={2} kicker="Onde o dinheiro é gerado hoje?" title="Tudo passa pela JPG">
      <ArchitectureMap>
        <ArchitectureNode title="JPG" label="Hoje" variant="anchor" size="lg" />
        <div className="arch-stem" aria-hidden="true" />
        <div className="arch-row">
          <ArchitectureNode title="Importa" size="sm" />
          <ArchitectureNode title="Vende B2B" size="sm" />
          <ArchitectureNode title="Vende digital" size="sm" />
        </div>
        <div className="arch-stem" aria-hidden="true" />
        <ArchitectureNode title="Um caixa só" />
      </ArchitectureMap>
    </SlideFrame>
  );
}

function Slide03() {
  const cols = [
    { title: "Operação", items: ["importação", "estoque", "atacado"] },
    { title: "Canal", items: ["B2B", "digital", "revenda + site"] },
    { title: "Ativo", items: ["marca", "IP", "uso sem titular"] },
  ];
  return (
    <SlideFrame
      id="s03"
      n={3}
      kicker="Qual é o problema?"
      title="O problema não é vender. É concentrar."
    >
      <div className="problem-cols">
        {cols.map((col) => (
          <article key={col.title} className="problem-col">
            <ArchitectureNode title={col.title} variant="anchor" />
            <ul>
              {col.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SlideFrame>
  );
}

function Slide04() {
  return (
    <SlideFrame id="s04" n={4} kicker="Como pode ficar?" title="Nova arquitetura">
      <p className="proposal-tag">Proposta, não fato</p>
      <ArchitectureMap>
        <ArchitectureNode title="ANW Participações" label="Controle" variant="anchor" size="lg" />
        <div className="arch-stem" aria-hidden="true" />
        <div className="arch-row">
          <ArchitectureNode title="Marca / IP" label="Fora da cadeia" variant="pending" />
          <ArchitectureNode title="JPG" label="Atacado" variant="anchor" size="lg" />
        </div>
        <div className="arch-stem" aria-hidden="true" />
        <div className="arch-row">
          <ArchitectureNode title="Licença" size="sm" variant="pending" />
          <ArchitectureNode title="B2B" size="sm" variant="pending" />
          <ArchitectureNode title="B2C" size="sm" channel />
        </div>
      </ArchitectureMap>
    </SlideFrame>
  );
}

function Slide05() {
  return (
    <SlideFrame id="s05" n={5} kicker="Quem faz o quê?" title="Quatro entidades">
      <EntityStage entities={entities} />
    </SlideFrame>
  );
}

function Slide06() {
  return (
    <SlideFrame id="s06" n={6} kicker="Como o dinheiro passa no B2B?" title="JPG vende no atacado">
      <MoneyRail
        stages={[
          { title: "JPG", label: "Atacado", variant: "anchor", size: "lg", chips: moneyChips },
          { title: "Distribuidor", label: "A definir", variant: "pending", size: "lg", chips: moneyChips },
          { title: "Revenda", label: "Ponta", size: "lg", chips: moneyChips },
        ]}
      />
      <p className="caption">Camadas da cadeia — sem R$ nesta tela.</p>
    </SlideFrame>
  );
}

function Slide07() {
  return (
    <SlideFrame id="s07" n={7} kicker="Como no digital?" title="Mercadoria não passa pela JPG">
      <MoneyRail
        stages={[
          { title: "Intervalue", label: "Fornecedor", size: "lg", chips: moneyChips },
          {
            title: "Empresa SN",
            label: "A definir",
            variant: "pending",
            size: "lg",
            channel: true,
            chips: moneyChips,
          },
          { title: "Site", label: "Proposta", variant: "pending", size: "lg", channel: true, chips: moneyChips },
          { title: "Consumidor", label: "Ponta", size: "lg", chips: moneyChips },
        ]}
      />
      <p className="banner-line">O fluxo digital não se mistura com o B2B.</p>
    </SlideFrame>
  );
}

function Slide08() {
  return (
    <SlideFrame id="s08" n={8} kicker="Onde entra a marca?" title="IP sai da operação">
      <div className="before-after">
        <div className="ba-col">
          <p className="node-label">Hoje</p>
          <ArchitectureNode title="JPG + marca" variant="anchor" size="lg" />
        </div>
        <span className="arch-arrow ba-arrow" aria-hidden="true">
          →
        </span>
        <div className="ba-col">
          <p className="node-label">Proposta</p>
          <ArchitectureNode title="Holding IP" label="Fora da cadeia" variant="pending" size="lg" />
          <div className="arch-stem" aria-hidden="true" />
          <div className="arch-row">
            <ArchitectureNode title="Licença B2B" size="sm" variant="pending" />
            <ArchitectureNode title="Licença B2C" size="sm" channel />
          </div>
        </div>
      </div>
      <p className="caption">Sem R$ de royalty. RIR/2018 · PPTX 7 e 13.</p>
    </SlideFrame>
  );
}

function Slide09({ play }: { play: boolean }) {
  const s = ageElementScenario;
  return (
    <SlideFrame id="s09" n={9} tone="dark" kicker="O que acontece com um produto real?" title={s.productName}>
      <p>
        <span className="badge badge-sim">Simulação em revisão</span>
      </p>
      <p className="hero-num">
        <CountBRL value={s.prices.retail} play={play} />
      </p>
      <p className="caption">Preço de referência · mesmo preço final nos dois cenários</p>
      <div className="cols-2-prices">
        <article className="price-col">
          <p className="node-label">Hoje · venda aba</p>
          <p className="num">{brl(s.atual.vendaPlanilha)}</p>
        </article>
        <article className="price-col">
          <p className="node-label">Estrutura · venda aba</p>
          <p className="num">{brl(s.comDistribuidor.venda)}</p>
        </article>
      </div>
    </SlideFrame>
  );
}

function Slide10({ play }: { play: boolean }) {
  const s = ageElementScenario;
  const rows = [
    {
      item: "Preço final ao consumidor",
      a: brl(s.prices.retail),
      b: brl(s.prices.retail),
    },
    {
      item: "IPI",
      a: `${brl(s.atual.ipi)} (${s.taxRatesAtual.ipi.toLocaleString("pt-BR")}%)`,
      b: `${brl(s.comDistribuidor.ipi)} (${s.taxRatesDist.ipi.toLocaleString("pt-BR")}%)`,
    },
    {
      item: "IRPJ",
      a: `${brl(s.atual.irpj)} (${s.taxRatesAtual.irpj.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}%)`,
      b: `${brl(s.comDistribuidor.irpj)} (${s.taxRatesDist.irpj.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}%)`,
    },
    {
      item: "CSLL",
      a: `${brl(s.atual.csll)} (${s.taxRatesAtual.csll.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}%)`,
      b: `${brl(s.comDistribuidor.csll)} (${s.taxRatesDist.csll.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}%)`,
    },
    {
      item: "ICMS",
      a: `${brl(s.atual.icms)} (${s.taxRatesAtual.icms.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}%)`,
      b: `${brl(s.comDistribuidor.icms)} (${s.taxRatesDist.icms.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}%)`,
    },
  ];

  return (
    <SlideFrame id="s10" n={10} tone="dark" kicker="O que acontece com a margem?" title="Um produto real, nos dois cenários">
      <p className="hero-num gain">
        <CountBRL value={s.deltaMargemB} play={play} prefix="+ " />
      </p>
      <p className="caption">
        Margem B por unidade · {brl(s.atual.margemLinhaPlanilha)} → {brl(s.comDistribuidor.margemLinhaPlanilha)} · +
        {s.deltaMargemBPp.toLocaleString("pt-BR")} p.p.
      </p>
      <table className="cmp-table">
        <thead>
          <tr>
            <th> </th>
            <th>Cenário atual</th>
            <th>Com distribuidor</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.item}>
              <td>{row.item}</td>
              <td>{row.a}</td>
              <td>{row.b}</td>
            </tr>
          ))}
          <tr className="row-gain">
            <td>Margem retida pelo grupo (B)</td>
            <td>
              {brl(s.atual.margemLinhaPlanilha)} ({s.pctMargemBAtual.toLocaleString("pt-BR")}%)
            </td>
            <td>
              {brl(s.comDistribuidor.margemLinhaPlanilha)} ({s.pctMargemBDist.toLocaleString("pt-BR")}%)
            </td>
          </tr>
        </tbody>
      </table>
      <p className="disclaimer">
        {brl(s.deltaMargemB)} é indicador por unidade, não economia anual. IRPJ/CSLL em revisão. Margem A{" "}
        {brl(s.atual.margemPrecoMenosTributos)} (preço − tributos) não entra nesta tabela.
      </p>
    </SlideFrame>
  );
}

function Slide11() {
  return (
    <SlideFrame id="s11" n={11} kicker="De onde vem o ganho?" title="Ganho econômico">
      <ArchitectureMap>
        <ArchitectureNode title="Ganho econômico" variant="anchor" size="lg" />
        <div className="arch-stem" aria-hidden="true" />
        <div className="arch-row">
          <ArchitectureNode title="Tributos" size="sm" />
          <ArchitectureNode title="Margem" size="sm" />
          <ArchitectureNode title="Eficiência" size="sm" />
        </div>
        <div className="arch-stem" aria-hidden="true" />
        <ArchitectureNode title="Ganho bruto" />
        <div className="arch-stem" aria-hidden="true" />
        <div className="arch-row">
          <ArchitectureNode title="− Estrutura" size="sm" variant="pending" />
          <ArchitectureNode title="− Transição" size="sm" variant="pending" />
        </div>
        <div className="arch-stem" aria-hidden="true" />
        <ArchitectureNode title="Ganho líquido" label="A validar" variant="anchor" />
      </ArchitectureMap>
    </SlideFrame>
  );
}

function Slide12() {
  const [open, setOpen] = useState<string>(pillars[0].id);
  const current = pillars.find((p) => p.id === open) ?? pillars[0];
  return (
    <SlideFrame id="s12" n={12} kicker="O que precisa existir de verdade?" title="Não basta criar empresas.">
      <div className="blocks-4">
        {pillars.map((p) => (
          <button
            key={p.id}
            type="button"
            className={open === p.id ? "pillar is-open" : "pillar"}
            onClick={() => setOpen(p.id)}
            aria-expanded={open === p.id}
          >
            <h2>{p.title}</h2>
          </button>
        ))}
      </div>
      <p className="pillar-line">{current.text}</p>
    </SlideFrame>
  );
}

function Slide13() {
  return (
    <SlideFrame id="s13" n={13} kicker="Como chegamos à execução?" title="A jornada">
      <ol className="journey-line">
        {journeySteps.map((step) => (
          <li key={step.n} className={step.title === "Simular" ? "journey-step is-now" : "journey-step"}>
            <strong>{step.title}</strong>
          </li>
        ))}
      </ol>
      <p className="caption">Etapa atual: simular. Próxima entrega: cenário com o contador.</p>
    </SlideFrame>
  );
}

function Slide14() {
  return (
    <SlideFrame
      id="s14"
      n={14}
      tone="dark"
      headCenter
      kicker="Qual é a decisão?"
      title="Cada função no lugar certo."
      titleHero
    >
      <div className="before-after">
        <div className="ba-col">
          <p className="node-label">Hoje</p>
          <ArchitectureNode title="Uma JPG" variant="anchor" size="lg" />
        </div>
        <span className="arch-arrow ba-arrow" aria-hidden="true">
          →
        </span>
        <div className="ba-col">
          <p className="node-label">Proposta</p>
          <div className="arch-row">
            <ArchitectureNode title="IP" variant="pending" size="sm" />
            <ArchitectureNode title="JPG" variant="anchor" size="sm" />
            <ArchitectureNode title="B2B" size="sm" variant="pending" />
            <ArchitectureNode title="B2C" size="sm" channel />
          </div>
        </div>
      </div>
      <p className="caption">Próxima etapa: fechar o cenário numérico com o contador.</p>
    </SlideFrame>
  );
}
