import { convertToEML, covertToJSON } from "./MessageParser";
import { sendWebhook } from "./Webhook";
import { ForwardableEmailMessage, Headers } from '@cloudflare/workers-types'

export default {
    /**
     * Handles incoming email messages, converts them to EML and JSON, and forwards them via webhook.
     * @param message - The incoming email message.
     * @param env - Environment bindings.
     * @param ctx - Execution context.
     * @returns A promise resolving to any result.
     */
    async email(message: ForwardableEmailMessage): Promise<any> {
        const emailStream = message.raw;
        const webhookUrl = '<WEBHOOK_URL>';

        try {
            const dataEML = await convertToEML(emailStream);
            const sendEML = await sendWebhook(webhookUrl, dataEML);
            if (sendEML.ok) {
                console.log('Email EML forwarded successfully');
            } else {
                console.error('Failed to forward email EML', sendEML.statusText);
            }

            const dataJSON = await covertToJSON(emailStream);
            const sendJSON = await sendWebhook(webhookUrl, dataJSON);
            if (sendJSON.ok) {
                console.log('Email JSON forwarded successfully');
            } else {
                console.error('Failed to forward email JSON', sendJSON.statusText);
            }
        } catch (error) {
            console.error("Error processing email:", error);
            throw new Error("Failed to process and forward email");
        }
    }
} satisfies ExportedHandler<Env>;
