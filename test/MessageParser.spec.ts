import { describe, test, expect } from 'vitest'
import { convertToEML, covertToJSON } from '../src/MessageParser'
import { MessageBuilder } from './Helper'

describe('MessageParser Tests', () => {
    const sampleEmail = MessageBuilder()

    test('convertToEML should convert email stream to EML string', async () => {
        const result = await convertToEML(sampleEmail.raw)
        expect(result).toContain('From: sender@example.com')
        expect(result).toContain('Subject: Foo is not bar')
    })

    test('covertToJSON should convert email stream to JSON string', async () => {
        const result = await covertToJSON(sampleEmail.raw)
        const parsedResult = JSON.parse(result)
        expect(parsedResult).toHaveProperty('headers')
        expect(parsedResult.headers).toHaveProperty('from')
        expect(parsedResult.headers.from).toBe('sender@example.com')
    })
})
