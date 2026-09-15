import os from "os";
import path from "path";
import { exec } from "child_process";
import axios from "axios";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function handleCommand(userQuery, speakText, askOllama) {
  if (!userQuery || userQuery.trim() === "") return false;

  console.log(`\n💬 Input: "${userQuery}"`);
  const lowerQuery = userQuery.toLowerCase();

  // ১. স্লিপ কমান্ড (Friday বন্ধ করার জন্য)
  if (
    lowerQuery.includes("sleep") ||
    lowerQuery.includes("বন্ধ হও") ||
    lowerQuery.includes("shut down")
  ) {
    console.log("💤 Friday going to sleep...");
    await speakText("Biday boss! Ami ghumate jacchi.");

    setTimeout(() => {
      exec("pm2 stop Friday", { windowsHide: true }, () => {
        process.exit(0);
      });
    }, 1000);
    return true;
  }

  // ২. সিস্টেম কমান্ড: ক্রোম ওপেন করা
  else if (
    lowerQuery.includes("open chrome") ||
    lowerQuery.includes("ক্রোম খোলো") ||
    lowerQuery.includes("chrome") ||
    lowerQuery.includes("ক্রোম")
  ) {
    console.log("🌐 Action: Opening Google Chrome...");
    exec("start chrome", { windowsHide: true });
    await speakText("Chrome browser open kora hocche.");
    return true;
  }

  // ৩. VS Code ওপেন করা
  else if (
    lowerQuery.includes("open code") ||
    lowerQuery.includes("code") ||
    lowerQuery.includes("কোড এডিটর খোলো")
  ) {
    console.log("💻 Action: Opening VS Code...");
    exec("code", { windowsHide: true });
    await speakText("VS Code open kora hocche.");
    return true;
  }

  // ৪. YouTube ওপেন করা
  else if (
    lowerQuery.includes("open youtube") ||
    lowerQuery.includes("youtube") ||
    lowerQuery.includes("ইউটিউব খোলো")
  ) {
    console.log("🎥 Action: Opening YouTube...");
    exec("start https://www.youtube.com", { windowsHide: true });
    await speakText("YouTube open kora hocche.");
    return true;
  }

  // ৫. ক্যালকুলেটর ওপেন করা
  else if (
    lowerQuery.includes("open calculator") ||
    lowerQuery.includes("calculator") ||
    lowerQuery.includes("ক্যালকুলেটর খোলো")
  ) {
    console.log("🔢 Action: Opening Calculator...");
    exec("calc", { windowsHide: true });
    await speakText("Calculator open kora hocche.");
    return true;
  }

  // ৬. নোটপ্যাড ওপেন করা
  else if (
    lowerQuery.includes("open notepad") ||
    lowerQuery.includes("notepad") ||
    lowerQuery.includes("নোটপ্যাড খোলো")
  ) {
    console.log("📝 Action: Opening Notepad...");
    exec("notepad", { windowsHide: true });
    await speakText("Notepad open kora hocche.");
    return true;
  }

  // ৭. বর্তমান সময় বলা ("কয়টা বাজে?")
  else if (lowerQuery.includes("time") || lowerQuery.includes("সময় কত")) {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const speech = `Ekhon beja ba time hocche ${timeString}`;
    console.log(`🤖 AI: ${speech}`);
    await speakText(speech);
    return true;
  }

  // ৮. ফেইসবুক রিলস স্ক্রোল করার জন্য
  else if (
    lowerQuery.includes("next") ||
    lowerQuery.includes("পরেরটা") ||
    lowerQuery.includes("poreta") ||
    lowerQuery.includes("two")
  ) {
    console.log("📜 Action: Scrolling to next reel...");
    const vbsPath = path.join(__dirname, "scroll.vbs");
    exec(`cscript //nologo "${vbsPath}"`, { windowsHide: true });
    return true;
  }

  // 10. for pc lock
  else if (lowerQuery.includes("lock pc") || lowerQuery.includes("লক করো")) {
    console.log("🔒 Action: Locking PC...");
    exec("rundll32.exe user32.dll,LockWorkStation", { windowsHide: true });
    await speakText("PC lock kore deya hocche.");
    return true;
  }

  // 11. for pc shutdown
  else if (lowerQuery.includes("shutdown") || lowerQuery.includes("বন্ধ করো")) {
    console.log("⏻ Action: Shutting down PC...");
    await speakText("PC shutdown hobe. Bye boss!");
    exec("shutdown /s /t 5", { windowsHide: true });
    return true;
  }
  // 11.1. for pc restart
  else if (lowerQuery.includes("restart") || lowerQuery.includes("রিস্টার্ট")) {
    console.log("🔄 Action: Restarting PC...");
    await speakText("পিসি রিস্টার্ট হচ্ছে বস, একটু অপেক্ষা করুন!");
    exec("shutdown /r /t 5", { windowsHide: true });
    return true;
  }

  // 12. for open github
  else if (
    lowerQuery.includes("open github") ||
    lowerQuery.includes("গিটহাব")
  ) {
    console.log("🌐 Action: Opening GitHub...");
    exec("start https://github.com", { windowsHide: true });
    await speakText("GitHub open kora hocche.");
    return true;
  }

  // 13. for open chatgpt
  else if (
    lowerQuery.includes("open chatgpt") ||
    lowerQuery.includes("চ্যাটজিপিটি")
  ) {
    console.log("🌐 Action: Opening ChatGPT...");
    exec("start https://chatgpt.com", { windowsHide: true });
    await speakText("ChatGPT open kora hocche.");
    return true;
  }

  // 14. download folder open
  else if (
    lowerQuery.includes("downloads") ||
    lowerQuery.includes("ডাউনলোড ফোল্ডার")
  ) {
    console.log("📂 Action: Opening Downloads...");
    exec("start shell:Downloads", { windowsHide: true });
    await speakText("Downloads folder open kora hocche.");
    return true;
  }

  // 15. Weather api
  else if (lowerQuery.includes("weather") || lowerQuery.includes("আবহাওয়া")) {
    console.log("🌤️ Action: Fetching weather...");
    try {
      const res = await axios.get("https://wttr.in/Dhaka?format=%t+%condition");
      const weatherText = `Dhaka te ekhon temperature hocche ${res.data}`;
      console.log(`🤖 AI: ${weatherText}`);
      await speakText(weatherText);
    } catch (e) {
      await speakText("Weather info paoa jacche na.");
    }
    return true;
  }

  // 16. Note Down
  else if (
    lowerQuery.includes("note down") ||
    lowerQuery.includes("নোট রাখো")
  ) {
    console.log("📝 Action: Saving note...");
    await speakText("Apnar kotha note kore rakha hoiche.");
    return true;
  }

  // 17. play music from youtube
  else if (lowerQuery.includes("play") || lowerQuery.includes("গান চালাও")) {
    const searchQuery = lowerQuery.replace("play", "").trim();
    const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    exec(`start chrome "${ytUrl}"`, { windowsHide: true });
    await speakText("YouTube e search kora hocche.");
    return true;
  }

  // 18. pc Status (System Info)
  else if (
    lowerQuery.includes("system info") ||
    lowerQuery.includes("pc status") ||
    lowerQuery.includes("র‍্যাম কত") ||
    lowerQuery.includes("সিস্টেম ইনফো")
  ) {
    console.log("📊 Action: Checking System Status...");

    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    const totalGB = (totalMemory / (1024 * 1024 * 1024)).toFixed(1);
    const usedGB = (usedMemory / (1024 * 1024 * 1024)).toFixed(1);
    const freeGB = (freeMemory / (1024 * 1024 * 1024)).toFixed(1);

    const cpuCores = os.cpus().length;

    const statusMessage = `Boss, apnar pc te total ${totalGB} GB RAM er modhe ekhon ${usedGB} GB use hocche. Ebong free ache ${freeGB} GB. CPU core ache ${cpuCores} ti.`;

    console.log(`🤖 AI: ${statusMessage}`);
    await speakText(statusMessage);
    return true;
  }

  // ৯. ওয়েক-ওয়ার্ড: "Friday" বা সাধারণ প্রশ্ন থাকলে Ollama-কে জিজ্ঞাসা করা (এটি সবার শেষে রাখা হয়েছে)
  else if (
    lowerQuery.includes("friday") ||
    lowerQuery.includes("ফ্রাইডে") ||
    lowerQuery.includes("hey friday") ||
    lowerQuery.includes("fry") ||
    lowerQuery.length > 3
  ) {
    if (typeof askOllama === "function") {
      console.log("🤖 Thinking...");
      const aiResponse = await askOllama(userQuery);
      console.log(`🤖 AI: "${aiResponse}"`);

      console.log("🔊 Speaking...");
      await speakText(aiResponse);
      return true;
    }
  }

  // যদি কোনো কমান্ড ম্যাচ না করে
  return false;
}
