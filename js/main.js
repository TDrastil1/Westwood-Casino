// User Data Storage in localStorage
const users = JSON.parse(localStorage.getItem("users")) || {};

// Function to handle login
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Both username and password are required!");
        return;
    }

    if (users[username] && users[username].password === password) {
        localStorage.setItem("currentUser", username);
        alert("Login successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

// Function to handle signup
function signupPrompt() {
    const username = prompt("Choose a username:").trim();
    const password = prompt("Choose a password:").trim();

    if (!username || !password) {
        alert("Both fields are required to sign up.");
        return;
    }

    if (users[username]) {
        alert("Username already exists. Please choose another.");
        return;
    }

    users[username] = { password, balance: 0 };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully! You can now log in.");
}

// Function to logout
function logout() {
    localStorage.removeItem("currentUser");
    alert("Logged out successfully!");
    window.location.href = "index.html";
}

// Function to navigate to another page
function navigateTo(page) {
    window.location.href = page;
}

// Ensure only logged-in users can access restricted pages
function checkLoggedIn() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser || !users[currentUser]) {
        alert("You must log in to access this page.");
        window.location.href = "index.html";
    }
}

// Function to deposit currency
function deposit() {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser || !users[currentUser]) {
        alert("You must be logged in to make a deposit.");
        window.location.href = "index.html";
        return;
    }

    const depositAmount = parseInt(prompt("Enter the amount to deposit (ς):"));

    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Invalid deposit amount. Please enter a positive number.");
        return;
    }

    // Update user balance
    users[currentUser].balance += depositAmount;
    localStorage.setItem("users", JSON.stringify(users));

    alert(`Deposit successful! Your new balance is ${users[currentUser].balance} ς.`);

    // Simulated email notification (log only, since backend isn't implemented)
    console.log(
        `Deposit notification: User=${currentUser}, Amount=${depositAmount} ς`
    );
}
