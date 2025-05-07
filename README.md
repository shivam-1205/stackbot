# Slack Approval Bot

## Overview

This is a Slack bot developed using Node.js and the Slack Bolt package. The bot facilitates an approval workflow within Slack by allowing users to submit approval requests and letting designated approvers approve or reject these requests.

## Features

- **Initialization**: The bot is set up with necessary tokens and settings using the Slack Bolt package.
- **Command Handling**: Listens for the `/approval-test` slash command to trigger the approval process.
- **Modal Submission**: Opens a modal with user selection and text input blocks for entering the approval request details.
- **Action Handling**: Sends the approval request to the designated approver with Approve and Reject buttons and updates both the requester and the approver based on the decision made.

## Prerequisites

- Node.js
- A Slack workspace
- Slack app with necessary permissions and tokens

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shivam-1205/slackbot.git
   cd slackbot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add copy the content from .env.sample file like following variables:
   ```env
   SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
   SLACK_SIGNING_SECRET=your-slack-signing-secret
   SLACK_APP_TOKEN=xapp-your-slack-app-token
   PORT=3001
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

## Usage

1. **Command Handling**:
   - Use the `/approval-test` slash command to trigger the approval process.
   - This will open a modal where you can select an approver and enter the approval request details.

2. **Modal Submission**:
   - When the modal is submitted, the selected approver receives a message with the approval request and Approve and Reject buttons.

3. **Action Handling**:
   - The bot listens for the Approve and Reject button actions.
   - Based on the action taken, it updates both the requester and the approver with the decision.

## Project Structure

```
.
├── app.js
├── package.json
├── .env
```

- `app.js`: Main application file containing the Slack bot logic.
- `package.json`: Contains the project's dependencies and scripts.
- `.env`: Environment variables for Slack tokens and settings.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or feedback, feel free to contact me at [shivamjsingh1205@gmail.com].

---
