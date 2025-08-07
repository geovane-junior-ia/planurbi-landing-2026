import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseClient'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const { name, email, question } = await req.json();

   
    if (!name || !email || !question) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    
    const docRef = await addDoc(collection(db, 'perguntas-seminario'), {
      name,
      email,
      question,
      createdAt: serverTimestamp(), 
      status: 'recebida', 
    });

    console.log("Pergunta salva com o ID: ", docRef.id);

    return NextResponse.json({ message: 'Pergunta enviada com sucesso!', id: docRef.id }, { status: 201 });

  } catch (error) {
    console.error('Erro ao salvar pergunta no Firebase:', error);
    
    return NextResponse.json({ error: 'Ocorreu um erro ao enviar sua pergunta.' }, { status: 500 });
  }
}