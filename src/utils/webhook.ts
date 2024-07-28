/**
 * Sends a webhook POST request to the specified URL with the provided data and content type.
 *
 * @param {string} webhookUrl - The URL of the webhook endpoint to send the request to.
 * @param {string} data - The stringified data to be sent in the body of the POST request.
 * @param {string} contentType - The content type of the request body (e.g., 'application/json').
 * @returns {Promise<Response>} - A promise that resolves to the Response object if the request is successful.
 * @throws {Error} - Throws an error if the response status is not OK or if there is a network error.
 */
export async function sendWebhook(webhookUrl: string, data: string, contentType: string): Promise<Response> {
    try {
        // Perform the fetch request to the specified webhook URL
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': contentType
            },
            body: data
        })

        // Check if the response status is OK (status code 200-299)
        if (!response.ok) {
            // If the response is not OK, throw an error with the status code
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        // Return the response object if the request was successful
        return response
    } catch (error: any) {
        // Log the error to the console for debugging purposes
        console.error(error)

        // If the error message includes 'HTTP error', rethrow the error
        if (error.message.includes('HTTP error')) throw new Error(error)

        // If the error is not an HTTP error, throw a generic error message
        throw new Error('Failed to send webhook')
    }
}
