export default function Banner() {
  return (
    <div className="w-full text-center py-8 px-4 mb-6 bg-gradient-to-r from-blue-900/40 via-slate-900/60 to-cyan-900/40 border border-slate-800/80 rounded-2xl backdrop-blur-md shadow-xl">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 tracking-tight mb-3">
        Meet FRIDAY AI
      </h1>
      <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
        Your intelligent local desktop assistant powered by Whisper, Ollama, and
        Edge TTS. Speak or type to control your system effortlessly.
      </p>
    </div>
  );
}
