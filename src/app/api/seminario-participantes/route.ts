import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';


const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();


export async function POST(request: Request) {
  try {
    const { nome, email, cpf, telefone } = await request.json();

   
    if (!nome || !email || !cpf || !telefone) {
      return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }
    
    const cleanCpf = cpf.replace(/\D/g, ''); 

    
    await db.runTransaction(async (transaction) => {
      const cpfRef = db.collection('seminario_cpfs').doc(cleanCpf);
      const cpfDoc = await transaction.get(cpfRef);

      
      if (cpfDoc.exists) {
        
        throw new Error('Este CPF já foi cadastrado.');
      }

      
      const inscricaoRef = db.collection('seminario_inscricoes').doc();
      transaction.set(inscricaoRef, {
        nome,
        email,
        cpf: cleanCpf,
        telefone,
        presente: false, 
        created_at: admin.firestore.FieldValue.serverTimestamp(),
      });

     
      transaction.set(cpfRef, { created_at: admin.firestore.FieldValue.serverTimestamp() });
    });

    return NextResponse.json({ message: 'Inscrição realizada com sucesso!' }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar inscrição:', error);
    
    const message = error instanceof Error ? error.message : 'Erro interno do servidor.';
    return NextResponse.json({ message }, { status: message.includes('CPF') ? 409 : 500 });
  }
}