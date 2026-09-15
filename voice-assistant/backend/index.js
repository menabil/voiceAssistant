// pm2 logs Friday
// pm2 restart Friday

process.removeAllListeners("warning"); // সমস্ত ওয়ার্নিং হাইড করার জন্য
import readline from "readline";
// import { exec } from "child_process";
import { exec, spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import { EdgeTTS } from "node-edge-tts";
import soundPlay from "sound-play";
import { handleCommand } from "./userCommand.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIC_NAME = "Microphone (4- USB Audio Device)";

const audioFile = path.join(__dirname, "my_audio.wav");

// Whisper-এর পাথে ../../ (দুটি ডট-স্ল্যাশ) দিন
const whisperPath = path.join(
  __dirname,
  "../../whisper/build/bin/Release/whisper-cli.exe",
);

// Model-এর পাথেও ../../ (দুটি ডট-স্ল্যাশ) দিন
const modelPath = path.join(__dirname, "../../whisper/models/ggml-tiny.bin");

// ১. রেকর্ড করার ফাংশন (আপনার স্ট্রাকচার)
function recordAudio() {
  return new Promise((resolve) => {
    // -t 6: ৩ সেকেন্ডের জায়গায় ৬ সেকেন্ড দিলাম।
    // এতে আপনি একটু বড় বাক্য বলার সময় পাবেন।
    const cmd = `ffmpeg -y -f dshow -i audio="${MIC_NAME}" -t 7 -ar 16000 -ac 1 -af "highpass=f=200, lowpass=f=3000" -c:a pcm_s16le "${audioFile}" -loglevel quiet`;

    exec(cmd, { windowsHide: true }, (error) => {
      // reject(error) বাদ দিয়েছি। কারণ অনেক সময় উইন্ডোজে মাইক রিলিজ হতে
      // ছোটখাটো ওয়ার্নিং দেয়, যার ফলে কোড আটকে যেত।
      // এখন ৬ সেকেন্ড পর যাই হোক না কেন, ফ্রাইডে কাজ শুরু করে দেবে।
      resolve();
    });
  });
}

// ২. Whisper দিয়ে বাংলায় ট্রান্সক্রাইব করা
function transcribeAudio() {
  return new Promise((resolve, reject) => {
    const command = `"${whisperPath}" -m "${modelPath}" -f "${audioFile}" -l bn -nt -np`;

    exec(command, { windowsHide: true }, (error, stdout) => {
      if (error) return reject(error);
      resolve(stdout.trim());
    });
  });
}

// ৩. Ollama দিয়ে বাংলায় (বাংলা হরফে) উত্তর নেওয়া
async function askOllama(prompt) {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3.2:1b",
      prompt: `System: You are Friday, a smart, friendly male AI voice assistant. Always reply in fluent, natural Bengali script (বাংলা হরফে, যেমন: "আমি ভালো আছি, বলুন বস।"). Never use Roman Bengali/Banglish. Keep your answers short and punchy (1-2 sentences). User says: ${prompt}`,
      stream: false,
    });
    return response.data.response;
  } catch (error) {
    console.error("Ollama Error:", error.message);
    return "দুঃখিত, এই মুহূর্তে আমি বুঝতে পারছি না।";
  }
}

// ৪. Microsoft Edge TTS দিয়ে কথা বলা
async function speakText(text) {
  if (!text || text.trim() === "") return;

  try {
    const filePath = path.join(__dirname, "temp_edge_audio.mp3");

    const tts = new EdgeTTS({
      voice: "bn-BD-PradeepNeural",
      lang: "bn-BD",
      outputFormat: "audio-24khz-96kbitrate-mono-mp3",
    });

    await tts.ttsPromise(text, filePath);

    // ffplay ব্যবহার করে অডিও প্লে করা হচ্ছে
    // এটি অডিওর একদম শেষ সেকেন্ড পর্যন্ত অপেক্ষা করবে এবং কোনো cmd উইন্ডো ওপেন করবে না
    await new Promise((resolve) => {
      const playCmd = `ffplay -autoexit -nodisp -loglevel quiet "${filePath}"`;

      exec(playCmd, { windowsHide: true }, () => {
        resolve(); // অডিও পুরোপুরি শেষ হলে তবেই সে পরের কাজে যাবে
      });
    });
  } catch (error) {
    console.error("Edge TTS Error:", error.message);
  }
}

// ৫. টার্মিনাল থেকে টেক্সট ইনপুট নেওয়ার সেটাপ (Readline)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptTextUser() {
  rl.question("\n⌨️ Type command (or speak): ", async (input) => {
    if (input.trim() !== "") {
      await handleCommand(input, speakText, askOllama);
    }
    promptTextUser();
  });
}

// ৬. মূল ভয়েস লুপ
async function startVoiceLoop() {
  while (true) {
    try {
      await recordAudio();
      const userQuery = await transcribeAudio();

      const lowerQuery = userQuery ? userQuery.toLowerCase() : "";

      if (
        userQuery &&
        userQuery.trim() !== "" &&
        // নিচের ফালতু বা হ্যালুসিনেশন শব্দগুলো ফিল্টার করে বাদ দেওয়া হলো
        !lowerQuery.includes("thank you") &&
        !lowerQuery.includes("thanks") &&
        !lowerQuery.includes("thank") &&
        !lowerQuery.includes("[blank_audio]") &&
        !lowerQuery.includes("[silence]") &&
        !lowerQuery.includes("[music]") &&
        !userQuery.startsWith("(") &&
        !userQuery.startsWith("[") &&
        userQuery.length > 3 // ৩ অক্ষরের ছোট ফালতু সাউন্ড ইগনোর করবে
      ) {
        await handleCommand(userQuery, speakText, askOllama);
      }
    } catch (err) {
      console.error("Voice Error:", err.message);
    }
  }
}

console.log("=== FRIDAY Assistant (Edge TTS Male Voice Activated) ===");
startVoiceLoop();
promptTextUser();
