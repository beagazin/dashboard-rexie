"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SaveButton from "@/components/dashboard/SaveButton";

interface AutoRoleConfig {
  enabled: boolean;
  roles: string[];
  conditions: {
    accountAge: boolean;
    accountAgeDays: number;
    applyDelay: boolean;
    delayMinutes: number;
  };
}

export default function AutoRolePage() {
  const [config, setConfig] = useState<AutoRoleConfig>({
    enabled: true,
    roles: [],
    conditions: {
      accountAge: false,
      accountAgeDays: 7,
      applyDelay: false,
      delayMinutes: 5,
    },
  });

  const [originalConfig, setOriginalConfig] = useState<AutoRoleConfig>(config);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const [availableRoles, setAvailableRoles] = useState([
    { id: "1", name: "Membro", color: "#99AAB5" },
    { id: "2", name: "Verificado", color: "#43B581" },
    { id: "3", name: "Iniciante", color: "#5865F2" },
  ]);

  useEffect(() => {
    setHasChanges(JSON.stringify(config) !== JSON.stringify(originalConfig));
  }, [config, originalConfig]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOriginalConfig(config);
      setHasChanges(false);
      alert("Configurações salvas com sucesso!");
    } catch (error) {
      alert("Erro ao salvar configurações");
    } finally {
      setSaving(false);
    }
  };

  const toggleRole = (roleId: string) => {
    setConfig((prev) => ({
      ...prev,
      roles: prev.roles.includes(roleId)
        ? prev.roles.filter((id) => id !== roleId)
        : [...prev.roles, roleId],
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-200">Auto Role</h1>
            <p className="mt-1 text-sm text-gray-400">
              Configure cargos automáticos para novos membros
            </p>
          </div>
          {hasChanges && <SaveButton onClick={handleSave} loading={saving} />}
        </div>

        {/* Status */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-200">
                Ativar Auto Role
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Atribuir cargos automaticamente ao entrar no servidor
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
            {/* Cargos */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-200">
                Selecionar Cargos
              </h2>
              <div className="space-y-2">
                {availableRoles.map((role) => (
                  <label
                    key={role.id}
                    className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800 p-4 hover:bg-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={config.roles.includes(role.id)}
                      onChange={() => toggleRole(role.id)}
                      className="h-5 w-5 rounded border-gray-600 text-[#9c6dfc] focus:ring-2 focus:ring-[#9c6dfc]/20"
                    />
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: role.color }}
                    />
                    <span className="text-gray-200">{role.name}</span>
                  </label>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-500">
                {config.roles.length} cargo(s) selecionado(s)
              </p>
            </div>

            {/* Condições */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-200">
                Condições Opcionais
              </h2>
              <div className="space-y-4">
                {/* Idade da conta */}
                <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-200">
                        Verificar idade da conta
                      </p>
                      <p className="mt-1 text-sm text-gray-400">
                        Aplicar apenas se a conta tiver mais de X dias
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={config.conditions.accountAge}
                        onChange={(e) =>
                          setConfig((prev) => ({
                            ...prev,
                            conditions: {
                              ...prev.conditions,
                              accountAge: e.target.checked,
                            },
                          }))
                        }
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                  {config.conditions.accountAge && (
                    <div className="mt-4">
                      <label className="mb-2 block text-sm text-gray-300">
                        Idade mínima (dias)
                      </label>
                      <input
                        type="number"
                        value={config.conditions.accountAgeDays}
                        onChange={(e) =>
                          setConfig((prev) => ({
                            ...prev,
                            conditions: {
                              ...prev.conditions,
                              accountAgeDays: parseInt(e.target.value),
                            },
                          }))
                        }
                        min={1}
                        className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none focus:ring-2 focus:ring-[#9c6dfc]/20"
                      />
                    </div>
                  )}
                </div>

                {/* Delay */}
                <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-200">
                        Aplicar com delay
                      </p>
                      <p className="mt-1 text-sm text-gray-400">
                        Aguardar alguns minutos antes de aplicar o cargo
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={config.conditions.applyDelay}
                        onChange={(e) =>
                          setConfig((prev) => ({
                            ...prev,
                            conditions: {
                              ...prev.conditions,
                              applyDelay: e.target.checked,
                            },
                          }))
                        }
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                  {config.conditions.applyDelay && (
                    <div className="mt-4">
                      <label className="mb-2 block text-sm text-gray-300">
                        Delay (minutos)
                      </label>
                      <input
                        type="number"
                        value={config.conditions.delayMinutes}
                        onChange={(e) =>
                          setConfig((prev) => ({
                            ...prev,
                            conditions: {
                              ...prev.conditions,
                              delayMinutes: parseInt(e.target.value),
                            },
                          }))
                        }
                        min={1}
                        className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none focus:ring-2 focus:ring-[#9c6dfc]/20"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}