"use client";

import { useState, type FormEvent } from "react";
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

type TeamMember = {
  slug: string;
  name: string;
  role: string;
  formation: string;
  photo: string;
  lattes?: string;
  linkedin?: string;
  orcid?: string;
};

const team: TeamMember[] = [
  {
    slug: "melissa",
    name: "Melissa Mota Alcides",
    role: "Coordenadora Técnica",
    formation:
      "Doutora em Arquitetura e Urbanismo. Mestre em Desenvolvimento e Meio Ambiente.",
    photo: "/equipe/melissa.jpg",
    lattes: "http://lattes.cnpq.br/9108718376041605",
    linkedin: "https://www.linkedin.com/in/melissa-mota-71141a97",
  },
  {
    slug: "rute",
    name: "Rute Ferreira Barbosa",
    role: "Coordenadora de Geoprocessamento",
    formation:
      "Doutora e Mestre em Arqueologia. Pós-graduanda em Urbanismo, Futuro das Cidades e Planejamento Inteligente e Impactos Socioambientais.",
    photo: "/equipe/rute.jpg",
    lattes: "http://lattes.cnpq.br/0238521609998525",
    linkedin: "https://www.linkedin.com/in/rute-barbosa-7b434975",
  },
  {
    slug: "raquel",
    name: "Raquel da Silva Cabral",
    role: "Departamento de Tecnologia — PlanUrbi",
    formation:
      "Doutora em Engenharia Elétrica. Mestre em Modelagem Computacional do Conhecimento.",
    photo: "/equipe/raquel.webp",
    lattes: "http://lattes.cnpq.br/0319343616289472",
    orcid: "https://orcid.org/0000-0001-6362-1662",
  },
  {
    slug: "mariana",
    name: "Mariana Oliveira Ribeiro",
    role: "Arquiteta e Urbanista",
    formation: "Graduada em Arquitetura e Urbanismo pela UFAL.",
    photo: "/equipe/mariana.png",
    lattes: "http://lattes.cnpq.br/5983774147051032",
    linkedin: "https://www.linkedin.com/in/mariana-oliveira-ribeiro-6aab4133/",
  },
  {
    slug: "jailson",
    name: "Jailson Sandes Barbosa de Oliveira",
    role: "Geógrafo",
    formation: "Bacharel em Geografia pela UFAL.",
    photo: "/equipe/jailson.png",
    lattes: "http://lattes.cnpq.br/0501707690813876",
    linkedin: "https://www.linkedin.com/in/jailson-sandes-293a9481",
  },
  {
    slug: "karina",
    name: "Karina Mendonça Tenório de Magalhães Oliveira",
    role: "Especialista em Planejamento Territorial e Urbano",
    formation:
      "Doutoranda em Arquitetura e Urbanismo. Mestre em Dinâmicas do Espaço Habitado.",
    photo: "/equipe/karina.png",
    lattes: "https://lattes.cnpq.br/8811582595843193",
    linkedin: "https://www.linkedin.com/in/karina-tenório",
  },
  {
    slug: "pablo",
    name: "Pablo Peixoto de Lima",
    role: "Arquiteto Urbanista",
    formation: "Graduado em Arquitetura e Urbanismo.",
    photo: "/equipe/pablo.jpg",
    lattes: "http://lattes.cnpq.br/7384910380936944",
    linkedin: "https://www.linkedin.com/in/pabloplima",
  },
  {
    slug: "mayara",
    name: "Mayara Marinho de Santana",
    role: "Geógrafa",
    formation:
      "Bacharel em Geografia pela UFAL. Mestranda em Geografia — Dinâmica Socioambiental e Geoprocessamento.",
    photo: "/equipe/mayara.jpg",
    lattes: "https://lattes.cnpq.br/3789874613458708",
    linkedin: "https://www.linkedin.com/in/mayara-marinho-899792340/",
  },
  {
    slug: "ricardo",
    name: "Ricardo Antonio de Barros Wanderley",
    role: "Coordenador Jurídico",
    formation:
      "Advogado. Mestrando em Administração Pública e Governo pela Fundação Getúlio Vargas.",
    photo: "/equipe/ricardo.jpg",
    lattes: "http://lattes.cnpq.br/1109263688203010",
  },
  {
    slug: "charles",
    name: "Charles Alves Silva",
    role: "Coordenador Estratégico",
    formation: "Advogado, consultor e graduado em Gestão de Pessoas.",
    photo: "/equipe/charles.jpg",
  },
  {
    slug: "rafael",
    name: "Rafael Augusto Coelho de Lima",
    role: "Administrador",
    formation:
      "Graduado em Administração. MBA em Perícia, Auditoria e Gestão Ambiental.",
    photo: "/equipe/rafael.jpg",
    lattes: "http://lattes.cnpq.br/5617812876092206",
    linkedin: "https://www.linkedin.com/in/rafael-augusto-92563b25",
  },
  {
    slug: "geovane",
    name: "Geovane Luis Gomes Júnior",
    role: "Arquiteto de Soluções Cognitivas",
    formation:
      "Formação em Ciências da Computação. 30+ anos em arquitetura de sistemas, IA generativa e desenvolvimento full-stack.",
    photo: "/equipe/geovane.jpg",
  },
];

