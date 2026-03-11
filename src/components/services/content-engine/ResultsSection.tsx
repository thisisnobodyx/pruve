'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BeforeAfterMetrics from '@/components/shared/BeforeAfterMetrics';
import MagneticButton from '@/components/shared/MagneticButton';

const ACCENT = '#F59E0B';

const beforeMetrics = [
  { label: 'Hours on content/week', value: 20 },
  { label: 'SEO articles/month', value: 2 },
  { label: 'Social posts/week', value: 3 },
];

const afterMetrics = [
  { label: 'Hours on content/week', value: 1 },
  { label: 'SEO articles/month', value: 12 },
  { label: 'Social posts/week', value: 21 },
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
        {/* Header */}
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center mb-16">
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            RESULTS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Content that works as hard as you do.
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            See the difference when AI handles your content production at scale.
          </p>
        </motion.div>

        {/* Before / After comparison */}
        <BeforeAfterMetrics
          before={beforeMetrics}
          after={afterMetrics}
          accentColor={ACCENT}
          className="mb-20"
        />

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
              Ready to put content on <span style={{ color: ACCENT }}>autopilot?</span>
            </h3>
            <p className="text-dim mb-8">
              Stop spending hours on content creation. Let AI handle the heavy lifting while you focus on growing your business.
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
