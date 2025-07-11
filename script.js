
async function sendPrompt() {
  const prompt = document.getElementById("promptInput").value;
  if (!prompt) return;

  document.getElementById("messages").innerHTML += `<div class="user">You: ${prompt}</div>`;
  document.getElementById("promptInput").value = "";
  document.getElementById("messages").innerHTML += `<div class="bot">FIXO AI: Thinking...</div>`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer YOUR_API_KEY_HERE`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No reply.";
    document.getElementById("messages").innerHTML += `<div class="bot">FIXO AI: ${reply}</div>`;

    const timestamp = new Date().toISOString();
    database.ref("fixo_prompts").push({ prompt, reply, time: timestamp });
  } catch (err) {
    document.getElementById("messages").innerHTML += `<div class="bot">Error: ${err.message}</div>`;
  }
}
