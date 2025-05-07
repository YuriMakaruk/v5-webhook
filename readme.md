# Monobank Webhook Service

## Overview
A Node.js application that processes real-time transaction data from Monobank and sends notifications to a Telegram chat. Ideal for tracking transactions, monitoring balances, and receiving instant alerts.

---

## Features
- **Real-Time Processing**: Automatically handles Monobank webhook events.
- **Telegram Notifications**: Sends transaction details (amount, description, timestamp) to a Telegram chat.
- **Secure**: Uses environment variables to protect sensitive data.
- **Customizable**: Easily extendable for additional features.

---

## Setup
1. **Prerequisites**:
   - Node.js installed.
   - Telegram bot via [BotFather](https://core.telegram.org/bots#botfather).
   - Monobank API token.

2. **Installation**:
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   npm install
   ```

3. **Configuration**: Create a `.env` file:
   ```properties
   CHAT_ID=<your-telegram-chat-id>
   TELEGRAM_BOT_TOKEN=<your-telegram-bot-token>
   MONOBANK_BOT_TOKEN=<your-monobank-api-token>
   ALLOWED_ACCOUNT=<your-monobank-account-id>
   ALLOWED_ACCOUNT_TWO=<your-second-monobank-account-id>
   VIBER_BOT_TOKEN=<your-viber-bot-token>
   VIBER_GROUP_ID=<your-viber-group-id>
   PORT=3000
   ```

---

## API

### Monobank API
- **Base URL**: `https://api.monobank.ua/personal`
- **Endpoints**:
  - **Webhook Registration**: `/webhook`
    - Registers a webhook URL to receive transaction updates.
    - Example:
      ```bash
      curl -X POST https://api.monobank.ua/personal/webhook \
      -H "X-Token: <MONOBANK_BOT_TOKEN>" \
      -H "Content-Type: application/json" \
      -d '{"webHookUrl": "https://<your-server-url>/webhook"}'
      ```
  - **Client Info**: `/client-info`
    - Retrieves information about the registered webhook and linked accounts.
    - Example:
      ```bash
      curl -X GET https://api.monobank.ua/personal/client-info \
      -H "X-Token: <MONOBANK_BOT_TOKEN>"
      ```
  - **Transaction History**: `/statement/{account}/{from}/{to}`
    - Fetches transaction history for a specific account and date range.
    - Example:
      ```bash
      curl -X GET https://api.monobank.ua/personal/statement/<account>/<from>/<to> \
      -H "X-Token: <MONOBANK_BOT_TOKEN>"
      ```

### Viber API
- **Base URL**: `https://chatapi.viber.com/pa`
- **Endpoints**:
  - **Send Message**: `/send_message`
    - Sends a message to a Viber user or group.
    - Example:
      ```bash
      curl -X POST https://chatapi.viber.com/pa/send_message \
      -H "Content-Type: application/json" \
      -H "X-Viber-Auth-Token: <VIBER_BOT_TOKEN>" \
      -d '{
        "receiver": "<VIBER_GROUP_ID>",
        "type": "text",
        "text": "Test message from Viber bot"
      }'
      ```

---

## Example Notification
Today's total amount is 53 UAH.  
Date and time: 4/18/2025, 8:50:18 AM.  
Transaction description: Поповнення «бот».

---

## Notes
- Ensure your `.env` file is properly configured with all required tokens and IDs.
- Use tools like [ngrok](https://ngrok.com/) to expose your local server for testing webhooks.

