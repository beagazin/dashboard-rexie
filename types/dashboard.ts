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
}

export interface BackupData {
  version: string;
  exportDate: Date;
  serverId: string;
  serverName: string;
  config: any;
}