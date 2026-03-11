'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Headphones, Phone, BarChart3 } from 'lucide-react';

const ACCENT = '#C9A84C';

const steps = [
  {
    icon: Headphones,
    number: '01',
    title: 'Setup Your Greeting',
    description:
      'Define your welcome message, business hours, services, and team directory. We configure the AI to represent your brand with the perfect tone.',
  },
  {
    icon: Phone,
    number: '02',
    title: 'Route Your Calls',
    description:
      'Forward your business line or set up a dedicated number. Calls are answered instantly with smart routing to the right department or person.',
  },
  {
    icon: BarChart3,
    number: '03',
    title: 'Review & Improve',
    description:
      'Monitor call logs, review transcriptions, and track performance metrics. The AI learns from every interaction to get better over time.',
  },
];

function TimelineNode({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex gap-6 md:gap-10"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center shrink-0">
        {/* Node circle */}
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center relative z-10"
          style={{
            background: isInView ? `${ACCENT}20` : 'transparent',
            border: `2px solid ${isInView ? ACCENT : 'rgba(255,255,255,0.08)'}`,
            transition: 'all 0.6s ease',
          }}
        >
          <Icon className="w-6 h-6" style={{ color: ACCENT }} />
          {/* Pulse ring when in view */}
          {isInView && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${ACCENT}` }}
              initial={{ opacity: 0.5, scale: 1 }}
              animate={{ opacity: 0, scale: 1.6 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            />
          )}
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            className="w-px flex-1 min-h-[60px]"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              originY: 0,
              background: `linear-gradient(180deg, ${ACCENT}40, ${ACCENT}10)`,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-12 md:pb-16 pt-1">
        <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: `${ACCENT}80` }}>
          Step {step.number}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{step.title}</h3>
        <p className="text-dim text-sm md:text-base leading-relaxed max-w-md">
          {step.description}
        </p>
      </div>
    </motion.div>
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
    <section ref={sectionRef} className="py-section px-6 bg-bg">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center mb-16">
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Live in days, not months.
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            Three simple steps to an AI receptionist that handles every call with professionalism and precision.
          </p>
        </motion.div>

        {/* Vertical timeline */}
        <div className="max-w-xl mx-auto">
          {steps.map((step, i) => (
            <TimelineNode key={step.title} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
