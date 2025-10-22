import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { askAboutCv } from '../services/geminiService';
import { SendIcon, BotIcon, XIcon } from './Icons';

interface AIChatBotProps {
    onClose: () => void;
}

export const AIChatBot: React.FC<AIChatBotProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'bot', text: "Hello! I answer only from Nawazuddin's resume. Ask me anything about his CV and I'll reply with information present in the resume." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const botResponseText = await askAboutCv(input);
        const botMessage: ChatMessage = { sender: 'bot', text: botResponseText };

        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }

    return (
        <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden w-[calc(100vw-2rem)] max-w-md h-[70vh] max-h-[600px] flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between gap-3 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <BotIcon className="w-6 h-6 text-teal-500" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">AI Assistant</h3>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors">
                    <XIcon className="w-6 h-6"/>
                </button>
            </div>
            <div className="p-4 flex-grow overflow-y-auto">
                <div className="space-y-4">
                    {messages.length === 1 && (
                        <div className="space-y-3 mb-4">
                            <p className="text-xs text-slate-500 dark:text-slate-400">Popular questions:</p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "📱 Contact details?",
                                    "💼 Current role?",
                                    "📊 Experience summary",
                                    "🛠️ Tools & systems used?",
                                    "🎯 Core skills?",
                                    "🗣️ Languages known?",
                                    "🏢 Experience at PayPal?",
                                    "🎓 Education background?"
                                ].map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setInput(q.replace(/^[^ ]+ /, '')); // Remove emoji prefix
                                            handleSend();
                                        }}
                                        className="text-xs bg-gray-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-slate-700/80 transition-all"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'bot' && <div className="w-8 h-8 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-200 dark:border-slate-600"><BotIcon className="w-5 h-5 text-teal-500"/></div>}
                            <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-teal-500 text-white' : 'bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}>
                                <p className="text-sm break-words">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start">
                             <div className="w-8 h-8 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-200 dark:border-slate-600"><BotIcon className="w-5 h-5 text-teal-500"/></div>
                            <div className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                     <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-slate-700 flex items-center gap-2 flex-shrink-0 bg-white/80 dark:bg-slate-800/60">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                        [
                            "What were his responsibilities at PayPal?",
                            "Which AML/KYC tools is he familiar with?",
                            "What languages does he speak?",
                            "How many years of experience does he have?",
                            "What fraud typologies has he investigated?"
                        ][Math.floor(Date.now() / 5000) % 5]
                    }
                    className="flex-grow bg-gray-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-400 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500 transition border border-transparent focus:border-teal-400"
                    disabled={isLoading}
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="bg-teal-500 text-white rounded-full p-2.5 hover:bg-teal-600 disabled:bg-gray-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800"
                    aria-label="Send message"
                >
                    <SendIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};