import { describe, test, expect } from 'vitest'
import { getRawMessage } from '../src/helper/email'
import { convertToJSON, convertToEML } from '../src/utils/email'

describe('Email Parser Test', async () => {
    // Initialize the raw email message stream
    const rawMessage = getRawMessage()
    // Convert the raw message stream to an EML string
    const dataEML = await convertToEML(rawMessage)

    // Test case for converting EML string to JSON string
    test('convertToJSON should convert email stream to JSON string', async () => {
        const result = await convertToJSON(dataEML) // Convert EML to JSON
        const parsedResult = JSON.parse(result) // Parse the JSON string
        expect(parsedResult).toHaveProperty('from') // Check if the 'from' property exists
        expect(parsedResult.from.address).toBe('sender@example.com') // Check if the 'from' address matches the expected value
    })

    // Test case for converting email stream to EML string
    test('convertToEML should convert email stream to EML string', () => {
        const result = dataEML // Use the previously converted EML string
        expect(result).toContain('From: sender@example.com') // Check if the EML string contains the expected 'From' address
        expect(result).toContain('Subject: Foo is not bar') // Check if the EML string contains the expected 'Subject' line
    })
})
