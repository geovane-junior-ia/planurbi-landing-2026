import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const db = getAdminDb();
    const credenciadosRef = db.collection("credenciados");

    const snapshot = await credenciadosRef.orderBy("created_at", "desc").get();

    if (snapshot.empty) {
      return NextResponse.json([], { status: 200 });
    }

    const participantes = snapshot.docs.map((doc) => {
      const data = doc.data();

      const createdAtTimestamp = data.created_at;
      const createdAtDate = createdAtTimestamp.toDate();
      const formattedDate = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "medium",
      }).format(createdAtDate);

      return {
        nome: data.nome,
        telefone: data.telefone,
        email: data.email,
        created_at: formattedDate,
      };
    });

    return NextResponse.json(participantes, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar participantes:", error);
    const message = error instanceof Error ? error.message : "Erro interno do servidor.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
