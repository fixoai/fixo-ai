// Firebase setup (already initialized via firebase-config.js)
const input = document.getElementById("promptInput");
const messagesDiv = document.getElementById("messages");

async function sendPrompt() {
  const prompt = input.value.trim();
  if (!prompt) return;

  // Show user prompt
  messagesDiv.innerHTML += <div class="user">You: ${prompt}</div>;
  input.value = "";

  // Show thinking message
  messagesDiv.innerHTML += <div class="bot">FIXO AI: Thinking...</div>;

  try {
    const response = await fetch("https://fixo-backend.vercel.app/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    const reply = data.reply || "No reply received.";

    messagesDiv.innerHTML += <div class="bot">FIXO AI: ${reply}</div>;

    // Save to Firebase
    const timestamp = new Date().toISOString();
    firebase.database().ref("fixo_prompts").push({
      prompt,
      reply,
      time: timestamp
    });

  } catch (err) {
    messagesDiv.innerHTML += <div class="bot">❌ Error: ${err.message}</div>;
  }
}
