'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ROW_1_ITEMS = [
  'AI Employees',
  'AI Agents',
  'WhatsApp & Instagram',
  'Lead Capture',
  '24/7 Operations',
  'Smart Automation',
  '40+ Industries',
  'pruve.co',
];

const ROW_2_ITEMS = [
  '40+ Industries',
  'Smart Automation',
  'AI Employees',
  'Lead Capture',
  '24/7 Operations',
  'AI Agents',
  'pruve.co',
  'WhatsApp & Instagram',
];

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-4 shrink-0">
      <span className="whitespace-nowrap">{item}</span>
      <span className="text-accent" aria-hidden="true">
        &middot;
      </span>
    </span>
  ));

  return (
    <div className="overflow-hidden w-full group">
      <div
        className={`flex gap-4 w-max ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } group-hover:[animation-play-state:paused]`}
      >
        {/* First copy */}
        <div className="flex gap-4 shrink-0">{content}</div>
        {/* Second copy for seamless loop */}
        <div className="flex gap-4 shrink-0" aria-hidden="true">
          {content}
        </div>
      </div>
    </div>
  );
}

/** Border line that draws from center outward */
function AnimatedBorder({ position }: { position: 'top' | 'bottom' }) {
  return (
    <motion.div
      className={`absolute left-0 right-0 h-[1px] bg-border ${
        position === 'top' ? 'top-0' : 'bottom-0'
      }`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, amount: 0.5 }}
      style={{ transformOrigin: 'center' }}
    />
  );
}

export default function MarqueeBar() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full py-6 bg-bg-2 overflow-hidden relative"
    >
      {/* Animated border lines — draw from center outward */}
      <AnimatedBorder position="top" />
      <AnimatedBorder position="bottom" />

      {/* Content — scaleY reveal */}
      <motion.div
        className="flex flex-col gap-4 text-dim uppercase tracking-widest text-sm font-display select-none"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{ transformOrigin: 'center' }}
      >
        <MarqueeRow items={ROW_1_ITEMS} />
        <MarqueeRow items={ROW_2_ITEMS} reverse />
      </motion.div>
    </section>
  );
}
