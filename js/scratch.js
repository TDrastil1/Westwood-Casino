// Array of possible prizes with weighted probabilities
const prizeOutcomes = [
  { prize: "🎉 $100,000", color: "#28a745", weight: 5 },
  { prize: "✨ $10,000", color: "#ffc107", weight: 15 },
  { prize: "💰 $1,000", color: "#007bff", weight: 30 },
  { prize: "😞 Try Again", color: "#ff4444", weight: 50 },
];

// Function to generate a random prize based on weighted probabilities
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

// Function to initialize scratchable areas
function initializeScratchAreas() {
  const scratchableElements = document.querySelectorAll(".scratch-overlay");

  scratchableElements.forEach((overlay, index) => {
    const canvas = overlay;
    const ctx = canvas.getContext("2d");
    const hiddenValue = canvas.previousElementSibling;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Fill canvas with scratchable color
    ctx.fillStyle = "#bbb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set random prize
    const randomPrize = getRandomPrize();
    hiddenValue.textContent = randomPrize.prize;
    hiddenValue.style.color = randomPrize.color;

    // Scratch effect variables
    let scratchedArea = 0;
    const totalArea = canvas.width * canvas.height;

    // Scratch functionality
    canvas.addEventListener("mousemove", (e) => {
      if (e.buttons !== 1) return; // Scratch only when the mouse button is pressed

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();

      // Calculate scratched area
      scratchedArea += Math.PI * 20 * 20;

      // Reveal prize if 70% is scratched
      if ((scratchedArea / totalArea) > 0.7) {
        canvas.style.pointerEvents = "none"; // Disable further scratching
        hiddenValue.style.display = "block"; // Show the prize
      }
    });
  });
}

// Initialize scratch card functionality when the page loads
document.addEventListener("DOMContentLoaded", initializeScratchAreas);
