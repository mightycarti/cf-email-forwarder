import { describe, test, expect, vi } from 'vitest'
import { sendWebhook } from '../src/utils/webhook'
describe('Webhook Tests', () => {
    const sampleUrl = 'http://example.com' // Sample URL for the webhook
    const sampleData = 'Test data' // Sample data to be sent

    // Test case for successful webhook call
    test('sendWebhook should send data and return a response', async () => {
        // Mock the global fetch function to simulate a successful response
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ success: true })
        } as Response)

        const response = await sendWebhook(sampleUrl, sampleData, 'text/plain') // Call the sendWebhook function
        expect(response.ok).toBe(true) // Check if the response is successful
        expect(response.status).toBe(200) // Check if the status code is 200
    })

    // Test case for handling HTTP errors
    test('sendWebhook should handle HTTP errors', async () => {
        // Mock the global fetch function to simulate an HTTP error response
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error'
        } as Response)
        await expect(sendWebhook(sampleUrl, sampleData, 'text/plain')).rejects.toThrow('Error: HTTP error! status: 500') // Expect an error to be thrown
    })

    // Test case for handling network errors
    test('sendWebhook should handle network errors', async () => {
        // Mock the global fetch function to simulate a network error
        global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))
        await expect(sendWebhook(sampleUrl, sampleData, 'text/plain')).rejects.toThrow('Failed to send webhook') // Expect an error to be thrown
    })
})
