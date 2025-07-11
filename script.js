// Firebase config (already initialized in firebase-config.js)
// So no need to repeat here

async function sendPrompt() {
  const prompt = document.getElementById("promptInput").value;
  if (!prompt) return;

  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML += <div class="user">You: ${prompt}</div>;
  document.getElementById("promptInput").value = "";

  messagesDiv.innerHTML += <div class="bot">FIXO AI: Thinking...</div>;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    let reply = "No reply.";
    if (data.choices && data.choices.length > 0) {
      reply = data.choices[0].message.content.trim();
    }

    messagesDiv.innerHTML += <div class="bot">FIXO AI: ${reply}</div>;

    // Optional: Save to Firebase if initialized
    if (typeof database !== "undefined") {
      const timestamp = new Date().toISOString();
      database.ref("fixo_prompts").push({ prompt, reply, time: timestamp });
    }

  } catch (err) {
    messagesDiv.innerHTML += <div class="bot">Error: ${err.message}</div>;
  }
}
