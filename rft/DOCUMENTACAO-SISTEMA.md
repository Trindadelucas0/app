# Grupo JPG — Documentação do Sistema

| Item | Valor |
|------|--------|
| Versão do sistema | 1.2.3 — Apresentação executiva |
| Última atualização | 08/09/2026 (composição por wireframe: 01≠02, 09=357,50, 10=tabela+76,56) |
| Fonte oficial | Este arquivo |

## 1. Como usar este documento

Fonte única de comportamento deste repositório. Não descreve o Êxito HUB (ERP): isto é uma **apresentação executiva interativa** para reunião, não um sistema, dashboard ou SaaS.

Guia do dia a dia: `docs/como-usar-o-sistema.md` e §8.

## 2. Tecnologias utilizadas

- Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4
- CSS do deck em `src/app/globals.css`
- GSAP (`gsap` + `@gsap/react`): reveal uma vez por slide; count em R$ 357,50 e + R$ 76,56
- Recharts permanece na dependência; o palco 10 usa tabela, não barras
- Sem backend, login, banco ou cálculo fiscal

### 2.1 Histórico de versões

| Versão | Data | Nome | O que mudou |
|--------|------|------|-------------|
| 1.2.3 | 08/09/2026 | Apresentação executiva | Wireframes: capa teaser; 02 três saídas; 03 colunas preenchidas; 04 árvore 2 níveis; 05 card clicável; 06–07 chips; 08 antes/depois da marca; 09 herói 357,50; 10 só tabela+76,56 |
| 1.2.2 | 08/09/2026 | Apresentação executiva | Deck vira mapa: nós brancos com borda #2EA44E; capa JPG no centro; s04 mapa da proposta; +76,56 herói em 09/10; jornada horizontal |
| 1.2.1 | 08/09/2026 | Apresentação executiva | Capa branca com filete verde e botão Começar; 09, 10 e 14 seguem navy |
| 1.2.0 | 08/09/2026 | Apresentação executiva | 14 slides reescritos (uma pergunta cada); expand no próprio slide; Age Element 09–10; Cosmelan fora do palco |
| 1.1.0 | 08/09/2026 | Deck 14 slides | Home vira 14 seções 100vh; sem header/drawer; margens Age Element da aba CENÁRIO |
| 1.0.0 | 08/09/2026 | Apresentação Grupo JPG | Landing completa; paleta amostrada dos prints do Êxito HUB |

## 3. Mapa de telas / conexões

Uma página `/`. Um slide por viewport. Deep links `/{id}` redirecionam para `/#id`.

```
#s01 capa → #s02 concentração → #s03 problema → #s04 arquitetura → #s05 entidades
→ #s06 B2B → #s07 digital → #s08 marca → #s09 produto → #s10 margens
→ #s11 equação → #s12 pilares → #s13 jornada → #s14 fecho
```

Slugs antigos (`/hoje`, `/b2b`, …) caem no slide equivalente (`slides.ts` `legacySlugToSlide`). Sem header, sem Sheet/drawer, sem Landing.

## 4. Papéis e acesso

Não há login. Quem usa: contador (apresenta) e empresário (acompanha). Qualquer pessoa com a URL vê o mesmo conteúdo.

## 5. Índice de rotas e “onde olhar no código”

| Rota | O que é | Onde olhar |
|------|---------|------------|
| `/` | Deck de 14 slides | `src/app/page.tsx`, `src/components/presentation/Presentation.tsx` |
| `/s01` … `/s14` | Redirect para âncora | `src/app/[slug]/page.tsx` |
| `/hoje`, `/b2b`, … | Redirect legado | `src/data/slides.ts` (`legacySlugToSlide`) |
| Dados | Empresas, produtos, cenário Age | `src/data/` |
| Diagramas | Mapa, entidades, trilho com chips | `ArchitectureMap.tsx`, `EntityStage.tsx` |
| Tokens | CSS do deck | `src/app/globals.css` |

## 6. Telas e fluxos (fichas)

### 6.1 Deck `/` — pergunta → slide

