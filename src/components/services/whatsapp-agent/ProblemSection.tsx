'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import ScrollPinSection from '@/components/shared/ScrollPinSection';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

const ACCENT = '#25D366';

interface MissedMessage {
  name: string;
  text: string;
  time: string;
  urgent?: boolean;
}

const missedMessages: MissedMessage[] = [
  { name: 'Sarah K.', text: 'Hi, are you open today?', time: '12 hours ago' },
  { name: 'Mike R.', text: 'Can I book for tomorrow?', time: '8 hours ago' },
  { name: 'Jessica L.', text: 'Hello?? Anyone there?', time: '3 hours ago', urgent: true },
  { name: 'David M.', text: 'What are your prices?', time: '2 hours ago' },
  { name: 'Emma W.', text: 'Do you have availability?', time: '1 hour ago' },
  { name: 'Sarah K.', text: "I'll go somewhere else.", time: '45 min ago', urgent: true },
  { name: 'Tom B.', text: 'Need a quote ASAP', time: '30 min ago' },
  { name: 'Lisa P.', text: 'Is anyone reading these?', time: '15 min ago', urgent: true },
];

const handledMessages = [
  { name: 'Sarah K.', text: 'Table booked for 7:30pm ✅', time: 'Instantly' },
  { name: 'Mike R.', text: 'Appointment confirmed ✅', time: 'Instantly' },
  { name: 'Jessica L.', text: 'FAQ answered ✅', time: '2 seconds' },
  { name: 'David M.', text: 'Pricing sent ✅', time: '3 seconds' },
];

export default function ProblemSection() {
  const messagePositions = useMemo(
    () =>
      missedMessages.map(() => ({
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 30,
        rotate: (Math.random() - 0.5) * 12,
      })),
    []
  );

  return (
    <ScrollPinSection pinDuration={500} className="bg-bg">
      {(progress) => {
        // Phase 1: 0-0.25 — messages accumulate chaotically
        // Phase 2: 0.25-0.4 — stat appears with dark overlay
        // Phase 3: 0.4-0.5 — quick fade out
        // Phase 4: 0.5-1.0 — solved state

        const chaosPhase = Math.min(progress / 0.25, 1);
        const statPhase = progress > 0.25 ? Math.min((progress - 0.25) / 0.15, 1) : 0;
        const clearPhase = progress > 0.4 ? Math.min((progress - 0.4) / 0.1, 1) : 0;
        const solvedPhase = progress > 0.5 ? Math.min((progress - 0.5) / 0.3, 1) : 0;

        const visibleCount = Math.floor(chaosPhase * missedMessages.length);
        const unreadCount = Math.round(chaosPhase * 47);

        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, ${
                  clearPhase > 0 ? `${ACCENT}08` : '#FF454508'
                } 0%, transparent 70%)`,
                transition: 'background 0.5s',
              }}
            />

            {/* Unread counter */}
            {clearPhase < 1 && (
              <div
                className="absolute top-16 right-16 bg-[#FF4545] text-white text-sm font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg shadow-[#FF4545]/30"
                style={{ opacity: chaosPhase > 0.1 ? 1 - clearPhase : 0 }}
              >
                {unreadCount}
              </div>
            )}

            {/* Missed messages — chaotic accumulation */}
            {clearPhase < 1 && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: 1 - clearPhase }}
              >
                {missedMessages.slice(0, visibleCount).map((msg, i) => {
                  const pos = messagePositions[i];
                  return (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        x: `${pos.x}%`,
                        y: `${pos.y}%`,
                        rotate: pos.rotate,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`bg-bg-card border rounded-xl px-4 py-3 min-w-[220px] shadow-lg ${
                          msg.urgent ? 'border-[#FF4545]/40' : 'border-border'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white text-sm font-medium">{msg.name}</span>
                          <span className="text-dim text-[11px]">{msg.time}</span>
                        </div>
                        <p className="text-dim text-xs truncate">{msg.text}</p>
                        {msg.urgent && (
                          <div className="mt-1.5 text-[10px] font-bold text-[#FF4545] uppercase tracking-wide">
                            Unanswered
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Dark overlay that dims messages when stat appears */}
            {statPhase > 0 && clearPhase < 1 && (
              <div
                className="absolute inset-0 z-[5]"
                style={{
                  background: 'rgba(5, 5, 12, 0.95)',
                  opacity: Math.min(Math.min(statPhase * 2, 1), 1 - clearPhase),
                }}
              />
            )}

            {/* Central stat */}
            <div
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{
                opacity: statPhase > 0 ? Math.min(statPhase, 1 - clearPhase) : 0,
              }}
            >
              <div className="text-center max-w-lg px-6">
                <div className="text-5xl md:text-7xl font-extrabold text-[#FF4545] mb-4">78%</div>
                <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                  of customers who don&apos;t get a reply within 5 minutes buy from a competitor.
                </p>
              </div>
            </div>

            {/* Solved state */}
            {solvedPhase > 0 && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: solvedPhase }}
              >
                <div className="text-center max-w-lg px-6">
                  {/* Handled messages */}
                  <div className="space-y-3 mb-8">
                    {handledMessages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={solvedPhase > 0.3 + i * 0.15 ? { opacity: 1, y: 0 } : {}}
                        className="bg-bg-card border rounded-xl px-5 py-3 flex items-center justify-between"
                        style={{ borderColor: `${ACCENT}30` }}
                      >
                        <div>
                          <span className="text-white text-sm font-medium">{msg.name}</span>
                          <span className="text-dim text-xs ml-2">{msg.text}</span>
                        </div>
                        <span className="text-xs font-mono shrink-0 ml-3" style={{ color: ACCENT }}>
                          {msg.time}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={solvedPhase > 0.7 ? { opacity: 1, scale: 1 } : {}}
                  >
                    <div className="text-4xl md:text-5xl font-extrabold mb-3" style={{ color: ACCENT }}>
                      All handled.
                    </div>
                    <p className="text-dim text-lg">Every message. Every time. In seconds.</p>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </ScrollPinSection>
  );
}
