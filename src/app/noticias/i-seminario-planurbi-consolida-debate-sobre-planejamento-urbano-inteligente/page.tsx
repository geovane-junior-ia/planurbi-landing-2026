'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import styles from './Noticia.module.css';

// --- CONTEÚDO DA NOTÍCIA ---
const noticia = {
  titulo: "I Seminário PlanUrbi consolida debate sobre planejamento urbano inteligente",
  subtitulo: "Evento discutiu inovação, legislação e inteligência artificial no planejamento das cidades.",

  imagemPrincipalUrl: "/noticias/1-seminario/foto-destaque.jpeg", 
  dataPublicacao: "15 de Agosto de 2025",
  texto: `Mais de 100 pessoas participaram, na última quarta-feira (13), do I Seminário PlanUrbi – Planejamento Territorial: suas implicações e correspondências, realizado pela Fundação de Apoio ao Ensino, Pesquisa e Extensão de Alagoas (FEPESA) no auditório do CREA/AL, em Maceió. O espaço ficou completamente lotado para receber um público formado por gestores, especialistas, acadêmicos e representantes da sociedade civil.\n\n
O evento foi um marco na troca de conhecimentos e experiências sobre planejamento urbano, cidades inteligentes e as legislações que regem o ecossistema urbano. A programação contou com oito palestras, apresentando desde conceitos e metodologias até casos práticos, como o piloto do PlanUrbi que já está em andamento na Barra de São Miguel.\n\n
Entre as novidades, o público conheceu a Bárbara, assistente de inteligência artificial que fará a ponte entre as ações do projeto e a população. Os conteúdos foram distribuídos em três blocos, intercalados por sessões de perguntas e respostas feitas diretamente no portal do PlanUrbi, por meio de QR Codes espalhados pelo auditório.\n\n
O diretor-presidente da FEPESA e coordenador geral do PlanUrbi, Ricardo Wanderley, celebrou o sucesso da iniciativa. “Nós conseguimos alcançar exatamente o que pretendíamos: provocar essa discussão no debate público sobre planejamento. É um tema muitas vezes deixado de lado, mas que com o esforço da FEPESA, dos palestrantes e com o apoio CREA, conseguimos colocar em pauta”, afirmou.\n\n
Entre os destaques, a palestra de encerramento foi ministrada pelo arquiteto e urbanista Mário Beznos, referência nacional em planejamento regional e urbano, com mais de 50 anos de experiência.\n\n
No primeiro bloco, a arquiteta e urbanista Melissa Mota, coordenadora técnica do PlanUrbi, abordou os conceitos e diretrizes que orientam o projeto. “Reunimos profissionais de geoprocessamento, urbanismo e direito para pensar juntos soluções inclusivas para o planejamento urbano e territorial. Esse é só o começo, vamos ampliar esse debate”, destacou.\n\n
A cientista da computação Raquel Cabral, coordenadora de tecnologia do PlanUrbi, explicou como a inteligência artificial está sendo usada no projeto. “Estamos coletando dados dispersos e transformando em informação útil para a gestão municipal, com dashboards e ferramentas que apoiam decisões estratégicas”, disse.\n\n
Já a registradora civil e tabeliã Karoline Mafra, uma das palestrantes, falou sobre o papel da regularização fundiária. “Regularizar núcleos urbanos informais é garantir cidadania, moradia digna e senso de pertencimento, fortalecendo a economia local e o desenvolvimento sustentável”, ressaltou.\n\n
O evento também contou com palestras da advogada Andressa Targino, sobre impactos tributários do planejamento urbano; da arqueóloga Rute Barbosa, sobre mapeamento georreferenciado; e da advogada Paloma Tojal, sobre a parceria entre planejamento urbano e gestão municipal.\n\n
Ainda segundo Ricardo Wanderley o seminário inaugura um ciclo de encontros. “Hoje semeamos um projeto mais amplo. Esse é o primeiro de uma série de eventos que pretende criar um fórum permanente de discussão sobre a produção das nossas cidades. Vamos continuar mobilizando e engajando todos nesse debate”.\n\n
O encerramento foi marcado por um happy hour na Toca do Calango, no bairro do Jaraguá, ao som das bandas Caetech e Expresso 59.`,
  // --- GALERIA DE FOTOS ---

  galleryImages: Array.from({ length: 15 }, (_, i) => `/noticias/1-seminario/foto-${i + 1}.jpeg`),
  servico: {
    titulo: "Sobre o PlanUrbi",
    itens: [
      "O PlanUrbi é um programa de desenvolvimento e organização urbana que busca, através da atualização do Plano Diretor, orientar o crescimento de cidades. O projeto, com vida própria, é aplicado em diferentes municípios, sendo Barra de São Miguel o local de sua aplicação atual. O programa preza pela participação popular, integrando a comunidade ao processo de planejamento de sua cidade.",
    ]
  }
};

export default function NoticiaSeminarioPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % noticia.galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + noticia.galleryImages.length) % noticia.galleryImages.length);
  };

  return (
    <>
      <Header />
      <main className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <Link href="/noticias" className={styles.topBackButton}>
            <i className='bx bx-left-arrow-alt'></i> Voltar para Notícias
          </Link>

          <article className={styles.articleContainer}>
            <header className={styles.articleHeader}>
              <span className={styles.date}>{noticia.dataPublicacao}</span>
              <h1 className={styles.title}>{noticia.titulo}</h1>
              <p className={styles.subtitle}>{noticia.subtitulo}</p>
            </header>

            <div className={styles.imageWrapper}>
              <Image
                src={noticia.imagemPrincipalUrl}
                alt={`Imagem da notícia: ${noticia.titulo}`}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>

            <div className={styles.articleBody}>
              {noticia.texto.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Galeria de Fotos */}
            <div className={styles.gallerySection}>
              <h2 className={styles.galleryTitle}>Galeria de Fotos</h2>
              <div className={styles.galleryGrid}>
                {noticia.galleryImages.map((src, index) => (
                  <div key={index} className={styles.galleryItem} onClick={() => openModal(index)}>
                    <Image
                      src={src}
                      alt={`Foto ${index + 1} do seminário`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.serviceBlock}>
              <h3>{noticia.servico.titulo}</h3>
              <ul>
                {noticia.servico.itens.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </main>
      <Footer />

     
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <button className={`${styles.modalButton} ${styles.closeButton}`} onClick={closeModal}>
            <i className='bx bx-x'></i>
          </button>
          <button className={`${styles.modalButton} ${styles.prevButton}`} onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <i className='bx bx-chevron-left'></i>
          </button>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={noticia.galleryImages[selectedImageIndex]}
              alt={`Foto ${selectedImageIndex + 1} do seminário em tela cheia`}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <button className={`${styles.modalButton} ${styles.nextButton}`} onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <i className='bx bx-chevron-right'></i>
          </button>
        </div>
      )}
    </>
  );
}