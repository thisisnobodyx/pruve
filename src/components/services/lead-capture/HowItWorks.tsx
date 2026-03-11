'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Target, Zap, TrendingUp } from 'lucide-react';

const ACCENT = '#C8F135';

const steps = [
  {
    icon: Target,
    number: '01',
    title: 'Define Your Ideal Lead',
    description:
      'Set your qualification criteria, scoring rules, and target customer profile. The AI uses this to prioritize high-value prospects automatically.',
  },
  {
    icon: Zap,
    number: '02',
    title: 'Deploy Capture Points',
    description:
      'Add AI-powered lead capture to your website, WhatsApp, social media, and landing pages. Every touchpoint becomes a conversion opportunity.',
  },
  {
    icon: TrendingUp,
    number: '03',
    title: 'Nurture & Convert',
    description:
      'Qualified leads enter automated follow-up sequences while your sales team receives real-time alerts for the hottest opportunities.',
  },
];

function TimelineStep({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Timeline bar */}
      <div className="flex flex-col items-center shrink-0">
        {/* Icon circle */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors z-10"
          style={{ borderColor: `${ACCENT}30`, background: `${ACCENT}10` }}
        >
          <Icon className="w-6 h-6" style={{ color: ACCENT }} />
        </motion.div>

        {/* Connector line */}
        {index < steps.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
            style={{ originY: 0 }}
            className="w-px flex-1 my-2"
          >
            <div
              className="w-px h-full"
              style={{ background: `linear-gradient(to bottom, ${ACCENT}40, transparent)` }}
            />
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="pb-12">
        {/* Step number */}
        <div className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: `${ACCENT}80` }}>
          Step {step.number}
        </div>

        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
        <p className="text-dim text-sm leading-relaxed max-w-md">{step.description}</p>
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
          <span
            className="font-mono text-sm tracking-widest uppercase mb-3 block"
            style={{ color: ACCENT }}
          >
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Three steps to{' '}
            <span style={{ color: ACCENT }}>zero leads lost.</span>
          </h2>
        </motion.div>

        {/* Vertical timeline */}
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <TimelineStep key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
