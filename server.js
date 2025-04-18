// Importing the Express framework to create a web server.
const express = require('express');

// Importing the body-parser middleware to parse incoming JSON request bodies.
const bodyParser = require('body-parser');

// Importing the logRandomMessage function from utils.js
const { processTransaction } = require('./utils');

// Creating an instance of an Express application.
const app = express();

// Defining the port number on which the server will listen.
const PORT = 3000;

const allowedAccount = process.env.ALLOWED_ACCOUNT; // The account ID to filter transactions

// Using the body-parser middleware to parse JSON request bodies.
app.use(bodyParser.json());

// Defining a GET endpoint for the `/webhook` route.
// Monobank sends a GET request to verify the webhook during registration.
app.get('/webhook', (req, res) => {
    // Logging a message to indicate that Monobank verified the webhook.
    console.log("✅ Monobank verified your webhook");
    // Sending a 200 OK status to confirm the verification.
    res.sendStatus(200);
});

// Defining a POST endpoint for the `/webhook` route.
// Monobank sends transaction data to this endpoint.
app.post('/webhook', (req, res) => {
    // Logging a message to indicate an incoming POST request.
    console.log("📥 Incoming POST to /webhook");
    // Logging the request body in a formatted JSON string for debugging purposes.
    console.log(JSON.stringify(req.body, null, 2));

    // Extracting the event object from the request body.
    const event = req.body;

    // Checking if the event type is "StatementItem" (indicating a new transaction).
    if (event.type === "StatementItem") {
        // Logging a message to indicate a new transaction was received.
        console.log("📬 New transaction received:");
        // Logging the transaction details in a formatted JSON string.
        console.log(JSON.stringify(event.data.statementItem, null, 2));

        const transaction = event.data.statementItem;
        const account = event.data.account; // Extracting the account ID from the event data

        if (account !== allowedAccount) {
            console.log("🔄 Skipping transaction for account:", account);
            return res.sendStatus(200);
        }

        const amount = transaction.amount / 100; // Assuming the amount is in cents, convert to main currency unit
        const localTime = new Date(transaction.time * 1000).toLocaleString(); // Convert Unix timestamp to local time
        const description = transaction.description || 'No description'; // Fallback to 'No description' if none provided       

        console.log("📬 New transaction received. Calling processTransaction...");
        processTransaction(amount, localTime, description); // Call the function to log and Telegram message
    }

    // Sending a 200 OK status to acknowledge receipt of the data.
    res.sendStatus(200);
});

// Starting the server and listening on the specified port.
app.listen(PORT, () => {
    // Logging a message to indicate the server is running and its URL.
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
