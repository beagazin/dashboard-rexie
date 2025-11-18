import { cookies } from 'next/headers';

export interface Session {
  user: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    email?: string;
  };
  accessToken: string;
  expiresAt: number;
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('rexie_session');
  
  if (!sessionCookie) {
    return null;
  }

  try {
    const session: Session = JSON.parse(sessionCookie.value);
    
    // Verificar se o token expirou
    if (Date.now() > session.expiresAt) {
      await clearSession();
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Erro ao parsear sessão:', error);
    return null;
  }
}

export async function setSession(session: Session) {
  const cookieStore = await cookies();
  
  cookieStore.set('rexie_session', JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/',
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('rexie_session');
}

export function getAvatarUrl(user: Session['user']): string {
  if (user.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
  }
  
  // Avatar padrão do Discord
  const defaultAvatarNumber = parseInt(user.discriminator) % 5;
  return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
}