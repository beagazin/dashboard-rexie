"use client";

import { useState, useEffect } from "react";
import SaveButton from "@/components/dashboard/SaveButton";

interface AllowlistManualConfig {
  enabled: boolean;
  category: string;
  mainChannel: string;
  resultsChannel: string;
  viewRoles: string[];
  manageRoles: string[];
  approvedMessage: string;
  rejectedMessage: string;
  approvedRole: string;
  enableCodiguin: boolean;
  codigList: string;
}

interface AllowlistRequest {
  id: string;
  userId: string;
  username: string;
  discordId: string;
  cityId: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
}

export default function AllowlistManualContent() {
  const [config, setConfig] = useState<AllowlistManualConfig>({
    enabled: true,
    category: "",
    mainChannel: "",
    resultsChannel: "",
    viewRoles: [],
    manageRoles: [],
    approvedMessage: "✅ Sua allowlist foi aprovada! Bem-vindo ao servidor.",
    rejectedMessage: "❌ Sua allowlist foi rejeitada. Tente novamente mais tarde.",
    approvedRole: "",
    enableCodiguin: false,
    codigList: "",
  });

  const [originalConfig, setOriginalConfig] = useState(config);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const [requests, setRequests] = useState<AllowlistRequest[]>([
    {
      id: "1",
      userId: "123456789",
      username: "User#1234",
      discordId: "123456789",
      cityId: "12345",
      status: "pending",
      submittedAt: new Date(),
    },
    {
      id: "2",
      userId: "987654321",
      username: "Player#5678",
      discordId: "987654321",
      cityId: "67890",
      status: "approved",
      submittedAt: new Date(Date.now() - 3600000),
      reviewedBy: "Admin",
      reviewedAt: new Date(Date.now() - 1800000),
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterUser, setFilterUser] = useState("");

  // Mock data
  const [availableCategories] = useState([
    { id: "cat1", name: "📝 Allowlists" },
    { id: "cat2", name: "✅ Verificações" },
  ]);

  const [availableChannels] = useState([
    { id: "ch1", name: "📋-allowlist" },
    { id: "ch2", name: "📊-resultados" },
  ]);

  const [availableRoles] = useState([
    { id: "1", name: "Admin" },
    { id: "2", name: "Moderador" },
    { id: "3", name: "Aprovado" },
  ]);

  const [codigLists] = useState([
    { id: "list1", name: "Lista Padrão" },
    { id: "list2", name: "Lista VIP" },
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

  const toggleRole = (roleId: string, type: "view" | "manage") => {
    setConfig((prev) => {
      const key = type === "view" ? "viewRoles" : "manageRoles";
      return {
        ...prev,
        [key]: prev[key].includes(roleId)
          ? prev[key].filter((id) => id !== roleId)
          : [...prev[key], roleId],
      };
    });
  };

  const handleApprove = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "approved" as const,
              reviewedBy: "Admin",
              reviewedAt: new Date(),
            }
          : req
      )
    );
  };

  const handleReject = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "rejected" as const,
              reviewedBy: "Admin",
              reviewedAt: new Date(),
            }
          : req
      )
    );
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      approved: "bg-green-500/10 text-green-400 border-green-500/20",
      rejected: "bg-red-500/10 text-red-400 border-red-500/20",
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: "Pendente",
      approved: "Aprovada",
      rejected: "Rejeitada",
    };
    return texts[status as keyof typeof texts] || status;
  };

  const filteredRequests = requests.filter((req) => {
    if (filterStatus !== "all" && req.status !== filterStatus) return false;
    if (filterUser && !req.username.toLowerCase().includes(filterUser.toLowerCase()))
      return false;
    return true;
  });

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200">Allowlist Manual</h1>
          <p className="mt-1 text-sm text-gray-400">
            Sistema de aprovação manual de allowlists
          </p>
        </div>
        {hasChanges && <SaveButton onClick={handleSave} loading={saving} />}
      </div>

      {/* Status */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-200">
              Ativar Allowlist Manual
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Sistema de aprovação manual por staff
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
          {/* Configurações de Canal */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-200">
              Configurações de Canal
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Categoria onde os canais serão criados
                </label>
                <select
                  value={config.category}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, category: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                >
                  <option value="">Selecione uma categoria</option>
                  {availableCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Canal da mensagem principal
                </label>
                <select
                  value={config.mainChannel}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, mainChannel: e.target.value }))
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

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Canal de resultados
                </label>
                <select
                  value={config.resultsChannel}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, resultsChannel: e.target.value }))
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

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Cargo atribuído ao aprovado
                </label>
                <select
                  value={config.approvedRole}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, approvedRole: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                >
                  <option value="">Selecione um cargo</option>
                  {availableRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Permissões */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-200">Permissões</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Cargos que podem visualizar
                </label>
                <div className="space-y-2">
                  {availableRoles.map((role) => (
                    <label
                      key={role.id}
                      className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800 p-3 hover:bg-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={config.viewRoles.includes(role.id)}
                        onChange={() => toggleRole(role.id, "view")}
                        className="h-4 w-4 rounded border-gray-600 text-[#9c6dfc] focus:ring-2 focus:ring-[#9c6dfc]/20"
                      />
                      <span className="text-sm text-gray-200">{role.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Cargos que podem gerenciar
                </label>
                <div className="space-y-2">
                  {availableRoles.map((role) => (
                    <label
                      key={role.id}
                      className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800 p-3 hover:bg-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={config.manageRoles.includes(role.id)}
                        onChange={() => toggleRole(role.id, "manage")}
                        className="h-4 w-4 rounded border-gray-600 text-[#9c6dfc] focus:ring-2 focus:ring-[#9c6dfc]/20"
                      />
                      <span className="text-sm text-gray-200">{role.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mensagens */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-200">
              Mensagens Personalizadas
            </h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Mensagem de Aprovação
                </label>
                <textarea
                  value={config.approvedMessage}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      approvedMessage: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Mensagem de Rejeição
                </label>
                <textarea
                  value={config.rejectedMessage}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      rejectedMessage: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Codiguin */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-200">
                  Integração com Codiguin
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Exigir código para fazer allowlist
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={config.enableCodiguin}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      enableCodiguin: e.target.checked,
                    }))
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full"></div>
              </label>
            </div>

            {config.enableCodiguin && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Lista de Códigos
                </label>
                <select
                  value={config.codigList}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, codigList: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                >
                  <option value="">Selecione uma lista</option>
                  {codigLists.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Lista de Solicitações */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/50">
            <div className="border-b border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-200">
                    Solicitações de Allowlist
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    {filteredRequests.length} solicitação(ões) encontrada(s)
                    {pendingCount > 0 && (
                      <span className="ml-2 rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-400">
                        {pendingCount} pendente(s)
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                  >
                    <option value="all">Todas</option>
                    <option value="pending">Pendentes</option>
                    <option value="approved">Aprovadas</option>
                    <option value="rejected">Rejeitadas</option>
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

            {filteredRequests.length === 0 ? (
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-400">
                  Nenhuma solicitação encontrada
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="p-6 hover:bg-gray-800/30">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <p className="font-medium text-gray-200">
                            {request.username}
                          </p>
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium uppercase ${getStatusBadge(
                              request.status
                            )}`}
                          >
                            {getStatusText(request.status)}
                          </span>
                        </div>
                        <div className="mt-2 space-y-1 text-sm text-gray-400">
                          <p>Discord ID: {request.discordId}</p>
                          <p>ID Cidade: {request.cityId}</p>
                          <p>Enviado em: {request.submittedAt.toLocaleString()}</p>
                          {request.reviewedBy && (
                            <p>
                              Revisado por: {request.reviewedBy} em{" "}
                              {request.reviewedAt?.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                      {request.status === "pending" && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="rounded-lg bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 hover:bg-green-500/20"
                          >
                            Aprovar
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20"
                          >
                            Rejeitar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}