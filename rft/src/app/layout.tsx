import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-exito-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grupo JPG · planejamento tributário (Êxito)",
  description:
    "Apresentação preliminar do Grupo JPG: estrutura atual, proposta de canais e preços de referência. Não substitui parecer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>
        {/*
          THESIS: apresentação executiva, uma pergunta por slide.
          OWN-WORLD: papel #F4F4F4, impacto navy #1D2029, verde na capa (moldura) e em ganho.
          STORY: concentração → arquitetura → fluxos → Age Element → validar → decisão.
          FIRST VIEWPORT: capa branca com filete verde, Grupo JPG, setembro 2026. Sem cards.
          FORM: 100vh; Inter; GSAP reveal uma vez; nav ← →.
        */}
        {children}
      </body>
    </html>
  );
}
