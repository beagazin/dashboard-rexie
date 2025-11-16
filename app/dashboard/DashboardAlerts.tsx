export function DashboardAlerts() {
  const alerts = [
    {
      id: "1",
      type: "warning",
      message: "Sua licença expira em 15 dias",
      action: "Renovar agora",
    },
  ];

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="flex items-center justify-between rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4"
        >
          <div className="flex items-center gap-3">
            <svg
              className="h-5 w-5 text-yellow-400"
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
            <p className="text-sm font-medium text-yellow-200">{alert.message}</p>
          </div>
          <button className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-400">
            {alert.action}
          </button>
        </div>
      ))}
    </div>
  );
}