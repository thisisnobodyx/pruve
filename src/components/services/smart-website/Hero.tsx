'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import BrowserMockup from '@/components/shared/BrowserMockup';
import MagneticButton from '@/components/shared/MagneticButton';

const ACCENT = '#7C3AED';

interface FloatingTooltip {
  id: number;
  text: string;
  x: number;
  y: number;
}

const tooltipMessages = [
  'Visitor from San Francisco',
  '3rd visit this week',
  'AI Chat: Ready',
  'Scrolled 80% of page',
  'Clicked pricing 2x',
  'Lead score: 87',
  'Returning visitor',
  'Mobile — iOS 18',
];

export default function SmartWebsiteHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const [heatmapPos, setHeatmapPos] = useState({ x: 50, y: 50 });
  const [tooltips, setTooltips] = useState<FloatingTooltip[]>([]);
  const tooltipIdRef = useRef(0);
  const lastTooltipTimeRef = useRef(0);

  const rotateX = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = mockupRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHeatmapPos({ x, y });

    // 3D tilt
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      const cx = (e.clientX - containerRect.left) / containerRect.width - 0.5;
      const cy = (e.clientY - containerRect.top) / containerRect.height - 0.5;
      rotateY.set(cx * 6);
      rotateX.set(-cy * 6);
    }

    // Spawn tooltip at throttled rate
    const now = Date.now();
    if (now - lastTooltipTimeRef.current > 1200) {
      lastTooltipTimeRef.current = now;
      const id = tooltipIdRef.current++;
      const msg = tooltipMessages[id % tooltipMessages.length];
      setTooltips((prev) => [
        ...prev.slice(-3),
        { id, text: msg, x: Math.min(Math.max(x, 15), 85), y: Math.min(Math.max(y - 10, 5), 85) },
      ]);
      setTimeout(() => {
        setTooltips((prev) => prev.filter((t) => t.id !== id));
      }, 2500);
    }
  }, [rotateX, rotateY]);

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 60% 40%, ${ACCENT}12 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto w-full">
        {/* Left - Headline + CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-bg-card/50 mb-6"
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: ACCENT }} />
            <span className="text-dim text-xs font-mono uppercase tracking-wider">AI-Powered Website</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5">
            Websites that{' '}
            <span style={{ color: ACCENT }}>think.</span>
          </h1>
          <p className="text-dim text-lg mb-8 max-w-md mx-auto lg:mx-0">
            AI-powered sites that chat with visitors, personalize in real time, capture leads automatically, and convert browsers into buyers.
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
            <MagneticButton
              href="#demo"
              className="px-8 py-4 rounded-full text-white font-semibold text-base transition-all hover:brightness-110"
              style={{ background: ACCENT }}
            >
              Try It Live
            </MagneticButton>
            <MagneticButton
              href="/pricing"
              className="px-8 py-4 rounded-full border border-border text-white font-semibold text-base hover:bg-white/5 transition-all"
            >
              View Pricing &rarr;
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right - Browser mockup with heatmap */}
        <div className="relative flex justify-center">
          {/* Pulsing rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
              style={{ borderColor: `${ACCENT}30` }}
              animate={{
                width: [120, 360],
                height: [120, 360],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'easeOut',
              }}
            />
          ))}

          <motion.div
            style={{ rotateX, rotateY, perspective: 1200 }}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <BrowserMockup url="smartbiz.co" className="w-[420px] max-w-full">
              <div
                ref={mockupRef}
                className="relative h-[300px] bg-[#0f0a1a] overflow-hidden select-none cursor-crosshair"
              >
                {/* Mini website layout */}
                <div className="p-4 space-y-3">
                  {/* Nav */}
                  <div className="flex items-center justify-between">
                    <div className="w-20 h-3 rounded bg-white/10" />
                    <div className="flex gap-3">
                      <div className="w-12 h-2 rounded bg-white/8" />
                      <div className="w-12 h-2 rounded bg-white/8" />
                      <div className="w-16 h-6 rounded-full" style={{ background: `${ACCENT}40` }} />
                    </div>
                  </div>
                  {/* Hero area */}
                  <div className="mt-6 space-y-2">
                    <div className="w-3/4 h-4 rounded bg-white/12" />
                    <div className="w-1/2 h-4 rounded bg-white/12" />
                    <div className="w-2/3 h-2 rounded bg-white/6 mt-3" />
                    <div className="w-1/2 h-2 rounded bg-white/6" />
                  </div>
                  {/* CTA */}
                  <div className="flex gap-2 mt-4">
                    <div className="w-24 h-8 rounded-full" style={{ background: `${ACCENT}50` }} />
                    <div className="w-24 h-8 rounded-full border border-white/10" />
                  </div>
                  {/* Cards row */}
                  <div className="flex gap-2 mt-5">
                    {[1, 2, 3].map((c) => (
                      <div key={c} className="flex-1 h-16 rounded-lg bg-white/5 border border-white/5" />
                    ))}
                  </div>
                </div>

                {/* Heatmap overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle 80px at ${heatmapPos.x}% ${heatmapPos.y}%, ${ACCENT}50 0%, ${ACCENT}20 30%, transparent 70%)`,
                  }}
                />

                {/* Static heatmap zones */}
                <div
                  className="absolute pointer-events-none rounded-full blur-xl opacity-30"
                  style={{
                    width: 100,
                    height: 60,
                    left: '15%',
                    top: '35%',
                    background: `radial-gradient(ellipse, #ef4444 0%, transparent 70%)`,
                  }}
                />
                <div
                  className="absolute pointer-events-none rounded-full blur-xl opacity-25"
                  style={{
                    width: 80,
                    height: 50,
                    left: '20%',
                    top: '65%',
                    background: `radial-gradient(ellipse, ${ACCENT} 0%, transparent 70%)`,
                  }}
                />
                <div
                  className="absolute pointer-events-none rounded-full blur-xl opacity-20"
                  style={{
                    width: 70,
                    height: 40,
                    right: '15%',
                    top: '25%',
                    background: `radial-gradient(ellipse, #f59e0b 0%, transparent 70%)`,
                  }}
                />

                {/* Floating tooltips */}
                <AnimatePresence>
                  {tooltips.map((tip) => (
                    <motion.div
                      key={tip.id}
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="absolute z-20 px-3 py-1.5 rounded-lg text-[11px] font-medium text-white whitespace-nowrap shadow-lg"
                      style={{
                        left: `${tip.x}%`,
                        top: `${tip.y}%`,
                        transform: 'translate(-50%, -100%)',
                        background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}cc)`,
                      }}
                    >
                      {tip.text}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
                        style={{
                          borderLeft: '4px solid transparent',
                          borderRight: '4px solid transparent',
                          borderTop: `4px solid ${ACCENT}cc`,
                        }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Chat widget indicator */}
                <motion.div
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10"
                  style={{ background: ACCENT }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </motion.div>
              </div>
            </BrowserMockup>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-dim/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
