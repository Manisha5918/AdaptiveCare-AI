import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Send, X, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

let msgIdCounter = 0;

export default function AIAssistant() {
  const { processAICommand } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi! I am your MorphUI Assistant. Describe how you want your dashboard configured, or ask me to log vitals.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  const suggestions = [
    'Change to Senior layout',
    'Log blood sugar 145',
    'Enable detailed fitness mode',
    'Make text bigger',
    'Set light mode',
    'Trigger emergency SOS'
  ];

  const handleSend = (textToSend) => {
    const prompt = textToSend.trim();
    if (!prompt) return;

    // Add user message
    const userMsg = { id: ++msgIdCounter, sender: 'user', text: prompt };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Wait slightly, then compile response and update dashboard state
    setTimeout(() => {
      const replyText = processAICommand(prompt);
      const botMsg = { id: ++msgIdCounter, sender: 'bot', text: replyText };
      setMessages(prev => [...prev, botMsg]);
    }, 450);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {/* Floating Chat Drawer */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute bottom-16 right-0 w-[330px] sm:w-[360px] h-[480px] rounded-[24px] glass-panel border border-slate-200 dark:border-charcoal-800 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* AI Assistant Header */}
            <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-charcoal-850 bg-slate-50/50 dark:bg-charcoal-900/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-sky-500/25">
                  <Sparkles size={14} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal-900 dark:text-slate-100">MorphUI AI Copilot</h4>
                  <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest block -mt-0.5">Online</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-charcoal-400 hover:text-charcoal-600 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-charcoal-800 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-[16px] text-xs font-medium leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-charcoal-900 shadow-sm rounded-tr-none'
                      : 'bg-slate-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-slate-200 rounded-tl-none border border-slate-200/50 dark:border-charcoal-800'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* AI Suggestion Badges */}
            <div className="px-4 py-2 border-t border-slate-100 dark:border-charcoal-850 bg-slate-50/20 dark:bg-charcoal-900/10">
              <span className="text-[9px] font-extrabold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-widest block mb-1">Click to simulate command:</span>
              <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto py-1">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSend(sug)}
                    className="text-[10px] font-semibold px-2.5 py-1 bg-white dark:bg-charcoal-900 text-charcoal-600 dark:text-charcoal-400 hover:text-charcoal-950 dark:hover:text-slate-100 border border-slate-200 dark:border-charcoal-800 hover:border-slate-300 dark:hover:border-charcoal-700 rounded-lg transition-all text-left flex items-center justify-between gap-1"
                  >
                    <span>{sug}</span>
                    <ArrowRight size={8} className="opacity-0 hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input box */}
            <div className="p-3.5 border-t border-slate-200 dark:border-charcoal-850 flex gap-2">
              <input
                type="text"
                placeholder="Ask AI to adapt layout or log metrics..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                className="flex-1 text-xs px-3.5 py-2.5 rounded-[14px] bg-slate-50 dark:bg-charcoal-900/60 border border-slate-200 dark:border-charcoal-800 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white text-charcoal-950 dark:text-slate-100"
              />
              <button
                onClick={() => handleSend(inputValue)}
                className="bg-slate-900 dark:bg-slate-100 text-white dark:text-charcoal-900 p-2.5 rounded-[14px] hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-md shadow-slate-900/10"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkles Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-600 dark:from-sky-500 dark:via-blue-600 dark:to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 border border-white/20 relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -95 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div key="spark" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} className="relative flex items-center justify-center">
              <MessageSquare size={18} className="absolute text-white/50 blur-[2px]" />
              <Sparkles size={20} className="relative z-10 animate-soft-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
