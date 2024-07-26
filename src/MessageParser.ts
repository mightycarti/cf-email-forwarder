import PostalMime from "postal-mime"

export async function convertToEML(emailStream: ReadableStream<Uint8Array>): Promise<string> {
    const reader = emailStream.getReader()
    const decoder = new TextDecoder('utf-8')

    let emailString = ''

    while (true) {
        const { done, value } = await reader.read()
        if (done) break
        emailString += decoder.decode(value, { stream: true })
    }

    emailString += decoder.decode()

    return emailString
}

export async function covertToJSON(emailStream: ReadableStream<Uint8Array>): Promise<string> {
    const parser = new PostalMime()
    const parsedEmail = await parser.parse(emailStream)
    const emailString = JSON.stringify(parsedEmail)

    return emailString
}