document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};

    // Check if the user is logged in
    if (!currentUser || !users[currentUser]) {
        alert("You must log in to access the dashboard.");
        window.location.href = "index.html";
        return;
    }

    // Display the logged-in user's information
    const userBalanceElement = document.getElementById("balance-display");
    const usernameElement = document.getElementById("username-display");

    usernameElement.textContent = currentUser;
    userBalanceElement.textContent = users[currentUser].balance;

    // Deposit function
    window.deposit = function () {
        const depositAmount = parseInt(prompt("Enter the amount to deposit (ς):"));

        if (isNaN(depositAmount) || depositAmount <= 0) {
            alert("Invalid deposit amount. Please enter a positive number.");
            return;
        }

        // Update the user's balance
        users[currentUser].balance += depositAmount;
        localStorage.setItem("users", JSON.stringify(users));

        // Update the displayed balance
        userBalanceElement.textContent = users[currentUser].balance;

        alert(`Deposit successful! Your new balance is ${users[currentUser].balance} ς.`);

        // Simulated email notification (logged to console)
        console.log(
            `Deposit email notification: User=${currentUser}, Amount=${depositAmount} ς`
        );
    };

    // Logout function
    window.logout = function () {
        localStorage.removeItem("currentUser");
        alert("You have been logged out.");
        window.location.href = "index.html";
    };

    // Navigation function
    window.navigateTo = function (page) {
        window.location.href = page;
    };
});
