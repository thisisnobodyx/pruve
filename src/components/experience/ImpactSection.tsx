'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import MagneticButton from '@/components/shared/MagneticButton';
import ParticleNetwork from '@/components/shared/ParticleNetwork';
import { packages, tierColors, tierLabels } from './experience-data';
import type { TierId } from './experience-data';
import { getIndustry } from './industries';

interface ImpactSectionProps {
  selectedIndustry: string | null;
}

export default function ImpactSection({ selectedIndustry }: ImpactSectionProps) {
  const industry = selectedIndustry ? getIndustry(selectedIndustry) : null;

  return (
    <section className="relative py-section px-6 bg-bg-2 overflow-hidden">
      <ParticleNetwork particleCount={60} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            THE IMPACT
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            {industry
              ? `What this means for your ${industry.label.toLowerCase()}.`
              : 'Hire an employee that never sleeps.'}
          </h2>
        </motion.div>

        {/* Industry-specific stats */}
        {industry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            <StatCard
              value={industry.stats.messagesPerDay}
              suffix="/day"
              label="Messages Handled"
              color="#7DF9C0"
            />
            <StatCard
              value={industry.stats.bookingsPerWeek}
              suffix="/week"
              label="Bookings Managed"
              color="#7C3AED"
            />
            <StatCard
              value={industry.stats.monthlySavings}
              prefix="$"
              suffix="/mo"
              label="Monthly Savings"
              color="#C8F135"
            />
            <div className="bg-bg-card border border-border rounded-xl p-5 text-center">
              <div className="text-accent-2 font-mono font-extrabold text-2xl md:text-3xl mb-1">
                {industry.stats.responseTime}
              </div>
              <div className="text-dim text-xs">Response Time</div>
            </div>
          </motion.div>
        )}

        {/* Recommendation */}
        {industry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-bg-card border rounded-2xl p-6 md:p-8 mb-16 text-center"
            style={{ borderColor: `${tierColors[industry.recommendedTier]}30` }}
          >
            <div className="text-dim text-xs font-mono uppercase tracking-widest mb-3">
              OUR RECOMMENDATION FOR {industry.label.toUpperCase()}
            </div>
            <h3
              className="text-2xl md:text-3xl font-extrabold mb-2"
              style={{ color: tierColors[industry.recommendedTier] }}
            >
              {tierLabels[industry.recommendedTier]}
            </h3>
            <p className="text-dim text-sm max-w-lg mx-auto">{industry.recommendationReason}</p>
          </motion.div>
        )}

        {/* Package cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {packages.map((pkg, i) => {
            const isRecommended = industry?.recommendedTier === pkg.id;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-bg-card border rounded-2xl p-6 transition-all ${
                  isRecommended ? 'shadow-lg' : ''
                }`}
                style={{
                  borderColor: isRecommended ? `${pkg.color}40` : 'rgba(255,255,255,0.05)',
                  boxShadow: isRecommended ? `0 0 60px ${pkg.color}10` : undefined,
                }}
              >
                {isRecommended && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{ background: pkg.color, color: '#0F0A1E' }}
                  >
                    Recommended
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-white font-extrabold text-lg mb-1">{pkg.name}</h3>
                  <div className="font-mono text-2xl font-extrabold mb-1" style={{ color: pkg.color }}>
                    ${pkg.price}/mo
                  </div>
                  <div className="text-dim text-[11px]">+ ${pkg.setup} one-time setup</div>
                </div>

                <div className="text-dim text-xs mb-4">{pkg.tagline}</div>

                <ul className="space-y-2 mb-6">
                  {pkg.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-[11px] text-dim">
                      <span style={{ color: pkg.color }} className="mt-0.5">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  href="/contact"
                  className="w-full text-center px-4 py-2.5 rounded-pill text-sm font-medium transition-all"
                  style={
                    isRecommended
                      ? { background: pkg.color, color: '#0F0A1E' }
                      : { background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }
                  }
                >
                  {isRecommended ? `Hire ${pkg.name}` : `Choose ${pkg.name}`}
                </MagneticButton>
              </motion.div>
            );
          })}
        </div>

        {/* Secondary options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16"
        >
          <div className="bg-bg-card border border-border rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-xl flex-shrink-0">
              🔧
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm">Standalone Agent</h4>
              <p className="text-dim text-[11px]">
                One specific capability configured for your business.
              </p>
              <div className="text-accent font-mono text-xs mt-1">$197/mo + $297 setup</div>
            </div>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-3/10 flex items-center justify-center text-xl flex-shrink-0">
              🔍
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm">AI Business Audit</h4>
              <p className="text-dim text-[11px]">
                We map your workflow and identify automation opportunities. Credited toward setup.
              </p>
              <div className="text-accent-3 font-mono text-xs mt-1">$497 (one-time)</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Ready to hire your AI Employee?
          </h3>
          <p className="text-dim text-lg mb-8 max-w-lg mx-auto">
            Every AI Employee is built around your workflow. Not a template. Your business.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <MagneticButton
              href="/contact"
              className="bg-accent text-bg font-medium px-8 py-3 rounded-pill text-sm"
            >
              Book a Strategy Call
            </MagneticButton>
            <MagneticButton
              href="/contact"
              className="bg-white/5 text-white border border-border font-medium px-8 py-3 rounded-pill text-sm hover:bg-white/10"
            >
              Take the AI Audit — $497
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* STAT CARD                                                            */
/* ------------------------------------------------------------------ */
function StatCard({
  value,
  prefix,
  suffix,
  label,
  color,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  color: string;
}) {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5 text-center">
      <div className="font-mono font-extrabold text-2xl md:text-3xl mb-1" style={{ color }}>
        <AnimatedCounter target={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="text-dim text-xs">{label}</div>
    </div>
  );
}
