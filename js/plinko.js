document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!currentUser || !users[currentUser]) {
        alert("You must log in to play Plinko.");
        window.location.href = "index.html";
        return;
    }

    const boardContainer = document.getElementById("board-container");
    const ball = document.getElementById("ball");
    const resultMessage = document.getElementById("plinko-result");
    const dropButton = document.getElementById("drop-button");

    const prizeSlots = [0, 50, 100, 200, 500]; // Possible prizes at the bottom slots

    function dropBall() {
        if (!ball.classList.contains("hidden")) {
            alert("Finish the current game before dropping another ball.");
            return;
        }

        ball.style.left = `${Math.random() * (boardContainer.clientWidth - 20)}px`;
        ball.classList.remove("hidden");

        let ballPosition = 0;
        const fallInterval = setInterval(() => {
            if (ballPosition >= boardContainer.clientHeight - 20) {
                clearInterval(fallInterval);
                handleBallLanding();
            } else {
                ballPosition += 5;
                ball.style.top = `${ballPosition}px`;
            }
        }, 50);
    }

    function handleBallLanding() {
        ball.classList.add("hidden");
        ball.style.top = "0px";

        // Randomly pick a prize from the available slots
        const prize = prizeSlots[Math.floor(Math.random() * prizeSlots.length)];

        if (prize > 0) {
            users[currentUser].balance += prize;
            localStorage.setItem("users", JSON.stringify(users));
            resultMessage.textContent = `🎉 Congratulations! You won ${prize} ς! Your new balance is ${users[currentUser].balance} ς.`;
        } else {
            resultMessage.textContent = "😞 Better luck next time!";
        }
    }

    dropButton.addEventListener("click", dropBall);
});
