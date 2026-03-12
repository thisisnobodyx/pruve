'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Search, Settings, TrendingUp } from 'lucide-react';

const ACCENT = '#C8F135';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Deep SEO Audit',
    description: 'We crawl every page, analyze your competitors, and uncover exactly why you\'re not ranking. You get a full report with a prioritized action plan.',
  },
  {
    icon: Settings,
    number: '02',
    title: 'Optimize & Fix',
    description: 'We fix technical issues, optimize every page for target keywords, build your local profiles, and set up tracking so nothing is left to guesswork.',
  },
  {
    icon: TrendingUp,
    number: '03',
    title: 'Rank & Scale',
    description: 'Watch your rankings climb week by week. We build backlinks, publish optimized content, and continuously refine your strategy as you grow.',
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
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-12 left-[calc(100%+1px)] w-full h-px">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
            style={{ originX: 0 }}
          >
            <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${ACCENT}40, transparent)` }} />
          </motion.div>
        </div>
      )}

      <div className="text-center">
        <div className="text-6xl font-extrabold mb-4 opacity-10" style={{ color: ACCENT }}>{step.number}</div>
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
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center mb-16">
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            From invisible to #1 in months.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
