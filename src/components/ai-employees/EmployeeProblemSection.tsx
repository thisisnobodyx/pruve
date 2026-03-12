'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import ScrollPinSection from '@/components/shared/ScrollPinSection';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

const chaosNotifications = [
  { text: 'Missed Call — Sarah K.', icon: '📞', type: 'danger' },
  { text: 'Unread WhatsApp (12)', icon: '💬', type: 'warning' },
  { text: 'Lead expired — no follow-up', icon: '🧲', type: 'danger' },
  { text: 'Blog post overdue 3 days', icon: '✍️', type: 'warning' },
  { text: 'Instagram — 0 posts this week', icon: '📱', type: 'warning' },
  { text: 'Voicemail: "Hello? Anyone?"', icon: '📞', type: 'danger' },
  { text: 'Competitor launched new offer', icon: '🔍', type: 'info' },
  { text: 'Invoice not sent — Mike R.', icon: '📄', type: 'warning' },
  { text: '5-star review — no response', icon: '⭐', type: 'info' },
  { text: 'Booking request expired', icon: '📅', type: 'danger' },
];

const solvedTasks = [
  { text: 'Call answered in 2 seconds', icon: '📞', employee: 'Operator', color: '#7DF9C0' },
  { text: 'Lead captured and scored (87/100)', icon: '🧲', employee: 'Manager', color: '#7C3AED' },
  { text: 'Social post published on 3 platforms', icon: '📱', employee: 'Manager', color: '#7C3AED' },
  { text: 'Competitor report generated', icon: '🔍', employee: 'Executive', color: '#C8F135' },
  { text: 'WhatsApp reply sent in 1.2s', icon: '💬', employee: 'Operator', color: '#7DF9C0' },
  { text: 'Weekly performance report sent', icon: '📊', employee: 'Executive', color: '#C8F135' },
];

