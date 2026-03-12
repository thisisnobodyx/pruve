'use client';

import ScrollPinSection from '@/components/shared/ScrollPinSection';

const ACCENT = '#C8F135';

const competitorLines = [
  { name: 'Competitor A', color: '#FF4545', position: 15 },
  { name: 'Competitor B', color: '#F59E0B', position: 30 },
  { name: 'Competitor C', color: '#3B82F6', position: 45 },
];

function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

export default function ProblemSection() {
  return (
    <ScrollPinSection pinDuration={280} className="bg-bg">
      {(progress) => {
        // Tighter phases — less scroll needed
        // Phase 1: 0–0.2   invisible website
        // Phase 2: 0.2–0.4 stat overlay (shorter!)
        // Phase 3: 0.4–0.5 crossfade
        // Phase 4: 0.5–1.0 climbing chart + tagline appears with chart

        const invisOpacity = clamp(progress / 0.12) * clamp(1 - (progress - 0.3) / 0.12);
        const resultOpacity = (i: number) => clamp((progress > 0.04 ? (progress - 0.04 - i * 0.05) / 0.06 : 0)) * clamp(1 - (progress - 0.18) / 0.08);
        const subTextOpacity = clamp((progress - 0.14) / 0.05) * clamp(1 - (progress - 0.22) / 0.06);
        const statOverlay = clamp((progress - 0.22) / 0.08) * clamp(1 - (progress - 0.4) / 0.08);
        const chartOpacity = clamp((progress - 0.45) / 0.1);
        const chartPhase = clamp((progress - 0.45) / 0.5);
        const yourRank = Math.round(50 - chartPhase * 49);
        const compLineScale = clamp((chartPhase - 0.05) / 0.15);
        // Tagline shows as soon as chart is visible
        const taglineOpacity = clamp((progress - 0.52) / 0.08);

        return (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden px-4">
            {/* Background shift */}
            <div
              className="absolute inset-0"
              style={{
                background: chartOpacity > 0
                  ? `radial-gradient(ellipse at center, ${ACCENT}${Math.round(chartOpacity * 10).toString(16).padStart(2, '0')} 0%, transparent 70%)`
                  : 'radial-gradient(ellipse at center, #FF454508 0%, transparent 70%)',
              }}
            />

            {/* ── Phase 1: Invisible website ── */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none px-6"
              style={{ opacity: invisOpacity }}
            >
              <div className="text-center w-full max-w-lg">
                {/* Search bar */}
                <div className="bg-[#1a1a2e] border border-white/10 rounded-full px-4 md:px-6 py-2.5 md:py-3 flex items-center gap-3 max-w-sm mx-auto mb-5 md:mb-6">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-white/60 text-xs md:text-sm">your business name</span>
                </div>

                {/* Empty results */}
                <div className="space-y-3 md:space-y-4 max-w-md mx-auto">
                  {['Page 2', 'Page 3', 'Page 5...'].map((page, i) => (
                    <div
                      key={page}
                      className="flex items-center justify-between p-2.5 md:p-3 rounded-lg bg-white/[0.03] border border-white/5"
                      style={{
                        opacity: resultOpacity(i),
                        transform: `translateY(${(1 - resultOpacity(i)) * 10}px)`,
                      }}
                    >
                      <div>
                        <div className="w-24 md:w-32 h-2 rounded bg-white/10" />
                        <div className="w-16 md:w-20 h-1.5 rounded bg-white/5 mt-1.5" />
                      </div>
                      <span className="text-[#FF4545] text-[10px] md:text-xs font-bold">{page}</span>
                    </div>
                  ))}
                </div>

                <p
                  className="text-white/40 text-xs md:text-sm mt-5 md:mt-6"
                  style={{ opacity: subTextOpacity }}
                >
                  Your business is invisible to 90% of searchers.
                </p>
              </div>
            </div>

            {/* ── Phase 2: Stat overlay ── */}
            <div
              className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-6"
              style={{ opacity: statOverlay }}
            >
              <div className="absolute inset-0 bg-[#05050c]/95" />
              <div className="relative text-center max-w-lg">
                <div className="text-5xl md:text-7xl font-extrabold text-[#FF4545] mb-4">75%</div>
                <p className="text-white/80 text-base md:text-lg lg:text-xl leading-relaxed">
                  of people never scroll past the first page of Google. If you&apos;re not there, you don&apos;t exist.
                </p>
              </div>
            </div>

            {/* ── Phase 4: Climbing chart ── */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none px-4"
              style={{ opacity: chartOpacity }}
            >
              <div className="w-full max-w-2xl">
                {/* Tagline ABOVE chart — shows immediately */}
                <div className="text-center mb-4 md:mb-6" style={{ opacity: taglineOpacity }}>
                  <div className="text-2xl md:text-3xl lg:text-5xl font-extrabold mb-1 md:mb-2" style={{ color: ACCENT }}>
                    {yourRank === 1 ? '#1 on Google.' : 'Climbing to #1...'}
                  </div>
                  <p className="text-dim text-sm md:text-base">
                    {yourRank === 1 ? 'Consistent growth. Real results. No shortcuts.' : `Currently #${yourRank} — and rising fast.`}
                  </p>
                </div>

                {/* Ranking chart */}
                <div className="relative h-[200px] md:h-[260px] bg-bg-card/50 border border-border rounded-2xl p-4 md:p-6 overflow-hidden">
                  {/* Y-axis labels */}
                  <div className="absolute left-2 top-4 md:top-6 bottom-4 md:bottom-6 flex flex-col justify-between text-[9px] md:text-[10px] text-dim">
                    <span>#1</span>
                    <span>#25</span>
                    <span>#50</span>
                  </div>

                  {/* Grid lines */}
                  <div className="absolute left-8 md:left-10 right-4 top-4 md:top-6 bottom-4 md:bottom-6">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className="absolute left-0 right-0 h-px bg-white/5" style={{ top: `${i * 25}%` }} />
                    ))}
                  </div>

                  {/* Competitor lines */}
                  {competitorLines.map((comp) => (
                    <div
                      key={comp.name}
                      className="absolute left-8 md:left-10 right-4 h-0.5 rounded origin-left"
                      style={{
                        background: `${comp.color}40`,
                        top: `${16 + (comp.position / 50) * 68}%`,
                        transform: `scaleX(${compLineScale})`,
                      }}
                    />
                  ))}

                  {/* Your ranking line */}
                  <div
                    className="absolute left-8 md:left-10 right-4 h-1 rounded-full z-10"
                    style={{
                      background: `linear-gradient(90deg, ${ACCENT}60, ${ACCENT})`,
                      boxShadow: `0 0 20px ${ACCENT}40`,
                      top: `${16 + ((yourRank - 1) / 49) * 68}%`,
                    }}
                  />

                  {/* Position badge */}
                  <div
                    className="absolute right-3 md:right-6 z-20 px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-bold flex items-center gap-1 md:gap-2"
                    style={{
                      background: `${ACCENT}20`,
                      color: ACCENT,
                      top: `${Math.max(5, 16 + ((yourRank - 1) / 49) * 68 - 5)}%`,
                    }}
                  >
                    <span>#{yourRank}</span>
                    {yourRank <= 3 && <span>🏆</span>}
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-2 md:bottom-3 left-8 md:left-10 right-4 flex items-center gap-3 md:gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-1 rounded" style={{ background: ACCENT }} />
                      <span className="text-[9px] md:text-[10px] font-bold" style={{ color: ACCENT }}>You</span>
                    </div>
                    {competitorLines.map((comp) => (
                      <div key={comp.name} className="flex items-center gap-1">
                        <div className="w-2 md:w-3 h-0.5 rounded" style={{ background: `${comp.color}60` }} />
                        <span className="text-[8px] md:text-[10px] text-dim">{comp.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </ScrollPinSection>
  );
}
