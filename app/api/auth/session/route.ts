import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ session: null }, { status: 401 });
    }
    
    return NextResponse.json({ session });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({ session: null }, { status: 500 });
  }
}