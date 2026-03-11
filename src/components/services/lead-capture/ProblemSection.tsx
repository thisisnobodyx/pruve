'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import ScrollPinSection from '@/components/shared/ScrollPinSection';

const ACCENT = '#C8F135';
const DANGER = '#FF4545';

/* ─── SVG Funnel with animated dots ─── */
function Funnel({
  progress,
  funnelColor,
  dotsInTop,
  dotsLeaking,
  dotsAtBottom,
}: {
  progress: number;
  funnelColor: string;
  dotsInTop: number;
  dotsLeaking: number;
  dotsAtBottom: number;
}) {
  // Funnel shape points
  const funnelPath = 'M 80 60 L 220 60 L 180 260 L 120 260 Z';
  const funnelPathLength = 600; // approximate

  // Draw-on effect
  const drawProgress = Math.min(progress / 0.25, 1);

  // Generate dot positions inside the funnel
  const topDots = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: `top-${i}`,
      cx: 110 + Math.random() * 80,
      cy: 70 + Math.random() * 30,
    }));
  }, []);

  const middleDots = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: `mid-${i}`,
      cx: 120 + Math.random() * 60,
      cy: 110 + Math.random() * 50,
    }));
  }, []);

  const leakDots = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: `leak-${i}`,
      // These leak out the sides
      cx: i % 2 === 0 ? 60 - Math.random() * 40 : 240 + Math.random() * 40,
      cy: 100 + Math.random() * 120,
    }));
  }, []);

  const bottomDots = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: `bot-${i}`,
      cx: 135 + Math.random() * 30,
      cy: 240 + Math.random() * 15,
    }));
  }, []);

  return (
    <svg viewBox="0 0 300 320" className="w-full max-w-[300px] h-auto">
      {/* Funnel outline */}
      <path
        d={funnelPath}
        fill="none"
        stroke={funnelColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={funnelPathLength}
        strokeDashoffset={funnelPathLength * (1 - drawProgress)}
        style={{ transition: 'stroke 0.5s' }}
      />

      {/* Funnel fill */}
      <path
        d={funnelPath}
        fill={`${funnelColor}08`}
        opacity={drawProgress}
      />

      {/* Funnel stage lines */}
      {[120, 170, 220].map((y, i) => {
        const leftX = 80 + ((120 - 80) * (y - 60)) / 200;
        const rightX = 220 - ((220 - 180) * (y - 60)) / 200;
        return (
          <line
            key={y}
            x1={leftX}
            y1={y}
            x2={rightX}
            y2={y}
            stroke={`${funnelColor}30`}
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={drawProgress}
          />
        );
      })}

      {/* Stage labels */}
      {drawProgress > 0.5 && (
        <>
          <text x="235" y="90" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">
            Visitors
          </text>
          <text x="225" y="145" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">
            Interested
          </text>
          <text x="210" y="200" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">
            Qualified
          </text>
          <text x="195" y="252" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">
            Converted
          </text>
        </>
      )}

      {/* Top dots (visitors entering) */}
      {topDots.slice(0, dotsInTop).map((dot) => (
        <circle
          key={dot.id}
          cx={dot.cx}
          cy={dot.cy}
          r="3"
          fill={ACCENT}
          opacity={0.8}
        >
          <animate
            attributeName="cy"
            from={dot.cy}
            to={dot.cy + 5}
            dur="2s"
            repeatCount="indefinite"
            values={`${dot.cy};${dot.cy + 5};${dot.cy}`}
          />
        </circle>
      ))}

      {/* Middle dots */}
      {middleDots.slice(0, Math.floor(dotsInTop * 0.7)).map((dot) => (
        <circle
          key={dot.id}
          cx={dot.cx}
          cy={dot.cy}
          r="3"
          fill={ACCENT}
          opacity={0.6}
        />
      ))}

      {/* Leaking dots */}
      {leakDots.slice(0, dotsLeaking).map((dot) => (
        <circle
          key={dot.id}
          cx={dot.cx}
          cy={dot.cy}
          r="3"
          fill={DANGER}
          opacity={0.6}
        />
      ))}

      {/* Bottom dots (converted) */}
      {bottomDots.slice(0, dotsAtBottom).map((dot) => (
        <circle
          key={dot.id}
          cx={dot.cx}
          cy={dot.cy}
          r="3.5"
          fill={ACCENT}
          opacity={1}
        >
          <animate
            attributeName="r"
            values="3.5;4.5;3.5"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

export default function ProblemSection() {
  return (
    <ScrollPinSection pinDuration={500} className="bg-bg">
      {(progress) => {
        // Phase 1 (0-0.25): SVG funnel draws. Visitor dots entering
        // Phase 2 (0.25-0.4): Dots leak out. Only 3 reach bottom. "97% lost"
        // Phase 3 (0.4-0.55): Funnel "repairs" — borders turn accent color
        // Phase 4 (0.55-1.0): All dots flow through. "0 leads lost"

        const phase1 = Math.min(progress / 0.25, 1);
        const phase2 = progress > 0.25 ? Math.min((progress - 0.25) / 0.15, 1) : 0;
        const phase3 = progress > 0.4 ? Math.min((progress - 0.4) / 0.15, 1) : 0;
        const phase4 = progress > 0.55 ? Math.min((progress - 0.55) / 0.3, 1) : 0;

        const isRepaired = phase3 > 0.5;
        const funnelColor = isRepaired ? ACCENT : 'rgba(255,255,255,0.15)';

        // Dot calculations
        const dotsInTop = Math.floor(phase1 * 20);
        const dotsLeaking = phase2 > 0 && !isRepaired ? Math.floor(phase2 * 18) : isRepaired ? Math.floor(18 * (1 - phase3)) : 0;
        const dotsAtBottom = isRepaired
          ? Math.floor(phase4 * 5)
          : phase2 > 0
            ? Math.min(3, Math.floor(phase2 * 3))
            : 0;

        // Stats
        const lostPercentage = isRepaired
          ? Math.round(97 * (1 - phase4))
          : phase2 > 0
            ? 97
            : 0;
        const leadsLost = isRepaired
          ? Math.round(340 * (1 - phase4))
          : phase2 > 0
            ? 340
            : 0;

        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${
                  isRepaired ? `${ACCENT}08` : `${DANGER}05`
                } 0%, transparent 70%)`,
                transition: 'background 0.5s',
              }}
            />

            {/* Section label */}
            <div
              className="absolute top-10 left-1/2 -translate-x-1/2 text-center"
              style={{ opacity: phase1 }}
            >
              <span className="font-mono text-sm tracking-widest uppercase" style={{ color: ACCENT }}>
                THE PROBLEM
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
                The Leaky Funnel
              </h2>
            </div>

            {/* Main content area */}
            <div className="flex flex-col items-center gap-8">
              {/* Funnel visualization */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase1 > 0.1 ? 1 : 0 }}
                className="relative"
              >
                <Funnel
                  progress={progress}
                  funnelColor={funnelColor}
                  dotsInTop={dotsInTop}
                  dotsLeaking={dotsLeaking}
                  dotsAtBottom={dotsAtBottom}
                />

                {/* Repair animation overlay */}
                {phase3 > 0 && phase3 < 1 && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0] }}
                    transition={{ duration: 0.8 }}
                    style={{
                      background: `radial-gradient(circle, ${ACCENT}30 0%, transparent 70%)`,
                    }}
                  />
                )}
              </motion.div>

              {/* Stats display */}
              <div className="text-center">
                {/* Phase 2: Leaking stats */}
                {phase2 > 0 && phase4 < 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className="text-5xl md:text-6xl font-extrabold mb-2 tabular-nums"
                      style={{ color: isRepaired ? ACCENT : DANGER }}
                    >
                      {lostPercentage}% lost
                    </div>
                    <p className="text-white/70 text-lg">
                      {leadsLost > 0
                        ? `${leadsLost} leads slipping through the cracks every month`
                        : 'Every lead captured and qualified'}
                    </p>
                  </motion.div>
                )}

                {/* Phase 4: Resolved state */}
                {phase4 >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="text-center"
                  >
                    <div className="text-5xl md:text-6xl font-extrabold mb-3" style={{ color: ACCENT }}>
                      0 leads lost.
                    </div>
                    <p className="text-white/80 text-xl mb-6">
                      Every visitor becomes an opportunity.
                    </p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, type: 'spring', delay: 0.2 }}
                      className="inline-flex items-center gap-2"
                    >
                      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke={ACCENT} strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-dim text-lg">Captured, qualified, and followed up automatically.</span>
                    </motion.div>
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
