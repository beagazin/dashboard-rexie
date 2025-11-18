import { useState, useEffect, useCallback } from "react";

interface UseServerConfigReturn<T> {
  config: T;
  setConfig: React.Dispatch<React.SetStateAction<T>>;
  originalConfig: T;
  hasChanges: boolean;
  saving: boolean;
  saveConfig: () => Promise<boolean>;
  resetConfig: () => void;
  reloadConfig: () => Promise<void>;
}

export function useServerConfig<T>(
  key: string,
  initialValue: T,
  serverId?: string
): UseServerConfigReturn<T> {
  const [config, setConfig] = useState<T>(initialValue);
  const [originalConfig, setOriginalConfig] = useState<T>(initialValue);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Carregar configuração inicial
  const loadConfig = useCallback(async () => {
    if (!serverId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/servers/${serverId}/config/${key}`);
      
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
        setOriginalConfig(data);
      }
    } catch (error) {
      console.error("Erro ao carregar configuração:", error);
    } finally {
      setLoading(false);
    }
  }, [key, serverId]);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  // Detectar mudanças
  useEffect(() => {
    setHasChanges(JSON.stringify(config) !== JSON.stringify(originalConfig));
  }, [config, originalConfig]);

  // Salvar configuração
  const saveConfig = async (): Promise<boolean> => {
    if (!serverId) return false;
    
    setSaving(true);
    try {
      const response = await fetch(`/api/servers/${serverId}/config/${key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar configuração");
      }

      setOriginalConfig(config);
      setHasChanges(false);
      
      // Disparar evento personalizado para notificação
      window.dispatchEvent(
        new CustomEvent("config-saved", {
          detail: { key, success: true },
        })
      );
      
      return true;
    } catch (error) {
      console.error("Erro ao salvar configuração:", error);
      
      window.dispatchEvent(
        new CustomEvent("config-saved", {
          detail: { key, success: false, error },
        })
      );
      
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Resetar para configuração original
  const resetConfig = () => {
    setConfig(originalConfig);
  };

  // Recarregar configuração do servidor
  const reloadConfig = async () => {
    await loadConfig();
  };

  return {
    config,
    setConfig,
    originalConfig,
    hasChanges,
    saving,
    saveConfig,
    resetConfig,
    reloadConfig,
  };
}