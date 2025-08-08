'use client';

import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import styles from './AdminLayout.module.css'; 
import logoPlanurbi from '../../../../public/logo-planurbi-stagVerde.png';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();

  return (
    <div className={styles.adminWrapper}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          
          <Image src={logoPlanurbi} alt="Logo Planurbi" height={50} />
          <button onClick={logout} className={styles.logoutButton}>
            Sair
          </button>
        </div>
      </header>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}