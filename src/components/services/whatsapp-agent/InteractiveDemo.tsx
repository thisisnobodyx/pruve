'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Send } from 'lucide-react';
import PhoneMockup from '@/components/shared/PhoneMockup';

const ACCENT = '#25D366';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const businessTypes = ['Restaurant', 'Real Estate', 'Dental Clinic', 'Fitness Gym', 'E-commerce'] as const;
type BusinessType = (typeof businessTypes)[number];

const quickReplies: Record<BusinessType, string[]> = {
  Restaurant: ['What are your hours?', 'Book a table for 2', 'Show me the menu'],
  'Real Estate': ['Show me listings under $500k', 'Book a viewing', 'What areas do you cover?'],
  'Dental Clinic': ['Book a checkup', 'Do you accept insurance?', 'Emergency appointment'],
  'Fitness Gym': ['Membership prices?', 'Class schedule', 'Do you offer a free trial?'],
  'E-commerce': ['Track my order', 'Return policy?', 'Do you ship internationally?'],
};

function TypingDots() {
  return (
    <div className="flex items-center gap-1 bg-[#1F2C34] rounded-xl rounded-tl-sm px-4 py-3 max-w-[80%]">
      <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

export default function InteractiveDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your AI WhatsApp agent. Try asking me anything — I'll respond just like I would to your real customers. 🤖" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessType>('Restaurant');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const sectionScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  useEffect(() => {
    const el = chatEndRef.current;
    if (el?.parentElement) {
      el.parentElement.scrollTop = el.parentElement.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    setMessages([
      { role: 'assistant', content: "Hi! I'm your AI WhatsApp agent. Try asking me anything — I'll respond just like I would to your real customers. 🤖" },
    ]);
    setInput('');
  }, [selectedBusiness]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const systemPrompt = `You are an AI WhatsApp agent for a ${selectedBusiness}. You respond in the style of a friendly, professional WhatsApp Business account. Keep responses under 2 sentences. Use relevant emojis sparingly. You can take bookings, answer FAQs, capture leads, and handle customer inquiries. Be warm, efficient, and helpful.`;

      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          systemPrompt,
        }),
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.content || "Sorry, I couldn't process that." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "I'm having trouble connecting. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <section ref={sectionRef} id="demo" className="py-section-mobile md:py-section px-6 bg-bg-2">
      <motion.div
        style={{ opacity: sectionOpacity, scale: sectionScale }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            LIVE DEMO
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Talk to your AI agent. Right now.
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            Pick a business type, send a message, and see how your AI WhatsApp agent handles real customer conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center justify-items-center">
          {/* Controls + Quick replies (left side) */}
          <div className="max-w-md w-full space-y-6 order-2 lg:order-1">
            {/* Business type chips */}
            <div>
              <label className="text-dim text-xs font-mono uppercase tracking-wide mb-3 block">Business Type</label>
              <div className="flex flex-wrap gap-2">
                {businessTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedBusiness(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedBusiness === type
                        ? 'text-black'
                        : 'bg-bg-card border border-border text-dim hover:text-white hover:border-white/20'
                    }`}
                    style={selectedBusiness === type ? { background: ACCENT } : {}}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick reply suggestions */}
            <div>
              <label className="text-dim text-xs font-mono uppercase tracking-wide mb-3 block">Try asking</label>
              <div className="space-y-2">
                {quickReplies[selectedBusiness].map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    disabled={loading}
                    className="w-full text-left px-4 py-3 bg-bg-card border border-border rounded-xl text-sm text-white/80 hover:border-white/20 hover:text-white transition-all disabled:opacity-40"
                  >
                    &ldquo;{reply}&rdquo;
                  </button>
                ))}
              </div>
            </div>

            {/* Powered by badge */}
            <div className="flex items-center gap-2 text-dim/50 text-xs">
              <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
              Powered by Pruve AI
            </div>
          </div>

          {/* Phone with chat (right side) */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateY: -5 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, amount: 0.2 }}
              style={{ perspective: 1200 }}
            >
              <PhoneMockup accentColor={ACCENT} size="md">
                <div className="flex flex-col h-full bg-[#0B141A]">
                  {/* WhatsApp header */}
                  <div className="bg-[#1F2C34] px-4 py-3 flex items-center gap-3 pt-10">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${ACCENT}30` }}>
                      <span className="text-xs font-bold" style={{ color: ACCENT }}>AI</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{selectedBusiness} AI</div>
                      <div className="flex items-center gap-1 text-[11px] text-white/50">
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: ACCENT }} />
                        online
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] px-3 py-2 text-[12px] leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-[#005C4B] rounded-xl rounded-tr-sm text-white'
                              : 'bg-[#1F2C34] rounded-xl rounded-tl-sm text-white/90'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}
                    {loading && <TypingDots />}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input */}
                  <form onSubmit={handleSubmit} className="px-2 py-2 flex items-center gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message..."
                      disabled={loading}
                      className="flex-1 bg-[#1F2C34] rounded-full px-3 py-2 text-white text-[12px] placeholder:text-white/30 outline-none disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 disabled:opacity-30 transition-opacity"
                      style={{ background: ACCENT }}
                    >
                      <Send className="w-3.5 h-3.5 text-white" />
                    </button>
                  </form>
                </div>
              </PhoneMockup>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
