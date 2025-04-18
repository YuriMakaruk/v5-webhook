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

## Configuration: Create a .env file:
CHAT_ID=<your-telegram-chat-id>
_TOKENTELEGRAM_BOT=<your-telegram-bot-token>
MONOBANK_BOT_TOKEN=<your-monobank-api-token>
ALLOWED_ACCOUNT=<your-monobank-account-id>


## Example Notification
Today's total amount is 53 UAH.
Date and time: 4/18/2025, 8:50:18 AM.
Transaction description: Поповнення «бот».

