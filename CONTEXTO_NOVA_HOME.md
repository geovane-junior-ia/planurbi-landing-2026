# PlanUrbi — Nova Landing Page 2026

> Documento de contexto para continuidade do projeto.
> Última atualização: **2026-06-25**

## Histórico de iterações

### Iteração 2 — 2026-06-25 (8 ajustes pedidos pela equipe)

Em resposta ao docx `____MODIFICOES-PARA-SITE\Site_Planurbi.docx`:

1. ✅ Hero: "A PlanUrbi" → "O PlanUrbi"
2. ✅ Painel estratégico: "2 casos" → "2 projetos"
3. ✅ Formulário: opção "Turismo" adicionada ao select
4. ✅ Soluções: Turismo separado de Mobilidade como novo eixo dedicado
5. ✅ Cards de Soluções clicáveis (anchor) + nova seção **"Detalhes das Soluções"** com lead, produtos, base legal e CTA por eixo
6. ✅ Nova seção **"Equipe Técnica"** entre Quem Somos e Soluções, com 4 cards placeholder
7. ✅ Diagnóstico: texto enganoso ("Marque o que ressoa") trocado por chamada coerente
8. ✅ Cards de Conteúdo: deixam de levar para #contato (estava quebrado); indicam "Em breve" com badge

**Outros ajustes técnicos:**
- Card "Diagnóstico personalizado" removido do grid de Soluções (não era eixo)
- Grid agora tem 6 cards (5 eixos + Turismo) — distribui perfeitamente
- Cada solução ganhou campo `slug` para anchor scrolling
- `scroll-margin-top` para header sticky não cobrir título de detalhe

**Commit:** `42e30cf feat: 8 ajustes da equipe + Detalhes das Soluções + Equipe Técnica`

### Iteração 1 — 2026-05-21 (MVP)

Construção inicial da nova landing com 10 seções fotorrealistas estilo Praxis BH.
Commit principal: `d08ee37`. Fix de contraste do eyebrow: `92e509b`.

---

## 1. Visão Geral

