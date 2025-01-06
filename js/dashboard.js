document.addEventListener("DOMContentLoaded", () => {
    // Function to handle game selection and email submission
    window.playGame = function (gameName) {
        // Prompt the user to enter an amount for the selected game
        const amount = prompt(`Enter the amount you want to spend on ${gameName} (ς):`);

        // Validate the user's input
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid positive amount.");
            return;
        }

        // Populate the hidden form fields with the game name and amount
        const gameNameField = document.getElementById("game-name");
        const amountField = document.getElementById("amount");

        gameNameField.value = gameName;
        amountField.value = amount;

        // Submit the form to FormSpree
        const form = document.getElementById("email-form");
        form.submit();

        // Notify the user that their request has been sent
        alert(`Your request to play ${gameName} with ${amount} ς has been sent successfully!`);
    };
});
