'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneMockup from '@/components/shared/PhoneMockup';
import { channels, tierColors, tierLabels, capabilities } from './experience-data';
import type { DayEvent, TierId } from './experience-data';
import { getIndustry } from './industries';

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
          transition={{ duration: 0.25 }}
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
          transition={{ duration: 0.25, delay: 0.3 }}
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

  const [activeIndex, setActiveIndex] = useState(0);

  // Reset when industry changes
  useEffect(() => {
    setActiveIndex(0);
  }, [industryId]);

  // Collect unique activated caps up to current event
  const activatedCaps = useMemo(() => {
    const caps = new Set<string>();
    for (let i = 0; i <= activeIndex; i++) {
      if (events[i]) caps.add(events[i].capability);
    }
    return caps;
  }, [activeIndex, events]);

  // Stats up to current event
  const stats = useMemo(() => {
    let messages = 0;
    let bookings = 0;
    let savings = 0;
    for (let i = 0; i <= activeIndex; i++) {
      const e = events[i];
      if (e?.stat) {
        if (e.stat.key === 'messages') messages += e.stat.increment;
        if (e.stat.key === 'bookings') bookings += e.stat.increment;
        if (e.stat.key === 'savings') savings += e.stat.increment;
      }
    }
    return { messages, bookings, savings };
  }, [activeIndex, events]);

  const currentEvent = events[activeIndex];

  if (!industry || events.length === 0) {
    return (
      <section className="py-section-mobile md:py-section px-6 text-center">
        <p className="text-dim">No simulation data available for this industry.</p>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 md:px-6 bg-bg-2">
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
          <p className="text-dim text-sm mt-2">Click any event to see how your AI handles it</p>
        </motion.div>

        {/* DESKTOP: 2-column layout — Timeline on left, Phone on right */}
        <div className="hidden lg:grid grid-cols-[1fr_340px] gap-6 items-start">
          {/* Left: Event Timeline */}
          <div className="space-y-1.5">
            {events.map((event, i) => {
              const isActive = i === activeIndex;
              const ch = channels[event.channel];
              const cap = capabilities.find((c) => c.id === event.capability);

              return (
                <motion.button
                  key={`${event.time}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  onClick={() => setActiveIndex(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 group ${
                    isActive
                      ? 'bg-bg-card shadow-lg scale-[1.01]'
                      : 'bg-bg-card/30 hover:bg-bg-card/60'
                  }`}
                  style={{
                    borderColor: isActive ? `${tierColors[event.tier]}40` : 'transparent',
                    borderLeftWidth: 3,
                    borderLeftColor: isActive ? tierColors[event.tier] : `${tierColors[event.tier]}30`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Time */}
                    <span className="text-[11px] font-mono text-dim w-16 shrink-0">
                      {event.time}
                    </span>

                    {/* Channel icon */}
                    <span className="text-sm" title={ch.label}>
                      {ch.icon}
                    </span>

                    {/* Title + description */}
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-semibold truncate">
                        {event.title}
                      </div>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-dim text-xs mt-1 line-clamp-2"
                        >
                          {event.description}
                        </motion.p>
                      )}
                    </div>

                    {/* Tier + Capability badges */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {cap && (
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded-full font-mono hidden xl:inline-block"
                          style={{
                            color: tierColors[cap.tier],
                            background: `${tierColors[cap.tier]}10`,
                          }}
                        >
                          {cap.name.split(' ')[0]}
                        </span>
                      )}
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
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Phone + Stats (sticky) */}
          <div className="sticky top-24 space-y-4">
            {/* Phone */}
            <PhoneMockup accentColor={tierColors[currentEvent?.tier || 'operator']} size="md">
              <AnimatePresence mode="wait">
                {currentEvent && (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <PhoneConversation event={currentEvent} />
                  </motion.div>
                )}
              </AnimatePresence>
            </PhoneMockup>

            {/* Activated capabilities */}
            <div className="bg-bg-card/50 border border-border rounded-xl p-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-dim mb-2">
                Capabilities Used
              </div>
              <div className="flex flex-wrap gap-1">
                {capabilities.map((cap) => {
                  const isActivated = activatedCaps.has(cap.id);
                  return (
                    <span
                      key={cap.id}
                      className={`text-[10px] px-2 py-0.5 rounded-full transition-all duration-300 ${
                        isActivated
                          ? 'font-medium'
                          : 'text-white/15'
                      }`}
                      style={
                        isActivated
                          ? {
                              color: tierColors[cap.tier],
                              background: `${tierColors[cap.tier]}10`,
                              border: `1px solid ${tierColors[cap.tier]}20`,
                            }
                          : { border: '1px solid rgba(255,255,255,0.05)' }
                      }
                    >
                      {cap.icon} {cap.name.replace(/ & .*/, '')}
                    </span>
                  );
                })}
              </div>
              {/* Legend */}
              <div className="flex items-center gap-3 mt-2 pt-2 border-t border-border">
                {(['operator', 'manager', 'executive'] as TierId[]).map((tier) => (
                  <div key={tier} className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: tierColors[tier] }} />
                    <span className="text-[9px] text-dim">{tierLabels[tier]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-bg-card/50 border border-border rounded-lg p-2 text-center">
                <div className="text-accent-2 font-mono font-bold text-lg">{stats.messages}</div>
                <div className="text-dim text-[9px]">Messages</div>
              </div>
              <div className="bg-bg-card/50 border border-border rounded-lg p-2 text-center">
                <div className="text-accent font-mono font-bold text-lg">{stats.bookings}</div>
                <div className="text-dim text-[9px]">Bookings</div>
              </div>
              <div className="bg-bg-card/50 border border-border rounded-lg p-2 text-center">
                <div className="text-accent-3 font-mono font-bold text-lg">${stats.savings}</div>
                <div className="text-dim text-[9px]">Revenue</div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE: Stacked layout — Phone on top, scrollable event list below */}
        <div className="lg:hidden space-y-4">
          {/* Phone */}
          <div className="flex justify-center">
            <PhoneMockup accentColor={tierColors[currentEvent?.tier || 'operator']} size="sm">
              <AnimatePresence mode="wait">
                {currentEvent && (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <PhoneConversation event={currentEvent} />
                  </motion.div>
                )}
              </AnimatePresence>
            </PhoneMockup>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-bg-card/50 border border-border rounded-lg p-2 text-center">
              <div className="text-accent-2 font-mono font-bold">{stats.messages}</div>
              <div className="text-dim text-[9px]">Messages</div>
            </div>
            <div className="bg-bg-card/50 border border-border rounded-lg p-2 text-center">
              <div className="text-accent font-mono font-bold">{stats.bookings}</div>
              <div className="text-dim text-[9px]">Bookings</div>
            </div>
            <div className="bg-bg-card/50 border border-border rounded-lg p-2 text-center">
              <div className="text-accent-3 font-mono font-bold">${stats.savings}</div>
              <div className="text-dim text-[9px]">Revenue</div>
            </div>
          </div>

          {/* Activated caps */}
          <div className="flex gap-1 overflow-x-auto pb-1 px-1 scrollbar-thin">
            {capabilities
              .filter((c) => activatedCaps.has(c.id))
              .map((cap) => (
                <span
                  key={cap.id}
                  className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={{
                    color: tierColors[cap.tier],
                    background: `${tierColors[cap.tier]}08`,
                    border: `1px solid ${tierColors[cap.tier]}20`,
                  }}
                >
                  {cap.icon} {cap.name.replace(/ & .*/, '')}
                </span>
              ))}
          </div>

          {/* Event list */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-dim px-1">
              Timeline — tap to preview
            </div>
            {events.map((event, i) => {
              const isActive = i === activeIndex;
              const ch = channels[event.channel];

              return (
                <button
                  key={`${event.time}-${i}`}
                  onClick={() => setActiveIndex(i)}
                  className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
                    isActive ? 'bg-bg-card' : 'bg-bg-card/20'
                  }`}
                  style={{
                    borderColor: isActive ? `${tierColors[event.tier]}30` : 'transparent',
                    borderLeftWidth: 3,
                    borderLeftColor: isActive ? tierColors[event.tier] : `${tierColors[event.tier]}20`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-dim">{event.time}</span>
                    <span className="text-xs">{ch.icon}</span>
                    <span className={`text-xs font-medium truncate ${isActive ? 'text-white' : 'text-white/60'}`}>
                      {event.title}
                    </span>
                    <span
                      className="text-[8px] px-1 py-0.5 rounded-full font-mono ml-auto shrink-0"
                      style={{
                        color: tierColors[event.tier],
                        background: `${tierColors[event.tier]}10`,
                      }}
                    >
                      {tierLabels[event.tier].replace('The ', '')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
