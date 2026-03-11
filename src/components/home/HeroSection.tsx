'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/shared/MagneticButton';
import Starfield from '@/components/shared/Starfield';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-bg">
      {/* Moving starfield background */}
      <Starfield
        className="absolute inset-0 w-full h-full z-0"
        starCount={350}
        speed={0.25}
      />

      {/* Purple radial glow behind content */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-accent/[0.06] rounded-full blur-[150px]" />
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--bg)_100%)]" />

      {/* Main content — absolutely centered */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl mx-auto">
          {/* Pill label */}
          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center gap-2 border border-border rounded-pill px-4 py-1.5 text-sm font-mono text-dim backdrop-blur-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-accent-2 animate-blink" />
              AI-Powered Agency
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="block font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold tracking-tight leading-[1.05] text-white">
              Automate Everything.
            </span>
            <span className="block font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold tracking-tight leading-[1.05] text-dim italic">
              Grow Faster.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            custom={0.6}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-dim text-lg md:text-xl max-w-xl mx-auto mt-6 leading-relaxed font-body"
          >
            We build AI agents, automations, and intelligent systems that run your
            business while you focus on what matters.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={0.8}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <MagneticButton
              href="/contact"
              className="inline-flex items-center justify-center bg-accent text-white font-semibold rounded-pill px-8 py-4 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:brightness-110"
            >
              Book a Call
            </MagneticButton>

            <MagneticButton
              href="/work"
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-border text-dim font-semibold rounded-pill px-8 py-4 text-base transition-all duration-300 hover:text-white hover:border-white/20"
            >
              See Our Work
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            custom={1.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-16 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-dim text-xs uppercase tracking-widest font-mono">
                Scroll
              </span>
              <svg
                width="16"
                height="24"
                viewBox="0 0 16 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-dim"
              >
                <path
                  d="M8 4L8 18M8 18L14 12M8 18L2 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
