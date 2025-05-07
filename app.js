const { App } = require("@slack/bolt");
const express = require("express");
const expressApp = express();
require("dotenv").config();

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
    port: 3000,
});

(async () => {
    // Start your app
    await app.start();

    console.log("⚡️ Slack Bolt app is running!");
})();

// sending modal
app.command("/approval-test", async ({ ack, body, client, logger }) => {
    // Acknowledge the command request
    await ack();
    // logging for acknowledge
    console.log("/approval-test command received");
    try {
        const result = await client.views.open({
            // Pass a valid trigger_id within 3 seconds of receiving it
            trigger_id: body.trigger_id,
            // View payload
            view: {
                type: "modal",
                // View identifier
                callback_id: "approval_modal",
                title: {
                    type: "plain_text",
                    text: "Approval Test",
                },
                blocks: [
                    {
                        type: "input",
                        block_id: "user_selection",
                        label: {
                            type: "plain_text",
                            text: "Select Approver",
                        },
                        element: {
                            type: "users_select",
                            action_id: "user_select",
                        },
                    },
                    {
                        type: "input",
                        block_id: "input_c",
                        label: {
                            type: "plain_text",
                            text: "What approval do you want?",
                        },
                        element: {
                            type: "plain_text_input",
                            action_id: "approval_input",
                            multiline: true,
                        },
                    },
                ],
                submit: {
                    type: "plain_text",
                    text: "Submit",
                },
            },
        });
        logger.info(result);
    } catch (error) {
        logger.error(error);
    }
});

// listening to modal view
app.view("approval_modal", async ({ ack, body, client, view, logger }) => {
    // Acknowledge the command request
    await ack();

    try {
        // selected user
        const selectedUserID =
            view["state"]["values"]["user_selection"]["user_select"]["selected_user"];

        // approval text
        const approvalInputText =
            view["state"]["values"]["input_c"]["approval_input"]["value"];

        // create approval, rejection view and send to selected user
        client.chat.postMessage({
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: approvalInputText,
                    },
                },
                {
                    type: "actions",
                    elements: [
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                emoji: true,
                                text: "Approve",
                            },
                            style: "primary",
                            value: "click_me_123",
                            action_id: "approve_action",
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                emoji: true,
                                text: "Reject",
                            },
                            style: "danger",
                            value: "click_me_123",
                            action_id: "reject_action",
                        },
                    ],
                },
            ],
            channel: selectedUserID,
            text: `Approval request from <@${body.user.id}>: ${approvalInputText}`,
        });
    } catch (error) {
        logger.error(error);
    }
});

// listen to action
app.action("approve_action", async ({ ack, say, body, client }) => {
    await ack();
    await say("Request approved 👍");
    const requesterId = body.message.text.match(/<@(.*?)>/)[1];
    const approvalRequest = body.message.text.split(":")[1];
    await client.chat.postMessage({
        text: `Your request for "${approvalRequest}" got approved by ${body.user.name}`,
        channel: requesterId,
    });
});

// listen to action
app.action("reject_action", async ({ ack, say, body, client }) => {
    await ack();
    await say("Request rejected");
    const requesterId = body.message.text.match(/<@(.*?)>/)[1];
    const approvalRequest = body.message.text.split(":")[1];
    await client.chat.postMessage({
        text: `Your request for "${approvalRequest}" got rejected by ${body.user.name}`,
        channel: requesterId,
    });
});

expressApp.get("/", (req, res) => {
    res.send("Express server running for slack app ⚡️");
});

// running express app
expressApp.listen(process.env.PORT || 3001, () => {
    console.log("Express server running");
});

module.exports = expressApp;