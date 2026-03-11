'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Layout, Code, Sparkles } from 'lucide-react';

const ACCENT = '#7C3AED';

const steps = [
  {
    icon: Layout,
    number: '01',
    title: 'Strategy & Design',
    description:
      'We map your customer journey and design a site architecture that guides visitors toward conversion. You approve the look and feel before we build.',
  },
  {
    icon: Code,
    number: '02',
    title: 'Build & Train',
    description:
      'We develop your site with AI features baked in and train the chat assistant on your products, services, and FAQs so it responds accurately from day one.',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Launch & Evolve',
    description:
      'Your smart website goes live and starts learning immediately. It gets smarter with every visit, continuously improving personalization and conversions.',
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
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center shrink-0">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 + index * 0.15, type: 'spring', damping: 12 }}
          className="w-12 h-12 rounded-xl flex items-center justify-center border z-10"
          style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}15` }}
        >
          <Icon className="w-5 h-5" style={{ color: ACCENT }} />
        </motion.div>

        {/* Line */}
        {index < steps.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
            style={{ originY: 0 }}
            className="flex-1 w-px min-h-[60px]"
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
        <div className="text-4xl font-extrabold mb-2 opacity-15" style={{ color: ACCENT }}>
          {step.number}
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
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            From strategy to smart site in weeks.
          </h2>
        </motion.div>

        {/* Vertical timeline */}
        <div className="max-w-xl mx-auto">
          {steps.map((step, i) => (
            <TimelineStep key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
