// House-tilted prize outcomes
const prizeOutcomes = [
  { prize: "🎉 $100,000", color: "#28a745", weight: 1 },
  { prize: "✨ $10,000", color: "#ffc107", weight: 5 },
  { prize: "💰 $1,000", color: "#007bff", weight: 20 },
  { prize: "😞 Try Again", color: "#ff4444", weight: 74 },
];

// Get a random prize based on weighted probabilities
function getRandomPrize() {
  const totalWeight = prizeOutcomes.reduce((sum, outcome) => sum + outcome.weight, 0);
  const randomWeight = Math.floor(Math.random() * totalWeight);

  let cumulativeWeight = 0;
  for (const outcome of prizeOutcomes) {
    cumulativeWeight += outcome.weight;
    if (randomWeight < cumulativeWeight) {
      return outcome;
    }
  }
}

// Initialize scratch card
function initializeScratchCard() {
  const overlays = document.querySelectorAll(".scratch-overlay");
  const coin = document.getElementById("coin");

  overlays.forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    const hiddenValue = canvas.previousElementSibling;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.fillStyle = "#bbb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Assign random prize
    const randomPrize = getRandomPrize();
    hiddenValue.textContent = randomPrize.prize;
    hiddenValue.style.color = randomPrize.color;

    let scratchedArea = 0;
    const totalArea = canvas.width * canvas.height;

    canvas.addEventListener("mousemove", (e) => {
      if (e.buttons !== 1) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();

      scratchedArea += Math.PI * 20 * 20;

      if ((scratchedArea / totalArea) > 0.7) {
        canvas.style.pointerEvents = "none";
        hiddenValue.style.display = "block";
      }
    });
  });

  // Coin follows mouse
  document.addEventListener("mousemove", (e) => {
    coin.style.display = "block";
    coin.style.left = `${e.pageX - 20}px`;
    coin.style.top = `${e.pageY - 20}px`;
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", initializeScratchCard);
