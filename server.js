const express = require('express');
const app = express();

app.use(express.json());

// Your custom function that does a calculation
async function performFunction() {
    try {
        const account = process.env.ALLOWED_ACCOUNT; // Your Monobank account ID
        const fromDate = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000); // Start of today in UNIX timestamp
        const toDate = Math.floor(new Date().getTime() / 1000); // Current date in UNIX timestamp
        const monobankUrl = `https://api.monobank.ua/personal/statement/${account}/${fromDate}/${toDate}`;

        const response = await fetch(monobankUrl, {
            method: 'GET',
            headers: {
                'X-Token': process.env.MONOBANK_BOT_TOKEN // Your Monobank token
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching Monobank data: ${response.status} ${response.statusText}`);
        }

        const transactions = await response.json();
        console.log('Fetched transactions:', transactions);

        // Example calculation: sum all transaction amounts
        const total = transactions.reduce((sum, item) => sum + item.amount, 0);
        console.log('Total amount from fetched data:', total);

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