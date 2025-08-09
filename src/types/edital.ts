/**
 * Define a estrutura de dados para um Edital (usado nos cards).
 */
export interface Edital {
  numero: string;
  titulo: string;
  tipo: string;
  status: 'em andamento' | 'concluído' | 'encerrado';
  link: string;
}

/**
 * Define a estrutura detalhada de um Edital para a página de detalhes.
 * Ela inclui todos os campos de 'Edital' e adiciona novos campos.
 */
export interface EditalDetalhado extends Edital {
  subtitulo: string;
  periodoInscricao: string;
  anexos: {
    titulo: string;
    url: string;
  }[];
}