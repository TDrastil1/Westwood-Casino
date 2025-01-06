// User Data Storage in localStorage
const users = JSON.parse(localStorage.getItem("users")) || {};

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (users[username] && users[username].password === password) {
        localStorage.setItem("currentUser", username);
        alert("Login successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid username or password!");
    }
}

function signupPrompt() {
    const username = prompt("Choose a username:");
    const password = prompt("Choose a password:");

    if (!username || !password) {
        alert("Both fields are required.");
        return;
    }

    if (!users[username]) {
        users[username] = { password, balance: 0 };
        localStorage.setItem("users", JSON.stringify(users));
        alert("Account created successfully!");
    } else {
        alert("Username already exists! Please choose another.");
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    alert("Logged out successfully!");
    window.location.href = "index.html";
}

function navigateTo(page) {
    window.location.href = page;
}
