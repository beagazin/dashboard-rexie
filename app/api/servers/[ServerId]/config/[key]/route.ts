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

  // Configurações padrão para cada módulo
  const defaultConfigs: Record<string, any> = {
    "general": {
      name: "Rexie Bot",
      avatar: "",
      color: "#9c6dfc",
      allowedRoles: [], // IMPORTANTE: sempre retornar array vazio em vez de undefined
      maintenanceMode: false,
    },
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
    "allowlist-auto": {
      enabled: true,
      category: "",
      mainChannel: "",
      viewRoles: [],
      manageRoles: [],
      resultsChannel: "",
      approvedMessage: "✅ Sua allowlist foi aprovada! Bem-vindo ao servidor.",
      rejectedMessage: "❌ Sua allowlist foi rejeitada. Tente novamente mais tarde.",
      approvedRole: "",
      questions: [],
      enableCodiguin: false,
      codigList: "",
    },
    "allowlist-manual": {
      enabled: true,
      category: "",
      mainChannel: "",
      resultsChannel: "",
      viewRoles: [],
      manageRoles: [],
      approvedMessage: "✅ Sua allowlist foi aprovada! Bem-vindo ao servidor.",
      rejectedMessage: "❌ Sua allowlist foi rejeitada. Tente novamente mais tarde.",
      approvedRole: "",
      enableCodiguin: false,
      codigList: "",
    },
    "punishments": {
      enabled: true,
      banRoles: [],
      warnRoles: [],
      warningsToban: 3,
      adv1Role: "",
      adv2Role: "",
      adv3Role: "",
      banRole: "",
      removeWhitelistOnBan: true,
      autoExpireWarnings: false,
      expirationDays: 30,
      logChannel: "",
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
    "server-status": {
      enabled: true,
      showButtons: true,
      connectButton: true,
      connectUrl: "fivem://connect/ip:port",
      shopButton: true,
      shopUrl: "https://loja.exemplo.com",
      showPlayers: true,
      channelId: "",
      serverIp: "",
      serverPort: "",
    },
    "codes": {
      enabled: true,
    },
    "suggestions": {
      enabled: true,
      channel: "",
    },
    "release-id": {
      enabled: true,
      logChannel: "",
      notificationMessage: "🎉 Seu ID foi liberado! Você já pode entrar no servidor.",
    },
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
    console.error("Erro ao salvar configuração:", error);
    return NextResponse.json(
      { error: "Erro ao salvar configuração" },
      { status: 500 }
    );
  }
}