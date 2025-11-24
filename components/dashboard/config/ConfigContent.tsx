"use client";

import { useState, useEffect } from "react";
import SaveButton from "@/components/dashboard/SaveButton";

interface BotConfig {
  name: string;
  avatar: string;
  color: string;
  allowedRoles: string[];
  maintenanceMode: boolean;
}

interface ConfigContentProps {
  serverId?: string;
}

export default function ConfigContent({ serverId }: ConfigContentProps) {
  const [config, setConfig] = useState<BotConfig>({
    name: "Rexie Bot",
    avatar: "",
    color: "#9c6dfc",
    allowedRoles: [],
    maintenanceMode: false,
  });

  const [originalConfig, setOriginalConfig] = useState<BotConfig>(config);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [testMessageOpen, setTestMessageOpen] = useState(false);

  // Mock data
  const [availableRoles] = useState([
    { id: "1", name: "Admin" },
    { id: "2", name: "Moderador" },
    { id: "3", name: "Staff" },
  ]);

  // Carregar configurações ao montar o componente
  useEffect(() => {
    const loadConfig = async () => {
      try {
        if (!serverId) {
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/servers/${serverId}/config/general`);
        if (response.ok) {
          const data = await response.json();
          const loadedConfig = {
            ...config,
            ...data,
            allowedRoles: data.allowedRoles || [],
          };
          setConfig(loadedConfig);
          setOriginalConfig(loadedConfig);
        }
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, [serverId]);

  // Detectar mudanças
  useEffect(() => {
    setHasChanges(JSON.stringify(config) !== JSON.stringify(originalConfig));
  }, [config, originalConfig]);

  const toggleRole = (roleId: string) => {
    setConfig((prev) => ({
      ...prev,
      allowedRoles: (prev.allowedRoles || []).includes(roleId)
        ? prev.allowedRoles.filter((id) => id !== roleId)
        : [...(prev.allowedRoles || []), roleId],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (serverId) {
        const response = await fetch(`/api/servers/${serverId}/config/general`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(config),
        });

        if (!response.ok) {
          throw new Error("Erro ao salvar");
        }
      }

      setOriginalConfig(config);
      setHasChanges(false);
      alert("Configurações salvas com sucesso!");
    } catch (error) {
      alert("Erro ao salvar configurações");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (
      confirm(
        "Tem certeza que deseja resetar todas as configurações? Esta ação não pode ser desfeita."
      )
    ) {
      const defaultConfig: BotConfig = {
        name: "Rexie Bot",
        avatar: "",
        color: "#9c6dfc",
        allowedRoles: [],
        maintenanceMode: false,
      };
      setConfig(defaultConfig);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <svg
            className="mx-auto h-8 w-8 animate-spin text-[#9c6dfc]"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-400">Carregando configurações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200">
            Configurações Gerais
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Personalize o comportamento e aparência do seu bot
          </p>
        </div>
        {hasChanges && <SaveButton onClick={handleSave} loading={saving} />}
      </div>

      {/* Configurações */}
      <div className="space-y-6">
        {/* Nome e Avatar */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-200">
            Aparência do BOT
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Nome do BOT
              </label>
              <input
                type="text"
                value={config.name}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none focus:ring-2 focus:ring-[#9c6dfc]/20"
                placeholder="Digite o nome do bot"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                URL do Avatar
              </label>
              <input
                type="url"
                value={config.avatar}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, avatar: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none focus:ring-2 focus:ring-[#9c6dfc]/20"
                placeholder="https://exemplo.com/avatar.png"
              />
              <p className="mt-1 text-xs text-gray-500">
                Deixe vazio para usar o avatar padrão
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Cor padrão das mensagens
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={config.color}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, color: e.target.value }))
                  }
                  className="h-12 w-24 cursor-pointer rounded-lg border border-gray-700"
                />
                <input
                  type="text"
                  value={config.color}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, color: e.target.value }))
                  }
                  className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none focus:ring-2 focus:ring-[#9c6dfc]/20"
                  placeholder="#9c6dfc"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Permissões */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-200">Permissões</h2>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Cargos que podem usar comandos
            </label>
            <div className="space-y-2">
              {availableRoles.map((role) => (
                <label
                  key={role.id}
                  className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800 p-3 hover:bg-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={(config.allowedRoles || []).includes(role.id)}
                    onChange={() => toggleRole(role.id)}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-[#9c6dfc] focus:ring-2 focus:ring-[#9c6dfc]/20"
                  />
                  <span className="text-sm text-gray-200">{role.name}</span>
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Selecione os cargos que terão permissão para usar os comandos do bot
            </p>
          </div>
        </div>

        {/* Ações */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-200">Ações</h2>
          <div className="space-y-4">
            {/* Modo Manutenção */}
            <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4">
              <div>
                <p className="font-medium text-gray-200">Modo Manutenção</p>
                <p className="mt-1 text-sm text-gray-400">
                  Desativa temporariamente todas as automações
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={config.maintenanceMode}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      maintenanceMode: e.target.checked,
                    }))
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full"></div>
              </label>
            </div>

            {/* Testar Mensagem */}
            <button
              onClick={() => setTestMessageOpen(true)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 text-sm font-medium text-gray-200 hover:bg-gray-700"
            >
              Testar Mensagem
            </button>

            {/* Resetar Configurações */}
            <button
              onClick={handleReset}
              className="w-full rounded-lg border border-red-500/20 bg-red-500/10 py-3 text-sm font-medium text-red-400 hover:bg-red-500/20"
            >
              Resetar Configurações (Modo Fábrica)
            </button>
          </div>
        </div>
      </div>

      {/* Modal Testar Mensagem */}
      {testMessageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-200">
              Testar Mensagem
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Uma mensagem de teste será enviada no Discord para verificar as
              configurações.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setTestMessageOpen(false)}
                className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert("Mensagem de teste enviada!");
                  setTestMessageOpen(false);
                }}
                className="rounded-lg bg-[#9c6dfc] px-4 py-2 text-sm text-white hover:bg-[#8c5dec]"
              >
                Enviar Teste
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}