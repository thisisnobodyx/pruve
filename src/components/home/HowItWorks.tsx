'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Discovery Call',
    description:
      'We map your entire workflow in 30 minutes. Every bottleneck, every opportunity.',
  },
  {
    number: '02',
    title: 'We Build',
    description:
      'Our team configures your AI agents and automations. You review. We iterate.',
  },
  {
    number: '03',
    title: 'You Grow',
    description:
      'Sit back while your business runs smarter. We monitor, optimize, and scale.',
  },
];

function StepCard({ step, delay }: { step: Step; delay: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ScrollReveal delay={delay} direction="up">
      <div
        className="relative text-center md:text-left"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.span
          className="block font-display text-6xl md:text-7xl font-extrabold leading-none mb-4 select-none"
          animate={{
            color: isHovered
              ? 'rgba(124, 58, 237, 0.3)'
              : 'rgba(124, 58, 237, 0.1)',
          }}
          transition={{ duration: 0.3 }}
        >
          {step.number}
        </motion.span>
        <h3 className="font-display text-xl font-bold text-white mb-3">
          {step.title}
        </h3>
        <p className="text-dim text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
          {step.description}
        </p>
      </div>
    </ScrollReveal>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-section px-6 bg-bg">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-center text-white mb-4">
            How it works.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1} direction="up">
          <p className="text-dim text-center mb-20 max-w-lg mx-auto">
            From first call to full automation in three steps.
          </p>
        </ScrollReveal>

        {/* Steps grid with connecting line */}
        <div className="relative">
          {/* Connecting dashed line — desktop only */}
          <div
            className="hidden md:block absolute pointer-events-none"
            style={{
              top: '2.25rem',
              left: '16.666%',
              right: '16.666%',
              height: '2px',
            }}
          >
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 2"
            >
              <line
                x1="0"
                y1="1"
                x2="100"
                y2="1"
                stroke="rgba(124, 58, 237, 0.2)"
                strokeWidth="2"
                strokeDasharray="6 4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Step dots on the line — desktop only */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="hidden md:block absolute w-3 h-3 rounded-full bg-accent/30 border-2 border-accent/40 pointer-events-none"
              style={{
                top: 'calc(2.25rem - 4px)',
                left: `calc(${16.666 + i * 33.333}% - 6px)`,
              }}
            />
          ))}

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} delay={i * 0.2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
