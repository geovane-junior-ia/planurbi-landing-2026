"use client";

import { FormEvent, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import withAuth from "@/components/auth/withAuth";
import { defaultSiteContent, Insight, Project, SiteContent, Solution } from "@/content/siteContent";
import { db } from "@/lib/firebaseClient";
import styles from "./ConteudoSite.module.css";

const emptySolution: Solution = {
  title: "",
  axis: "",
  description: "",
  items: [],
};

const emptyProject: Project = {
  title: "",
  location: "",
  description: "",
};

const emptyInsight: Insight = {
  title: "",
  description: "",
};

function toLines(items: string[]) {
  return items.join("\n");
}

function fromLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function ConteudoSitePage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function loadContent() {
      try {
        const snapshot = await getDoc(doc(db, "siteContent", "main"));
        if (snapshot.exists()) {
          setContent({ ...defaultSiteContent, ...snapshot.data() } as SiteContent);
        }
      } catch (error) {
        console.error(error);
        setStatus("Nao foi possivel carregar o conteudo publicado. Usando conteudo padrao.");
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    try {
      await setDoc(doc(db, "siteContent", "main"), content, { merge: true });
      setStatus("Conteudo salvo com sucesso.");
    } catch (error) {
      console.error(error);
      setStatus("Nao foi possivel salvar. Verifique permissao e configuracao do Firebase.");
    } finally {
      setSaving(false);
    }
  }

  function updateSolution(index: number, nextSolution: Solution) {
    setContent((current) => ({
      ...current,
      solutions: current.solutions.map((solution, itemIndex) => (itemIndex === index ? nextSolution : solution)),
    }));
  }

  function updateProject(index: number, nextProject: Project) {
    setContent((current) => ({
      ...current,
      projects: current.projects.map((project, itemIndex) => (itemIndex === index ? nextProject : project)),
    }));
  }

  function updateInsight(index: number, nextInsight: Insight) {
    setContent((current) => ({
      ...current,
      insights: current.insights.map((insight, itemIndex) => (itemIndex === index ? nextInsight : insight)),
    }));
  }

  if (loading) {
    return <p>Carregando conteudo do site...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Conteudo do site</h1>
          <p className={styles.subtitle}>
            Atualize os blocos principais da Home institucional: Quem somos, Solucoes, Metodologia, Projetos, Conteudo
            e Contato.
          </p>
        </div>
        {status && <p className={styles.status}>{status}</p>}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.section}>
          <h2>Home</h2>
          <div className={styles.grid}>
            <label className={styles.field}>
              <span>Titulo principal</span>
              <input
                className={styles.input}
                value={content.hero.headline}
                onChange={(event) =>
                  setContent((current) => ({ ...current, hero: { ...current.hero, headline: event.target.value } }))
                }
              />
            </label>
            <label className={styles.field}>
              <span>CTA principal</span>
              <input
                className={styles.input}
                value={content.hero.primaryCta}
                onChange={(event) =>
                  setContent((current) => ({ ...current, hero: { ...current.hero, primaryCta: event.target.value } }))
                }
              />
            </label>
          </div>
          <label className={styles.field}>
            <span>Texto de apoio</span>
            <textarea
              className={styles.textarea}
              value={content.hero.subtext}
              onChange={(event) =>
                setContent((current) => ({ ...current, hero: { ...current.hero, subtext: event.target.value } }))
              }
            />
          </label>
        </section>

        <section className={styles.section}>
          <h2>Quem somos</h2>
          <label className={styles.field}>
            <span>Titulo</span>
            <input
              className={styles.input}
              value={content.about.title}
              onChange={(event) =>
                setContent((current) => ({ ...current, about: { ...current.about, title: event.target.value } }))
              }
            />
          </label>
          <label className={styles.field}>
            <span>Texto</span>
            <textarea
              className={styles.textarea}
              value={content.about.body}
              onChange={(event) =>
                setContent((current) => ({ ...current, about: { ...current.about, body: event.target.value } }))
              }
            />
          </label>
          <label className={styles.field}>
            <span>Valores e diferenciais, um por linha</span>
            <textarea
              className={styles.textarea}
              value={toLines(content.about.values)}
              onChange={(event) =>
                setContent((current) => ({
                  ...current,
                  about: { ...current.about, values: fromLines(event.target.value) },
                }))
              }
            />
          </label>
        </section>

        <section className={styles.section}>
          <h2>Solucoes</h2>
          <div className={styles.itemList}>
            {content.solutions.map((solution, index) => (
              <div className={styles.itemCard} key={`${solution.title}-${index}`}>
                <div className={styles.grid}>
                  <input
                    className={styles.input}
                    placeholder="Titulo"
                    value={solution.title}
                    onChange={(event) => updateSolution(index, { ...solution, title: event.target.value })}
                  />
                  <input
                    className={styles.input}
                    placeholder="Eixo"
                    value={solution.axis}
                    onChange={(event) => updateSolution(index, { ...solution, axis: event.target.value })}
                  />
                </div>
                <textarea
                  className={styles.textarea}
                  placeholder="Descricao"
                  value={solution.description}
                  onChange={(event) => updateSolution(index, { ...solution, description: event.target.value })}
                />
                <textarea
                  className={styles.textarea}
                  placeholder="Itens, um por linha"
                  value={toLines(solution.items)}
                  onChange={(event) => updateSolution(index, { ...solution, items: fromLines(event.target.value) })}
                />
                <div className={styles.itemActions}>
                  <button
                    type="button"
                    className={styles.dangerButton}
                    onClick={() =>
                      setContent((current) => ({
                        ...current,
                        solutions: current.solutions.filter((_, itemIndex) => itemIndex !== index),
                      }))
                    }
                  >
                    Remover solucao
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setContent((current) => ({ ...current, solutions: [...current.solutions, emptySolution] }))}
          >
            Adicionar solucao
          </button>
        </section>

        <section className={styles.section}>
          <h2>Metodologia</h2>
          <label className={styles.field}>
            <span>Titulo</span>
            <input
              className={styles.input}
              value={content.methodology.title}
              onChange={(event) =>
                setContent((current) => ({
                  ...current,
                  methodology: { ...current.methodology, title: event.target.value },
                }))
              }
            />
          </label>
          <label className={styles.field}>
            <span>Introducao</span>
            <textarea
              className={styles.textarea}
              value={content.methodology.intro}
              onChange={(event) =>
                setContent((current) => ({
                  ...current,
                  methodology: { ...current.methodology, intro: event.target.value },
                }))
              }
            />
          </label>
          <label className={styles.field}>
            <span>Etapas, uma por linha</span>
            <textarea
              className={styles.textarea}
              value={toLines(content.methodology.steps)}
              onChange={(event) =>
                setContent((current) => ({
                  ...current,
                  methodology: { ...current.methodology, steps: fromLines(event.target.value) },
                }))
              }
            />
          </label>
        </section>

        <section className={styles.section}>
          <h2>Projetos</h2>
          <div className={styles.itemList}>
            {content.projects.map((project, index) => (
              <div className={styles.itemCard} key={`${project.title}-${index}`}>
                <div className={styles.grid}>
                  <input
                    className={styles.input}
                    placeholder="Titulo"
                    value={project.title}
                    onChange={(event) => updateProject(index, { ...project, title: event.target.value })}
                  />
                  <input
                    className={styles.input}
                    placeholder="Local"
                    value={project.location}
                    onChange={(event) => updateProject(index, { ...project, location: event.target.value })}
                  />
                </div>
                <textarea
                  className={styles.textarea}
                  placeholder="Descricao"
                  value={project.description}
                  onChange={(event) => updateProject(index, { ...project, description: event.target.value })}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setContent((current) => ({ ...current, projects: [...current.projects, emptyProject] }))}
          >
            Adicionar projeto
          </button>
        </section>

        <section className={styles.section}>
          <h2>Conteudo</h2>
          <div className={styles.itemList}>
            {content.insights.map((insight, index) => (
              <div className={styles.itemCard} key={`${insight.title}-${index}`}>
                <input
                  className={styles.input}
                  placeholder="Titulo"
                  value={insight.title}
                  onChange={(event) => updateInsight(index, { ...insight, title: event.target.value })}
                />
                <textarea
                  className={styles.textarea}
                  placeholder="Descricao"
                  value={insight.description}
                  onChange={(event) => updateInsight(index, { ...insight, description: event.target.value })}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setContent((current) => ({ ...current, insights: [...current.insights, emptyInsight] }))}
          >
            Adicionar conteudo
          </button>
        </section>

        <section className={styles.section}>
          <h2>Contato</h2>
          <div className={styles.grid}>
            <label className={styles.field}>
              <span>E-mail</span>
              <input
                className={styles.input}
                value={content.contact.email}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    contact: { ...current.contact, email: event.target.value },
                  }))
                }
              />
            </label>
            <label className={styles.field}>
              <span>Chamada</span>
              <input
                className={styles.input}
                value={content.contact.cta}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    contact: { ...current.contact, cta: event.target.value },
                  }))
                }
              />
            </label>
          </div>
        </section>

        <div className={styles.actions}>
          <button type="submit" className={styles.button} disabled={saving}>
            {saving ? "Salvando..." : "Salvar conteudo"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default withAuth(ConteudoSitePage);
