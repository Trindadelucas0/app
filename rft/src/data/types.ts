export type DataStatus =
  | "confirmed"
  | "simulation"
  | "pending-validation"
  | "not-informed";

export type Timeframe = "hoje" | "proposto" | "referencia";

export type SourceKey =
  | "pptx-slide-3"
  | "pptx-slide-4"
  | "pptx-slide-5"
  | "pptx-slide-6"
  | "pptx-slide-7"
  | "pptx-slide-8"
  | "pptx-slide-9"
  | "pptx-slide-10"
  | "pptx-slide-11"
  | "pptx-slide-12"
  | "pptx-slide-13"
  | "pptx-slide-14"
  | "quadro-cliente"
  | "planilha-analise"
  | "planilha-cenario"
  | "reuniao-precos";

export type Metric = {
  label: string;
  value: string;
  status: DataStatus;
  why: string;
};

export type DetailPayload = {
  id: string;
  title: string;
  timeframe: Timeframe;
  functionLabel: string;
  context: string;
  numbers: Metric[];
  breakdown: Metric[];
  responsibilities: string[];
  accountantNote?: string;
  source: SourceKey;
};
