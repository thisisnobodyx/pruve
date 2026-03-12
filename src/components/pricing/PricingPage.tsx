'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import MagneticButton from '@/components/shared/MagneticButton';
import ParticleNetwork from '@/components/shared/ParticleNetwork';
import { employees, agents, getAgentsByIds, type Employee } from '@/components/ai-employees/data';

/* ------------------------------------------------------------------ */
/* HERO: Three Glowing Orbs                                            */
/* ------------------------------------------------------------------ */
function PricingHero() {
  const orbSizes = [100, 140, 180]; // sm, md, lg
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 pt-28 pb-20 overflow-hidden">
      <ParticleNetwork particleCount={80} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center mb-16"
      >
        <span className="font-mono text-sm tracking-widest uppercase text-accent mb-4 block">Pricing</span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          Invest in employees
          <br />
          <span className="text-accent">that never sleep.</span>
        </h1>
        <p className="text-dim text-lg md:text-xl max-w-2xl mx-auto">
          Three tiers. One mission. Pick the AI employee that fits your business today — upgrade anytime.
        </p>
      </motion.div>

      {/* Three orbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 flex items-end justify-center gap-8 md:gap-16"
      >
        {employees.map((emp, i) => {
          const size = orbSizes[i];
          return (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0, y: 30, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex flex-col items-center"
            >
              <div
                className="rounded-full relative mb-4 flex items-center justify-center"
                style={{
                  width: size,
                  height: size,
                  background: `radial-gradient(circle, ${emp.color}25 0%, ${emp.color}08 60%, transparent 80%)`,
                  boxShadow: `0 0 60px ${emp.color}20, 0 0 120px ${emp.color}08`,
                }}
              >
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `2px solid ${emp.color}30` }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                />
                <span className="text-3xl md:text-4xl">{emp.id === 'operator' ? '🎧' : emp.id === 'manager' ? '📊' : '👔'}</span>
              </div>
              <div className="text-white font-extrabold text-sm md:text-base">{emp.name}</div>
              <div className="font-mono text-xs md:text-sm mt-1" style={{ color: emp.color }}>
                ${emp.price}/mo
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* TIER STACK: Interactive agent stacking visualization               */
/* ------------------------------------------------------------------ */
function TierStack() {
  const [activeId, setActiveId] = useState('operator');
  const active = employees.find((e) => e.id === activeId)!;
  const activeAgents = getAgentsByIds(active.agentIds);

  return (
    <section className="py-section px-6 bg-bg-2">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            THE STACK
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Every tier builds on the last.
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            The Manager includes everything in The Operator, plus more. The Executive includes everything.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* Tier toggle + agent stack */}
          <div>
            <div className="flex gap-2 mb-8">
              {employees.map((emp) => {
                const isActive = activeId === emp.id;
                return (
                  <button
                    key={emp.id}
                    onClick={() => setActiveId(emp.id)}
                    className={`flex-1 px-4 py-3 rounded-xl text-center transition-all border text-sm font-medium ${
                      isActive ? 'text-white shadow-lg' : 'text-dim border-border hover:bg-bg-card/50'
                    }`}
                    style={isActive ? {
                      background: `${emp.color}12`,
                      borderColor: `${emp.color}40`,
                      boxShadow: `0 0 30px ${emp.color}10`,
                    } : undefined}
                  >
                    {emp.name}
                  </button>
                );
              })}
            </div>

            {/* Agent stack visualization */}
            <div className="bg-bg-card border border-border rounded-2xl p-6 md:p-8 min-h-[350px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {activeAgents.map((agent, i) => (
                      <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.08, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                      >
                        <Link
                          href={agent.href}
                          className="block bg-bg/60 border border-border rounded-xl p-4 hover:border-white/15 transition-all group"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                              style={{ background: `${agent.color}15`, border: `1px solid ${agent.color}25` }}
                            >
                              {agent.icon}
                            </div>
                            <div>
                              <div className="text-white text-xs font-bold group-hover:text-accent transition-colors">{agent.name}</div>
                              <div className="text-dim text-[10px]">{agent.desc}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: agent.color }} />
                            <span className="text-[9px] font-mono" style={{ color: agent.color }}>Included</span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tier total */}
                  <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                    <div className="text-dim text-sm">
                      <strong className="text-white">{activeAgents.length}</strong> agents included
                    </div>
                    <div className="text-xs text-dim">
                      {activeId === 'operator' ? '' : activeId === 'manager'
                        ? 'Everything in Operator + 3 more'
                        : 'Everything in Manager + 2 more'}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Price card (sticky) */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-bg-card border rounded-2xl p-8 text-center"
                style={{ borderColor: `${active.color}30`, boxShadow: `0 0 50px ${active.color}08` }}
              >
                <div className="text-3xl mb-3">
                  {active.id === 'operator' ? '🎧' : active.id === 'manager' ? '📊' : '👔'}
                </div>
                <h3 className="text-xl font-extrabold text-white mb-1">{active.name}</h3>
                <p className="text-dim text-xs mb-6">{active.title}</p>

                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-extrabold" style={{ color: active.color }}>
                    ${active.price}
                  </span>
                  <span className="text-dim text-sm">/mo</span>
                </div>
                <p className="text-dim text-xs mb-6">{active.desc}</p>

                <MagneticButton
                  href="/contact"
                  className="w-full py-3 rounded-pill text-sm font-medium text-center block"
                  style={{ background: active.color, color: '#0F0A1E' }}
                >
                  Hire {active.name}
                </MagneticButton>

                <p className="text-dim text-[10px] mt-4">
                  No contracts. Cancel anytime. 48hr setup.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ROI CALCULATOR: "See Your Savings"                                 */
