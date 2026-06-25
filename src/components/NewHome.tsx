"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./NewHome.module.css";

const pillars = [
  {
    icon: "bx-map-alt",
    title: "Território",
    description: "Mapas, bases georreferenciadas e síntese técnica para enxergar o município com clareza.",
  },
  {
    icon: "bx-buildings",
    title: "Gestão pública",
    description: "Instrumentos urbanísticos e decisões estruturadas para sair do plano e chegar à implementação.",
  },
  {
    icon: "bx-conversation",
    title: "Participação social",
    description: "Escuta qualificada com oficinas, audiências e processos transparentes.",
  },
  {
    icon: "bx-layer",
    title: "Capacidade de execução",
    description: "Equipe multidisciplinar conectando análise, formulação legal e apoio institucional.",
  },
];

const aboutValues = [
  {
    number: "01",
    title: "Base técnica sólida",
    description:
      "Levantamento territorial, análise normativa, dados espaciais e síntese estratégica para embasar decisões públicas.",
  },
  {
    number: "02",
    title: "Aplicabilidade real",
    description: "Planos, códigos e diretrizes construídos para serem compreendidos, aprovados e executados.",
  },
  {
    number: "03",
    title: "Processos participativos",
    description: "Escuta pública organizada para aumentar legitimidade, transparência e aderência local.",
  },
  {
    number: "04",
    title: "Visão integrada",
    description: "Habitação, mobilidade, regularização, geotecnologias e ordenamento em uma mesma estratégia.",
  },
];

