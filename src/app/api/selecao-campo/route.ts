import { NextResponse } from "next/server";
import { admin, getAdminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const db = getAdminDb();
    const body = await request.json();
    const { nome, data_nascimento, rg, email, rua, numero, complemento, cep, cidade, estado, tipo_instituicao, instituicao, serie_ano } = body;

    if (
      !nome ||
      !data_nascimento ||
      !rg ||
      !email ||
      !rua ||
      !numero ||
      !cep ||
      !cidade ||
      !estado ||
      !tipo_instituicao ||
      !instituicao ||
      !serie_ano
    ) {
      return NextResponse.json({ message: "Todos os campos sao obrigatorios, exceto o complemento." }, { status: 400 });
    }

    const rgQuery = await db.collection("selecao_campo").where("rg", "==", rg).limit(1).get();
    if (!rgQuery.empty) {
      return NextResponse.json({ message: "Este RG ja foi cadastrado.", field: "rg" }, { status: 409 });
    }

    const emailQuery = await db.collection("selecao_campo").where("email", "==", email).limit(1).get();
    if (!emailQuery.empty) {
      return NextResponse.json({ message: "Este e-mail ja foi cadastrado.", field: "email" }, { status: 409 });
    }

    const docRef = await db.collection("selecao_campo").add({
      nome,
      data_nascimento,
      rg,
      email,
      endereco: { rua, numero, complemento, cep, cidade, estado },
      tipo_instituicao,
      instituicao,
      serie_ano,
      edital_accepted_at: admin.firestore.FieldValue.serverTimestamp(),
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ message: "Inscricao realizada com sucesso!", id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Erro na inscricao para selecao:", error);
    const message = error instanceof Error ? error.message : "Erro interno do servidor.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
