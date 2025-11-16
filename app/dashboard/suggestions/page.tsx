export function SuggestionsPage() {
  const [config, setConfig] = useState({
    enabled: true,
    channel: "",
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-200">Sistema de Sugestões</h1>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-200">Ativar Sugestões</h2>
              <p className="mt-1 text-sm text-gray-400">Permite que membros enviem sugestões</p>
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
            <div>
              <label className="mb-2 block text-sm text-gray-300">Canal de Sugestões</label>
              <select
                value={config.channel}
                onChange={(e) => setConfig({ ...config, channel: e.target.value })}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 focus:border-[#9c6dfc] focus:outline-none"
              >
                <option value="">Selecione um canal</option>
                <option value="ch1">💡-sugestões</option>
                <option value="ch2">📝-ideias</option>
              </select>
              <p className="mt-2 text-xs text-gray-500">
                As sugestões terão reações de 👍 e 👎 automaticamente
              </p>
            </div>
          )}
        </div>

        <div className="rounded-lg