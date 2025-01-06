const canvas = document.getElementById('scratchLayer');
const ctx = canvas.getContext('2d');
const coin = document.getElementById('coin');

// Set canvas size to match the scratch card
canvas.width = 300;
canvas.height = 200;

// Draw the scratch layer
ctx.fillStyle = '#a9a9a9';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Scratch animation variables
const totalArea = canvas.width * canvas.height;
let scratchedArea = 0;

const animateCoin = () => {
  const coinRadius = 20;
  let x = 10; // Start position of the coin
  let y = 10;
  const stepX = 30; // Horizontal movement per step
  const stepY = 30; // Vertical movement per row

  const scratch = () => {
    // Scratch effect
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, coinRadius, 0, Math.PI * 2, false);
    ctx.fill();

    // Calculate scratched area
    scratchedArea += Math.PI * coinRadius * coinRadius;

    // Move the coin to the next position
    x += stepX;
    if (x > canvas.width - coinRadius) {
      x = 10; // Reset to the start of the row
      y += stepY; // Move down one row
    }

    // Stop animation if the coin goes out of bounds
    if (y > canvas.height) {
      if (scratchedArea / totalArea > 0.7) {
        setTimeout(() => {
          alert('🎉 Congratulations! You won a prize!');
        }, 500);
      }
      return;
    }

    // Continue the animation
    requestAnimationFrame(scratch);
  };

  // Start the animation
  scratch();
};

// Add event listener to the coin
coin.addEventListener('click', () => {
  coin.style.pointerEvents = 'none'; // Disable coin interaction during animation
  animateCoin();
});
