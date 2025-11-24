export async function sendMessageToBackend(message, sessionId) {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: message,
        userId: "maitry",
        sessionId: sessionId
      }),
    });

    const data = await res.json();
    return data.reply;

  } catch (err) {
    console.error("API error:", err);
    return "⚠️ Backend error. Please try again.";
  }
}
