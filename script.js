async function sendPrompt() {
  const prompt = document.getElementById("promptInput").value;
  if (!prompt) return;

  document.getElementById("messages").innerHTML += `<div class="user">You: ${prompt}</div>`;
  document.getElementById("promptInput").value = "";
  document.getElementById("messages").innerHTML += `<div class="bot">FIXO AI: Thinking...</div>`;

  try {
    const response = await fetch("https://fixo-backend.vercel.app/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    const reply = data.reply || "No reply.";
    document.getElementById("messages").innerHTML += `<div class="bot">FIXO AI: ${reply}</div>`;
  } catch (error) {
    document.getElementById("messages").innerHTML += `<div class="bot">Error: ${error.message}</div>`;
  }
}