import { NextResponse } from "next/server";
import { admin, getAdminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const db = getAdminDb();
    const body = await request.json();
    const { nome, cpf, email, telefone } = body;

    if (!nome || !cpf || !email || !telefone) {
      return NextResponse.json({ message: "Todos os campos sao obrigatorios." }, { status: 400 });
    }

    const cleanCpf = cpf.replace(/\D/g, "");
    const cleanTelefone = telefone.replace(/\D/g, "");

    const cpfRef = db.collection("seminario_cpfs").doc(cleanCpf);
    const telefoneRef = db.collection("seminario_telefones").doc(cleanTelefone);
    const novaInscricaoRef = db.collection("seminario_inscricoes").doc();

    await db.runTransaction(async (transaction) => {
      const cpfDoc = await transaction.get(cpfRef);
      if (cpfDoc.exists) {
        throw new Error("Este CPF ja esta inscrito.");
      }

      const telefoneDoc = await transaction.get(telefoneRef);
      if (telefoneDoc.exists) {
        throw new Error("Este telefone ja esta inscrito.");
      }

      const novaInscricao = {
        nome,
        cpf: cleanCpf,
        email,
        telefone: cleanTelefone,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
      };

      transaction.set(novaInscricaoRef, novaInscricao);
      transaction.set(cpfRef, { userId: novaInscricaoRef.id });
      transaction.set(telefoneRef, { userId: novaInscricaoRef.id });
    });

    return NextResponse.json({ message: "Inscricao realizada com sucesso!" }, { status: 201 });
  } catch (error) {
    console.error("Erro na inscricao do seminario:", error);
    const message = error instanceof Error ? error.message : "Erro interno do servidor.";
    if (message.includes("CPF") || message.includes("telefone")) {
      return NextResponse.json({ message }, { status: 409 });
    }
    return NextResponse.json({ message }, { status: 500 });
  }
}
