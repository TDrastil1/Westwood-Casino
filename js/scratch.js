// Elements
const canvas = document.getElementById("scratch");
const context = canvas.getContext("2d");
const resultMessage = document.getElementById("resultMessage");
const coinButton = document.getElementById("coinButton");

// Initialize the scratch area
const init = () => {
  // Set the scratch area background
  const gradientColor = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradientColor.addColorStop(0, "#333");
  gradientColor.addColorStop(1, "#444");
  context.fillStyle = gradientColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Randomize the result under the scratch area
  randomizeScratchResult();
};

// Randomize what is under the scratch area
const randomizeScratchResult = () => {
  const outcome = Math.random() < 0.05 ? "🎉 You Win $100!" : "😞 Try Again Next Time.";
  resultMessage.textContent = outcome;
  resultMessage.style.color = outcome.includes("Win") ? "#28a745" : "#ff4444"; // Green for win, red for lose
  resultMessage.style.display = "none"; // Initially hidden until scratched
};

// Scratch functionality
const scratch = (x, y) => {
  context.globalCompositeOperation = "destination-out"; // Allow scratching effect
  context.beginPath();
  context.arc(x, y, 20, 0, 2 * Math.PI); // Create circular "scratches"
  context.fill();

  // Check if enough area has been scratched to reveal the result
  checkScratchCompletion();
};

// Get the mouse or touch position on the canvas
const getXY = (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = (e.pageX || e.touches[0].pageX) - rect.left;
  const y = (e.pageY || e.touches[0].pageY) - rect.top;
  return { x, y };
};

// Check if enough area has been scratched to reveal the result
const checkScratchCompletion = () => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const totalPixels = imageData.data.length / 4;
  let revealedPixels = 0;

  for (let i = 0; i < imageData.data.length; i += 4) {
    if (imageData.data[i + 3] === 0) {
      revealedPixels++; // Count transparent pixels
    }
  }

  const revealedPercentage = (revealedPixels / totalPixels) * 100;

  if (revealedPercentage > 50) {
    resultMessage.style.display = "block"; // Reveal the result when 50% is scratched
    canvas.style.pointerEvents = "none"; // Disable further scratching
  }
};

// Add event listeners for scratching
["mousedown", "touchstart"].forEach((event) => {
  canvas.addEventListener(event, (e) => {
    const { x, y } = getXY(e);
    scratch(x, y);
  });
});

["mousemove", "touchmove"].forEach((event) => {
  canvas.addEventListener(event, (e) => {
    e.preventDefault();
    if (e.buttons === 1 || e.type === "touchmove") {
      const { x, y } = getXY(e);
      scratch(x, y);
    }
  });
});

// Initialize the scratch card on window load
window.onload = init;
