'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { comparisonItems } from './data';

function CrossIcon() {
  return (
    <svg className="w-4 h-4 text-danger" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 4L12 12M12 4L4 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-accent-2" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8L6.5 11.5L13 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EmployeeProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-60px' });
  const tableRef = useRef<HTMLDivElement>(null);
  const isTableInView = useInView(tableRef, { once: true, margin: '-40px' });

  return (
    <section ref={sectionRef} className="py-section px-6 bg-bg">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            THE DIFFERENCE
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-4">
            This is not a chatbot.
          </h2>
          <p className="font-body text-dim text-lg max-w-xl mx-auto">
            Most AI tools wait for you to do the work. Your AI Employee does the work for you.
          </p>
        </motion.div>

        {/* Comparison table */}
        <div ref={tableRef} className="w-full">
          {/* Column headers */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isTableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr] gap-3 md:gap-4 mb-4 px-2"
          >
            <div />
            <div className="text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-danger/80">
                Most AI Tools
              </span>
            </div>
            <div className="text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-accent-2">
                Your AI Employee
              </span>
            </div>
          </motion.div>

          {/* Comparison rows */}
          <div className="space-y-3">
            {comparisonItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                animate={isTableInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr] gap-3 md:gap-4 items-center"
              >
                {/* Label */}
                <div className="font-body text-white text-sm font-medium px-2">
                  {item.label}
                </div>

                {/* Chatbot side */}
                <div className="bg-danger/[0.06] border border-danger/10 rounded-xl px-4 py-3 flex items-center gap-2.5 justify-center">
                  <CrossIcon />
                  <span className="font-body text-white/60 text-xs md:text-sm hidden sm:inline">
                    {item.chatbot}
                  </span>
                  <span className="font-body text-white/60 text-xs sm:hidden">
                    {item.chatbot}
                  </span>
                </div>

                {/* AI Employee side */}
                <div className="bg-accent-2/[0.06] border border-accent-2/15 rounded-xl px-4 py-3 flex items-center gap-2.5 justify-center">
                  <CheckIcon />
                  <span className="font-body text-white/90 text-xs md:text-sm hidden sm:inline">
                    {item.aiEmployee}
                  </span>
                  <span className="font-body text-white/90 text-xs sm:hidden">
                    {item.aiEmployee}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom summary line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isTableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-bg-card border border-border rounded-2xl px-6 py-4">
              <div className="w-2 h-2 rounded-full bg-accent-2 animate-pulse" />
              <span className="font-body text-white text-sm">
                Your AI Employee is working right now —{' '}
                <span className="text-accent-2 font-bold">even while you read this.</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
