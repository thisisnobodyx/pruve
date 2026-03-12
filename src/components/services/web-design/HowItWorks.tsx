'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { MessageSquare, Palette, Rocket } from 'lucide-react';

const ACCENT = '#7C3AED';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Discovery Call',
    description: 'We learn your business, goals, audience, and brand. Then we map out the sitemap, wireframe, and design direction — all in one session.',
  },
  {
    icon: Palette,
    number: '02',
    title: 'Design & Build',
    description: 'You get a custom design mockup for approval. Once signed off, we develop the full site with animations, lead capture, and integrations.',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Launch & Grow',
    description: 'We test everything, optimize for speed and SEO, and launch. You get 30 days of free support plus analytics tracking from day one.',
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
    <section ref={sectionRef} className="py-section-mobile md:py-section px-6 bg-bg">
      <div className="max-w-5xl mx-auto">
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center mb-16">
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            From concept to launch in weeks.
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
