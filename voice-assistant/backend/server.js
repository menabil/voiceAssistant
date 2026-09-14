import express from "express";
import cors from "cors";
import { handleCommand } from "./userCommand.js";

const app = express();
app.use(cors());
app.use(express.json());

// ফ্রন্টএন্ড থেকে কমান্ড রিসিভ করার এন্ডপয়েন্ট
app.post("/api/command", async (req, res) => {
  const { command } = req.body;
  if (!command) return res.status(400).json({ error: "Command is required" });

  console.log(`🌐 Web Input Received: "${command}"`);

  try {
    // এখানে আপনার ব্যাকএন্ডের মূল হ্যান্ডলার কল হবে
    // (যেমন: handleCommand, অথবা সরাসরি askOllama ও speakText)
    // উদাহরণস্বরূপ:
    // await handleCommand(command, speakText, askOllama);

    res.json({ success: true, response: `Executed: ${command}` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => {
  console.log("🚀 Friday Web Server running on http://localhost:5000");
});
