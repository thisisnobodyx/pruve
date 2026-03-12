'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const businessTypes = [
  'Restaurant',
  'Real Estate Agency',
  'Dental Clinic',
  'Fitness Gym',
  'E-commerce Store',
] as const;

type BusinessType = (typeof businessTypes)[number];

const bulletPoints = [
  'Responds in seconds',
  'Knows your business',
  'Available 24/7',
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 bg-bg-card border border-border rounded-2xl rounded-tl-md px-4 py-3 max-w-[80%]">
      <span className="w-2 h-2 bg-dim rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 bg-dim rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 bg-dim rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

function ChatBubble({ message }: { message: Message }) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-[#005C4B] rounded-2xl rounded-tr-md px-4 py-2 ml-auto max-w-[80%] text-sm text-white">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="bg-bg-card border border-border rounded-2xl rounded-tl-md px-4 py-2 max-w-[80%] text-sm text-white">
        {message.content}
      </div>
    </div>
  );
}

export default function LiveDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedBusiness, setSelectedBusiness] =
    useState<BusinessType>('Restaurant');

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.2'],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  useEffect(() => {
    // Scroll the chat container to bottom — NOT the page
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi! I'm your AI assistant. How can I help you today?",
      },
    ]);
    setInput('');
  }, [selectedBusiness]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const systemPrompt = `You are an AI customer service agent for a ${selectedBusiness}. You are helpful, concise, and professional. Reply as if you are the business's automated WhatsApp assistant. Keep responses under 3 sentences. Be warm and helpful.`;

      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          systemPrompt,
        }),
      });

      if (!res.ok) throw new Error('API request failed');

      const data = await res.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content || "Sorry, I couldn't process that. Please try again.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section ref={sectionRef} className="bg-bg-2 py-section px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Left column — copy with scroll-driven entrance */}
        <motion.div style={{ y: leftY, opacity: leftOpacity }}>
          <span className="font-mono text-accent text-sm tracking-widest uppercase mb-4 block">
            LIVE DEMO
          </span>

          <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-white">
            This is what your customers will experience.
          </h2>

          <p className="text-dim text-lg mb-8 font-body leading-relaxed">
            Try it. Pick a business type, type a customer message, and watch
            your AI agent respond in real time.
          </p>

          <ul className="space-y-4">
            {bulletPoints.map((point, i) => (
              <motion.li
                key={point}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <CheckCircle2 className="w-5 h-5 text-accent-2 shrink-0" />
                <span className="text-white font-body">{point}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right column — WhatsApp-style chat with 3D entrance */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateY: -5 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, amount: 0.15 }}
          style={{ perspective: '1200px' }}
        >
          <div className="bg-bg-card rounded-2xl border border-border overflow-hidden max-w-md mx-auto w-full shadow-2xl shadow-black/30">
            <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <span className="text-accent text-xs font-bold">AI</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-medium">AI Assistant</span>
                <span className="flex items-center gap-1.5 text-[11px] text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-2 inline-block" />
                  online
                </span>
              </div>
            </div>

            <div className="px-4 py-3 border-b border-border">
              <select
                value={selectedBusiness}
                onChange={(e) =>
                  setSelectedBusiness(e.target.value as BusinessType)
                }
                className="bg-bg border border-border rounded-lg px-3 py-2 text-sm w-full text-white font-body outline-none focus:border-accent/50 transition-colors cursor-pointer appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                }}
              >
                {businessTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div
              ref={chatContainerRef}
              className="h-[350px] overflow-y-auto p-4 space-y-3"
            >
              {messages.map((message, index) => (
                <ChatBubble key={index} message={message} />
              ))}
              {loading && <TypingIndicator />}
              <div ref={chatEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 bg-bg px-3 py-3 border-t border-border"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={loading}
                className="bg-bg-card border border-border rounded-pill px-4 py-2 flex-1 text-sm text-white font-body placeholder:text-dim/60 outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-accent hover:bg-accent/90 disabled:bg-accent/40 rounded-full w-10 h-10 flex items-center justify-center shrink-0 transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
