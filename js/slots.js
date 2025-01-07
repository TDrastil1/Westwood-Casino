const symbols = ["🍒", "🍋", "🔔", "💎", "⭐", "🍉"]; // Slot machine symbols
const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3"),
]; // Reel elements
const resultMessage = document.getElementById("resultMessage"); // Result display
const lever = document.getElementById("lever"); // Lever element

// Populate each reel with symbols
function populateReel(reel) {
  reel.innerHTML = symbols
    .map((symbol) => `<div class="symbol">${symbol}</div>`)
    .join("");
}

// Initialize reels with symbols
reels.forEach(populateReel);

// Spin the reels
function spinReels() {
  resultMessage.textContent = "Spinning...";
  const results = [];

  reels.forEach((reel, index) => {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    const stopAt = randomIndex * -50; // Each symbol is 50px tall
    results.push(symbols[randomIndex]);

    // Animate the reel
    reel.style.transition = "transform 1s ease-out";
    reel.style.transform = `translateY(${stopAt}px)`;

    // Reset reel position after animation
    setTimeout(() => {
      reel.style.transition = "none";
      reel.style.transform = "translateY(0)";
      populateReel(reel);
    }, 1000);
  });

  // Display the result after the spin
  setTimeout(() => {
    checkResults(results);
  }, 1000);
}

// Check the results
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

// Lever interaction
lever.addEventListener("click", spinReels);