const solutions = [
  {
    slug: "planejamento-territorial",
    axis: "Eixo 01",
    title: "Planejamento Territorial e Ordenamento Urbano",
    description:
      "Planos, códigos e instrumentos para orientar crescimento urbano, uso do solo, zoneamento e rotina municipal.",
    pills: ["Plano Diretor", "Cód. Edificações", "Cód. Posturas", "EIV"],
    image: "/planurbi-visuals/municipal-diagnostic.png",
    alt: "Diagnóstico municipal com base territorial",
    detail: {
      lead:
        "Estruturamos o conjunto de instrumentos urbanísticos que organizam o crescimento do município e dão segurança jurídica para gestores, técnicos e cidadãos.",
      products: [
        "Plano Diretor Municipal",
        "Código de Edificações",
        "Código de Posturas Urbanas",
        "Código de Meio Ambiente",
        "Estudo de Impacto de Vizinhança (EIV)",
      ],
      legalBase: "Estatuto da Cidade (Lei 10.257/2001), Lei do Parcelamento do Solo Urbano e legislações municipais correlatas.",
    },
  },
  {
    slug: "habitacao-regularizacao",
    axis: "Eixo 02",
    title: "Habitação e Regularização Fundiária",
    description:
      "Estratégias para REURB, organização de assentamentos e apoio técnico à regularização habitacional.",
    pills: ["REURB", "PLHIS", "Assentamentos"],
    image: "/planurbi-visuals/housing-regularization.png",
    alt: "Regularização fundiária e habitação",
    detail: {
      lead:
        "Organizamos territórios consolidados, qualificamos políticas habitacionais e ampliamos a inclusão urbana com instrumentos legais aplicáveis.",
      products: [
        "Regularização Fundiária Urbana (REURB)",
        "Plano Local de Habitação de Interesse Social (PLHIS)",
        "Diagnóstico habitacional municipal",
        "Cadastro de assentamentos precários",
      ],
      legalBase: "Lei 13.465/2017 (REURB), Estatuto da Cidade e PNH.",
    },
  },
  {
    slug: "mobilidade",
    axis: "Eixo 03",
    title: "Mobilidade e Desenvolvimento Urbano",
    description:
      "Diagnósticos e diretrizes para transporte, circulação e projetos urbanos articulados às necessidades locais.",
    pills: ["Plano de Mobilidade", "Diretrizes urbanas", "Centralidades"],
    image: "/planurbi-visuals/mobility-development.png",
    alt: "Mobilidade e desenvolvimento urbano",
    detail: {
      lead:
        "Apoiamos municípios na construção de políticas de mobilidade integradas ao planejamento territorial e ao desenvolvimento local.",
      products: [
        "Plano de Mobilidade Urbana",
        "Diretrizes de circulação e acessibilidade",
        "Estudos de centralidades urbanas",
        "Projetos urbanos setoriais",
      ],
      legalBase: "Lei 12.587/2012 (Política Nacional de Mobilidade Urbana).",
    },
  },
  {
    slug: "dados-inteligencia",
    axis: "Eixo 04",
    title: "Dados, Inteligência Territorial e Geotecnologias",
    description:
      "CTM, bases georreferenciadas e mapeamento temático para apoiar decisões públicas com informação qualificada.",
    pills: ["CTM", "Geoprocessamento", "Painéis"],
    image: "/planurbi-visuals/geotech-layers.png",
    alt: "Camadas geotecnológicas e dados territoriais",
    detail: {
      lead:
        "Transformamos dados dispersos em leitura territorial aplicável: bases, mapas e painéis que orientam decisão e fiscalização.",
      products: [
        "Cadastro Territorial Multifinalitário (CTM)",
        "Mapeamento georreferenciado do território",
        "Diagnóstico Inteligente do Município",
        "Painéis de indicadores territoriais",
      ],
      legalBase: "Portaria MCidades 511/2009 (Diretrizes para o CTM) e legislações tributárias municipais.",
    },
  },
  {
    slug: "gestao-implementacao",
    axis: "Eixo 05",
    title: "Gestão e Implementação do Planejamento",
    description:
      "Capacitação, apoio à institucionalização e acompanhamento para transformar diretrizes em rotina de gestão.",
    pills: ["Capacitação", "Apoio técnico", "Monitoramento"],
    image: "/planurbi-visuals/participatory-workshop.png",
    alt: "Oficinas participativas e gestão",
    detail: {
      lead:
        "Acompanhamos o município depois da entrega: instalamos rotinas, capacitamos equipes e monitoramos indicadores para que o planejamento vire prática.",
      products: [
        "Apoio técnico municipal continuado",
        "Capacitação de equipes técnicas",
        "Termos de referência e editais",
        "Monitoramento e indicadores de acompanhamento",
      ],
      legalBase: "Estatuto da Cidade e marcos regulatórios setoriais aplicáveis.",
    },
  },
  {
    slug: "turismo",
    axis: "Eixo 06",
    title: "Turismo e Desenvolvimento Local",
    description:
      "Planejamento turístico integrado ao território, valorizando vocação local e fortalecendo a economia do município.",
    pills: ["PDITS", "Planejamento turístico", "Desenvolvimento local"],
    image: "/planurbi-visuals/mobility-development.png",
    alt: "Turismo e desenvolvimento local",
    detail: {
      lead:
        "Estruturamos planos e diretrizes para municípios que enxergam o turismo como vetor de desenvolvimento integrado ao planejamento urbano e à identidade local.",
      products: [
        "Plano de Desenvolvimento Integrado do Turismo Sustentável (PDITS)",
        "Planejamento turístico municipal",
        "Diretrizes de uso e ocupação para destinos turísticos",
        "Articulação com cadeias produtivas locais",
      ],
      legalBase: "Lei Geral do Turismo (Lei 11.771/2008) e Plano Nacional de Turismo.",
    },
  },
];

const diagnosticItems = [
  {
    number: "01",
    title: "Plano Diretor desatualizado",
    description: "Urgência regulatória e necessidade de reorganizar o crescimento urbano.",
  },
  {
    number: "02",
    title: "Áreas irregulares e assentamentos precários",
    description: "Demanda por regularização fundiária e desenho de estratégia habitacional.",
  },
  {
    number: "03",
    title: "Dados territoriais fragmentados",
    description: "Necessidade de CTM, mapeamento e bases confiáveis para fiscalização e planejamento.",
  },
  {
    number: "04",
    title: "Mobilidade tratada de forma reativa",
    description: "Falta diagnóstico e priorização para tirar o transporte da pauta emergencial.",
  },
  {
    number: "05",
    title: "Legislação urbanística defasada",
    description: "Oportunidade de atualização normativa, clareza institucional e segurança jurídica.",
  },
  {
    number: "06",
    title: "Dificuldade para implementar instrumentos",
    description: "A gestão precisa de método, apoio técnico e plano claro de execução.",
  },
];