| Âncora | Pergunta | Protagonista visual | Conteúdo lastreado | Onde olhar |
|--------|----------|---------------------|--------------------|------------|
| #s01 | O que vamos analisar? | Capa: Grupo JPG + subtítulo; órbita teaser (Importação, B2B, Digital, Marca); CTA Começar | Setembro 2026 · confidencial | `Presentation.tsx` Slide01 |
| #s02 | Onde o dinheiro é gerado hoje? | JPG → Importa / Vende B2B / Vende digital → Um caixa só | Concentração | `Presentation.tsx` Slide02 |
| #s03 | Qual é o problema? | 3 colunas preenchidas: Operação, Canal, Ativo | “Não é vender. É concentrar.” | `Presentation.tsx` Slide03 |
| #s04 | Como pode ficar? | Árvore 2 níveis: ANW → IP + JPG → Licença / B2B / B2C | Proposta, não fato | `Presentation.tsx` Slide04 |
| #s05 | Quem faz o quê? | 4 cards clicáveis; overlay faz/ganha/assume | `companies.ts` + quadro | `EntityStage.tsx` |
| #s06 | Como o dinheiro passa no B2B? | Trilho + chips receita/margem/tributo/risco | Sem R$ | `MoneyRail` |
| #s07 | Como no digital? | Intervalue → SN → Site → Consumidor + faixa “não mistura com B2B” | Mercadoria não passa pela JPG | `Presentation.tsx` Slide07 |
| #s08 | Onde entra a marca? | Hoje JPG+marca → Proposta Holding IP + licenças | Sem R$ royalty. RIR/2018 | `Presentation.tsx` Slide08 |
| #s09 | O que acontece com um produto real? | Herói **R$ 357,50**; colunas 313,17 vs 357,50 | Age Element; badge simulação | `ageScenario.ts` |
| #s10 | O que acontece com a margem? | Herói **+76,56** + tabela; Margem A só na nota | Ver §6.1.1. Sem barras A/B no palco | `Presentation.tsx` Slide10 |
| #s11 | De onde vem o ganho? | Árvore tributos/margem/eficiência → bruto → −estrutura −transição → líquido A VALIDAR | Sem R$ inventado | `Presentation.tsx` Slide11 |
| #s12 | O que precisa existir de verdade? | 4 colunas; uma frase abaixo ao clicar | “Não basta criar empresas.” | `slides.ts` `pillars` |
| #s13 | Como chegamos à execução? | Só verbos; Simular destacado | `journeySteps` | `Presentation.tsx` Slide13 |
| #s14 | Qual é a decisão? | Hoje: uma JPG → Proposta: IP / JPG / B2B / B2C | Próxima etapa com o contador | `Presentation.tsx` Slide14 |

#### Navegação e expand

| Campo | Como funciona | Onde olhar |
|-------|---------------|------------|
| Começar a apresentação | Link para `#s02` na capa | `Presentation.tsx` Slide01 |
| ← → | Botões fixos discretos | `Presentation.tsx` |
| Teclado | Setas e Space avançam; Esc fecha o expand | `Presentation.tsx`, `EntityStage.tsx` |
| Índice | `01 / 14` canto do slide | `SlideFrame.tsx` |
| Overlay | Clique no card no 05 abre painel no próprio slide. Esc fecha. Sem Sheet/drawer | `EntityStage.tsx` |
| GSAP | Fade/slide uma vez por slide; count no 357,50 e no +76,56; `prefers-reduced-motion` | `Presentation.tsx` |

#### 6.1.1 Slides 09–10 — Age Element (única história de R$)

Fonte: aba CENÁRIO da planilha + PPTX slide 8. Badge: simulação em revisão.

| Campo | Valor | O que é | Regra |
|-------|-------|---------|-------|
| Preço final / revenda | R$ 357,50 | Preço de tela, igual nos dois cenários | Não inventar outro preço de palco |
| Venda aba CENÁRIO (hoje) | R$ 313,17 | Linha de venda da planilha | Rotular à parte do 357,50 |
| IPI / IRPJ / CSLL / ICMS hoje | 44,78 (14,3%) / 3,76 (1,20%) / 3,38 (1,08%) / 12,53 (4,00%) | Simulação | Em revisão |
| Tributos hoje | R$ 64,45 | Soma da aba | Em revisão |
| Margem A | R$ 293,05 | 357,50 − 64,45 | Não é lucro; custo não abatido |
| Margem B hoje | R$ 248,72 (79,4% de 313,17) | Linha MARGEM da planilha | Não é lucro líquido |
| Com distribuidor: venda | R$ 357,50 | Aba CENÁRIO | Em revisão |
| IPI / IRPJ / CSLL / ICMS dist. | 11,72 (3,28%) / 5,27 (1,48%) / 0,92 (0,26%) / 14,30 (4,00%) | Simulação | Em revisão |
| Tributos dist. | R$ 32,21 | Soma derivada dos quatro | Badge simulação |
| Margem B distribuidor | R$ 325,28 (91,0% de 357,50) | Linha MARGEM | Não é lucro líquido |
| Δ Margem B | R$ 76,56 · +11,6 p.p. | 325,28 − 248,72 | Indicador **por unidade**, não economia anual |

