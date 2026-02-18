import Bytez from 'bytez.js';

const SYSTEM_PROMPT = `You are a health information assistant designed ONLY to provide general, educational, and preventive health information.

YOUR ROLE
- Provide factual, evidence-based health information.
- Support public health awareness, lifestyle guidance, nutrition basics, exercise safety, mental wellness, and first-aid awareness.
- Explain health topics in simple, calm, neutral language.

STRICT RULES (MANDATORY)
1. You MUST NOT:
   - Diagnose medical conditions.
   - Prescribe medications or supplements.
   - Recommend dosages, treatment plans, or cures.
   - Interpret medical test results.
   - Provide emergency decision-making advice.
   - Make definitive or absolute medical claims.

2. If a user asks for diagnosis, treatment, medication, dosage, or emergency instructions:
   - Politely refuse.
   - Explain that you cannot provide medical advice.
   - Encourage consulting a licensed healthcare professional.

3. If symptoms are mentioned:
   - Provide ONLY general educational information.
   - Avoid naming specific diseases as a diagnosis.
   - Encourage medical consultation.

4. If emergency symptoms are detected (e.g., chest pain, difficulty breathing, unconsciousness, severe bleeding, stroke signs):
   - Immediately advise seeking emergency medical help.
   - Do NOT provide any other guidance.

SOURCE CONTROL
- Answer ONLY using trusted health authorities such as WHO, government health agencies, recognized medical institutions.
- Do NOT speculate or guess.
- If information is uncertain or unavailable, clearly state that.

STYLE & TONE
- Calm, respectful, neutral, and supportive.
- Clear and non-alarming language.
- No humor, slang, or emotional manipulation.
- No assumptions about the user's condition.
- Use bullet points and short paragraphs for readability.
- Use bold (**text**) for emphasis on key terms.

DISCLAIMER (REQUIRED IN SENSITIVE TOPICS)
Include this disclaimer when relevant:
"This information is for general health education only and is not a substitute for professional medical advice, diagnosis, or treatment."

FAIL-SAFE BEHAVIOR
- When unsure, say "I don't have enough reliable information to answer that safely."
- When boundaries are crossed, refuse clearly and redirect safely.
- Safety always takes priority over completeness.

OUTPUT FORMAT
- Short paragraphs or bullet points.
- No long explanations unless explicitly requested.
- Keep responses concise but informative.

Your purpose is to INFORM, not to TREAT.`;

const BYTEZ_API_KEY = '7ff8d2c408d19a533f6ca100ebcc94f9';

const sdk = new Bytez(BYTEZ_API_KEY);
const model = sdk.model('google/gemini-3-pro-preview');

// Maintain conversation history
let conversationHistory: { role: string; content: string }[] = [];

export function resetChat() {
    conversationHistory = [];
}

const RETRY_DELAYS = [3000, 6000, 10000];

function isRateLimitError(error: any): boolean {
    const msg = String(error?.message || error || '').toLowerCase();
    return (
        msg.includes('rate') ||
        msg.includes('quota') ||
        msg.includes('429') ||
        msg.includes('too many') ||
        msg.includes('resource has been exhausted')
    );
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateResponseStream(
    userInput: string,
    onChunk: (text: string) => void,
    onThinkingStart: () => void,
    onThinkingEnd: () => void,
    onComplete: () => void,
    onError: (error: string) => void,
    onRetryWait?: (secondsLeft: number) => void
) {
    let lastError: any = null;

    // Add user message to history
    conversationHistory.push({ role: 'user', content: userInput });

    // Build messages array with system prompt
    const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...conversationHistory,
    ];

    for (let attempt = 0; attempt <= RETRY_DELAYS.length; attempt++) {
        try {
            onThinkingStart();

            // Try streaming first
            try {
                const streamResponse: any = await model.run(messages, { stream: true });
                let firstChunk = true;
                let fullResponse = '';

                // Handle both ReadableStream and Response objects
                const body = streamResponse?.body ?? streamResponse;
                if (!body || typeof body.pipeThrough !== 'function') {
                    throw new Error('STREAMING_NOT_SUPPORTED');
                }

                const textStream = body.pipeThrough(new TextDecoderStream());
                for await (const chunk of textStream) {
                    if (firstChunk) {
                        onThinkingEnd();
                        firstChunk = false;
                    }
                    if (chunk) {
                        fullResponse += chunk;
                        onChunk(chunk);
                    }
                }

                // Save assistant response to history
                conversationHistory.push({ role: 'assistant', content: fullResponse });
                onComplete();
                return;
            } catch (streamErr: any) {
                // Streaming not supported for this model, fall back to non-streaming
                if (streamErr?.message !== 'STREAMING_NOT_SUPPORTED') {
                    // If it's a real error (not just unsupported streaming), rethrow
                    throw streamErr;
                }
                const { error, output } = await model.run(messages);

                onThinkingEnd();

                if (error) {
                    throw new Error(String(error));
                }

                // Extract text from output
                let responseText = '';
                if (typeof output === 'string') {
                    responseText = output;
                } else if (output?.message?.content) {
                    responseText = output.message.content;
                } else if (output?.content) {
                    responseText = output.content;
                } else if (Array.isArray(output)) {
                    responseText = output.map((o: any) => o?.generated_text || o?.content || o?.message?.content || String(o)).join('');
                } else {
                    responseText = JSON.stringify(output);
                }

                // Simulate streaming for smooth UX
                const words = responseText.split(/(\s+)/);
                for (let i = 0; i < words.length; i++) {
                    onChunk(words[i]);
                    if (i < words.length - 1) {
                        await sleep(15);
                    }
                }

                // Save assistant response to history
                conversationHistory.push({ role: 'assistant', content: responseText });
                onComplete();
                return;
            }
        } catch (error: any) {
            onThinkingEnd();
            lastError = error;

            // Rate limit — auto-retry with delay
            if (isRateLimitError(error) && attempt < RETRY_DELAYS.length) {
                const delayMs = RETRY_DELAYS[attempt];
                const totalSec = Math.ceil(delayMs / 1000);

                for (let s = totalSec; s > 0; s--) {
                    onRetryWait?.(s);
                    await sleep(1000);
                }
                onRetryWait?.(0);
                continue;
            }

            break;
        }
    }

    // Remove the user message from history since we failed
    conversationHistory.pop();

    // Final error classification
    const errMsg = String(lastError?.message || lastError || '').toLowerCase();
    if (errMsg.includes('api') && (errMsg.includes('key') || errMsg.includes('auth'))) {
        onError('API_KEY_INVALID');
    } else if (isRateLimitError(lastError)) {
        onError('RATE_LIMITED');
    } else {
        onError('UNKNOWN');
    }
}
