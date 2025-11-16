// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only run on dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Check if session exists in cookies (we'll add this)
    // For now, we'll redirect to signin if accessing dashboard
    const session = request.cookies.get('discord_session');
    
    if (!session) {
      const url = new URL('/signin', request.url);
      url.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};