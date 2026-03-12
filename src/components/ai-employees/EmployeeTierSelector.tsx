'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { tierRoles } from './data';

function TierCard({
  role,
  index,
}: {
  role: (typeof tierRoles)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const isMiddle = index === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative flex flex-col bg-bg-card border rounded-3xl p-8 md:p-10 transition-all duration-300 hover:shadow-xl ${
        isMiddle ? 'lg:-mt-4 lg:mb-4' : ''
      }`}
      style={{
        borderColor: `${role.color}20`,
        boxShadow: `0 0 40px ${role.color}06`,
      }}
    >
      {/* Popular badge for Manager */}
      {isMiddle && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-bg"
          style={{ background: role.color }}
        >
          Most Popular
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div
          className="font-mono text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: role.color }}
        >
          {role.label}
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-1">
          {role.name}
        </h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="font-mono text-3xl font-extrabold" style={{ color: role.color }}>
            ${role.price}
          </span>
          <span className="font-mono text-sm text-dim">/mo</span>
        </div>
        <p className="font-body text-dim text-sm leading-relaxed">
          {role.fullDesc}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px mb-6" style={{ background: `${role.color}15` }} />

      {/* Capabilities */}
      <ul className="space-y-3 flex-1 mb-8">
        {role.capabilities.map((cap, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
            className="flex items-start gap-3"
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: `${role.color}15` }}
            >
              <svg
                className="w-3 h-3"
                viewBox="0 0 12 12"
                fill="none"
                style={{ color: role.color }}
              >
                <path
                  d="M2 6L5 9L10 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-body text-white/80 text-sm leading-relaxed">{cap}</span>
          </motion.li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/contact"
        className="block w-full text-center px-6 py-3.5 rounded-pill text-sm font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        style={{
          background: isMiddle ? role.color : `${role.color}15`,
          color: isMiddle ? '#0F0A1E' : role.color,
          border: isMiddle ? 'none' : `1px solid ${role.color}30`,
        }}
      >
        Hire {role.name}
      </Link>
    </motion.div>
  );
}

export default function EmployeeTierSelector() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section className="py-section px-6 bg-bg-2">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            CHOOSE YOUR ROLE
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-4">
            One AI Employee. Three scopes.
          </h2>
          <p className="font-body text-dim text-lg max-w-xl mx-auto">
            Start where you need help most. Upgrade as your business grows.
          </p>
        </motion.div>

        {/* Three tier cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 items-start">
          {tierRoles.map((role, i) => (
            <TierCard key={role.id} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
