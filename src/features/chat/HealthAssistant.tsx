import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Send, Bot, User, RotateCcw, AlertCircle, ChevronDown,
} from 'lucide-react';
import { generateResponseStream, resetChat } from './chatEngine';
import type { ChatMessage } from './chatTypes';

let messageIdCounter = 0;
const createId = () => `msg-${++messageIdCounter}-${Date.now()}`;

const BOT_ICON_URL = "/chat-icon.jpg";

const WELCOME: ChatMessage = {
    id: 'welcome',
    role: 'assistant',
    content: `Hello! I'm your **Health Assistant** — powered by AI.\n\nI can help you with general health education topics like:\n\n• Nutrition & healthy eating\n• Exercise & physical activity\n• Mental wellness & stress management\n• Sleep, hydration, and daily habits\n• First aid awareness & disease prevention\n\nJust type your question below to get started.\n\n*I provide educational information only and cannot offer medical advice, diagnoses, or treatment recommendations.*`,
    timestamp: new Date(),
};

/* ─────────────────────────── THINKING DOTS ─────────────────────────── */
const ThinkingIndicator = ({ retryCountdown }: { retryCountdown: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="flex items-start gap-4 px-2"
    >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-400/10 dark:to-indigo-400/10 flex items-center justify-center shrink-0 mt-1 overflow-hidden ring-1 ring-white/20">
            <BotIcon />
        </div>
        <div className="bg-white/40 dark:bg-white/[0.02] border border-white/20 dark:border-white/[0.05] backdrop-blur-3xl rounded-[2rem] rounded-tl-md px-6 py-4 shadow-sm">
            <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium tracking-wide text-slate-400 dark:text-slate-500 mr-1">
                    {retryCountdown > 0 ? `RETRYING IN ${retryCountdown}S` : 'THINKING'}
                </span>
                <motion.span className="w-1 h-1 rounded-full bg-blue-500/50" animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <motion.span className="w-1 h-1 rounded-full bg-blue-500/50" animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
                <motion.span className="w-1 h-1 rounded-full bg-blue-500/50" animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} />
            </div>
        </div>
    </motion.div>
);

const BotIcon = () => {
    const [hasError, setHasError] = useState(false);
    if (hasError) return <Bot size={20} className="text-blue-500/70" />;
    return <img src={BOT_ICON_URL} alt="Bot" className="w-full h-full object-cover font-sans" onError={() => setHasError(true)} />;
};

/* ─────────────────────────── MARKDOWN RENDERER ─────────────────────────── */
const RenderMarkdown = ({ text }: { text: string }) => {
    const lines = text.split('\n');
    return (
        <div className="space-y-2">
            {lines.map((line, i) => {
                const processInline = (str: string) => {
                    const parts: (string | JSX.Element)[] = [];
                    const boldRegex = /\*\*(.+?)\*\*/g;
                    let lastIdx = 0;
                    let m;
                    while ((m = boldRegex.exec(str)) !== null) {
                        if (m.index > lastIdx) parts.push(str.slice(lastIdx, m.index));
                        parts.push(<strong key={m.index} className="font-semibold text-slate-900 dark:text-white/90">{m[1]}</strong>);
                        lastIdx = m.index + m[0].length;
                    }
                    if (lastIdx < str.length) parts.push(str.slice(lastIdx));
                    return parts.length > 0 ? parts : [str];
                };

                if (line.startsWith('### ')) return <h4 key={i} className="font-semibold text-[15px] text-slate-900 dark:text-white mt-4 mb-2 tracking-tight">{processInline(line.slice(4))}</h4>;
                if (line.startsWith('## ')) return <h3 key={i} className="font-bold text-lg text-slate-950 dark:text-white mt-6 mb-2 tracking-tight">{processInline(line.slice(3))}</h3>;

                const bulletMatch = line.match(/^(\s*)[•\-*]\s+(.*)$/);
                if (bulletMatch) return (
                    <div key={i} className="flex gap-3 ml-1 my-1.5">
                        <span className="text-blue-500 dark:text-blue-400/70 mt-[6px] shrink-0 w-1 h-1 rounded-full bg-current" />
                        <span className="flex-1 text-[14px] leading-relaxed text-slate-600 dark:text-slate-400 tracking-wide">{processInline(bulletMatch[2])}</span>
                    </div>
                );
                if (line.trim() === '') return <div key={i} className="h-2" />;
                return <div key={i} className="text-[14px] leading-relaxed text-slate-600 dark:text-slate-400 tracking-wide font-light">{processInline(line)}</div>;
            })}
        </div>
    );
};

