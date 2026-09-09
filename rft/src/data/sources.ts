import type { SourceKey } from "./types";

export const sources: Record<SourceKey, { label: string; meaning: string }> = {
  "pptx-slide-3": {
    label: "PPTX v2, slide 3 — estrutura societária atual",
    meaning:
      "Fotografia inicial do grupo. O próprio slide pede confirmação documental de participações e vínculos.",
  },
  "pptx-slide-4": {
    label: "PPTX v2, slide 4 — estrutura operacional desejada",
    meaning: "Desenho proposto de canais. Material preliminar, não estrutura já implantada.",
  },
  "pptx-slide-5": {
    label: "PPTX v2, slide 5 — distribuidor oficial B2B",
    meaning: "Funções e responsabilidades propostas para o canal de revenda.",
  },
  "pptx-slide-6": {
    label: "PPTX v2, slide 6 — e-commerce B2C",
    meaning: "Canal digital proposto, sem misturar com o B2B.",
  },
  "pptx-slide-7": {
    label: "PPTX v2, slide 7 — royalties e marca",
    meaning: "Licença só com direito efetivo. Royalty não é ferramenta de economia fiscal.",
  },
  "pptx-slide-8": {
    label: "PPTX v2, slide 8 — cenário fiscal por produto",
    meaning:
      "Preços extraídos da aba Análise Cenário Fiscal. IRPJ/CSLL do distribuidor precisam de revisão antes de consolidar economia.",
  },
  "pptx-slide-9": {
    label: "PPTX v2, slide 9 — substância operacional",
    meaning: "A estrutura precisa existir na prática: contratos, pessoas, riscos e controles.",
  },
  "pptx-slide-10": {
    label: "PPTX v2, slide 10 — próximos passos",
    meaning: "Roteiro de implantação. Próxima entrega: cenário numérico validado.",
  },
  "pptx-slide-11": {
    label: "PPTX v2, slide 11 — estrutura recomendada",
    meaning: "Cenário-base para discussão. Holding de Marcas/IP é proposta, não fato atual.",
  },
  "pptx-slide-12": {
    label: "PPTX v2, slide 12 — canal digital fora da JPG",
    meaning: "Hipótese: empresa do Simples importa e vende ao consumidor. Mercadoria não passa pela JPG.",
  },
  "pptx-slide-13": {
    label: "PPTX v2, slide 13 — arquitetura contratual",
    meaning: "Separar contrato comercial de contrato de propriedade intelectual.",
  },
  "pptx-slide-14": {
    label: "PPTX v2, slide 14 — sequência de implantação",
    meaning: "Primeiro estrutura e substância; depois otimização tributária.",
  },
  "quadro-cliente": {
    label: "Quadro fornecido pelo cliente (reunião)",
    meaning:
      "Reproduzido no PPTX e no rascunho manuscrito. Participações e vínculos ainda dependem de documentos.",
  },
  "planilha-analise": {
    label: "Planilha Cenários Fiscais — aba Análise Cenário Fiscal",
    meaning:
      "Fórmulas da planilha (markup, IPI, IRPJ, CSLL, ICMS, base 87,6%). Em revisão — não preenchem o resultado da reunião.",
  },
  "planilha-cenario": {
    label: "Planilha Cenários Fiscais — aba CENÁRIO",
    meaning:
      "Simulação Age Element: tributos e duas margens (preço − tributos vs linha MARGEM). IRPJ/CSLL em revisão. Não é lucro líquido.",
  },
  "reuniao-precos": {
    label: "Dados de referência da reunião",
    meaning:
      "Lista de preços informada para esta apresentação. Não é preço final garantido. Difere em parte do slide 8 do PPTX.",
  },
};
