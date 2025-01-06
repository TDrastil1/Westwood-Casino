const buckets = {
  drops: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
};

// Update individual bucket statistics
function updateStat(selector, count, percent) {
  document.querySelector(selector).textContent = `${count} ς`;
  document.querySelector(`${selector}_percent`).textContent = percent;
}

// Update all buckets and percentages
function updateBuckets() {
  const selectors = ['#one', '#two', '#three', '#four', '#five'];
  selectors.forEach((selector, i) => {
    const count = buckets[i + 1];
    const percent = buckets.drops > 0
      ? ((buckets[i + 1] / buckets.drops) * 100).toFixed(2) + '%'
      : '0.00%';
    updateStat(selector, count, percent);
  });
}

// Randomly choose left or right (-1 or 1)
function getRandom() {
  return Math.random() < 0.5 ? -1 : 1;
}

// Assign chip to a bucket based on its final position
function getBucket(chip) {
  const total = chip.path.reduce((sum, step) => sum + step, 0);
  const bucketMap = { '-4': 1, '-2': 2, '0': 3, '2': 4, '4': 5 };
  const bucket = bucketMap[total] || 3;
  buckets[bucket]++;
  buckets.drops++;
  updateBuckets();
  chip.el.remove();
}

// Chip class to manage individual chip movements
class Chip {
  constructor(boardId, speed) {
    this.board = document.getElementById(boardId);
    this.speed = speed;
    this.location = {
      x: this.board.offsetWidth / 2,
      y: 0,
    };
    this.lastStep = 0;

    const chip = document.createElement('div');
    chip.className = 'chip';
    this.board.appendChild(chip);
    this.el = chip;

    this.el.style.left = `${this.location.x}px`;
    this.el.style.top = `${this.location.y}px`;
  }

  start() {
    // Generate a random path for the chip
    this.path = Array.from({ length: 4 }, () => getRandom());
    this.nextStep();
  }

  nextStep() {
    if (this.lastStep < 4) {
      const offset = this.path[this.lastStep] < 0 ? -2 : 2;
      this.animateTo({
        x: offset,
        y: 2,
      });
    } else {
      getBucket(this);
    }
  }

  animateTo(offset) {
    const step = {
      x: this.board.offsetWidth / 17,
      y: this.board.offsetHeight / 11,
    };

    this.el.style.transition = `all ${this.speed}ms linear`;
    this.el.style.left = `${parseFloat(this.el.style.left) + step.x * offset.x}px`;
    this.el.style.top = `${parseFloat(this.el.style.top) + step.y * offset.y}px`;

    setTimeout(() => {
      this.lastStep++;
      this.nextStep();
    }, this.speed);
  }
}

let faucetId;

// Event listeners for user interactions
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.code === 'Space') {
      // Drop a single chip
      const chip = new Chip('plinko-board', 500);
      chip.start();
    } else if (e.code === 'KeyO') {
      // Toggle automatic chip drops
      if (!faucetId) {
        faucetId = setInterval(() => {
          const chip = new Chip('plinko-board', 500);
          chip.start();
        }, 200);
      } else {
        clearInterval(faucetId);
        faucetId = null;
      }
    }
  });
});
