// types/session.ts
export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email?: string;
}

export interface Session {
  user: User;
  accessToken: string;
  expiresAt: number;
}

export interface Server {
  id: string;
  name: string;
  icon: string | null;
  memberCount?: number;
  botStatus?: "online" | "offline" | "maintenance";
}

// Função helper para avatar (pode ser usada no cliente)
export function getAvatarUrl(user: User): string {
  if (user.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
  }
  const defaultAvatarNumber = parseInt(user.discriminator) % 5;
  return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
}