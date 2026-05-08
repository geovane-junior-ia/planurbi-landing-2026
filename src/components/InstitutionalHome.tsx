"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { defaultSiteContent, SiteContent } from "@/content/siteContent";
import styles from "./InstitutionalHome.module.css";

export function InstitutionalHome() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    async function loadContent() {
      try {
        const snapshot = await getDoc(doc(db, "siteContent", "main"));
        if (snapshot.exists()) {
          setContent({ ...defaultSiteContent, ...snapshot.data() } as SiteContent);
        }
      } catch (error) {
        console.warn("Nao foi possivel carregar o conteudo do site.", error);
      }
    }

    loadContent();
  }, []);

  return (
    <main className={styles.page}>
      <section className={styles.hero} id="inicio">
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Planejamento urbano, dados e gestao publica</p>
          <h1>{content.hero.headline}</h1>
          <p className={styles.heroText}>{content.hero.subtext}</p>
          <div className={styles.actions}>
            <a href="#contato" className={styles.primaryButton}>
              {content.hero.primaryCta}
            </a>
            <a href="#solucoes" className={styles.secondaryButton}>
              {content.hero.secondaryCta}
            </a>
          </div>
        </div>
        <div className={styles.heroPanel} aria-label="Painel estrategico de solucoes">
          <span>Diagnostico</span>
          <span>Dados georreferenciados</span>
          <span>Base legal</span>
          <span>Participacao social</span>
          <span>Implementacao</span>
        </div>
      </section>

      <section className={styles.section} id="quem-somos">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Quem somos</p>
          <h2>{content.about.title}</h2>
        </div>
        <div className={styles.aboutGrid}>
          <p>{content.about.body}</p>
          <div className={styles.valueGrid}>
            {content.about.values.map((value) => (
              <div className={styles.valueCard} key={value}>
                {value}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="solucoes">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Solucoes</p>
          <h2>Um catalogo organizado pelas demandas reais dos municipios</h2>
        </div>
        <div className={styles.solutionGrid}>
          {content.solutions.map((solution) => (
            <article className={styles.solutionCard} key={solution.title}>
              <span>{solution.axis}</span>
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
              <ul>
                {solution.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.methodology} id="metodologia">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Metodologia</p>
          <h2>{content.methodology.title}</h2>
          <p>{content.methodology.intro}</p>
        </div>
        <ol className={styles.timeline}>
          {content.methodology.steps.map((step, index) => (
            <li key={step}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} id="projetos">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Projetos</p>
          <h2>Experiencias que demonstram capacidade tecnica e presenca territorial</h2>
        </div>
        <div className={styles.projectGrid}>
          {content.projects.map((project) => (
            <article className={styles.projectCard} key={project.title}>
              <span>{project.location}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="conteudo">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Conteudo</p>
          <h2>Conhecimento para apoiar gestores publicos</h2>
        </div>
        <div className={styles.insightGrid}>
          {content.insights.map((insight) => (
            <article className={styles.insightCard} key={insight.title}>
              <h3>{insight.title}</h3>
              <p>{insight.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.diagnostic}>
        <div>
          <p className={styles.eyebrow}>Area estrategica</p>
          <h2>Seu municipio precisa de que?</h2>
          <p>
            O proximo passo e transformar esta area em um diagnostico interativo que recomenda solucoes conforme as
            respostas do gestor.
          </p>
        </div>
        <a href="#contato" className={styles.primaryButton}>
          Conversar com especialista
        </a>
      </section>

      <section className={styles.contact} id="contato">
        <div>
          <p className={styles.eyebrow}>Contato</p>
          <h2>{content.contact.cta}</h2>
          <p>Conte para a equipe do PlanUrbi qual e a demanda do municipio.</p>
        </div>
        <a href={`mailto:${content.contact.email}`} className={styles.emailLink}>
          {content.contact.email}
        </a>
      </section>
    </main>
  );
}
