import type { DataStatus, SourceKey } from "./types";

export type Product = {
  id: string;
  name: string;
  distributor: number;
  retail: number;
  status: DataStatus;
  source: SourceKey;
  note: string;
  pptxSlide8?: { distributor: number; retail: number };
};

export const products: Product[] = [
  {
    id: "age-element",
    name: "Age Element Anti-Wrinkle",
    distributor: 81.96,
    retail: 357.5,
    status: "simulation",
    source: "reuniao-precos",
    note: "Coincide com o PPTX slide 8 e com a planilha para este SKU (T-DAWS0005).",
    pptxSlide8: { distributor: 81.96, retail: 357.5 },
  },
  {
    id: "melan-recovery",
    name: "Melan Recovery",
    distributor: 119.42,
    retail: 483.7,
    status: "simulation",
    source: "reuniao-precos",
    note: "A reunião usa estes valores. O PPTX slide 8 / planilha trazem R$ 45,85 / R$ 211,12.",
    pptxSlide8: { distributor: 45.85, retail: 211.12 },
  },
  {
    id: "dermamelan",
    name: "Dermamelan Treatment",
    distributor: 136.98,
    retail: 547.92,
    status: "simulation",
    source: "reuniao-precos",
    note: "A reunião usa estes valores. O PPTX slide 8 / planilha trazem R$ 238,91 / R$ 812,50.",
    pptxSlide8: { distributor: 238.91, retail: 812.5 },
  },
  {
    id: "cosmelan-2",
    name: "Cosmelan 2",
    distributor: 181.14,
    retail: 714.35,
    status: "simulation",
    source: "reuniao-precos",
    note: "Coincide com o PPTX slide 8 e com a planilha para este SKU (T-DPIG0008).",
    pptxSlide8: { distributor: 181.14, retail: 714.35 },
  },
  {
    id: "mesoprotech",
    name: "Mesoprotech Sun Stick",
    distributor: 79.16,
    retail: 328.5,
    status: "simulation",
    source: "reuniao-precos",
    note: "A reunião usa estes valores. O PPTX slide 8 / planilha trazem R$ 25,78 / R$ 110,50.",
    pptxSlide8: { distributor: 25.78, retail: 110.5 },
  },
];

export const defaultProductId = "age-element";
