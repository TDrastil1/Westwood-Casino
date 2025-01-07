const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
const scratchLayer = document.querySelector(".scratch-layer");
const prize = document.getElementById("prize");

// Set canvas dimensions
canvas.width = 300;
canvas.height = 200;

// Fill canvas with grey scratch-off layer
ctx.fillStyle = "#aaa";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Scratch effect variables
let isScratching = false;

// Scratch functionality
canvas.addEventListener("mousedown", () => {
  isScratching = true;
});

canvas.addEventListener("mouseup", () => {
  isScratching = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isScratching) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 15, 0, Math.PI * 2);
  ctx.fill();
});

// Remove scratch layer when sufficient area is revealed
const checkScratchCompletion = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  let scratchedPixels = 0;

  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] === 0) scratchedPixels++; // Check alpha value
  }

  const scratchedPercentage = (scratchedPixels / (pixels.length / 4)) * 100;
  if (scratchedPercentage > 60) {
    canvas.style.display = "none";
    prize.style.color = "#ffd700"; // Highlight prize message
  }
};

canvas.addEventListener("mousemove", checkScratchCompletion);
