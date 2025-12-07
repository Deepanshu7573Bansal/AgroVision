import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Load remedies.json
const remediesPath = path.join(process.cwd(), "remedies.json");
const remedies = JSON.parse(fs.readFileSync(remediesPath, "utf-8"));

// Load instructions.json
const instructionsPath = path.join(process.cwd(), "chatbot/instructions.json");
const systemPrompt = JSON.parse(fs.readFileSync(instructionsPath, "utf-8"))
  .instructions
  .join("\n");

export const chatWithBot = async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ message: "Message is required" });
    }

    // ✅ Correct model name for v1 API
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const finalPrompt = `
${systemPrompt}

### Remedies ###
${JSON.stringify(remedies)}

### User Message ###
${userMessage}

Give a clear, polite, helpful answer for farmers.
    `;

    const response = await model.generateContent(finalPrompt);
    const output = response.response.text();

    res.json({ reply: output });

  } catch (error) {
    console.error("CHATBOT ERROR:", error);
    res.status(500).json({ message: "Chatbot failed" });
  }
};
