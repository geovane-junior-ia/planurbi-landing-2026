import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, admin } from '@/lib/firebaseAdmin';

type ContactPayload = {
  nome: string;
  municipio: string;
  cargo?: string;
  email: string;
  tipo?: string;
  mensagem?: string;
};

// Notifica a equipe via Resend (REST, sem dependencia). So roda se
// RESEND_API_KEY estiver configurada; qualquer falha aqui e' ignorada
// para nunca derrubar o request — o contato ja foi salvo no Firestore.
async function notificarEquipe(c: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const from = process.env.CONTATO_EMAIL_FROM || 'PlanUrbi <onboarding@resend.dev>';
  const to = process.env.CONTATO_EMAIL_TO || 'projeto@planurbi.com.br';

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: c.email,
        subject: `Novo contato da landing — ${c.municipio}`,
        html: `
          <h2>Novo contato pela landing PlanUrbi</h2>
          <p><strong>Nome:</strong> ${c.nome}</p>
          <p><strong>Município:</strong> ${c.municipio}</p>
          <p><strong>Cargo/órgão:</strong> ${c.cargo || '—'}</p>
          <p><strong>E-mail:</strong> ${c.email}</p>
          <p><strong>Tipo de demanda:</strong> ${c.tipo || '—'}</p>
          <p><strong>Mensagem:</strong><br/>${(c.mensagem || '—').replace(/\n/g, '<br/>')}</p>
        `,
      }),
    });
  } catch (error) {
    console.error('Falha ao notificar equipe por e-mail (contato ja salvo):', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { nome, municipio, cargo, email, tipo, mensagem } = await req.json();

    if (!nome || !municipio || !email) {
      return NextResponse.json(
        { error: 'Nome, município e e-mail são obrigatórios.' },
        { status: 400 },
      );
    }

    // Admin SDK: escrita server-side que ignora as Security Rules do
    // Firestore (nao precisa liberar a colecao por regra). Usa as
    // credenciais de service-account (FIREBASE_PROJECT_ID/CLIENT_EMAIL/
    // PRIVATE_KEY) — as mesmas ja configuradas no deploy de producao.
    const docRef = await getAdminDb().collection('contatos-landing').add({
      nome,
      municipio,
      cargo: cargo || '',
      email,
      tipo: tipo || '',
      mensagem: mensagem || '',
      origem: 'landing-2026',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'novo',
    });

    console.log('Contato da landing salvo com o ID: ', docRef.id);

    await notificarEquipe({ nome, municipio, cargo, email, tipo, mensagem });

    return NextResponse.json(
      { message: 'Contato enviado com sucesso!', id: docRef.id },
      { status: 201 },
    );
  } catch (error) {
    console.error('Erro ao salvar contato no Firebase:', error);

    return NextResponse.json(
      { error: 'Ocorreu um erro ao enviar sua solicitação.' },
      { status: 500 },
    );
  }
}
