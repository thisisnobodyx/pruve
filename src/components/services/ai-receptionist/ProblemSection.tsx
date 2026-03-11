'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import ScrollPinSection from '@/components/shared/ScrollPinSection';

const ACCENT = '#C9A84C';

interface MissedCall {
  name: string;
  text: string;
  time: string;
  type: 'missed' | 'voicemail';
}

const missedCalls: MissedCall[] = [
  { name: 'John Smith', text: 'Missed Call', time: '9:02 AM', type: 'missed' },
  { name: 'Sarah Johnson', text: 'Missed Call', time: '9:15 AM', type: 'missed' },
  { name: 'Voicemail', text: 'Hi, I wanted to book...', time: '9:23 AM', type: 'voicemail' },
  { name: 'Michael Chen', text: 'Missed Call', time: '9:41 AM', type: 'missed' },
  { name: 'Emily Davis', text: 'Missed Call', time: '10:05 AM', type: 'missed' },
  { name: 'Voicemail', text: 'I need to reschedule my...', time: '10:12 AM', type: 'voicemail' },
  { name: 'Robert Kim', text: 'Missed Call', time: '10:30 AM', type: 'missed' },
  { name: 'Lisa Park', text: 'Missed Call', time: '10:47 AM', type: 'missed' },
];

const handledCalls = [
  { name: 'John Smith', text: 'Appointment booked for 2pm', time: 'Answered in 2 rings' },
  { name: 'Sarah Johnson', text: 'Callback scheduled', time: 'Answered in 1 ring' },
  { name: 'Michael Chen', text: 'Hours & directions sent via SMS', time: 'Answered instantly' },
  { name: 'Emily Davis', text: 'Transferred to Dr. Williams', time: 'Answered in 2 rings' },
];

export default function ProblemSection() {
  const cardOffsets = useMemo(
    () =>
      missedCalls.map((_, i) => ({
        y: i * 52,
        x: (i % 2 === 0 ? -1 : 1) * (10 + Math.random() * 20),
        rotate: (Math.random() - 0.5) * 6,
      })),
    []
  );

  return (
    <ScrollPinSection pinDuration={200} className="bg-bg">
      {(progress) => {
        // Phase 1: 0-0.3 — Missed call notifications stack up
        // Phase 2: 0.3-0.5 — Stat appears
        // Phase 3: 0.5-0.7 — Everything clears
        // Phase 4: 0.7-1.0 — Solved state

        const stackPhase = Math.min(progress / 0.3, 1);
        const statPhase = progress > 0.3 ? Math.min((progress - 0.3) / 0.2, 1) : 0;
        const clearPhase = progress > 0.5 ? Math.min((progress - 0.5) / 0.2, 1) : 0;
        const solvedPhase = progress > 0.7 ? Math.min((progress - 0.7) / 0.3, 1) : 0;

        const visibleCount = Math.floor(stackPhase * missedCalls.length);
        const missedCount = Math.round(stackPhase * visibleCount);

        return (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Background pulse */}
            <div
              className="absolute inset-0 transition-all duration-700"
              style={{
                background:
                  clearPhase > 0.5
                    ? `radial-gradient(ellipse at center, ${ACCENT}08 0%, transparent 70%)`
                    : 'radial-gradient(ellipse at center, #FF454508 0%, transparent 70%)',
              }}
            />

            {/* Missed counter */}
            {clearPhase < 1 && (
              <motion.div
                className="absolute top-20 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20"
                style={{ opacity: stackPhase > 0.1 ? 1 - clearPhase : 0 }}
              >
                <div className="bg-[#FF4545] text-white text-sm font-bold rounded-full px-4 py-2 shadow-lg shadow-[#FF4545]/20">
                  Missed today: {missedCount}
                </div>
              </motion.div>
            )}

            {/* Stacking missed call cards */}
            {clearPhase < 1 && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: 1 - clearPhase }}
              >
                <div className="relative w-[320px]" style={{ height: `${visibleCount * 52 + 60}px` }}>
                  {missedCalls.slice(0, visibleCount).map((call, i) => {
                    const offset = cardOffsets[i];
                    return (
                      <motion.div
                        key={i}
                        className="absolute left-0 right-0"
                        style={{
                          top: offset.y,
                          x: offset.x,
                          rotate: offset.rotate,
                        }}
                        initial={{ opacity: 0, y: -30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`bg-bg-card border rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg ${
                            call.type === 'voicemail' ? 'border-[#FF4545]/30' : 'border-border'
                          }`}
                        >
                          {/* Phone icon */}
                          <div className="w-8 h-8 rounded-full bg-[#FF4545]/20 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-[#FF4545]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75L18 6m0 0l2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 016.75 2.25H9a.75.75 0 01.713.513l1.072 3.215a.75.75 0 01-.154.782l-1.67 1.67a.75.75 0 00-.148.543 11.876 11.876 0 006.29 6.29.75.75 0 00.543-.148l1.67-1.67a.75.75 0 01.782-.154l3.215 1.072A.75.75 0 0121.75 15v2.25a2.25 2.25 0 01-2.25 2.25h-1.5z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-white text-sm font-medium">{call.name}</span>
                              <span className="text-dim text-[11px] shrink-0 ml-2">{call.time}</span>
                            </div>
                            <p className="text-dim text-xs truncate">
                              {call.type === 'voicemail' ? (
                                <span className="italic">&ldquo;{call.text}&rdquo;</span>
                              ) : (
                                <span className="text-[#FF4545]">{call.text}</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Central stat */}
            <div
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{
                opacity: statPhase > 0 ? Math.min(statPhase, clearPhase < 0.5 ? 1 : 1 - (clearPhase - 0.5) * 2) : 0,
              }}
            >
              <div className="text-center max-w-lg px-6">
                <div className="text-5xl md:text-6xl font-extrabold text-[#FF4545] mb-4">
                  $75,000
                </div>
                <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                  lost per year by businesses that miss calls during business hours.
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
                  {/* Zero missed badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={solvedPhase > 0.1 ? { opacity: 1, scale: 1 } : {}}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
                    style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }}
                  >
                    <svg className="w-5 h-5" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-white font-bold text-lg">0 Missed Calls</span>
                  </motion.div>

                  {/* Handled entries */}
                  <div className="space-y-3 mb-8">
                    {handledCalls.map((call, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={solvedPhase > 0.2 + i * 0.12 ? { opacity: 1, y: 0 } : {}}
                        className="bg-bg-card border rounded-xl px-5 py-3 flex items-center justify-between"
                        style={{ borderColor: `${ACCENT}30` }}
                      >
                        <div className="text-left">
                          <span className="text-white text-sm font-medium">{call.name}</span>
                          <span className="text-dim text-xs ml-2">{call.text}</span>
                        </div>
                        <span className="text-xs font-mono shrink-0 ml-3" style={{ color: ACCENT }}>
                          {call.time}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={solvedPhase > 0.7 ? { opacity: 1, scale: 1 } : {}}
                  >
                    <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                      Every call. <span style={{ color: ACCENT }}>Handled.</span>
                    </div>
                    <p className="text-dim text-lg">Answered by AI in under 2 rings. Every time.</p>
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
