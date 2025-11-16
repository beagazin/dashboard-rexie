export function ServerStatusPage() {
  const [config, setConfig] = useState({
    enabled: true,
    showButtons: true,
    connectButton: true,
    connectUrl: "fivem://connect/ip:port",
    shopButton: true,
    shopUrl: "https://loja.exemplo.com",
    showPlayers: true,
    channelId: "",
    serverIp: "",
    serverPort: "",
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-200">Status do Servidor</h1>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-200">Ativar Status</h2>
              <p className="mt-1 text-sm text-gray-400">Mostrar informações do servidor no Discord</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={config.enabled}
                onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                className="peer sr-only"
              />
              <div className="peer h-7 w-14 rounded-full bg-gray-700 after:absolute after:left-[4px] after:top-[4px] after:h-6 after:w-6 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </div>

        {config.enabled && (
          <>
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 font-semibold text-gray-200">Configurações do Servidor</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm text-gray-300">IP do Servidor</label>
                  <input
                    type="text"
                    value={config.serverIp}
                    onChange={(e) => setConfig({ ...config, serverIp: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                    placeholder="192.168.1.1"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-300">Porta</label>
                  <input
                    type="text"
                    value={config.serverPort}
                    onChange={(e) => setConfig({ ...config, serverPort: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                    placeholder="30120"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-300">Canal de Exibição</label>
                  <select
                    value={config.channelId}
                    onChange={(e) => setConfig({ ...config, channelId: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                  >
                    <option value="">Selecione</option>
                    <option value="ch1">📊-status</option>
                    <option value="ch2">📢-informações</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <h3 className="mb-4 font-semibold text-gray-200">Botões do Painel</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4">
                  <div>
                    <p className="font-medium text-gray-200">Botão "Conectar"</p>
                    <input
                      type="text"
                      value={config.connectUrl}
                      onChange={(e) => setConfig({ ...config, connectUrl: e.target.value })}
                      className="mt-2 w-full rounded border border-gray-700 bg-gray-900 px-3 py-1 text-sm text-gray-200"
                      placeholder="fivem://connect/..."
                    />
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={config.connectButton}
                      onChange={(e) => setConfig({ ...config, connectButton: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4">
                  <div>
                    <p className="font-medium text-gray-200">Botão "Loja"</p>
                    <input
                      type="url"
                      value={config.shopUrl}
                      onChange={(e) => setConfig({ ...config, shopUrl: e.target.value })}
                      className="mt-2 w-full rounded border border-gray-700 bg-gray-900 px-3 py-1 text-sm text-gray-200"
                      placeholder="https://..."
                    />
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={config.shopButton}
                      onChange={(e) => setConfig({ ...config, shopButton: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4">
                  <div>
                    <p className="font-medium text-gray-200">Exibir Jogadores Online</p>
                    <p className="text-sm text-gray-400">Mostra contador de players em tempo real</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={config.showPlayers}
                      onChange={(e) => setConfig({ ...config, showPlayers: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9c6dfc] peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
