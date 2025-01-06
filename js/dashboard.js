document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!currentUser || !users[currentUser]) {
        alert("You must log in to access the dashboard.");
        window.location.href = "index.html";
        return;
    }

    // Display the current user's username and balance
    document.getElementById("username-display").textContent = currentUser;
    document.getElementById("balance-display").textContent = users[currentUser].balance;

    // Deposit function
    window.deposit = function () {
        const depositAmount = parseInt(prompt("Enter the amount to deposit (ς):"));

        if (isNaN(depositAmount) || depositAmount <= 0) {
            alert("Invalid amount. Please enter a positive number.");
            return;
        }

        users[currentUser].balance += depositAmount;
        localStorage.setItem("users", JSON.stringify(users));

        alert(`Deposit successful! Your new balance is ${users[currentUser].balance} ς.`);

        // Send email (simulated here with a log)
        console.log(`Deposit email sent: User=${currentUser}, Amount=${depositAmount}`);
        document.getElementById("balance-display").textContent = users[currentUser].balance;
    };

    // Logout function
    window.logout = function () {
        localStorage.removeItem("currentUser");
        alert("You have been logged out.");
        window.location.href = "index.html";
    };

    // Navigate to other pages
    window.navigateTo = function (page) {
        window.location.href = page;
    };
});
