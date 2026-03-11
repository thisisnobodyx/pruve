'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link, Settings, Inbox } from 'lucide-react';

const ACCENT = '#7C3AED';

const steps = [
  {
    icon: Link,
    number: '01',
    title: 'Connect Your Channels',
    description:
      'Link your WhatsApp, Instagram, Telegram, email, and website chat accounts through our integration dashboard. Setup takes minutes per channel.',
  },
  {
    icon: Settings,
    number: '02',
    title: 'Configure Your Agent',
    description:
      'Set your knowledge base, brand voice, and channel-specific rules once. The AI adapts its behavior automatically for each platform.',
  },
  {
    icon: Inbox,
    number: '03',
    title: 'Manage From One Place',
    description:
      'Monitor all conversations, review analytics, and manage escalations from a single unified inbox. No more switching between apps.',
  },
];

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex gap-6 group"
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center shrink-0">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 + index * 0.15, type: 'spring' }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center border z-10"
          style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}10` }}
        >
          <Icon className="w-5 h-5" style={{ color: ACCENT }} />
        </motion.div>

        {/* Connector line */}
        {index < steps.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
            style={{ originY: 0 }}
            className="w-px flex-1 min-h-[40px] mt-2"
          >
            <div
              className="w-px h-full"
              style={{
                background: `linear-gradient(180deg, ${ACCENT}40, transparent)`,
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="pb-12">
        {/* Step number */}
        <div
          className="text-xs font-mono tracking-widest uppercase mb-2"
          style={{ color: ACCENT }}
        >
          STEP {step.number}
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
            Three steps to inbox zero.
          </h2>
        </motion.div>

        {/* Vertical timeline */}
        <div className="max-w-xl mx-auto">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
