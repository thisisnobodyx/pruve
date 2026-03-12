'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

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

function StepCard({ step, index }: { step: Step; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative text-center md:text-left"
      initial={{ opacity: 0, y: 50, rotateZ: 2 }}
      whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true, amount: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Big number — fades/scales in */}
      <motion.span
        className="block font-display text-6xl md:text-7xl font-extrabold leading-none mb-4 select-none"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: index * 0.25 + 0.1,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        viewport={{ once: true, amount: 0.3 }}
        animate={{
          color: isHovered
            ? 'rgba(124, 58, 237, 0.3)'
            : 'rgba(124, 58, 237, 0.1)',
        }}
      >
        {step.number}
      </motion.span>
      <h3 className="font-display text-xl font-bold text-white mb-3">
        {step.title}
      </h3>
      <p className="text-dim text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
        {step.description}
      </p>
    </motion.div>
  );
}

/** Animated SVG dashed line that draws as user scrolls */
function AnimatedDashedLine() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 0.8', 'end 0.4'],
  });

  // Animate stroke-dashoffset from 100 to 0 as scroll progresses
  const dashOffset = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <div
      ref={lineRef}
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
        <motion.line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="rgba(124, 58, 237, 0.2)"
          strokeWidth="2"
          strokeDasharray="6 4"
          vectorEffect="non-scaling-stroke"
          style={{ strokeDashoffset: dashOffset }}
          pathLength={100}
        />
      </svg>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="py-section-mobile md:py-section px-6 bg-bg">
      <div className="max-w-5xl mx-auto">
        {/* Header — scroll-driven entrance */}
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">
            How it works.
          </h2>
          <p className="text-dim max-w-lg mx-auto">
            From first call to full automation in three steps.
          </p>
        </motion.div>

        {/* Steps grid with connecting line */}
        <div className="relative">
          {/* Connecting dashed line — animates drawing on scroll */}
          <AnimatedDashedLine />

          {/* Step dots on the line — desktop only, fade in sequentially */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="hidden md:block absolute w-3 h-3 rounded-full bg-accent/30 border-2 border-accent/40 pointer-events-none"
              style={{
                top: 'calc(2.25rem - 4px)',
                left: `calc(${16.666 + i * 33.333}% - 6px)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: i * 0.25 + 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true, amount: 0.3 }}
            />
          ))}

          {/* Steps — slide up with slight rotation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
