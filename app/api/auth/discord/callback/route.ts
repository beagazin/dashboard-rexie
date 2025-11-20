import { NextRequest, NextResponse } from "next/server";
import { setSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const redirect = state || "/dashboard";
  
  console.log("Discord callback - code:", code ? "received" : "missing");
  
  if (!code) {
    console.error("No code received from Discord");
    return NextResponse.redirect(new URL("/signin?error=no_code", request.url));
  }

  try {
    // Validar variáveis de ambiente
    if (!process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || 
        !process.env.DISCORD_CLIENT_SECRET || 
        !process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI) {
      console.error("Missing Discord environment variables");
      throw new Error("Discord configuration missing");
    }

    console.log("Exchanging code for token...");
    
    // Exchange code por access token
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Token exchange failed:", errorText);
      throw new Error("Failed to exchange code");
    }

    const tokens = await tokenResponse.json();
    console.log("Token received successfully");

    // Buscar dados do usuário
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error("Failed to fetch user:", errorText);
      throw new Error("Failed to fetch user");
    }

    const user = await userResponse.json();
    console.log("User data received:", user.username);

    // Criar sessão
    const session = {
      user: {
        id: user.id,
        username: user.username,
        discriminator: user.discriminator || "0",
        avatar: user.avatar,
        email: user.email,
      },
      accessToken: tokens.access_token,
      expiresAt: Date.now() + tokens.expires_in * 1000,
    };

    await setSession(session);
    console.log("Session created successfully");

    // Redirecionar para o dashboard
    const redirectUrl = new URL(redirect, request.url);
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.redirect(
      new URL("/signin?error=auth_failed", request.url)
    );
  }
}