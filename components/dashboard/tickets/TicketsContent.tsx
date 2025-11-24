"use client";

import { useState, useEffect } from "react";
import SaveButton from "@/components/dashboard/SaveButton";

interface TicketCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  allowedRoles: string[];
  discordCategory: string;
}

interface TicketConfig {
  enabled: boolean;
  categories: TicketCategory[];
  enableCodiguin: boolean;
  codigList: string;
}

export default function TicketsContent() {
  const [config, setConfig] = useState<TicketConfig>({
    enabled: true,
    categories: [],
    enableCodiguin: false,
    codigList: "",
  });

  const [originalConfig, setOriginalConfig] = useState<TicketConfig>(config);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingCategory, setEditingCategory] = useState<TicketCategory | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Mock data
  const [availableRoles] = useState([
    { id: "1", name: "Admin" },
    { id: "2", name: "Moderador" },
    { id: "3", name: "Staff" },
  ]);

  const [discordCategories] = useState([
    { id: "cat1", name: "📝 Tickets" },
    { id: "cat2", name: "🎫 Suporte" },
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

  const handleAddCategory = () => {
    setEditingCategory({
      id: Date.now().toString(),
      name: "",
      emoji: "🎫",
      description: "",
      allowedRoles: [],
      discordCategory: "",
    });
    setShowCategoryModal(true);
  };

  const handleEditCategory = (category: TicketCategory) => {
    setEditingCategory(category);
    setShowCategoryModal(true);
  };

  const handleSaveCategory = () => {
    if (!editingCategory) return;

    setConfig((prev) => {
      const exists = prev.categories.find((c) => c.id === editingCategory.id);
      if (exists) {
        return {
          ...prev,
          categories: prev.categories.map((c) =>
            c.id === editingCategory.id ? editingCategory : c
          ),
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, editingCategory],
        };
      }
    });

    setShowCategoryModal(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("Tem certeza que deseja deletar esta categoria?")) {
      setConfig((prev) => ({
        ...prev,
        categories: prev.categories.filter((c) => c.id !== id),
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-200">
            Sistema de Tickets
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Configure categorias e gerenciamento de tickets
          </p>
        </div>
        {hasChanges && <SaveButton onClick={handleSave} loading={saving} />}
      </div>

      {/* Status */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-200">
              Ativar Sistema de Tickets
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Habilite ou desabilite o sistema completo
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
            <div className="peer h-7 w-14 rounded-full bg-gray-700 after:absolute after:left-[4px] after:top-[4px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-600 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-[#9c6dfc]/20"></div>
          </label>
        </div>
      </div>

      {config.enabled && (
        <>
          {/* Categorias */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-200">
                Categorias de Tickets
              </h2>
              <button
                onClick={handleAddCategory}
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
                Adicionar Categoria
              </button>
            </div>

            {config.categories.length === 0 ? (
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
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-400">
                  Nenhuma categoria criada ainda
                </p>
                <button
                  onClick={handleAddCategory}
                  className="mt-4 text-sm text-[#9c6dfc] hover:text-[#b896fc]"
                >
                  Criar primeira categoria
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {config.categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.emoji}</span>
                      <div>
                        <p className="font-medium text-gray-200">
                          {category.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {category.description}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {category.allowedRoles.length} cargos
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditCategory(category)}
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
                        onClick={() => handleDeleteCategory(category.id)}
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
                ))}
              </div>
            )}
          </div>

          {/* Codiguin */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-200">
                  Integração com Codiguin
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Exigir código ao abrir ticket
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
                <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-600 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-[#9c6dfc]/20"></div>
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
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none focus:ring-2 focus:ring-[#9c6dfc]/20"
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

      {/* Modal de Categoria */}
      {showCategoryModal && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-6 text-xl font-semibold text-gray-200">
              {editingCategory.name ? "Editar Categoria" : "Nova Categoria"}
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Nome da Categoria
                  </label>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory((prev) =>
                        prev ? { ...prev, name: e.target.value } : prev
                      )
                    }
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none focus:ring-2 focus:ring-[#9c6dfc]/20"
                    placeholder="Ex: Suporte Geral"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Emoji
                  </label>
                  <input
                    type="text"
                    value={editingCategory.emoji}
                    onChange={(e) =>
                      setEditingCategory((prev) =>
                        prev ? { ...prev, emoji: e.target.value } : prev
                      )
                    }
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none focus:ring-2 focus:ring-[#9c6dfc]/20"
                    placeholder="🎫"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Descrição
                </label>
                <textarea
                  value={editingCategory.description}
                  onChange={(e) =>
                    setEditingCategory((prev) =>
                      prev ? { ...prev, description: e.target.value } : prev
                    )
                  }
                  rows={3}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none focus:ring-2 focus:ring-[#9c6dfc]/20"
                  placeholder="Descreva para que serve esta categoria"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Categoria do Discord
                </label>
                <select
                  value={editingCategory.discordCategory}
                  onChange={(e) =>
                    setEditingCategory((prev) =>
                      prev ? { ...prev, discordCategory: e.target.value } : prev
                    )
                  }
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none focus:ring-2 focus:ring-[#9c6dfc]/20"
                >
                  <option value="">Selecione uma categoria</option>
                  {discordCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Cargos com Permissão
                </label>
                <div className="space-y-2">
                  {availableRoles.map((role) => (
                    <label
                      key={role.id}
                      className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800 p-3 hover:bg-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={editingCategory.allowedRoles.includes(role.id)}
                        onChange={(e) => {
                          setEditingCategory((prev) => {
                            if (!prev) return prev;
                            return {
                              ...prev,
                              allowedRoles: e.target.checked
                                ? [...prev.allowedRoles, role.id]
                                : prev.allowedRoles.filter((id) => id !== role.id),
                            };
                          });
                        }}
                        className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-[#9c6dfc] focus:ring-2 focus:ring-[#9c6dfc]/20"
                      />
                      <span className="text-sm text-gray-200">{role.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCategoryModal(false);
                  setEditingCategory(null);
                }}
                className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveCategory}
                className="rounded-lg bg-[#9c6dfc] px-4 py-2 text-sm text-white hover:bg-[#8c5dec]"
              >
                Salvar Categoria
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}