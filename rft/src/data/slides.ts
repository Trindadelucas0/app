export const SLIDE_TOTAL = 14;

export const slideIds = [
  "s01",
  "s02",
  "s03",
  "s04",
  "s05",
  "s06",
  "s07",
  "s08",
  "s09",
  "s10",
  "s11",
  "s12",
  "s13",
  "s14",
] as const;

export type SlideId = (typeof slideIds)[number];

/** Deep links antigos da landing → slide correspondente. */
export const legacySlugToSlide: Record<string, SlideId> = {
  inicio: "s01",
  hoje: "s03",
  concentrado: "s04",
  nova: "s05",
  b2b: "s06",
  b2c: "s07",
  marca: "s08",
  comparar: "s09",
  vale: "s11",
  validacoes: "s12",
  implantar: "s13",
};

export const journeySteps = [
  { n: "01", title: "Entender", text: "Onde o dinheiro é gerado hoje." },
  { n: "02", title: "Separar", text: "Operação, canal e ativo." },
  { n: "03", title: "Estruturar", text: "ANW, IP, JPG, B2B e B2C." },
  { n: "04", title: "Simular", text: "Um produto real, com selo." },
  { n: "05", title: "Validar", text: "Jurídico, fiscal, operação, sistemas." },
  { n: "06", title: "Executar", text: "Só depois do cenário com o contador." },
] as const;

export const pillars = [
  {
    id: "juridico",
    title: "Jurídico",
    text: "Contratos, titularidade da marca, exclusividade de canal. Sem contrato, não há royalty.",
  },
  {
    id: "fiscal",
    title: "Fiscal",
    text: "Regime, notas e premissas. Revisar IRPJ/CSLL da planilha antes de consolidar.",
  },
  {
    id: "operacao",
    title: "Operação",
    text: "Equipe, estoque, carteira e risco reais no distribuidor e no digital.",
  },
  {
    id: "sistemas",
    title: "Sistemas",
    text: "Cada canal fatura no próprio sistema. Misturar NF é misturar função de novo.",
  },
] as const;