/* ─────────────────────────── ERROR BANNER ─────────────────────────── */
const ErrorBanner = ({ error, onRetry }: { error: string; onRetry: () => void }) => {
    const messages: Record<string, { title: string; desc: string }> = {
        API_KEY_MISSING: {
            title: 'API Key Not Found',
            desc: 'The Bytez API key is missing. Please check the chatEngine configuration.',
        },
        API_KEY_INVALID: {
            title: 'Invalid API Key',
            desc: 'The API key appears to be invalid. Please check your Bytez key.',
        },
        RATE_LIMITED: {
            title: 'Rate Limited',
            desc: 'Too many requests. Retries exhausted — please wait a moment and try again.',
        },
        UNKNOWN: {
            title: 'Something went wrong',
            desc: 'An unexpected error occurred. Please try again.',
        },
    };
    const msg = messages[error] || messages.UNKNOWN;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-1 p-3 rounded-xl bg-red-50/80 dark:bg-red-500/10 border border-red-200/60 dark:border-red-500/20 flex items-start gap-3"
        >
            <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-red-700 dark:text-red-400">{msg.title}</p>
                <p className="text-[11px] text-red-600/70 dark:text-red-400/70 mt-0.5">{msg.desc}</p>
            </div>
            <button onClick={onRetry} className="shrink-0 w-7 h-7 rounded-lg bg-red-100 dark:bg-red-500/20 flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors cursor-pointer">
                <RotateCcw size={12} className="text-red-600 dark:text-red-400" />
            </button>
        </motion.div>
    );
};

/* ─────────────────────────── SCROLL BUTTON ─────────────────────────── */
const ScrollToBottom = ({ onClick, visible }: { onClick: () => void; visible: boolean }) => (
    <AnimatePresence>
        {visible && (
            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={onClick}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
                <ChevronDown size={16} className="text-slate-500" />
            </motion.button>
        )}
    </AnimatePresence>
);

