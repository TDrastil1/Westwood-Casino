<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slot Machine</title>
  <style>
    /* General Styling */
    html, body {
      height: 100%;
      margin: 0;
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(45deg, #333, #111);
      color: white;
    }

    .slots-container {
      position: relative;
      width: calc(3.5 * 79px + 50px); /* Adjusted width for lever */
      display: flex;
      align-items: center;
    }

    .slots {
      display: flex;
      justify-content: space-between;
      width: calc(3.5 * 79px);
      height: calc(3 * 79px);
      padding: calc(0.3 * 79px);
      background: linear-gradient(45deg, grey 0%, lightgray 100%);
      border: 2px solid rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.5);
    }

    .reel {
      position: relative;
      width: 79px;
      height: calc(3 * 79px);
      background-image: url(https://assets.codepen.io/439000/slotreel.webp);
      background-size: 100%;
      background-repeat: repeat-y;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }

    /* Lever Styling */
    .lever-container {
      position: relative;
      margin-left: 20px;
      width: 50px;
      height: 200px;
      background: linear-gradient(to bottom, #8b0000, #550000);
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
      cursor: pointer;
    }

    .lever-stick {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 10px;
      height: 120px;
      background: #444;
      border-radius: 5px;
    }

    .lever-ball {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 40px;
      background: radial-gradient(circle, #ff0000, #aa0000);
      border-radius: 50%;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.8);
    }

    /* Spin Result */
    .result {
      margin-top: 20px;
      font-size: 1.2rem;
      color: #ffcc00;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
    }
  </style>
</head>
<body>
  <div class="slots-container">
    <div class="slots" id="slots">
      <div class="reel" id="reel1"></div>
      <div class="reel" id="reel2"></div>
      <div class="reel" id="reel3"></div>
    </div>
    <div class="lever-container" id="lever">
      <div class="lever-stick"></div>
      <div class="lever-ball"></div>
    </div>
  </div>
  <p class="result" id="resultMessage">Pull the lever to spin!</p>

  <script>
    const lever = document.getElementById("lever");
    const reels = [
      document.getElementById("reel1"),
      document.getElementById("reel2"),
      document.getElementById("reel3"),
    ];
    const resultMessage = document.getElementById("resultMessage");

    // Function to simulate spinning reels
    function spinReels() {
      resultMessage.textContent = "Spinning...";
      reels.forEach((reel, index) => {
        const randomPosition = Math.floor(Math.random() * 10) * -79; // Random stop position
        reel.style.backgroundPositionY = `${randomPosition}px`;
      });

      setTimeout(() => {
        resultMessage.textContent = "Check the results!";
      }, 1000);
    }

    // Lever interaction
    lever.addEventListener("click", () => {
      spinReels();
    });
  </script>
</body>
</html>
