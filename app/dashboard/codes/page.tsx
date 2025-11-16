"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SaveButton from "@/components/dashboard/SaveButton";

interface Code {
  id: string;
  code: string;
  uses: number;
  maxUses: number;
  expiresAt?: Date;
  createdAt: Date;
}

interface CodeUsage {
  userId: string;
  username: string;
  discordId: string;
  cityId: string;
  usedAt: Date;
}

export function CodesPage() {
  const [config, setConfig] = useState({ enabled: true });
  const [codes, setCodes] = useState<Code[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newCode, setNewCode] = useState({ code: "", maxUses: 1, expires: false, expiresAt: "" });
  const [selectedCode, setSelectedCode] = useState<Code | null>(null);
  const [usageDetails, setUsageDetails] = useState<CodeUsage[]>([]);

  const handleCreateCode = () => {
    const code: Code = {
      id: Date.now().toString(),
      code: newCode.code,
      uses: 0,
      maxUses: newCode.maxUses,
      expiresAt: newCode.expires ? new Date(newCode.expiresAt) : undefined,
      createdAt: new Date(),
    };
    setCodes([...codes, code]);
    setShowModal(false);
    setNewCode({ code: "", maxUses: 1, expires: false, expiresAt: "" });
  };

  const handleDeleteCode = (id: string) => {
    if (confirm("Deletar este código?")) {
      setCodes(codes.filter((c) => c.id !== id));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-200">Codiguin</h1>
            <p className="mt-1 text-sm text-gray-400">Gerenciar códigos de acesso</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-lg bg-[#9c6dfc] px-4 py-2 text-sm text-white hover:bg-[#8c5dec]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Criar Código
          </button>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-3 font-semibold text-gray-200">Como Funciona</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>• Membros usam o comando /sugestao para enviar ideias</p>
            <p>• A sugestão é enviada automaticamente para o canal configurado</p>
            <p>• O bot adiciona reações 👍 e 👎 para votação</p>
            <p>• Staff pode marcar como aprovada, rejeitada ou em análise</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}