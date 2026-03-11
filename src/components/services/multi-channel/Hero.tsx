'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Inbox } from 'lucide-react';
import MagneticButton from '@/components/shared/MagneticButton';

const ACCENT = '#7C3AED';

/* ─── Platform definitions with SVG icons ─── */
const platforms = [
  {
    name: 'WhatsApp',
    color: '#25D366',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    startPos: { x: -200, y: -80 },
  },
  {
    name: 'Instagram',
    color: '#E1306C',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    startPos: { x: 200, y: -120 },
  },
  {
    name: 'Telegram',
    color: '#0088CC',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    startPos: { x: -180, y: 120 },
  },
  {
    name: 'Email',
    color: '#9590A8',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    startPos: { x: 180, y: 100 },
  },
  {
    name: 'Web Chat',
    color: '#7C3AED',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    startPos: { x: 0, y: -160 },
  },
];

/* ─── Unified Inbox Card ─── */
function UnifiedInboxCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-bg-card border border-border rounded-2xl p-5 w-[280px] shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${ACCENT}20` }}
        >
          <Inbox className="w-5 h-5" style={{ color: ACCENT }} />
        </div>
        <div>
          <div className="text-white text-sm font-semibold">Unified Inbox</div>
          <div className="text-dim text-[11px]">All channels in one place</div>
        </div>
      </div>

      {/* Mini conversation list */}
      {[
        { platform: 'WhatsApp', color: '#25D366', name: 'Sarah M.', msg: 'Hi, I have a question about...' },
        { platform: 'Instagram', color: '#E1306C', name: 'Alex K.', msg: 'Love your products! Can I...' },
        { platform: 'Email', color: '#9590A8', name: 'John D.', msg: 'RE: Order #4829 status' },
      ].map((item, i) => (
        <motion.div
          key={item.platform}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.15 }}
          className="flex items-center gap-3 py-2.5 border-t border-border/50"
        >
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: item.color }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-white text-xs font-medium">{item.name}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: `${item.color}20`, color: item.color }}>
                {item.platform}
              </span>
            </div>
            <p className="text-dim text-[10px] truncate">{item.msg}</p>
          </div>
        </motion.div>
      ))}

      {/* Status bar */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        <span className="text-[10px] font-medium" style={{ color: ACCENT }}>3 active conversations</span>
        <div className="flex -space-x-1">
          {platforms.slice(0, 4).map((p) => (
            <div
              key={p.name}
              className="w-4 h-4 rounded-full border border-bg-card"
              style={{ background: p.color }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [converged, setConverged] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
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
              Multi-Channel Inbox
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5">
            One brain.{' '}
            <span style={{ color: ACCENT }}>Every platform.</span>
          </h1>
          <p className="text-dim text-lg mb-8 max-w-md mx-auto lg:mx-0">
            Deploy a single AI agent across WhatsApp, Instagram, Telegram, email, and web chat &mdash; with a unified inbox for every conversation.
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

        {/* Right -- Convergence animation */}
        <div className="relative flex justify-center items-center min-h-[420px]">
          {/* Scattered platform icons that converge */}
          <AnimatePresence>
            {!converged && (
              <>
                {platforms.map((platform, i) => (
                  <motion.div
                    key={platform.name}
                    className="absolute z-10"
                    initial={{
                      x: platform.startPos.x,
                      y: platform.startPos.y,
                      scale: 1,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      y: 0,
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      x: { type: 'spring', stiffness: 60, damping: 12, delay: 0.8 + i * 0.15 },
                      y: { type: 'spring', stiffness: 60, damping: 12, delay: 0.8 + i * 0.15 },
                      opacity: { duration: 0.4, delay: 0.3 + i * 0.1 },
                    }}
                    onAnimationComplete={() => {
                      if (i === platforms.length - 1) {
                        setTimeout(() => setConverged(true), 300);
                      }
                    }}
                  >
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border backdrop-blur-sm shadow-lg"
                      style={{
                        background: `${platform.color}15`,
                        borderColor: `${platform.color}40`,
                        color: platform.color,
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {platform.icon}
                    </motion.div>
                  </motion.div>
                ))}

                {/* Center merge target glow */}
                <motion.div
                  className="absolute w-20 h-20 rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.4, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  style={{
                    background: `radial-gradient(circle, ${ACCENT}40 0%, transparent 70%)`,
                  }}
                />
              </>
            )}
          </AnimatePresence>

          {/* After convergence: Unified inbox card */}
          <AnimatePresence>
            {converged && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                }}
              >
                {/* Pulse ring behind card */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-[320px] h-[320px] rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${ACCENT}10 0%, transparent 70%)`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.2, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>

                {/* Platform dots orbiting the card */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {platforms.map((p, i) => {
                    const angle = (360 / platforms.length) * i;
                    return (
                      <motion.div
                        key={p.name}
                        className="absolute"
                        animate={{
                          rotate: [angle, angle + 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <div
                          className="w-3 h-3 rounded-full absolute"
                          style={{
                            background: p.color,
                            transform: 'translateX(170px) translateY(-50%)',
                            boxShadow: `0 0 8px ${p.color}60`,
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </div>

                <UnifiedInboxCard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
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
