'use client';

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

// Clamp helper
function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

export default function ProblemSection() {
  return (
    <ScrollPinSection pinDuration={400} className="bg-bg">
      {(progress) => {
        // Phase 1: 0–0.25   bad website fades in
        // Phase 2: 0.25–0.5 stat overlay
        // Phase 3: 0.5–0.6  crossfade
        // Phase 4: 0.6–1.0  good result

        const badOpacity = clamp(progress / 0.15) * clamp(1 - (progress - 0.4) / 0.15);
        const badgeOpacity = clamp((progress - 0.12) / 0.1) * clamp(1 - (progress - 0.22) / 0.08);
        const statCardOpacity = clamp((progress - 0.18) / 0.07) * clamp(1 - (progress - 0.3) / 0.1);
        const statOverlay = clamp((progress - 0.28) / 0.1) * clamp(1 - (progress - 0.5) / 0.1);
        const goodOpacity = clamp((progress - 0.55) / 0.15);
        const goodStagger = (i: number) => clamp((progress - 0.6 - i * 0.04) / 0.08);
        const taglineOpacity = clamp((progress - 0.82) / 0.1);

        return (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Background gradient shift */}
            <div
              className="absolute inset-0"
              style={{
                background: goodOpacity > 0
                  ? `radial-gradient(ellipse at center, ${ACCENT}${Math.round(goodOpacity * 10).toString(16).padStart(2, '0')} 0%, transparent 70%)`
                  : 'radial-gradient(ellipse at center, #FF454508 0%, transparent 70%)',
              }}
            />

            {/* ── Phase 1: Bad website mockup ── */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ opacity: badOpacity }}
            >
              <div className="relative">
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
                    <div className="flex items-center justify-between">
                      <div className="text-white/20 text-xs font-bold">OLD LOGO</div>
                      <div className="flex gap-4">
                        <div className="w-10 h-2 rounded bg-white/10" />
                        <div className="w-10 h-2 rounded bg-white/10" />
                        <div className="w-10 h-2 rounded bg-white/10" />
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="w-[80%] h-4 rounded bg-white/10" />
                      <div className="w-[60%] h-4 rounded bg-white/8" />
                      <div className="w-[40%] h-3 rounded bg-white/6 mt-2" />
                      <div className="mt-3 w-32 h-7 rounded bg-white/8 border border-white/10" />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <div className="w-[30%] h-14 rounded bg-white/5 border border-white/10" />
                      <div className="w-[45%] h-14 rounded bg-white/5 border border-white/10" />
                      <div className="w-[20%] h-14 rounded bg-white/5 border border-white/10" />
                    </div>

                    {/* Red warning badges */}
                    <div
                      className="absolute top-4 right-4 bg-[#FF4545]/20 border border-[#FF4545]/30 rounded-lg px-3 py-1.5 text-[10px] text-[#FF4545] font-bold"
                      style={{ opacity: badgeOpacity, transform: `scale(${0.8 + badgeOpacity * 0.2})` }}
                    >
                      SLOW
                    </div>
                    <div
                      className="absolute bottom-4 right-4 bg-[#FF4545]/20 border border-[#FF4545]/30 rounded-lg px-3 py-1.5 text-[10px] text-[#FF4545] font-bold"
                      style={{ opacity: badgeOpacity, transform: `scale(${0.8 + badgeOpacity * 0.2})` }}
                    >
                      NO MOBILE
                    </div>
                    <div
                      className="absolute bottom-4 left-4 bg-[#FF4545]/20 border border-[#FF4545]/30 rounded-lg px-3 py-1.5 text-[10px] text-[#FF4545] font-bold"
                      style={{ opacity: badgeOpacity, transform: `scale(${0.8 + badgeOpacity * 0.2})` }}
                    >
                      0 LEADS
                    </div>
                  </div>
                </div>

                {/* Bad stats below browser */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 px-4" style={{ opacity: statCardOpacity }}>
                  {badStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-[#FF4545]/5 border border-[#FF4545]/15 rounded-xl p-3 text-center"
                    >
                      <div className="text-lg mb-1">{stat.icon}</div>
                      <div className="text-white text-xs font-bold">{stat.label}</div>
                      <div className="text-[#FF4545] text-[10px] mt-0.5">{stat.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Phase 2: Central stat overlay ── */}
            <div
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
              style={{ opacity: statOverlay }}
            >
              <div className="absolute inset-0 bg-[#05050c]/95" />
              <div className="relative text-center max-w-lg px-6">
                <div className="text-5xl md:text-7xl font-extrabold text-[#FF4545] mb-4">94%</div>
                <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                  of first impressions are design-related. A bad website costs you customers every single day.
                </p>
              </div>
            </div>

            {/* ── Phase 4: Transformed result ── */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ opacity: goodOpacity }}
            >
              <div className="text-center max-w-2xl px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {goodStats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className="border rounded-xl p-4 text-center"
                      style={{
                        borderColor: `${ACCENT}30`,
                        background: `${ACCENT}08`,
                        opacity: goodStagger(i),
                        transform: `translateY(${(1 - goodStagger(i)) * 20}px)`,
                      }}
                    >
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-white text-sm font-bold">{stat.label}</div>
                      <div className="text-xs mt-1" style={{ color: ACCENT }}>{stat.sub}</div>
                    </div>
                  ))}
                </div>

                <div style={{ opacity: taglineOpacity, transform: `scale(${0.9 + taglineOpacity * 0.1})` }}>
                  <div className="text-4xl md:text-5xl font-extrabold mb-3" style={{ color: ACCENT }}>
                    Built to convert.
                  </div>
                  <p className="text-dim text-lg">Fast. Beautiful. Designed for results.</p>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </ScrollPinSection>
  );
}
