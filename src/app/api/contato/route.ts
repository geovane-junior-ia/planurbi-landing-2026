import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseClient';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const { nome, municipio, cargo, email, tipo, mensagem } = await req.json();

    if (!nome || !municipio || !email) {
      return NextResponse.json(
        { error: 'Nome, município e e-mail são obrigatórios.' },
        { status: 400 },
      );
    }

    const docRef = await addDoc(collection(db, 'contatos-landing'), {
      nome,
      municipio,
      cargo: cargo || '',
      email,
      tipo: tipo || '',
      mensagem: mensagem || '',
      origem: 'landing-2026',
      createdAt: serverTimestamp(),
      status: 'novo',
    });

    console.log('Contato da landing salvo com o ID: ', docRef.id);

    // TODO: notificar projeto@planurbi.com.br quando houver serviço de e-mail
    // configurado (SMTP / Resend / SendGrid). A persistência acima já garante
    // que nenhum contato se perde enquanto o canal de notificação não existe.

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
