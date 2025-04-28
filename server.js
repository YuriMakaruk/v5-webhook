// server.js
const express = require('express');
const app = express();
app.use(express.json());

let totalAmount = 0;

app.post('/webhook', (req, res) => {
    console.log('Received webhook:', req.body);
    const { statementItem } = req.body.data;

    if (statementItem && statementItem.amount) {
        totalAmount += statementItem.amount;
        console.log('Total amount so far:', totalAmount);
    }

    res.sendStatus(200);
});

app.get('/', (req, res) => {
    res.send(`Total Amount: ${totalAmount}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
