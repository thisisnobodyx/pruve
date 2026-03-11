'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import ScrollPinSection from '@/components/shared/ScrollPinSection';

const ACCENT = '#F59E0B';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface ContentCard {
  label: string;
  color: string;
}

const contentCards: ContentCard[] = [
  { label: 'Blog Post', color: '#F59E0B' },
  { label: 'IG Post', color: '#E879F9' },
  { label: 'Email', color: '#38BDF8' },
  { label: 'Tweet', color: '#34D399' },
  { label: 'Ad Copy', color: '#FB923C' },
  { label: 'LinkedIn', color: '#60A5FA' },
  { label: 'Newsletter', color: '#A78BFA' },
];

// Pre-assign a content card to each calendar slot for the filled state
const slotAssignments = [
  0, 3, 1, 4, 2, 5, 6,  // row 1
  1, 2, 0, 5, 3, 4, 1,  // row 2
  4, 0, 3, 2, 6, 1, 5,  // row 3
];

export default function ProblemSection() {
  // Randomize TODO multiplications for the chaos phase
  const extraTodos = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
        day: Math.floor(Math.random() * 7),
        row: Math.floor(Math.random() * 3),
        offsetX: (Math.random() - 0.5) * 10,
        offsetY: (Math.random() - 0.5) * 8,
        rotate: (Math.random() - 0.5) * 6,
      })),
    []
  );

  return (
    <ScrollPinSection pinDuration={200} className="bg-bg">
      {(progress) => {
        // Phase 1: 0-0.3 calendar with TODOs, more multiplying
        // Phase 2: 0.3-0.5 clock spins, "20 hours a week" text
        // Phase 3: 0.5-0.8 slots fill with content cards
        // Phase 4: 0.8-1.0 clock slows, checkmark, "Done."

        const todoPhase = Math.min(progress / 0.3, 1);
        const clockPhase = progress > 0.3 ? Math.min((progress - 0.3) / 0.2, 1) : 0;
        const fillPhase = progress > 0.5 ? Math.min((progress - 0.5) / 0.3, 1) : 0;
        const donePhase = progress > 0.8 ? Math.min((progress - 0.8) / 0.2, 1) : 0;

        const filledCount = Math.floor(fillPhase * 21);
        const todoCount = Math.floor(todoPhase * extraTodos.length);
        const clockRotation = clockPhase * 720 * (1 - donePhase * 0.9);

        return (
          <div className="relative w-full h-full flex items-center justify-center px-6">
            {/* Background gradient */}
            <div
              className="absolute inset-0 transition-all duration-500"
              style={{
                background:
                  fillPhase > 0
                    ? `radial-gradient(ellipse at center, ${ACCENT}08 0%, transparent 70%)`
                    : 'radial-gradient(ellipse at center, #FF454508 0%, transparent 70%)',
              }}
            />

            {/* Clock icon in corner */}
            <div className="absolute top-12 right-12 md:top-16 md:right-16">
              {donePhase > 0.5 ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 200 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: `${ACCENT}20` }}
                >
                  <svg className="w-7 h-7" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </motion.div>
              ) : (
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center border border-white/10 bg-bg-card"
                  style={{ opacity: todoPhase > 0.2 ? 1 : 0 }}
                >
                  <svg
                    className="w-7 h-7 text-dim"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    style={{ transform: `rotate(${clockRotation}deg)`, transition: 'transform 0.1s linear' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="w-full max-w-3xl">
              {/* Section label */}
              <motion.div
                className="text-center mb-6"
                style={{ opacity: 1 - donePhase }}
              >
                <span className="font-mono text-xs tracking-widest uppercase text-dim">THE CONTENT HAMSTER WHEEL</span>
              </motion.div>

              {/* Calendar grid */}
              <div className="relative">
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                  {days.map((day) => (
                    <div key={day} className="text-center text-dim text-[10px] md:text-xs font-mono uppercase tracking-wide">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar rows */}
                {[0, 1, 2].map((row) => (
                  <div key={row} className="grid grid-cols-7 gap-1 md:gap-2 mb-1 md:mb-2">
                    {days.map((_, col) => {
                      const slotIndex = row * 7 + col;
                      const isFilled = slotIndex < filledCount;
                      const card = contentCards[slotAssignments[slotIndex]];

                      return (
                        <div
                          key={col}
                          className="relative aspect-square md:aspect-[4/3] rounded-lg border overflow-hidden transition-all duration-300"
                          style={{
                            borderColor: isFilled ? `${card.color}40` : 'rgba(255,255,255,0.05)',
                            background: isFilled ? `${card.color}10` : 'rgba(255,255,255,0.02)',
                          }}
                        >
                          {isFilled ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-0 flex flex-col items-center justify-center p-1"
                            >
                              <div
                                className="w-2 h-2 md:w-3 md:h-3 rounded-full mb-1"
                                style={{ background: card.color }}
                              />
                              <span className="text-[8px] md:text-[10px] font-medium text-white/80 text-center leading-tight">
                                {card.label}
                              </span>
                            </motion.div>
                          ) : (
                            fillPhase === 0 && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span
                                  className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider"
                                  style={{
                                    color: '#FF4545',
                                    opacity: todoPhase > 0.2 ? 0.7 : 0,
                                  }}
                                >
                                  TODO
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}

                {/* Floating extra TODOs during chaos phase */}
                {fillPhase === 0 &&
                  extraTodos.slice(0, todoCount).map((todo, i) => (
                    <motion.div
                      key={i}
                      className="absolute pointer-events-none"
                      style={{
                        left: `${(todo.day / 7) * 100 + todo.offsetX}%`,
                        top: `${(todo.row / 3) * 100 + todo.offsetY + 15}%`,
                        rotate: todo.rotate,
                        opacity: 0.5 * (1 - fillPhase),
                      }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 0.5, scale: 1 }}
                    >
                      <div className="bg-bg-card border border-[#FF4545]/20 rounded px-2 py-1">
                        <span className="text-[#FF4545] text-[8px] font-bold uppercase">TODO</span>
                      </div>
                    </motion.div>
                  ))}
              </div>

              {/* Status text */}
              <div className="text-center mt-6">
                {clockPhase > 0 && donePhase < 0.5 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1 - donePhase * 2, y: 0 }}
                    className="text-white/80 text-lg md:text-xl font-semibold"
                  >
                    20 hours a week. Still falling behind.
                  </motion.p>
                )}

                {donePhase > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: donePhase, scale: 1 }}
                  >
                    <div className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: ACCENT }}>
                      Done. Every week. Automatically.
                    </div>
                    <p className="text-dim text-base">All your content, planned and published.</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        );
      }}
    </ScrollPinSection>
  );
}
