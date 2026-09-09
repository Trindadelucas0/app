"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { SiteSection } from "@/components/site/SiteSection";
import { SheetProvider, useSheet } from "@/components/overlays/Sheet";
import { EntityCard, byId, companyDetail } from "@/components/cards/EntityCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  FunctionsChart,
  ProductPricesChart,
  ScenarioStoryChart,
  cascadeSlots,
} from "@/components/charts/Charts";
import { todayIds } from "@/data/companies";
import { products, defaultProductId } from "@/data/products";
import { jpgFunctionsToday, proposedStructures } from "@/data/functions";
import { heroCards, sectionIds } from "@/data/meetingScript";
import { implantationSteps, validations } from "@/data/validations";
import { scrollToId } from "@/lib/motion";
import { brl } from "@/lib/format";
import type { DetailPayload } from "@/data/types";

export function Landing() {
  return (
    <SheetProvider>
      <LandingInner />
    </SheetProvider>
  );
}

function LandingInner() {
  const [presentation, setPresentation] = useState(false);
  const [productId, setProductId] = useState(defaultProductId);
  const product = products.find((p) => p.id === productId) ?? products[0];
  const { openDetail } = useSheet();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && sectionIds.includes(hash as (typeof sectionIds)[number])) {
      requestAnimationFrame(() => scrollToId(hash));
    }
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "SELECT" || target.tagName === "TEXTAREA")) return;
      const ids = [...sectionIds];
      const current = ids.findIndex((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top >= -80 && r.top < window.innerHeight * 0.45;
      });
      const i = current < 0 ? 0 : current;
      const next = e.key === "ArrowRight" ? Math.min(ids.length - 1, i + 1) : Math.max(0, i - 1);
      scrollToId(ids[next]);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const jpg = byId("jpg");

  return (
    <div className={presentation ? "[&_section]:min-h-[calc(100svh-var(--header-h))]" : ""}>
      <Header presentation={presentation} onTogglePresentation={() => setPresentation((v) => !v)} />
      <main>
        <Hero />
        <Hoje />
        <Concentrado jpg={jpg} onOpen={() => openDetail(companyDetail(jpg))} />
        <Nova />
        <B2B productId={productId} setProductId={setProductId} productName={product.name} />
        <B2C />
        <Marca />
        <Comparar product={product} productId={productId} setProductId={setProductId} />
        <Vale />
        <Validacoes />
        <Implantar />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section id="inicio" className="scroll-mt-[var(--header-h)] bg-card py-16 md:py-24">
      <div className="site-wrap">
        <p className="text-sm text-muted">O contador nesta etapa: abrir o mapa da empresa — não um organograma.</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-navy md:text-5xl md:leading-[1.12]">
          O que vamos olhar juntos nesta reunião?
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Planejamento tributário e operacional do Grupo JPG. Material preliminar: o site demonstra, o contador valida, isto não substitui parecer.
        </p>
        <div className="mt-6 inline-flex items-center rounded-full bg-input px-3 py-1 text-xs font-medium text-navy">
          Simulação preliminar · apresentado pelo contador
        </div>
        <div className="mt-10">
          <a
            href="#hoje"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("hoje");
            }}
            className="inline-flex rounded-lg bg-green px-5 py-3 text-sm font-medium text-white"
          >
            Começar a apresentação
          </a>
        </div>
        <div data-stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {heroCards.map((c) => (
            <a
              key={c.href}
              href={c.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(c.href.slice(1));
              }}
              className="card card-hover block"
            >
              <h2 className="text-base font-semibold">{c.title}</h2>
              <p className="mt-1 text-sm text-muted">{c.text}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hoje() {
  return (
    <SiteSection id="hoje">
      <div className="grid gap-3 md:grid-cols-2">
        <EntityCard company={byId("anw-participacoes")} />
        <EntityCard company={byId("jpg")} />
      </div>
      <div data-stagger className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {todayIds
          .filter((id) => id !== "anw-participacoes" && id !== "jpg")
          .map((id) => (
            <EntityCard key={id} company={byId(id)} />
          ))}
      </div>
    </SiteSection>
  );
}

function Concentrado({ jpg, onOpen }: { jpg: ReturnType<typeof byId>; onOpen: () => void }) {
  return (
    <SiteSection id="concentrado">
      <button type="button" onClick={onOpen} className="card card-hover w-full text-left">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">Hoje · {jpg.name}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">Cinco funções na mesma empresa</h3>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {jpgFunctionsToday.map((f) => (
            <li key={f} className="rounded-lg bg-input px-3 py-3 text-sm">
              {f}
            </li>
          ))}
        </ul>
      </button>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-base font-semibold">Funções na JPG: hoje vs proposta</h3>
          <p className="mt-1 text-sm text-muted">Contagem de papéis, não de reais.</p>
          <FunctionsChart />
        </div>
        <div data-stagger className="grid gap-3 sm:grid-cols-2">
          {["Distribuição", "Site", "Marca", "Patrimonial"].map((label) => (
            <div key={label} className="card">
              <h4 className="font-semibold">{label}</h4>
              <p className="mt-1 text-sm text-muted">
                {label === "Distribuição" && "Hoje misturada na JPG. Proposta: distribuidor B2B."}
                {label === "Site" && "Hoje misturado na JPG. Proposta: canal B2C próprio."}
                {label === "Marca" && "Hoje sem holding de IP. Proposta: titular separado."}
                {label === "Patrimonial" && "ANW Patrimonial existe no quadro, sem % informado."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SiteSection>
  );
}

function Nova() {
  const ids = ["anw-participacoes", "jpg", "holding-marcas", "anw-patrimonial", "distribuidor-b2b", "ecommerce-b2c"] as const;
  return (
    <SiteSection id="nova">
      <div data-stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ids.map((id) => (
          <EntityCard key={id} company={byId(id)} />
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">
        A Holding de Marcas/IP não integra a cadeia física da mercadoria (PPTX slide 11). Papéis abaixo são o cenário-base para discussão.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {proposedStructures.map((s) => (
          <li key={s.name} className="flex justify-between gap-3 rounded-lg bg-input px-3 py-2 text-sm">
            <span className="font-medium">{s.name}</span>
            <span className="text-muted">{s.role}</span>
          </li>
        ))}
      </ul>
    </SiteSection>
  );
}

function B2B({
  productId,
  setProductId,
  productName,
}: {
  productId: string;
  setProductId: (id: string) => void;
  productName: string;
}) {
  const { openDetail } = useSheet();
  const roles: DetailPayload[] = useMemo(
    () => [
      {
        id: "b2b-jpg",
        title: "JPG",
        timeframe: "proposto",
        functionLabel: "Fornecedor central",
        context: "No canal B2B proposto, a JPG deixa de concentrar a margem inteira da revenda (PPTX slide 5).",
        numbers: [
          { label: "Preço de transferência", value: "A definir", status: "pending-validation", why: "O slide pede preço compatível com a função do distribuidor, sem número fechado." },
          { label: "Tributos neste elo", value: "R$ —", status: "pending-validation", why: "O contador ainda valida as premissas de IRPJ/CSLL da planilha." },
        ],
        breakdown: [],
        responsibilities: ["Fornecimento central.", "Preço de transferência comercial aderente à função."],
        source: "pptx-slide-5",
      },
      {
        id: "b2b-dist",
        title: "Distribuidor oficial",
        timeframe: "proposto",
        functionLabel: "Operação B2B",
        context: "Empresa ainda não definida. Contrato, exclusividade, margem própria e substância.",
        numbers: [
          { label: "Quem é a empresa", value: "A definir", status: "not-informed", why: "O PPTX pergunta quem será o distribuidor." },
          { label: "Margem própria", value: "R$ —", status: "pending-validation", why: "Remuneração aderente a riscos e funções — sem % no material validado." },
        ],
        breakdown: [],
        responsibilities: [
          "Contrato de distribuição: escopo, território, produtos.",
          "Exclusividade com metas objetivas.",
          "Equipe, carteira, risco comercial e controles.",
        ],
        source: "pptx-slide-5",
      },
      {
        id: "b2b-rev",
        title: "Revendedores",
        timeframe: "proposto",
        functionLabel: "Canal profissional",
        context: "Destino da venda B2B. Sem lista de revendedores neste material.",
        numbers: [{ label: "Carteira", value: "Não informado", status: "not-informed", why: "O PPTX não nomeia revendedores." }],
        breakdown: [],
        responsibilities: [],
        source: "pptx-slide-5",
      },
    ],
    [],
  );

  return (
    <SiteSection id="b2b" deepen>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-base font-semibold">Preços dos cinco produtos</h3>
          <p className="text-sm text-muted">
            Dados de referência da reunião · produto em foco: {productName}
          </p>
        </div>
        <label className="text-sm text-muted">
          Produto
          <select
            className="mt-1 block w-full rounded-lg border-0 bg-input px-3 py-2 text-navy sm:w-64"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="card">
        <p className="text-sm text-muted">Verde = preço ao distribuidor. Marinho = preço de revenda. Sem tributo nesta série.</p>
        <ProductPricesChart />
      </div>
      <div data-stagger className="mt-3 grid gap-3 md:grid-cols-3">
        {roles.map((r) => (
          <button key={r.id} type="button" className="card card-hover text-left" onClick={() => openDetail(r)}>
            <h3 className="font-semibold">{r.title}</h3>
            <p className="mt-1 text-sm text-muted">{r.functionLabel}</p>
          </button>
        ))}
      </div>
    </SiteSection>
  );
}

function B2C() {
  const { openDetail } = useSheet();
  const cards: DetailPayload[] = [
    {
      id: "b2c-int",
      title: "Intervalue",
      timeframe: "proposto",
      functionLabel: "Fornecedor",
      context: "Na hipótese do slide 12, o Simples compra/importa do fornecedor. Intervalue não é sócia da holding.",
      numbers: [{ label: "Participação no grupo", value: "Não é parceira da holding", status: "confirmed", why: "Leitura do fluxo operacional, não quadro societário." }],
      breakdown: [],
      responsibilities: ["Fornecimento / exportação."],
      source: "pptx-slide-12",
    },
    {
      id: "b2c-simples",
      title: "Empresa do Simples",
      timeframe: "proposto",
      functionLabel: "E-commerce exclusivo",
      context: "Hipótese: importa e vende ao consumidor. Estoque, faturamento e risco próprios. Qual empresa do Simples será usada ainda não está definida.",
      numbers: [
        { label: "Alíquota do Simples", value: "R$ —", status: "pending-validation", why: "O slide pede simular Simples + ICMS + royalties, sem resultado neste site." },
        { label: "Quem opera", value: "A definir", status: "not-informed", why: "Nenhuma das empresas do quadro foi nomeada para este papel." },
      ],
      breakdown: [],
      responsibilities: ["Canal digital segregado da JPG.", "Licença exclusiva de uso da marca para o canal digital."],
      source: "pptx-slide-12",
    },
    {
      id: "b2c-cons",
      title: "Consumidor final",
      timeframe: "proposto",
      functionLabel: "Destino da venda digital",
      context: "Venda a não contribuinte / consumidor. Política comercial própria, sem misturar com B2B.",
      numbers: [{ label: "Volume / ticket", value: "Não informado", status: "not-informed", why: "Fora do material desta reunião." }],
      breakdown: [],
      responsibilities: [],
      source: "pptx-slide-6",
    },
  ];
  return (
    <SiteSection id="b2c">
      <div data-stagger className="grid gap-3 md:grid-cols-3">
        {cards.map((c) => (
          <button key={c.id} type="button" className="card card-hover text-left" onClick={() => openDetail(c)}>
            <h3 className="font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted">{c.functionLabel}</p>
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">
        Ponto-chave do PPTX: a mercadoria não passa pela JPG nesta hipótese. A independência operacional precisa existir na prática.
      </p>
    </SiteSection>
  );
}

function Marca() {
  const { openDetail } = useSheet();
  return (
    <SiteSection id="marca">
      <div className="grid gap-3 md:grid-cols-2">
        <button
          type="button"
          className="card card-hover text-left"
          onClick={() =>
            openDetail({
              id: "titular",
              title: "Titular da marca / direito",
              timeframe: "proposto",
              functionLabel: "Holding de Marcas / IP (proposta)",
              context: "Confirmar quem é o proprietário hoje. A holding de IP é cenário-base, não fato atual.",
              numbers: [
                { label: "Titular atual", value: "A definir", status: "not-informed", why: "O PPTX pede confirmar registros e transferência." },
                { label: "Royalty recebido", value: "R$ —", status: "pending-validation", why: "Percentual e base ainda não justificados." },
              ],
              breakdown: [],
              responsibilities: ["Deter, proteger e licenciar a marca.", "Não integrar a cadeia física da mercadoria."],
              source: "pptx-slide-7",
            })
          }
        >
          <h3 className="text-lg font-semibold">Titular</h3>
          <p className="mt-1 text-sm text-muted">Quem é dono do direito. Ainda a confirmar.</p>
        </button>
        <button
          type="button"
          className="card card-hover text-left"
          onClick={() =>
            openDetail({
              id: "uso",
              title: "Uso da marca",
              timeframe: "proposto",
              functionLabel: "Distribuidor / e-commerce licenciados",
              context: "Uso condicionado a contrato. Separar distribuição, serviços e licença.",
              numbers: [
                { label: "Percentual de royalty", value: "A definir", status: "not-informed", why: "Base de cálculo precisa ser economicamente justificável." },
                { label: "IRRF e retenções", value: "R$ —", status: "pending-validation", why: "Mapear conforme o beneficiário — sem número aqui." },
              ],
              breakdown: [],
              responsibilities: ["Contrato específico por canal.", "Não tratar royalty só como economia fiscal."],
              source: "pptx-slide-7",
            })
          }
        >
          <h3 className="text-lg font-semibold">Quem usa</h3>
          <p className="mt-1 text-sm text-muted">Licença + remuneração contratual. Sem atalho de imposto.</p>
        </button>
      </div>
      <div className="card mt-3">
        <StatusBadge status="pending-validation" />
        <p className="tabular mt-3 text-4xl font-semibold tracking-tight text-subtle">R$ —</p>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Royalty em aberto porque titularidade, base de cálculo, partes relacionadas e substância ainda não foram validadas (PPTX slides 7 e 13).
        </p>
      </div>
    </SiteSection>
  );
}

function Comparar({
  product,
  productId,
  setProductId,
}: {
  product: (typeof products)[number];
  productId: string;
  setProductId: (id: string) => void;
}) {
  return (
    <SiteSection id="comparar" deepen>
      <label className="mb-6 block text-sm text-muted">
        Produto
        <select
          className="mt-1 block w-full rounded-lg border-0 bg-input px-3 py-2 text-navy sm:w-64"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <div className="card">
        <h3 className="font-semibold">Preços de referência · {product.name}</h3>
        <p className="mt-1 text-sm text-muted">{product.note}</p>
        <ScenarioStoryChart distributor={product.distributor} retail={product.retail} />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {[
          { t: "Hoje (venda direta)", d: `Revenda de referência ${brl(product.retail)}. Tributos desta via: a validar.` },
          { t: "Via distribuidor", d: `Distribuidor ${brl(product.distributor)} / revenda ${brl(product.retail)}. Margem e imposto: a validar.` },
          { t: "Via site", d: "Hipótese Simples + importação. Sem alíquota neste site." },
        ].map((x) => (
          <article key={x.t} className="card">
            <h4 className="font-semibold">{x.t}</h4>
            <p className="mt-2 text-sm text-muted">{x.d}</p>
            <p className="tabular mt-4 text-2xl font-semibold text-subtle">R$ —</p>
            <p className="mt-1 text-xs text-muted">Tributo e margem desta via ainda não validados.</p>
          </article>
        ))}
      </div>
    </SiteSection>
  );
}

function Vale() {
  return (
    <SiteSection id="vale">
      <div className="card">
        <p className="text-sm text-muted">Ganho tributário + margem − estrutura − extras − royalties = líquido</p>
        <p className="tabular mt-4 text-5xl font-semibold tracking-tight text-subtle">R$ —</p>
        <p className="mt-2 text-sm text-muted">
          Sem economia garantida. O PPTX pede revisar IRPJ/CSLL antes de consolidar qualquer ganho.
        </p>
      </div>
      <div data-stagger className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {cascadeSlots.map((s) => (
          <article key={s.label} className="card">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
              {s.sign} {s.label}
            </p>
            <p className="tabular mt-3 text-2xl font-semibold text-subtle">R$ —</p>
            <p className="mt-1 text-xs text-muted">A definir · validação do contador</p>
          </article>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">
        Organização e proteção societária não têm R$ neste material — o valor da reunião também é clareza de papéis, não só imposto.
      </p>
    </SiteSection>
  );
}

function Validacoes() {
  return (
    <SiteSection id="validacoes">
      <div data-stagger className="grid gap-3 md:grid-cols-2">
        {validations.map((v) => (
          <article key={v.id} className="card">
            <StatusBadge status="pending-validation" />
            <h3 className="mt-3 font-semibold">{v.title}</h3>
            <p className="mt-1 text-sm text-muted">{v.text}</p>
            <p className="mt-3 text-xs text-subtle">{v.from}</p>
          </article>
        ))}
      </div>
      <div className="card mt-3">
        <h3 className="font-semibold">Substância (PPTX slide 9)</h3>
        <p className="mt-2 text-sm text-muted">
          Comercial, operacional, contratual e tributário precisam existir na prática: carteira, equipe, contratos, preço praticado e documentação.
        </p>
      </div>
    </SiteSection>
  );
}

function Implantar() {
  return (
    <SiteSection id="implantar">
      <div className="grid gap-3 md:grid-cols-2">
        <article className="card">
          <h3 className="font-semibold">Antes (fotografia)</h3>
          <p className="mt-2 text-sm text-muted">
            JPG concentra canais e marca. Quadro ANW 90% / Newton 10% ainda documental. Simples listadas com pessoas indicadas. Intervalue é fornecedor.
          </p>
        </article>
        <article className="card">
          <h3 className="font-semibold">Depois (proposta)</h3>
          <p className="mt-2 text-sm text-muted">
            Operação, B2B, B2C e IP separados por contrato e substância. Números fiscais só depois da validação. Próxima entrega do PPTX: cenário numérico validado.
          </p>
        </article>
      </div>
      <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {implantationSteps.map((s) => (
          <li key={s.n} className="card">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-green">Etapa {s.n}</p>
            <h3 className="mt-2 font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </SiteSection>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--exito-line)] bg-card py-12">
      <div className="site-wrap space-y-3 text-sm text-muted">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-green">Êxito</p>
        <p className="text-base font-semibold text-navy">Grupo JPG · simulação preliminar</p>
        <p>
          Material preliminar para discussão e validação jurídica/tributária. O software demonstra; o contador valida; isto não substitui parecer.
        </p>
        <p>
          Royalty não deve ser tratado apenas como ferramenta de economia fiscal. Fórmulas de IRPJ/CSLL da planilha exigem revisão antes de consolidar economia (PPTX slides 7 e 8).
        </p>
      </div>
    </footer>
  );
}
