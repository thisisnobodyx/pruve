'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from '@/components/shared/MagneticButton';
import { techStack } from './data';

function TechCard({
  item,
  index,
}: {
  item: (typeof techStack)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="bg-bg-card border border-border rounded-2xl p-6 md:p-8 text-center hover:border-white/10 transition-colors"
    >
      {/* Name badge */}
      <div
        className="inline-block font-mono text-sm font-bold px-4 py-1.5 rounded-full mb-4"
        style={{
          color: item.color,
          background: `${item.color}10`,
          border: `1px solid ${item.color}20`,
        }}
      >
        {item.name}
      </div>

      {/* Description */}
      <p className="font-body text-dim text-sm leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export default function CostComparison() {
  const techHeadingRef = useRef<HTMLDivElement>(null);
  const isTechInView = useInView(techHeadingRef, { once: true, margin: '-60px' });

  const ctaRef = useRef<HTMLDivElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-60px' });

  return (
    <>
      {/* SECTION 5: THE TECHNOLOGY */}
      <section className="py-section px-6 bg-bg-2">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            ref={techHeadingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isTechInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
              UNDER THE HOOD
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-4">
              Powered by
            </h2>
            <p className="font-body text-dim text-lg max-w-xl mx-auto">
              Three technologies working together to make your AI Employee
              intelligent, autonomous, and connected.
            </p>
          </motion.div>

          {/* Tech stack cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {techStack.map((item, i) => (
              <TechCard key={item.name} item={item} index={i} />
            ))}
          </div>

          {/* Connecting note */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isTechInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-center mt-10"
          >
            <p className="font-body text-dim text-sm">
              Open-source foundation. Enterprise-grade intelligence. Your AI Employee is not a
              black box — it is a system you can trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: CTA */}
      <section className="relative py-section px-6 bg-bg overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Ready to hire your{' '}
            <span className="text-accent">AI Employee?</span>
          </h2>
          <p className="font-body text-dim text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Every AI Employee is built around your workflow. Not a template.{' '}
            <span className="text-white font-medium">Your business.</span>
          </p>

          {/* Process steps mini */}
          <div className="flex items-center justify-center gap-3 md:gap-6 mb-12 flex-wrap">
            {[
              { step: '1', text: 'Discovery call' },
              { step: '2', text: '7-day build' },
              { step: '3', text: 'AI goes live' },
              { step: '4', text: 'Business runs itself' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isCtaInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center">
                  <span className="font-mono text-accent text-xs font-bold">{item.step}</span>
                </div>
                <span className="font-body text-white/70 text-xs md:text-sm">{item.text}</span>
                {i < 3 && (
                  <svg
                    className="w-4 h-4 text-dim/30 hidden md:block ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <MagneticButton
              href="/contact"
              className="bg-accent text-bg font-bold px-10 py-4 rounded-pill text-base"
            >
              Book a Strategy Call
            </MagneticButton>
            <MagneticButton
              href="/experience"
              className="bg-white/5 text-white border border-border font-medium px-10 py-4 rounded-pill text-base hover:bg-white/10"
            >
              See it in action
            </MagneticButton>
          </div>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isCtaInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="font-body text-dim/60 text-xs mt-8"
          >
            No contracts. Cancel anytime. Your AI Employee starts working within 7 days.
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}
