'use client';

import { motion } from 'framer-motion';
import ScrollPinSection from '@/components/shared/ScrollPinSection';

const ACCENT = '#EC4899';

interface Task {
  label: string;
  hours: number;
}

const tasks: Task[] = [
  { label: 'Write captions', hours: 3 },
  { label: 'Design graphics', hours: 4 },
  { label: 'Schedule posts', hours: 2 },
  { label: 'Reply to comments', hours: 3 },
  { label: 'Analyze metrics', hours: 2 },
  { label: 'Research trends', hours: 2 },
];

const totalHours = tasks.reduce((sum, t) => sum + t.hours, 0); // 16

/* ─── Clock face SVG ─── */
function ClockFace({ progress }: { progress: number }) {
  const hourAngle = progress * 360 * 2; // spins a couple times
  const minuteAngle = progress * 360 * 12;

  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40 md:w-48 md:h-48">
      {/* Clock circle */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
      {/* Tick marks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + 80 * Math.sin(angle);
        const y1 = 100 - 80 * Math.cos(angle);
        const x2 = 100 + 88 * Math.sin(angle);
        const y2 = 100 - 88 * Math.cos(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
      {/* Hour hand */}
      <line
        x1="100"
        y1="100"
        x2={100 + 45 * Math.sin((hourAngle * Math.PI) / 180)}
        y2={100 - 45 * Math.cos((hourAngle * Math.PI) / 180)}
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Minute hand */}
      <line
        x1="100"
        y1="100"
        x2={100 + 60 * Math.sin((minuteAngle * Math.PI) / 180)}
        y2={100 - 60 * Math.cos((minuteAngle * Math.PI) / 180)}
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Center dot */}
      <circle cx="100" cy="100" r="4" fill="white" />
    </svg>
  );
}

/* ─── AI icon for the "absorbed" state ─── */
function AIIcon() {
  return (
    <div
      className="w-20 h-20 rounded-2xl flex items-center justify-center border"
      style={{ background: `${ACCENT}15`, borderColor: `${ACCENT}40` }}
    >
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke={ACCENT} strokeWidth="1.5">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
        <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4Z" />
        <circle cx="9" cy="7" r="0.5" fill={ACCENT} />
        <circle cx="15" cy="7" r="0.5" fill={ACCENT} />
      </svg>
    </div>
  );
}

export default function ProblemSection() {
  return (
    <ScrollPinSection pinDuration={500} className="bg-bg">
      {(progress) => {
        // Phase 1: 0-0.25: Clock appears, tasks orbit one by one
        // Phase 2: 0.25-0.4: "16 hours a week" stat with dark overlay
        // Phase 3: 0.4-0.55: Tasks shrink, absorbed into AI icon
        // Phase 4: 0.55-1.0: "1 hour/week. The rest is automated."

        const clockPhase = Math.min(progress / 0.25, 1);
        const statPhase = progress > 0.25 ? Math.min((progress - 0.25) / 0.12, 1) : 0;
        const absorbPhase = progress > 0.4 ? Math.min((progress - 0.4) / 0.15, 1) : 0;
        const solvedPhase = progress > 0.55 ? Math.min((progress - 0.55) / 0.3, 1) : 0;

        const visibleTasks = Math.floor(clockPhase * tasks.length);
        const currentHours = absorbPhase > 0
          ? Math.round(totalHours - (totalHours - 1) * absorbPhase)
          : Math.round(clockPhase * totalHours);

        // Task scale when being absorbed
        const taskScale = absorbPhase > 0 ? 1 - absorbPhase * 0.8 : 1;
        const taskOpacity = absorbPhase > 0 ? 1 - absorbPhase : 1;

        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${
                  solvedPhase > 0 ? `${ACCENT}08` : 'rgba(255,69,69,0.03)'
                } 0%, transparent 70%)`,
                transition: 'background 0.5s',
              }}
            />

            {/* Section label */}
            <div
              className="absolute top-10 left-1/2 -translate-x-1/2 text-center"
              style={{ opacity: clockPhase }}
            >
              <span className="font-mono text-sm tracking-widest uppercase" style={{ color: ACCENT }}>
                THE PROBLEM
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
                The Social Media Grind
              </h2>
            </div>

            {/* Clock + orbiting tasks (phases 1-3) */}
            {solvedPhase < 1 && (
              <div
                className="relative flex items-center justify-center"
                style={{ opacity: solvedPhase > 0 ? 1 - solvedPhase : 1 }}
              >
                {/* Clock or AI icon */}
                <div className="relative z-10">
                  {absorbPhase > 0.8 ? (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <AIIcon />
                    </motion.div>
                  ) : (
                    <ClockFace progress={clockPhase} />
                  )}
                </div>

                {/* Orbiting task labels */}
                {tasks.slice(0, visibleTasks).map((task, i) => {
                  const angle = ((360 / tasks.length) * i - 90) * (Math.PI / 180);
                  const radius = absorbPhase > 0 ? 160 * (1 - absorbPhase) : 160;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <motion.div
                      key={task.label}
                      className="absolute"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        opacity: taskOpacity,
                        scale: taskScale,
                        x,
                        y,
                      }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <div className="bg-bg-card border border-border rounded-lg px-3 py-2 whitespace-nowrap text-center">
                        <span className="text-white text-xs font-medium">{task.label}</span>
                        <span className="text-dim text-[10px] ml-1.5">({task.hours}hrs)</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Dark overlay when stat appears */}
            {statPhase > 0 && absorbPhase < 1 && (
              <div
                className="absolute inset-0 z-[5]"
                style={{
                  background: 'rgba(5, 5, 12, 0.95)',
                  opacity: Math.min(Math.min(statPhase * 2, 1), absorbPhase > 0 ? 1 - absorbPhase : 1),
                }}
              />
            )}

            {/* Hours counter */}
            {clockPhase > 0.3 && solvedPhase < 1 && (
              <div
                className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center z-10"
                style={{
                  opacity: Math.min(statPhase, solvedPhase > 0 ? 1 - solvedPhase : 1),
                }}
              >
                <div
                  className="text-5xl md:text-7xl font-extrabold mb-2 tabular-nums"
                  style={{ color: absorbPhase > 0.5 ? ACCENT : '#FF4545' }}
                >
                  {currentHours} hours/week
                </div>
                {absorbPhase < 0.3 && (
                  <p className="text-white/70 text-lg">
                    spent on social media.
                  </p>
                )}
              </div>
            )}

            {/* Solved state */}
            {solvedPhase > 0 && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: solvedPhase }}
              >
                <div className="text-center max-w-lg px-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={solvedPhase > 0.2 ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-6 flex justify-center"
                  >
                    <AIIcon />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={solvedPhase > 0.3 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-5xl md:text-6xl font-extrabold mb-3" style={{ color: ACCENT }}>
                      1 hour/week.
                    </div>
                    <p className="text-white/80 text-xl mb-6">
                      The rest is automated.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={solvedPhase > 0.6 ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, type: 'spring' }}
                    className="inline-flex items-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke={ACCENT} strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-dim text-lg">Content created, scheduled, and posted for you.</span>
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
