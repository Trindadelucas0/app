# Design

Identidade do deck executivo Grupo JPG. Paleta amostrada dos prints do Êxito HUB (08/09/2026).

## Tokens

| Papel | Hex | Uso |
|-------|-----|-----|
| Accent / ganho | `#2EA44E` | Números positivos, borda dos nós, filete/barra/CTA da capa |
| Navy | `#1D2029` | Slides 09, 10, fecho, texto dos nós |
| Página | `#F4F4F4` | Miolo |
| Superfície | `#FFFFFF` | Capa e nós do mapa |
| Muted | `#7C7C7C` | Kicker no miolo, caption |
| Subtle | `#B0B1B6` | Índice no miolo |
| Alerta | borda coral no disclaimer do 10 | O que o 76,56 **não** inclui |

Verde na capa = moldura 3px, barra 4px, kicker, índice e CTA sólido branco sobre verde. Nós do mapa: branco + borda verde (tracejada se “A definir”). **Não** vira fundo dos slides 02–14.

## Forma

Apresentação 100vh, não app. Scroll-snap mandatory. Índice `01 / 14`. Nav ← → discreta. Sem header sticky, sem drawer. Overlay de entidade é um painel pequeno no slide.

Otimizar 1920 / 1440 / 1366: conteúdo principal cabe no viewport. Mobile empilha o fluxo.

## Tipografia (Inter)

| Papel | Tamanho |
|-------|---------|
| Kicker / índice | 11px, 600, tracking alto, uppercase |
| Caption | 12px |
| Lead | `clamp(0.95rem, 1.3vw, 1.125rem)` |
| Título | `clamp(1.85rem, 4.2vw, 3.35rem)` |
| Capa / fecho | `clamp(2.4rem, 5.6vw, 4.35rem)` |
| Número herói | `clamp(2.75rem, 7vw, 5.5rem)` tabular |

## Hierarquia por slide

Primário = uma pergunta (título) ou um número (09: 357,50 · 10: +76,56). Secundário = um diagrama ou a tabela. Terciário = caption / badge / disclaimer. Sem grade de 4–6 cards de documentação. 01 e 02 não repetem o mesmo mapa.

## Motion

GSAP: reveal vertical curto, uma vez por slide. Count no 357,50 e no +76,56. Sem Framer Motion. `prefers-reduced-motion` mostra o valor final.
