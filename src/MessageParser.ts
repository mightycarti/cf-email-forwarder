import PostalMime from "postal-mime"

/**
 * Converts a ReadableStream of email data to an EML string.
 * @param emailStream - The ReadableStream of the email.
 * @returns A promise that resolves to the EML string.
 */
export async function convertToEML(emailStream: ReadableStream<Uint8Array>): Promise<string> {
    const reader = emailStream.getReader()
    const decoder = new TextDecoder('utf-8')
    let emailString = ''

    try {
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            emailString += decoder.decode(value, { stream: true })
        }
        emailString += decoder.decode()
    } catch (error) {
        console.error("Error converting email to EML:", error)
        throw new Error("Failed to convert email to EML")
    } finally {
        reader.releaseLock()
    }

    return emailString
}

/**
 * Converts a ReadableStream of email data to a JSON string.
 * @param emailStream - The ReadableStream of the email.
 * @returns A promise that resolves to the JSON string.
 */
export async function covertToJSON(emailStream: ReadableStream<Uint8Array>): Promise<string> {
    const parser = new PostalMime()
    let emailString = ''

    try {
        const parsedEmail = await parser.parse(emailStream)
        emailString = JSON.stringify(parsedEmail)
    } catch (error) {
        console.error("Error converting email to JSON:", error)
        throw new Error("Failed to convert email to JSON")
    }

    return emailString
}
