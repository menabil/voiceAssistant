import React, { useState } from "react";

export default function Settings() {
  const [voiceSpeed, setVoiceSpeed] = useState("Normal");
  const [aiModel, setAiModel] = useState("gemma4:latest");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="w-full max-w-3xl flex flex-col items-center">
      <div className="w-full text-center py-6 px-4 mb-6 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">
          Assistant Settings
        </h2>
        <p className="text-slate-400 text-sm">
          Customize your FRIDAY AI voice, local LLM model, and system
          preferences.
        </p>
      </div>

      <div className="w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-lg space-y-6">
        {/* এআই মডেল সিলেকশন */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-200">
              Ollama AI Model
            </h3>
            <p className="text-xs text-slate-400">
              Select the local LLM brain model for responses.
            </p>
          </div>
          <select
            value={aiModel}
            onChange={(e) => setAiModel(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-cyan-500"
          >
            <option value="gemma4:latest">Gemma 4 (Default)</option>
            <option value="llama3:latest">Llama 3</option>
            <option value="mistral:latest">Mistral</option>
          </select>
        </div>

        {/* ভয়েস স্পিড */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-200">
              Edge TTS Voice Speed
            </h3>
            <p className="text-xs text-slate-400">
              Adjust how fast Friday speaks the response.
            </p>
          </div>
          <select
            value={voiceSpeed}
            onChange={(e) => setVoiceSpeed(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-cyan-500"
          >
            <option value="Slow">Slow</option>
            <option value="Normal">Normal</option>
            <option value="Fast">Fast</option>
          </select>
        </div>

        {/* সাউন্ড ও নোটিফিকেশন টগল */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200">
              System Notifications
            </h3>
            <p className="text-xs text-slate-400">
              Enable audio/visual prompts on execution.
            </p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${notifications ? "bg-cyan-500" : "bg-slate-800"}`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${notifications ? "translate-x-6" : "translate-x-0"}`}
            ></div>
          </button>
        </div>
      </div>
    </div>
  );
}
