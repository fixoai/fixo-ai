function sendPrompt() {
  const prompt = document.getElementById("promptInput").value;
  if (!prompt) return;

  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML += <div class="user">You: ${prompt}</div>;
  document.getElementById("promptInput").value = "";

  messagesDiv.innerHTML += <div class="bot">FIXO AI: Thinking...</div>;

  fetch("https://fixo-backend-4xsngmi23-fixoaipros-projects.vercel.app/api/gpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  })
    .then((res) => res.json())
    .then((data) => {
      const reply = data.reply || "No reply.";
      messagesDiv.innerHTML += <div class="bot">FIXO AI: ${reply}</div>;
    })
    .catch((error) => {
      messagesDiv.innerHTML += <div class="bot">Error: ${error.message}</div>;
    });
}

// ✅ This is the KEY: wait until DOM is loaded, then add click listener
document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("sendButton");
  if (sendButton) {
    sendButton.addEventListener("click", sendPrompt);
  }
});
