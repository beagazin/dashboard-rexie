// components/dashboard/licenses/LicensesContent.tsx
"use client";

import { useState } from "react";

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

interface LicensesContentProps {
  licenses: License[];
}

export default function LicensesContent({ licenses: initialLicenses }: LicensesContentProps) {
  const [licenses] = useState<License[]>(initialLicenses);

  const getPlanBadge = (plan: string) => {
    const badges = {
      basic: "bg-gray-500/10 text-gray-400 border-gray-500/20",
      pro: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      enterprise: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    };
    return badges[plan as keyof typeof badges] || badges.basic;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: "bg-green-500/10 text-green-400 border-green-500/20",
      expired: "bg-red-500/10 text-red-400 border-red-500/20",
      suspended: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    };
    return badges[status as keyof typeof badges] || badges.active;
  };

  const getStatusText = (status: string) => {
    const texts = {
      active: "Ativa",
      expired: "Expirada",
      suspended: "Suspensa",
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getDaysUntilExpiry = (expiresAt: Date) => {
    const days = Math.ceil(
      (expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  const plans = [
    {
      name: "Basic",
      price: 29.9,
      features: [
        "1 Servidor",
        "Módulos básicos",
        "Suporte por ticket",
        "Atualizações regulares",
      ],
      recommended: false,
    },
    {
      name: "Pro",
      price: 49.9,
      features: [
        "3 Servidores",
        "Todos os módulos",
        "Suporte prioritário",
        "Customizações",
        "Backups automáticos",
      ],
      recommended: true,
    },
    {
      name: "Enterprise",
      price: 99.9,
      features: [
        "Servidores ilimitados",
        "Módulos personalizados",
        "Suporte 24/7",
        "Consultoria técnica",
        "API dedicada",
        "Uptime garantido",
      ],
      recommended: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200">
            Gerenciar Licenças
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Visualize e gerencie suas licenças ativas
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[#9c6dfc] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#8c5dec]">
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

      {/* Licenças Ativas */}
      <div className="grid gap-6 lg:grid-cols-2">
        {licenses.map((license) => {
          const daysLeft = getDaysUntilExpiry(license.expiresAt);
          const isExpiringSoon = daysLeft <= 15 && daysLeft > 0;

          return (
            <div
              key={license.id}
              className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-gray-700"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">
                    {license.serverName}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium uppercase ${getPlanBadge(
                        license.plan
                      )}`}
                    >
                      {license.plan}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium uppercase ${getStatusBadge(
                        license.status
                      )}`}
                    >
                      {getStatusText(license.status)}
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
                    {license.startDate.toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Expira em</span>
                  <span
                    className={
                      isExpiringSoon ? "text-yellow-400" : "text-gray-200"
                    }
                  >
                    {license.expiresAt.toLocaleDateString("pt-BR")} ({daysLeft}{" "}
                    dias)
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Renovação automática</span>
                  <span className="text-gray-200">
                    {license.autoRenew ? "Ativada" : "Desativada"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Valor</span>
                  <span className="text-lg font-semibold text-[#9c6dfc]">
                    R$ {license.price.toFixed(2)}
                    <span className="text-sm font-normal text-gray-400">/mês</span>
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
                <button className="flex-1 rounded-lg bg-[#9c6dfc] py-2 text-sm font-medium text-white transition-colors hover:bg-[#8c5dec]">
                  Renovar
                </button>
                <button className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800">
                  Detalhes
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Planos Disponíveis */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="mb-6 text-lg font-semibold text-gray-200">
          Planos Disponíveis
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg border p-6 ${
                plan.recommended
                  ? "border-[#9c6dfc] bg-[#9c6dfc]/5"
                  : "border-gray-700 bg-gray-800"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-200">{plan.name}</h3>
                {plan.recommended && (
                  <span className="rounded-full bg-[#9c6dfc] px-2 py-1 text-xs font-medium text-white">
                    Popular
                  </span>
                )}
              </div>
              <p className="mb-6 text-3xl font-bold text-gray-200">
                R$ {plan.price.toFixed(2)}
                <span className="text-base font-normal text-gray-400">/mês</span>
              </p>
              <ul className="mb-6 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full rounded-lg py-2 text-sm font-medium transition-colors ${
                  plan.recommended
                    ? "bg-[#9c6dfc] text-white hover:bg-[#8c5dec]"
                    : "border border-gray-700 text-gray-200 hover:bg-gray-700"
                }`}
              >
                Escolher Plano
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}