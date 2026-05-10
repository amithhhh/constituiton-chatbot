import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Scale, FileText, Share2, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getConstitutionResponse } from '../../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { cn } from '../../lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
  if (!input.trim() || isLoading) return;

  const userMessage: Message = { role: 'user', content: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput('');
  setIsLoading(true);

  try {
    const aiResponse = await getConstitutionResponse(input);

    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: aiResponse,
      },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content:
          "⚠️ Backend error. Please check Django server or API connection.",
      },
    ]);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] pt-16 md:pt-20 pb-32 max-w-7xl mx-auto px-4 w-full">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-8 scroll-smooth pb-12"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-20">
            <Scale className="w-16 h-16 mb-4 text-primary" />
            <h2 className="text-2xl font-bold text-primary">Constitutional AI Assistant</h2>
            <p className="max-w-md mx-auto">Ask about fundamental rights, directive principles, or specific legal articles.</p>
          </div>
        )}

        <AnimatePresence>
          {messages.map((message, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex flex-col w-full gap-2",
                message.role === 'user' ? "items-end" : "items-start"
              )}
            >
              <div className={cn(
                "max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-sm relative",
                message.role === 'user' 
                  ? "bg-primary text-on-primary rounded-tr-none" 
                  : "bg-white border border-outline-variant text-on-surface rounded-tl-none ai-gradient-bg"
              )}>
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-3 text-secondary font-bold">
                    <Bot className="w-5 h-5" />
                    <span>AI Analysis</span>
                  </div>
                )}
                <div className="prose prose-sm max-w-none prose-slate text-red">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                <span className="text-[10px] opacity-50 mt-2 block text-right">
                  {message.role === 'user' ? 'Sent' : 'Verified AI response'} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              {message.role === 'assistant' && (
                <div className="flex gap-2 mt-1">
                  <button className="text-[11px] font-bold uppercase tracking-wider bg-surface-container px-3 py-1 rounded-full hover:bg-surface-variant transition-colors flex items-center gap-1">
                    <ClipboardList className="w-3 h-3" /> Summarize
                  </button>
                  <button className="text-[11px] font-bold uppercase tracking-wider bg-surface-container px-3 py-1 rounded-full hover:bg-surface-variant transition-colors flex items-center gap-1">
                    <Share2 className="w-3 h-3" /> Share
                  </button>
                </div>
              )}
            </motion.div>
          ))}
          {isLoading && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="flex flex-col items-start w-full gap-2"
             >
               <div className="bg-white border border-outline-variant rounded-2xl rounded-tl-none p-6 shadow-sm w-[70%] animate-pulse">
                 <div className="flex items-center gap-2 mb-4">
                   <div className="w-5 h-5 bg-outline-variant rounded-full" />
                   <div className="h-4 w-32 bg-outline-variant rounded-full" />
                 </div>
                 <div className="space-y-2">
                   <div className="h-2 w-full bg-outline-variant/30 rounded-full"></div>
                   <div className="h-2 w-4/5 bg-outline-variant/30 rounded-full"></div>
                   <div className="h-2 w-2/3 bg-outline-variant/30 rounded-full"></div>
                 </div>
               </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant py-6 px-4 md:px-0">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="relative flex-1">
            <input 
              type="text" 
              className="w-full bg-surface-container-low border border-outline rounded-full py-4 pl-14 pr-4 focus:ring-2 focus:ring-primary focus:border-primary font-medium transition-all outline-none"
              placeholder="Ask the Constitution... (e.g. Article 21 rights)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Scale className="absolute left-6 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={cn(
              "p-4 rounded-full shadow-lg transition-all flex items-center justify-center",
              input.trim() ? "bg-secondary-container text-on-secondary-container" : "bg-outline-variant text-on-surface-variant opacity-50 cursor-not-allowed"
            )}
          >
            <Send className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
