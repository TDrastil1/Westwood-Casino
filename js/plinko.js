function createPyramid() {
  const pegs = document.getElementById("pegs");

  // Create rows of pegs for the pyramid
  for (let row = 0; row < 10; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    for (let col = 0; col <= row; col++) {
      const peg = document.createElement("div");
      peg.classList.add("peg");
      rowDiv.appendChild(peg);
    }

    pegs.appendChild(rowDiv);
  }
}

function dropBall() {
  const ball = document.getElementById("ball");
  const slots = document.querySelectorAll(".slot");
  const result = document.getElementById("result");

  // Initialize ball position
  ball.style.display = "block";
  ball.style.top = "20px";
  ball.style.left = "50%";

  let top = 20; // Starting vertical position
  let left = 50; // Centered horizontally

  const interval = setInterval(() => {
    if (top >= 550) {
      // Stop ball animation when it reaches the bottom
      clearInterval(interval);

      // Determine the landing slot
      const landingSlotIndex = Math.floor(left / (100 / slots.length));
      const slotMultiplier = slots[landingSlotIndex]?.innerText || "1x";

      // Display result message
      result.innerText = `🎯 The ball landed in slot ${slotMultiplier}!`;
      result.style.color = landingSlotIndex % 2 === 0 ? "#ffc107" : "#e74c3c"; // Yellow for even slots, red for odd
      return;
    }

    // Simulate ball bouncing left or right randomly
    top += 20;
    left += Math.random() > 0.5 ? 5 : -5;

    // Keep the ball within the board boundaries
    if (left < 5) left = 5;
    if (left > 95) left = 95;

    // Update ball position
    ball.style.top = `${top}px`;
    ball.style.left = `${left}%`;
  }, 100); // Move ball every 100ms
}

// Initialize the pyramid of pegs when the page loads
window.onload = createPyramid;
