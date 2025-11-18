"use client";

import { useEffect } from "react";

type ToastType = "success" | "error" | "warning" | "info";

export function useToast() {
  useEffect(() => {
    // Listen for config-saved events
    const handleConfigSaved = (event: CustomEvent) => {
      const { key, success, error } = event.detail;
      
      if (success) {
        showToast("success", "Configurações salvas", "As alterações foram salvas com sucesso");
      } else {
        showToast("error", "Erro ao salvar", error?.message || "Ocorreu um erro ao salvar as configurações");
      }
    };

    window.addEventListener("config-saved", handleConfigSaved as EventListener);
    
    return () => {
      window.removeEventListener("config-saved", handleConfigSaved as EventListener);
    };
  }, []);

  const showToast = (type: ToastType, title: string, message?: string) => {
    const event = new CustomEvent("show-toast", {
      detail: { type, title, message },
    });
    window.dispatchEvent(event);
  };

  return { showToast };
}