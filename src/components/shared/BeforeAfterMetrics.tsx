'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

interface Metric {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

interface BeforeAfterMetricsProps {
  before: Metric[];
  after: Metric[];
  accentColor?: string;
  className?: string;
}

export default function BeforeAfterMetrics({
  before,
  after,
  accentColor = '#7C3AED',
  className = '',
}: BeforeAfterMetricsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-start max-w-4xl mx-auto">
        {/* Before column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-6"
        >
          <div className="text-center md:text-left">
            <span className="text-sm font-mono uppercase tracking-widest text-[#FF4545]">Before</span>
          </div>
          {before.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-bg-card border border-[#FF4545]/20 rounded-xl p-5 text-center"
            >
              <div className="text-3xl font-extrabold text-[#FF4545] mb-1">
                <AnimatedCounter
                  target={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </div>
              <div className="text-dim text-sm">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider with accent badge */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:flex flex-col items-center gap-3 self-stretch"
          style={{ originY: 0 }}
        >
          <div className="w-px flex-1 bg-gradient-to-b from-[#FF4545]/40 via-border to-transparent" style={{ ['--tw-gradient-to' as string]: `${accentColor}40` }} />
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: accentColor }}
          >
            VS
          </div>
          <div className="w-px flex-1 bg-gradient-to-b from-transparent via-border" style={{ ['--tw-gradient-to' as string]: `${accentColor}40` }} />
        </motion.div>

        {/* After column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-6"
        >
          <div className="text-center md:text-left">
            <span className="text-sm font-mono uppercase tracking-widest" style={{ color: accentColor }}>After</span>
          </div>
          {after.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
              className="bg-bg-card rounded-xl p-5 text-center border"
              style={{ borderColor: `${accentColor}30` }}
            >
              <div className="text-3xl font-extrabold mb-1" style={{ color: accentColor }}>
                <AnimatedCounter
                  target={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </div>
              <div className="text-dim text-sm">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
