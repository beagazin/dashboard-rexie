import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Rotas públicas que não precisam de autenticação
  const publicPaths = ['/signin', '/api/auth/discord', '/api/auth/discord/callback', '/'];
  
  // Se a rota é pública, permitir acesso
  if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
    return NextResponse.next();
  }
  
  // Verificar se há sessão para rotas do dashboard
  if (path.startsWith('/dashboard')) {
    const session = request.cookies.get('rexie_session');
    
    if (!session) {
      const url = new URL('/signin', request.url);
      url.searchParams.set('redirect', path);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/servers/:path*',
  ],
};