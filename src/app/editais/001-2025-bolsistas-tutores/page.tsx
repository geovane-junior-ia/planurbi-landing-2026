import Link from 'next/link';
import styles from './EditalDetalhe.module.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import type { EditalDetalhado } from '@/types/edital'; 

export const metadata = {
  title: "Edital 001/2025 - Seleção de Bolsistas e Tutores | Planurbi",
  description: "Detalhes do Processo Seletivo Simplificado para o projeto Planurbi Barra de São Miguel.",
};


const edital: EditalDetalhado = {
  numero: "001/2025",
  titulo: "Processo Seletivo Simplificado Nº 001/2025",
  subtitulo: "Este edital torna pública a seleção de bolsistas e tutores para atuação no projeto PlanUrbi Barra de São Miguel, visando a formação de cadastro de reserva e a mobilização de colaboradores para as atividades de campo.",
  tipo: "Simplificado",
  status: "em andamento",
  link: "/editais/001-2025-bolsistas-tutores", 
  periodoInscricao: "De 08/08/2025 [12:00h] à 22/08/2025 [17:00h]",
  anexos: [
    {
      titulo: "Edital Completo em PDF",
      url: "/docs/editais/edital-001-2025-bolsistas.pdf",
    },
    
  ],
};


function StatusEdital({ status }: { status: EditalDetalhado['status'] }) {
  if (status === 'em andamento') {
    return <span className={styles.statusAndamento}>Em andamento</span>;
  }
  // Adicionar outros status aqui se necessário
  return <span>{status}</span>;
}


export default function EditalDetalhePage() {
  return (
    <>
      <Header />
      <div className={styles.pageWrapper}>
        <main className={styles.page}>
          <div className={styles.breadcrumb}>
            <Link href="/editais">Editais</Link> / <span>Edital Nº {edital.numero}</span>
          </div>

          <div className={styles.layout}>
            {/* Coluna Principal */}
            <div className={styles.mainContent}>
              <header className={styles.header}>
                <h1>{edital.titulo}</h1>
                <p className={styles.subtitle}>{edital.subtitulo}</p>
              </header>

              <div className={styles.actions}>
                <Link href="/selecao-campo" className={`${styles.button} ${styles.primary}`}>
                  <i className='bx bxs-edit-alt'></i> Inscreva-se
                </Link>
                <a href={edital.anexos[0].url} target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.secondary}`}>
                  <i className='bx bx-show'></i> Ver Edital
                </a>
              </div>
            </div>

            {/* Coluna Lateral */}
            <aside className={styles.sidebar}>
              <div className={styles.infoBox}>
                <h3>Informações Gerais</h3>
                <ul>
                  <li>
                    <i className='bx bx-file'></i>
                    <div>
                      <strong>Tipo:</strong>
                      <span>{edital.tipo}</span>
                    </div>
                  </li>
                  <li>
                    <i className='bx bx-time-five'></i>
                    <div>
                      <strong>Status:</strong>
                      <StatusEdital status={edital.status} />
                    </div>
                  </li>
                  <li>
                    <i className='bx bx-calendar-check'></i>
                    <div>
                      <strong>Inscrições:</strong>
                      <span>{edital.periodoInscricao}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className={styles.infoBox}>
                <h3>Anexos</h3>
                {edital.anexos.map((anexo) => (
                  <a key={anexo.titulo} href={anexo.url} target="_blank" rel="noopener noreferrer" className={styles.anexoLink}>
                    <i className='bx bxs-file-pdf'></i>
                    <span>{anexo.titulo}</span>
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}