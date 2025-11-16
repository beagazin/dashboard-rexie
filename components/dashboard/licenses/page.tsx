"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface License {
  id: string;
  serverId: string;
  serverName: string;
  plan: "basic" | "pro" | "enterprise";
  status: "active" | "expired" | "suspended";
  startDate: Date;
  expiresAt: Date;
  autoRenew: boolean;
  price: number;
}

export default function LicensesPage() {
  const [licenses, setLicenses] = useState<License[]>([
    {
      id: "1",
      serverId: "srv1",
      serverName: "Servidor Principal",
      plan: "pro",
      status: "active",
      startDate: new Date("2025-01-01"),
      expiresAt: new Date("2025-12-31"),
      autoRenew: true,
      price: 49.9,
    },
  ]);

  const getPlanBadge = (plan: string) => {
    const badges = {
      basic: "bg-gray-500/10 text-gray-400",
      pro: "bg-blue-500/10 text-blue-400",
      enterprise: "bg-purple-500/10 text-purple-400",
    };
    return badges[plan as keyof typeof badges] || badges.basic;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: "bg-green-500/10 text-green-400",
      expired: "bg-red-500/10 text-red-400",
      suspended: "bg-yellow-500/10 text-yellow-400",
    };
    return badges[status as keyof typeof badges] || badges.active;
  };

  const getDaysUntilExpiry = (expiresAt: Date) => {
    const days = Math.ceil(
      (expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-200">
              Gerenciar Licenças
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Visualize e gerencie suas licenças ativas
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-[#9c6dfc] px-4 py-2 text-sm font-medium text-white hover:bg-[#8c5dec]">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nova Licença
          </button>
        </div>

        {/* Cards de Licenças */}
        <div className="grid gap-6 lg:grid-cols-2">
          {licenses.map((license) => {
            const daysLeft = getDaysUntilExpiry(license.expiresAt);
            const isExpiringSoon = daysLeft <= 15 && daysLeft > 0;

            return (
              <div
                key={license.id}
                className="rounded-lg border border-gray-800 bg-gray-900/50 p-6"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200">
                      {license.serverName}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium uppercase ${getPlanBadge(
                          license.plan
                        )}`}
                      >
                        {license.plan}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium uppercase ${getStatusBadge(
                          license.status
                        )}`}
                      >
                        {license.status === "active" && "Ativa"}
                        {license.status === "expired" && "Expirada"}
                        {license.status === "suspended" && "Suspensa"}
                      </span>
                    </div>
                  </div>
                  <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-gray-200">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3 border-t border-gray-800 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Início</span>
                    <span className="text-gray-200">
                      {license.startDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Expira em</span>
                    <span
                      className={
                        isExpiringSoon ? "text-yellow-400" : "text-gray-200"
                      }
                    >
                      {license.expiresAt.toLocaleDateString()} ({daysLeft} dias)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Renovação automática</span>
                    <span className="text-gray-200">
                      {license.autoRenew ? "Ativada" : "Desativada"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Valor</span>
                    <span className="text-lg font-semibold text-[#9c6dfc]">
                      R$ {license.price.toFixed(2)}/mês
                    </span>
                  </div>
                </div>

                {isExpiringSoon && (
                  <div className="mt-4 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
                    <div className="flex items-center gap-2 text-sm text-yellow-200">
                      <svg
                        className="h-4 w-4 shrink-0"
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
                      Sua licença expira em {daysLeft} dias
                    </div>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-lg bg-[#9c6dfc] py-2 text-sm font-medium text-white hover:bg-[#8c5dec]">
                    Renovar
                  </button>
                  <button className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800">
                    Detalhes
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Planos Disponíveis */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-200">
            Planos Disponíveis
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
              <h3 className="mb-2 font-semibold text-gray-200">Basic</h3>
              <p className="mb-4 text-2xl font-bold text-gray-200">
                R$ 29,90<span className="text-sm font-normal text-gray-400">/mês</span>
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ 1 Servidor</li>
                <li>✓ Módulos básicos</li>
                <li>✓ Suporte por ticket</li>
              </ul>
            </div>

            <div className="rounded-lg border-2 border-[#9c6dfc] bg-gray-800 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-gray-200">Pro</h3>
                <span className="rounded-full bg-[#9c6dfc] px-2 py-1 text-xs text-white">
                  Popular
                </span>
              </div>
              <p className="mb-4 text-2xl font-bold text-gray-200">
                R$ 49,90<span className="text-sm font-normal text-gray-400">/mês</span>
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ 3 Servidores</li>
                <li>✓ Todos os módulos</li>
                <li>✓ Suporte prioritário</li>
                <li>✓ Customizações</li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
              <h3 className="mb-2 font-semibold text-gray-200">Enterprise</h3>
              <p className="mb-4 text-2xl font-bold text-gray-200">
                R$ 99,90<span className="text-sm font-normal text-gray-400">/mês</span>
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ Servidores ilimitados</li>
                <li>✓ Módulos personalizados</li>
                <li>✓ Suporte 24/7</li>
                <li>✓ Consultoria técnica</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}