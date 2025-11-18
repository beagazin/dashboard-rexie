export interface Server {
  id: string;
  name: string;
  icon: string | null;
  ownerId: string;
  memberCount: number;
  botStatus: "online" | "offline" | "maintenance";
}

export interface License {
  id: string;
  serverId: string;
  plan: "basic" | "pro" | "enterprise";
  status: "active" | "expired" | "suspended";
  startDate: Date;
  expiresAt: Date;
  autoRenew: boolean;
  price: number;
}

export interface BackupData {
  version: string;
  exportDate: Date;
  serverId: string;
  serverName: string;
  config: any;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface TicketCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  allowedRoles: string[];
  discordCategory: string;
}

export interface Code {
  id: string;
  code: string;
  uses: number;
  maxUses: number;
  expiresAt?: Date;
  createdAt: Date;
}

export interface CodeUsage {
  userId: string;
  username: string;
  discordId: string;
  cityId: string;
  usedAt: Date;
}

export interface Punishment {
  id: string;
  userId: string;
  username: string;
  type: "warn" | "mute" | "kick" | "ban";
  reason: string;
  appliedBy: string;
  appliedAt: Date;
  expiresAt?: Date;
}