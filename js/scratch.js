function setupScratchCard() {
  const canvas = document.getElementById('scratchCanvas');
  const ctx = canvas.getContext('2d');
  const hiddenMessage = document.getElementById('hiddenMessage');
  const coin = document.getElementById('coin');

  // Set up canvas dimensions
  canvas.width = 300;
  canvas.height = 200;

  // Fill the canvas with scratch-off layer
  ctx.fillStyle = '#bbb';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Randomize the prize
  const outcomes = [
    { message: "🎉 You Win 100 ς!", color: "#28a745", weight: 10 },
    { message: "✨ You Win 50 ς!", color: "#ffc107", weight: 20 },
    { message: "😞 Better Luck Next Time!", color: "#ff4444", weight: 70 },
  ];

  function getOutcome() {
    const totalWeight = outcomes.reduce((sum, outcome) => sum + outcome.weight, 0);
    const randomWeight = Math.floor(Math.random() * totalWeight);

    let cumulativeWeight = 0;
    for (const outcome of outcomes) {
      cumulativeWeight += outcome.weight;
      if (randomWeight < cumulativeWeight) {
        return outcome;
      }
    }
  }

  const selectedOutcome = getOutcome();
  hiddenMessage.innerText = selectedOutcome.message;
  hiddenMessage.style.color = selectedOutcome.color;

  // Scratch effect
  let scratchedArea = 0;
  const totalArea = canvas.width * canvas.height;

  canvas.addEventListener('mousemove', (e) => {
    if (e.buttons !== 1) return; // Only scratch when the mouse is pressed

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratched area
    scratchedArea += Math.PI * 20 * 20;

    // Check if enough area has been scratched
    if ((scratchedArea / totalArea) > 0.7) {
      canvas.removeEventListener('mousemove', arguments.callee); // Stop scratching
      setTimeout(() => {
        alert(hiddenMessage.innerText);
      }, 300);
    }
  });

  // Coin follows the mouse
  document.addEventListener('mousemove', (e) => {
    coin.style.left = `${e.pageX - 25}px`;
    coin.style.top = `${e.pageY - 25}px`;
  });
}

// Initialize the scratch card when the page loads
document.addEventListener('DOMContentLoaded', setupScratchCard);
