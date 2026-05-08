import { NextResponse } from "next/server";
import { admin, getAdminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const db = getAdminDb();
    const { nome, email, cpf, telefone } = await request.json();

    if (!nome || !email || !cpf || !telefone) {
      return NextResponse.json({ message: "Todos os campos sao obrigatorios." }, { status: 400 });
    }

    const cleanCpf = cpf.replace(/\D/g, "");

    await db.runTransaction(async (transaction) => {
      const cpfRef = db.collection("seminario_cpfs").doc(cleanCpf);
      const cpfDoc = await transaction.get(cpfRef);

      if (cpfDoc.exists) {
        throw new Error("Este CPF ja foi cadastrado.");
      }

      const inscricaoRef = db.collection("seminario_inscricoes").doc();
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

    return NextResponse.json({ message: "Inscricao realizada com sucesso!" }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar inscricao:", error);

    const message = error instanceof Error ? error.message : "Erro interno do servidor.";
    return NextResponse.json({ message }, { status: message.includes("CPF") ? 409 : 500 });
  }
}
