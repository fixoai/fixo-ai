async function sendPrompt() {
  const prompt = document.getElementById('userInput').value;
  const responseBox = document.getElementById('responseOutput');
  responseBox.innerText = "Processing...";

  const response = await fetch('https://fixo-backend.vercel.app/api/gpt', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  responseBox.innerText = data.result || "Something went wrong.";
}
