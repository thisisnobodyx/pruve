'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import MagneticButton from '@/components/shared/MagneticButton';

const ACCENT = '#C9A84C';

const stats = [
  { value: '2 rings', label: 'Average answer time', description: 'Your customers never wait' },
  { value: '24/7', label: 'Coverage', description: 'Nights, weekends, holidays' },
  { value: '$4,200/mo', label: 'Saved on staffing', description: 'Compared to a full-time receptionist' },
];

function FlipCard({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} style={{ perspective: 1000 }}>
      <motion.div
        initial={{ rotateX: 90, opacity: 0 }}
        animate={isInView ? { rotateX: 0, opacity: 1 } : {}}
        transition={{
          duration: 0.7,
          delay: index * 0.15,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="bg-bg-card border border-border rounded-2xl p-8 text-center hover:border-white/10 transition-colors"
      >
        <div className="text-4xl md:text-5xl font-extrabold mb-3" style={{ color: ACCENT }}>
          {stat.value}
        </div>
        <div className="text-white font-semibold text-lg mb-2">{stat.label}</div>
        <p className="text-dim text-sm">{stat.description}</p>
      </motion.div>
    </div>
  );
}

export default function ResultsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="py-section-mobile md:py-section px-6 bg-bg-2">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center mb-16">
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            RESULTS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Numbers that speak for themselves.
          </h2>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, i) => (
            <FlipCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-bg-card border border-border rounded-2xl p-10 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Ready to never miss a call <span style={{ color: ACCENT }}>again?</span>
            </h3>
            <p className="text-dim mb-8">
              Get your AI receptionist live in under 48 hours. No hardware, no coding, no hassle.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <MagneticButton
                href="/pricing"
                className="px-8 py-4 rounded-full text-black font-semibold text-base transition-all hover:brightness-110"
                style={{ background: ACCENT }}
              >
                Get Started
              </MagneticButton>
              <MagneticButton
                href="/contact"
                className="px-8 py-4 rounded-full border border-border text-white font-semibold text-base hover:bg-white/5 transition-all"
              >
                Book a Demo
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