const coordinationSlugs = new Set(["melissa", "rute", "raquel"]);
const coordinationTeam = team.filter((m) => coordinationSlugs.has(m.slug));
const otherTeam = team.filter((m) => !coordinationSlugs.has(m.slug));

type OdsItem = { id: number; label: string; color: string };

const odsHighlight: OdsItem[] = [
  { id: 11, label: "Cidades e Comunidades Sustentáveis", color: "#FD9D24" },
];

const odsSecondary: OdsItem[] = [
  { id: 1, label: "Erradicação da Pobreza", color: "#E5243B" },
  { id: 6, label: "Água Potável e Saneamento", color: "#26BDE2" },
  { id: 8, label: "Trabalho Decente e Crescimento Econômico", color: "#A21942" },
  { id: 9, label: "Indústria, Inovação e Infraestrutura", color: "#FD6925" },
  { id: 10, label: "Redução das Desigualdades", color: "#DD1367" },
  { id: 13, label: "Ação Contra a Mudança Global do Clima", color: "#3F7E44" },
  { id: 15, label: "Vida Terrestre", color: "#56C02B" },
  { id: 16, label: "Paz, Justiça e Instituições Eficazes", color: "#00689D" },
  { id: 17, label: "Parcerias e Meios de Implementação", color: "#19486A" },
];

function OdsTile({ ods, size = "default" }: { ods: OdsItem; size?: "default" | "highlight" }) {
  return (
    <div
      className={`${styles.odsTile} ${size === "highlight" ? styles.odsTileHighlight : ""}`}
      style={{ background: ods.color }}
      title={`ODS ${ods.id} — ${ods.label}`}
    >
      <span className={styles.odsTileNumber}>{ods.id}</span>
      <span className={styles.odsTileLabel}>{ods.label}</span>
    </div>
  );
}

const insights = [
  {
    slug: "ods",
    category: "Agenda 2030",
    title: "PlanUrbi e os Objetivos de Desenvolvimento Sustentável",
    summary:
      "Como a atuação do PlanUrbi territorializa a Agenda 2030 nos municípios, com destaque para o ODS 11.",
    body:
      "O PlanUrbi contribui para a territorialização da Agenda 2030 nos municípios, com destaque para o ODS 11 — Cidades e Comunidades Sustentáveis. Ao integrar planejamento urbano, cadastro territorial multifinalitário, gestão fiscal, regulação do uso do solo, mobilidade, habitação, sustentabilidade ambiental e participação social, o programa também fortalece os ODS 1, 6, 8, 9, 10, 13, 15, 16 e 17, transformando dados e diretrizes em instrumentos concretos de gestão e desenvolvimento territorial.",
    image: "/planurbi-visuals/territorial-intelligence.png",
  },
  {
    slug: "inovacao",
    category: "Inovação",
    title: "Inovação como pilar do PlanUrbi",
    summary:
      "Tecnologia, dados e conhecimento técnico combinados para uma gestão urbana mais eficiente, transparente e orientada por evidências.",
    body:
      "A inovação é um dos pilares do PlanUrbi, ao combinar conhecimento técnico, tecnologia e integração de dados para apoiar uma gestão urbana mais eficiente, transparente e orientada por evidências. Por meio de ferramentas como bases georreferenciadas, cadastros territoriais multifinalitários, diagnósticos integrados, painéis de informação e soluções digitais de monitoramento, o PlanUrbi transforma informações dispersas em instrumentos práticos para a tomada de decisão. Essa abordagem permite que os municípios antecipem desafios, qualifiquem investimentos, melhorem a arrecadação, fortaleçam o planejamento territorial e construam políticas públicas mais conectadas às necessidades reais da população.",
    image: "/planurbi-visuals/municipal-diagnostic.png",
  },
  {
    slug: "plano-diretor",
    category: "Guia técnico",
    title: "Quando revisar o Plano Diretor?",
    summary:
      "Sinais técnicos e legais que indicam a hora de atualizar o principal instrumento urbano municipal.",
    body:
      "O Plano Diretor deve ser elaborado ou revisado sempre que o município precisar atualizar sua visão de futuro, organizar o crescimento urbano e rural e fortalecer os instrumentos de planejamento territorial. A revisão é especialmente importante diante de transformações como expansão urbana acelerada, novos empreendimentos, mudanças econômicas e demográficas, aumento de riscos ambientais e climáticos, pressões sobre infraestrutura e serviços públicos ou alterações relevantes na legislação. Além das situações previstas no Estatuto da Cidade, o município deve acompanhar permanentemente a efetividade de seu Plano Diretor, garantindo que suas diretrizes estejam alinhadas às necessidades da população, à proteção ambiental, à redução das desigualdades e à construção de um território mais equilibrado, resiliente e sustentável.",
    image: "/visual-diagnostico-territorial.svg",
  },
  {
    slug: "ctm",
    category: "Inteligência territorial",
    title: "O que é Cadastro Territorial Multifinalitário?",
    summary:
      "Uma base integrada para modernizar a gestão territorial, tributária, ambiental e urbanística do município.",
    body:
      "O Cadastro Territorial Multifinalitário (CTM) é uma base integrada de informações sobre o território municipal, reunindo dados georreferenciados sobre imóveis, lotes, edificações, vias, infraestrutura, áreas públicas, equipamentos urbanos, limites administrativos, aspectos ambientais e outras características relevantes para a gestão da cidade. O CTM permite que o município conheça melhor seu território, qualifique a arrecadação, organize o uso e a ocupação do solo, apoie ações de regularização fundiária, planejamento urbano, mobilidade, habitação, meio ambiente, defesa civil e prestação de serviços públicos. Quando atualizado e integrado aos diferentes setores da administração, torna-se uma ferramenta estratégica para decisões da gestão municipal.",
    image: "/planurbi-visuals/geotech-layers.png",
  },
  {
    slug: "reurb",
    category: "Gestão urbana",
    title: "Como a REURB apoia a gestão urbana?",
    summary:
      "Como a regularização fundiária urbana fortalece governança, organização territorial e ação institucional.",
    body:
      "A Regularização Fundiária Urbana (REURB) apoia a gestão urbana ao integrar áreas informais à cidade formal, garantindo segurança jurídica para moradores, organizando o território e ampliando a capacidade do município de planejar e prestar serviços públicos. Por meio da identificação de ocupações, definição de limites, atualização cadastral e titulação dos imóveis, a REURB contribui para reduzir conflitos fundiários, orientar investimentos em infraestrutura, saneamento, mobilidade e equipamentos públicos.",
    image: "/visual-oficina-participativa.svg",
  },
];

