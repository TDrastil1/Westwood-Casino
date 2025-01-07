// Slot Machine Functionality

const symbols = ["🍒", "🍋", "🔔", "💎", "⭐", "🍉"]; // Possible symbols
const spinButton = document.getElementById("spinButton");
const resultMessage = document.getElementById("resultMessage");

// Target each reel
const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3"),
];

// Function to generate random symbol
function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Spin the reels
function spinReels() {
  // Clear previous result
  resultMessage.textContent = "Spinning...";

  // Set a timeout to simulate spinning
  setTimeout(() => {
    const results = [];

    // Update each reel with a random symbol
    reels.forEach((reel, index) => {
      const symbol = getRandomSymbol();
      reel.textContent = symbol;
      results.push(symbol);
    });

    // Check results
    checkResults(results);
  }, 1000); // 1-second delay for "spinning"
}

// Check the results for wins
function checkResults(results) {
  const [first, second, third] = results;

  if (first === second && second === third) {
    resultMessage.textContent = `🎉 Jackpot! You win!`;
  } else if (first === second || second === third || first === third) {
    resultMessage.textContent = `✨ You matched two symbols!`;
  } else {
    resultMessage.textContent = `😞 Try again!`;
  }
}

// Add event listener to the spin button
spinButton.addEventListener("click", spinReels);
