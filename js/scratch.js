// Prize outcomes with weighted probabilities
const prizeOutcomes = [
  { prize: "🎉 $100,000", color: "#28a745", weight: 1 }, // Rare jackpot
  { prize: "✨ $10,000", color: "#ffc107", weight: 5 },  // Moderate win
  { prize: "💰 $1,000", color: "#007bff", weight: 20 }, // Small win
  { prize: "😞 Try Again", color: "#ff4444", weight: 74 }, // Most common
];

// Function to get a random prize based on weights
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

// Initialize scratch card functionality
function initializeScratchCard() {
  const overlays = document.querySelectorAll(".scratch-overlay");
  const coin = document.getElementById("coin");

  overlays.forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    const hiddenValue = canvas.previousElementSibling;

    // Set canvas dimensions to match the element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Fill canvas with gray (scratchable surface)
    ctx.fillStyle = "#bbb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Assign a random prize to the hidden value
    const randomPrize = getRandomPrize();
    hiddenValue.textContent = randomPrize.prize;
    hiddenValue.style.color = randomPrize.color;

    let scratchedArea = 0;
    const totalArea = canvas.width * canvas.height;

    // Scratch functionality
    canvas.addEventListener("mousemove", (e) => {
      if (e.buttons !== 1) return; // Only scratch when the mouse button is pressed

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2); // Circle-shaped scratch
      ctx.fill();

      // Calculate scratched area
      scratchedArea += Math.PI * 20 * 20;

      // Reveal the prize if 70% of the area is scratched
      if ((scratchedArea / totalArea) > 0.7) {
        canvas.style.pointerEvents = "none"; // Disable further scratching
        hiddenValue.style.display = "block"; // Show the hidden prize
      }
    });
  });

  // Coin follows the mouse cursor
  document.addEventListener("mousemove", (e) => {
    coin.style.display = "block";
    coin.style.left = `${e.pageX - 20}px`;
    coin.style.top = `${e.pageY - 20}px`;
  });
}

// Initialize the game when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", initializeScratchCard);
