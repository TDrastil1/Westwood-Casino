const prize = document.getElementById("prize");
const scratchOverlay = document.getElementById("scratchOverlay");
const coin = document.getElementById("coin");

// Randomize the outcome (90% lose, 10% win)
const outcome = Math.random() < 0.1 ? "win" : "lose";
prize.textContent = outcome === "win" ? "🎉 You Win 100 ς! 🎉" : "😞 Try Again!";

// Scratch effect animation
coin.addEventListener("click", () => {
  const scratchAnimation = setInterval(() => {
    const rect = scratchOverlay.getBoundingClientRect();
    const randomX = Math.random() * rect.width;
    const randomY = Math.random() * rect.height;

    const ctx = scratchOverlay.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(randomX, randomY, 20, 0, Math.PI * 2);
    ctx.fill();
  }, 50);

  setTimeout(() => {
    clearInterval(scratchAnimation);
    scratchOverlay.style.display = "none";
    prize.style.color = outcome === "win" ? "#ffd700" : "#ff4444";
  }, 2000); // Scratch animation duration
});

// Initialize canvas for scratch overlay
function initScratchOverlay() {
  const canvas = document.createElement("canvas");
  canvas.width = scratchOverlay.offsetWidth;
  canvas.height = scratchOverlay.offsetHeight;
  scratchOverlay.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#aaa";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

initScratchOverlay();
