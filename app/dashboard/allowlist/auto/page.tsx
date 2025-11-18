// app/dashboard/allowlist/auto/page.tsx
"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SaveButton from "@/components/dashboard/SaveButton";
import { useServerConfig } from "@/hooks/useServerConfig";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface AllowlistAutoConfig {
  enabled: boolean;
  category: string;
  mainChannel: string;
  viewRoles: string[];
  manageRoles: string[];
  resultsChannel: string;
  approvedMessage: string;
  rejectedMessage: string;
  approvedRole: string;
  questions: Question[];
  enableCodiguin: boolean;
  codigList: string;
}

export default function AllowlistAutoPage() {
  const serverId = "123456789"; // TODO: Get from context/params
  
  const { config, setConfig, hasChanges, saving, saveConfig } = useServerConfig<AllowlistAutoConfig>(
    "allowlist-auto",
    {
      enabled: true,
      category: "",
      mainChannel: "",
      viewRoles: [],
      manageRoles: [],
      resultsChannel: "",
      approvedMessage: "✅ Sua allowlist foi aprovada! Bem-vindo ao servidor.",
      rejectedMessage: "❌ Sua allowlist foi rejeitada. Tente novamente mais tarde.",
      approvedRole: "",
      questions: [],
      enableCodiguin: false,
      codigList: "",
    },
    serverId
  );

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

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

  const handleAddQuestion = () => {
    setEditingQuestion({
      id: Date.now().toString(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    });
    setShowQuestionModal(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowQuestionModal(true);
  };

  const handleSaveQuestion = () => {
    if (!editingQuestion) return;

    setConfig((prev) => {
      const exists = prev.questions.find((q) => q.id === editingQuestion.id);
      if (exists) {
        return {
          ...prev,
          questions: prev.questions.map((q) =>
            q.id === editingQuestion.id ? editingQuestion : q
          ),
        };
      } else {
        return {
          ...prev,
          questions: [...prev.questions, editingQuestion],
        };
      }
    });

    setShowQuestionModal(false);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm("Tem certeza que deseja deletar esta pergunta?")) {
      setConfig((prev) => ({
        ...prev,
        questions: prev.questions.filter((q) => q.id !== id),
      }));
    }
  };

  const toggleRole = (roleId: string, type: 'view' | 'manage') => {
    setConfig((prev) => {
      const key = type === 'view' ? 'viewRoles' : 'manageRoles';
      return {
        ...prev,
        [key]: prev[key].includes(roleId)
          ? prev[key].filter((id) => id !== roleId)
          : [...prev[key], roleId],
      };
    });
  };

  return (
    <DashboardLayout session={{} as any} servers={[]} currentServer={null}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-200">
              Allowlist Automática
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Configure perguntas de múltipla escolha para aprovação automática
            </p>
          </div>
          {hasChanges && <SaveButton onClick={saveConfig} loading={saving} />}
        </div>

        {/* Status */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-200">
                Ativar Allowlist Automática
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Sistema de aprovação com perguntas e respostas
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
            {/* Canais e Categorias */}
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
              <h2 className="mb-4 text-lg font-semibold text-gray-200">
                Permissões
              </h2>
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
                          onChange={() => toggleRole(role.id, 'view')}
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
                          onChange={() => toggleRole(role.id, 'manage')}
                          className="h-4 w-4 rounded border-gray-600 text-[#9c6dfc] focus:ring-2 focus:ring-[#9c6dfc]/20"
                        />
                        <span className="text-sm text-gray-200">{role.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Perguntas */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-200">
                  Perguntas
                </h2>
                <button
                  onClick={handleAddQuestion}
                  className="flex items-center gap-2 rounded-lg bg-[#9c6dfc] px-4 py-2 text-sm font-medium text-white hover:bg-[#8c5dec]"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Adicionar Pergunta
                </button>
              </div>

              {config.questions.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-gray-700 p-12 text-center">
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
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-400">
                    Nenhuma pergunta criada ainda
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {config.questions.map((question, index) => (
                    <div
                      key={question.id}
                      className="rounded-lg border border-gray-700 bg-gray-800 p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-200">
                            {index + 1}. {question.question}
                          </p>
                          <div className="mt-2 space-y-1">
                            {question.options.map((option, idx) => (
                              <div
                                key={idx}
                                className={`text-sm ${
                                  idx === question.correctAnswer
                                    ? "text-green-400"
                                    : "text-gray-400"
                                }`}
                              >
                                {String.fromCharCode(65 + idx)}) {option}
                                {idx === question.correctAnswer && " ✓"}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditQuestion(question)}
                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
          </>
        )}
      </div>

      {/* Modal de Pergunta */}
      {showQuestionModal && editingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-6 text-xl font-semibold text-gray-200">
              {editingQuestion.question ? "Editar Pergunta" : "Nova Pergunta"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Pergunta
                </label>
                <input
                  type="text"
                  value={editingQuestion.question}
                  onChange={(e) =>
                    setEditingQuestion((prev) =>
                      prev ? { ...prev, question: e.target.value } : prev
                    )
                  }
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                  placeholder="Digite a pergunta"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Opções de Resposta
                </label>
                <div className="space-y-2">
                  {editingQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-sm text-gray-400">
                        {String.fromCharCode(65 + index)})
                      </span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          setEditingQuestion((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  options: prev.options.map((o, i) =>
                                    i === index ? e.target.value : o
                                  ),
                                }
                              : prev
                          )
                        }
                        className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                        placeholder={`Opção ${String.fromCharCode(65 + index)}`}
                      />
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={editingQuestion.correctAnswer === index}
                        onChange={() =>
                          setEditingQuestion((prev) =>
                            prev ? { ...prev, correctAnswer: index } : prev
                          )
                        }
                        className="h-4 w-4 border-gray-600 text-[#9c6dfc] focus:ring-2 focus:ring-[#9c6dfc]/20"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Selecione o botão de rádio da resposta correta
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowQuestionModal(false);
                  setEditingQuestion(null);
                }}
                className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveQuestion}
                className="rounded-lg bg-[#9c6dfc] px-4 py-2 text-sm text-white hover:bg-[#8c5dec]"
              >
                Salvar Pergunta
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}