Reconstrução completa da Home institucional do PlanUrbi com direção visual inspirada na [Praxis BH](https://praxisbh.com.br/) — fotorrealismo, hierarquia tipográfica forte, leitura técnica/institucional para apoiar gestão municipal.

### Status atual

- ✅ **MVP da Home pronto e publicado** em URL pública para revisão da equipe
- ⏳ Aguardando feedback do grupo PlanUrbi antes de integrar à produção
- 🔒 Site oficial (`planurbi.com.br`) **intocado** — esta é uma versão paralela em ambiente de preview

---

## 2. URLs e Acessos

| O quê | Onde |
|---|---|
| 🌐 **Site de preview (público)** | https://planurbi-landing-2026.vercel.app |
| 📦 **Repo de preview (público)** | https://github.com/geovane-junior-ia/planurbi-landing-2026 |
| 🏛️ **Repo de produção (privado)** | https://github.com/PlanUrbi/Landing-Page |
| 🔀 **Branch da nova Home no repo de produção** | `feat/nova-home-2026` |
| 🚀 **Dashboard de deploy** | https://vercel.com/geovane-junior-s-projects/planurbi-landing-2026 |
| 🌍 **Site em produção (não tocar)** | https://planurbi.com.br |

### Fluxo de deploy automático

`git push apresenta feat/nova-home-2026:main` → Vercel detecta → re-builda → atualiza preview em ~2 min.

O remote `apresenta` aponta para `github.com/geovane-junior-ia/planurbi-landing-2026`.

---

## 3. Stack Técnica

- **Framework:** Next.js 15.4.8 (App Router) + React 19 + TypeScript
- **Estilização:** CSS Modules (sem Tailwind, sem styled-components)
- **Backend leve:** Firebase + Firebase Admin (para áreas de admin, seminário, editais — não tocadas)
- **Animações:** Framer Motion (instalado, ainda não usado na nova Home)
- **Smooth scroll:** Lenis (instalado, ainda não usado)
- **Outros:** jspdf (relatórios admin), react-icons, xlsx

### Fontes locais (em `/public/fonts/`)

- **Anek Devanagari** (variable, 100-900) → títulos (`var(--font-display)`)
- **Hauora** (7 pesos) → corpo (`var(--font-body)`)

Registradas via `next/font/local` em [src/app/layout.tsx](src/app/layout.tsx).

### Paleta (tokens em `globals.css`)

| Token | Cor | Uso |
|---|---|---|
| `--planurbi-green-900` | `#00362D` | Fundo hero, header sólido, blocos institucionais |
| `--planurbi-green-700` | `#0B5A4B` | Hover, destaques |
| `--planurbi-green-500` | `#1C8B7D` | Indicadores, chips, ícones |
| `--planurbi-sand-300` | `#E8D4B9` | CTAs, acentos, eyebrows sobre fundo escuro |
| `--planurbi-ink-900` | `#172D28` | Texto principal |
| `--planurbi-cream-100` | `#FDFAF6` | Fundo principal claro |

Lista completa em [src/app/globals.css](src/app/globals.css).

---

## 4. Arquitetura da Nova Home

### Arquivos principais

- [src/app/page.tsx](src/app/page.tsx) — renderiza Header + NewHome + Footer
- [src/app/layout.tsx](src/app/layout.tsx) — fontes locais, metadados SEO, AuthProvider
- [src/app/globals.css](src/app/globals.css) — tokens do design system
- [src/components/NewHome.tsx](src/components/NewHome.tsx) — todo o conteúdo das 10 seções
- [src/components/NewHome.module.css](src/components/NewHome.module.css) — estilização completa
- [src/components/Header.tsx](src/components/Header.tsx) + [Header.module.css](src/components/Header.module.css) — sticky transparente → cream
- [src/components/Footer.tsx](src/components/Footer.tsx) + [Footer.module.css](src/components/Footer.module.css) — verde-900 com grafismo

### As 10 seções da Home

| # | Seção | Função | Ativo principal |
|---|---|---|---|
| 1 | **Hero fullbleed** | Headline + CTAs sobre foto urbana | `/noticias/barra.jpg` (vista aérea Barra de São Miguel) |
| 2 | **Pilares strip** | 4 cards flutuantes (Território, Gestão, Participação, Execução) | Ícones boxicons |
| 3 | **Quem Somos** | Painel verde-900 + 4 valores numerados | `/planurbi-visuals/territorial-intelligence.png` |
| 4 | **Soluções (6 eixos)** | Grid 3×2 com 6 cards (5 eixos + Turismo). Cada card é clicável → leva ao anchor `#detalhe-{slug}` | 6 imagens de `/planurbi-visuals/` |
| 4b | **Detalhes das Soluções** (nova em it.2) | Para cada eixo: lead, produtos entregáveis, base legal e CTA "Solicitar diagnóstico nesse eixo" | mesmas imagens dos eixos |
| 3b | **Equipe Técnica** (nova em it.2) | 4 cards placeholder (Coordenação, Planejamento, Geotec, Habitação) | avatar SVG inline |
| 5 | **"Seu município precisa de quê?"** | 6 problemas + CTAs em fundo verde | Grafismo de mapa sutil |
| 6 | **Metodologia** | Timeline horizontal de 6 etapas | Visual em verde escuro |
| 7 | **Projetos (Cases)** | 2 cases alternados (Barra + Craíbas) | `/noticias/audiencia.jpg` + `/noticias/craibas.png` |
| 8 | **Autoridade técnica** | Stats + competências + foto do seminário | `/noticias/seminario.jpg` |
| 9 | **Conteúdo (Insights)** | 3 cards editoriais | SVGs + thumbnails |
| 10 | **Contato** | Formulário + canal direto | Fundo verde-900 |

---

## 5. O Que NÃO Foi Tocado (Importante!)

Tudo abaixo continua funcionando como antes — não alterar sem avaliação:

- `src/app/admin/**` — painel administrativo (Firebase Auth)
- `src/app/_seminario/**` + `src/app/_credenciamento/**` + `src/app/_selecao-campo/**` + `src/app/_relatorios/**`
- `src/app/editais/**` + `src/app/noticias/**`
- `src/contexts/AuthContext.tsx`, `src/components/auth/**`
- Componentes específicos de seminário: `Hero.tsx` (antigo, do seminário), `ObjectiveSection`, `HowItWorksSection`, `WorkshopsSection`, `BenefitsSection`, `ExpectedResultsSection`, `AudienceSection`, `CallToActionSection`, `TransparencySection`, `BannerModal`, `QuestionForm`, `QuestionCard`, `TwitchEmbed`, `EditalCard`, `ui/ModernTimeline`
- `.github/workflows/deploy.yml` — pipeline de deploy para `planurbi.com.br` via Dokploy (não dispara em branches que não sejam `main`/`master`)

### Como reverter a nova Home

Trocar **1 linha** em [src/app/page.tsx](src/app/page.tsx):

```tsx
// De:
import { NewHome } from "@/components/NewHome";
// ...
<NewHome />

// Para:
import { InstitutionalHome } from "@/components/InstitutionalHome";
// ...
<InstitutionalHome />
```

> **Nota:** O arquivo `InstitutionalHome.tsx` foi deletado neste branch. Para reverter, basta `git checkout main -- src/components/InstitutionalHome.tsx src/components/InstitutionalHome.module.css` ou voltar para a `main`.

---

## 6. Pendências Pós-MVP

Ordenadas por prioridade prática:

### 🔥 Alta — antes de ir pra produção

- [ ] **Conectar formulário de contato** — hoje só dá alert. Recomendação: salvar no Firebase (coleção `contatos-landing`) + notificação por e-mail para `projeto@planurbi.com.br`. Esforço: ~30 min.
- [ ] **Logos reais de parceiros** — atualmente em `/public/logosExternas/` há apenas `logo-fepesa-placeholder.png` e `logo-prefeitura-placeholder.png`. Trocar pelos definitivos.
- [ ] **Revisar textos** com a equipe PlanUrbi — alguns CTAs e headlines podem ser ajustados conforme o tom institucional.

### 🌱 Média — quando houver tempo

- [ ] **Páginas de solução por eixo** (template no design system §10.3): `/solucoes/plano-diretor`, `/solucoes/reurb`, `/solucoes/ctm`, etc.
- [ ] **Página de projetos detalhada** com galeria, indicadores, contexto/desafio/resultado para cada município.
- [ ] **Hub de conteúdo** — artigos completos para os 3 insights da Home (Plano Diretor, CTM, REURB) + sistema de blog.
- [ ] **Foto hero personalizada** — hoje uso `noticias/barra.jpg`. Pode trocar por foto autoral exclusiva (Craíbas, BSM ou aérea conceitual).

### 🧪 Baixa — melhorias técnicas

- [ ] **Animações Framer Motion** — entrada de seções com fade/slide-up. Framer já está instalado.
- [ ] **Lenis smooth scroll** — já instalado, falta ativar.
- [ ] **Analytics** (Google Analytics 4 ou Plausible) — ainda não implementado.
- [ ] **SEO técnico** — JSON-LD Schema.org, sitemap.xml, robots.txt, Open Graph dinâmico por seção.
- [ ] **PWA** — manifest, ícones, service worker.
- [ ] **Testes E2E** (Playwright) — não há testes hoje.

---

## 7. Decisões de Design (e Por Quê)

| Decisão | Motivo |
|---|---|
| **Direção visual: Praxis BH** | Cliente escolheu como referência principal: institucional brasileiro, foto urbana real, autoridade técnica. |
| **Foto-realismo no hero** | Mais impactante que ilustrações abstratas para o público (gestores municipais). |
| **CSS Modules em vez de Tailwind** | Projeto base já usa CSS Modules. Manter consistência. |
| **Fontes locais (Anek + Hauora)** | Definidas no design system oficial. Local > Google Fonts (privacidade + performance). |
| **Verde-900 + sand-300** | Identidade da marca. Sand como acento substitui o azul-claro genérico do esboço HTML inicial. |
| **Headline com "inteligente" destacado** | Substituiu "Planejamento urbano que deixa de ser documento e vira decisão" a pedido do cliente. |
| **Eyebrow `onDark`** | Variante criada para legibilidade sobre fundos verde-900 (sand-300 com baixa opacidade). |
| **Estratégia preview separada (Vercel + repo geovane-junior-ia)** | Apresentar à equipe sem risco de deploy acidental no `planurbi.com.br`. |

---

## 8. Como Retomar o Trabalho

### Clonar e rodar localmente

```bash
git clone https://github.com/geovane-junior-ia/planurbi-landing-2026.git
cd planurbi-landing-2026
npm install
npm run dev
```

Abre em `http://localhost:3000`.

### Fluxo de mudança → publicação

1. Editar arquivo localmente
2. `git add . && git commit -m "msg"`
3. `git push apresenta feat/nova-home-2026:main` → Vercel atualiza preview em ~2 min
4. `git push origin feat/nova-home-2026` → atualiza branch no repo de produção

### Quando aprovado para produção

1. Abrir PR de `feat/nova-home-2026` → `main` no repo `PlanUrbi/Landing-Page`
2. Merge na main (com revisão da equipe)
3. Workflow `.github/workflows/deploy.yml` dispara automaticamente:
   - Build Docker image
   - Push para `ghcr.io/planurbi/landing-page:latest`
   - Chama webhook do Dokploy em `panel.giocondalab.com.br`
   - Container atualiza em `planurbi.com.br`

---

## 9. Documentos Relacionados

- [docs/PLANURBI — DESIGN SYSTEM DIGITAL 2026.md](docs/PLANURBI%20%E2%80%94%20DESIGN%20SYSTEM%20DIGITAL%202026.md) — tokens, componentes, tipografia
- [docs/PLANURBI — DOCUMENTO MESTRE DO PROJETO DIGITAL.md](docs/PLANURBI%20%E2%80%94%20DOCUMENTO%20MESTRE%20DO%20PROJETO%20DIGITAL.md) — posicionamento, pilares
- [docs/Estrutura do site do PlanUrbi.md](docs/Estrutura%20do%20site%20do%20PlanUrbi.md) — eixos, valores, templates de página

---

## 10. Contatos

- **Dev:** Geovane Junior (`dev@planurbi.com.br` / GitHub: `geovane-junior-ia`)
- **Cliente final:** equipe PlanUrbi (`projeto@planurbi.com.br`)
- **Hospedagem do site oficial:** Dokploy em `panel.giocondalab.com.br`

---

*Documento gerado durante a sessão de implementação do MVP em 2026-05-21.*
