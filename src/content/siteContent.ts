export type Solution = {
  title: string;
  axis: string;
  description: string;
  items: string[];
};

export type Project = {
  title: string;
  location: string;
  description: string;
};

export type Insight = {
  title: string;
  description: string;
};

export type ContactInfo = {
  email: string;
  phone: string;
  cta: string;
};

export type SiteContent = {
  hero: {
    headline: string;
    subtext: string;
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    title: string;
    body: string;
    values: string[];
  };
  solutions: Solution[];
  methodology: {
    title: string;
    intro: string;
    steps: string[];
  };
  projects: Project[];
  insights: Insight[];
  contact: ContactInfo;
};

export const defaultSiteContent: SiteContent = {
  hero: {
    headline: "Planejamento urbano inteligente para transformar municipios",
    subtext:
      "Transformamos desafios urbanos em solucoes tecnicas integradas que apoiam municipios na organizacao do territorio e na qualificacao da gestao publica, articulando dados, legislacao, tecnologia e participacao social.",
    primaryCta: "Solicitar proposta",
    secondaryCta: "Conhecer solucoes",
  },
  about: {
    title: "O PlanUrbi conecta planejamento, dados e gestao publica",
    body:
      "O PlanUrbi nasce para resolver uma das maiores lacunas do planejamento urbano brasileiro: a distancia entre o plano e a pratica. Estruturamos solucoes que transformam diagnosticos em instrumentos de gestao e planejamento em acao.",
    values: [
      "Rigor tecnico e base legal",
      "Inteligencia territorial",
      "Participacao e transparencia",
      "Solucoes aplicaveis a realidade municipal",
    ],
  },
  solutions: [
    {
      title: "Planejamento Territorial e Ordenamento Urbano",
      axis: "Instrumentos urbanisticos",
      description:
        "Diretrizes, codigos e estudos para organizar o crescimento urbano e fortalecer a seguranca tecnica da gestao.",
      items: [
        "Plano Diretor",
        "Codigo de Edificacoes",
        "Codigo de Postura Urbana",
        "Codigo de Meio Ambiente",
        "Estudo de Impacto de Vizinhanca",
      ],
    },
    {
      title: "Habitacao e Regularizacao Fundiaria",
      axis: "Direito a moradia",
      description:
        "Solucoes para organizar territorios consolidados, qualificar politicas habitacionais e ampliar inclusao urbana.",
      items: ["REURB", "Plano Local de Habitacao de Interesse Social"],
    },
    {
      title: "Dados, Inteligencia Territorial e Geotecnologias",
      axis: "Gestao baseada em evidencias",
      description:
        "Bases georreferenciadas, diagnosticos e paineis para apoiar decisoes publicas com informacao qualificada.",
      items: [
        "Cadastro Territorial Multifinalitario",
        "Mapeamento Georreferenciado do Territorio",
        "Diagnostico Inteligente do Municipio",
      ],
    },
    {
      title: "Gestao e Implementacao do Planejamento",
      axis: "Continuidade tecnica",
      description:
        "Apoio para transformar instrumentos urbanisticos em rotina administrativa, monitoramento e resultados concretos.",
      items: ["Apoio tecnico municipal", "Capacitacao", "Indicadores de acompanhamento"],
    },
  ],
  methodology: {
    title: "Uma metodologia voltada a implementacao",
    intro:
      "Integramos planejamento territorial, dados, tecnologia e gestao publica para construir instrumentos aplicaveis, inteligentes e adaptados a realidade de cada municipio.",
    steps: [
      "Imersao e diagnostico territorial",
      "Organizacao de dados e mapeamento",
      "Participacao social e escuta ativa",
      "Construcao de diretrizes e instrumentos legais",
      "Entrega tecnica e apoio a implementacao",
      "Monitoramento e inteligencia territorial",
    ],
  },
  projects: [
    {
      title: "PlanUrbi Craibas",
      location: "Craibas, AL",
      description:
        "Apoio ao planejamento territorial e a estruturacao de instrumentos para qualificacao da gestao municipal.",
    },
    {
      title: "PlanUrbi Barra de Sao Miguel",
      location: "Barra de Sao Miguel, AL",
      description:
        "Projeto com acoes de participacao, leitura territorial e construcao de bases para desenvolvimento urbano.",
    },
  ],
  insights: [
    {
      title: "Quando revisar o Plano Diretor?",
      description:
        "Entenda os sinais tecnicos e legais que indicam a necessidade de atualizar o principal instrumento urbano municipal.",
    },
    {
      title: "O que e Cadastro Territorial Multifinalitario?",
      description:
        "Uma base integrada para modernizar a gestao territorial, tributaria, ambiental e urbanistica do municipio.",
    },
    {
      title: "Erros comuns no planejamento urbano municipal",
      description:
        "Dados dispersos, baixa integracao entre secretarias e pouca conexao entre plano e rotina de gestao.",
    },
  ],
  contact: {
    email: "contato@planurbi.com.br",
    phone: "",
    cta: "Solicite um diagnostico inicial",
  },
};
