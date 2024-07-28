import PostalMime from "postal-mime"

/**
 * Converts a raw email message stream to an EML string format.
 * @param {ReadableStream<Uint8Array>} rawMessage - The raw email message as a readable stream.
 * @returns {Promise<string>} - A promise that resolves to the EML string representation of the email.
 */
export async function convertToEML(rawMessage: ReadableStream<Uint8Array>): Promise<string> {
    const reader = rawMessage.getReader() // Obtain a reader from the readable stream
    const decoder = new TextDecoder('utf-8') // Create a TextDecoder for UTF-8 decoding
    let emlString = '' // Initialize an empty string to accumulate the EML content

    try {
        while (true) {
            const { done, value } = await reader.read() // Read chunks from the stream
            if (done) break // Exit loop when the stream is fully read
            emlString += decoder.decode(value, { stream: true }) // Decode the chunk and append to the EML string
        }

        emlString += decoder.decode() // Decode any remaining bytes
    } catch (error) {
        console.error("Error converting email to EML:", error) // Log any errors encountered
        throw new Error("Failed to convert email to EML") // Throw a new error if conversion fails
    } finally {
        reader.releaseLock() // Release the reader's lock on the stream
    }

    return emlString // Return the complete EML string
}

/**
 * Converts an EML string to a JSON representation using the PostalMime library.
 * @param {string} stringMessage - The EML string to be converted.
 * @returns {Promise<string>} - A promise that resolves to the JSON string representation of the email.
 */
export async function convertToJSON(stringMessage: string): Promise<string> {
    try {
        const parser = new PostalMime() // Initialize the PostalMime parser
        const parsedEmail = await parser.parse(stringMessage) // Parse the EML string to an object
        return JSON.stringify(parsedEmail) // Convert the parsed email object to a JSON string
    } catch (error) {
        console.error("Error converting email to JSON:", error) // Log any errors encountered
        throw new Error("Failed to convert email to JSON") // Throw a new error if conversion fails
    }
}
