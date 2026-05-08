import Image from "next/image";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer id="footer" className={styles.footerSection}>
      <div className={styles.container}>
        <div className={styles.mainContact}>
          <h3>
            Fale com a gente: <a href="mailto:projeto@planurbi.com.br">projeto@planurbi.com.br</a>
          </h3>
        </div>

        <div className={styles.realizacaoColumn}>
          <h4 className={styles.footerTitle}>PlanUrbi</h4>
          <p>Planejamento urbano, dados, legislacao e tecnologia para gestao publica municipal.</p>
        </div>

        <div className={styles.fepesaColumn}>
          <div className={styles.logoWrapper}>
            <Image src="/logosExternas/logo-fepesa-placeholder.png" alt="Logo da FEPESA" width={180} height={75} />
          </div>
          <div className={styles.contactInfo}>
            <p>Rua Aminadab Valente, 59 - Trapiche da Barra - Maceio/AL</p>
            <p>(82) 3223-5847</p>
            <p>
              <a href="https://fepesa.org.br" target="_blank">
                www.fepesa.org.br
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.copyRight}>
        <p>© 2026 PlanUrbi. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
