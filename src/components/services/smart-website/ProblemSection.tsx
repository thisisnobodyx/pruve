'use client';

import { motion } from 'framer-motion';
import ScrollPinSection from '@/components/shared/ScrollPinSection';
import BrowserMockup from '@/components/shared/BrowserMockup';

const ACCENT = '#7C3AED';

function DumbWebsite({ opacity }: { opacity: number }) {
  return (
    <div style={{ opacity }} className="transition-opacity duration-300">
      <BrowserMockup url="oldbiz.com" className="w-[380px] max-w-full">
        <div className="h-[260px] bg-[#1a1a1a] p-4 grayscale" style={{ filter: `grayscale(100%) brightness(0.7)` }}>
          {/* Boring nav */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-16 h-3 rounded bg-white/10" />
            <div className="flex gap-2">
              <div className="w-10 h-2 rounded bg-white/6" />
              <div className="w-10 h-2 rounded bg-white/6" />
              <div className="w-10 h-2 rounded bg-white/6" />
            </div>
          </div>
          {/* Boring hero */}
          <div className="space-y-2 mb-4">
            <div className="w-3/4 h-4 rounded bg-white/8" />
            <div className="w-1/2 h-4 rounded bg-white/8" />
            <div className="w-full h-2 rounded bg-white/4 mt-3" />
            <div className="w-4/5 h-2 rounded bg-white/4" />
          </div>
          {/* Boring CTA */}
          <div className="w-28 h-8 rounded bg-white/8 mt-4" />
          {/* Boring grid */}
          <div className="flex gap-2 mt-5">
            <div className="flex-1 h-12 rounded bg-white/4" />
            <div className="flex-1 h-12 rounded bg-white/4" />
          </div>
        </div>
      </BrowserMockup>
    </div>
  );
}

function SmartWebsite({ opacity, alive }: { opacity: number; alive: number }) {
  return (
    <div style={{ opacity }} className="transition-opacity duration-300">
      <BrowserMockup url="smartbiz.co" className="w-[380px] max-w-full">
        <div className="h-[260px] bg-[#0f0a1a] p-4 relative overflow-hidden">
          {/* Vibrant nav */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-20 h-3 rounded" style={{ background: `${ACCENT}40` }} />
            <div className="flex gap-3 items-center">
              <div className="w-10 h-2 rounded bg-white/15" />
              <div className="w-10 h-2 rounded bg-white/15" />
              <div className="w-16 h-6 rounded-full" style={{ background: ACCENT }} />
            </div>
          </div>
          {/* Vibrant hero */}
          <div className="space-y-2 mb-4">
            <div className="w-3/4 h-4 rounded bg-white/20" />
            <div className="w-1/2 h-4 rounded" style={{ background: `${ACCENT}50` }} />
            <div className="w-full h-2 rounded bg-white/10 mt-3" />
            <div className="w-4/5 h-2 rounded bg-white/10" />
          </div>
          {/* CTA buttons */}
          <div className="flex gap-2 mt-4">
            <div className="w-24 h-8 rounded-full" style={{ background: ACCENT }} />
            <div className="w-24 h-8 rounded-full border" style={{ borderColor: `${ACCENT}40` }} />
          </div>
          {/* Cards */}
          <div className="flex gap-2 mt-5">
            {[1, 2, 3].map((c) => (
              <div
                key={c}
                className="flex-1 h-12 rounded-lg border"
                style={{
                  background: `${ACCENT}08`,
                  borderColor: `${ACCENT}20`,
                }}
              />
            ))}
          </div>

          {/* Chat widget - appears as alive increases */}
          {alive > 0.3 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="absolute bottom-3 right-3"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: ACCENT, boxShadow: `0 4px 20px ${ACCENT}40` }}
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </motion.div>
          )}

          {/* Lead capture notification */}
          {alive > 0.6 && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute top-3 right-3 px-3 py-2 rounded-lg text-[10px] font-medium text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, #6d28d9)` }}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                New lead captured
              </div>
            </motion.div>
          )}

          {/* Glow overlay when alive */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              opacity: alive * 0.4,
              background: `radial-gradient(ellipse at 50% 30%, ${ACCENT}15 0%, transparent 70%)`,
            }}
          />
        </div>
      </BrowserMockup>
    </div>
  );
}

