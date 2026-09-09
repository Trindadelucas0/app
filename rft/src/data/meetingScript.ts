export const navItems = [
  { href: "#inicio", label: "Início" },
  { href: "#hoje", label: "A empresa hoje" },
  { href: "#nova", label: "Nova estrutura" },
  { href: "#b2b", label: "Números" },
  { href: "#vale", label: "Vale a pena" },
  { href: "#implantar", label: "Implantar" },
] as const;

export const sectionIds = [
  "inicio",
  "hoje",
  "concentrado",
  "nova",
  "b2b",
  "b2c",
  "marca",
  "comparar",
  "vale",
  "validacoes",
  "implantar",
] as const;

export type SectionId = (typeof sectionIds)[number];

export const meetingScript: Record<
  SectionId,
  { question: string; accountant: string; lead: string }
> = {
  inicio: {
    question: "O que vamos olhar juntos nesta reunião?",
    accountant: "Abrir o mapa da empresa — não um organograma de consultoria.",
    lead: "Onde o dinheiro passa hoje, como poderia passar depois, e o que ainda não tem número válido.",
  },
  hoje: {
    question: "Quais empresas existem no grupo hoje?",
    accountant: "Fotografar o quadro. Documento ainda confirma sócios e percentuais.",
    lead: "ANW, JPG, patrimoniais, Simples e o fornecedor Intervalue — cada um com o que o material realmente diz.",
  },
  concentrado: {
    question: "Por que a JPG parece fazer tantas coisas ao mesmo tempo?",
    accountant: "Separar funções para depois medir efeito. Sem efeito em R$ nesta etapa.",
    lead: "Distribuição, site e marca estão concentrados. A proposta é um papel por estrutura.",
  },
  nova: {
    question: "Como a empresa pode ficar, se a proposta avançar?",
    accountant: "Propor papéis: operação, B2B, B2C e marca. Nada disso está implantado só porque está no slide.",
    lead: "Cards da estrutura recomendada. Holding de Marcas/IP não entra na cadeia física da mercadoria.",
  },
  b2b: {
    question: "Na venda para revenda, quem fica com o quê?",
    accountant: "Pegar um produto real e mostrar preço de referência. Tributo e margem continuam vazios.",
    lead: "JPG fornece, distribuidor opera o B2B, revendedores vendem. Preços da reunião, não economia fiscal.",
  },
  b2c: {
    question: "Venda no site é o mesmo negócio da revenda?",
    accountant: "Não. Hipótese de canal digital próprio — inclusive Simples com importação, ainda sem alíquota.",
    lead: "A mercadoria, nesta hipótese, não passa pela JPG. Independência precisa existir na prática.",
  },
  marca: {
    question: "Quem é dono da marca e quanto custaria usar?",
    accountant: "Só com contrato e direito real. Royalty não é atalho de imposto.",
    lead: "Titular versus uso. Percentual e R$ de royalty: a definir.",
  },
  comparar: {
    question: "Os jeitos de vender o mesmo produto mudam o que fica no grupo?",
    accountant: "Mostrar preço confirmado como referência. Tributo e margem como faixa a validar.",
    lead: "Hoje (direto), via distribuidor, via site. Só a coluna de preço de referência está preenchida.",
  },
  vale: {
    question: "Vale a pena — em dinheiro — montar essa estrutura?",
    accountant: "Deixar a conta visível mesmo sem valor. Ganho menos custo = ainda não calculado.",
    lead: "Fórmula: ganho tributário + margem − estrutura − extras − royalties. Tudo a definir até o parecer.",
  },
  validacoes: {
    question: "O site decide alguma coisa?",
    accountant: "Não. O software demonstra. O contador valida. Não substitui parecer.",
    lead: "Checklist do que impede fechar números na frente do cliente.",
  },
  implantar: {
    question: "O que vem depois desta reunião?",
    accountant: "Marca → IP → contratos → operação → simular com números validados → parecer.",
    lead: "Antes e depois em duas colunas. Sem executar sociedade só com este material preliminar.",
  },
};

export const heroCards = [
  { href: "#hoje", title: "A empresa hoje", text: "Quem aparece no quadro." },
  { href: "#concentrado", title: "O que está junto", text: "Funções na JPG." },
  { href: "#nova", title: "Como pode ficar", text: "Papéis propostos." },
  { href: "#b2b", title: "Venda para revenda", text: "Preços de referência." },
  { href: "#b2c", title: "Venda no site", text: "Outro canal." },
  { href: "#vale", title: "Vale a pena?", text: "Conta ainda aberta." },
] as const;
