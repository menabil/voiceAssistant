import { useEffect } from "react";

export default function ChatSection({
  messages,
  input,
  setInput,
  handleSend,
  isListening,
  setIsListening,
}) {
  // ব্রাউজার ভয়েস রিকগনিশন হ্যান্ডেল করার লজিক
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "bn-BD"; // বাংলা বা ইংরেজির জন্য 'en-US' দিতে পারেন
    recognition.continuous = false;
    recognition.interimResults = false;

    if (isListening) {
      recognition.start();

      recognition.onresult = (event) => {
        const speechText = event.results[0][0].transcript;
        setInput(speechText);
        setIsListening(false);
        // চাইলে কথা শেষ হওয়ার সাথে সাথে অটো সেন্ড করতে পারেন:
        // handleSend(speechText);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      try {
        recognition.stop();
      } catch (e) {
        console.log(e);
      }
    };
  }, [isListening]);

  return (
    <div className="w-full max-w-3xl flex flex-col h-[45vh] bg-slate-900/55 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden">
      {/* চ্যাট হিস্ট্রি */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "You"
                  ? "bg-blue-600 text-white rounded-br-none shadow-lg shadow-blue-600/20"
                  : "bg-slate-800 text-slate-200 border border-slate-700/50 rounded-bl-none shadow-md"
              }`}
            >
              <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1 font-semibold">
                {msg.sender}
              </p>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* ভয়েস ওয়েভ অ্যানিমেশন */}
      {isListening && (
        <div className="flex items-center justify-center space-x-1.5 py-2 bg-slate-950/40 border-t border-slate-800/50">
          <span className="w-1.5 h-4 bg-cyan-400 rounded-full animate-bounce"></span>
          <span className="w-1.5 h-6 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-1.5 h-8 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
          <span className="w-1.5 h-6 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.6s]"></span>
          <span className="w-1.5 h-4 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.8s]"></span>
          <span className="text-xs text-cyan-400 ml-2 font-medium">
            Listening to your voice...
          </span>
        </div>
      )}

      {/* ইনপুট ও কন্ট্রোল বার */}
      <form
        onSubmit={handleSend}
        className="p-4 bg-slate-900/80 border-t border-slate-800 flex items-center gap-3"
      >
        <button
          type="button"
          onClick={() => setIsListening(!isListening)}
          className={`p-3 rounded-xl transition-all duration-300 ${
            isListening
              ? "bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
          }`}
          title="Voice Command"
        >
          🎤
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command or speak to Friday..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-opacity"
        >
          Send
        </button>
      </form>
    </div>
  );
}