/* ═══════════════════════════ MAIN COMPONENT ═══════════════════════════ */
export const HealthAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const [retryCountdown, setRetryCountdown] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const popupShownRef = useRef(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    /* ── Auto-scroll ── */
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (!showScrollBtn) scrollToBottom();
    }, [messages, isThinking, scrollToBottom, showScrollBtn]);

    useEffect(() => {
        if (isOpen) setTimeout(() => textareaRef.current?.focus(), 300);
    }, [isOpen]);

    /* ── Popup tooltip timer ── */
    useEffect(() => {
        if (popupShownRef.current) return;
        const showTimer = setTimeout(() => {
            if (!isOpen) {
                setShowPopup(true);
                popupShownRef.current = true;
            }
        }, 4000);
        return () => clearTimeout(showTimer);
    }, [isOpen]);

    useEffect(() => {
        if (!showPopup) return;
        const hideTimer = setTimeout(() => setShowPopup(false), 6000);
        return () => clearTimeout(hideTimer);
    }, [showPopup]);

    /* ── Scroll detection ── */
    const handleScroll = () => {
        if (!chatContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
    };

    /* ── Auto-resize textarea ── */
    const adjustTextarea = () => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    };

    /* ── Send message ── */
    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed || isGenerating) return;

        setError(null);
        const userMsg: ChatMessage = { id: createId(), role: 'user', content: trimmed, timestamp: new Date() };
        const botId = createId();

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsGenerating(true);
        setShowScrollBtn(false);

        // Reset textarea height
        if (textareaRef.current) textareaRef.current.style.height = 'auto';

        let botContent = '';

        await generateResponseStream(
            trimmed,
            // onChunk
            (text) => {
                botContent += text;
                setMessages((prev) => {
                    const existing = prev.find((m) => m.id === botId);
                    if (existing) {
                        return prev.map((m) => (m.id === botId ? { ...m, content: botContent, isStreaming: true } : m));
                    }
                    return [
                        ...prev,
                        { id: botId, role: 'assistant', content: botContent, timestamp: new Date(), isStreaming: true },
                    ];
                });
            },
            // onThinkingStart
            () => setIsThinking(true),
            // onThinkingEnd
            () => setIsThinking(false),
            // onComplete
            () => {
                setMessages((prev) => prev.map((m) => (m.id === botId ? { ...m, isStreaming: false } : m)));
                setIsGenerating(false);
            },
            // onError
            (err) => {
                setError(err);
                setIsGenerating(false);
                setIsThinking(false);
                setRetryCountdown(0);
            },
            // onRetryWait
            (secondsLeft) => {
                setRetryCountdown(secondsLeft);
                if (secondsLeft > 0) {
                    setIsThinking(true);
                }
            }
        );
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleNewChat = () => {
        resetChat();
        setMessages([WELCOME]);
        setError(null);
        setIsGenerating(false);
        setIsThinking(false);
    };

    const retryLast = () => {
        setError(null);
        const lastUser = [...messages].reverse().find((m) => m.role === 'user');
        if (lastUser) {
            setInput(lastUser.content);
            // Remove last user message and any incomplete bot message
            setMessages((prev) => {
                const idx = prev.lastIndexOf(lastUser);
                return prev.slice(0, idx);
            });
        }
    };

    return (
        <>
            {/* ════════════ FAB BUTTON + POPUP ════════════ */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-5"
                    >
                        {/* Premium Arrival Toast */}
                        <AnimatePresence>
                            {showPopup && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                                    onClick={() => { setShowPopup(false); setIsOpen(true); }}
                                    className="relative cursor-pointer group"
                                >
                                    <div className="px-5 py-3 md:px-6 md:py-4 rounded-2xl md:rounded-[2rem] bg-white/70 dark:bg-black/40 backdrop-blur-3xl border border-white/40 dark:border-white/10 shadow-2xl shadow-black/10 transition-all hover:scale-105 active:scale-95">
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                                <Bot size={12} className="text-blue-500 md:size-[14px]" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] md:text-[13px] font-semibold text-slate-900 dark:text-white tracking-wide">HEALTH ASSISTANT</p>
                                                <p className="text-[9px] md:text-[11px] text-slate-500 dark:text-slate-400 font-light md:mt-0.5">Start a conversation</p>
                                            </div>
                                        </div>
                                        <button onClick={(e) => { e.stopPropagation(); setShowPopup(false); }} className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[8px] md:text-[10px] text-slate-400 hover:text-red-500 transition-colors">✕</button>
                                    </div>
                                    <div className="absolute -bottom-1.5 right-6 md:right-8 w-3 h-3 bg-white/70 dark:bg-black/40 border-r border-b border-white/40 dark:border-white/10 rotate-45 backdrop-blur-3xl" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* FAB Button */}
                        <button
                            onClick={() => { setShowPopup(false); setIsOpen(true); }}
                            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[2rem] bg-black dark:bg-white text-white dark:text-black shadow-2xl shadow-black/30 dark:shadow-white/10 flex items-center justify-center hover:scale-[1.08] active:scale-90 transition-all duration-500 group relative overflow-hidden"
                            aria-label="Open Health Assistant"
                        >
                            <div className="w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-700 group-hover:scale-110">
                                <BotIcon />
                            </div>
                            <span className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-[3px] border-black dark:border-white animate-pulse" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ════════════ CHAT PANEL ════════════ */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 32 }}
                        className="fixed z-50
                            bottom-0 right-0 w-full h-[85%]
                            md:bottom-8 md:right-8 md:w-[480px] md:h-[720px] md:max-h-[calc(100vh-60px)]
                            rounded-t-[2.5rem] md:rounded-[3rem]
                            flex flex-col overflow-hidden
                            border border-white/30 dark:border-white/[0.08]
                            shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] dark:md:shadow-black/70"

                        style={{
                            background: 'rgba(255,255,255,0.7)',
                            backdropFilter: 'blur(50px) saturate(210%) font-smoothing: antialiased',
                            WebkitBackdropFilter: 'blur(50px) saturate(210%)',
                        }}
                    >
                        {/* Apple-style vibrance layer */}
                        <div className="absolute inset-0 bg-blue-50/5 dark:bg-blue-900/5 pointer-events-none" />
                        <div className="absolute inset-0 bg-transparent dark:bg-black/60 pointer-events-none sm:rounded-[3rem]" />

                        {/* HEADER */}
                        <div className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10 dark:border-white/[0.03]">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-[1.2rem] bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 flex items-center justify-center shadow-xl shadow-blue-500/20 overflow-hidden ring-1 ring-white/20">
                                    <BotIcon />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-slate-900 dark:text-white tracking-tight">Health Assistant</h3>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <div className="flex gap-0.5">
                                            <motion.span className="w-1 h-1 rounded-full bg-emerald-500" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                                        </div>
                                        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium tracking-widest uppercase">SYNERGY AI ACTIVE</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={handleNewChat} className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 transition-all cursor-pointer"><RotateCcw size={16} /></button>
                                <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 transition-all cursor-pointer"><X size={20} /></button>
                            </div>
                        </div>

                        {/* MESSAGES */}
                        <div ref={chatContainerRef} onScroll={handleScroll} className="relative z-10 flex-1 overflow-y-auto px-4 md:px-6 py-6 md:py-8 space-y-6 md:space-y-8 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 28, delay: idx === messages.length - 1 ? 0 : 0.05 }}
                                    className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.role === 'assistant' && (
                                        <div className="w-10 h-10 rounded-[1rem] bg-white/40 dark:bg-white/[0.04] border border-white/20 dark:border-white/[0.05] flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
                                            <BotIcon />
                                        </div>
                                    )}
                                    <div className={`max-w-[90%] md:max-w-[85%] rounded-2xl md:rounded-[2rem] px-4 py-3 md:px-6 md:py-4 transition-all duration-300 ${msg.role === 'user'
                                        ? 'bg-black text-white dark:bg-white dark:text-black rounded-tr-sm shadow-xl shadow-black/5 dark:shadow-white/5'
                                        : 'bg-white/30 dark:bg-white/[0.02] border border-white/30 dark:border-white/[0.06] rounded-tl-sm'}`}>
                                        {msg.role === 'assistant' ? <RenderMarkdown text={msg.content} /> : <p className="text-[14px] leading-relaxed tracking-wide font-light">{msg.content}</p>}
                                        {msg.isStreaming && <motion.span className="inline-block w-1.5 h-1.5 bg-blue-500 ml-2 rounded-full align-middle mb-1" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} />}
                                    </div>
                                    {msg.role === 'user' && (
                                        <div className="w-10 h-10 rounded-[1rem] bg-slate-100 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5 border border-white/20 dark:border-white/5 overflow-hidden">
                                            <div className="w-full h-full flex items-center justify-center opacity-70">
                                                <User size={18} />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {/* Thinking indicator */}
                            <AnimatePresence>{isThinking && <ThinkingIndicator retryCountdown={retryCountdown} />}</AnimatePresence>

                            {/* Error banner */}
                            {error && <ErrorBanner error={error} onRetry={retryLast} />}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Scroll-to-bottom button */}
                        <div className="relative z-20">
                            <ScrollToBottom onClick={scrollToBottom} visible={showScrollBtn} />
                        </div>

                        {/* INPUT */}
                        <div className="relative z-10 px-4 md:px-6 pb-6 md:pb-8 pt-3 md:pt-4 border-t border-white/10 dark:border-white/[0.03]">
                            <div className={`flex items-end gap-2 md:gap-3 rounded-[1.5rem] md:rounded-[2rem] px-4 py-3 md:px-6 md:py-4 border transition-all duration-500 ${isGenerating
                                ? 'bg-black/5 dark:bg-white/5 border-transparent'
                                : 'bg-white/60 dark:bg-white/[0.04] border-white/40 dark:border-white/[0.08] focus-within:border-blue-500/30 dark:focus-within:border-blue-400/20 focus-within:bg-white/90 dark:focus-within:bg-white/[0.08] focus-within:shadow-2xl focus-within:shadow-blue-500/10'}`}>
                                <textarea ref={textareaRef} value={input} onChange={(e) => { setInput(e.target.value); adjustTextarea(); }} onKeyDown={handleKeyDown} placeholder={isGenerating ? 'Synthesizing...' : 'Health inquiry...'} disabled={isGenerating} rows={1} className="flex-1 bg-transparent text-[13px] md:text-[14px] text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none resize-none leading-relaxed max-h-[140px] disabled:opacity-50 font-light tracking-wide" />
                                <button onClick={handleSend} disabled={!input.trim() || isGenerating} className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:scale-110 active:scale-90 transition-all cursor-pointer mb-0.5 shadow-lg shadow-black/10 dark:shadow-white/5"><Send size={14} className="md:size-[16px]" /></button>
                            </div>
                            <p className="text-[10px] text-center mt-3 text-slate-400 dark:text-slate-600 tracking-[0.15em] font-medium opacity-50 uppercase">
                                PROCESSED BY SYNERGY AI · EDUCATIONAL MODE
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence >
        </>
    );
};
