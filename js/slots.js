const symbols = ["🍒", "🍋", "🔔", "💎", "⭐", "🍉"]; // Slot machine symbols
const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3"),
]; // Reel elements
const resultMessage = document.getElementById("resultMessage"); // Result message element
const leverStick = document.getElementById("leverStick"); // Lever stick
const leverBall = document.getElementById("leverBall"); // Lever ball

// Populate each reel with symbols
function populateReel(reel) {
  reel.innerHTML = symbols
    .map((symbol) => `<div class="symbol">${symbol}</div>`)
    .join("");
}

// Initialize reels
reels.forEach(populateReel);

// Spin the reels
function spinReels() {
  resultMessage.textContent = "Spinning...";
  const results = [];

  reels.forEach((reel) => {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    const stopAt = randomIndex * -50; // Each symbol is 50px tall
    results.push(symbols[randomIndex]);

    // Animate reel spin
    reel.style.transition = "transform 1s ease-out";
    reel.style.transform = `translateY(${stopAt}px)`;

    // Reset reel position after animation
    setTimeout(() => {
      reel.style.transition = "none";
      reel.style.transform = "translateY(0)";
      populateReel(reel);
    }, 1000);
  });

  // Display results after spin
  setTimeout(() => checkResults(results), 1000);
}

// Check results
function checkResults(results) {
  const [first, second, third] = results;

  if (first === second && second === third) {
    resultMessage.textContent = "🎉 Jackpot! You win 20 ς!";
  } else if (first === second || second === third || first === third) {
    resultMessage.textContent = "✨ You win 5 ς!";
  } else {
    resultMessage.textContent = "😞 Try again!";
  }
}

// Lever functionality
function pullLever() {
  leverStick.style.transform = "translateX(-50%) rotate(30deg)";
  leverBall.style.transform = "translateX(-50%) translateY(20px)";
  setTimeout(() => {
    leverStick.style.transform = "translateX(-50%) rotate(0)";
    leverBall.style.transform = "translateX(-50%) translateY(0)";
    spinReels();
  }, 300); // Delay to simulate pulling the lever
}

// Add event listeners for lever interactions
leverStick.addEventListener("click", pullLever);
leverBall.addEventListener("click", pullLever);
