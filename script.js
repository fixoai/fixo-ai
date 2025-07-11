const OPENAI_API_KEY = "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";

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
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
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