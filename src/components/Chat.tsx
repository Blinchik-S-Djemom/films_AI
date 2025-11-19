import React, { useState } from "react";
import axios from "axios";
import "./Chat.css";

interface Message {
  text: string;
  isUser: boolean;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }],
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiMessage = response.data.choices[0].message.content;
      setMessages((prev) => [...prev, { text: aiMessage, isUser: false }]);
    } catch (error) {
      console.error("Ошибка запроса:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Ошибка соединения с нейросетью",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.isUser ? "user-message" : "ai-message"}`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message ai-message">Думаю...</div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Введите ваш вопрос..."
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default Chat;
