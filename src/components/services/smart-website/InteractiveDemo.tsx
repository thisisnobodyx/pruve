'use client';

import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, User, Mail, Target, Eye, Clock } from 'lucide-react';
import BrowserMockup from '@/components/shared/BrowserMockup';

const ACCENT = '#7C3AED';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface LeadInfo {
  name: string | null;
  email: string | null;
  interest: string | null;
}

function extractLeadInfo(messages: Message[]): LeadInfo {
  const info: LeadInfo = { name: null, email: null, interest: null };

  for (const msg of messages) {
    if (msg.role !== 'user') continue;
    const text = msg.content;

    // Extract email
    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) info.email = emailMatch[0];

    // Extract name patterns
    const namePatterns = [
      /(?:my name is|i'm|i am|this is|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+here/i,
    ];
    for (const pattern of namePatterns) {
      const match = text.match(pattern);
      if (match) info.name = match[1];
    }

    // Infer interest from keywords
    if (/pric|cost|how much|rate|package|plan/i.test(text)) {
      info.interest = 'Pricing inquiry';
    } else if (/consult|book|meeting|call|schedule|appointment/i.test(text)) {
      info.interest = 'Consultation booking';
    } else if (/service|offer|what do you|help with|portfolio/i.test(text)) {
      info.interest = 'Service exploration';
    } else if (/website|design|develop|build|app/i.test(text)) {
      info.interest = 'Web development';
    }
  }

  return info;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
      <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

function LeadSidebar({ leadInfo, messageCount }: { leadInfo: LeadInfo; messageCount: number }) {
  const items = [
    { icon: User, label: 'Name', value: leadInfo.name, fallback: 'Not yet captured' },
    { icon: Mail, label: 'Email', value: leadInfo.email, fallback: 'Not yet captured' },
    { icon: Target, label: 'Interest', value: leadInfo.interest, fallback: 'Analyzing...' },
    { icon: Eye, label: 'Visit count', value: '3', fallback: null },
    { icon: Clock, label: 'Time on site', value: '2m 34s', fallback: null },
  ];

  return (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: ACCENT }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: ACCENT }}>
            Lead Intelligence
          </span>
        </div>
        <p className="text-dim text-sm mb-6">
          Real-time data extracted from the conversation. This is what your team sees in the dashboard.
        </p>
      </div>

      <div className="space-y-3">
        {items.map(({ icon: Icon, label, value, fallback }) => {
          const displayValue = value || fallback;
          const isCaptured = !!value;
          return (
            <motion.div
              key={label}
              layout
              className="bg-bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3"
              animate={isCaptured ? { borderColor: `${ACCENT}40` } : {}}
              transition={{ duration: 0.3 }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: isCaptured ? `${ACCENT}15` : 'rgba(255,255,255,0.05)',
                }}
              >
                <Icon
                  className="w-4 h-4"
                  style={{ color: isCaptured ? ACCENT : 'rgba(255,255,255,0.3)' }}
                />
              </div>
              <div className="min-w-0">
                <div className="text-dim text-[11px] font-mono uppercase tracking-wide">{label}</div>
                <div
                  className={`text-sm font-medium truncate ${isCaptured ? 'text-white' : 'text-dim/50'}`}
                >
                  {displayValue}
                </div>
              </div>
              {isCaptured && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${ACCENT}20` }}
                >
                  <svg className="w-3 h-3" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Conversation stats */}
      <div className="bg-bg-card border border-border rounded-xl p-4 mt-4">
        <div className="text-dim text-[11px] font-mono uppercase tracking-wide mb-2">Conversation</div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-dim">Messages exchanged</span>
          <span className="text-white font-semibold">{messageCount}</span>
        </div>
      </div>

      {/* Powered by badge */}
      <div className="flex items-center gap-2 text-dim/50 text-xs pt-2">
        <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
        Powered by Pruve AI
      </div>
    </div>
  );
}

export default function InteractiveDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Welcome to StrategyPro Consulting! I\'m here to help you learn about our services, answer questions, or book a free consultation. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const sectionScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  const leadInfo = extractLeadInfo(messages);

  useEffect(() => {
    const el = chatEndRef.current;
    if (el?.parentElement) {
      el.parentElement.scrollTop = el.parentElement.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const systemPrompt = `You are an AI chat assistant embedded on a consulting firm website called "StrategyPro Consulting". Help visitors learn about services (digital strategy, AI implementation, growth consulting), answer pricing questions (packages start at $2,500/mo), and capture lead information naturally. Keep responses brief (1-3 sentences). If the visitor shares their name or email, acknowledge it warmly. Be professional yet approachable. Offer to book a free consultation when appropriate.`;

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
        { role: 'assistant', content: data.content || 'Sorry, I couldn\'t process that.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'I\'m having trouble connecting right now. Please try again in a moment.' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  const quickReplies = [
    'What services do you offer?',
    'How much does it cost?',
    'I\'d like to book a consultation',
  ];

  return (
    <section ref={sectionRef} id="demo" className="py-section px-6 bg-bg-2">
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
            Chat with a smart website. Right now.
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            This is what your visitors experience. Ask about services, pricing, or share your name &mdash; watch the lead intelligence update in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start justify-items-center">
          {/* Lead Intelligence sidebar (left on lg) */}
          <div className="order-2 lg:order-1 flex justify-center">
            <LeadSidebar leadInfo={leadInfo} messageCount={messages.length} />
          </div>

          {/* Browser mockup with chat widget (right on lg) */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <BrowserMockup url="strategypro.co" className="w-[460px] max-w-full">
                <div className="relative h-[500px] bg-[#0f0a1a]">
                  {/* Mock website background */}
                  <div className="p-4 space-y-3 opacity-40">
                    {/* Nav */}
                    <div className="flex items-center justify-between">
                      <div className="w-24 h-3 rounded" style={{ background: `${ACCENT}30` }} />
                      <div className="flex gap-3">
                        <div className="w-12 h-2 rounded bg-white/8" />
                        <div className="w-12 h-2 rounded bg-white/8" />
                        <div className="w-16 h-6 rounded-full" style={{ background: `${ACCENT}25` }} />
                      </div>
                    </div>
                    {/* Hero */}
                    <div className="mt-8 space-y-2">
                      <div className="w-3/4 h-5 rounded bg-white/10" />
                      <div className="w-1/2 h-5 rounded" style={{ background: `${ACCENT}20` }} />
                      <div className="w-full h-2 rounded bg-white/5 mt-4" />
                      <div className="w-4/5 h-2 rounded bg-white/5" />
                      <div className="w-2/3 h-2 rounded bg-white/5" />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <div className="w-28 h-9 rounded-full" style={{ background: `${ACCENT}30` }} />
                      <div className="w-28 h-9 rounded-full border border-white/10" />
                    </div>
                    {/* Features grid */}
                    <div className="grid grid-cols-2 gap-2 mt-6">
                      {[1, 2, 3, 4].map((c) => (
                        <div key={c} className="h-16 rounded-lg bg-white/3 border border-white/5" />
                      ))}
                    </div>
                  </div>

                  {/* Chat widget overlay */}
                  <div className="absolute bottom-0 right-0 w-full sm:w-[320px] h-[380px] bg-[#13102a] border-t sm:border-l border-white/10 flex flex-col sm:rounded-tl-xl overflow-hidden">
                    {/* Chat header */}
                    <div className="px-4 py-3 flex items-center gap-3 border-b border-white/10" style={{ background: `${ACCENT}15` }}>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: `${ACCENT}30` }}
                      >
                        <svg className="w-4 h-4" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">StrategyPro AI</div>
                        <div className="flex items-center gap-1 text-[11px] text-white/50">
                          <span className="w-1.5 h-1.5 rounded-full inline-block bg-green-400" />
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
                                ? 'rounded-2xl rounded-tr-sm text-white'
                                : 'bg-white/5 rounded-2xl rounded-tl-sm text-white/90'
                            }`}
                            style={msg.role === 'user' ? { background: ACCENT } : {}}
                          >
                            {msg.content}
                          </div>
                        </motion.div>
                      ))}
                      {loading && <TypingDots />}
                      <div ref={chatEndRef} />

                      {/* Quick replies if only initial message */}
                      {messages.length === 1 && !loading && (
                        <div className="space-y-1.5 pt-2">
                          {quickReplies.map((reply) => (
                            <button
                              key={reply}
                              onClick={() => sendMessage(reply)}
                              className="block w-full text-left px-3 py-2 rounded-xl text-[11px] border transition-all hover:border-white/20"
                              style={{
                                borderColor: `${ACCENT}30`,
                                background: `${ACCENT}08`,
                                color: 'rgba(255,255,255,0.7)',
                              }}
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="px-3 py-2 flex items-center gap-2 border-t border-white/10">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        disabled={loading}
                        className="flex-1 bg-white/5 rounded-full px-3 py-2 text-white text-[12px] placeholder:text-white/30 outline-none disabled:opacity-50"
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
                </div>
              </BrowserMockup>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
