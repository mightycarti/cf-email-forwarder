/**
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 */

import { convertToEML, covertToJSON } from "./MessageParser";
import { sendWebhook } from "./Webhook";

export default {
	async email(message, env, ctx): Promise<any> {
		const emailStream = message.raw
		const dataEML = await convertToEML(emailStream)
		const dataJSON = await covertToJSON(emailStream)

		const webhookUrl = '<WEBHOOK_URL>';
		
		const sendEML = await sendWebhook(webhookUrl, dataEML)
		if (sendEML.ok) console.log('Email EML forwarded successfully')
		else console.error('Failed to forward email', sendEML.statusText)

		const sendJSON = await sendWebhook(webhookUrl, dataJSON)
		if (sendJSON.ok) console.log('Email EML forwarded successfully')
		else console.error('Failed to forward email', sendJSON.statusText)
	}
} satisfies ExportedHandler<Env>;