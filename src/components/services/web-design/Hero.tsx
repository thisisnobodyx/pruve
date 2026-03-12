'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import BrowserMockup from '@/components/shared/BrowserMockup';
import MagneticButton from '@/components/shared/MagneticButton';

const ACCENT = '#7C3AED';

/* Simulated website components that "build" themselves sequentially */
interface BuildStep {
  id: string;
  label: string;
  delay: number;
}

const buildSteps: BuildStep[] = [
  { id: 'nav', label: 'Navigation', delay: 0 },
  { id: 'hero-text', label: 'Hero Copy', delay: 600 },
  { id: 'hero-cta', label: 'Call to Action', delay: 400 },
  { id: 'cards', label: 'Feature Cards', delay: 500 },
  { id: 'testimonial', label: 'Social Proof', delay: 400 },
  { id: 'footer', label: 'Footer', delay: 300 },
];

function LiveBuildPreview() {
  const [builtSteps, setBuiltSteps] = useState<string[]>([]);
  const [cycle, setCycle] = useState(0);
  const [colorScheme, setColorScheme] = useState(0);

  const schemes = [
    { primary: '#7C3AED', secondary: '#C8F135', bg: '#0f0a1a' },
    { primary: '#3B82F6', secondary: '#F59E0B', bg: '#0a0f1a' },
    { primary: '#EC4899', secondary: '#7DF9C0', bg: '#1a0a14' },
  ];

  const colors = schemes[colorScheme % schemes.length];

  useEffect(() => {
    let cancelled = false;

    const runBuild = async () => {
      setBuiltSteps([]);

      await new Promise((r) => setTimeout(r, 800));
      if (cancelled) return;

      for (const step of buildSteps) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, step.delay));
        if (cancelled) return;
        setBuiltSteps((prev) => [...prev, step.id]);
      }

      // Hold completed state
      await new Promise((r) => setTimeout(r, 3000));
      if (cancelled) return;

      // Cycle to next color scheme and rebuild
      setColorScheme((prev) => prev + 1);
      setCycle((prev) => prev + 1);
    };

    runBuild();
    return () => { cancelled = true; };
  }, [cycle]);

  const has = (id: string) => builtSteps.includes(id);

  return (
    <div className="relative h-[340px] overflow-hidden select-none" style={{ background: colors.bg }}>
      {/* Build progress indicator */}
      <div className="absolute top-2 right-2 z-20 flex items-center gap-2">
        <div className="flex gap-1">
          {buildSteps.map((step) => (
            <motion.div
              key={step.id}
              className="w-1.5 h-1.5 rounded-full"
              animate={{
                backgroundColor: has(step.id) ? colors.primary : 'rgba(255,255,255,0.15)',
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        <span className="text-[9px] font-mono text-white/30">
          {builtSteps.length}/{buildSteps.length}
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* Nav */}
        <AnimatePresence>
          {has('nav') && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div className="w-16 h-3 rounded" style={{ background: `${colors.primary}60` }} />
              <div className="flex gap-3">
                <div className="w-10 h-2 rounded bg-white/10" />
                <div className="w-10 h-2 rounded bg-white/10" />
                <div className="w-14 h-6 rounded-full" style={{ background: `${colors.primary}50` }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero text */}
        <AnimatePresence>
          {has('hero-text') && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6 space-y-2"
            >
              <motion.div
                className="h-5 rounded"
                style={{ background: `linear-gradient(90deg, white, ${colors.primary}80)` }}
                initial={{ width: 0, opacity: 0.2 }}
                animate={{ width: '75%', opacity: 0.2 }}
                transition={{ duration: 0.6 }}
              />
              <motion.div
                className="h-5 rounded"
                initial={{ width: 0, opacity: 0.15 }}
                animate={{ width: '55%', opacity: 0.15 }}
                style={{ background: `linear-gradient(90deg, white, ${colors.primary}60)` }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              <motion.div
                className="h-2 rounded bg-white/8 mt-3"
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />
              <motion.div
                className="h-2 rounded bg-white/6"
                initial={{ width: 0 }}
                animate={{ width: '45%' }}
                transition={{ duration: 0.3, delay: 0.3 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA buttons */}
        <AnimatePresence>
          {has('hero-cta') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="flex gap-2 mt-4"
            >
              <motion.div
                className="w-24 h-8 rounded-full"
                style={{ background: colors.primary }}
                animate={{ boxShadow: [`0 0 0px ${colors.primary}00`, `0 0 20px ${colors.primary}40`, `0 0 0px ${colors.primary}00`] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="w-24 h-8 rounded-full border border-white/15" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature cards */}
        <AnimatePresence>
          {has('cards') && (
            <motion.div className="flex gap-2 mt-5">
              {[0, 1, 2].map((c) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: c * 0.1, type: 'spring' }}
                  className="flex-1 h-20 rounded-lg border p-2"
                  style={{ borderColor: `${colors.primary}20`, background: `${colors.primary}08` }}
                >
                  <div className="w-6 h-6 rounded mb-2" style={{ background: `${colors.secondary}30` }} />
                  <div className="w-full h-1.5 rounded bg-white/8" />
                  <div className="w-2/3 h-1.5 rounded bg-white/5 mt-1" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonial / Social proof */}
        <AnimatePresence>
          {has('testimonial') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-4 flex items-center gap-3 p-3 rounded-lg"
              style={{ background: `${colors.primary}08`, borderLeft: `2px solid ${colors.primary}40` }}
            >
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2" style={{ borderColor: colors.bg, background: `${colors.secondary}${40 + i * 15}` }} />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="text-[8px]"
                      style={{ color: colors.secondary }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <div className="w-20 h-1.5 rounded bg-white/8 mt-1" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scanning/building effect line */}
      {builtSteps.length < buildSteps.length && builtSteps.length > 0 && (
        <motion.div
          className="absolute left-0 right-0 h-px z-30"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
            boxShadow: `0 0 20px ${colors.primary}80`,
          }}
          animate={{ top: ['20%', '90%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  );
}

export default function WebDesignHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 6);
    rotateX.set(-y * 6);
  };

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
        style={{ background: `radial-gradient(ellipse at 60% 40%, ${ACCENT}12 0%, transparent 60%)` }}
      />

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
            <span className="text-dim text-xs font-mono uppercase tracking-wider">Custom Web Design</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5">
            We don&apos;t do templates.{' '}
            <span style={{ color: ACCENT }}>We build experiences.</span>
          </h1>
          <p className="text-dim text-lg mb-8 max-w-md mx-auto lg:mx-0">
            High-performance websites designed to convert, built to scale, and engineered to make your competitors jealous.
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
            <MagneticButton
              href="/contact"
              className="px-8 py-4 rounded-full text-white font-semibold text-base transition-all hover:brightness-110"
              style={{ background: ACCENT }}
            >
              Get a Quote
            </MagneticButton>
            <MagneticButton
              href="/pricing"
              className="px-8 py-4 rounded-full border border-border text-white font-semibold text-base hover:bg-white/5 transition-all"
            >
              View Pricing &rarr;
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right — Live-building browser mockup */}
        <div className="relative flex justify-center overflow-hidden">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border pointer-events-none hidden lg:block"
              style={{ borderColor: `${ACCENT}20` }}
              animate={{ width: [200, 500], height: [150, 400], opacity: [0.3, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: i * 1, ease: 'easeOut' }}
            />
          ))}

          <motion.div
            style={{ rotateX, rotateY, perspective: 1200 }}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <BrowserMockup url="yourbrand.co" className="w-[460px] max-w-[85vw]">
              <LiveBuildPreview />
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
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-6 h-6 text-dim/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
