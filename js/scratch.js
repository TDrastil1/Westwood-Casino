document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!currentUser || !users[currentUser]) {
        alert("You must log in to play Scratch-Off.");
        window.location.href = "index.html";
        return;
    }

    const canvas = document.getElementById("scratchCanvas");
    const ctx = canvas.getContext("2d");
    const message = document.getElementById("prize-message");

    let isScratching = false;
    let hasWon = false;

    // Scratch card prizes
    const prizes = [0, 50, 100, 200, 500];
    const prize = prizes[Math.floor(Math.random() * prizes.length)];

    // Fill the canvas with gray color (scratchable area)
    function initializeCanvas() {
        ctx.fillStyle = "#ccc";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function scratch(e) {
        if (!isScratching || hasWon) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.clearRect(x - 10, y - 10, 20, 20);

        // Check if enough area has been scratched to reveal the prize
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const totalPixels = imageData.data.length / 4;
        let scratchedPixels = 0;

        for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] === 0) scratchedPixels++;
        }

        if (scratchedPixels / totalPixels > 0.5) {
            revealPrize();
        }
    }

    function revealPrize() {
        hasWon = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`You won ${prize} ς!`, canvas.width / 2, canvas.height / 2);

        if (prize > 0) {
            users[currentUser].balance += prize;
            localStorage.setItem("users", JSON.stringify(users));
        }

        message.textContent = prize > 0
            ? `🎉 Congratulations! You've won ${prize} ς.`
            : "😞 Better luck next time!";
    }

    function resetScratchCard() {
        initializeCanvas();
        isScratching = false;
        hasWon = false;
        message.textContent = "";
        window.location.reload();
    }

    // Attach event listeners
    canvas.addEventListener("mousedown", () => (isScratching = true));
    canvas.addEventListener("mouseup", () => (isScratching = false));
    canvas.addEventListener("mousemove", scratch);

    initializeCanvas();
    window.resetScratchCard = resetScratchCard;
});
