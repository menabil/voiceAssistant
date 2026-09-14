import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ফাস্ট ভয়েস TTS ফাংশন (নিরাপদ স্ট্রিং হ্যান্ডলিং সহ)
function speakText(text) {
  return new Promise((resolve) => {
    if (!text || text.trim() === "") return resolve();
    
    // সিঙ্গেল এবং ডাবল কোট সম্পূর্ণ নিরাপদ করা
    const safeText = text.replace(/'/g, "''").replace(/"/g, '""');
    
    // PowerShell কমান্ড আরও নিখুঁত ও নিরাপদ করা হলো
    const psCommand = `Add-Type -AssemblyName System.Speech; $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer; $synth.Speak('${safeText}')`;

    exec(
      `powershell -NoProfile -NonInteractive -WindowStyle Hidden -Command "${psCommand}"`,
      { windowsHide: true },
      (error) => {
        if (error) {
          console.error("TTS Error:", error.message);
        }
        resolve();
      }
    );
  });
}

async function runStartupTasks() {
  console.log("=== FRIDAY Startup Routine Initiated ===");

  // ১. কাস্টম নরমাল গ্রিটিংস
  const greeting = "Welcome back boss! All systems are ready for you.";
  console.log(`🤖 AI: "${greeting}"`);

  // গ্রিটিংস বলা শুরু করার সাথেই ব্যাকগ্রাউন্ডে ক্রোম ওপেনিং প্রসেসগুলো চালানো
  const speakPromise = speakText(greeting);

  console.log("🌐 Action: Opening Chrome profiles...");
  const chromePath = `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"`;

  // ৩টি প্রফাইল একসাথে এবং অল্প ডিলেতে (১ সেকেন্ড) সেট করা হলো
  const p1 = `${chromePath} --profile-directory="Profile 4" "https://www.facebook.com"`;
  const p2 = `${chromePath} --profile-directory="Profile 16" "https://www.facebook.com" "https://www.youtube.com" "https://web.whatsapp.com"`;
  const p3 = `${chromePath} --profile-directory="Profile 3" "https://github.com/menabil"`;

  exec(p1, { windowsHide: true });
  await new Promise((resolve) => setTimeout(resolve, 1000));

  exec(p2, { windowsHide: true });
  await new Promise((resolve) => setTimeout(resolve, 1000));

  exec(p3, { windowsHide: true });

  // ভয়েস বলা শেষ হওয়া পর্যন্ত অপেক্ষা করা
  await speakPromise;
  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log("=== Startup Routine Completed ===");
  process.exit(0);
}

runStartupTasks();