import { NextRequest, NextResponse } from "next/server";
import { setSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const redirect = request.nextUrl.searchParams.get("state") || "/dashboard";
  
  if (!code) {
    return NextResponse.redirect(new URL("/signin?error=no_code", request.url));
  }

  try {
    // Exchange code por access token
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI!,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange code");
    }

    const tokens = await tokenResponse.json();

    // Buscar dados do usuário
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user");
    }

    const user = await userResponse.json();

    // Criar sessão
    const session = {
      user: {
        id: user.id,
        username: user.username,
        discriminator: user.discriminator,
        avatar: user.avatar,
        email: user.email,
      },
      accessToken: tokens.access_token,
      expiresAt: Date.now() + tokens.expires_in * 1000,
    };

    await setSession(session);

    return NextResponse.redirect(new URL(redirect, request.url));
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.redirect(
      new URL("/signin?error=auth_failed", request.url)
    );
  }
}