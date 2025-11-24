// app/dashboard/punishments/page.tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PunishmentsContent from "@/components/dashboard/punishments/PunishmentsContent";

async function getServers() {
  return [
    {
      id: "123456789",
      name: "Meu Servidor",
      icon: null,
    },
  ];
}

export default async function PunishmentsPage() {
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
      <PunishmentsContent />
    </DashboardLayout>
  );
}