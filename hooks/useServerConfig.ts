import { useState, useEffect } from "react";

export function useServerConfig<T>(key: string, initialValue: T) {
  const [config, setConfig] = useState<T>(initialValue);
  const [originalConfig, setOriginalConfig] = useState<T>(initialValue);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Carregar configuração do servidor
    loadConfig();
  }, [key]);

  useEffect(() => {
    setHasChanges(JSON.stringify(config) !== JSON.stringify(originalConfig));
  }, [config, originalConfig]);

  const loadConfig = async () => {
    try {
      // TODO: Implementar chamada à API
      // const data = await fetch(`/api/config/${key}`).then(r => r.json());
      // setConfig(data);
      // setOriginalConfig(data);
    } catch (error) {
      console.error("Erro ao carregar configuração:", error);
    }
  };

  const saveConfig = async () => {
    setSaving(true);
    try {
      // TODO: Implementar chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // await fetch(`/api/config/${key}`, {
      //   method: 'POST',
      //   body: JSON.stringify(config)
      // });
      
      setOriginalConfig(config);
      setHasChanges(false);
      return true;
    } catch (error) {
      console.error("Erro ao salvar configuração:", error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const resetConfig = () => {
    setConfig(originalConfig);
  };

  return {
    config,
    setConfig,
    hasChanges,
    saving,
    saveConfig,
    resetConfig,
  };
}