import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";
import "../styles/bot.css";

export default function AgriBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: "user", text: input }]);

    const userMsg = input;
    setInput("");

    try {
      const res = await API.post("/bot", { message: userMsg });

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: res.data.reply }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Bot failed. Try again." }
      ]);
    }
  };

  return (
    <>
      <Navbar />

      <div className="chat-page">
        <h2>🤖 AgriCure Bot</h2>

        <div className="chat-window">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.sender}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask about tomato diseases..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}
