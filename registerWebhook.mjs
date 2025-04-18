// Importing the `fetch` function from the `node-fetch` library to make HTTP requests.
import fetch from 'node-fetch';

// Defining the token used for authentication with the Monobank API.
const monobankToken = process.env.MONOBANK_BOT_TOKEN;


// Defining the base URL provided by ngrok to expose the local server to the internet.
const ngrokUrl = 'https://v5-webhook.onrender.com';

// Asynchronous function to register a webhook with the Monobank API.
const registerWebhook = async () => {
    // Logging a message to indicate the webhook registration process has started.
    console.log('📡 Registering webhook...');

    // Logging the full webhook URL that will be registered.
    console.log(`➡️ Webhook URL: ${ngrokUrl}/webhook`);

    try {
        // Sending a POST request to the Monobank API to register the webhook.
        const res = await fetch('https://api.monobank.ua/personal/webhook', {
            method: 'POST', // HTTP method for creating resources.
            headers: {
                'Content-Type': 'application/json', // Specifying the request body format as JSON.
                'X-Token': monobankToken // Adding the authentication token in the headers.
            },
            // Sending the webhook URL in the request body as JSON.
            body: JSON.stringify({ webHookUrl: `${ngrokUrl}/webhook` })
        });

        // Reading the response body as plain text.
        const bodyText = await res.text();

        // Checking if the response status indicates success (2xx).
        if (res.ok) {
            // Logging a success message if the webhook was registered successfully.
            console.log('✅ Webhook registered successfully!');
        } else {
            // Logging an error message if the response status indicates failure.
            console.error(`❌ Error: ${res.status}`);
            // Logging the response body for additional debugging information.
            console.error(`🧾 Response: ${bodyText}`);
        }
    } catch (err) {
        // Catching and logging any exceptions that occur during the request.
        console.error('❌ Exception:', err);
    }
};

// Calling the `registerWebhook` function to execute the webhook registration process.
registerWebhook();