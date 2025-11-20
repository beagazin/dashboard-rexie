import { clearSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await clearSession();
    console.log("Session cleared successfully");
    
    const url = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    return NextResponse.redirect(new URL("/signin", url));
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.redirect(new URL("/signin", process.env.NEXT_PUBLIC_URL || "http://localhost:3000"));
  }
}