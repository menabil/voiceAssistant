export default function QuickActions({ onQuickSelect }) {
  const actions = [
    { id: 1, title: "PC Status", icon: "📊", query: "System info" },
    { id: 2, title: "Open Chrome", icon: "🌐", query: "Open Chrome" },
    { id: 3, title: "Weather", icon: "🌤️", query: "Weather" },
    { id: 4, title: "Lock PC", icon: "🔒", query: "Lock PC" },
  ];

  return (
    <div className="w-full max-w-3xl mb-6">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">
        ⚡ Quick Actions
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onQuickSelect(action.query)}
            className="flex items-center space-x-3 p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 rounded-xl transition-all duration-300 text-left group shadow-md"
          >
            <span className="text-xl p-2 bg-slate-800/80 rounded-lg group-hover:scale-110 transition-transform">
              {action.icon}
            </span>
            <div>
              <h4 className="text-xs font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">
                {action.title}
              </h4>
              <p className="text-[10px] text-slate-500 truncate max-w-[90px]">
                {action.query}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
