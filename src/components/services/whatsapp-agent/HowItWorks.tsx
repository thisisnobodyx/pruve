'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Smartphone, Brain, Rocket } from 'lucide-react';

const ACCENT = '#25D366';

const steps = [
  {
    icon: Smartphone,
    number: '01',
    title: 'Connect Your Number',
    description: 'Link your existing WhatsApp Business number. We handle API setup, verification, and configuration — you focus on your business.',
  },
  {
    icon: Brain,
    number: '02',
    title: 'Train Your Agent',
    description: 'Upload your FAQs, product catalog, and business rules. The AI learns your tone of voice to respond just like your best team member.',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Go Live & Optimize',
    description: 'Launch your agent and watch it handle conversations autonomously. Review analytics, refine responses, and scale as volume grows.',
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative group"
    >
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-12 left-[calc(100%+1px)] w-full h-px">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
            style={{ originX: 0 }}
            className="h-px w-full"
          >
            <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${ACCENT}40, transparent)` }} />
          </motion.div>
        </div>
      )}

      <div className="text-center">
        {/* Step number */}
        <div className="text-6xl font-extrabold mb-4 opacity-10" style={{ color: ACCENT }}>
          {step.number}
        </div>

        {/* Icon circle */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center border transition-colors"
          style={{ borderColor: `${ACCENT}30`, background: `${ACCENT}10` }}
        >
          <Icon className="w-7 h-7" style={{ color: ACCENT }} />
        </motion.div>

        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
        <p className="text-dim text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center mb-16">
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Up and running in days, not months.
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
