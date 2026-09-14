export default function Services() {
  const servicesList = [
    {
      id: 1,
      name: "Whisper.cpp (STT)",
      status: "Active (Local)",
      desc: "Speech-to-text offline audio processing engine.",
      icon: "🎙️",
      color: "text-emerald-400",
    },
    {
      id: 2,
      name: "Ollama (Gemma 4)",
      status: "Online (Localhost:11434)",
      desc: "Local LLM brain for generating smart AI responses.",
      icon: "🧠",
      color: "text-blue-400",
    },
    {
      id: 3,
      name: "Microsoft Edge TTS",
      status: "Connected (Cloud)",
      desc: "Neural text-to-speech engine for natural male voice.",
      icon: "🔊",
      color: "text-cyan-400",
    },
    {
      id: 4,
      name: "Express API Server",
      status: "Running (Port 5000)",
      desc: "Web bridge connecting frontend UI to local backend.",
      icon: "🌐",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="w-full max-w-3xl flex flex-col items-center">
      <div className="w-full text-center py-6 px-4 mb-6 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">
          System Services & Status
        </h2>
        <p className="text-slate-400 text-sm">
          Overview of all local and cloud modules powering your FRIDAY AI
          assistant.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {servicesList.map((service) => (
          <div
            key={service.id}
            className="p-5 bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-slate-700 rounded-2xl shadow-lg flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl p-2 bg-slate-800/80 rounded-xl">
                  {service.icon}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 ${service.color}`}
                >
                  {service.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-200 mb-1">
                {service.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
