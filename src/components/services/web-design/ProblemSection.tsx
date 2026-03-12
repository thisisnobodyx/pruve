'use client';

import { motion } from 'framer-motion';
import ScrollPinSection from '@/components/shared/ScrollPinSection';

const ACCENT = '#7C3AED';

const badStats = [
  { icon: '🐌', label: '8.2s load time', sub: 'Visitors leave after 3s' },
  { icon: '📱', label: 'Not mobile-friendly', sub: '73% of traffic is mobile' },
  { icon: '🔍', label: 'Invisible to Google', sub: 'Page 5+ in search results' },
  { icon: '💸', label: '$0 in conversions', sub: 'No CTAs, no forms, no leads' },
];

const goodStats = [
  { icon: '⚡', label: '1.4s load time', sub: '3x faster than competitors' },
  { icon: '📱', label: 'Mobile-first design', sub: 'Perfect on every device' },
  { icon: '🔍', label: 'SEO-optimized', sub: 'Page 1 ready from launch' },
  { icon: '🎯', label: '4.2% conversion rate', sub: 'Visitors become customers' },
];

export default function ProblemSection() {
  return (
    <ScrollPinSection pinDuration={500} className="bg-bg">
      {(progress) => {
        // Phase 1: 0-0.3 — bad website showcase
        // Phase 2: 0.3-0.5 — stat reveal
        // Phase 3: 0.5-0.6 — transition
        // Phase 4: 0.6-1.0 — transformed result

        const badPhase = Math.min(progress / 0.3, 1);
        const statPhase = progress > 0.3 ? Math.min((progress - 0.3) / 0.2, 1) : 0;
        const transitionPhase = progress > 0.5 ? Math.min((progress - 0.5) / 0.1, 1) : 0;
        const goodPhase = progress > 0.6 ? Math.min((progress - 0.6) / 0.3, 1) : 0;

        return (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Background gradient shift */}
            <div
              className="absolute inset-0 transition-all duration-700"
              style={{
                background: goodPhase > 0
                  ? `radial-gradient(ellipse at center, ${ACCENT}0A 0%, transparent 70%)`
                  : 'radial-gradient(ellipse at center, #FF454508 0%, transparent 70%)',
              }}
            />

            {/* Phase 1+2: Bad website */}
            {transitionPhase < 1 && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: 1 - transitionPhase }}
              >
                {/* Ugly website mockup */}
                <motion.div
                  className="relative"
                  style={{ opacity: badPhase }}
                >
                  {/* Browser frame */}
                  <div className="w-[700px] max-w-[90vw] bg-[#1a1a2e] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                    {/* Chrome bar */}
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#12121f] border-b border-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <div className="flex-1 mx-8 bg-white/5 rounded px-3 py-1 text-[10px] text-white/30 text-center">
                        oldbusiness.com
                      </div>
                    </div>

                    {/* Ugly content */}
                    <div className="p-6 space-y-4 relative">
                      {/* Outdated nav */}
                      <div className="flex items-center justify-between">
                        <div className="text-white/20 text-xs font-bold">OLD LOGO</div>
                        <div className="flex gap-4">
                          <div className="w-10 h-2 rounded bg-white/5" />
                          <div className="w-10 h-2 rounded bg-white/5" />
                          <div className="w-10 h-2 rounded bg-white/5" />
                        </div>
                      </div>
                      {/* Bad hero — misaligned, no contrast */}
                      <div className="mt-4 space-y-3">
                        <div className="w-[80%] h-4 rounded bg-white/[0.04]" />
                        <div className="w-[60%] h-4 rounded bg-white/[0.03]" />
                        <div className="w-[40%] h-3 rounded bg-white/[0.02] mt-2" />
                        {/* Ugly CTA */}
                        <div className="mt-3 w-32 h-7 rounded bg-white/[0.03] border border-white/5" />
                      </div>
                      {/* Broken layout cards */}
                      <div className="flex gap-2 mt-4">
                        <div className="w-[30%] h-14 rounded bg-white/[0.02] border border-white/5" />
                        <div className="w-[45%] h-14 rounded bg-white/[0.02] border border-white/5" />
                        <div className="w-[20%] h-14 rounded bg-white/[0.02] border border-white/5" />
                      </div>

                      {/* Loading spinner overlay */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ opacity: badPhase < 0.5 ? badPhase * 2 : Math.max(0, 1 - badPhase * 1.2) }}
                      >
                        <motion.div
                          className="w-8 h-8 border-2 border-t-transparent rounded-full"
                          style={{ borderColor: '#FF454540', borderTopColor: 'transparent' }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                      </motion.div>

                      {/* Red warning badges */}
                      {badPhase > 0.6 && (
                        <>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-4 right-4 bg-[#FF4545]/20 border border-[#FF4545]/30 rounded-lg px-3 py-1.5 text-[10px] text-[#FF4545] font-bold"
                          >
                            SLOW
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 }}
                            className="absolute bottom-4 right-4 bg-[#FF4545]/20 border border-[#FF4545]/30 rounded-lg px-3 py-1.5 text-[10px] text-[#FF4545] font-bold"
                          >
                            NO MOBILE
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="absolute bottom-4 left-4 bg-[#FF4545]/20 border border-[#FF4545]/30 rounded-lg px-3 py-1.5 text-[10px] text-[#FF4545] font-bold"
                          >
                            0 LEADS
                          </motion.div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Bad stats below browser */}
                  {badPhase > 0.7 && statPhase === 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 px-4">
                      {badStats.map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                          className="bg-[#FF4545]/5 border border-[#FF4545]/15 rounded-xl p-3 text-center"
                        >
                          <div className="text-lg mb-1">{stat.icon}</div>
                          <div className="text-white text-xs font-bold">{stat.label}</div>
                          <div className="text-[#FF4545] text-[10px] mt-0.5">{stat.sub}</div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Central stat overlay */}
                {statPhase > 0 && transitionPhase < 1 && (
                  <div
                    className="absolute inset-0 flex items-center justify-center z-20"
                    style={{ opacity: Math.min(statPhase, 1 - transitionPhase) }}
                  >
                    <div className="absolute inset-0 bg-[#05050c]/95" />
                    <div className="relative text-center max-w-lg px-6">
                      <div className="text-5xl md:text-7xl font-extrabold text-[#FF4545] mb-4">94%</div>
                      <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                        of first impressions are design-related. A bad website costs you customers every single day.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Phase 4: Transformed website */}
            {goodPhase > 0 && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: goodPhase }}
              >
                <div className="text-center max-w-2xl px-6">
                  {/* Good stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {goodStats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={goodPhase > 0.3 + i * 0.12 ? { opacity: 1, y: 0 } : {}}
                        className="border rounded-xl p-4 text-center"
                        style={{ borderColor: `${ACCENT}30`, background: `${ACCENT}08` }}
                      >
                        <div className="text-2xl mb-2">{stat.icon}</div>
                        <div className="text-white text-sm font-bold">{stat.label}</div>
                        <div className="text-xs mt-1" style={{ color: ACCENT }}>{stat.sub}</div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={goodPhase > 0.75 ? { opacity: 1, scale: 1 } : {}}
                  >
                    <div className="text-4xl md:text-5xl font-extrabold mb-3" style={{ color: ACCENT }}>
                      Built to convert.
                    </div>
                    <p className="text-dim text-lg">Fast. Beautiful. Designed for results.</p>
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
