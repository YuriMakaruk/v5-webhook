let totalAmount = 0;
let dailyTotal = 0; // Total expenses for the current day
let currentDay = new Date().toISOString().split('T')[0]; // Current day in YYYY-MM-DD format

// The chat ID of the recipient
const chatId = process.env.CHAT_ID;

// Your bot's token obtained from BotFather on Telegram
const telegramToken = process.env.TELEGRAM_BOT_TOKEN;

// Construct the Telegram API URL for sending a message
const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

// Combined function to log a message and send a Telegram message
async function processTransaction(amount, localTime, description) {
    // Accumulate the total amount
    totalAmount += amount;

    // Get the transaction date in YYYY-MM-DD format
    const transactionDate = new Date(localTime).toISOString().split('T')[0];

    // Check if the transaction is for the current day
    if (transactionDate === currentDay) {
        // Add the amount to the daily total if it's an expense (negative amount)
        if (amount < 0) {
            dailyTotal += amount;
        }
    } else {
        // Reset the daily total and current day if it's a new day
        currentDay = transactionDate;
        dailyTotal = amount < 0 ? amount : 0; // Start with the first expense of the new day
    }

    // Make a POST request to the Telegram API to send the message
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: `
            Today's total expenses are ${Math.abs(dailyTotal)} UAH.
            Date and time: ${localTime}.
            Transaction description: ${description}.`
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Message sent:', data.result.text);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Export the combined function
module.exports = { processTransaction };

