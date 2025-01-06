document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!currentUser || !users[currentUser]) {
        alert("You must log in to play Slots.");
        window.location.href = "index.html";
        return;
    }

    const reels = ["🍒", "🍋", "🍉", "⭐", "🍇"];
    const spinButton = document.getElementById("spin-button");
    const reel1 = document.getElementById("reel1");
    const reel2 = document.getElementById("reel2");
    const reel3 = document.getElementById("reel3");
    const message = document.getElementById("message");

    function getRandomSymbol() {
        return reels[Math.floor(Math.random() * reels.length)];
    }

    function spin() {
        const bet = 50; // Cost of one spin
        if (users[currentUser].balance < bet) {
            alert("Insufficient balance to spin. Please deposit more ς.");
            return;
        }

        // Deduct the bet
        users[currentUser].balance -= bet;
        localStorage.setItem("users", JSON.stringify(users));
        alert(`50 ς deducted. Your remaining balance is ${users[currentUser].balance} ς.`);

        // Spin the reels
        const result1 = getRandomSymbol();
        const result2 = getRandomSymbol();
        const result3 = getRandomSymbol();

        reel1.textContent = result1;
        reel2.textContent = result2;
        reel3.textContent = result3;

        // Determine winnings
        if (result1 === result2 && result2 === result3) {
            const prize = 500;
            users[currentUser].balance += prize;
            localStorage.setItem("users", JSON.stringify(users));
            message.textContent = `🎉 JACKPOT! You win ${prize} ς! Your new balance is ${users[currentUser].balance} ς.`;
        } else if (result1 === result2 || result2 === result3 || result1 === result3) {
            const prize = 100;
            users[currentUser].balance += prize;
            localStorage.setItem("users", JSON.stringify(users));
            message.textContent = `🥳 Nice! You win ${prize} ς! Your new balance is ${users[currentUser].balance} ς.`;
        } else {
            message.textContent = "😞 Better luck next time!";
        }
    }

    spinButton.addEventListener("click", spin);
});
