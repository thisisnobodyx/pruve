'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import MagneticButton from '@/components/shared/MagneticButton';
import ParticleNetwork from '@/components/shared/ParticleNetwork';

const humanCosts = [
  { role: 'Receptionist', cost: 3500, icon: '📞' },
  { role: 'Marketing Manager', cost: 5200, icon: '📊' },
  { role: 'Operations Coordinator', cost: 4000, icon: '⚡' },
];

const totalHuman = humanCosts.reduce((sum, h) => sum + h.cost, 0);
const aiCost = 1497;
const savings = totalHuman - aiCost;

export default function CostComparison() {
  return (
    <section className="relative py-section px-6 bg-bg-2 overflow-hidden">
      <ParticleNetwork particleCount={60} />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            THE MATH
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Replace a team. Keep the results.
          </h2>
        </motion.div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-4 items-center">
          {/* Human team column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <div className="text-center mb-6">
              <div className="text-[#FF4545] text-xs font-mono uppercase tracking-widest mb-2">Human Team</div>
              <div className="text-dim text-sm">3 full-time hires</div>
            </div>
            {humanCosts.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-bg-card border border-[#FF4545]/15 rounded-xl px-5 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white text-sm font-medium">{item.role}</span>
                </div>
                <span className="text-[#FF4545] font-mono text-sm font-bold">
                  <AnimatedCounter target={item.cost} prefix="$" suffix="/mo" />
                </span>
              </motion.div>
            ))}
            {/* Total */}
            <div className="bg-[#FF4545]/10 border border-[#FF4545]/25 rounded-xl px-5 py-4 flex items-center justify-between mt-2">
              <span className="text-white text-sm font-bold">Total Monthly Cost</span>
              <span className="text-[#FF4545] font-mono text-lg font-extrabold">
                <AnimatedCounter target={totalHuman} prefix="$" suffix="/mo" />
              </span>
            </div>
          </motion.div>

          {/* VS divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="w-14 h-14 rounded-full bg-bg-card border border-border flex items-center justify-center">
              <span className="text-dim font-extrabold text-xs">VS</span>
            </div>
          </motion.div>

          {/* AI Employee column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-6">
              <div className="text-[#C8F135] text-xs font-mono uppercase tracking-widest mb-2">The Executive</div>
              <div className="text-dim text-sm">1 AI Employee — does it all</div>
            </div>
            <div
              className="bg-bg-card border rounded-xl p-8 text-center"
              style={{ borderColor: '#C8F13530', boxShadow: '0 0 60px #C8F13510' }}
            >
              <div className="text-5xl mb-4">👔</div>
              <div className="text-white font-extrabold text-xl mb-1">The Executive</div>
              <div className="text-dim text-sm mb-6">Receptionist + Marketing + Operations + Intelligence</div>
              <div className="text-[#C8F135] font-mono text-3xl font-extrabold mb-2">
                <AnimatedCounter target={aiCost} prefix="$" suffix="/mo" />
              </div>
              <div className="text-dim text-xs">All 8 agents included. 24/7. No benefits. No PTO.</div>
            </div>

            {/* Savings highlight */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-4 bg-accent-2/10 border border-accent-2/25 rounded-xl px-5 py-4 flex items-center justify-between"
            >
              <span className="text-white text-sm font-bold">You Save</span>
              <span className="text-accent-2 font-mono text-lg font-extrabold">
                <AnimatedCounter target={savings} prefix="$" suffix="/mo" />
              </span>
            </motion.div>

            <div className="text-center mt-2">
              <span className="text-dim text-xs">
                That&apos;s <span className="text-accent-2 font-bold">${(savings * 12).toLocaleString()}/year</span> back in your pocket.
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Hire your first AI Employee
          </h3>
          <p className="text-dim text-lg mb-8 max-w-lg mx-auto">
            Start with The Operator at $297/mo. Upgrade anytime.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <MagneticButton href="/contact" className="bg-accent text-bg font-medium px-8 py-3 rounded-pill text-sm">
              Hire an Employee
            </MagneticButton>
            <MagneticButton href="/pricing" className="bg-white/5 text-white border border-border font-medium px-8 py-3 rounded-pill text-sm hover:bg-white/10">
              See All Plans
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
