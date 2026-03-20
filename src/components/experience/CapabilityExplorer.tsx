'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { capabilities, tierColors, tierLabels } from './experience-data';
import type { Capability, Industry } from './experience-data';
import { getIndustry } from './industries';

interface CapabilityExplorerProps {
  selectedIndustry: string | null;
  customIndustry?: Industry;
}

function CapabilityCard({
  cap,
  industryExample,
  index,
}: {
  cap: Capability;
  industryExample?: string;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="bg-bg-card border border-border rounded-xl overflow-hidden hover:border-white/10 transition-all cursor-pointer group"
      style={{ borderLeftWidth: 3, borderLeftColor: tierColors[cap.tier] }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: `${tierColors[cap.tier]}10` }}
          >
            {cap.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-white text-sm font-bold truncate">{cap.name}</h3>
              <span className="text-[8px] shrink-0 ml-auto opacity-60 group-hover:opacity-100 transition-opacity">
                {expanded ? '▲' : '▼'}
              </span>
            </div>
            <p className="text-dim text-[11px] leading-relaxed">{cap.description}</p>
          </div>
        </div>

        {/* Tier badge */}
        <div className="mt-2 flex items-center gap-2">
          <span
            className="text-[9px] px-2 py-0.5 rounded-full font-mono"
            style={{
              color: tierColors[cap.tier],
              background: `${tierColors[cap.tier]}10`,
              border: `1px solid ${tierColors[cap.tier]}20`,
            }}
          >
            {cap.tier === 'operator'
              ? '✓ Included in The Operator'
              : cap.tier === 'manager'
                ? '↑ Requires The Manager'
                : '↑ Requires The Executive'}
          </span>
        </div>

        {/* Industry-specific example */}
        <AnimatePresence>
          {industryExample && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-border"
            >
              <div className="text-[9px] font-mono uppercase tracking-wider text-dim mb-1">
                For your business:
              </div>
              <p className="text-white/80 text-xs italic">&ldquo;{industryExample}&rdquo;</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded highlights */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-border"
            >
              <div className="text-[9px] font-mono uppercase tracking-wider text-dim mb-2">
                Key features:
              </div>
              <ul className="space-y-1.5">
                {cap.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-2 text-[11px] text-dim"
                  >
                    <span style={{ color: tierColors[cap.tier] }}>•</span>
                    <span>{h}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function CapabilityExplorer({ selectedIndustry, customIndustry }: CapabilityExplorerProps) {
  const industry = customIndustry ?? (selectedIndustry ? getIndustry(selectedIndustry) : null);
  const examples = industry?.capabilityExamples ?? {};

  // Group by tier
  const operatorCaps = capabilities.filter((c) => c.tier === 'operator');
  const managerCaps = capabilities.filter((c) => c.tier === 'manager');
  const executiveCaps = capabilities.filter((c) => c.tier === 'executive');

  return (
    <section className="py-section-mobile md:py-section px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            MASTER CAPABILITY LIST
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Everything your AI Employee can do.
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            15 capability categories across three tiers. One AI Employee. Built around your workflow.
          </p>
        </motion.div>

        {/* Tier sections */}
        {[
          { label: 'The Operator — $297/mo', tier: 'operator' as const, caps: operatorCaps, desc: 'Included in every package' },
          { label: 'The Manager — $597/mo', tier: 'manager' as const, caps: managerCaps, desc: 'Everything in The Operator, plus:' },
          { label: 'The Executive — $1,197/mo', tier: 'executive' as const, caps: executiveCaps, desc: 'Everything in The Manager, plus:' },
        ].map((section, si) => (
          <div key={section.tier} className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: tierColors[section.tier] }}
              />
              <h3 className="text-lg font-extrabold" style={{ color: tierColors[section.tier] }}>
                {section.label}
              </h3>
              <span className="text-dim text-xs">— {section.desc}</span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.caps.map((cap, i) => (
                <CapabilityCard
                  key={cap.id}
                  cap={cap}
                  industryExample={examples[cap.id]}
                  index={si * 5 + i}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
