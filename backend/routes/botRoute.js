import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const router = express.Router();

// Path fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load remedies.json
const remediesPath = path.join(__dirname, "..", "remedies.json");
const remedies = JSON.parse(fs.readFileSync(remediesPath, "utf-8"));

// Initialize Gemini (v1 API)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) return res.status(400).json({ reply: "Message is required" });

    // Correct model name + correct API format (v1)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are AgriCure Bot 🌱.
Help farmers diagnose tomato plant diseases.

Use these remedies:
${JSON.stringify(remedies)}

User Question: ${message}

Reply in simple, direct farming language.
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });

  } catch (err) {
    console.error("BOT ERROR:", err);
    res.status(500).json({ reply: "Bot failed, try again later." });
  }
});

export default router;
