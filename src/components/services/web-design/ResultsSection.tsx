'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BeforeAfterMetrics from '@/components/shared/BeforeAfterMetrics';
import MagneticButton from '@/components/shared/MagneticButton';

const ACCENT = '#7C3AED';

const beforeMetrics = [
  { label: 'Page load time', value: 8, suffix: '.2 sec' },
  { label: 'Bounce rate', value: 78, suffix: '%' },
  { label: 'Monthly leads', value: 3 },
];

const afterMetrics = [
  { label: 'Page load time', value: 1, suffix: '.4 sec' },
  { label: 'Bounce rate', value: 32, suffix: '%' },
  { label: 'Monthly leads', value: 47 },
];

export default function ResultsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="py-section px-6 bg-bg-2">
      <div className="max-w-5xl mx-auto">
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center mb-16">
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            RESULTS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            The numbers speak for themselves.
          </h2>
        </motion.div>

        <BeforeAfterMetrics
          before={beforeMetrics}
          after={afterMetrics}
          accentColor={ACCENT}
          className="mb-20"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-bg-card border border-border rounded-2xl p-10 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Ready for a website that actually works?
            </h3>
            <p className="text-dim mb-8">
              Get a custom design quote in 24 hours. No templates, no surprises.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <MagneticButton
                href="/contact"
                className="px-8 py-4 rounded-full text-white font-semibold text-base transition-all hover:brightness-110"
                style={{ background: ACCENT }}
              >
                Get a Free Quote
              </MagneticButton>
              <MagneticButton
                href="/pricing"
                className="px-8 py-4 rounded-full border border-border text-white font-semibold text-base hover:bg-white/5 transition-all"
              >
                View Pricing
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
