import Image from 'next/image';
import QuestionForm from "@/components/QuestionForm";
import styles from './Perguntas.module.css';
import logoPlanurbi from '../../../../public/logo-planurbi-stagVerde.png'; 

export const metadata = {
    title: "Envie sua Pergunta | Seminário Planurbi",
    description: "Participe do seminário enviando sua pergunta para a nossa equipe.",
};

export default function PerguntasPage() {
    return (
        <div className={styles.page}>
            

            <main className={styles.contentWrapper}>
                <div className={styles.header}>
                    <Image src={logoPlanurbi} alt="Logo Planurbi" width={180} placeholder="blur" />
                    <h1>Envie sua Pergunta</h1>
                    <p>Sua participação é fundamental. Preencha o formulário abaixo e sua dúvida poderá ser respondida <strong>ao vivo</strong> durante o nosso bate-papo.</p>
                </div>

                <section className={styles.formSection}>
                    <QuestionForm />
                </section>
            </main>
        </div>
    );
}