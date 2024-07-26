export async function sendWebhook(webhookUrl: string, data: string): Promise<Response> {
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: data
    })

    return response
}