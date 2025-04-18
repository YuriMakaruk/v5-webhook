let totalAmount = 0;

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

    // Log the random message with the current amount
    console.log(`💸 Money is moving: ${amount}!`);
    console.log(`🔢 Total today's amount: ${totalAmount}`);
    console.log("Transaction local time:", localTime);
    console.log("Transaction description:", description);

    // Make a POST request to the Telegram API to send the message
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: `
            Today's total amount is ${totalAmount} UAH. 
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

