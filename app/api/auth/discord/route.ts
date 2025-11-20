import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Verificar variáveis de ambiente
  if (!process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || 
      !process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI) {
    console.error("Missing Discord environment variables");
    return NextResponse.redirect(new URL("/signin?error=config_missing", request.url));
  }

  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
    redirect_uri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI,
    response_type: "code",
    scope: "identify email guilds",
    state: "/dashboard", // Para redirecionar após login
  });

  const authUrl = `https://discord.com/api/oauth2/authorize?${params}`;
  console.log("Redirecting to Discord auth:", authUrl);

  return NextResponse.redirect(authUrl);
}