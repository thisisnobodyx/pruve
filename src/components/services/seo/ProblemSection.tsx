'use client';

import { motion } from 'framer-motion';
import ScrollPinSection from '@/components/shared/ScrollPinSection';

const ACCENT = '#C8F135';

const competitorLines = [
  { name: 'Competitor A', color: '#FF4545', position: 15 },
  { name: 'Competitor B', color: '#F59E0B', position: 30 },
  { name: 'Competitor C', color: '#3B82F6', position: 45 },
];

export default function ProblemSection() {
  return (
    <ScrollPinSection pinDuration={500} className="bg-bg">
      {(progress) => {
        // Phase 1: 0-0.25 — invisible website
        // Phase 2: 0.25-0.45 — stat
        // Phase 3: 0.45-0.55 — transition
        // Phase 4: 0.55-1.0 — climbing chart

        const invisPhase = Math.min(progress / 0.25, 1);
        const statPhase = progress > 0.25 ? Math.min((progress - 0.25) / 0.2, 1) : 0;
        const clearPhase = progress > 0.45 ? Math.min((progress - 0.45) / 0.1, 1) : 0;
        const chartPhase = progress > 0.55 ? Math.min((progress - 0.55) / 0.4, 1) : 0;

        // Your ranking climbs from position 50 to position 1
        const yourRank = Math.round(50 - chartPhase * 49);

        return (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Background shift */}
            <div
              className="absolute inset-0 transition-all duration-700"
              style={{
                background: chartPhase > 0
                  ? `radial-gradient(ellipse at center, ${ACCENT}08 0%, transparent 70%)`
                  : 'radial-gradient(ellipse at center, #FF454508 0%, transparent 70%)',
              }}
            />

            {/* Phase 1: Google search showing no results */}
            {clearPhase < 1 && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 1 - clearPhase }}>
                <motion.div className="text-center max-w-lg px-6" style={{ opacity: invisPhase }}>
                  {/* Fake Google-style results */}
                  <div className="mb-8">
                    <div className="bg-[#1a1a2e] border border-white/10 rounded-full px-6 py-3 flex items-center gap-3 max-w-sm mx-auto mb-6">
                      <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="text-white/60 text-sm">your business name</span>
                    </div>

                    {/* Empty results */}
                    <div className="space-y-4 max-w-md mx-auto">
                      {['Page 2', 'Page 3', 'Page 5...'].map((page, i) => (
                        <motion.div
                          key={page}
                          initial={{ opacity: 0 }}
                          animate={invisPhase > 0.3 + i * 0.2 ? { opacity: 1 } : {}}
                          className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5"
                        >
                          <div>
                            <div className="w-32 h-2 rounded bg-white/8" />
                            <div className="w-20 h-1.5 rounded bg-white/4 mt-1.5" />
                          </div>
                          <span className="text-[#FF4545] text-xs font-bold">{page}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {invisPhase > 0.8 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      className="text-white/40 text-sm"
                    >
                      Your business is invisible to 90% of searchers.
                    </motion.p>
                  )}
                </motion.div>
              </div>
            )}

            {/* Stat overlay */}
            {statPhase > 0 && clearPhase < 1 && (
              <div
                className="absolute inset-0 flex items-center justify-center z-10"
                style={{ opacity: Math.min(statPhase, 1 - clearPhase) }}
              >
                <div className="absolute inset-0 bg-[#05050c]/95" />
                <div className="relative text-center max-w-lg px-6">
                  <div className="text-5xl md:text-7xl font-extrabold text-[#FF4545] mb-4">75%</div>
                  <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                    of people never scroll past the first page of Google. If you&apos;re not there, you don&apos;t exist.
                  </p>
                </div>
              </div>
            )}

            {/* Phase 4: Climbing chart */}
            {chartPhase > 0 && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: chartPhase }}>
                <div className="w-full max-w-2xl px-6">
                  {/* Mini ranking chart */}
                  <div className="relative h-[280px] bg-bg-card/50 border border-border rounded-2xl p-6 overflow-hidden">
                    {/* Y-axis labels */}
                    <div className="absolute left-2 top-6 bottom-6 flex flex-col justify-between text-[10px] text-dim">
                      <span>#1</span>
                      <span>#25</span>
                      <span>#50</span>
                    </div>

                    {/* Grid lines */}
                    <div className="absolute left-10 right-4 top-6 bottom-6">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="absolute left-0 right-0 h-px bg-white/5" style={{ top: `${i * 25}%` }} />
                      ))}
                    </div>

                    {/* Competitor lines (static lower positions) */}
                    {competitorLines.map((comp) => (
                      <motion.div
                        key={comp.name}
                        className="absolute left-10 right-4 h-0.5 rounded"
                        style={{
                          background: `${comp.color}40`,
                          top: `${6 + (comp.position / 50) * (280 - 48)}px`,
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: chartPhase > 0.2 ? 1 : 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    ))}

                    {/* Your ranking line — animated climb */}
                    <motion.div
                      className="absolute left-10 right-4 h-1 rounded-full z-10"
                      style={{
                        background: `linear-gradient(90deg, ${ACCENT}60, ${ACCENT})`,
                        boxShadow: `0 0 20px ${ACCENT}40`,
                        top: `${6 + ((yourRank - 1) / 49) * (280 - 48)}px`,
                      }}
                    />

                    {/* Your position badge */}
                    <motion.div
                      className="absolute right-6 z-20 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2"
                      style={{
                        background: `${ACCENT}20`,
                        borderColor: `${ACCENT}40`,
                        color: ACCENT,
                        top: `${6 + ((yourRank - 1) / 49) * (280 - 48) - 14}px`,
                      }}
                    >
                      <span>#{yourRank}</span>
                      {yourRank <= 3 && <span>🏆</span>}
                    </motion.div>

                    {/* Legend */}
                    <div className="absolute bottom-3 left-10 right-4 flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-1 rounded" style={{ background: ACCENT }} />
                        <span className="text-[10px] font-bold" style={{ color: ACCENT }}>Your Business</span>
                      </div>
                      {competitorLines.map((comp) => (
                        <div key={comp.name} className="flex items-center gap-1.5">
                          <div className="w-3 h-0.5 rounded" style={{ background: `${comp.color}60` }} />
                          <span className="text-[10px] text-dim">{comp.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom message */}
                  <motion.div
                    className="text-center mt-8"
                    initial={{ opacity: 0 }}
                    animate={chartPhase > 0.8 ? { opacity: 1 } : {}}
                  >
                    <div className="text-4xl md:text-5xl font-extrabold mb-3" style={{ color: ACCENT }}>
                      {yourRank === 1 ? '#1 on Google.' : `Climbing to #1...`}
                    </div>
                    <p className="text-dim text-lg">Consistent growth. Real results. No shortcuts.</p>
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
