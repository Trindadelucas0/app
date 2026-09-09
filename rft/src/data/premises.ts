import type { DataStatus } from "./types";

export const spreadsheetPremises: {
  label: string;
  formula: string;
  status: DataStatus;
  why: string;
}[] = [
  {
    label: "Markup sobre custo NF",
    formula: "20% (preço distribuidor = custo NF × 1,2)",
    status: "pending-validation",
    why: "Fórmula da aba Análise Cenário Fiscal. Ainda valida se descreve a operação real.",
  },
  {
    label: "IPI",
    formula: "14,3% sobre o preço do distribuidor",
    status: "pending-validation",
    why: "Alíquota escrita na fórmula. Não é o IPI devido até revisão.",
  },
  {
    label: "IRPJ no cenário do distribuidor",
    formula: "1,2% sobre o preço do distribuidor",
    status: "pending-validation",
    why: "PPTX slide 8: revisar IRPJ/CSLL antes de consolidar economia.",
  },
  {
    label: "CSLL no cenário do distribuidor",
    formula: "1,08% sobre o preço do distribuidor",
    status: "pending-validation",
    why: "Mesma ressalva do slide 8.",
  },
  {
    label: "ICMS no cenário do distribuidor",
    formula: "4% sobre o preço do distribuidor",
    status: "pending-validation",
    why: "Premissa da planilha, não confirmação do ICMS da operação.",
  },
  {
    label: "Base da venda direta",
    formula: "87,6% (VALOR DIRETO = V × 87,6%)",
    status: "pending-validation",
    why: "Fator da planilha. O site não deriva PIS/COFINS, margem nem ganho.",
  },
];
