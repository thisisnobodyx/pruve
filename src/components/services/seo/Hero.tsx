'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import MagneticButton from '@/components/shared/MagneticButton';

const ACCENT = '#C8F135';

interface RankingEntry {
  position: number;
  title: string;
  url: string;
  isClient: boolean;
}

const rankingPhases: RankingEntry[][] = [
  // Phase 1: client at position 9
  [
    { position: 1, title: 'Big Competitor Corp', url: 'competitor1.com', isClient: false },
    { position: 2, title: 'Industry Leader Inc', url: 'industryleader.com', isClient: false },
    { position: 3, title: 'Major Brand LLC', url: 'majorbrand.com', isClient: false },
  ],
  // Phase 2: client climbing to 5
  [
    { position: 1, title: 'Big Competitor Corp', url: 'competitor1.com', isClient: false },
    { position: 2, title: 'Industry Leader Inc', url: 'industryleader.com', isClient: false },
    { position: 3, title: 'Your Business', url: 'yourbusiness.com', isClient: true },
  ],
  // Phase 3: client at #1
  [
    { position: 1, title: 'Your Business', url: 'yourbusiness.com', isClient: true },
    { position: 2, title: 'Big Competitor Corp', url: 'competitor1.com', isClient: false },
    { position: 3, title: 'Industry Leader Inc', url: 'industryleader.com', isClient: false },
  ],
];

function AnimatedSearchResults() {
  const [phase, setPhase] = useState(0);
  const [searchText, setSearchText] = useState('');
  const fullQuery = 'best restaurant near me';

  useEffect(() => {
    let cancelled = false;

    const runAnimation = async () => {
      // Type search query
      setSearchText('');
      setPhase(0);

      for (let i = 0; i <= fullQuery.length; i++) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 60));
        setSearchText(fullQuery.slice(0, i));
      }

      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 800));

      // Show phase 0 results (not ranked)
      setPhase(0);
      await new Promise((r) => setTimeout(r, 2000));
      if (cancelled) return;

      // Climb to position 3
      setPhase(1);
      await new Promise((r) => setTimeout(r, 2000));
      if (cancelled) return;

      // Reach #1
      setPhase(2);
      await new Promise((r) => setTimeout(r, 4000));
      if (cancelled) return;

      // Restart
      runAnimation();
    };

    runAnimation();
    return () => { cancelled = true; };
  }, []);

  const results = rankingPhases[phase] || rankingPhases[0];

  return (
    <div className="w-[440px] max-w-full">
      {/* Google-style search bar */}
      <div className="bg-[#1a1a2e] border border-white/10 rounded-full px-5 py-3 flex items-center gap-3 mb-6">
        <svg className="w-5 h-5 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-white text-sm">{searchText}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="w-0.5 h-5 bg-white/60"
        />
      </div>

      {/* Search results */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {results.map((result, i) => (
            <motion.div
              key={`${phase}-${i}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className={`p-4 rounded-xl border transition-all ${
                result.isClient
                  ? 'border-[#C8F135]/30 bg-[#C8F135]/5'
                  : 'border-white/5 bg-white/[0.02]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    result.isClient ? 'text-black' : 'text-white/50'
                  }`}
                  style={{
                    background: result.isClient
                      ? ACCENT
                      : 'rgba(255,255,255,0.05)',
                  }}
                >
                  {result.position}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-white/30 mb-0.5">{result.url}</div>
                  <div className={`text-sm font-medium ${result.isClient ? 'text-[#C8F135]' : 'text-white/80'}`}>
                    {result.title}
                  </div>
                  <div className="w-full h-1.5 rounded bg-white/5 mt-2" />
                  <div className="w-2/3 h-1.5 rounded bg-white/3 mt-1" />
                </div>
                {result.isClient && result.position === 1 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.3 }}
                    className="text-lg"
                  >
                    👑
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Ranking indicator */}
      {phase > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center"
        >
          <span className="text-xs font-mono px-3 py-1.5 rounded-full border" style={{ color: ACCENT, borderColor: `${ACCENT}30`, background: `${ACCENT}08` }}>
            {phase === 1 ? '↑ Climbing to page 1' : '🏆 #1 Position achieved'}
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default function SEOHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 4);
    rotateX.set(-y * 4);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
      className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 60% 40%, ${ACCENT}0A 0%, transparent 60%)` }} />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto w-full">
        {/* Left — Headline */}
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
            <span className="text-dim text-xs font-mono uppercase tracking-wider">SEO Services</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5">
            Own page one.{' '}
            <span style={{ color: ACCENT }}>Own your market.</span>
          </h1>
          <p className="text-dim text-lg mb-8 max-w-md mx-auto lg:mx-0">
            Data-driven SEO that gets your business to the top of Google — and keeps it there.
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
            <MagneticButton
              href="/contact"
              className="px-8 py-4 rounded-full text-black font-semibold text-base transition-all hover:brightness-110"
              style={{ background: ACCENT }}
            >
              Get SEO Audit
            </MagneticButton>
            <MagneticButton
              href="/pricing"
              className="px-8 py-4 rounded-full border border-border text-white font-semibold text-base hover:bg-white/5 transition-all"
            >
              View Pricing &rarr;
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right — Animated search rankings */}
        <div className="relative flex justify-center overflow-hidden">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border pointer-events-none hidden lg:block"
              style={{ borderColor: `${ACCENT}15` }}
              animate={{ width: [200, 520], height: [150, 420], opacity: [0.2, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 1.2, ease: 'easeOut' }}
            />
          ))}

          <motion.div
            style={{ rotateX, rotateY, perspective: 1200 }}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <AnimatedSearchResults />
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-6 h-6 text-dim/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
