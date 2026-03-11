'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import MagneticButton from '@/components/shared/MagneticButton';

const ACCENT = '#C8F135';

/* ─── Lead dot data ─── */
const leadDots = [
  { name: 'Sarah', detail: 'pricing inquiry' },
  { name: 'Mike', detail: 'demo request' },
  { name: 'Lisa', detail: 'free trial' },
  { name: 'Tom', detail: 'consultation' },
  { name: 'Emma', detail: 'enterprise plan' },
  { name: 'Jake', detail: 'product question' },
  { name: 'Priya', detail: 'partnership' },
  { name: 'Carlos', detail: 'onboarding help' },
  { name: 'Aisha', detail: 'upgrade request' },
  { name: 'David', detail: 'bulk pricing' },
  { name: 'Nina', detail: 'API access' },
  { name: 'Ryan', detail: 'custom solution' },
];

/* ─── Single animated lead dot ─── */
function LeadDot({
  lead,
  index,
  onCapture,
}: {
  lead: (typeof leadDots)[number];
  index: number;
  onCapture: () => void;
}) {
  const angle = (index / leadDots.length) * Math.PI * 2;
  const radius = 180;
  const startX = Math.cos(angle) * radius;
  const startY = Math.sin(angle) * radius;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: '50%', left: '50%' }}
      initial={{ x: startX, y: startY, opacity: 0, scale: 0.5 }}
      animate={{
        x: [startX, startX * 0.3, 0],
        y: [startY, startY * 0.3, 0],
        opacity: [0, 1, 0],
        scale: [0.5, 1, 0.3],
      }}
      transition={{
        duration: 3,
        delay: index * 0.7,
        repeat: Infinity,
        repeatDelay: leadDots.length * 0.7 - 3 + 0.5,
        ease: 'easeInOut',
      }}
      onAnimationComplete={() => {}}
      onUpdate={(latest) => {
        // Trigger capture when dot approaches center
        if (
          typeof latest.x === 'number' &&
          typeof latest.y === 'number' &&
          Math.abs(latest.x) < 15 &&
          Math.abs(latest.y) < 15 &&
          latest.opacity !== undefined &&
          (latest.opacity as number) > 0.2
        ) {
          onCapture();
        }
      }}
    >
      <div className="flex items-center gap-2 whitespace-nowrap -translate-x-1/2 -translate-y-1/2">
        <div
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}80` }}
        />
        <div className="bg-bg-card/90 backdrop-blur-sm border border-border rounded-lg px-2.5 py-1.5">
          <span className="text-white text-[11px] font-medium">{lead.name}</span>
          <span className="text-dim text-[10px] ml-1.5">&mdash; {lead.detail}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Glowing center orb ─── */
function CenterOrb({ count }: { count: number }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: `radial-gradient(circle, ${ACCENT}15 0%, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-24 h-24 rounded-full"
        style={{
          background: `radial-gradient(circle, ${ACCENT}25 0%, transparent 70%)`,
        }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />

      {/* Core orb */}
      <motion.div
        className="relative w-16 h-16 rounded-full flex items-center justify-center z-10"
        style={{
          background: `radial-gradient(circle at 40% 35%, ${ACCENT}, ${ACCENT}90)`,
          boxShadow: `0 0 40px ${ACCENT}50, 0 0 80px ${ACCENT}20`,
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-black font-extrabold text-lg tabular-nums">{count}</span>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });
  const [capturedCount, setCapturedCount] = useState(0);
  const capturedRef = useRef(new Set<number>());

  const handleCapture = useCallback((index: number) => {
    if (!capturedRef.current.has(index)) {
      capturedRef.current.add(index);
      setCapturedCount((prev) => prev + 1);
    }
  }, []);

  // Auto-increment counter to keep it ticking smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setCapturedCount((prev) => prev + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
        style={{
          background: `radial-gradient(ellipse at 60% 40%, ${ACCENT}12 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto w-full">
        {/* Left -- Headline + CTAs */}
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
            <span className="text-dim text-xs font-mono uppercase tracking-wider">
              AI-Powered Lead Capture
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5">
            Catch every lead.{' '}
            <span style={{ color: ACCENT }}>Convert more.</span>
          </h1>
          <p className="text-dim text-lg mb-8 max-w-md mx-auto lg:mx-0">
            Automated lead capture, qualification, and follow-up sequences that ensure no potential customer slips through the cracks.
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
            <MagneticButton
              href="#demo"
              className="px-8 py-4 rounded-full text-black font-semibold text-base transition-all hover:brightness-110"
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

        {/* Right -- Lead capture animation */}
        <div className="relative flex justify-center">
          <motion.div
            style={{ rotateX, rotateY, perspective: 1200 }}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="relative w-[380px] h-[380px] rounded-2xl border border-border bg-bg/80 backdrop-blur-sm overflow-hidden"
              style={{
                boxShadow: `0 0 60px ${ACCENT}10, inset 0 0 60px ${ACCENT}05`,
              }}
            >
              {/* Grid pattern background */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px',
                }}
              />

              {/* Lead dots animation area */}
              <div className="relative w-full h-full flex items-center justify-center">
                {leadDots.map((lead, i) => (
                  <LeadDot
                    key={lead.name}
                    lead={lead}
                    index={i}
                    onCapture={() => handleCapture(i)}
                  />
                ))}

                {/* Center orb */}
                <CenterOrb count={capturedCount} />
              </div>

              {/* Bottom counter bar */}
              <div className="absolute bottom-0 inset-x-0 bg-bg-card/90 backdrop-blur-sm border-t border-border px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: ACCENT }}
                  />
                  <span className="text-dim text-xs font-mono">LEADS CAPTURED</span>
                </div>
                <span
                  className="text-sm font-extrabold tabular-nums"
                  style={{ color: ACCENT }}
                >
                  {capturedCount}
                </span>
              </div>
            </div>
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
