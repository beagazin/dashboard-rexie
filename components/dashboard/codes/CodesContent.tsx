"use client";

import { useState } from "react";
import SaveButton from "@/components/dashboard/SaveButton";

interface Code {
  id: string;
  code: string;
  uses: number;
  maxUses: number;
  expiresAt?: Date;
  createdAt: Date;
  status: "active" | "exhausted" | "expired";
}

interface CodeUsage {
  userId: string;
  username: string;
  discordId: string;
  cityId: string;
  usedAt: Date;
}

export default function CodesContent() {
  const [config, setConfig] = useState({ enabled: true });
  const [codes, setCodes] = useState<Code[]>([
    {
      id: "1",
      code: "ABC123",
      uses: 3,
      maxUses: 5,
      createdAt: new Date(),
      status: "active" as const,
    },
    {
      id: "2",
      code: "XYZ789",
      uses: 10,
      maxUses: 10,
      createdAt: new Date(Date.now() - 86400000),
      status: "exhausted" as const,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCode, setSelectedCode] = useState<Code | null>(null);
  const [newCode, setNewCode] = useState({
    code: "",
    maxUses: 1,
    hasExpiration: false,
    expiresAt: "",
  });

  const [usageDetails] = useState<CodeUsage[]>([
    {
      userId: "123",
      username: "User#1234",
      discordId: "123456789",
      cityId: "12345",
      usedAt: new Date(),
    },
  ]);

  const handleCreateCode = () => {
    const code: Code = {
      id: Date.now().toString(),
      code: newCode.code,
      uses: 0,
      maxUses: newCode.maxUses,
      expiresAt: newCode.hasExpiration ? new Date(newCode.expiresAt) : undefined,
      createdAt: new Date(),
      status: "active",
    };
    setCodes([...codes, code]);
    setShowCreateModal(false);
    setNewCode({ code: "", maxUses: 1, hasExpiration: false, expiresAt: "" });
  };

  const handleDeleteCode = (id: string) => {
    if (confirm("Deletar este código?")) {
      setCodes(codes.filter((c) => c.id !== id));
    }
  };

  const handleViewDetails = (code: Code) => {
    setSelectedCode(code);
    setShowDetailsModal(true);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: "bg-green-500/10 text-green-400 border-green-500/20",
      exhausted: "bg-gray-500/10 text-gray-400 border-gray-500/20",
      expired: "bg-red-500/10 text-red-400 border-red-500/20",
    };
    return badges[status as keyof typeof badges] || badges.active;
  };

  const getStatusText = (status: string) => {
    const texts = {
      active: "Ativo",
      exhausted: "Esgotado",
      expired: "Expirado",
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200">Codiguin</h1>
          <p className="mt-1 text-sm text-gray-400">Gerenciar códigos de acesso</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-lg bg-[#9c6dfc] px-4 py-2 text-sm font-medium text-white hover:bg-[#8c5dec]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Criar Código
        </button>
      </div>

      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-200">Ativar Sistema</h2>
            <p className="mt-1 text-sm text-gray-400">Habilitar uso de códigos</p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) => setConfig({ enabled: e.target.checked })}
              className="peer sr-only"
            />
            <div className="peer h-7 w-14 rounded-full bg-gray-700 after:absolute after:left-[4px] after:top-[4px] after:h-6 after:w-6 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full"></div>
          </label>
        </div>
      </div>

      {config.enabled && (
        <div className="rounded-lg border border-gray-800 bg-gray-900/50">
          <div className="border-b border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-200">Códigos Criados</h2>
            <p className="mt-1 text-sm text-gray-400">{codes.length} código(s) cadastrado(s)</p>
          </div>

          {codes.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              <p className="mt-2 text-sm text-gray-400">Nenhum código criado</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {codes.map((code) => (
                <div key={code.id} className="p-6 hover:bg-gray-800/30">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <code className="text-lg font-mono font-semibold text-[#9c6dfc]">{code.code}</code>
                        <span className={`rounded-full border px-3 py-1 text-xs font-medium uppercase ${getStatusBadge(code.status)}`}>
                          {getStatusText(code.status)}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm text-gray-400">
                        <span>Usos: {code.uses}/{code.maxUses}</span>
                        <span>•</span>
                        <span>Criado: {code.createdAt.toLocaleDateString()}</span>
                        {code.expiresAt && (
                          <>
                            <span>•</span>
                            <span>Expira: {code.expiresAt.toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                      <div className="mt-2">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                          <div
                            className="h-full bg-[#9c6dfc]"
                            style={{ width: `${(code.uses / code.maxUses) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(code)}
                        className="rounded-lg p-2 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteCode(code.id)}
                        className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal Criar Código */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-6 text-xl font-semibold text-gray-200">Criar Novo Código</h3>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Código</label>
                <input
                  type="text"
                  value={newCode.code}
                  onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 font-mono text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                  placeholder="ABC123"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Número de Usos</label>
                <input
                  type="number"
                  value={newCode.maxUses}
                  onChange={(e) => setNewCode({ ...newCode, maxUses: parseInt(e.target.value) || 1 })}
                  min={1}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                />
              </div>

              <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">Definir Expiração</label>
                  <input
                    type="checkbox"
                    checked={newCode.hasExpiration}
                    onChange={(e) => setNewCode({ ...newCode, hasExpiration: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-600 text-[#9c6dfc]"
                  />
                </div>
                {newCode.hasExpiration && (
                  <input
                    type="date"
                    value={newCode.expiresAt}
                    onChange={(e) => setNewCode({ ...newCode, expiresAt: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                  />
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateCode}
                disabled={!newCode.code}
                className="rounded-lg bg-[#9c6dfc] px-4 py-2 text-sm text-white hover:bg-[#8c5dec] disabled:opacity-50"
              >
                Criar Código
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detalhes */}
      {showDetailsModal && selectedCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg border border-gray-800 bg-gray-900 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-200">Detalhes do Código</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-800"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6 rounded-lg border border-gray-700 bg-gray-800 p-4">
              <div className="mb-2 flex items-center gap-3">
                <code className="text-2xl font-mono font-bold text-[#9c6dfc]">{selectedCode.code}</code>
                <span className={`rounded-full border px-3 py-1 text-xs font-medium uppercase ${getStatusBadge(selectedCode.status)}`}>
                  {getStatusText(selectedCode.status)}
                </span>
              </div>
              <p className="text-sm text-gray-400">
                {selectedCode.uses} de {selectedCode.maxUses} usos ({Math.round((selectedCode.uses / selectedCode.maxUses) * 100)}%)
              </p>
            </div>

            <div className="mb-4 text-lg font-semibold text-gray-200">Histórico de Uso</div>

            {usageDetails.length === 0 ? (
              <div className="rounded-lg border border-gray-700 bg-gray-800 p-8 text-center">
                <p className="text-sm text-gray-400">Nenhum uso registrado</p>
              </div>
            ) : (
              <div className="space-y-2">
                {usageDetails.map((usage, index) => (
                  <div key={index} className="rounded-lg border border-gray-700 bg-gray-800 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-200">{usage.username}</p>
                        <div className="mt-1 space-y-1 text-sm text-gray-400">
                          <p>Discord ID: {usage.discordId}</p>
                          <p>ID Cidade: {usage.cityId}</p>
                          <p>Data: {usage.usedAt.toLocaleString()}</p>
                        </div>
                      </div>
                      <button className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 hover:bg-red-500/20">
                        Remover Whitelist
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}