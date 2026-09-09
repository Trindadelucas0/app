/**
 * Aba "CENARIO " da planilha, produto Age Element (preço de tela 357,50).
 * PPTX slide 8: revisar IRPJ/CSLL antes de consolidar economia.
 *
 * Margem A (293,05) = preço de revenda − tributos desta aba. Custo não abatido.
 * Margem B (248,72 / 325,28) = linha MARGEM da planilha. Não é lucro líquido.
 */
export const ageElementScenario = {
  productName: "Age Element Anti-Wrinkle",
  prices: {
    distributor: 81.96,
    retail: 357.5,
    status: "simulation" as const,
    source: "PPTX slide 8 + lista da reunião",
  },
  atual: {
    vendaPlanilha: 313.17,
    ipi: 44.78,
    irpj: 3.76,
    csll: 3.38,
    icms: 12.53,
    tributos: 64.45,
    margemLinhaPlanilha: 248.72,
    margemPrecoMenosTributos: 293.05,
  },
  comDistribuidor: {
    venda: 357.5,
    ipi: 11.72,
    irpj: 5.27,
    csll: 0.92,
    icms: 14.3,
    tributos: 32.21,
    margemLinhaPlanilha: 325.28,
  },
  /** 325,28 − 248,72. Indicador por unidade, não economia anual. */
  deltaMargemB: 76.56,
  /** 248,72 / 313,17 da planilha. */
  pctMargemBAtual: 79.4,
  /** 325,28 / 357,50 da planilha. */
  pctMargemBDist: 91.0,
  deltaMargemBPp: 11.6,
  taxRatesAtual: { ipi: 14.3, irpj: 1.2, csll: 1.08, icms: 4 },
  taxRatesDist: { ipi: 3.28, irpj: 1.48, csll: 0.26, icms: 4 },
  disclaimer:
    "O que este número não inclui: volume anual desse produto (para virar um total de grupo), custo de manter a segunda empresa, e confirmação das alíquotas de IRPJ/CSLL usadas no cenário com distribuidor — que dependem do regime tributário em que o distribuidor for enquadrado. Sem essas três coisas, R$ 76,56 é um indicador por unidade, não uma economia anual confirmada. IRPJ/CSLL em revisão (PPTX slide 8).",
};

export const cosmelanPrices = {
  name: "Cosmelan 2",
  distributor: 181.14,
  retail: 714.35,
  source: "PPTX slide 8",
};
