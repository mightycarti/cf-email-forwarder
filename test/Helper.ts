import { vi } from 'vitest'
import { ForwardableEmailMessage } from '@cloudflare/workers-types'

export function MessageBuilder(): ForwardableEmailMessage {
    const from = 'sender@example.com'
	const to = 'recipient@example.com'
	const subject = 'Foo is not bar'
	const body = 'Hello, fun fact that foo is not bar'
	
    const encoder = new TextEncoder()
    const bodyUint8Array = encoder.encode(body)
    const sampleEmailStream = new ReadableStream<Uint8Array>({
        start(controller) {
            controller.enqueue(bodyUint8Array)
            controller.close()
        }
    })

    const sampleMessage: ForwardableEmailMessage = {
        raw: sampleEmailStream,
        rawSize: bodyUint8Array.length,
        setReject: vi.fn(),
        forward: vi.fn(),
        headers: new Headers({ From: from, To: to, Subject: subject, 'Content-Type': 'text/plain' }),
        reply: vi.fn(),
        from,
        to
    }

    return sampleMessage
}