export default function EmployeeProblemSection() {
  const positions = useMemo(
    () =>
      chaosNotifications.map(() => ({
        x: (Math.random() - 0.5) * 70,
        y: (Math.random() - 0.5) * 50,
        rotate: (Math.random() - 0.5) * 15,
      })),
    []
  );

  return (
    <ScrollPinSection pinDuration={600} className="bg-bg">
      {(progress) => {
        // Phase 1: 0–0.2 — chaos notifications accumulate
        // Phase 2: 0.2–0.35 — dark overlay + stat
        // Phase 3: 0.35–0.5 — crossfade
        // Phase 4: 0.5–1.0 — solved state with three desks

        const chaosPhase = Math.min(progress / 0.2, 1);
        const statPhase = progress > 0.2 ? Math.min((progress - 0.2) / 0.12, 1) : 0;
        const clearPhase = progress > 0.35 ? Math.min((progress - 0.35) / 0.1, 1) : 0;
        const solvedPhase = progress > 0.5 ? Math.min((progress - 0.5) / 0.3, 1) : 0;

        const visibleCount = Math.floor(chaosPhase * chaosNotifications.length);
        const unreadCount = Math.round(chaosPhase * 47);

        return (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Background gradient */}
            <div
              className="absolute inset-0 transition-all duration-700"
              style={{
                background: clearPhase > 0.5
                  ? 'radial-gradient(ellipse at center, rgba(124,58,237,0.04) 0%, transparent 70%)'
                  : 'radial-gradient(ellipse at center, rgba(255,69,69,0.04) 0%, transparent 70%)',
              }}
            />

            {/* Unread counter */}
            {clearPhase < 1 && (
              <div
                className="absolute top-16 right-16 bg-[#FF4545] text-white text-sm font-bold rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-[#FF4545]/30 z-20"
                style={{ opacity: chaosPhase > 0.1 ? 1 - clearPhase : 0 }}
              >
                {unreadCount}
              </div>
            )}

            {/* Phase 1: Chaos notifications */}
            {clearPhase < 1 && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: 1 - clearPhase }}
              >
                {/* Desk icon in center */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: chaosPhase > 0 ? 0.15 : 0 }}
                  className="text-[120px] select-none"
                >
                  🖥️
                </motion.div>

                {/* Floating notifications */}
                {chaosNotifications.slice(0, visibleCount).map((notif, i) => {
                  const pos = positions[i];
                  return (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{ x: `${pos.x}%`, y: `${pos.y}%`, rotate: pos.rotate }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`bg-bg-card border rounded-xl px-4 py-2.5 min-w-[200px] shadow-lg ${
                        notif.type === 'danger' ? 'border-[#FF4545]/40' : notif.type === 'warning' ? 'border-[#F59E0B]/30' : 'border-border'
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="text-base">{notif.icon}</span>
                          <span className="text-white text-xs font-medium">{notif.text}</span>
                        </div>
                        {notif.type === 'danger' && (
                          <div className="mt-1 text-[9px] font-bold text-[#FF4545] uppercase tracking-wide">
                            Unhandled
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Dark overlay for stat */}
            {statPhase > 0 && clearPhase < 1 && (
              <div
                className="absolute inset-0 z-[5]"
                style={{
                  background: 'rgba(5, 5, 12, 0.95)',
                  opacity: Math.min(Math.min(statPhase * 2, 1), 1 - clearPhase),
                }}
              />
            )}

            {/* Phase 2: Central stat */}
            <div
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{
                opacity: statPhase > 0 ? Math.min(statPhase, 1 - clearPhase) : 0,
              }}
            >
              <div className="text-center max-w-lg px-6">
                <div className="text-5xl md:text-7xl font-extrabold text-[#FF4545] mb-4">
                  $14,800
                </div>
                <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                  lost per month by businesses trying to do everything manually.
                </p>
              </div>
            </div>

            {/* Phase 4: Solved state */}
            {solvedPhase > 0 && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: solvedPhase }}
              >
                <div className="w-full max-w-4xl px-6">
                  {/* Three desk workstations */}
                  <div className="flex justify-center gap-6 mb-10">
                    {[
                      { name: 'The Operator', emoji: '🎧', color: '#7DF9C0' },
                      { name: 'The Manager', emoji: '📊', color: '#7C3AED' },
                      { name: 'The Executive', emoji: '👔', color: '#C8F135' },
                    ].map((desk, i) => (
                      <motion.div
                        key={desk.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={solvedPhase > 0.1 + i * 0.1 ? { opacity: 1, y: 0 } : {}}
                        className="text-center"
                      >
                        <div
                          className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-3xl md:text-4xl mx-auto mb-3 border"
                          style={{
                            background: `${desk.color}10`,
                            borderColor: `${desk.color}30`,
                            boxShadow: `0 0 30px ${desk.color}15`,
                          }}
                        >
                          {desk.emoji}
                        </div>
                        <div className="text-white text-xs md:text-sm font-bold">{desk.name}</div>
                        {/* Status dot */}
                        <div className="flex items-center justify-center gap-1.5 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: desk.color }} />
                          <span className="text-[10px]" style={{ color: desk.color }}>Online</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Task completions */}
                  <div className="space-y-2 max-w-xl mx-auto mb-8">
                    {solvedTasks.map((task, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={solvedPhase > 0.3 + i * 0.08 ? { opacity: 1, x: 0 } : {}}
                        className="bg-bg-card border border-border rounded-xl px-4 py-2.5 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{task.icon}</span>
                          <span className="text-white text-xs">{task.text}</span>
                        </div>
                        <span className="text-[10px] font-mono shrink-0 ml-3" style={{ color: task.color }}>
                          {task.employee}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Summary */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={solvedPhase > 0.8 ? { opacity: 1, scale: 1 } : {}}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-5xl font-extrabold text-white mb-2">
                      All handled. <span className="text-accent">24/7.</span>
                    </div>
                    <p className="text-dim text-lg">Three employees. Zero missed opportunities.</p>
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
