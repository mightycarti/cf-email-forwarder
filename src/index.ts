import { convertToEML, convertToJSON } from "./utils/email"
import { sendWebhook } from "./utils/webhook"
import { ForwardableEmailMessage } from '@cloudflare/workers-types'

export interface Env {
    WEBHOOK_URL: string
}

export default {
    /**
     * Handles incoming email messages, converts them to EML and JSON, and forwards them via webhook.
     * @param message - The incoming email message.
     * @param env - Environment bindings.
     * @param ctx - Execution context.
     * @returns A promise resolving to any result.
     */
    async email(message: ForwardableEmailMessage, env: any, ctx?:any): Promise<void> {
        try {
            // Get Uint8Array raw message
            const rawMessage = message.raw

            // Get webhook url from wrangler env [vars] => wrangler.toml
            const webhookUrl = env.WEBHOOK_URL
            
            // Convert raw message to readable string
            const dataEML = await convertToEML(rawMessage)

            // Convert readable eml string to JSON
            const dataJSON = await convertToJSON(dataEML)

            // Send JSON data to webhook
            const sendJSON = await sendWebhook(webhookUrl, dataJSON, 'application/json')
            if (sendJSON.ok) {
                console.log('Email JSON forwarded successfully')
            } else {
                console.error('Failed to forward email JSON', sendJSON.statusText)
            }

            // Send EML data to webhook
            const sendEML = await sendWebhook(webhookUrl, dataEML, 'text/plain')
            if (sendEML.ok) {
                console.log('Email EML forwarded successfully')
            } else {
                console.error('Failed to forward email EML', sendEML.statusText)
            }
        } catch (error) {
            console.error("Error processing email:", error)
            throw new Error("Failed to process and forward email")
        }
    }
} satisfies ExportedHandler<Env>