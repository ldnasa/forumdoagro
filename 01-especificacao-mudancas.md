# Especificação de Mudanças — Fórum do Agronegócio 2027

> Este documento é a fonte de verdade das alterações. O design base vem do
> Figma (via Code Connect). Cada seção abaixo diz se é **MANTER DO FIGMA**
> (recorte fiel via `figma-to-tailwind`) ou **CONSTRUIR/ALTERAR** (estrutura
> nova, ref indicada). Onde aparece `[PLACEHOLDER]`, é conteúdo de exemplo
> que o Caio troca depois.

---

## Contexto

- Site existente: forumdoagronegocio.com (edição 2025)
- Objetivo: front-end novo e navegável para aprovação do cliente
- Depois passa para os devs de back-end da agência reconectarem dados
- Entrega: 3 arquivos navegáveis entre si
  - `index.html` (home)
  - `programacao.html` (grade completa)
  - `ingressos.html` (cards de ingresso + happy hour)
- Edição: 2027. Todas as datas, preços e contagens são placeholder.
- Stack: HTML5 + Tailwind + vanilla JS + Google Fonts
- Conteúdo estático (sem CMS nesta fase)

---

## Princípio de divisão do trabalho

| Origem | O que fazer |
|---|---|
| MANTER DO FIGMA | Recorte pixel-perfect via `figma-to-tailwind`. Não recriar. |
| CONSTRUIR/ALTERAR | Estrutura não existe no Figma. Construir seguindo a ref e os tokens do design system extraídos do Figma (mesmas cores, fontes, radius, sombras). |

Regra de ouro do visual nas seções novas: **reaproveitar os tokens do
Figma** (cores, tipografia, espaçamento, radius) para que as seções
construídas pareçam parte do mesmo site, não enxertos.

---

## HOME (`index.html`) — seção por seção

### 1. Header / Menu — ALTERAR
- Base: header do Figma.
- Mudança: **remover "Ingressos" da lista de links** do menu de navegação.
- Manter apenas o **botão de ingresso no canto direito** (já existe).
- Demais links seguem o Figma.

### 2. Hero — banner em vídeo — ALTERAR (novo formato)
- Ref: CMO Summit (banner com vídeo de fundo).
- Vídeo de fundo em loop, `muted`, `autoplay`, `playsinline`, com `poster`.
- **Arquivo de vídeo é dummy trocável**: usar `assets/video/hero-placeholder.mp4`
  e deixar comentário `<!-- TROCAR: vídeo final do banner -->`.
- Overlay escuro sutil sobre o vídeo para legibilidade do texto.
- Por cima: H1 (proposta de valor), subtítulo, CTA principal.
- Copy: ver bloco "Copy" abaixo.

### 3. Contador regressivo — CONSTRUIR (novo)
- **Barra fina fixa logo abaixo do header** (sticky), aparece após o hero.
- Conta regressiva até a data do evento: `[PLACEHOLDER: 2027-09-04T09:00:00]`.
- Formato: dias / horas / minutos / segundos.
- **Estado controlado por flag JS** no topo do script:
  ```js
  const vendasAbertas = false; // true = mostra botão de ingresso junto ao contador
  ```
  - `false`: barra mostra só o contador.
  - `true`: barra mostra contador + botão "Garantir ingresso" ao lado.
- O botão de ingresso da barra **não duplica** o do header — quando a barra
  está visível com vendas abertas, é a mesma ação (link para `ingressos.html`).

### 4. Números do evento — ALTERAR (novo formato)
- Ref: CMO Summit (cards com foto + número).
- Vira **grid de cards**, cada card com:
  - Foto da edição anterior (`assets/img/numeros-0X.jpg`, placeholder)
  - Número grande com **animação fade-in + count-up** ao entrar na viewport
    (IntersectionObserver, vanilla JS)
  - Legenda
- Conteúdo placeholder (manter os números atuais como exemplo):
  - `[+2000]` participantes presenciais
  - `[+50]` palestrantes e painelistas
  - `[+50]` patrocinadores e parceiros institucionais

### 5. Sobre o evento — ALTERAR (novo formato)
- Ref: seção "Sobre" do Gaffff (foto + texto lado a lado).
- Layout: foto de um lado, bloco de texto do outro.
- Texto: manter o texto institucional atual como base (ver Copy).

### 6. Programação (chamada na home) — ALTERAR + nova página
- Na home: **bloco-resumo em formato tabela** + CTA "Ver programação completa"
  → `programacao.html`.
- Mostrar um recorte da grade (ex: os horários/painéis principais do dia),
  não a grade inteira.
- Ref: modelo Gaffff.

### 7. Palestrantes — MANTER DO FIGMA
- Grid de cards com modal "ver mais". Recorte fiel.
- Conteúdo: o que estiver no Figma. Caio troca depois se for 2025.

