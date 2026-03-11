'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import PhoneMockup from '@/components/shared/PhoneMockup';
import MagneticButton from '@/components/shared/MagneticButton';

const ACCENT = '#25D366';

interface ChatMessage {
  role: 'customer' | 'ai';
  text: string;
  delay: number; // ms after previous
}

const conversations: ChatMessage[][] = [
  [
    { role: 'customer', text: 'Hi, do you have a table for 4 tonight?', delay: 0 },
    { role: 'ai', text: 'Yes! We have a 7:30pm or 8:00pm slot. Which works better? 🍽️', delay: 1200 },
    { role: 'customer', text: '7:30 works', delay: 1000 },
    { role: 'ai', text: 'Done! Reservation confirmed for 4 at 7:30pm. See you tonight! ✅', delay: 1000 },
  ],
  [
    { role: 'customer', text: 'What are your opening hours?', delay: 0 },
    { role: 'ai', text: 'We\'re open Mon-Sat 9am-9pm, Sun 10am-6pm. Anything else I can help with? 😊', delay: 1200 },
    { role: 'customer', text: 'Do you offer delivery?', delay: 1000 },
    { role: 'ai', text: 'Yes! Free delivery on orders over $30. I can help you place an order right now 🚗', delay: 1000 },
  ],
  [
    { role: 'customer', text: 'Hi! I saw your ad on Instagram', delay: 0 },
    { role: 'ai', text: 'Welcome! 🎉 Great to hear. What caught your eye? I\'d love to help.', delay: 1200 },
    { role: 'customer', text: 'The monthly subscription, how much is it?', delay: 1000 },
    { role: 'ai', text: 'Our starter plan is $49/mo. Want me to send you the full pricing breakdown? 📋', delay: 1000 },
  ],
];

function AutoChat() {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [typingVisible, setTypingVisible] = useState(false);
  const [convoIndex, setConvoIndex] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const convo = conversations[convoIndex % conversations.length];

    const playConversation = async () => {
      setVisibleMessages([]);

      // Initial pause before first conversation starts
      await new Promise((r) => setTimeout(r, convoIndex === 0 ? 1000 : 500));
      if (cancelled) return;

      for (let i = 0; i < convo.length; i++) {
        if (cancelled) return;
        const msg = convo[i];

        // Wait for delay
        if (msg.delay > 0) {
          await new Promise((r) => setTimeout(r, msg.delay));
        }
        if (cancelled) return;

        // Show typing indicator for AI messages
        if (msg.role === 'ai') {
          setTypingVisible(true);
          await new Promise((r) => setTimeout(r, 800));
          if (cancelled) return;
          setTypingVisible(false);
        }

        setVisibleMessages((prev) => [...prev, msg]);
      }

      // Pause on completed conversation
      await new Promise((r) => setTimeout(r, 3000));
      if (cancelled) return;

      setConvoIndex((prev) => prev + 1);
    };

    playConversation();
    return () => { cancelled = true; };
  }, [convoIndex]);

  useEffect(() => {
    // Scroll within the chat container only, not the page
    const el = chatEndRef.current;
    if (el?.parentElement) {
      el.parentElement.scrollTop = el.parentElement.scrollHeight;
    }
  }, [visibleMessages, typingVisible]);

  return (
    <div className="flex flex-col h-full bg-[#0B141A]">
      {/* WhatsApp header */}
      <div className="bg-[#1F2C34] px-4 py-3 flex items-center gap-3 pt-10">
        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${ACCENT}30` }}>
          <span className="text-xs font-bold" style={{ color: ACCENT }}>AI</span>
        </div>
        <div>
          <div className="text-white text-sm font-medium">Pruve AI Agent</div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/50">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: ACCENT }} />
            online
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {visibleMessages.map((msg, i) => (
          <motion.div
            key={`${convoIndex}-${i}`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className={`flex ${msg.role === 'customer' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-3 py-2 text-[13px] leading-relaxed ${
                msg.role === 'customer'
                  ? 'bg-[#005C4B] rounded-xl rounded-tr-sm text-white'
                  : 'bg-[#1F2C34] rounded-xl rounded-tl-sm text-white/90'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {typingVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-[#1F2C34] rounded-xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
              <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <div className="px-3 py-2 flex items-center gap-2">
        <div className="flex-1 bg-[#1F2C34] rounded-full px-4 py-2 text-white/30 text-sm">
          Type a message...
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: ACCENT }}>
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function WhatsAppHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    rotateY.set(x * 8);
    rotateX.set(-y * 8);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 60% 40%, ${ACCENT}12 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto w-full">
        {/* Left — Headline + CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-bg-card/50 mb-6"
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: ACCENT }} />
            <span className="text-dim text-xs font-mono uppercase tracking-wider">AI-Powered WhatsApp</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5">
            Your WhatsApp.{' '}
            <span style={{ color: ACCENT }}>Now with a brain.</span>
          </h1>
          <p className="text-dim text-lg mb-8 max-w-md mx-auto lg:mx-0">
            AI that responds to customers instantly, takes bookings, answers FAQs, and never sleeps.
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
            <MagneticButton
              href="#demo"
              className="px-8 py-4 rounded-full text-black font-semibold text-base transition-all hover:brightness-110"
              style={{ background: ACCENT }}
            >
              Try It Live
            </MagneticButton>
            <MagneticButton
              href="/pricing"
              className="px-8 py-4 rounded-full border border-border text-white font-semibold text-base hover:bg-white/5 transition-all"
            >
              View Pricing →
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right — 3D tilting phone */}
        <div className="relative flex justify-center">
          {/* Pulsing rings behind phone */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
              style={{ borderColor: `${ACCENT}30` }}
              animate={{
                width: [150, 400],
                height: [150, 400],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'easeOut',
              }}
            />
          ))}

          <motion.div
            style={{ rotateX, rotateY, perspective: 1200 }}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <PhoneMockup accentColor={ACCENT} size="sm">
              <AutoChat />
            </PhoneMockup>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-dim/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
