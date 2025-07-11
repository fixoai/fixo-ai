async function sendPrompt() {
  const prompt = document.getElementById("userInput").value;
  const responseBox = document.getElementById("responseOutput");
  responseBox.innerText = "Processing...";

  const response = await fetch("https://fixo-backend.vercel.app/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: prompt })
  });

  const data = await response.json();
  
  responseBox.innerText = data.choices?.[0]?.message?.content || "Something went wrong.";
}
