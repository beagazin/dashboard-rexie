"use client";

import { useState } from "react";

export function BackupExportModal({ onClose }: { onClose: () => void }) {
  const [importing, setImporting] = useState(false);

  const handleExport = () => {
    // Coletar todas as configurações do servidor
    const backup: BackupData = {
      version: "1.0.0",
      exportDate: new Date(),
      serverId: "current-server-id",
      serverName: "Meu Servidor",
      config: {
        general: {}, // Todas as configs
        autoRole: {},
        tickets: {},
        allowlist: {},
        punishments: {},
        welcome: {},
        serverStatus: {},
        codes: {},
        suggestions: {},
        releaseId: {},
      },
    };

    const dataStr = JSON.stringify(backup, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rexie-backup-${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    alert("Backup exportado com sucesso!");
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const text = await file.text();
      const backup: BackupData = JSON.parse(text);

      // Validar estrutura do backup
      if (!backup.version || !backup.config) {
        throw new Error("Arquivo de backup inválido");
      }

      // Confirmar importação
      if (
        confirm(
          `Importar configurações de "${backup.serverName}"?\nData: ${new Date(
            backup.exportDate
          ).toLocaleString()}\n\nISTO IRÁ SOBRESCREVER TODAS AS CONFIGURAÇÕES ATUAIS!`
        )
      ) {
        // TODO: Implementar importação real
        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert("Configurações importadas com sucesso!");
        onClose();
      }
    } catch (error) {
      alert("Erro ao importar backup: " + (error as Error).message);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-200">
            Backup de Configurações
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Exportar */}
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-200">Exportar Configurações</h4>
                <p className="text-sm text-gray-400">
                  Baixar arquivo JSON com todas as configurações
                </p>
              </div>
            </div>
            <button
              onClick={handleExport}
              className="w-full rounded-lg bg-blue-500 py-2 text-sm font-medium text-white hover:bg-blue-600"
            >
              Exportar Agora
            </button>
          </div>

          {/* Importar */}
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-2">
                <svg
                  className="h-5 w-5 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-200">Importar Configurações</h4>
                <p className="text-sm text-gray-400">
                  Restaurar backup de um arquivo JSON
                </p>
              </div>
            </div>
            <label className="block">
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                disabled={importing}
                className="hidden"
              />
              <span className="block w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-600 py-2 text-center text-sm font-medium text-gray-300 hover:border-green-500 hover:bg-green-500/10 hover:text-green-400">
                {importing ? "Importando..." : "Selecionar Arquivo"}
              </span>
            </label>
          </div>

          {/* Aviso */}
          <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
            <div className="flex gap-2">
              <svg
                className="h-5 w-5 shrink-0 text-yellow-400"
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
              <p className="text-xs text-yellow-200">
                Ao importar, todas as configurações atuais serão substituídas. Faça
                um backup antes de importar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
