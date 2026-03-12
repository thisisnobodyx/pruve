'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { howItWorksSteps } from './data';

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof howItWorksSteps)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* Vertical connector line + step circle */}
      <div className="flex flex-col items-center shrink-0">
        {/* Step number circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-bg-card border border-accent/30 flex items-center justify-center shrink-0"
          style={{
            boxShadow: '0 0 30px rgba(124,58,237,0.15)',
          }}
        >
          <span className="font-mono text-accent text-sm md:text-base font-bold">
            {String(index + 1).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-px flex-1 origin-top"
            style={{
              background:
                'linear-gradient(to bottom, rgba(124,58,237,0.3), rgba(124,58,237,0.05))',
            }}
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 pb-16 md:pb-20"
      >
        <div className="bg-bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-white/10 transition-colors">
          {/* Icons row */}
          <div className="flex items-center gap-2 mb-4">
            {step.icons.map((icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.3,
                  delay: 0.4 + i * 0.08,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="w-10 h-10 rounded-xl bg-accent/[0.08] border border-accent/15 flex items-center justify-center text-lg"
              >
                {icon}
              </motion.div>
            ))}
          </div>

          <h3 className="font-display text-xl md:text-2xl font-extrabold text-white mb-3">
            {step.title}
          </h3>
          <p className="font-body text-dim text-sm md:text-base leading-relaxed max-w-lg">
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function EmployeeChatDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-section px-6 bg-bg"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            HOW IT WORKS
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-4">
            How your AI Employee works
          </h2>
          <p className="font-body text-dim text-lg max-w-xl mx-auto">
            No setup headaches. No learning curve. Just results from day one.
          </p>
        </motion.div>

        {/* Steps flow */}
        <div className="relative">
          {howItWorksSteps.map((step, i) => (
            <StepCard
              key={step.id}
              step={step}
              index={i}
              isLast={i === howItWorksSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
