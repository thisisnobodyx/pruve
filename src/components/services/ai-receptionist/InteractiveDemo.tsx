'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ACCENT = '#C9A84C';

type Scenario = 'appointment' | 'hours' | 'callback' | 'inquiry';

const scenarios: { id: Scenario; label: string; firstMessage: string }[] = [
  { id: 'appointment', label: 'Book an appointment', firstMessage: 'Hi, I\'d like to book an appointment for next week.' },
  { id: 'hours', label: 'Ask about hours', firstMessage: 'What are your business hours?' },
  { id: 'callback', label: 'Request a callback', firstMessage: 'Can I get a callback from the manager?' },
  { id: 'inquiry', label: 'General inquiry', firstMessage: 'I have some questions about your services and pricing.' },
];

interface TranscriptMessage {
  role: 'caller' | 'ai';
  content: string;
}

interface ActionCard {
  action: string;
  id: number;
}

const SYSTEM_PROMPT =
  'You are a professional AI receptionist answering phone calls for a business. Be warm, efficient, and professional. You can book appointments, transfer calls, take messages, and answer common questions. Keep responses natural and concise as if on a live phone call. After each response, add an action on a new line starting with [ACTION:] describing what you would do (e.g., [ACTION: Book appointment for Tuesday 2pm], [ACTION: Send confirmation email]).';

function parseResponse(text: string): { content: string; actions: string[] } {
  const lines = text.split('\n');
  const contentLines: string[] = [];
  const actions: string[] = [];

  for (const line of lines) {
    const actionMatch = line.match(/\[ACTION:\s*(.+?)\]$/);
    if (actionMatch) {
      actions.push(actionMatch[1]);
    } else if (line.trim()) {
      contentLines.push(line);
    }
  }

  return { content: contentLines.join('\n').trim(), actions };
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <span className="w-2 h-2 rounded-full animate-bounce [animation-delay:0ms]" style={{ background: `${ACCENT}60` }} />
      <span className="w-2 h-2 rounded-full animate-bounce [animation-delay:150ms]" style={{ background: `${ACCENT}60` }} />
      <span className="w-2 h-2 rounded-full animate-bounce [animation-delay:300ms]" style={{ background: `${ACCENT}60` }} />
    </div>
  );
}

