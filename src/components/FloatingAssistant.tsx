import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ChevronRight, 
  HelpCircle,
  MessageSquare,
  RefreshCcw,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE } from '../data/portfolioData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  sourceTag?: string;
}

export const FloatingAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Hello! I am Farjad Zeya's Analytics AI Assistant. Ask me anything about Farjad's freelance services, technical stack, or project case studies.`,
      time: 'Just now',
      sourceTag: 'Portfolio Engine',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'What services do you offer?',
    'What tools do you use?',
    'Show me your strongest analytics project.',
    'Can you build a Power BI dashboard?',
    'What kind of Excel work can you do?',
    'How can you help my business?',
    'Explain the e-commerce project.',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/analytics-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      const replyText = data?.reply || "I couldn't process that query right now. Please try another question or reach Farjad directly at farjadzeya1234@gmail.com.";
      const sourceTag = data?.source === 'gemini-api' ? 'Gemini 3.8 Flash' : 'Portfolio Knowledge';

      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sourceTag,
        },
      ]);
    } catch {
      // Local graceful fallback if backend is momentarily unreachable
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: `Farjad Zeya specializes in Power BI, SQL, Python, and Excel MIS reporting. You can review all project case studies on this page or email him at ${PROFILE.email}.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sourceTag: 'Offline Fallback',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#14151a] text-[#f4f1ea] font-bold shadow-2xl border border-[#2e303b] cursor-pointer group"
            aria-label="Open Ask My Analytics AI"
          >
            <div className="w-7 h-7 rounded-full bg-[#242630] border border-[#373946] flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-black transition-colors">
              <Bot className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-mono font-bold uppercase tracking-wider">
                Ask Analytics AI
              </div>
              <div className="text-[10px] text-[#9ca3af] font-medium">
                Portfolio Dossier Assistant
              </div>
            </div>
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-[92vw] sm:w-[420px] h-[580px] rounded-3xl bg-[#14151a] border border-[#2b2c35] text-[#f4f1ea] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-[#191b22] border-b border-[#282a34] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#242630] border border-[#373946] flex items-center justify-center text-emerald-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Analytics AI Assistant</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                      LIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-[#9ca3af]">
                    Grounded on Farjad's verified portfolio
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#9ca3af] hover:text-white rounded-lg hover:bg-[#282a34] transition-colors cursor-pointer"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#f4f1ea] text-[#14151a] font-medium rounded-br-none shadow-sm'
                        : 'bg-[#191b22] text-[#d1d5db] border border-[#282a34] rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-[#6b7280] font-mono">
                    <span>{m.time}</span>
                    {m.sourceTag && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-400">{m.sourceTag}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-[#9ca3af] bg-[#191b22] p-2.5 rounded-2xl border border-[#282a34] max-w-[70%]">
                  <RefreshCcw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  <span className="text-xs font-mono">Analyzing portfolio data...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-2.5 bg-[#171920] border-t border-[#262832] overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
              {samplePrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSendMessage(p)}
                  disabled={isLoading}
                  className="px-2.5 py-1 text-[11px] rounded-full bg-[#20222a] hover:bg-[#2a2c36] text-[#cbd5e1] hover:text-white border border-[#2e303b] transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0 disabled:opacity-50 font-mono"
                >
                  <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                  <span>{p}</span>
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#191b22] border-t border-[#262832] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about skills, Power BI, SQL, projects..."
                className="flex-1 bg-[#121318] border border-[#2c2e38] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#686d7c] focus:outline-none focus:border-emerald-500 font-sans"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="p-2.5 rounded-xl bg-[#f4f1ea] hover:bg-white text-[#14151a] font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Send query"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
