// components/dashboard/DashboardLogs.tsx
export function DashboardLogs() {
  const logs = [
    {
      id: "1",
      action: "Código usado",
      user: "@user123",
      details: "Código ABC123 usado com sucesso",
      timestamp: new Date(),
      type: "success",
    },
    {
      id: "2",
      action: "Punição aplicada",
      user: "@admin",
      details: "Advertência aplicada a @infrator",
      timestamp: new Date(Date.now() - 3600000),
      type: "warning",
    },
    {
      id: "3",
      action: "Ticket criado",
      user: "@user456",
      details: "Novo ticket de suporte #1234",
      timestamp: new Date(Date.now() - 7200000),
      type: "info",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-400 bg-green-400/10";
      case "warning":
        return "text-yellow-400 bg-yellow-400/10";
      case "error":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-blue-400 bg-blue-400/10";
    }
  };

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="border-b border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-gray-200">Logs de Auditoria</h2>
        <p className="mt-1 text-sm text-gray-400">
          Últimas ações realizadas no servidor
        </p>
      </div>
      <div className="divide-y divide-gray-800">
        {logs.map((log) => (
          <div key={log.id} className="p-6 hover:bg-gray-800/30">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(
                      log.type
                    )}`}
                  >
                    {log.action}
                  </span>
                  <span className="text-sm text-gray-400">{log.user}</span>
                </div>
                <p className="mt-2 text-sm text-gray-300">{log.details}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {log.timestamp.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-800 p-4">
        <button className="w-full rounded-lg bg-gray-800 py-2 text-sm text-gray-300 hover:bg-gray-700">
          Ver todos os logs
        </button>
      </div>
    </div>
  );
}