export default function InteractiveDemo() {
  const [selected, setSelected] = useState<Scenario | null>(null);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [actions, setActions] = useState<ActionCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [conversationDone, setConversationDone] = useState(false);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const actionIdRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const sectionScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  useEffect(() => {
    const el = transcriptEndRef.current;
    if (el?.parentElement) {
      el.parentElement.scrollTop = el.parentElement.scrollHeight;
    }
  }, [transcript, loading]);

  async function runConversation(scenario: Scenario) {
    const scenarioData = scenarios.find((s) => s.id === scenario);
    if (!scenarioData) return;

    setSelected(scenario);
    setTranscript([]);
    setActions([]);
    setConversationDone(false);
    actionIdRef.current = 0;

    const callerMsg: TranscriptMessage = { role: 'caller', content: scenarioData.firstMessage };
    setTranscript([callerMsg]);
    setLoading(true);

    try {
      const messages = [{ role: 'user' as const, content: scenarioData.firstMessage }];

      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, systemPrompt: SYSTEM_PROMPT }),
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      const parsed = parseResponse(data.content || '');

      setTranscript((prev) => [...prev, { role: 'ai', content: parsed.content }]);

      // Add actions with stagger
      for (const action of parsed.actions) {
        actionIdRef.current++;
        const id = actionIdRef.current;
        setActions((prev) => [...prev, { action, id }]);
      }

      // Now do a follow-up from the caller and get another AI response
      let followUp = '';
      switch (scenario) {
        case 'appointment':
          followUp = 'Tuesday at 2pm works great. My name is Alex Johnson.';
          break;
        case 'hours':
          followUp = 'Great, and do you have availability this Saturday?';
          break;
        case 'callback':
          followUp = 'My number is 555-0123. Anytime after 3pm works.';
          break;
        case 'inquiry':
          followUp = 'That sounds good. Can you email me more details?';
          break;
      }

      // Brief pause before follow-up
      await new Promise((r) => setTimeout(r, 1500));

      setTranscript((prev) => [...prev, { role: 'caller', content: followUp }]);
      setLoading(true);

      const followUpMessages = [
        ...messages,
        { role: 'assistant' as const, content: data.content || '' },
        { role: 'user' as const, content: followUp },
      ];

      const res2 = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: followUpMessages, systemPrompt: SYSTEM_PROMPT }),
      });

      if (!res2.ok) throw new Error('API request failed');
      const data2 = await res2.json();
      const parsed2 = parseResponse(data2.content || '');

      setTranscript((prev) => [...prev, { role: 'ai', content: parsed2.content }]);

      for (const action of parsed2.actions) {
        actionIdRef.current++;
        const id = actionIdRef.current;
        setActions((prev) => [...prev, { action, id }]);
      }

      setConversationDone(true);
    } catch {
      setTranscript((prev) => [
        ...prev,
        { role: 'ai', content: 'I apologize, I\'m having trouble connecting right now. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section ref={sectionRef} id="demo" className="py-section px-6 bg-bg-2">
      <motion.div
        style={{ opacity: sectionOpacity, scale: sectionScale }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            LIVE DEMO
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Hear it <span style={{ color: ACCENT }}>in action</span>
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            Select a scenario and watch how the AI receptionist handles real phone conversations in real time.
          </p>
        </div>

        {/* Scenario buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => runConversation(s.id)}
              disabled={loading}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all disabled:opacity-40 ${
                selected === s.id
                  ? 'text-black'
                  : 'bg-bg-card border border-border text-dim hover:text-white hover:border-white/20'
              }`}
              style={selected === s.id ? { background: ACCENT } : {}}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Transcript + Actions area */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6"
          >
            {/* Transcript */}
            <div className="bg-bg-card border border-border rounded-2xl overflow-hidden">
              {/* Header bar */}
              <div className="px-5 py-3 border-b border-border flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
                <span className="text-white text-sm font-medium">Live Call Transcript</span>
                {loading && <span className="text-dim text-xs ml-auto">Responding...</span>}
                {conversationDone && <span className="text-xs ml-auto" style={{ color: ACCENT }}>Call Complete</span>}
              </div>

              {/* Messages */}
              <div className="h-[360px] overflow-y-auto p-5 space-y-4">
                {transcript.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === 'caller' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${msg.role === 'caller' ? 'order-2' : ''}`}>
                      <div
                        className={`text-[11px] font-mono uppercase tracking-wider mb-1.5 ${
                          msg.role === 'caller' ? 'text-right' : ''
                        }`}
                        style={{ color: msg.role === 'ai' ? ACCENT : '#9590A8' }}
                      >
                        {msg.role === 'caller' ? 'Caller' : 'AI Receptionist'}
                      </div>
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'caller'
                            ? 'bg-white/10 text-white rounded-tr-sm'
                            : 'text-white/90 rounded-tl-sm'
                        }`}
                        style={
                          msg.role === 'ai'
                            ? { background: `${ACCENT}15`, border: `1px solid ${ACCENT}20` }
                            : {}
                        }
                      >
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider mb-1.5" style={{ color: ACCENT }}>
                        AI Receptionist
                      </div>
                      <div className="rounded-2xl rounded-tl-sm" style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}20` }}>
                        <TypingDots />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={transcriptEndRef} />
              </div>
            </div>

            {/* Action sidebar */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-dim mb-2">
                Actions Taken
              </div>
              {actions.length === 0 && !loading && (
                <div className="text-dim text-sm italic">Actions will appear here as the AI responds...</div>
              )}
              {actions.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="bg-bg-card border rounded-xl px-4 py-3"
                  style={{ borderColor: `${ACCENT}30` }}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${ACCENT}20` }}
                    >
                      <svg className="w-3 h-3" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm leading-snug">{a.action}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Placeholder before selection */}
        {!selected && (
          <div className="bg-bg-card border border-border rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${ACCENT}15` }}>
              <svg className="w-8 h-8" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <p className="text-dim text-lg">Select a scenario above to start a simulated call</p>
          </div>
        )}

        {/* Powered by */}
        <div className="flex items-center justify-center gap-2 text-dim/50 text-xs mt-6">
          <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
          Powered by Pruve AI
        </div>
      </motion.div>
    </section>
  );
}
