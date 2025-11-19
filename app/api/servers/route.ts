import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // TODO: Buscar servidores reais do Discord onde o bot está instalado
  const servers = [
    {
      id: "123456789",
      name: "Meu Servidor",
      icon: null,
      ownerId: session.user.id,
      memberCount: 150,
      botStatus: "online",
    },
  ];

  return NextResponse.json(servers);
}
