"use client";
import { useState, useEffect } from 'react';
import styles from './RelatorioSeminario.module.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { db } from '@/lib/firebaseClient';
import withAuth from '@/components/auth/withAuth';
import { collection, query, onSnapshot, orderBy, doc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';


interface Participante {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  cpf: string;
  created_at: Timestamp; 
  presente: boolean;
}


enum MessageType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

function RelatorioSeminarioPage() {
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cpfBusca, setCpfBusca] = useState('');
  const [participanteEncontrado, setParticipanteEncontrado] = useState<Participante | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagemBusca, setMensagemBusca] = useState<{ text: string; type: MessageType } | null>(null);
  const [validando, setValidando] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'seminario_inscricoes'), orderBy('created_at', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const participantesData: Participante[] = [];
      querySnapshot.forEach((doc) => {
        participantesData.push({
          id: doc.id,
          ...doc.data(),
          presente: doc.data().presente || false, 
        } as Participante);
      });
      setParticipantes(participantesData);
      setLoading(false);
    }, (err) => {
      console.error("Erro ao buscar dados do Firebase:", err);
      setError("Não foi possível carregar os dados dos participantes.");
      setLoading(false);
    });

    
    return () => unsubscribe();
  }, []);

  const handleBuscaCPF = (e: React.FormEvent) => {
    e.preventDefault();
    setMensagemBusca(null);
    setParticipanteEncontrado(null);

    if (!cpfBusca) {
      setMensagemBusca({ text: 'Por favor, digite um CPF.', type: MessageType.Error });
      return;
    }

    const encontrado = participantes.find(p => p.cpf.replace(/\D/g, '') === cpfBusca.replace(/\D/g, ''));
    
    if (encontrado) {
      setParticipanteEncontrado(encontrado);
      setModalAberto(true);
    } else {
      setMensagemBusca({ text: 'CPF não encontrado na lista de inscritos.', type: MessageType.Error });
    }
  };

  
  const handleConfirmarPresenca = async () => {
    if (!participanteEncontrado) return;

    if (participanteEncontrado.presente) {
        setMensagemBusca({ text: 'Este participante já realizou o check-in.', type: MessageType.Info });
        closeModal();
        return;
    }

    setValidando(true);
    try {
      const participanteRef = doc(db, 'seminario_inscricoes', participanteEncontrado.id);
      
      await updateDoc(participanteRef, {
        presente: true,
        data_checkin: serverTimestamp()
      });

      
      setMensagemBusca({ text: `Presença de ${participanteEncontrado.nome} confirmada com sucesso!`, type: MessageType.Success });
      closeModal();

    } catch (err) {
      console.error("Erro ao validar presença:", err);
      setMensagemBusca({ text: "Ocorreu um erro na validação.", type: MessageType.Error });
    } finally {
      setValidando(false);
    }
  };
  
  const closeModal = () => {
    setModalAberto(false);
    setParticipanteEncontrado(null);
    setCpfBusca('');
  };


  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Relatório de Inscrições - I Seminário PlanUrbi", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Total de Inscritos: ${participantes.length}`, 14, 30);
    doc.text(`Total de Presentes: ${participantes.filter(p => p.presente).length}`, 14, 36);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 42);
    
    autoTable(doc, {
      startY: 50,
      head: [['Nº', 'Nome', 'CPF', 'Email', 'Status']],
      body: participantes.map((p, index) => [
        index + 1, 
        p.nome, 
        p.cpf, 
        p.email, 
        p.presente ? 'Presente' : 'Ausente'
      ]),
      theme: 'striped',
      headStyles: { fillColor: [0, 54, 45] },
    });
    doc.save('relatorio-inscricoes-seminario.pdf');
  };
  
  const getMessageStyle = (type: MessageType) => {
    switch (type) {
      case MessageType.Success:
        return styles.searchMessageSuccess;
      case MessageType.Error:
        return styles.searchMessageError;
      case MessageType.Info:
        return styles.searchMessageInfo;
      default:
        return '';
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentCard}>
        <h1 className={styles.title}>Relatório de Inscrições do Seminário</h1>
        <p className={styles.description}>
          Acompanhe os inscritos e realize o check-in dos participantes no dia do evento.
        </p>
        
        <div className={styles.topSection}>
            <div className={styles.checkinContainer}>
                <h2 className={styles.checkinTitle}>Check-in do Participante</h2>
                <form onSubmit={handleBuscaCPF} className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Digite o CPF do participante"
                        className={styles.searchInput}
                        value={cpfBusca}
                        onChange={(e) => setCpfBusca(e.target.value)}
                    />
                    <button type="submit" className={styles.searchButton}>
                        <i className='bx bx-search'></i> Buscar
                    </button>
                </form>
                {mensagemBusca && <p className={`${styles.searchMessage} ${getMessageStyle(mensagemBusca.type)}`}>{mensagemBusca.text}</p>}
            </div>

            <div className={styles.summaryWrapper}>
                <div className={styles.summaryCard}>
                    <h3>Total de Inscritos</h3>
                    <span>{participantes.length}</span>
                </div>
                <div className={styles.summaryCard}>
                    <h3>Presentes</h3>
                    <span>{participantes.filter(p => p.presente).length}</span>
                </div>
            </div>
        </div>

        <hr className={styles.divider} />

        {loading && <p>A carregar participantes...</p>}
        {error && <p className={styles.error}>{error}</p>}
        
        {!loading && !error && (
          <>
            <div className={styles.listHeader}>
                <h2 className={styles.listTitle}>Lista de Inscritos</h2>
                <button onClick={gerarPDF} className={styles.pdfButton} disabled={participantes.length === 0}>
                    <i className='bx bxs-file-pdf'></i>
                    Gerar PDF
                </button>
            </div>

            <div className={styles.tableContainer}>
              <table>
                <thead>
                  <tr>
                    <th>Nº</th>
                    <th>Nome Completo</th>
                    <th>CPF</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {participantes.map((p, index) => (
                    <tr key={p.id}>
                      <td>{index + 1}</td>
                      <td>{p.nome}</td>
                      <td>{p.cpf}</td>
                      <td>{p.email}</td>
                      <td className={styles.statusCell}>
                        <span className={p.presente ? styles.statusPresente : styles.statusAusente}>
                          {p.presente ? 'Presente' : 'Ausente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {modalAberto && participanteEncontrado && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h3>Confirmar Presença</h3>
                    <button onClick={closeModal} className={styles.closeButton}>&times;</button>
                </div>
                <div className={styles.modalBody}>
                    <p>Você deseja confirmar a presença do participante abaixo?</p>
                    <strong>Nome:</strong> {participanteEncontrado.nome}<br/>
                    <strong>CPF:</strong> {participanteEncontrado.cpf}
                    {participanteEncontrado.presente && <p className={styles.alreadyCheckedIn}>Este participante já realizou o check-in.</p>}
                </div>
                <div className={styles.modalActions}>
                    <button onClick={closeModal} className={styles.cancelButton}>Cancelar</button>
                    <button 
                        onClick={handleConfirmarPresenca} 
                        className={styles.confirmButton}
                        disabled={participanteEncontrado.presente || validando}
                    >
                        {validando ? 'Confirmando...' : 'Confirmar Presença'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}


export default withAuth(RelatorioSeminarioPage);