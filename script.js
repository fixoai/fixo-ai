async function sendPrompt() {
  const prompt = document.getElementById("promptInput").value;
  if (!prompt) return;

  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML += <div class="user">You: ${prompt}</div>;
  document.getElementById("promptInput").value = "";

  messagesDiv.innerHTML += <div class="bot">FIXO AI: Thinking...</div>;

  try {
    const response = await fetch("https://fixo-backend-qj381emfb-fixoaipros-projects.vercel.app/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: prompt })
    });

    const data = await response.json();
    const reply = data.reply || "No reply.";
    messagesDiv.innerHTML += <div class="bot">FIXO AI: ${reply}</div>;
  } catch (error) {
    messagesDiv.innerHTML += <div class="bot">Error: ${error.message}</div>;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("sendButton").addEventListener("click", sendPrompt);
});
