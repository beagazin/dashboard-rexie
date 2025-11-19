// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { DashboardStats, DashboardLogs, DashboardAlerts } from "@/components/dashboard/DashboardStats";

async function getServers() {
  // TODO: Implementar busca real de servidores
  return [
    {
      id: "123456789",
      name: "Meu Servidor",
      icon: null,
      memberCount: 150,
      botStatus: "online" as const,
    },
  ];
}

async function getCurrentServer(serverId?: string) {
  const servers = await getServers();
  
  if (serverId) {
    return servers.find((s) => s.id === serverId) || servers[0];
  }
  
  return servers[0];
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { server?: string };
}) {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  const servers = await getServers();
  const currentServer = await getCurrentServer(searchParams.server);

  return (
    <DashboardLayout
      session={session}
      servers={servers}
      currentServer={currentServer}
    >
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

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <a
            href="/dashboard/config"
            className="group flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-[#9c6dfc]/50 hover:bg-gray-800/50"
          >
            <div className="rounded-lg bg-[#9c6dfc]/10 p-3">
              <svg
                className="h-6 w-6 text-[#9c6dfc]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-200 group-hover:text-[#9c6dfc]">
                Configurações
              </h3>
              <p className="text-sm text-gray-400">
                Personalize seu bot
              </p>
            </div>
            <svg
              className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>

          <a
            href="/dashboard/tickets"
            className="group flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-[#9c6dfc]/50 hover:bg-gray-800/50"
          >
            <div className="rounded-lg bg-blue-500/10 p-3">
              <svg
                className="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-200 group-hover:text-blue-400">
                Tickets
              </h3>
              <p className="text-sm text-gray-400">
                Gerenciar suporte
              </p>
            </div>
            <svg
              className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>

          <a
            href="/dashboard/codes"
            className="group flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-[#9c6dfc]/50 hover:bg-gray-800/50"
          >
            <div className="rounded-lg bg-purple-500/10 p-3">
              <svg
                className="h-6 w-6 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-200 group-hover:text-purple-400">
                Codiguin
              </h3>
              <p className="text-sm text-gray-400">
                Gerenciar códigos
              </p>
            </div>
            <svg
              className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        {/* Logs */}
        <DashboardLogs />
      </div>
    </DashboardLayout>
  );
}