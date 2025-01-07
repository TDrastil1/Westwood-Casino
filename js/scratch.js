// Elements
const canvas = document.getElementById("scratch");
const context = canvas.getContext("2d");
const resultMessage = document.getElementById("resultMessage");
const coinButton = document.getElementById("coinButton");

// Initialize the scratch area
const init = () => {
  // Set a dark-themed scratch area background
  const gradientColor = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradientColor.addColorStop(0, "#333");
  gradientColor.addColorStop(1, "#444");
  context.fillStyle = gradientColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Randomize the outcome for the scratch card
  randomizeOutcome();
};

// Randomize the outcome
const randomizeOutcome = () => {
  const outcome = Math.random() < 0.05 ? "🎉 You Win $100!" : "😞 Try Again Next Time.";
  resultMessage.textContent = outcome;
  resultMessage.style.display = "none"; // Hide the result until the card is scratched
};

// Simulate scratching the card
const scratchOff = () => {
  context.globalCompositeOperation = "destination-out"; // Allow scratching effect

  let x = 0;
  let y = 0;
  const step = 10;

  // Animate the scratch-off process
  const interval = setInterval(() => {
    context.beginPath();
    context.arc(x, y, 20, 0, 2 * Math.PI); // Create circular "scratches"
    context.fill();

    x += step; // Move horizontally
    if (x > canvas.width) {
      x = 0; // Reset to the start of the next row
      y += step; // Move down vertically
    }

    // Check if the entire canvas has been scratched
    if (y > canvas.height) {
      clearInterval(interval);
      resultMessage.style.display = "block"; // Display the outcome
    }
  }, 10);
};

// Add event listener for the coin button
coinButton.addEventListener("click", scratchOff);

// Initialize the game when the page loads
window.onload = init;
