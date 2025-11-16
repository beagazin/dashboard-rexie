export default function DashboardStats() {
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
          className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm"
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

