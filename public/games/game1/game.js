const backendURL = "https://gaming-platform-8m93.onrender.com";
const playerCode = localStorage.getItem("playerCode");

document.getElementById("playBtn").addEventListener("click", async () => {
  const betAmount = 10; // example
  const result = Math.random() > 0.5 ? "win" : "lose";

  try {
    const res = await fetch(backendURL + "/api/game/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerCode, game: "Game1", betAmount, result })
    });
    const data = await res.json();
    alert(`You ${result}! New Balance: $${data.balance}`);
  } catch (err) {
    console.error("Game API error:", err);
  }
});
