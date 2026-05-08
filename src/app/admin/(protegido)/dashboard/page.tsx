"use client";

import Link from "next/link";
import withAuth from "@/components/auth/withAuth";
import styles from "./Dashboard.module.css";
import { FaClipboardList, FaEdit, FaQuestionCircle, FaUsers } from "react-icons/fa";

function DashboardHub() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Painel de Controle</h1>
      <p className={styles.subtitle}>Selecione uma area para gerenciar.</p>

      <div className={styles.grid}>
        <Link href="/admin/conteudo" className={styles.card}>
          <div className={styles.cardIconWrapper}>
            <FaEdit className={styles.cardIcon} />
          </div>
          <h2 className={styles.cardTitle}>Conteudo do Site</h2>
          <p className={styles.cardDescription}>
            Atualize Home, Quem somos, Solucoes, Metodologia, Projetos, Conteudo e Contato.
          </p>
        </Link>

        <Link href="/admin/relatorio-seminario" className={styles.card}>
          <div className={styles.cardIconWrapper}>
            <FaClipboardList className={styles.cardIcon} />
          </div>
          <h2 className={styles.cardTitle}>Relatorio do Seminario</h2>
          <p className={styles.cardDescription}>
            Acompanhe os inscritos e realize o check-in dos participantes no dia do evento.
          </p>
        </Link>

        <Link href="/admin/seminario-perguntas" className={styles.card}>
          <div className={styles.cardIconWrapper}>
            <FaQuestionCircle className={styles.cardIcon} />
          </div>
          <h2 className={styles.cardTitle}>Perguntas do Seminario</h2>
          <p className={styles.cardDescription}>
            Modere e gerencie as perguntas enviadas durante o seminario em tempo real.
          </p>
        </Link>

        <Link href="/admin/bolsistas" className={styles.card}>
          <div className={styles.cardIconWrapper}>
            <FaUsers className={styles.cardIcon} />
          </div>
          <h2 className={styles.cardTitle}>Gerenciar Bolsistas</h2>
          <p className={styles.cardDescription}>Visualize e gerencie as inscricoes dos candidatos a bolsistas.</p>
        </Link>
      </div>
    </div>
  );
}

export default withAuth(DashboardHub);
