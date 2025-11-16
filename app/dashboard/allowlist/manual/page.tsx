export function ReleaseIdPage() {
  const [config, setConfig] = useState({
    enabled: true,
    channel: "",
    notificationMessage: "Seu ID foi liberado! Você já pode entrar no servidor.",
  });

  const [history, setHistory] = useState([
    { id: "1", userId: "123456", username: "User#1234", cityId: "12345", releasedBy: "Admin", timestamp: new Date() },
    { id: "2", userId: "789012", username: "Player#5678", cityId: "67890", releasedBy: "Mod", timestamp: new Date(Date.now() - 3600000) },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-200">Liberar ID</h1>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-200">Ativar Sistema</h2>
              <p className="mt-1 text-sm text-gray-400">Liberar IDs de jogadores</p>
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

          {config.enabled && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-gray-300">Canal de Logs</label>
                <select
                  value={config.channel}
                  onChange={(e) => setConfig({ ...config, channel: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                >
                  <option value="">Selecione um canal</option>
                  <option value="ch1">🔓-liberacoes</option>
                  <option value="ch2">📋-logs</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">Mensagem de Notificação</label>
                <textarea
                  value={config.notificationMessage}
                  onChange={(e) => setConfig({ ...config, notificationMessage: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
                  placeholder="Mensagem enviada ao jogador quando o ID for liberado"
                />
                <p className="mt-1 text-xs text-gray-500">Enviada via DM ao jogador</p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50">
          <div className="border-b border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-200">Histórico de Liberações</h2>
            <p className="mt-1 text-sm text-gray-400">IDs liberados recentemente</p>
          </div>
          <div className="divide-y divide-gray-800">
            {history.map((record) => (
              <div key={record.id} className="p-6 hover:bg-gray-800/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-200">{record.username}</p>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-400">
                      <span>ID Cidade: {record.cityId}</span>
                      <span>•</span>
                      <span>Liberado por: {record.releasedBy}</span>
                      <span>•</span>
                      <span>{record.timestamp.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}