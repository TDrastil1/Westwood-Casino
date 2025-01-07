// Slot Machine JavaScript

const symbols = ["🍒", "🍋", "🔔", "💎"]; // Slot machine symbols
const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3"),
]; // Reel DOM elements
const resultMessage = document.getElementById("resultMessage"); // Result message display
const lever = document.getElementById("lever"); // Lever DOM element

// Spin the reels
function spinReels() {
  resultMessage.textContent = ""; // Clear any previous result message

  const results = []; // Store the final symbols of each reel
  reels.forEach((reel, index) => {
    // Create a randomized sequence of symbols for the reel
    const shuffledSymbols = [...symbols, ...symbols, ...symbols];
    reel.innerHTML = shuffledSymbols
      .map((symbol) => `<div class="symbol">${symbol}</div>`)
      .join("");

    // Determine the stop position of the reel
    const stopAt = Math.floor(Math.random() * shuffledSymbols.length);
    const scrollAmount = stopAt * 100; // Each symbol takes up 100px height
    results.push(shuffledSymbols[stopAt]); // Store the result symbol

    // Animate the reel spin
    setTimeout(() => {
      reel.scrollTop = scrollAmount; // Scroll the reel to the stop position
      if (index === reels.length - 1) checkResult(results); // Check result after last reel stops
    }, 1000 + index * 500); // Stagger reel stop times for better animation
  });
}

// Check the spin results
function checkResult(results) {
  const [first, second, third] = results; // Extract the results of all three reels

  // Determine the outcome based on matching symbols
  if (first === second && second === third) {
    resultMessage.textContent = `🎉 Jackpot! You win 20 ς!`;
  } else if (first === second || second === third || first === third) {
    resultMessage.textContent = `✨ You win 5 ς!`;
  } else {
    resultMessage.textContent = `😞 Try again!`;
  }
}

// Add event listener to the lever
lever.addEventListener("click", () => {
  lever.classList.add("active"); // Visually indicate the lever is pulled
  setTimeout(() => {
    lever.classList.remove("active"); // Reset lever position
    spinReels(); // Start the reels spinning
  }, 300); // Delay lever reset to sync with the spin start
});