export default function ProblemSection() {
  return (
    <ScrollPinSection pinDuration={500} className="bg-bg">
      {(progress) => {
        // Phase 1: 0-0.3 — dumb website alone
        // Phase 2: 0.3-0.5 — both side by side
        // Phase 3: 0.5-0.7 — smart comes alive
        // Phase 4: 0.7-1.0 — full smart state with highlights

        const dumbOpacity = progress < 0.3
          ? 1
          : progress < 0.5
            ? 1
            : Math.max(0, 1 - (progress - 0.5) / 0.2);

        const smartOpacity = progress < 0.3
          ? 0
          : Math.min((progress - 0.3) / 0.15, 1);

        const alivePhase = progress > 0.5
          ? Math.min((progress - 0.5) / 0.2, 1)
          : 0;

        const highlightPhase = progress > 0.7
          ? Math.min((progress - 0.7) / 0.3, 1)
          : 0;

        const showBounce = progress < 0.5;
        const showEngagement = progress > 0.5;

        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background */}
            <div
              className="absolute inset-0 transition-all duration-700"
              style={{
                background: progress > 0.5
                  ? `radial-gradient(ellipse at center, ${ACCENT}08 0%, transparent 70%)`
                  : 'radial-gradient(ellipse at center, #FF454508 0%, transparent 70%)',
              }}
            />

            {/* Phase labels */}
            {progress < 0.3 && (
              <motion.div
                className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="font-mono text-sm tracking-widest uppercase text-[#FF4545]">THE PROBLEM</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Most websites are dumb.</h2>
              </motion.div>
            )}

            {progress >= 0.7 && (
              <div
                className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-10"
                style={{ opacity: highlightPhase }}
              >
                <span className="font-mono text-sm tracking-widest uppercase" style={{ color: ACCENT }}>THE SOLUTION</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Yours won&apos;t be.</h2>
              </div>
            )}

            {/* Mockups container */}
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {/* Dumb website */}
              {dumbOpacity > 0 && (
                <div className="relative">
                  <DumbWebsite opacity={dumbOpacity} />
                  {/* Bounce rate badge */}
                  {showBounce && dumbOpacity > 0.5 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-4 -right-4 bg-[#FF4545] text-white text-xs font-bold rounded-full px-3 py-1.5 shadow-lg shadow-[#FF4545]/30 z-10"
                    >
                      78% bounce rate
                    </motion.div>
                  )}
                </div>
              )}

              {/* Smart website */}
              {smartOpacity > 0 && (
                <div className="relative">
                  <SmartWebsite opacity={smartOpacity} alive={alivePhase} />
                  {/* Engagement badge */}
                  {showEngagement && alivePhase > 0.3 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-4 -right-4 bg-emerald-500 text-white text-xs font-bold rounded-full px-3 py-1.5 shadow-lg shadow-emerald-500/30 z-10"
                    >
                      94% engagement
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Highlight labels at final phase */}
            {highlightPhase > 0.5 && (
              <div
                className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10"
                style={{ opacity: Math.min((highlightPhase - 0.5) * 2, 1) }}
              >
                {['AI-powered', 'Converting', 'Engaging'].map((label, i) => (
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="px-4 py-2 rounded-full text-sm font-semibold text-white border"
                    style={{
                      background: `${ACCENT}15`,
                      borderColor: `${ACCENT}40`,
                      color: ACCENT,
                    }}
                  >
                    {label}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        );
      }}
    </ScrollPinSection>
  );
}
