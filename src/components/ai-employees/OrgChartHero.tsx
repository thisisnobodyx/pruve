'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Starfield from '@/components/shared/Starfield';
import MagneticButton from '@/components/shared/MagneticButton';
import { tierRoles } from './data';

export default function OrgChartHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20"
    >
      <Starfield speed={0.3} />

      {/* Accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] mb-6">
            Meet your{' '}
            <span className="text-accent">AI Employee.</span>
          </h1>
          <p className="font-body text-dim text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed">
            Not a chatbot. Not a tool. A full-time worker that runs your
            business — while you focus on what matters.
          </p>
        </motion.div>

        {/* Three role cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {tierRoles.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
              className="group relative bg-bg-card border rounded-2xl px-6 py-5 text-center transition-all duration-300 hover:shadow-lg"
              style={{
                borderColor: `${role.color}25`,
                boxShadow: `0 0 30px ${role.color}08`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `0 0 40px ${role.color}15, inset 0 0 40px ${role.color}05`,
                }}
              />
              <div
                className="font-mono text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: role.color }}
              >
                {role.label}
              </div>
              <div className="font-display text-white font-extrabold text-lg mb-1">
                {role.name}
              </div>
              <div className="font-body text-dim text-xs leading-relaxed mb-3">
                {role.shortDesc}
              </div>
              <div className="font-mono text-sm font-bold" style={{ color: role.color }}>
                ${role.price}/mo
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <MagneticButton
            href="#how-it-works"
            className="bg-accent text-bg font-medium px-8 py-3 rounded-pill text-sm"
          >
            See it in action
          </MagneticButton>
          <MagneticButton
            href="/experience"
            className="bg-white/5 text-white border border-border font-medium px-8 py-3 rounded-pill text-sm hover:bg-white/10"
          >
            Live experience
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dim"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
