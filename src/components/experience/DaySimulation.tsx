'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import PhoneMockup from '@/components/shared/PhoneMockup';
import { channels, tierColors, tierLabels, capabilities } from './experience-data';
import type { DayEvent, TierId } from './experience-data';
import { getIndustry } from './industries';

/* ------------------------------------------------------------------ */
/* TYPES                                                                */
/* ------------------------------------------------------------------ */
type SimState = 'idle' | 'playing' | 'paused' | 'complete';

/* ------------------------------------------------------------------ */
/* SIMULATION EVENT CARD                                                */
/* ------------------------------------------------------------------ */
function EventCard({ event, isActive }: { event: DayEvent; isActive: boolean }) {
  const ch = channels[event.channel];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, height: 0 }}
      animate={{ opacity: 1, x: 0, height: 'auto' }}
      className={`border rounded-xl p-3 transition-all duration-300 ${
        isActive
          ? 'bg-bg-card shadow-lg'
          : 'bg-bg-card/50'
      }`}
      style={{
        borderTopColor: isActive ? `${tierColors[event.tier]}30` : 'rgba(255,255,255,0.05)',
        borderRightColor: isActive ? `${tierColors[event.tier]}30` : 'rgba(255,255,255,0.05)',
        borderBottomColor: isActive ? `${tierColors[event.tier]}30` : 'rgba(255,255,255,0.05)',
        borderLeftWidth: 3,
        borderLeftColor: tierColors[event.tier],
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-mono text-dim">{event.time}</span>
        <span className="text-xs" title={ch.label}>{ch.icon}</span>
        <span
          className="text-[9px] px-1.5 py-0.5 rounded-full font-mono"
          style={{
            color: tierColors[event.tier],
            background: `${tierColors[event.tier]}10`,
            border: `1px solid ${tierColors[event.tier]}20`,
          }}
        >
          {tierLabels[event.tier].replace('The ', '')}
        </span>
      </div>
      <div className="text-white text-xs font-bold mb-0.5">{event.title}</div>
      {isActive && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-dim text-[11px] leading-relaxed"
        >
          {event.description}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* CAPABILITY INDICATOR                                                 */
/* ------------------------------------------------------------------ */
function CapabilityPill({
  capId,
  activated,
  justActivated,
}: {
  capId: string;
  activated: boolean;
  justActivated: boolean;
}) {
  const cap = capabilities.find((c) => c.id === capId);
  if (!cap) return null;

  return (
    <motion.div
      animate={
        justActivated
          ? { scale: [1, 1.15, 1], transition: { duration: 0.4 } }
          : {}
      }
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] transition-all duration-500 ${
        activated
          ? 'border-opacity-30 bg-opacity-10'
          : 'border-white/5 bg-transparent text-white/20'
      }`}
      style={
        activated
          ? {
              color: tierColors[cap.tier],
              borderColor: `${tierColors[cap.tier]}30`,
              background: `${tierColors[cap.tier]}08`,
              boxShadow: justActivated ? `0 0 20px ${tierColors[cap.tier]}15` : undefined,
            }
          : undefined
      }
    >
      <span className="text-sm">{cap.icon}</span>
      <span className="font-medium truncate">{cap.name.replace(/ & .*/, '')}</span>
      {activated && <span className="ml-auto text-[9px]">✓</span>}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* PHONE CONVERSATION VIEW                                              */
/* ------------------------------------------------------------------ */
function PhoneConversation({ event }: { event: DayEvent }) {
  const ch = channels[event.channel];
  return (
    <div className="flex flex-col h-full">
      {/* Phone header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
        <span style={{ color: ch.color }}>{ch.icon}</span>
        <span className="text-white text-xs font-bold">{ch.label}</span>
        <span className="text-dim text-[10px] ml-auto">{event.time}</span>
      </div>

      {/* Conversation */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {/* Incoming message / alert */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {event.channel === 'system' ? (
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-3 text-center">
              <span className="text-sm">⚡</span>
              <p className="text-white text-xs mt-1">{event.description}</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[10px]">👤</span>
              </div>
              <div className="bg-white/5 rounded-xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                <p className="text-white text-xs">{event.description}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* AI Response */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="flex gap-2 justify-end"
        >
          <div
            className="rounded-xl rounded-tr-sm px-3 py-2 max-w-[85%]"
            style={{ background: `${tierColors[event.tier]}15` }}
          >
            <p className="text-white text-xs">{event.aiResponse}</p>
          </div>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: `${tierColors[event.tier]}20` }}
          >
            <span className="text-[10px]">🤖</span>
          </div>
        </motion.div>
      </div>

      {/* Capability badge */}
      <div className="px-3 py-2 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: tierColors[event.tier] }}
          />
          <span className="text-[10px] text-dim">
            {capabilities.find((c) => c.id === event.capability)?.name || event.capability}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN COMPONENT                                                       */
/* ------------------------------------------------------------------ */
export default function DaySimulation({ industryId }: { industryId: string }) {
  const industry = getIndustry(industryId);
  const events = industry?.dayEvents ?? [];

  const [state, setState] = useState<SimState>('idle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activatedCaps, setActivatedCaps] = useState<Set<string>>(new Set());
  const [lastActivatedCap, setLastActivatedCap] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Spring-animated stats
  const messagesVal = useMotionValue(0);
  const bookingsVal = useMotionValue(0);
  const savingsVal = useMotionValue(0);
  const messagesSpring = useSpring(messagesVal, { damping: 30, stiffness: 80 });
  const bookingsSpring = useSpring(bookingsVal, { damping: 30, stiffness: 80 });
  const savingsSpring = useSpring(savingsVal, { damping: 30, stiffness: 80 });

  // Reset when industry changes
  useEffect(() => {
    setState('idle');
    setCurrentIndex(0);
    setActivatedCaps(new Set());
    setLastActivatedCap(null);
    messagesVal.set(0);
    bookingsVal.set(0);
    savingsVal.set(0);
    // Auto-start after a brief delay
    const t = setTimeout(() => setState('playing'), 800);
    return () => clearTimeout(t);
  }, [industryId, messagesVal, bookingsVal, savingsVal]);

  // Auto-play timer
  const advance = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= events.length) {
        setState('complete');
        return prev;
      }
      return next;
    });
  }, [events.length]);

  useEffect(() => {
    if (state === 'playing' && events.length > 0) {
      intervalRef.current = setInterval(advance, 4500);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
    if (state !== 'playing' && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [state, advance, events.length]);

  // Process current event — activate capability + update stats
  useEffect(() => {
    if (events.length === 0 || currentIndex >= events.length) return;
    const event = events[currentIndex];

    // Activate capability
    setActivatedCaps((prev) => new Set(prev).add(event.capability));
    setLastActivatedCap(event.capability);
    const t = setTimeout(() => setLastActivatedCap(null), 600);

    // Increment stats
    if (event.stat) {
      if (event.stat.key === 'messages') messagesVal.set(messagesVal.get() + event.stat.increment);
      if (event.stat.key === 'bookings') bookingsVal.set(bookingsVal.get() + event.stat.increment);
      if (event.stat.key === 'savings') savingsVal.set(savingsVal.get() + event.stat.increment);
    }

    // Auto-scroll feed
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }

    return () => clearTimeout(t);
  }, [currentIndex, events, messagesVal, bookingsVal, savingsVal]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        setState((s) => (s === 'playing' ? 'paused' : s === 'paused' ? 'playing' : s));
      }
      if (e.key === 'ArrowRight' && state === 'playing') {
        advance();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state, advance]);

  const currentEvent = events[currentIndex];
  const progress = events.length > 0 ? ((currentIndex + 1) / events.length) * 100 : 0;

  // Capability IDs for the panel
  const allCapIds = useMemo(
    () => capabilities.map((c) => c.id),
    []
  );

  if (!industry || events.length === 0) {
    return (
      <section className="py-section px-6 text-center">
        <p className="text-dim">No simulation data available for this industry.</p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-8 px-4 md:px-6 bg-bg-2">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-2 block">
            {industry.emoji} {industry.label}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            A day in the life of your AI Employee
          </h2>
        </motion.div>

        {/* Timeline bar */}
        <div className="bg-bg-card border border-border rounded-xl p-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-dim text-xs font-mono whitespace-nowrap">
              {currentEvent?.time || '6:00 AM'}
            </span>
            <div className="flex-1 h-2 bg-bg rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent-2 via-accent to-accent-3"
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              />
            </div>
            <span className="text-dim text-xs font-mono whitespace-nowrap">10:00 PM</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-dim text-[11px]">
              {state === 'complete'
                ? `All ${events.length} events complete`
                : `Event ${currentIndex + 1} of ${events.length}`}
            </span>
            <div className="flex items-center gap-2">
              {state === 'complete' ? (
                <button
                  onClick={() => {
                    setCurrentIndex(0);
                    setActivatedCaps(new Set());
                    setLastActivatedCap(null);
                    messagesVal.set(0);
                    bookingsVal.set(0);
                    savingsVal.set(0);
                    setState('playing');
                  }}
                  className="text-accent text-xs font-medium hover:underline"
                >
                  🔄 Replay
                </button>
              ) : (
                <>
                  <button
                    onClick={() =>
                      setState((s) => (s === 'playing' ? 'paused' : 'playing'))
                    }
                    className="text-dim hover:text-white text-xs transition-colors"
                  >
                    {state === 'playing' ? '⏸ Pause' : '▶ Play'}
                  </button>
                  <button
                    onClick={advance}
                    className="text-dim hover:text-white text-xs transition-colors"
                  >
                    ⏭ Skip
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* DESKTOP: 3-column mission control */}
        <div className="hidden lg:grid grid-cols-[260px_1fr_220px] gap-4" style={{ height: '70vh' }}>
          {/* Left: Activity Feed */}
          <div className="flex flex-col">
            <div className="text-[10px] font-mono uppercase tracking-widest text-dim mb-2 px-1">
              Activity Feed
            </div>
            <div ref={feedRef} className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
              <AnimatePresence>
                {events.slice(0, currentIndex + 1).map((event, i) => (
                  <EventCard key={`${event.time}-${i}`} event={event} isActive={i === currentIndex} />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Center: Phone Mockup */}
          <div className="flex items-center justify-center">
            <PhoneMockup accentColor={tierColors[currentEvent?.tier || 'operator']} size="md">
              <AnimatePresence mode="wait">
                {currentEvent && (
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <PhoneConversation event={currentEvent} />
                  </motion.div>
                )}
              </AnimatePresence>
            </PhoneMockup>
          </div>

          {/* Right: Capabilities Panel */}
          <div className="flex flex-col">
            <div className="text-[10px] font-mono uppercase tracking-widest text-dim mb-2 px-1">
              Capabilities Activated
            </div>
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {allCapIds.map((capId) => (
                <CapabilityPill
                  key={capId}
                  capId={capId}
                  activated={activatedCaps.has(capId)}
                  justActivated={lastActivatedCap === capId}
                />
              ))}
            </div>
            {/* Legend */}
            <div className="mt-3 pt-3 border-t border-border space-y-1">
              {(['operator', 'manager', 'executive'] as TierId[]).map((tier) => (
                <div key={tier} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: tierColors[tier] }} />
                  <span className="text-[10px] text-dim">{tierLabels[tier]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE: Stacked layout */}
        <div className="lg:hidden space-y-4">
          {/* Phone */}
          <div className="flex justify-center">
            <PhoneMockup accentColor={tierColors[currentEvent?.tier || 'operator']} size="sm">
              <AnimatePresence mode="wait">
                {currentEvent && (
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <PhoneConversation event={currentEvent} />
                  </motion.div>
                )}
              </AnimatePresence>
            </PhoneMockup>
          </div>

          {/* Capabilities as horizontal pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 px-1 scrollbar-thin">
            {allCapIds
              .filter((id) => activatedCaps.has(id))
              .map((capId) => {
                const cap = capabilities.find((c) => c.id === capId);
                return cap ? (
                  <div
                    key={capId}
                    className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium border"
                    style={{
                      color: tierColors[cap.tier],
                      borderColor: `${tierColors[cap.tier]}25`,
                      background: `${tierColors[cap.tier]}08`,
                    }}
                  >
                    <span>{cap.icon}</span>
                    {cap.name.replace(/ & .*/, '')}
                  </div>
                ) : null;
              })}
          </div>

          {/* Activity feed — last 4 events */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-dim px-1">
              Recent Activity
            </div>
            <AnimatePresence>
              {events
                .slice(Math.max(0, currentIndex - 3), currentIndex + 1)
                .map((event, i, arr) => (
                  <EventCard
                    key={`${event.time}-${i}`}
                    event={event}
                    isActive={i === arr.length - 1}
                  />
                ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-4 bg-bg-card border border-border rounded-xl p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <motion.div className="text-accent-2 font-mono font-extrabold text-xl md:text-2xl">
                <SpringCounter spring={messagesSpring} />
              </motion.div>
              <div className="text-dim text-[11px] mt-0.5">Messages Handled</div>
            </div>
            <div>
              <motion.div className="text-accent font-mono font-extrabold text-xl md:text-2xl">
                <SpringCounter spring={bookingsSpring} />
              </motion.div>
              <div className="text-dim text-[11px] mt-0.5">Bookings Made</div>
            </div>
            <div>
              <motion.div className="text-accent-3 font-mono font-extrabold text-xl md:text-2xl">
                $<SpringCounter spring={savingsSpring} />
              </motion.div>
              <div className="text-dim text-[11px] mt-0.5">Revenue Impact</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* SPRING COUNTER — renders a spring-animated number                    */
/* ------------------------------------------------------------------ */
function SpringCounter({ spring }: { spring: ReturnType<typeof useSpring> }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v: number) => {
      setDisplay(Math.round(v));
    });
    return () => unsubscribe();
  }, [spring]);

  return <>{display.toLocaleString()}</>;
}
