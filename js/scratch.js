// Elements
const canvas = document.getElementById("scratch");
const context = canvas.getContext("2d");
const resultMessage = document.getElementById("resultMessage");

// Initialize the scratch area
const init = () => {
  // Set dark-themed scratch area background
  const gradientColor = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradientColor.addColorStop(0, "#333");
  gradientColor.addColorStop(1, "#444");
  context.fillStyle = gradientColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Randomize the outcome
  randomizeOutcome();
};

// Randomize the outcome for the scratch card
const randomizeOutcome = () => {
  const outcome = Math.random() < 0.05 ? "🎉 You Win $100!" : "😞 Try Again Next Time.";
  resultMessage.textContent = outcome;
  resultMessage.style.display = "none"; // Hide until fully scratched
};

// Scratch functionality
let isScratching = false;

// Scratch the canvas at specified coordinates
const scratch = (x, y) => {
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  context.arc(x, y, 20, 0, 2 * Math.PI);
  context.fill();
};

// Get the mouse or touch position on the canvas
const getXY = (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = (e.pageX || e.touches[0].pageX) - rect.left;
  const y = (e.pageY || e.touches[0].pageY) - rect.top;
  return { x, y };
};

// Check if the scratch area is sufficiently revealed
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
  if (revealedPercentage > 70) {
    resultMessage.style.display = "block"; // Reveal the outcome
    canvas.style.pointerEvents = "none"; // Disable further scratching
  }
};

// Add event listeners for scratch functionality
["mousedown", "touchstart"].forEach((event) => {
  canvas.addEventListener(event, (e) => {
    isScratching = true;
    const { x, y } = getXY(e);
    scratch(x, y);
    checkScratchCompletion();
  });
});

["mousemove", "touchmove"].forEach((event) => {
  canvas.addEventListener(event, (e) => {
    if (isScratching) {
      e.preventDefault();
      const { x, y } = getXY(e);
      scratch(x, y);
      checkScratchCompletion();
    }
  });
});

["mouseup", "touchend", "mouseleave"].forEach((event) => {
  canvas.addEventListener(event, () => {
    isScratching = false;
  });
});

// Initialize the scratch card on window load
window.onload = init;
