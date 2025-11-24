import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { sendMessageToBackend } from "./api";
import cloudBg from "./assets/cloud-bg.png";

export default function App() {
  const [sessionId] = useState(uuidv4());
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chat]);

  const send = async () => {
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    setChat((prev) => [...prev, userMsg]);

    setMessage("");

    const loadingMsg = { sender: "assistant", text: "☁️ Thinking…" };
    setChat((prev) => [...prev, loadingMsg]);

    const reply = await sendMessageToBackend(message, sessionId);

    setChat((prev) => [
      ...prev.slice(0, -1),
      { sender: "assistant", text: reply }
    ]);
  };

  return (
    <div
      className="h-screen flex flex-col cloud-bg"
      style={{ backgroundImage: `url(${cloudBg})` }}
    >
      <h1 className="text-3xl font-bold p-4">Ask The Cloud</h1>

      <div className="flex-1 overflow-y-auto p-4">
        {chat.map((m, i) => (
          <ChatMessage key={i} {...m} />
        ))}
        <div ref={chatEndRef} />
      </div>

      <ChatInput message={message} setMessage={setMessage} send={send} />
    </div>
  );
}
