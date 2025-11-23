"use client";

import { useState } from "react";
import SaveButton from "@/components/dashboard/SaveButton";

interface ReleaseRecord {
  id: string;
  userId: string;
  username: string;
  cityId: string;
  releasedBy: string;
  timestamp: Date;
}

interface ReleaseIdConfig {
  enabled: boolean;
  logChannel: string;
  notificationMessage: string;
}

export default function ReleaseIdContent() {
  const [config, setConfig] = useState<ReleaseIdConfig>({
    enabled: true,
    logChannel: "",
    notificationMessage: "🎉 Seu ID foi liberado! Você já pode entrar no servidor.",
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const [history, setHistory] = useState<ReleaseRecord[]>([
    {
      id: "1",
      userId: "123456789",
      username: "User#1234",
      cityId: "12345",
      releasedBy: "Admin",
      timestamp: new Date(),
    },
    {
      id: "2",
      userId: "987654321",
      username: "Player#5678",
      cityId: "67890",
      releasedBy: "Moderador",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "3",
      userId: "456789123",
      username: "Gamer#9012",
      cityId: "54321",
      releasedBy: "Staff",
      timestamp: new Date(Date.now() - 7200000),
    },
  ]);

  const [filterUser, setFilterUser] = useState("");

  const [availableChannels] = useState([
    { id: "ch1", name: "🔓-liberacoes" },
    { id: "ch2", name: "📋-logs" },
    { id: "ch3", name: "🎮-gaming" },
  ]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHasChanges(false);
      alert("Configurações salvas com sucesso!");
    } catch (error) {
      alert("Erro ao salvar configurações");
    } finally {
      setSaving(false);
    }
  };

  const filteredHistory = history.filter((item) =>
    filterUser ? item.username.toLowerCase().includes(filterUser.toLowerCase()) : true
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200">Liberar ID</h1>
          <p className="mt-1 text-sm text-gray-400">
            Sistema de liberação de IDs de jogadores
          </p>
        </div>
        {hasChanges && <SaveButton onClick={handleSave} loading={saving} />}
      </div>

      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-200">
              Ativar Sistema
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Permitir liberação de IDs de jogadores
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) => {
                setConfig((prev) => ({ ...prev, enabled: e.target.checked }));
                setHasChanges(true);
              }}
              className="peer sr-only"
            />
            <div className="peer h-7 w-14 rounded-full bg-gray-700 after:absolute after:left-[4px] after:top-[4px] after:h-6 after:w-6 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full"></div>
          </label>
        </div>

        {config.enabled && (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Canal de Logs
              </label>
              <select
                value={config.logChannel}
                onChange={(e) => {
                  setConfig((prev) => ({ ...prev, logChannel: e.target.value }));
                  setHasChanges(true);
                }}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
              >
                <option value="">Selecione um canal</option>
                {availableChannels.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Canal onde as liberações serão registradas
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Mensagem de Notificação
              </label>
              <textarea
                value={config.notificationMessage}
                onChange={(e) => {
                  setConfig((prev) => ({ ...prev, notificationMessage: e.target.value }));
                  setHasChanges(true);
                }}
                rows={3}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                placeholder="Mensagem enviada ao jogador quando o ID for liberado"
              />
              <p className="mt-1 text-xs text-gray-500">
                Enviada via DM ao jogador após a liberação
              </p>
            </div>
          </div>
        )}
      </div>

      {config.enabled && (
        <>
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-200">
              Como Funciona
            </h2>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#9c6dfc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Staff usa o comando <code className="rounded bg-gray-800 px-2 py-0.5 text-[#9c6dfc]">/liberar-id</code> informando o ID da cidade do jogador</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#9c6dfc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>O BOT registra a liberação no canal de logs configurado</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#9c6dfc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>O jogador recebe uma notificação via DM informando que seu ID foi liberado</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#9c6dfc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>O histórico completo fica disponível nesta página para consulta</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900/50">
            <div className="border-b border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-200">
                    Histórico de Liberações
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    {filteredHistory.length} liberação(ões) encontrada(s)
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Buscar usuário..."
                    value={filterUser}
                    onChange={(e) => setFilterUser(e.target.value)}
                    className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {filteredHistory.length === 0 ? (
              <div className="p-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-400">
                  {filterUser ? "Nenhuma liberação encontrada" : "Nenhuma liberação registrada"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {filteredHistory.map((record) => (
                  <div key={record.id} className="p-6 transition-colors hover:bg-gray-800/30">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                            <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-200">{record.username}</p>
                            <div className="mt-1 flex items-center gap-4 text-sm text-gray-400">
                              <span>ID Cidade: <span className="font-mono text-[#9c6dfc]">{record.cityId}</span></span>
                              <span>•</span>
                              <span>Liberado por: {record.releasedBy}</span>
                              <span>•</span>
                              <span>{record.timestamp.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-gray-200">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
            <div className="flex gap-3">
              <svg className="h-5 w-5 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-200">
                <p className="font-medium">Dica:</p>
                <p className="mt-1">
                  Certifique-se de que o BOT possui permissões para enviar mensagens diretas aos jogadores. Caso contrário, a notificação não será entregue.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}