import { spawn } from "child_process";

// আপনার টার্মিনাল থেকে পাওয়া মাইক্রোফোনের হুবহু নাম
const micName = "Microphone (4- USB Audio Device)";

console.log("Recording started for 5 seconds... Speak something!");

const ffmpeg = spawn("ffmpeg", [
  "-f",
  "dshow",
  "-i",
  `audio=${micName}`,
  "-t",
  "5",
  "test_audio.wav",
  "-y",
]);

ffmpeg.on("close", (code) => {
  if (code === 0) {
    console.log(
      "✅ Recording finished! Play 'test_audio.wav' to check your voice.",
    );
  } else {
    console.log("❌ Error recording audio. Exit code:", code);
  }
});