### 8. Seja Patrocinador (CTA) — ALTERAR (reposicionar)
- **Vem ANTES da seção de patrocinadores.**
- Apenas um bloco de CTA com botão (texto + botão "Quero patrocinar").
- Sem formulário aqui (o formulário/modal de mídia kit pode seguir o Figma se existir).

### 9. Patrocinadores (logos) — CONSTRUIR com TOGGLE A/B
- **Duas versões alternáveis por um toggle visível** (para o Caio demonstrar):
  - **Versão A — fundo escuro** (ref CMO Summit): logos sobre fundo escuro,
    organizados por cota (Master, Premium, Plus, etc.).
  - **Versão B — fundo branco sem tarja** (ref brasil.tastefestivals.com):
    logos sobre fundo branco contínuo, sem faixa/divisória.
- Toggle: dois botões "Versão Escura / Versão Clara" no topo da seção que
  alternam via JS (mostra/oculta `.patrocinadores-dark` / `.patrocinadores-light`).
- Manter as mesmas cotas/logos nas duas (placeholder dos logos atuais).

### 10. Local — ALTERAR (ajuste leve)
- Manter estrutura do Figma.
- Único ajuste: **aumentar a foto do parque** (Parque Ney Braga).
- Manter botões Waze / Google Maps.

### 11. Rodapé — MANTER DO FIGMA
- Recorte fiel. Manter crédito Londrina S/A.

---

## PÁGINA: Programação (`programacao.html`) — CONSTRUIR

- Ref: https://gaffff.com/programacao2026/
- Estrutura seguindo 100% o modelo Gaffff:
  - **Abas por dia** (ex: Dia 1 / Dia 2 — placeholder de datas 2027).
  - Filtro/seletor de experiência se aplicável (Gaffff separa Palestras/Shows;
    para o Fórum, provavelmente só painéis — adaptar: pode não precisar do filtro).
  - **Grade em tabela** por faixa de horário, com painel, palco (se houver),
    moderador e palestrantes.
  - Cada item clicável abre detalhe (modal ou expand) com palestrantes.
- Conteúdo: usar a programação atual de 2025 como placeholder de exemplo
  (já tem painéis, horários, moderadores e palestrantes — bom material dummy).
- Header e rodapé: mesmos do `index.html`.

---

## PÁGINA: Ingressos (`ingressos.html`) — CONSTRUIR

- Ref: página de ingressos do Gaffff (cards de ingresso).
- **Cards de ingresso**, um por tipo. Placeholder dos tipos atuais:
  - `[Ingresso Sócio SRP — R$ XXX]`
  - `[Ingresso Empresarial Sócio — R$ XXX]`
  - `[Ingresso Não-Sócio — R$ XXX]`
  - `[Ingresso Empresarial Não-Sócio — R$ XXX]`
  - `[Ingresso Estudante — R$ XXX]`
  - `[Programa Agro+ — gratuito, estudantes]`
- Cada card: nome do ingresso, preço placeholder, o que inclui, botão "Comprar"
  (link placeholder → Sympla ou `#`).
- **Happy Hour como destaque nesta página** (saiu da home):
  - Bloco em destaque: "O Fórum se encerra com um brinde" + detalhes
    (a partir das 17h30, mesmo local, música ao vivo).
  - Pode incluir o patrocinador do happy hour aqui.
- Header e rodapé: mesmos do `index.html`.

---

## Animações e efeitos (pedido do cliente: "querem animação e efeitos")

Aplicar com moderação, sempre vanilla JS + CSS, respeitando performance:
- Fade-in + count-up nos números (seção 4).
- Fade-in / slide-up suave nas seções ao entrar na viewport (IntersectionObserver).
- Hover states nos cards (palestrantes, ingressos, patrocinadores).
- Scroll suave entre âncoras.
- Transição suave no toggle de patrocinadores.
- Vídeo do hero com leve zoom/ken-burns opcional no poster enquanto carrega.
- **Respeitar `prefers-reduced-motion`**: desligar animações para quem pede.

---

## Copy (ajustes mínimos — base é o site atual)

A maior parte da copy institucional vem do Figma/site atual. Ajustes:

**Hero (H1)** — manter a linha do evento. Exemplo placeholder mantendo o tom:
- H1: `Agro 360: competitivo, sustentável e bem compreendido`
- Subtítulo: `[data placeholder] · Parque Ney Braga Eventos · Londrina - PR`
- CTA: `Garantir ingresso`

**Seja Patrocinador (CTA)**:
- Manter texto atual: posicionar a marca ao lado das grandes lideranças do
  setor, visibilidade qualificada, etc.
- Botão: `Quero patrocinar`

**Programação (chamada home)**:
- Título: `Programação`
- CTA: `Ver programação completa`

**Regras de copy**: sem jargão vazio, sem em-dash (usar `-`), CTAs específicos.
