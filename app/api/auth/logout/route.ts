import { clearSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  await clearSession();
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_URL || "http://localhost:3000"));
}