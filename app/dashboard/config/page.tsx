import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ConfigContent from "@/components/dashboard/config/ConfigContent";

async function getServers() {
  // TODO: Buscar servidores reais
  return [
    {
      id: "123456789",
      name: "Meu Servidor",
      icon: null,
      memberCount: 150,
    },
  ];
}

export default async function ConfigPage({
  searchParams,
}: {
  searchParams: { server?: string };
}) {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  const servers = await getServers();
  const currentServer = servers[0];

  return (
    <DashboardLayout
      session={session}
      servers={servers}
      currentServer={currentServer}
    >
      <ConfigContent serverId={currentServer?.id} />
    </DashboardLayout>
  );
}