**Guarda de margens:** não titular “diferença” entre Margem A (293,05) e Margem B (248,72). Comparar só pares iguais (B com B).

**Cosmelan:** permanece em `products.ts` / `ageScenario.ts` `cosmelanPrices`. **Fora do palco** — não há slide de Cosmelan neste deck.

## 7. Regras de negócio

1. Não inventar alíquota, tributo, royalty em R$, custo de estrutura nem economia líquida / anual.
2. Margens na tela só as do Age Element acima, sempre com badge de simulação em revisão.
3. Cosmelan 2 não aparece nos 14 slides. Sem barras 250/145.
4. Sem R$ 750,01 na cascata.
5. ANW 90% / Newton 10% na JPG = quadro do cliente, status validação documental.
6. Pessoa no Simples = pessoa indicada, não sócia presumida.
7. Intervalue = fornecedor/export, não sócia da holding.
8. Distribuidor, e-commerce e Holding de Marcas/IP = proposta, não fato.
9. Royalty não é ferramenta de imposto (PPTX slides 7 e 13; RIR/2018).
10. Clique no card no 05 = overlay no próprio slide. Sem painel lateral / Sheet.
11. Verde `#2EA44E`: na capa, moldura 3px, barra superior 4px, kicker, índice e CTA sólido (texto branco). Nos demais slides, borda dos nós do mapa e ganho (76,56). Sem login. Sem fundo verde chapado. Sem `--exito-green-ink` na capa.

### Paleta

| Token | Hex | Uso |
|-------|-----|-----|
| Verde Êxito | `#2EA44E` | Filete e barra da capa; CTA da capa; borda dos nós; ganho (76,56) |
| Marinho | `#1D2029` | Fecho, slides 09–10, texto dos nós |
| Página | `#F4F4F4` | Miolo |
| Card | `#FFFFFF` | Capa e preenchimento dos nós |

### Hierarquia de tipo (`globals.css`)

| Papel | Tamanho |
|-------|---------|
| Kicker / índice | 11px, tracking alto, uppercase |
| Caption | 12px |
| Lead | `clamp(0.95rem, 1.3vw, 1.125rem)` |
| Título | `clamp(1.85rem, 4.2vw, 3.35rem)` |
| Título capa/fecho | `clamp(2.4rem, 5.6vw, 4.35rem)` |
| Número herói | `clamp(2.75rem, 7vw, 5.5rem)` tabular |

## 8. Como usar o sistema (guia do dia a dia)

Ver também `docs/como-usar-o-sistema.md`.

1. `npm run dev` e abrir `http://localhost:3000`.
2. Projetar a tela. A capa (slide 01) é branca com filete verde e JPG no centro. Clique em **Começar a apresentação** ou avance com →, Space ou seta direita.
3. Narrativa na sala: 02 três saídas / um caixa → 03 Operação/Canal/Ativo → 04 árvore 2 níveis → 05 clique nas entidades → 06–07 camadas → 08 marca sai → **09 = 357,50** → **10 = +76,56 e tabela** → 11 árvore a validar → 12 uma frase por pilar → 13 verbos → 14 uma JPG vs IP/JPG/B2B/B2C.
4. No 10, dizer em voz alta: Margem A não abate custo; Margem B é a linha da planilha; o +76,56 compara só B com B; IRPJ/CSLL em revisão; não é economia anual.
5. Não ler Cosmelan, R$ 750, royalty em reais, nem “inteligência tributária nasce da organização operacional”.

## 9. Checklist de validação

- [ ] Home abre como deck, sem sidebar, sem header de app, sem drawer/Sheet
- [ ] 14 slides, âncoras `s01`–`s14`, índice `NN / 14`
- [ ] Capa branca, JPG no centro, CTA verde sólido; 09, 10 e fecho navy
- [ ] Age Element: 09 herói 357,50; 10 herói +76,56; tabela 248,72 / 325,28; 293,05 só na nota
- [ ] Nós: fundo branco, borda #2EA44E, “A definir” tracejado
- [ ] Sem 750,01 e sem Cosmelan no palco
- [ ] Clique no card 05; Esc fecha
- [ ] `npm run build` passa

## 10. Segurança (só o que existe)

Site estático. Sem auth, upload, API própria ou secrets. Headers: `nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`. Sem `dangerouslySetInnerHTML`.

## 11. Deploy / ambiente (sem secrets)

```
npm install
npm run dev    # http://localhost:3000
npm run build
```

Não há `.env` obrigatório.

## 12. Ao atualizar este documento

Se mudar slide, regra de dado, token de cor ou rota: atualizar capa, §2.1, ficha, regras e guia na mesma entrega.
