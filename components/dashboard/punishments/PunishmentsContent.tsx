"use client";

import { useState, useEffect } from "react";
import SaveButton from "@/components/dashboard/SaveButton";
import { useServerConfig } from "@/hooks/useServerConfig";

interface PunishmentConfig {
  enabled: boolean;
  banRoles: string[];
  warnRoles: string[];
  warningsToban: number;
  adv1Role: string;
  adv2Role: string;
  adv3Role: string;
  banRole: string;
  removeWhitelistOnBan: boolean;
  autoExpireWarnings: boolean;
  expirationDays: number;
  logChannel: string;
}

interface PunishmentHistory {
  id: string;
  userId: string;
  username: string;
  type: "warn" | "mute" | "kick" | "ban";
  reason: string;
  appliedBy: string;
  appliedAt: string; // Mudamos para string para evitar problemas de hidratação
  expiresAt?: string;
  active: boolean;
}

export default function PunishmentsContent() {
  const serverId = "123456789"; // TODO: Get from context

  const { config, setConfig, hasChanges, saving, saveConfig } =
    useServerConfig<PunishmentConfig>(
      "punishments",
      {
        enabled: true,
        banRoles: [],
        warnRoles: [],
        warningsToban: 3,
        adv1Role: "",
        adv2Role: "",
        adv3Role: "",
        banRole: "",
        removeWhitelistOnBan: true,
        autoExpireWarnings: false,
        expirationDays: 30,
        logChannel: "",
      },
      serverId
    );

  // Inicializar histórico apenas no cliente
  const [history, setHistory] = useState<PunishmentHistory[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Inicializar dados apenas no cliente
    setHistory([
      {
        id: "1",
        userId: "123456789",
        username: "User#1234",
        type: "warn",
        reason: "Desrespeito à regra X",
        appliedBy: "Admin",
        appliedAt: new Date().toISOString(),
        active: true,
      },
      {
        id: "2",
        userId: "987654321",
        username: "Player#5678",
        type: "ban",
        reason: "Múltiplas infrações",
        appliedBy: "Moderador",
        appliedAt: new Date(Date.now() - 86400000).toISOString(),
        active: true,
      },
    ]);
  }, []);

  const [filterType, setFilterType] = useState<string>("all");
  const [filterUser, setFilterUser] = useState<string>("");

  // Mock data
  const [availableRoles] = useState([
    { id: "1", name: "Admin" },
    { id: "2", name: "Moderador" },
    { id: "3", name: "Staff" },
    { id: "4", name: "ADV1" },
    { id: "5", name: "ADV2" },
    { id: "6", name: "ADV3" },
    { id: "7", name: "Banido" },
  ]);

  const [availableChannels] = useState([
    { id: "ch1", name: "📋-logs" },
    { id: "ch2", name: "⚠️-punicoes" },
  ]);

  const toggleRole = (roleId: string, type: "ban" | "warn") => {
    setConfig((prev) => {
      const key = type === "ban" ? "banRoles" : "warnRoles";
      return {
        ...prev,
        [key]: prev[key].includes(roleId)
          ? prev[key].filter((id) => id !== roleId)
          : [...prev[key], roleId],
      };
    });
  };

  const getPunishmentBadge = (type: string) => {
    const badges = {
      warn: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      mute: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      kick: "bg-red-500/10 text-red-400 border-red-500/20",
      ban: "bg-red-600/10 text-red-500 border-red-600/20",
    };
    return badges[type as keyof typeof badges] || badges.warn;
  };

  const getPunishmentIcon = (type: string) => {
    const icons = {
      warn: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      mute: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ),
      kick: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      ban: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
    };
    return icons[type as keyof typeof icons] || icons.warn;
  };

  const filteredHistory = history.filter((item) => {
    if (filterType !== "all" && item.type !== filterType) return false;
    if (filterUser && !item.username.toLowerCase().includes(filterUser.toLowerCase())) return false;
    return true;
  });

  // Não renderizar datas até estar no cliente
  if (!isClient) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <svg className="mx-auto h-8 w-8 animate-spin text-[#9c6dfc]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="mt-2 text-sm text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200">Sistema de Punições</h1>
          <p className="mt-1 text-sm text-gray-400">
            Configure punições automáticas e gerencie histórico
          </p>
        </div>
        {hasChanges && <SaveButton onClick={saveConfig} loading={saving} />}
      </div>

      {/* Status */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-200">
              Ativar Sistema de Punições
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Sistema automático de advertências e banimentos
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, enabled: e.target.checked }))
              }
              className="peer sr-only"
            />
            <div className="peer h-7 w-14 rounded-full bg-gray-700 after:absolute after:left-[4px] after:top-[4px] after:h-6 after:w-6 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full"></div>
          </label>
        </div>
      </div>

      {config.enabled && (
        <>
          {/* Permissões */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-200">Permissões</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Cargos que podem banir
                </label>
                <div className="space-y-2">
                  {availableRoles.map((role) => (
                    <label
                      key={role.id}
                      className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800 p-3 hover:bg-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={config.banRoles.includes(role.id)}
                        onChange={() => toggleRole(role.id, "ban")}
                        className="h-4 w-4 rounded border-gray-600 text-[#9c6dfc] focus:ring-2 focus:ring-[#9c6dfc]/20"
                      />
                      <span className="text-sm text-gray-200">{role.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Cargos que podem advertir
                </label>
                <div className="space-y-2">
                  {availableRoles.map((role) => (
                    <label
                      key={role.id}
                      className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800 p-3 hover:bg-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={config.warnRoles.includes(role.id)}
                        onChange={() => toggleRole(role.id, "warn")}
                        className="h-4 w-4 rounded border-gray-600 text-[#9c6dfc] focus:ring-2 focus:ring-[#9c6dfc]/20"
                      />
                      <span className="text-sm text-gray-200">{role.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Configurações de Advertência */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-200">
              Sistema de Advertências
            </h2>
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Advertências necessárias para ban
                </label>
                <input
                  type="number"
                  value={config.warningsToban}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      warningsToban: parseInt(e.target.value),
                    }))
                  }
                  min={1}
                  max={10}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Número de advertências antes do banimento automático
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Cargo ADV1
                  </label>
                  <select
                    value={config.adv1Role}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, adv1Role: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                  >
                    <option value="">Selecione</option>
                    {availableRoles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Cargo ADV2
                  </label>
                  <select
                    value={config.adv2Role}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, adv2Role: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                  >
                    <option value="">Selecione</option>
                    {availableRoles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Cargo ADV3
                  </label>
                  <select
                    value={config.adv3Role}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, adv3Role: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                  >
                    <option value="">Selecione</option>
                    {availableRoles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Cargo Ban
                  </label>
                  <select
                    value={config.banRole}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, banRole: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                  >
                    <option value="">Selecione</option>
                    {availableRoles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4">
                <div>
                  <p className="font-medium text-gray-200">
                    Remover whitelist ao banir
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Remove automaticamente a whitelist do jogador
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={config.removeWhitelistOnBan}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        removeWhitelistOnBan: e.target.checked,
                      }))
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full"></div>
                </label>
              </div>

              <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-200">
                      Expiração automática
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                      Advertências expiram após X dias
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={config.autoExpireWarnings}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          autoExpireWarnings: e.target.checked,
                        }))
                      }
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
                {config.autoExpireWarnings && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Dias até expiração
                    </label>
                    <input
                      type="number"
                      value={config.expirationDays}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          expirationDays: parseInt(e.target.value),
                        }))
                      }
                      min={1}
                      className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Canal de Logs
                </label>
                <select
                  value={config.logChannel}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, logChannel: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                >
                  <option value="">Selecione um canal</option>
                  {availableChannels.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      {ch.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Histórico */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/50">
            <div className="border-b border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-200">
                    Histórico de Punições
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    {filteredHistory.length} punições encontradas
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                  >
                    <option value="all">Todas</option>
                    <option value="warn">Advertências</option>
                    <option value="mute">Mutes</option>
                    <option value="kick">Kicks</option>
                    <option value="ban">Bans</option>
                  </select>
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

            <div className="divide-y divide-gray-800">
              {filteredHistory.map((item) => (
                <div key={item.id} className="p-6 hover:bg-gray-800/30">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`rounded-lg border p-2 ${getPunishmentBadge(
                          item.type
                        )}`}
                      >
                        {getPunishmentIcon(item.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-200">
                          {item.username}
                        </p>
                        <p className="mt-1 text-sm text-gray-400">
                          {item.reason}
                        </p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                          <span>Aplicado por: {item.appliedBy}</span>
                          <span>•</span>
                          <span>{new Date(item.appliedAt).toLocaleString()}</span>
                          {item.expiresAt && (
                            <>
                              <span>•</span>
                              <span>
                                Expira: {new Date(item.expiresAt).toLocaleString()}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium uppercase ${getPunishmentBadge(
                        item.type
                      )}`}
                    >
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
              {filteredHistory.length === 0 && (
                <div className="p-12 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-400">
                    Nenhuma punição encontrada
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}