// app/dashboard/licenses/page.tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import LicensesContent from "@/components/dashboard/licenses/LicensesContent";

async function getServers() {
  return [
    {
      id: "123456789",
      name: "Meu Servidor",
      icon: null,
    },
  ];
}

async function getLicenses() {
  // TODO: Implementar busca real
  return [
    {
      id: "1",
      serverId: "123456789",
      serverName: "Servidor Principal",
      plan: "pro" as const,
      status: "active" as const,
      startDate: new Date("2025-01-01"),
      expiresAt: new Date("2025-12-31"),
      autoRenew: true,
      price: 49.9,
    },
  ];
}

export default async function LicensesPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  const servers = await getServers();
  const licenses = await getLicenses();

  return (
    <DashboardLayout session={session} servers={servers} currentServer={null}>
      <LicensesContent licenses={licenses} />
    </DashboardLayout>
  );
}