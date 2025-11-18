export function DashboardStats() {
  const stats = [
    {
      label: "Status do BOT",
      value: "Online",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      label: "Uso da Licença",
      value: "15/30 dias",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      label: "Membros Online",
      value: "245",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      label: "Uptime",
      value: "99.8%",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all hover:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold text-gray-200">{stat.value}</p>
            </div>
            <div className={`rounded-lg ${stat.bgColor} p-3`}>
              <div className={stat.color}>{stat.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

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
          <div key={log.id} className="p-6 transition-colors hover:bg-gray-800/30">
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
        <button className="w-full rounded-lg bg-gray-800 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-700">
          Ver todos os logs
        </button>
      </div>
    </div>
  );
}

// components/dashboard/DashboardAlerts.tsx
export function DashboardAlerts() {
  const alerts = [
    {
      id: "1",
      type: "warning",
      message: "Sua licença expira em 15 dias",
      action: "Renovar agora",
      actionUrl: "/dashboard/licenses",
    },
    {
      id: "2",
      type: "info",
      message: "Nova atualização disponível para o BOT",
      action: "Ver detalhes",
      actionUrl: "#",
    },
  ];

  if (alerts.length === 0) return null;

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "warning":
        return {
          border: "border-yellow-500/20",
          bg: "bg-yellow-500/10",
          iconColor: "text-yellow-400",
          textColor: "text-yellow-200",
          buttonBg: "bg-yellow-500 hover:bg-yellow-400",
        };
      case "error":
        return {
          border: "border-red-500/20",
          bg: "bg-red-500/10",
          iconColor: "text-red-400",
          textColor: "text-red-200",
          buttonBg: "bg-red-500 hover:bg-red-400",
        };
      case "info":
        return {
          border: "border-blue-500/20",
          bg: "bg-blue-500/10",
          iconColor: "text-blue-400",
          textColor: "text-blue-200",
          buttonBg: "bg-blue-500 hover:bg-blue-400",
        };
      default:
        return {
          border: "border-gray-500/20",
          bg: "bg-gray-500/10",
          iconColor: "text-gray-400",
          textColor: "text-gray-200",
          buttonBg: "bg-gray-500 hover:bg-gray-400",
        };
    }
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => {
        const styles = getAlertStyles(alert.type);
        return (
          <div
            key={alert.id}
            className={`flex items-center justify-between rounded-lg border ${styles.border} ${styles.bg} p-4`}
          >
            <div className="flex items-center gap-3">
              <svg
                className={`h-5 w-5 ${styles.iconColor}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className={`text-sm font-medium ${styles.textColor}`}>
                {alert.message}
              </p>
            </div>
            <a
              href={alert.actionUrl}
              className={`rounded-lg ${styles.buttonBg} px-4 py-2 text-sm font-medium text-white transition-colors`}
            >
              {alert.action}
            </a>
          </div>
        );
      })}
    </div>
  );
}