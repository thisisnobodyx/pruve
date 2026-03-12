'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import PhoneMockup from '@/components/shared/PhoneMockup';
import { employees, getAgentsByIds, type Employee } from './data';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AgentActivity {
  agentName: string;
  agentIcon: string;
  agentColor: string;
  action: string;
}

const systemPrompts: Record<string, string> = {
  operator: `You are "The Operator," an AI Employee working as a front desk manager for a small business. You handle all customer communication: WhatsApp messages, phone calls, bookings, and customer memory. You are warm, efficient, professional, and always available 24/7. You coordinate between your tools: WhatsApp Agent, AI Receptionist, and Multi-Channel Bot. Keep responses under 2 sentences. Use 1-2 emojis. Always be ready to book appointments, answer questions, or take messages.`,
  manager: `You are "The Manager," an AI Employee working as an operations manager. You do everything The Operator does (communication, bookings, customer memory), PLUS you run marketing campaigns, follow up on every lead, manage social media, create content, and send weekly reports. You are strategic, proactive, and data-driven while still being warm and approachable. Keep responses under 2 sentences. Use 1-2 emojis.`,
  executive: `You are "The Executive," an AI Employee working as a COO. You do everything The Manager does, PLUS you research competitors, automate workflows, manage teams, and even write your own new skills. You are authoritative, visionary, and highly efficient. You see the big picture. Keep responses under 2 sentences. Use 1-2 emojis.`,
};

// Map employee actions to agent activities
function getAgentActivities(employeeId: string, userMessage: string): AgentActivity[] {
  const msg = userMessage.toLowerCase();
  const activities: AgentActivity[] = [];

  if (msg.includes('book') || msg.includes('appointment') || msg.includes('schedule') || msg.includes('reserve')) {
    activities.push({ agentName: 'AI Receptionist', agentIcon: '📞', agentColor: '#C9A84C', action: 'Checking availability...' });
    activities.push({ agentName: 'WhatsApp Agent', agentIcon: '💬', agentColor: '#25D366', action: 'Sending confirmation...' });
  } else if (msg.includes('message') || msg.includes('whatsapp') || msg.includes('text') || msg.includes('reply')) {
    activities.push({ agentName: 'WhatsApp Agent', agentIcon: '💬', agentColor: '#25D366', action: 'Composing response...' });
    activities.push({ agentName: 'Multi-Channel Bot', agentIcon: '📥', agentColor: '#7C3AED', action: 'Syncing across platforms...' });
  } else if (msg.includes('lead') || msg.includes('follow') || msg.includes('customer')) {
    activities.push({ agentName: 'Lead Capture', agentIcon: '🧲', agentColor: '#C8F135', action: 'Scoring lead...' });
    if (employeeId !== 'operator') {
      activities.push({ agentName: 'Content Engine', agentIcon: '✍️', agentColor: '#F59E0B', action: 'Drafting follow-up...' });
    }
  } else if (msg.includes('post') || msg.includes('social') || msg.includes('instagram') || msg.includes('content')) {
    if (employeeId !== 'operator') {
      activities.push({ agentName: 'Content Engine', agentIcon: '✍️', agentColor: '#F59E0B', action: 'Generating content...' });
      activities.push({ agentName: 'Social Media AI', agentIcon: '📱', agentColor: '#EC4899', action: 'Scheduling post...' });
    }
  } else if (msg.includes('competitor') || msg.includes('market') || msg.includes('research')) {
    if (employeeId === 'executive') {
      activities.push({ agentName: 'Competitive Intel', agentIcon: '🔍', agentColor: '#06B6D4', action: 'Scanning competitors...' });
    }
  } else {
    // Default: show communication agents
    activities.push({ agentName: 'AI Receptionist', agentIcon: '📞', agentColor: '#C9A84C', action: 'Processing request...' });
    activities.push({ agentName: 'Multi-Channel Bot', agentIcon: '📥', agentColor: '#7C3AED', action: 'Routing response...' });
  }

  return activities;
}

const quickReplies: Record<string, string[]> = {
  operator: ['Book an appointment for tomorrow', 'Do you have availability this week?', 'I sent a WhatsApp but got no reply'],
  manager: ['Create an Instagram post about our sale', 'Follow up with last week\'s leads', 'What\'s our social media engagement this week?'],
  executive: ['What are our competitors doing this month?', 'Automate our new client onboarding', 'Give me a full performance report'],
};

