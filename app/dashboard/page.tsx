// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getSession, Session } from "@/lib/auth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardLogs from "@/components/dashboard/DashboardLogs";
import DashboardAlerts from "@/components/dashboard/DashboardAlerts";

export default function Dashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#9c6dfc] border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),#b896fc,var(--color-gray-50),#9c6dfc,var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent">
            Painel de Controle
          </h1>
          <p className="mt-2 text-gray-400">
            Gerencie seu bot e visualize estatísticas em tempo real
          </p>
        </div>

        {/* Alerts */}
        <DashboardAlerts />

        {/* Stats */}
        <DashboardStats />

        {/* Logs */}
        <DashboardLogs />
      </div>
    </DashboardLayout>
  );
}