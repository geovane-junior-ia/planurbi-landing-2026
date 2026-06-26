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
          <div className={styles.logoWrapper}>
            <Image
              src="/logo-planurbi-horizontal.png"
              alt="Logo PlanUrbi"
              width={1920}
              height={586}
            />
          </div>
          <div className={styles.contactInfo}>
            <p>
              <a href="mailto:contato@planurbi.com.br">contato@planurbi.com.br</a>
            </p>
            <p>
              <a
                href="https://wa.me/5582993261747"
                target="_blank"
                rel="noreferrer"
                aria-label="Falar com PlanUrbi no WhatsApp"
              >
                (82) 99326-1747
              </a>
            </p>
            <p>
              <a href="https://www.planurbi.com.br" target="_blank" rel="noreferrer">
                www.planurbi.com.br
              </a>
            </p>
          </div>
        </div>

        <div className={styles.fepesaColumn}>
          <div className={styles.logoWrapper}>
            <Image src="/logosExternas/logo-fepesa-placeholder.png" alt="Logo da FEPESA" width={180} height={75} />
          </div>
          <div className={styles.contactInfo}>
            <p>Rua Aminadab Valente, 59 - Trapiche da Barra - Maceió/AL</p>
            <p>(82) 3223-5847</p>
            <p>
              <a href="https://fepesa.org.br" target="_blank" rel="noreferrer">
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
