const express = require('express');
const app = express();

// If using Node <18, uncomment the next line:
// const fetch = require('node-fetch');

app.use(express.json());

const MONOBANK_TOKEN = process.env.MONOBANK_BOT_TOKEN; // Your Monobank token
const chatId = process.env.CHAT_ID; // The chat ID of the recipient
const telegramToken = process.env.TELEGRAM_BOT_TOKEN; // Your bot's token obtained from BotFather on Telegram

// Construct the Telegram API URL for sending a message
const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

// Your custom function that does a calculation
async function performFunction() {
    try {
        const account = process.env.ALLOWED_ACCOUNT;
        const fromDate = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000); // Start of today
        const toDate = Math.floor(new Date().getTime() / 1000); // Current date
        const monobankUrl = `https://api.monobank.ua/personal/statement/${account}/${fromDate}/${toDate}`;

        const response = await fetch(monobankUrl, {
            method: 'GET',
            headers: {
                'X-Token': MONOBANK_TOKEN
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching Monobank data: ${response.status} ${response.statusText}`);
        }

        const transactions = await response.json();
        console.log('Fetched transactions:', transactions);

        // Variables for accumulating transaction data
        let total = 0;
        let descriptions = [];
        const localTime = new Date().toLocaleTimeString(); // Get the current local time

        transactions.forEach(item => {
            // Log each transaction
            console.log(`Transaction description: ${item.description}, Amount: ${item.amount / 100} UAH`);

            // Sum the amounts
            total += item.amount;

            // Collect transaction descriptions (optional: choose one description or all)
            if (item.description) {
                descriptions.push(item.description);
            }
        });

        const totalUAH = total / 100; // Convert to UAH
        console.log('Total amount from all transactions today:', totalUAH.toFixed(2), 'UAH');

        // Prepare the description for Telegram message
        const descriptionText = descriptions.length > 0 ? descriptions.join(', ') : 'No description available';

        // Send Telegram message
        const telegramResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: `
                Today's total expenses are ${totalUAH.toFixed(2)} UAH.
                Date and time: ${localTime}.
                Transaction descriptions: ${descriptionText}.`
            })
        });

        const data = await telegramResponse.json();
        if (data.ok) {
            console.log('Message sent:', data.result.text);
        } else {
            console.error('Telegram API Error:', data.description);
        }

    } catch (error) {
        console.error('Error fetching Monobank data:', error.message);
    }
}

app.post('/webhook', async (req, res) => {
    console.log('Received webhook:', req.body);

    await performFunction(); // Call your async function

    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
