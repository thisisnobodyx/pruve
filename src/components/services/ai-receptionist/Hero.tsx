'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import MagneticButton from '@/components/shared/MagneticButton';

const ACCENT = '#C9A84C';

function WaveformCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 280;
    const h = 80;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const bars = 32;
      const barW = 4;
      const gap = (w - bars * barW) / (bars - 1);

      for (let i = 0; i < bars; i++) {
        const x = i * (barW + gap);
        const freq1 = Math.sin(t * 0.03 + i * 0.3) * 0.5 + 0.5;
        const freq2 = Math.sin(t * 0.05 + i * 0.15) * 0.3 + 0.3;
        const amplitude = (freq1 + freq2) * 0.5;
        const barH = Math.max(4, amplitude * h * 0.8);
        const y = (h - barH) / 2;

        ctx.fillStyle = ACCENT;
        ctx.globalAlpha = 0.6 + amplitude * 0.4;
        ctx.beginPath();
        // Use roundRect if available, fallback to fillRect
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barW, barH, 2);
          ctx.fill();
        } else {
          ctx.fillRect(x, y, barW, barH);
        }
      }

      ctx.globalAlpha = 1;
      t++;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return <canvas ref={canvasRef} className="mx-auto" />;
}

function TranscriptTyper() {
  const text = 'Good morning! Thank you for calling. How can I help you today?';
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm text-white/80 font-mono leading-relaxed max-w-[280px] mx-auto mt-4">
      <span className="text-xs uppercase tracking-wider block mb-2" style={{ color: ACCENT }}>
        AI Receptionist
      </span>
      {displayed}
      {!done && (
        <span
          className="inline-block w-[2px] h-[1em] align-middle ml-0.5"
          style={{ background: ACCENT, animation: 'pulse 1s infinite' }}
        />
      )}
    </div>
  );
}

function RingingAnimation() {
  const [phase, setPhase] = useState<'ringing' | 'answered'>('ringing');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('answered'), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-[320px] h-[320px] flex items-center justify-center mx-auto">
      {/* Pulsing rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 pointer-events-none"
          style={{ borderColor: `${ACCENT}40` }}
          animate={
            phase === 'ringing'
              ? {
                  width: [60, 320],
                  height: [60, 320],
                  opacity: [0.6, 0],
                }
              : {
                  width: [60, 200],
                  height: [60, 200],
                  opacity: [0.3, 0],
                }
          }
          transition={{
            duration: phase === 'ringing' ? 1.8 : 4,
            repeat: Infinity,
            delay: i * (phase === 'ringing' ? 0.6 : 1.2),
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Center icon */}
      <motion.div
        className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: `${ACCENT}20`, border: `2px solid ${ACCENT}40` }}
        animate={
          phase === 'ringing'
            ? { rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.05, 1] }
            : { rotate: 0, scale: 1 }
        }
        transition={
          phase === 'ringing'
            ? { duration: 0.5, repeat: Infinity, repeatDelay: 0.3 }
            : { duration: 0.5 }
        }
      >
        {phase === 'ringing' ? (
          <svg className="w-7 h-7" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        ) : (
          <svg className="w-7 h-7" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
        )}
      </motion.div>

      {/* Waveform + Transcript — appears after answered */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        initial={{ opacity: 0, y: 20 }}
        animate={phase === 'answered' ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {phase === 'answered' && (
          <>
            <WaveformCanvas />
            <TranscriptTyper />
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function Hero() {
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
            <span className="text-dim text-xs font-mono uppercase tracking-wider">AI-Powered Receptionist</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5">
            Never miss a call{' '}
            <span style={{ color: ACCENT }}>again.</span>
          </h1>
          <p className="text-dim text-lg mb-8 max-w-md mx-auto lg:mx-0">
            An AI receptionist that answers every call, books appointments, and delivers a flawless experience — 24 hours a day, 7 days a week.
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
            <MagneticButton
              href="#demo"
              className="px-8 py-4 rounded-full text-black font-semibold text-base transition-all hover:brightness-110"
              style={{ background: ACCENT }}
            >
              Hear It Live
            </MagneticButton>
            <MagneticButton
              href="/pricing"
              className="px-8 py-4 rounded-full border border-border text-white font-semibold text-base hover:bg-white/5 transition-all"
            >
              View Pricing &rarr;
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right - Ringing / Waveform animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex justify-center"
        >
          <div className="bg-bg-card/50 border border-border rounded-3xl p-8 backdrop-blur-sm">
            <RingingAnimation />
          </div>
        </motion.div>
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