const methodologySteps = [
  {
    label: "Etapa 01",
    title: "Diagnóstico",
    description: "Leitura territorial, dados existentes e demandas prioritárias.",
  },
  {
    label: "Etapa 02",
    title: "Mapeamento",
    description: "Bases georreferenciadas, camadas urbanas e síntese técnica.",
  },
  {
    label: "Etapa 03",
    title: "Participação",
    description: "Oficinas, audiências e escuta pública estruturada.",
  },
  {
    label: "Etapa 04",
    title: "Proposição",
    description: "Diretrizes, instrumentos urbanísticos e minutas legais.",
  },
  {
    label: "Etapa 05",
    title: "Validação",
    description: "Discussão pública, refinamento e consolidação documental.",
  },
  {
    label: "Etapa 06",
    title: "Implementação",
    description: "Capacitação, monitoramento e apoio à rotina institucional.",
  },
];

const projects = [
  {
    location: "Barra de São Miguel — AL",
    title: "PlanUrbi Barra de São Miguel",
    description:
      "Processo participativo com leitura territorial, comunicação pública, oficinas e apoio técnico para revisão dos instrumentos urbanos e fortalecimento da gestão municipal.",
    image: "/noticias/audiencia.jpg",
    alt: "Audiência pública no projeto PlanUrbi em Barra de São Miguel",
    tags: ["Participação social", "Plano Diretor", "Apoio técnico"],
    stats: [
      { value: "6", label: "oficinas comunitárias realizadas" },
      { value: "3", label: "audiências públicas" },
      { value: "+", label: "agentes de campo formados" },
    ],
  },
  {
    location: "Craíbas — AL",
    title: "PlanUrbi Craíbas",
    description:
      "Organização de base territorial, diagnóstico urbano e estruturação de diretrizes para apoiar decisões municipais com mais clareza técnica e institucional.",
    image: "/noticias/craibas.png",
    alt: "Vista aérea da cidade de Craíbas, em Alagoas",
    tags: ["Diagnóstico", "Mapeamento", "Gestão municipal"],
    stats: [
      { value: "1", label: "diagnóstico territorial completo" },
      { value: "5", label: "frentes técnicas mobilizadas" },
      { value: "100%", label: "base georreferenciada do município" },
    ],
  },
];

const authorityStats = [
  { value: "5", label: "frentes principais de atuação técnica" },
  { value: "6", label: "etapas de metodologia transparente" },
  { value: "2", label: "municípios atendidos no biênio" },
  { value: "1º", label: "Seminário PlanUrbi de Planejamento Urbano Inteligente" },
];

const competencies = [
  "Planejamento e ordenamento urbano",
  "Habitação e regularização fundiária",
  "Mobilidade e desenvolvimento setorial",
  "Dados, CTM e geotecnologias",
  "Instrumentos legais e normativos",
  "Gestão, implementação e capacitação",
];

const team = [
  {
    role: "Coordenação Técnica",
    name: "Em breve",
    formation: "Arquitetura e Urbanismo · Planejamento Urbano",
  },
  {
    role: "Planejamento Urbano e Mobilidade",
    name: "Em breve",
    formation: "Engenharia Civil · Mobilidade Urbana",
  },
  {
    role: "Geotecnologias e CTM",
    name: "Em breve",
    formation: "Geografia · Geoprocessamento",
  },
  {
    role: "Habitação e Regularização",
    name: "Em breve",
    formation: "Direito Urbanístico · REURB",
  },
];

const insights = [
  {
    category: "Guia técnico",
    title: "Quando revisar o Plano Diretor?",
    description:
      "Entenda os sinais técnicos e legais que indicam a hora de atualizar o principal instrumento urbano municipal.",
    image: "/visual-diagnostico-territorial.svg",
  },
  {
    category: "Inteligência territorial",
    title: "O que é Cadastro Territorial Multifinalitário?",
    description:
      "Uma base integrada para modernizar a gestão territorial, tributária, ambiental e urbanística do município.",
    image: "/planurbi-visuals/geotech-layers.png",
  },
  {
    category: "Gestão urbana",
    title: "Como a REURB apoia a gestão urbana?",
    description:
      "Mostra como a regularização pode fortalecer governança, organização territorial e ação institucional.",
    image: "/visual-oficina-participativa.svg",
  },
];

const demandTypes = [
  "Plano Diretor",
  "CTM / Geotecnologias",
  "REURB e habitação",
  "Mobilidade urbana",
  "Turismo",
  "Legislação urbanística",
  "Diagnóstico territorial inicial",
];

