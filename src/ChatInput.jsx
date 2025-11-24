export default function ChatInput({ message, setMessage, send }) {
  return (
    <div className="flex gap-2 p-4 bg-gray-800">
      <input
        type="text"
        className="flex-1 p-3 rounded-xl bg-gray-700 text-white outline-none"
        placeholder="Type your query here…"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <button
        className="px-4 py-3 bg-blue-600 rounded-xl"
        onClick={send}
      >
        Send
      </button>
    </div>
  );
}
