// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardStats from "./DashboardStats";

async function getServers() {
  return [
    {
      id: "123456789",
      name: "Meu Servidor",
      icon: null,
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

// Função para calcular dias restantes
function getDaysRemaining() {
  // TODO: Buscar data real da licença do banco de dados
  const expirationDate = new Date("2025-02-08"); // Data de expiração
  const today = new Date();
  const diffTime = expirationDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
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
  const daysRemaining = getDaysRemaining();

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

        {/* Alert - Só aparece quando faltam 7 dias ou menos */}
        {daysRemaining <= 7 && daysRemaining > 0 && (
          <div className="flex items-center justify-between rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-sm font-medium text-yellow-200">
                Sua licença expira em {daysRemaining} {daysRemaining === 1 ? "dia" : "dias"}
              </p>
            </div>
            <a
              href="/dashboard/licenses"
              className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-400"
            >
              Renovar agora
            </a>
          </div>
        )}

        {/* Stats */}
        <DashboardStats daysRemaining={daysRemaining} />

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

        {/* Suporte */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="border-b border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-200">Precisa de Ajuda?</h2>
            <p className="mt-1 text-sm text-gray-400">
              Entre em contato com nosso suporte através dos canais abaixo
            </p>
          </div>
          <div className="grid gap-4 p-6 md:grid-cols-2">
            {/* Discord */}
            <a
              href="https://discord.gg/DEhkVyCv8E"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-lg border border-gray-700 bg-gray-800 p-4 transition-all hover:border-[#5865F2] hover:bg-[#5865F2]/10"
            >
              <div className="rounded-lg bg-[#5865F2]/10 p-3 transition-colors group-hover:bg-[#5865F2]/20">
                <svg
                  className="h-8 w-8 text-[#5865F2]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-200 group-hover:text-[#5865F2]">
                  Discord
                </h3>
                <p className="text-sm text-gray-400">
                  Junte-se ao nosso servidor
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/558599695512"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-lg border border-gray-700 bg-gray-800 p-4 transition-all hover:border-[#25D366] hover:bg-[#25D366]/10"
            >
              <div className="rounded-lg bg-[#25D366]/10 p-3 transition-colors group-hover:bg-[#25D366]/20">
                <svg
                  className="h-8 w-8 text-[#25D366]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-200 group-hover:text-[#25D366]">
                  WhatsApp
                </h3>
                <p className="text-sm text-gray-400">
                  (85) 9 9695-5512
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}