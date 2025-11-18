import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
    redirect_uri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI!,
    response_type: "code",
    scope: "identify email guilds",
  });

  return NextResponse.redirect(
    `https://discord.com/api/oauth2/authorize?${params}`
  );
}