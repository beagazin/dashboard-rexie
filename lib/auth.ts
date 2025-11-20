import { cookies } from 'next/headers';
import { Session, User, getAvatarUrl } from '@/types/session';

export type { Session, User };
export { getAvatarUrl };

const SESSION_COOKIE_NAME = 'rexie_session';

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    
    if (!sessionCookie?.value) {
      console.log("No session cookie found");
      return null;
    }

    const session: Session = JSON.parse(sessionCookie.value);
    
    // Verificar se o token expirou
    if (Date.now() > session.expiresAt) {
      console.log("Session expired");
      await clearSession();
      return null;
    }
    
    console.log("Session found for user:", session.user.username);
    return session;
  } catch (error) {
    console.error('Erro ao parsear sessão:', error);
    await clearSession();
    return null;
  }
}

export async function setSession(session: Session) {
  try {
    const cookieStore = await cookies();
    
    cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    });
    
    console.log("Session cookie set for user:", session.user.username);
  } catch (error) {
    console.error("Error setting session:", error);
    throw error;
  }
}

export async function clearSession() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
    console.log("Session cookie cleared");
  } catch (error) {
    console.error("Error clearing session:", error);
  }
}