# CLAUDE.md - Fórum do Agronegócio 2027

## DO THIS FIRST

Este projeto é uma **reconstrução de front-end para aprovação**, com design
vindo do Figma via Code Connect. Não há fase de design system do zero nem
geração de referências visuais: o Figma é a fonte de verdade do visual.

Ordem de trabalho:
1. Ler `01-especificacao-mudancas.md` por completo. É a fonte de verdade.
2. Para cada seção marcada **MANTER DO FIGMA**: usar a skill
   `figma-to-tailwind` para recorte fiel.
3. Para cada seção **CONSTRUIR/ALTERAR**: construir a estrutura nova seguindo
   a ref indicada, reaproveitando os tokens do Figma (cores, fontes, radius,
   sombras) extraídos via `get_variable_defs`.
4. Montar os 3 arquivos navegáveis entre si.
5. Validar cada seção contra o screenshot do Figma (Fase 5 da skill).

---

## Entregáveis

Três arquivos HTML navegáveis entre si:
- `index.html` - home com todas as alterações
- `programacao.html` - grade completa (modelo Gaffff)
- `ingressos.html` - cards de ingresso + happy hour em destaque

Header e rodapé idênticos nas três páginas.

---

## Tech Stack

- HTML5 semântico
- Tailwind CSS
- Vanilla JavaScript (sem frameworks, sem jQuery, sem libs externas)
- Google Fonts

Stack fixo da agência. Não introduzir dependências sem aprovação do Caio.

---

## Acesso ao Design (Figma Code Connect)

- O design é acessado via **Dev Mode MCP server** (`dev-mode-mcp-server-dxt`).
- Caio fornece o link do node ou seleciona o frame no Figma Desktop.
- Ferramentas: `get_screenshot`, `get_design_context`, `get_variable_defs`,
  `get_code_connect_map`, `get_metadata`.
- Montar `tailwind.config.js` a partir das Figma Variables (ver skill).

Atenção: o Figma traz o **layout antigo (2025)**. As seções novas
(banner vídeo, contador, cards de números, programação-tabela, página de
ingressos, patrocinadores A/B) **não existem no Figma** - construir do zero
seguindo as refs, mas com os tokens do Figma.

---

## Refs das seções novas

| Seção | Referência |
|---|---|
| Banner vídeo | CMO Summit |
| Cards de números (fade-in) | CMO Summit |
| Seção sobre (foto + texto) | Gaffff |
| Programação (tabela + página) | gaffff.com/programacao2026 |
| Página de ingressos (cards) | Gaffff |
| Patrocinadores versão escura | CMO Summit |
| Patrocinadores versão clara | brasil.tastefestivals.com |

Screenshots dessas refs em `refs/` (Caio coleta antes do build).

---

## Placeholders (NÃO esquecer de sinalizar)

Tudo abaixo é exemplo. Marcar visível no código com comentário:
- Datas do evento (edição 2027) - `[PLACEHOLDER]`
- Preços dos ingressos - `[PLACEHOLDER]`
- Contagens da seção números - manter atuais como exemplo
- Vídeo do hero - dummy `assets/video/hero-placeholder.mp4`, comentar `TROCAR`
- Data-alvo do contador regressivo - `[PLACEHOLDER: 2027-09-04T09:00:00]`

---

## Comportamentos especiais

- **Contador regressivo**: barra fina fixa sob o header (sticky após hero).
  Flag JS `vendasAbertas` (true/false) controla se mostra o botão de ingresso
  junto. Não duplicar o botão do header.
- **Patrocinadores**: toggle A/B visível (Versão Escura / Versão Clara) que
  alterna as duas seções via JS.
- **Animações**: fade-in/slide-up nas seções, count-up nos números, hover nos
  cards, scroll suave. Sempre respeitar `prefers-reduced-motion`.

---

## Coding Conventions

- HTML5 semântico (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Mobile-first responsivo (base 375px)
- Um H1 por página
- Navegação entre as 3 páginas com `<a href>` reais (não é wireframe)
- `loading="lazy"` em imagens below-fold
- `rel="noopener noreferrer"` em links externos
- Tokens do Figma via config do Tailwind; arbitrary values só para one-offs
- Comentários só quando a intenção não é óbvia

---

## Copy Rules

- Sem jargão vazio (inovador, disruptivo, soluções, etc.)
- Sem em-dash (`—`). Usar `-` ou reescrever.
- CTAs específicos, nunca "Saiba mais" sozinho.

---

## Credits

Fase de estrutura: Claude Web. Build: Claude Code + `figma-to-tailwind`.
Designer: Caio Augusto Liutti - Londrina S/A.