/* ------------------------------------------------------------------ */
function ROICalculator() {
  const [leadsPerWeek, setLeadsPerWeek] = useState(30);
  const [responseTime, setResponseTime] = useState(4);
  const [hoursOnTasks, setHoursOnTasks] = useState(20);

  const results = useMemo(() => {
    // Revenue impact calculation
    const missedLeadRate = Math.min(responseTime * 0.08, 0.6); // Higher response time → more lost leads
    const monthlyLeads = leadsPerWeek * 4.3;
    const avgDealValue = 350;
    const lostRevenue = Math.round(monthlyLeads * missedLeadRate * avgDealValue);
    const laborCost = Math.round(hoursOnTasks * 4.3 * 25); // $25/hr equivalent
    const totalLoss = lostRevenue + laborCost;

    // Recommend tier
    let recommended: Employee;
    if (monthlyLeads < 60 && hoursOnTasks < 15) {
      recommended = employees[0]; // Operator
    } else if (monthlyLeads < 200 && hoursOnTasks < 35) {
      recommended = employees[1]; // Manager
    } else {
      recommended = employees[2]; // Executive
    }

    const annualSavings = (totalLoss - recommended.price) * 12;

    return { lostRevenue, laborCost, totalLoss, recommended, annualSavings };
  }, [leadsPerWeek, responseTime, hoursOnTasks]);

  return (
    <section className="py-section px-6 bg-bg">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            ROI CALCULATOR
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            See what you&apos;re leaving on the table.
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            Plug in your numbers. See the impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-8">
            {/* Leads slider */}
            <div>
              <label className="flex items-center justify-between text-sm mb-3">
                <span className="text-white font-medium">Leads per week</span>
                <span className="text-accent font-mono font-bold">{leadsPerWeek}</span>
              </label>
              <input
                type="range"
                min={5}
                max={200}
                value={leadsPerWeek}
                onChange={(e) => setLeadsPerWeek(Number(e.target.value))}
                className="w-full accent-accent h-1.5 bg-bg-card rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-dim text-[10px] mt-1">
                <span>5</span>
                <span>200+</span>
              </div>
            </div>

            {/* Response time */}
            <div>
              <label className="flex items-center justify-between text-sm mb-3">
                <span className="text-white font-medium">Average response time</span>
                <span className="text-accent font-mono font-bold">{responseTime}h</span>
              </label>
              <input
                type="range"
                min={1}
                max={24}
                value={responseTime}
                onChange={(e) => setResponseTime(Number(e.target.value))}
                className="w-full accent-accent h-1.5 bg-bg-card rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-dim text-[10px] mt-1">
                <span>1 hour</span>
                <span>24 hours</span>
              </div>
            </div>

            {/* Hours on tasks */}
            <div>
              <label className="flex items-center justify-between text-sm mb-3">
                <span className="text-white font-medium">Hours/week on repetitive tasks</span>
                <span className="text-accent font-mono font-bold">{hoursOnTasks}h</span>
              </label>
              <input
                type="range"
                min={5}
                max={60}
                value={hoursOnTasks}
                onChange={(e) => setHoursOnTasks(Number(e.target.value))}
                className="w-full accent-accent h-1.5 bg-bg-card rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-dim text-[10px] mt-1">
                <span>5 hours</span>
                <span>60 hours</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {/* What you're losing */}
            <div className="bg-[#FF4545]/5 border border-[#FF4545]/20 rounded-2xl p-6">
              <div className="text-[#FF4545] text-xs font-mono uppercase tracking-wider mb-4">You&apos;re losing</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-dim text-sm">Lost leads (slow response)</span>
                  <span className="text-[#FF4545] font-mono text-sm font-bold">
                    <AnimatedCounter target={results.lostRevenue} prefix="$" suffix="/mo" />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dim text-sm">Manual labor cost</span>
                  <span className="text-[#FF4545] font-mono text-sm font-bold">
                    <AnimatedCounter target={results.laborCost} prefix="$" suffix="/mo" />
                  </span>
                </div>
                <div className="border-t border-[#FF4545]/15 pt-3 flex items-center justify-between">
                  <span className="text-white text-sm font-bold">Total monthly loss</span>
                  <span className="text-[#FF4545] font-mono text-xl font-extrabold">
                    <AnimatedCounter target={results.totalLoss} prefix="$" suffix="/mo" />
                  </span>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div
              className="border rounded-2xl p-6"
              style={{
                background: `${results.recommended.color}05`,
                borderColor: `${results.recommended.color}25`,
              }}
            >
              <div className="text-xs font-mono uppercase tracking-wider mb-4" style={{ color: results.recommended.color }}>
                We recommend
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${results.recommended.color}15` }}
                >
                  {results.recommended.id === 'operator' ? '🎧' : results.recommended.id === 'manager' ? '📊' : '👔'}
                </div>
                <div>
                  <div className="text-white font-extrabold">{results.recommended.name}</div>
                  <div className="font-mono text-sm" style={{ color: results.recommended.color }}>
                    ${results.recommended.price}/mo
                  </div>
                </div>
              </div>
            </div>

            {/* Annual savings */}
            <div className="bg-accent-2/5 border border-accent-2/25 rounded-2xl p-6 text-center">
              <div className="text-accent-2 text-xs font-mono uppercase tracking-wider mb-2">Annual savings</div>
              <div className="text-accent-2 font-mono text-3xl md:text-4xl font-extrabold">
                <AnimatedCounter target={Math.max(results.annualSavings, 0)} prefix="$" suffix="/yr" />
              </div>
              <p className="text-dim text-xs mt-2">That&apos;s back in your pocket every year.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* AGENT GRID: Which agents in which tier                              */
/* ------------------------------------------------------------------ */
function AgentGrid() {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  return (
    <section className="py-section px-6 bg-bg-2">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            FEATURE MATRIX
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            What&apos;s in each tier?
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header row */}
            <div className="grid grid-cols-[200px_repeat(3,1fr)] gap-2 mb-3">
              <div />
              {employees.map((emp) => (
                <div key={emp.id} className="text-center">
                  <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: emp.color }}>
                    {emp.name}
                  </div>
                  <div className="text-dim text-[10px]">${emp.price}/mo</div>
                </div>
              ))}
            </div>

            {/* Agent rows */}
            {agents.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-[200px_repeat(3,1fr)] gap-2 mb-2"
              >
                {/* Agent name */}
                <div className="flex items-center gap-2 px-3 py-3 bg-bg-card border border-border rounded-xl">
                  <span className="text-sm">{agent.icon}</span>
                  <span className="text-white text-xs font-medium">{agent.name}</span>
                </div>

                {/* Tier cells */}
                {employees.map((emp) => {
                  const included = emp.agentIds.includes(agent.id);
                  const cellKey = `${emp.id}-${agent.id}`;
                  const isHovered = hoveredCell === cellKey;

                  return (
                    <div
                      key={emp.id}
                      className="relative flex items-center justify-center px-3 py-3 rounded-xl border transition-all cursor-default"
                      style={{
                        background: included ? `${emp.color}08` : 'transparent',
                        borderColor: included ? `${emp.color}20` : 'rgba(255,255,255,0.05)',
                      }}
                      onMouseEnter={() => included && setHoveredCell(cellKey)}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      {included ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 + employees.indexOf(emp) * 0.1 }}
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: `${emp.color}25` }}
                        >
                          <svg className="w-3.5 h-3.5" style={{ color: emp.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-white/5 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-white/10" />
                        </div>
                      )}

                      {/* Tooltip */}
                      {isHovered && included && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-bg-card border border-border rounded-xl px-4 py-3 z-20 min-w-[180px] shadow-xl"
                        >
                          <div className="text-white text-xs font-bold mb-1">{agent.name}</div>
                          <div className="text-dim text-[10px] mb-2">{agent.desc}</div>
                          <Link href={agent.href} className="text-accent text-[10px] font-medium hover:underline">
                            Learn more →
                          </Link>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2.5 h-2.5 bg-bg-card border-r border-b border-border" />
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ: With employee personalities                                    */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    q: 'What exactly is an AI Employee?',
    a: 'An AI Employee is an autonomous digital worker with a name, job title, personality, memory, and daily schedule. Unlike chatbots, AI Employees don\'t wait for instructions — they proactively handle tasks, learn from interactions, and coordinate multiple AI agents as tools.',
    employee: 'executive',
  },
  {
    q: 'How fast can I get set up?',
    a: 'Most businesses are fully up and running within 48 hours. We handle all configuration, integration, and training as part of your onboarding. Enterprise setups may take 1-2 weeks.',
    employee: 'operator',
  },
  {
    q: 'Can I switch tiers later?',
    a: 'Absolutely. Upgrade or downgrade at any time. When you upgrade, all your existing data, conversations, and workflows carry over seamlessly. Changes take effect immediately.',
    employee: 'manager',
  },
  {
    q: 'Is there a setup fee?',
    a: 'No setup fees, no hidden charges. The price you see is the price you pay. We handle all the configuration as part of onboarding.',
    employee: 'operator',
  },
  {
    q: 'What happens if I exceed limits?',
    a: 'We\'ll alert you before you hit any limits. If volume spikes, we recommend upgrading to the next tier. We never cut off your service unexpectedly.',
    employee: 'manager',
  },
  {
    q: 'Do you offer a trial?',
    a: 'We offer a 14-day pilot where you can test any AI Employee with your real business data before committing. No credit card required to start.',
    employee: 'executive',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes — no lock-in contracts. Cancel anytime and your service runs until the end of your billing period. We\'ll even help you export your data.',
    employee: 'operator',
  },
];

function PricingFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-section px-6 bg-bg">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Questions? We&apos;ve got answers.
          </h2>
          <p className="text-dim">Each answer comes from one of your future AI Employees.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const emp = employees.find((e) => e.id === faq.employee)!;
            const isOpen = openIdx === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-white text-sm font-medium pr-4">{faq.q}</span>
                  <svg
                    className={`w-4 h-4 text-dim shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <div className="flex items-start gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 mt-0.5"
                            style={{ background: `${emp.color}15`, border: `1px solid ${emp.color}25` }}
                          >
                            {emp.id === 'operator' ? '🎧' : emp.id === 'manager' ? '📊' : '👔'}
                          </div>
                          <div>
                            <div className="text-[10px] font-mono uppercase tracking-wider mb-1.5" style={{ color: emp.color }}>
                              {emp.name} says
                            </div>
                            <p className="text-dim text-sm leading-relaxed">{faq.a}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* BOTTOM CTA                                                          */
/* ------------------------------------------------------------------ */
function PricingCTA() {
  return (
    <section className="relative py-section px-6 bg-bg-2 overflow-hidden">
      <ParticleNetwork particleCount={60} />
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Ready to hire your AI team?
        </h2>
        <p className="text-dim text-lg mb-10 max-w-lg mx-auto">
          Book a free strategy call. We&apos;ll recommend the perfect tier for your business.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <MagneticButton href="/contact" className="bg-accent text-bg font-medium px-8 py-3 rounded-pill text-sm">
            Book a Strategy Call
          </MagneticButton>
          <MagneticButton href="/ai-employees" className="bg-white/5 text-white border border-border font-medium px-8 py-3 rounded-pill text-sm hover:bg-white/10">
            Meet the Employees
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ORCHESTRATOR                                                        */
/* ------------------------------------------------------------------ */
export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <TierStack />
      <ROICalculator />
      <AgentGrid />
      <PricingFAQ />
      <PricingCTA />
    </>
  );
}
