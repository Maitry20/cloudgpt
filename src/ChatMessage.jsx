export default function ChatMessage({ text, sender }) {
  const isUser = sender === "user";

  return (
    <div className={`flex my-2 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl ${
          isUser ? "bg-blue-600" : "bg-gray-700"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
