/**
 * Sends data to a webhook URL via HTTP POST request.
 * @param webhookUrl - The URL of the webhook.
 * @param data - The data to send in the request body.
 * @returns A promise that resolves to the Response object.
 */
export async function sendWebhook(webhookUrl: string, data: string): Promise<Response> {
    try {
        console.log(webhookUrl)
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: data
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response
    } catch (error) {
        console.log(error)
        throw new Error("Failed to send webhook")
    }
}