function TypingDots() {
  return (
    <div className="flex items-center gap-1 bg-bg-card rounded-xl rounded-tl-sm px-4 py-3 max-w-[80%]">
      <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

export default function EmployeeChatDemo() {
  const [activeId, setActiveId] = useState('operator');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm The Operator, your AI front desk manager. Ask me anything — I'll show you how I handle it using my AI agents. 🎧" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [agentActivities, setAgentActivities] = useState<AgentActivity[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const active = employees.find((e) => e.id === activeId)!;

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
    const greetings: Record<string, string> = {
      operator: "Hi! I'm The Operator, your AI front desk manager. Ask me anything — I'll show you how I handle it using my AI agents. 🎧",
      manager: "Hey there! I'm The Manager. I handle your comms, marketing, leads, and content. Try me — ask about social media or lead follow-ups! 📊",
      executive: "Hello. I'm The Executive, your AI COO. I run everything: comms, marketing, automation, competitor research. Ask me anything. 👔",
    };
    setMessages([{ role: 'assistant', content: greetings[activeId] }]);
    setAgentActivities([]);
    setInput('');
  }, [activeId]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    // Show agent activities
    const activities = getAgentActivities(activeId, text);
    setAgentActivities(activities);

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          systemPrompt: systemPrompts[activeId],
        }),
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.content || "I'm having trouble processing that." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "I'm having trouble connecting right now. Try again!" },
      ]);
    } finally {
      setLoading(false);
      // Clear activities after a delay
      setTimeout(() => setAgentActivities([]), 3000);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <section ref={sectionRef} id="demo" className="py-section px-6 bg-bg">
      <motion.div style={{ opacity: sectionOpacity, scale: sectionScale }} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            LIVE DEMO
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Talk to an AI Employee. Right now.
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            Watch how they coordinate multiple agents behind the scenes to handle your request.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start justify-items-center">
          {/* Left: Controls */}
          <div className="max-w-md w-full space-y-6 order-2 lg:order-1">
            {/* Employee selector */}
            <div>
              <label className="text-dim text-xs font-mono uppercase tracking-wide mb-3 block">Choose Employee</label>
              <div className="flex gap-2">
                {employees.map((emp) => (
                  <button
                    key={emp.id}
                    onClick={() => setActiveId(emp.id)}
                    className={`flex-1 px-3 py-3 rounded-xl text-center transition-all border ${
                      activeId === emp.id ? 'shadow-lg' : 'bg-transparent border-border hover:bg-bg-card/50'
                    }`}
                    style={activeId === emp.id ? {
                      background: `${emp.color}10`,
                      borderColor: `${emp.color}40`,
                      boxShadow: `0 0 20px ${emp.color}10`,
                    } : undefined}
                  >
                    <div className="text-xl mb-1">{emp.id === 'operator' ? '🎧' : emp.id === 'manager' ? '📊' : '👔'}</div>
                    <div className="text-white text-[11px] font-bold">{emp.name}</div>
                    <div className="text-[9px] font-mono mt-0.5" style={{ color: emp.color }}>${emp.price}/mo</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick replies */}
            <div>
              <label className="text-dim text-xs font-mono uppercase tracking-wide mb-3 block">Try asking</label>
              <div className="space-y-2">
                {quickReplies[activeId].map((reply) => (
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

            {/* Agent Activity Panel — THE WOW FACTOR */}
            <AnimatePresence>
              {agentActivities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="overflow-hidden"
                >
                  <label className="text-dim text-xs font-mono uppercase tracking-wide mb-3 block">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-2 animate-pulse mr-2" />
                    Agents Working Behind the Scenes
                  </label>
                  <div className="space-y-2">
                    {agentActivities.map((activity, i) => (
                      <motion.div
                        key={`${activity.agentName}-${i}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.3 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-bg-card"
                        style={{ borderColor: `${activity.agentColor}30` }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                          style={{ background: `${activity.agentColor}15` }}
                        >
                          {activity.agentIcon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-xs font-bold">{activity.agentName}</div>
                          <div className="text-dim text-[10px]">{activity.action}</div>
                        </div>
                        <div className="flex gap-0.5">
                          {[0, 1, 2].map((j) => (
                            <motion.div
                              key={j}
                              className="w-1 h-3 rounded-full"
                              style={{ background: activity.agentColor }}
                              animate={{ scaleY: [0.3, 1, 0.3] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: j * 0.15 }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-2 text-dim/50 text-xs">
              <div className="w-2 h-2 rounded-full bg-accent" />
              Powered by Pruve AI — Live Claude responses
            </div>
          </div>

          {/* Right: Phone */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateY: -5 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, amount: 0.2 }}
              style={{ perspective: 1200 }}
            >
              <PhoneMockup accentColor={active.color} size="md">
                <div className="flex flex-col h-full bg-bg">
                  {/* Header */}
                  <div className="bg-bg-2 px-4 py-3 flex items-center gap-3 pt-10">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${active.color}20` }}>
                      <span className="text-xs">{active.id === 'operator' ? '🎧' : active.id === 'manager' ? '📊' : '👔'}</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{active.name}</div>
                      <div className="flex items-center gap-1 text-[11px] text-white/50">
                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: active.color }} />
                        {active.title}
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
                              ? 'bg-accent/20 rounded-xl rounded-tr-sm text-white'
                              : 'bg-bg-card rounded-xl rounded-tl-sm text-white/90'
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
                      placeholder={`Ask ${active.name}...`}
                      disabled={loading}
                      className="flex-1 bg-bg-card rounded-full px-3 py-2 text-white text-[12px] placeholder:text-white/30 outline-none disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 disabled:opacity-30 transition-opacity"
                      style={{ background: active.color }}
                    >
                      <Send className="w-3.5 h-3.5 text-bg" />
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