const partners = [
  { slug: "fepesa", name: "FEPESA", logo: "/logosExternas/logo-fepesa-placeholder.png", url: "https://fepesa.org.br" },
  { slug: "ufal", name: "UFAL", logo: "", url: "https://ufal.br" },
  { slug: "gioconda", name: "Laboratório Gioconda", logo: "", url: "" },
  { slug: "bridge", name: "Bridge", logo: "", url: "" },
  { slug: "oca", name: "OCA", logo: "", url: "" },
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

type ContactStatus = "idle" | "sending" | "success" | "error";

export function NewHome() {
  const [contactStatus, setContactStatus] = useState<ContactStatus>("idle");

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      nome: String(data.get("nome") || "").trim(),
      municipio: String(data.get("municipio") || "").trim(),
      cargo: String(data.get("cargo") || "").trim(),
      email: String(data.get("email") || "").trim(),
      tipo: String(data.get("tipo") || "").trim(),
      mensagem: String(data.get("mensagem") || "").trim(),
    };

    setContactStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error("Falha ao enviar contato");
      form.reset();
      setContactStatus("success");
    } catch (error) {
      console.error(error);
      setContactStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }

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

          {(() => {
            const renderCard = (member: TeamMember, highlight: boolean) => (
              <article
                className={`${styles.teamCard} ${highlight ? styles.teamCardHighlight : ""}`}
                key={member.slug}
              >
                <div className={styles.teamPhoto}>
                  <Image
                    src={member.photo}
                    alt={`Foto de ${member.name}`}
                    width={192}
                    height={192}
                  />
                </div>
                <span className={styles.teamRole}>{member.role}</span>
                <strong className={styles.teamName}>{member.name}</strong>
                <span className={styles.teamFormation}>{member.formation}</span>
                {(member.lattes || member.linkedin || member.orcid) && (
                  <div className={styles.teamLinks}>
                    {member.lattes && (
                      <Link
                        href={member.lattes}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.teamLink}
                        aria-label={`Lattes de ${member.name}`}
                      >
                        <i className="bx bx-book-open" aria-hidden="true" />
                        <span>Lattes</span>
                      </Link>
                    )}
                    {member.linkedin && (
                      <Link
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.teamLink}
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <i className="bx bxl-linkedin" aria-hidden="true" />
                        <span>LinkedIn</span>
                      </Link>
                    )}
                    {member.orcid && (
                      <Link
                        href={member.orcid}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.teamLink}
                        aria-label={`ORCID de ${member.name}`}
                      >
                        <i className="bx bx-id-card" aria-hidden="true" />
                        <span>ORCID</span>
                      </Link>
                    )}
                  </div>
                )}
              </article>
            );
            return (
              <>
                <div className={styles.teamCoordinationLabel}>Coordenação</div>
                <div className={styles.teamGridCoordinations}>
                  {coordinationTeam.map((m) => renderCard(m, true))}
                </div>
                <div className={styles.teamMembersLabel}>Equipe</div>
                <div className={styles.teamGridMembers}>
                  {otherTeam.map((m) => renderCard(m, false))}
                </div>
              </>
            );
          })()}
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
              <Link
                href={`#artigo-${insight.slug}`}
                className={styles.insightCard}
                key={insight.slug}
                aria-label={`Ler artigo: ${insight.title}`}
              >
                <div className={styles.insightImage}>
                  <span className={styles.insightCategory}>{insight.category}</span>
                  <Image src={insight.image} alt="" width={560} height={320} />
                </div>
                <div className={styles.insightBody}>
                  <h3>{insight.title}</h3>
                  <p>{insight.summary}</p>
                  <span className={styles.insightCta}>Ler artigo</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ARTICLES (artigos completos) ===== */}
      <section
        className={`${styles.section} ${styles.sectionStone}`}
        aria-label="Artigos completos"
      >
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Artigos completos
              </span>
              <h2>Conteúdos técnicos para apoiar a decisão municipal.</h2>
            </div>
            <p>
              Materiais elaborados pela equipe do PlanUrbi para esclarecer instrumentos urbanísticos,
              boas práticas de gestão territorial e os caminhos para municípios mais sustentáveis.
            </p>
          </div>

          <div className={styles.articlesList}>
            {insights.map((article) => (
              <article
                key={article.slug}
                id={`artigo-${article.slug}`}
                className={styles.articleCard}
              >
                <div className={styles.articleHeader}>
                  <span className={styles.articleCategory}>{article.category}</span>
                  <h3>{article.title}</h3>
                </div>
                <p className={styles.articleBody}>{article.body}</p>

                {article.slug === "ods" && (
                  <div className={styles.odsBlock} aria-label="Objetivos de Desenvolvimento Sustentável relacionados">
                    <div className={styles.odsHighlightRow}>
                      <span className={styles.odsBlockLabel}>Foco principal</span>
                      <div className={styles.odsIconsRow}>
                        {odsHighlight.map((ods) => (
                          <OdsTile key={ods.id} ods={ods} size="highlight" />
                        ))}
                      </div>
                    </div>
                    <div className={styles.odsSecondaryRow}>
                      <span className={styles.odsBlockLabel}>ODS também fortalecidos</span>
                      <div className={styles.odsIconsGrid}>
                        {odsSecondary.map((ods) => (
                          <OdsTile key={ods.id} ods={ods} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <section className={styles.section} aria-label="Realização e parceiros">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Realização e parceiros
              </span>
              <h2>Uma rede técnica e institucional que sustenta o programa.</h2>
            </div>
            <p>
              O PlanUrbi é desenvolvido em colaboração com instituições de ensino, pesquisa e fomento
              que ampliam a capacidade de atuação no território.
            </p>
          </div>

          <div className={styles.partnersGrid}>
            {partners.map((partner) => {
              const inner = partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  width={240}
                  height={120}
                />
              ) : (
                <span className={styles.partnerPlaceholder}>{partner.name}</span>
              );
              return partner.url ? (
                <a
                  key={partner.slug}
                  href={partner.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.partnerCard}
                  aria-label={partner.name}
                >
                  {inner}
                </a>
              ) : (
                <div key={partner.slug} className={styles.partnerCard} title={partner.name}>
                  {inner}
                </div>
              );
            })}
          </div>
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

            <form className={styles.contactForm} onSubmit={handleContactSubmit}>
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
              <button
                className={`${styles.btn} ${styles.btnSolidGreen} ${styles.formSubmit}`}
                type="submit"
                disabled={contactStatus === "sending"}
              >
                {contactStatus === "sending" ? "Enviando..." : "Enviar solicitação"}
              </button>
              {contactStatus === "success" && (
                <p className={`${styles.formFeedback} ${styles.formFeedbackSuccess}`} role="status">
                  Solicitação enviada! A equipe do PlanUrbi retorna em até 2 dias úteis.
                </p>
              )}
              {contactStatus === "error" && (
                <p className={`${styles.formFeedback} ${styles.formFeedbackError}`} role="alert">
                  Não foi possível enviar agora. Tente novamente ou escreva para{" "}
                  <a href="mailto:projeto@planurbi.com.br">projeto@planurbi.com.br</a>.
                </p>
              )}
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
