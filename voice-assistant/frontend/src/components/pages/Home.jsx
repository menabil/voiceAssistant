import { useState } from "react";
import axios from "axios";
import Banner from "./Banner";
import QuickActions from "./QuickActions";
import ChatSection from "./ChatSection";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      sender: "Friday",
      text: "Hello Boss! Friday is online. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const executeCommand = async (cmdText) => {
    if (!cmdText.trim()) return;

    // ইউজারের মেসেজ UI-তে যোগ করা
    setMessages((prev) => [...prev, { sender: "You", text: cmdText }]);
    const currentInput = cmdText;
    setInput("");

    try {
      // ব্যাকএন্ডে রিকোয়েস্ট পাঠানো
      const res = await axios.post("http://localhost:5000/api/command", {
        command: currentInput,
      });

      // ব্যাকএন্ড থেকে রেসপন্স আসলে চ্যাটে দেখানো
      setMessages((prev) => [
        ...prev,
        {
          sender: "Friday",
          text: res.data.response || "Command executed successfully.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "Friday",
          text: "Error: Could not connect to Friday backend server.",
        },
      ]);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Banner />
      <QuickActions onQuickSelect={(query) => executeCommand(query)} />
      <ChatSection
        messages={messages}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        isListening={isListening}
        setIsListening={setIsListening}
      />
    </div>
  );
}
