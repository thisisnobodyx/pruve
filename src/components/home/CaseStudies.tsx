'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

interface Stat {
  target: number;
  suffix: string;
  label: string;
}

interface CaseStudy {
  industry: string;
  title: string;
  result: string;
  description: string;
}

const stats: Stat[] = [
  { target: 10, suffix: '+', label: 'Years' },
  { target: 200, suffix: '+', label: 'Clients' },
  { target: 40, suffix: '+', label: 'Industries' },
  { target: 5, suffix: '', label: 'Countries' },
];

const caseStudies: CaseStudy[] = [
  {
    industry: 'Local Restaurant',
    title: 'AI Employee — The Operator',
    result: '200+ messages/day handled',
    description:
      'Handles every WhatsApp booking, confirms orders, follows up with customers, and sends a morning briefing — all automatically.',
  },
  {
    industry: 'Real Estate Agency',
    title: 'AI Employee — The Manager',
    result: '3x more conversions',
    description:
      'Qualifies leads across every channel, follows up on day 1, 3, and 7, and sends weekly performance reports to the team.',
  },
  {
    industry: 'Fitness Studio',
    title: 'AI Employee — The Executive',
    result: '$4,200/mo saved',
    description:
      'Runs the entire operation — books classes, creates social content, chases invoices, and monitors competitor pricing.',
  },
];

/** Typewriter/reveal animation for result text */
function TypewriterResult({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 40);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, text, delay]);

  return (
    <p
      ref={ref}
      className="text-accent-2 text-2xl font-display font-bold mb-2 min-h-[2rem]"
    >
      {displayed}
      {isInView && displayed.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </p>
  );
}

/** Horizontal line that draws across as the section enters view */
function AnimatedHorizontalLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.4'],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute bottom-0 left-0 right-0 h-[1px]">
      <motion.div
        className="h-full bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        style={{
          scaleX,
          transformOrigin: 'center',
        }}
      />
    </div>
  );
}

export default function CaseStudies() {
  const caseSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: caseProgress } = useScroll({
    target: caseSectionRef,
    offset: ['start end', 'start 0.3'],
  });

  const caseTitleY = useTransform(caseProgress, [0, 1], [60, 0]);
  const caseTitleOpacity = useTransform(caseProgress, [0, 0.5], [0, 1]);

  return (
    <>
      {/* Part 1: Stats Bar */}
      <section className="w-full py-16 px-6 bg-bg-2 border-y border-border relative">
        <AnimatedHorizontalLine />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter
                target={stat.target}
                suffix={stat.suffix}
                className="font-display text-4xl md:text-5xl font-extrabold text-white"
              />
              <p className="text-dim text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Part 2: Case Studies */}
      <section ref={caseSectionRef} className="py-section px-6">
        <motion.div style={{ y: caseTitleY, opacity: caseTitleOpacity }}>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-center mb-16 text-white">
            Results that speak.
          </h2>
        </motion.div>

        {/* Case study cards — 3D perspective flip */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          style={{ perspective: '1200px' }}
        >
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, rotateX: 10, y: 40 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true, amount: 0.2 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="group bg-bg-card border border-border rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-accent/20 hover:shadow-[0_0_30px_rgba(124, 58, 237,0.06)]"
            >
              {/* Industry Badge */}
              <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 block">
                {study.industry}
              </span>

              {/* Title */}
              <h3 className="font-display text-lg font-bold mb-3 text-white">
                {study.title}
              </h3>

              {/* Result Metric — typewriter animation */}
              <TypewriterResult text={study.result} delay={index * 0.2 + 0.3} />

              {/* Description */}
              <p className="text-dim text-sm leading-relaxed">
                {study.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
