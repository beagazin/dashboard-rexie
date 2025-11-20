"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SaveButton from "@/components/dashboard/SaveButton";

export default function WelcomePage() { // ✅ Adicionar export default
  const [config, setConfig] = useState({
    welcomeEnabled: true,
    goodbyeEnabled: true,
    welcomeChannel: "",
    goodbyeChannel: "",
    welcomeMessage: "Bem-vindo {user} ao {server}! Você é o membro #{member_count}!",
    goodbyeMessage: "{user} saiu do servidor. Agora temos {member_count} membros.",
    welcomeImage: "",
    goodbyeImage: "",
  });

  const variables = [
    { var: "{user}", desc: "Menciona o usuário" },
    { var: "{server}", desc: "Nome do servidor" },
    { var: "{member_count}", desc: "Total de membros" },
    { var: "{member_id}", desc: "ID do membro" },
    { var: "{account_age}", desc: "Idade da conta" },
  ];

  return (
    <DashboardLayout session={{} as any} servers={[]} currentServer={null}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-200">Recepção e Despedida</h1>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-200">Mensagem de Boas-vindas</h2>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={config.welcomeEnabled}
                  onChange={(e) => setConfig({ ...config, welcomeEnabled: e.target.checked })}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full"></div>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-gray-300">Canal</label>
                <select
                  value={config.welcomeChannel}
                  onChange={(e) => setConfig({ ...config, welcomeChannel: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                >
                  <option value="">Selecione um canal</option>
                  <option value="ch1">👋-boas-vindas</option>
                  <option value="ch2">📢-geral</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">Mensagem</label>
                <textarea
                  value={config.welcomeMessage}
                  onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">URL da Imagem (opcional)</label>
                <input
                  type="url"
                  value={config.welcomeImage}
                  onChange={(e) => setConfig({ ...config, welcomeImage: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                  placeholder="https://exemplo.com/imagem.png"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-200">Mensagem de Despedida</h2>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={config.goodbyeEnabled}
                  onChange={(e) => setConfig({ ...config, goodbyeEnabled: e.target.checked })}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full"></div>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-gray-300">Canal</label>
                <select
                  value={config.goodbyeChannel}
                  onChange={(e) => setConfig({ ...config, goodbyeChannel: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                >
                  <option value="">Selecione um canal</option>
                  <option value="ch1">👋-despedidas</option>
                  <option value="ch2">📢-geral</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">Mensagem</label>
                <textarea
                  value={config.goodbyeMessage}
                  onChange={(e) => setConfig({ ...config, goodbyeMessage: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">URL da Imagem (opcional)</label>
                <input
                  type="url"
                  value={config.goodbyeImage}
                  onChange={(e) => setConfig({ ...config, goodbyeImage: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                  placeholder="https://exemplo.com/imagem.png"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-3 font-semibold text-gray-200">Variáveis Disponíveis</h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {variables.map((v) => (
              <div key={v.var} className="rounded-lg bg-gray-800 p-3">
                <code className="text-sm text-[#9c6dfc]">{v.var}</code>
                <p className="mt-1 text-xs text-gray-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}