export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    isThinking?: boolean;
    isStreaming?: boolean;
}

export interface ChatState {
    messages: ChatMessage[];
    isGenerating: boolean;
    error: string | null;
}