export function NewHome() {
  return (
    <main className={styles.page} id="top">
      {/* ===== HERO ===== */}
      <section className={styles.hero} id="inicio" aria-label="Destaque principal">
        <div className={styles.heroBg}>
          <Image
            src="/noticias/barra.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 60%" }}
          />
        </div>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGraphic} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <span className={`${styles.eyebrow} ${styles.onDark}`}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Inteligência territorial para gestão municipal
              </span>
              <h1>
                Planejamento urbano <em>inteligente</em> para transformar municípios.
              </h1>
              <p>
                O PlanUrbi integra dados, geotecnologias, legislação urbanística e participação social
                para transformar o território em uma base real de gestão pública eficiente, transparente e aplicável.
              </p>
              <div className={styles.heroActions}>
                <Link href="#contato" className={`${styles.btn} ${styles.btnPrimary}`}>
                  Solicitar diagnóstico
                </Link>
                <Link href="#solucoes" className={`${styles.btn} ${styles.btnGhostDark}`}>
                  Conhecer soluções
                </Link>
              </div>
              <div className={styles.heroProof}>
                <article className={styles.proofChip}>
                  <strong>Leitura territorial com profundidade</strong>
                  <span>Diagnóstico técnico, dados espaciais e escuta pública para decisão.</span>
                </article>
                <article className={styles.proofChip}>
                  <strong>Instrumentos urbanísticos aplicáveis</strong>
                  <span>Planos, códigos e marcos regulatórios desenhados para o município real.</span>
                </article>
                <article className={styles.proofChip}>
                  <strong>Execução com apoio à gestão</strong>
                  <span>Capacitação e acompanhamento — não só entrega de estudo.</span>
                </article>
              </div>
            </div>

            <aside className={styles.heroPanel} aria-label="Painel estratégico">
              <span className={styles.miniLabel}>Painel estratégico</span>
              <div className={styles.metricGrid}>
                <div className={styles.metric}>
                  <strong>360°</strong>
                  <span>visão integrada entre território, legislação, dados e gestão</span>
                </div>
                <div className={styles.metric}>
                  <strong>5 frentes</strong>
                  <span>de atuação para planejamento, regularização e implementação</span>
                </div>
                <div className={styles.metric}>
                  <strong>6 etapas</strong>
                  <span>de uma metodologia transparente, técnica e participativa</span>
                </div>
                <div className={styles.metric}>
                  <strong>2 projetos</strong>
                  <span>como vitrine de articulação entre dados, planejamento e gestão</span>
                </div>
              </div>
              <ul className={styles.impactList}>
                <li>Plano Diretor, códigos e instrumentos para orientar o crescimento urbano com clareza.</li>
                <li>CTM, mapeamento e inteligência territorial para priorizar ação pública.</li>
                <li>REURB, habitação e mobilidade conectadas à realidade institucional do município.</li>
              </ul>
            </aside>
          </div>
        </div>
        <div className={styles.heroScrollHint} aria-hidden="true">
          Role para conhecer
        </div>
      </section>

      {/* ===== PILLARS STRIP ===== */}
      <section className={styles.pillars} aria-label="Pilares de atuação">
        <div className={styles.container}>
          <div className={styles.pillarsGrid}>
            {pillars.map((pillar) => (
              <article className={styles.pillarCard} key={pillar.title}>
                <div className={styles.pillarIcon} aria-hidden="true">
                  <i className={`bx ${pillar.icon}`} />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className={styles.section} id="quem-somos" aria-label="Quem somos">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Quem somos
              </span>
              <h2>Do diagnóstico urbano à rotina de gestão territorial.</h2>
            </div>
            <p>
              O diferencial da PlanUrbi está em organizar informações, traduzir complexidade técnica e
              entregar instrumentos que ajudam o município a decidir melhor, comunicar melhor e executar com segurança.
            </p>
          </div>

          <div className={styles.aboutLayout}>
            <article className={styles.aboutPanel}>
              <span className={`${styles.eyebrow} ${styles.onDark}`}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Posicionamento
              </span>
              <h3>Planejamento urbano com autoridade técnica e leitura institucional.</h3>
              <p>
                Mais do que produzir planos, estruturamos diagnósticos, mapas, legislação urbanística e
                processos participativos para apoiar a gestão pública com inteligência territorial aplicada.
              </p>
              <div className={styles.aboutPanelImage}>
                <Image
                  src="/planurbi-visuals/territorial-intelligence.png"
                  alt="Mapa conceitual de inteligência territorial"
                  width={760}
                  height={520}
                />
              </div>
            </article>

            <div className={styles.aboutValues}>
              {aboutValues.map((value) => (
                <article className={styles.aboutValue} key={value.number}>
                  <span className={styles.aboutValueNumber}>{value.number}</span>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className={styles.section} id="equipe" aria-label="Equipe técnica">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Equipe técnica
              </span>
              <h2>Multidisciplinaridade aplicada ao território.</h2>
            </div>
            <p>
              A equipe do PlanUrbi reúne formação técnica e experiência institucional para
              traduzir complexidade urbanística em ações concretas para o município.
            </p>
          </div>

          <div className={styles.teamGrid}>
            {team.map((member) => (
              <article className={styles.teamCard} key={member.role}>
                <div className={styles.teamAvatar} aria-hidden="true">
                  <svg
                    viewBox="0 0 80 80"
                    width="100%"
                    height="100%"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="40" cy="32" r="14" fill="rgba(89, 77, 70, 0.18)" />
                    <path
                      d="M14 70c2-12 13-20 26-20s24 8 26 20"
                      fill="rgba(89, 77, 70, 0.18)"
                    />
                  </svg>
                </div>
                <span className={styles.teamRole}>{member.role}</span>
                <strong className={styles.teamName}>{member.name}</strong>
                <span className={styles.teamFormation}>{member.formation}</span>
              </article>
            ))}
          </div>

          <p className={styles.teamFootnote}>
            Composição e dados detalhados de cada profissional serão divulgados em breve.
          </p>
        </div>
      </section>

      {/* ===== SOLUTIONS ===== */}
      <section className={`${styles.section} ${styles.sectionStone}`} id="solucoes" aria-label="Soluções">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Soluções
              </span>
              <h2>Expertise completa em planejamento urbano e inteligência territorial.</h2>
            </div>
            <p>
              Cinco eixos integrados para responder à complexidade da gestão urbana — com linguagem
              estratégica e foco em resultado para o gestor público.
            </p>
          </div>

          <div className={styles.solutionsGrid}>
            {solutions.map((solution) => (
              <Link
                href={`#detalhe-${solution.slug}`}
                className={styles.solutionCard}
                key={solution.slug}
                aria-label={`Ver detalhes de ${solution.title}`}
              >
                <div className={styles.solutionImage}>
                  <span className={styles.solutionAxis}>{solution.axis}</span>
                  <Image src={solution.image} alt={solution.alt} width={560} height={350} />
                </div>
                <div className={styles.solutionBody}>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                  <div className={styles.solutionPills}>
                    {solution.pills.map((pill) => (
                      <span className={styles.pill} key={pill}>
                        {pill}
                      </span>
                    ))}
                  </div>
                  <span className={styles.solutionMoreLink}>
                    Saiba mais <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOLUTIONS DETAIL ===== */}
      <section className={styles.section} aria-label="Detalhes das soluções">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Detalhes das soluções
              </span>
              <h2>Cada eixo de atuação, em profundidade.</h2>
            </div>
            <p>
              Para cada frente de trabalho, apresentamos a abordagem do PlanUrbi, os produtos
              entregáveis e a base legal que sustenta a atuação.
            </p>
          </div>

          <div className={styles.solutionDetailList}>
            {solutions.map((solution, index) => (
              <article
                key={solution.slug}
                id={`detalhe-${solution.slug}`}
                className={`${styles.solutionDetailCard} ${
                  index % 2 === 1 ? styles.solutionDetailReverse : ""
                }`}
              >
                <div className={styles.solutionDetailMedia}>
                  <span className={styles.solutionAxis}>{solution.axis}</span>
                  <Image
                    src={solution.image}
                    alt={solution.alt}
                    width={700}
                    height={460}
                  />
                </div>
                <div className={styles.solutionDetailBody}>
                  <h3>{solution.title}</h3>
                  <p className={styles.solutionDetailLead}>{solution.detail.lead}</p>

                  <div className={styles.solutionDetailBlock}>
                    <span className={styles.solutionDetailLabel}>Produtos & entregáveis</span>
                    <ul>
                      {solution.detail.products.map((product) => (
                        <li key={product}>{product}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.solutionDetailBlock}>
                    <span className={styles.solutionDetailLabel}>Base legal</span>
                    <p>{solution.detail.legalBase}</p>
                  </div>

                  <Link href="#contato" className={`${styles.btn} ${styles.btnSolidGreen}`}>
                    Solicitar diagnóstico nesse eixo
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIAGNOSTIC (Seu município precisa de quê?) ===== */}
      <section className={`${styles.section} ${styles.sectionDark}`} aria-label="Diagnóstico inicial">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <span className={`${styles.eyebrow} ${styles.onDark}`}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Diagnóstico inicial
              </span>
              <h2>Seu município precisa de quê agora?</h2>
            </div>
            <p>
              Identifique o desafio do seu município abaixo e fale com a nossa equipe para
              receber um diagnóstico personalizado e o próximo passo concreto.
            </p>
          </div>

          <div className={styles.diagnosticGrid}>
            {diagnosticItems.map((item) => (
              <article className={styles.diagnosticCard} key={item.number}>
                <span className={styles.diagnosticNumber}>{item.number}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <div className={styles.diagnosticCta}>
            <Link href="#contato" className={`${styles.btn} ${styles.btnPrimary}`}>
              Solicitar diagnóstico personalizado
            </Link>
            <Link href="#solucoes" className={`${styles.btn} ${styles.btnGhostDark}`}>
              Ver soluções relacionadas
            </Link>
          </div>
        </div>
      </section>

      {/* ===== METHODOLOGY ===== */}
      <section className={`${styles.section} ${styles.sectionDark}`} id="metodologia" aria-label="Metodologia">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <span className={`${styles.eyebrow} ${styles.onDark}`}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Metodologia
              </span>
              <h2>Um processo transparente, técnico e participativo.</h2>
            </div>
            <p>
              Seis etapas que funcionam como trilho de confiança — reforçando previsibilidade, rigor
              técnico e maturidade institucional ao longo do projeto.
            </p>
          </div>

          <div className={styles.timeline}>
            {methodologySteps.map((step) => (
              <article className={styles.timelineStep} key={step.label}>
                <div className={styles.timelineBullet} aria-hidden="true" />
                <small>{step.label}</small>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className={styles.section} id="projetos" aria-label="Projetos">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Projetos
              </span>
              <h2>Casos que conectam planejamento, dados e gestão local.</h2>
            </div>
            <p>
              Prova viva da articulação entre leitura territorial, instrumentos urbanísticos e
              acompanhamento institucional em municípios alagoanos.
            </p>
          </div>

          <div className={styles.projectList}>
            {projects.map((project) => (
              <article className={styles.projectCard} key={project.title}>
                <div className={styles.projectImage}>
                  <span className={styles.projectImageBadge}>{project.location}</span>
                  <Image src={project.image} alt={project.alt} width={900} height={640} />
                </div>
                <div className={styles.projectBody}>
                  <div className={styles.projectMeta}>
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className={styles.projectStats}>
                    {project.stats.map((stat) => (
                      <div className={styles.projectStat} key={stat.label}>
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AUTHORITY ===== */}
      <section className={`${styles.section} ${styles.sectionStone}`} aria-label="Autoridade técnica">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Autoridade técnica
              </span>
              <h2>Capacidade multidisciplinar para apoiar decisões públicas.</h2>
            </div>
            <p>
              Combinamos planejamento territorial, ciência de dados, geotecnologias, legislação e
              gestão pública em uma mesma equipe — pronta para o município real.
            </p>
          </div>

          <div className={styles.authorityLayout}>
            <article className={styles.authorityMain}>
              <div className={styles.authorityStats}>
                {authorityStats.map((stat) => (
                  <div className={styles.authorityStat} key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.authorityCompetencies}>
                {competencies.map((competency) => (
                  <div className={styles.authorityCompetency} key={competency}>
                    {competency}
                  </div>
                ))}
              </div>
            </article>

            <div className={styles.authoritySide}>
              <div className={styles.authorityImage}>
                <Image
                  src="/noticias/seminario.jpg"
                  alt="Seminário PlanUrbi de planejamento urbano inteligente"
                  width={600}
                  height={760}
                />
                <div className={styles.authorityImageBadge}>
                  <strong>1º Seminário PlanUrbi</strong>
                  <span>Planejamento urbano inteligente, com palestrantes técnicos e gestores públicos.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INSIGHTS ===== */}
      <section className={styles.section} id="conteudo" aria-label="Conteúdo">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Conteúdo
              </span>
              <h2>Materiais que reforçam autoridade e educam a gestão municipal.</h2>
            </div>
            <p>
              Conteúdos técnicos curtos para apoiar gestores e equipes em decisões cotidianas sobre o
              território e seus instrumentos.
            </p>
          </div>

          <div className={styles.insightsGrid}>
            {insights.map((insight) => (
              <article
                className={`${styles.insightCard} ${styles.insightCardDisabled}`}
                key={insight.title}
                aria-label={`${insight.title} — em breve`}
              >
                <div className={styles.insightImage}>
                  <span className={styles.insightCategory}>{insight.category}</span>
                  <span className={styles.insightSoon}>Em breve</span>
                  <Image src={insight.image} alt="" width={560} height={320} />
                </div>
                <div className={styles.insightBody}>
                  <h3>{insight.title}</h3>
                  <p>{insight.description}</p>
                  <span className={styles.insightCtaDisabled}>Em breve</span>
                </div>
              </article>
            ))}
          </div>

          <p className={styles.insightsFootnote}>
            Estamos preparando uma série de materiais técnicos para a gestão municipal.
            Para receber em primeira mão, <a href="#contato">fale com a equipe</a>.
          </p>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section
        className={`${styles.section} ${styles.sectionDark}`}
        id="contato"
        aria-label="Contato"
      >
        <div className={styles.container}>
          <div className={styles.contactShell}>
            <article className={styles.contactCopy}>
              <span className={`${styles.eyebrow} ${styles.onDark}`}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Contato
              </span>
              <h2>Solicite um diagnóstico inicial para o seu município.</h2>
              <p>
                Conte para a equipe do PlanUrbi a demanda atual da sua gestão. Iniciamos com uma leitura
                técnica do contexto e construímos o caminho de aplicação a partir dali.
              </p>
              <div className={styles.contactSteps}>
                <div className={styles.contactStep}>
                  <div className={styles.contactStepNumber}>01</div>
                  <div className={styles.contactStepContent}>
                    <strong>Leitura inicial da demanda</strong>
                    <span>Entendemos o cenário municipal, o estágio atual e a prioridade estratégica.</span>
                  </div>
                </div>
                <div className={styles.contactStep}>
                  <div className={styles.contactStepNumber}>02</div>
                  <div className={styles.contactStepContent}>
                    <strong>Definição de escopo e próximos passos</strong>
                    <span>Encaminhamento técnico para uma abordagem aderente ao contexto local.</span>
                  </div>
                </div>
                <div className={styles.contactStep}>
                  <div className={styles.contactStepNumber}>03</div>
                  <div className={styles.contactStepContent}>
                    <strong>Canal direto</strong>
                    <span>
                      <a href="mailto:projeto@planurbi.com.br">projeto@planurbi.com.br</a>
                    </span>
                  </div>
                </div>
              </div>
            </article>

            <form
              className={styles.contactForm}
              onSubmit={(event) => {
                event.preventDefault();
                alert("MVP: este formulário ainda não está integrado. Em breve, será conectado ao CRM.");
              }}
            >
              <div className={styles.contactFormHead}>
                <span className={styles.eyebrow}>
                  <span className={styles.eyebrowDot} aria-hidden="true" />
                  Formulário
                </span>
                <h3>Inicie o contato com a equipe técnica</h3>
                <p>Preencha os dados principais — respondemos em até 2 dias úteis.</p>
              </div>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label htmlFor="nome">Nome</label>
                  <input id="nome" name="nome" type="text" placeholder="Seu nome" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="municipio">Município</label>
                  <input id="municipio" name="municipio" type="text" placeholder="Nome do município" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="cargo">Cargo / órgão</label>
                  <input id="cargo" name="cargo" type="text" placeholder="Ex.: Sec. de Planejamento" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">E-mail</label>
                  <input id="email" name="email" type="email" placeholder="voce@municipio.gov.br" required />
                </div>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label htmlFor="tipo">Tipo de demanda</label>
                  <select id="tipo" name="tipo" defaultValue="">
                    <option value="" disabled>
                      Selecione
                    </option>
                    {demandTypes.map((demand) => (
                      <option key={demand}>{demand}</option>
                    ))}
                  </select>
                </div>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label htmlFor="mensagem">Mensagem</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    placeholder="Conte brevemente a demanda do seu município"
                  />
                </div>
              </div>
              <button className={`${styles.btn} ${styles.btnSolidGreen} ${styles.formSubmit}`} type="submit">
                Enviar solicitação
              </button>
              <p className={styles.formNote}>
                Ao enviar, você concorda com o uso dos dados apenas para retorno da equipe PlanUrbi.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
