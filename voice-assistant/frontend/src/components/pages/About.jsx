export default function About() {
  return (
    <div className="w-full max-w-3xl flex flex-col items-center">
      <div className="w-full text-center py-6 px-4 mb-6 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">
          About FRIDAY AI
        </h2>
        <p className="text-slate-400 text-sm">
          A next-generation full-stack local voice assistant built for
          developers and power users.
        </p>
      </div>

      <div className="w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-lg space-y-6 text-slate-300 text-sm leading-relaxed">
        <div>
          <h3 className="text-base font-bold text-cyan-400 mb-2">
            🚀 Project Vision
          </h3>
          <p className="text-slate-400">
            FRIDAY is designed to run securely and privately on your local
            desktop machine. By combining local speech-to-text (Whisper.cpp) and
            large language models (Ollama/Gemma), it offers lightning-fast
            responses without relying entirely on external cloud APIs.
          </p>
        </div>

        <div className="border-t border-slate-800 pt-4">
          <h3 className="text-base font-bold text-cyan-400 mb-3">
            🛠️ Core Architecture Stack
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <li className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
              <strong className="text-blue-400">Frontend:</strong> React,
              Tailwind CSS, Vite, Axios & React Router
            </li>
            <li className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
              <strong className="text-blue-400">Backend:</strong> Node.js,
              Express.js & CORS
            </li>
            <li className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
              <strong className="text-blue-400">AI / Speech:</strong>{" "}
              Whisper.cpp, Ollama (Gemma) & Microsoft Edge TTS
            </li>
            <li className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
              <strong className="text-blue-400">Environment:</strong> Local
              Windows Desktop (Offline-first approach)
            </li>
          </ul>
        </div>

        <div className="border-t border-slate-800 pt-4 text-center">
          <p className="text-xs text-slate-500">
            Designed & Developed with ❤️ as a modular full-stack application.
          </p>
        </div>
      </div>
    </div>
  );
}
