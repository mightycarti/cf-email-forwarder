import { describe, test, expect, vi } from 'vitest'
import { sendWebhook } from '../src/Webhook'

describe('Webhook Tests', () => {
    const sampleUrl = 'https://webhook-test.com/4d00c8e5a0ad9c8789cd17499ddffd03'
    const sampleData = 'Test data'

    test('sendWebhook should send data and return a response', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ success: true })
        } as Response)

        const response = await sendWebhook(sampleUrl, sampleData)
        expect(response.ok).toBe(true)
        expect(response.status).toBe(200)
    })

    test('sendWebhook should handle HTTP errors', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error'
        } as Response)
        await expect(sendWebhook(sampleUrl, sampleData)).rejects.toThrow('Failed to send webhook')
    })

    test('sendWebhook should handle network errors', async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))
        await expect(sendWebhook(sampleUrl, sampleData)).rejects.toThrow('Failed to send webhook')
    })
})
