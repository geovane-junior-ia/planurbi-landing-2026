import Link from 'next/link';
import styles from './EditalCard.module.css';
import type { Edital } from '@/types/edital'; 

// Mapeamento do status para a classe CSS da borda
const borderClasses = {
  'em andamento': styles.borderAndamento,
  'concluído': styles.borderConcluido,
  'encerrado': styles.borderEncerrado,
};

// Mapeamento do status para a classe CSS do emblema (badge)
const statusClasses = {
  'em andamento': styles.statusAndamento,
  'concluído': styles.statusConcluido,
  'encerrado': styles.statusEncerrado,
};

export default function EditalCard({ numero, titulo, tipo, status, link }: Edital) {
  return (
    
    <Link href={link} className={`${styles.card} ${borderClasses[status]}`}>
      
     
      <div className={styles.cardHeader}>
        <h2 className={styles.numeroEdital}>Processo Seletivo Simplificado {numero}</h2>
      </div>

      
      <div className={styles.cardBody}>
        <h3 className={styles.titulo}>{titulo}</h3>
        
       
        <div className={styles.metaItem}>
          <i className='bx bx-file'></i>
          <span><strong>Tipo:</strong> {tipo}</span>
        </div>
        
        
      </div>

      
      <div className={styles.cardFooter}>
        <span className={`${styles.status} ${statusClasses[status]}`}>
          {status}
        </span>
        <div className={styles.detailsLink}>
          <span>Ver Detalhes</span>
          <i className='bx bx-right-arrow-alt'></i>
        </div>
      </div>
    </Link>
  );
}