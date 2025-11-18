// app/api/servers/[serverId]/config/[key]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { serverId: string; key: string } }
) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // TODO: Implementar busca real no banco de dados
  // Por enquanto, retornar config padrão baseada na key
  const defaultConfigs: Record<string, any> = {
    "auto-role": {
      enabled: true,
      roles: [],
      conditions: {
        accountAge: false,
        accountAgeDays: 7,
        applyDelay: false,
        delayMinutes: 5,
      },
    },
    "tickets": {
      enabled: true,
      categories: [],
      enableCodiguin: false,
      codigList: "",
    },
    "welcome": {
      welcomeEnabled: true,
      goodbyeEnabled: true,
      welcomeChannel: "",
      goodbyeChannel: "",
      welcomeMessage: "Bem-vindo {user} ao {server}! Você é o membro #{member_count}!",
      goodbyeMessage: "{user} saiu do servidor. Agora temos {member_count} membros.",
      welcomeImage: "",
      goodbyeImage: "",
    },
    // Adicionar mais configs conforme necessário
  };

  const config = defaultConfigs[params.key] || {};

  return NextResponse.json(config);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { serverId: string; key: string } }
) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const config = await request.json();
    
    // TODO: Implementar salvamento real no banco de dados
    console.log(`Salvando config ${params.key} para servidor ${params.serverId}:`, config);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ success: true, config });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao salvar configuração" },
      { status: 500 }
    );
  }
}