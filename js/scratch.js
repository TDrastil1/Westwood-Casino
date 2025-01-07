// Elements
const canvas = document.getElementById("scratch");
const context = canvas.getContext("2d");
const valuesContainer = document.getElementById("valuesContainer");
const resultMessage = document.getElementById("resultMessage");

// Possible values for the scratch card
const values = ["$10", "$20", "$50", "$100", "$500"];

// Initialize the scratch area and values
const init = () => {
  // Set the scratch card background gradient
  const gradientColor = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradientColor.addColorStop(0, "#c3a3f1");
  gradientColor.addColorStop(1, "#6414e9");
  context.fillStyle = gradientColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Randomize values for the scratch card
  randomizeValues();
};

// Generate random values and check for a win condition
const randomizeValues = () => {
  const chosenValues = [];
  valuesContainer.innerHTML = ""; // Clear any previous values
  for (let i = 0; i < 6; i++) {
    const randomValue = values[Math.floor(Math.random() * values.length)];
    chosenValues.push(randomValue);
    const h3 = document.createElement("h3");
    h3.textContent = randomValue;
    h3.classList.add("hidden-value"); // Add class for styling
    valuesContainer.appendChild(h3);
  }
  checkForWin(chosenValues);
};

// Check if there are 3 or more identical values (win condition)
const checkForWin = (chosenValues) => {
  const counts = {};
  chosenValues.forEach((value) => {
    counts[value] = (counts[value] || 0) + 1;
  });
  for (let value in counts) {
    if (counts[value] >= 3) {
      resultMessage.textContent = `🎉 You win! Found 3 or more of ${value}!`;
      resultMessage.style.color = "#28a745"; // Green for success
      return;
    }
  }
  resultMessage.textContent = "😞 Better luck next time!";
  resultMessage.style.color = "#ff4444"; // Red for failure
};

// Scratch functionality on the canvas
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

// Add event listeners for scratch functionality
["mousedown", "touchstart"].forEach((event) => {
  canvas.addEventListener(event, (e) => {
    isScratching = true;
    const { x, y } = getXY(e);
    scratch(x, y);
  });
});

["mousemove", "touchmove"].forEach((event) => {
  canvas.addEventListener(event, (e) => {
    if (isScratching) {
      e.preventDefault();
      const { x, y } = getXY(e);
      scratch(x, y);
    }
  });
});

["mouseup", "touchend", "mouseleave"].forEach((event) => {
  canvas.addEventListener(event, () => {
    isScratching = false;
  });
});

// Initialize the scratch card functionality on window load
window.onload = init;
