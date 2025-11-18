"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface ServerSelectorProps {
  servers: any[];
  currentServer: any;
}

export default function ServerSelector({
  servers,
  currentServer,
}: ServerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelectServer = (serverId: string) => {
    const currentPath = window.location.pathname;
    router.push(`${currentPath}?server=${serverId}`);
    setIsOpen(false);
  };

  const getServerIcon = (server: any) => {
    if (server.icon) {
      return `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=128`;
    }
    return null;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-3 rounded-lg bg-gray-800 p-3 hover:bg-gray-700"
      >
        {currentServer ? (
          <>
            {getServerIcon(currentServer) ? (
              <img
                src={getServerIcon(currentServer)}
                alt={currentServer.name}
                className="h-10 w-10 rounded-lg"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#9c6dfc]">
                <span className="text-lg font-bold text-white">
                  {currentServer.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-gray-200">
                {currentServer.name}
              </p>
              <p className="text-xs text-gray-400">
                {currentServer.memberCount || 0} membros
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-gray-200">
              Selecione um servidor
            </p>
          </div>
        )}
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-lg border border-gray-800 bg-gray-900 py-2 shadow-xl">
            {servers.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-gray-400">
                  Nenhum servidor encontrado
                </p>
                <button className="mt-3 rounded-lg bg-[#9c6dfc] px-4 py-2 text-sm font-medium text-white hover:bg-[#8c5dec]">
                  Adicionar BOT
                </button>
              </div>
            ) : (
              <>
                {servers.map((server) => (
                  <button
                    key={server.id}
                    onClick={() => handleSelectServer(server.id)}
                    className={`flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-800 ${
                      currentServer?.id === server.id ? "bg-gray-800" : ""
                    }`}
                  >
                    {getServerIcon(server) ? (
                      <img
                        src={getServerIcon(server)}
                        alt={server.name}
                        className="h-10 w-10 rounded-lg"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#9c6dfc]">
                        <span className="text-lg font-bold text-white">
                          {server.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-gray-200">
                        {server.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {server.memberCount || 0} membros
                      </p>
                    </div>
                    {currentServer?.id === server.id && (
                      <svg
                        className="h-5 w-5 text-[#9c6dfc]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
                <div className="border-t border-gray-800 pt-2">
                  <a
                    href="https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-200"
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Adicionar novo servidor
                  </a>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}