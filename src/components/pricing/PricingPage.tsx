'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import MagneticButton from '@/components/shared/MagneticButton';

/* ------------------------------------------------------------------ */
/* TYPES & DATA                                                        */
/* ------------------------------------------------------------------ */

interface PlanTier {
  id: string;
  name: string;
  title: string;
  price: number;
  setup: number;
  color: string;
  popular?: boolean;
  description: string;
  buildLine: string;
}

const plans: PlanTier[] = [
  {
    id: 'operator',
    name: 'The Operator',
    title: 'Operator',
    price: 297,
    setup: 497,
    color: '#7DF9C0',
    description:
      'Your 24/7 front desk. The Operator handles every message, books every appointment, remembers every customer, and sends you a morning briefing before you wake up. It never sleeps, never forgets, and never lets a lead slip.',
    buildLine: 'We configure your channels, train your AI personality, and go live in 7 days.',
  },
  {
    id: 'manager',
    name: 'The Manager',
    title: 'Manager',
    price: 597,
    setup: 997,
    color: '#7C3AED',
    popular: true,
    description:
      'Everything The Operator does, plus active business growth. The Manager follows up every lead, monitors your reputation, writes your content, chases unpaid invoices, and sends you a weekly report every Monday morning.',
    buildLine: 'We map your business workflows, connect your tools, and activate growth agents.',
  },
  {
    id: 'executive',
    name: 'The Executive',
    title: 'Executive',
    price: 1197,
    setup: 1997,
    color: '#C8F135',
    description:
      'The full operation. The Executive browses competitor websites, answers phone calls, manages your team, places supply orders, and writes its own new skills every month. By month six, it will be doing things nobody configured.',
    buildLine: 'We build a multi-agent system tailored to your entire operation.',
  },
];

/* ------------------------------------------------------------------ */
/* COMPARISON TABLE DATA                                               */
/* ------------------------------------------------------------------ */

interface ComparisonRow {
  feature: string;
  operator: boolean;
  manager: boolean;
  executive: boolean;
}

interface ComparisonCategory {
  category: string;
  rows: ComparisonRow[];
}

const comparisonData: ComparisonCategory[] = [
  {
    category: 'Communication & Channels',
    rows: [
      { feature: 'WhatsApp 24/7', operator: true, manager: true, executive: true },
      { feature: 'All messaging channels (Telegram, IG, FB, iMessage)', operator: true, manager: true, executive: true },
      { feature: 'One brain across all channels', operator: true, manager: true, executive: true },
      { feature: 'Voice note understanding and response', operator: true, manager: true, executive: true },
      { feature: 'Answers actual phone calls', operator: false, manager: false, executive: true },
      { feature: 'Call transcripts sent to owner', operator: false, manager: false, executive: true },
      { feature: 'Brand voice learning over time', operator: true, manager: true, executive: true },
    ],
  },
  {
    category: 'Memory & Intelligence',
    rows: [
      { feature: 'Permanent customer memory', operator: true, manager: true, executive: true },
      { feature: 'Returning vs new customer detection', operator: true, manager: true, executive: true },
      { feature: 'VIP customer detection', operator: true, manager: true, executive: true },
      { feature: 'Emotional tone detection', operator: true, manager: true, executive: true },
      { feature: 'Gets smarter every month', operator: true, manager: true, executive: true },
    ],
  },
  {
    category: 'Proactive & Heartbeat',
    rows: [
      { feature: 'Daily morning briefing', operator: true, manager: true, executive: true },
      { feature: 'End of day summary', operator: true, manager: true, executive: true },
      { feature: 'Immediate urgent alerts', operator: true, manager: true, executive: true },
      { feature: 'Slow day detection + auto broadcast', operator: false, manager: true, executive: true },
      { feature: 'Overnight autonomous work', operator: false, manager: false, executive: true },
    ],
  },
  {
    category: 'Bookings & Scheduling',
    rows: [
      { feature: 'Appointment booking', operator: true, manager: true, executive: true },
      { feature: 'Confirmations and reminders', operator: true, manager: true, executive: true },
      { feature: 'Reschedule and cancellation handling', operator: true, manager: true, executive: true },
      { feature: 'Cancelled slot filling', operator: true, manager: true, executive: true },
      { feature: 'Multi-team calendar coordination', operator: false, manager: false, executive: true },
    ],
  },
  {
    category: 'Lead Management',
    rows: [
      { feature: 'Lead capture from all channels', operator: true, manager: true, executive: true },
      { feature: 'Lead pre-qualification', operator: true, manager: true, executive: true },
      { feature: 'Lead scoring', operator: true, manager: true, executive: true },
      { feature: 'Day 1/3/7 follow-up sequences', operator: false, manager: true, executive: true },
      { feature: 'Lead research before calls', operator: false, manager: true, executive: true },
      { feature: 'Full funnel tracking', operator: false, manager: true, executive: true },
      { feature: 'Cold lead re-engagement', operator: false, manager: true, executive: true },
    ],
  },
  {
    category: 'Browser & Web Autonomy',
    rows: [
      { feature: 'Web browsing and research', operator: false, manager: true, executive: true },
      { feature: 'Competitor website monitoring daily', operator: false, manager: false, executive: true },
      { feature: 'Competitor review monitoring', operator: false, manager: false, executive: true },
      { feature: 'Supplier price comparison', operator: false, manager: false, executive: true },
      { feature: 'Autonomous purchasing (no API needed)', operator: false, manager: false, executive: true },
      { feature: 'Webpage change monitoring', operator: false, manager: false, executive: true },
      { feature: 'Autonomous negotiation', operator: false, manager: false, executive: true },
    ],
  },
  {
    category: 'Revenue & Finance',
    rows: [
      { feature: 'Invoice chasing (7/14/30 days)', operator: false, manager: true, executive: true },
      { feature: 'Lapsed customer win-back', operator: false, manager: true, executive: true },
      { feature: 'Abandoned lead recovery', operator: false, manager: true, executive: true },
      { feature: 'Expense tracking and receipts', operator: false, manager: false, executive: true },
      { feature: 'Autonomous supply purchasing', operator: false, manager: false, executive: true },
    ],
  },
  {
    category: 'Reputation Management',
    rows: [
      { feature: 'Daily review monitoring', operator: false, manager: true, executive: true },
      { feature: 'Responds to reviews within the hour', operator: false, manager: true, executive: true },
      { feature: 'Negative review flagging', operator: false, manager: true, executive: true },
      { feature: 'Automated review requests after jobs', operator: false, manager: true, executive: true },
      { feature: 'Weekly reputation score report', operator: false, manager: true, executive: true },
    ],
  },
  {
    category: 'Content & Marketing',
    rows: [
      { feature: 'Weekly social media posts', operator: false, manager: true, executive: true },
      { feature: 'Industry trend research for content', operator: false, manager: true, executive: true },
      { feature: 'Email newsletters', operator: false, manager: true, executive: true },
      { feature: 'WhatsApp broadcast writing', operator: false, manager: true, executive: true },
      { feature: 'Blog posts', operator: false, manager: false, executive: true },
      { feature: 'Video scripts (Reels, TikTok, YouTube)', operator: false, manager: false, executive: true },
      { feature: 'Ad copy variations', operator: false, manager: false, executive: true },
      { feature: 'Monthly content audit', operator: false, manager: true, executive: true },
    ],
  },
  {
    category: 'Reporting & Analytics',
    rows: [
      { feature: 'Weekly Monday report', operator: false, manager: true, executive: true },
      { feature: 'Monthly business health report', operator: false, manager: true, executive: true },
      { feature: 'Ask AI any business question', operator: true, manager: true, executive: true },
      { feature: 'Competitor intelligence report', operator: false, manager: false, executive: true },
      { feature: 'Monthly "AI Got Smarter" report', operator: false, manager: false, executive: true },
      { feature: 'Quarterly full business audit', operator: false, manager: false, executive: true },
    ],
  },
  {
    category: 'Team Management',
    rows: [
      { feature: 'Team can message AI directly', operator: false, manager: false, executive: true },
      { feature: 'Team chat monitoring', operator: false, manager: false, executive: true },
      { feature: 'Task delegation and tracking', operator: false, manager: false, executive: true },
      { feature: 'Owner voice notes \u2192 AI executes', operator: false, manager: false, executive: true },
    ],
  },
  {
    category: 'Workflow & Automation',
    rows: [
      { feature: 'Tool integrations and data sync', operator: false, manager: true, executive: true },
      { feature: 'Email classification and response', operator: false, manager: true, executive: true },
      { feature: 'Meeting transcripts \u2192 action items', operator: false, manager: false, executive: true },
      { feature: 'Full business workflow automation', operator: false, manager: false, executive: true },
    ],
  },
  {
    category: 'Multi-Agent & Self-Expansion',
    rows: [
      { feature: 'Multi-agent team coordination', operator: false, manager: false, executive: true },
      { feature: 'Installs new skills automatically', operator: false, manager: false, executive: true },
      { feature: 'Writes its own new skills', operator: false, manager: false, executive: true },
      { feature: 'Overnight autonomous operation', operator: false, manager: false, executive: true },
      { feature: 'Monthly new capabilities report', operator: false, manager: false, executive: true },
    ],
  },
  {
    category: 'Voice & Mobile',
    rows: [
      { feature: 'Voice note commands', operator: true, manager: true, executive: true },
      { feature: 'Wake word activation', operator: false, manager: false, executive: true },
      { feature: 'Full mobile-first control', operator: false, manager: false, executive: true },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* AGENT DATA                                                          */
/* ------------------------------------------------------------------ */

interface AgentCard {
  name: string;
  description: string;
  includedIn: string;
}

const agentCards: AgentCard[] = [
  { name: 'WhatsApp Agent', description: '24/7 customer conversations', includedIn: 'Operator+' },
  { name: 'AI Receptionist', description: 'Answers every inquiry and books appointments', includedIn: 'Operator+' },
  { name: 'Lead Capture', description: 'Catches, scores, and follows up every lead', includedIn: 'Operator+' },
  { name: 'Content Engine', description: 'Writes and schedules all your content', includedIn: 'Manager+' },
  { name: 'Social Media AI', description: 'Manages all social posting and engagement', includedIn: 'Manager+' },
  { name: 'Workflow Automation', description: 'Connects tools, eliminates manual work', includedIn: 'Manager+' },
  { name: 'Multi-Channel Bot', description: 'One AI across every platform', includedIn: 'Executive+' },
  { name: 'Competitive Intelligence', description: 'Monitors competitors daily', includedIn: 'Executive+' },
];

/* ------------------------------------------------------------------ */
/* ONE-TIME PROJECTS DATA                                              */
/* ------------------------------------------------------------------ */

interface ProjectRow {
  name: string;
  price: string;
}

const projects: ProjectRow[] = [
  { name: 'AI Business Audit', price: '$497 (credited to setup fee)' },
  { name: 'Custom Website Design', price: 'Request Quote' },
  { name: 'E-commerce Store', price: 'Request Quote' },
  { name: 'SEO Setup & Strategy', price: 'Request Quote' },
];

/* ------------------------------------------------------------------ */
/* FAQ DATA                                                            */
/* ------------------------------------------------------------------ */

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: 'What\u2019s included in the setup fee?',
    a: 'Full configuration of your AI Employee, personality writing, channel connection, testing 20+ real scenarios, and a go-live walkthrough. We don\u2019t hand you software \u2014 we hand you a running employee.',
  },
  {
    q: 'When do I get charged?',
    a: 'Setup fee on day one. Monthly subscription starts after your AI goes live.',
  },
  {
    q: 'Can I upgrade my plan later?',
    a: 'Yes. Upgrade anytime \u2014 difference billed pro-rata.',
  },
  {
    q: 'Are API costs included?',
    a: 'Yes. Your monthly fee covers everything. No surprise bills.',
  },
  {
    q: 'Is there a contract?',
    a: 'Month to month. Cancel anytime.',
  },
  {
    q: 'What if I just want one agent?',
    a: 'Any standalone agent is $197/mo + $297 setup. Though most clients find The Operator ($297/mo) is better value since it includes 3 agents working together.',
  },
  {
    q: 'How long does setup take?',
    a: '7 days from your deposit.',
  },
  {
    q: 'What if the AI makes a mistake?',
    a: 'We monitor everything. Most businesses see 95%+ accuracy by end of week 2. We fix anything that needs tuning at no extra cost.',
  },
];

/* ------------------------------------------------------------------ */
/* ANIMATION HELPERS                                                   */
/* ------------------------------------------------------------------ */

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

function SectionWrapper({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* CHECK / CROSS ICONS                                                 */
/* ------------------------------------------------------------------ */

function CheckIcon({ color }: { color: string }) {
  return (
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
      style={{ background: `${color}20` }}
    >
      <svg
        className="w-3.5 h-3.5"
        style={{ color }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

function CrossIcon() {
  return (
    <div className="w-6 h-6 rounded-full border border-white/5 flex items-center justify-center shrink-0">
      <div className="w-2 h-[1.5px] bg-white/15 rounded-full" />
    </div>
  );
}

/* ================================================================== */
/* SECTION 1: AI EMPLOYEES                                             */
/* ================================================================== */

function AIEmployeesSection() {
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  const INITIAL_ROWS = 5;

  // Flatten all rows for slicing
  const allRows: { category: string; row: ComparisonRow; isFirst: boolean }[] = [];
  comparisonData.forEach((cat) => {
    cat.rows.forEach((row, idx) => {
      allRows.push({ category: cat.category, row, isFirst: idx === 0 });
    });
  });

  const visibleRows = expanded ? allRows : allRows.slice(0, INITIAL_ROWS);

  return (
    <section ref={sectionRef} className="py-section px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-4 block">
            AI Employees
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            Hire Your AI Employee
          </h2>
          <p className="text-dim text-lg md:text-xl max-w-xl mx-auto">
            Three roles. One AI. Built around your business.
          </p>
        </motion.div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-bg-card border rounded-2xl p-8 flex flex-col"
              style={{
                borderColor: `${plan.color}25`,
                boxShadow: `0 0 60px ${plan.color}06`,
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                  style={{ background: plan.color, color: '#0F0A1E' }}
                >
                  Most Popular
                </div>
              )}

              {/* Title */}
              <div className="mb-6">
                <h3
                  className="text-xl font-extrabold mb-1"
                  style={{ color: plan.color }}
                >
                  {plan.name}
                </h3>
              </div>

              {/* Price */}
              <div className="mb-2">
                <span
                  className="text-4xl md:text-5xl font-extrabold"
                  style={{ color: plan.color }}
                >
                  ${plan.price.toLocaleString()}
                </span>
                <span className="text-dim text-sm">/mo</span>
              </div>
              <p className="text-dim text-xs mb-6">
                + ${plan.setup.toLocaleString()} one-time setup
              </p>

              {/* Description */}
              <p className="text-dim text-sm leading-relaxed mb-6 flex-1">
                {plan.description}
              </p>

              {/* Build line */}
              <div className="border-t border-border pt-4 mb-6">
                <p className="text-xs font-mono uppercase tracking-wider text-dim mb-1">
                  What we build with you
                </p>
                <p className="text-white text-sm">{plan.buildLine}</p>
              </div>

              {/* CTA */}
              <MagneticButton
                href="/contact"
                className="w-full py-3 rounded-pill text-sm font-bold text-center block"
                style={{
                  background: plan.color,
                  color: '#0F0A1E',
                }}
              >
                Hire {plan.name}
              </MagneticButton>
            </motion.div>
          ))}
        </div>

        {/* Expandable Comparison Chart */}
        <SectionWrapper>
          <div className="mb-8 text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              Full Comparison
            </h3>
            <p className="text-dim text-sm">
              See exactly what each tier includes.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_100px_100px_100px] md:grid-cols-[1fr_140px_140px_140px] gap-2 mb-4 sticky top-0 z-10 bg-bg pt-2 pb-2">
                <div className="text-dim text-xs font-mono uppercase tracking-wider pl-4">
                  Feature
                </div>
                {plans.map((plan) => (
                  <div key={plan.id} className="text-center">
                    <div
                      className="text-xs font-mono uppercase tracking-wider font-bold"
                      style={{ color: plan.color }}
                    >
                      {plan.title}
                    </div>
                    <div className="text-dim text-[10px]">
                      ${plan.price}/mo
                    </div>
                  </div>
                ))}
              </div>

              {/* Table body */}
              <AnimatePresence initial={false}>
                <motion.div
                  animate={{ height: 'auto' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {(() => {
                    let lastCategory = '';
                    return visibleRows.map((item, idx) => {
                      const showCategoryHeader =
                        item.category !== lastCategory;
                      lastCategory = item.category;

                      return (
                        <div key={`${item.category}-${item.row.feature}`}>
                          {/* Category header */}
                          {showCategoryHeader && (
                            <div className="grid grid-cols-[1fr_100px_100px_100px] md:grid-cols-[1fr_140px_140px_140px] gap-2 mt-4 mb-2">
                              <div className="text-white text-xs font-bold uppercase tracking-wider pl-4 py-2 border-b border-border">
                                {item.category}
                              </div>
                              <div className="border-b border-border" />
                              <div className="border-b border-border" />
                              <div className="border-b border-border" />
                            </div>
                          )}

                          {/* Row */}
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: idx < INITIAL_ROWS ? idx * 0.03 : (idx - INITIAL_ROWS) * 0.01,
                              duration: 0.3,
                            }}
                            className="grid grid-cols-[1fr_100px_100px_100px] md:grid-cols-[1fr_140px_140px_140px] gap-2 mb-1"
                          >
                            <div className="text-dim text-sm pl-4 py-2.5 bg-bg-card/40 rounded-l-lg">
                              {item.row.feature}
                            </div>
                            <div className="flex items-center justify-center py-2.5 bg-bg-card/40">
                              {item.row.operator ? (
                                <CheckIcon color="#7DF9C0" />
                              ) : (
                                <CrossIcon />
                              )}
                            </div>
                            <div className="flex items-center justify-center py-2.5 bg-bg-card/40">
                              {item.row.manager ? (
                                <CheckIcon color="#7C3AED" />
                              ) : (
                                <CrossIcon />
                              )}
                            </div>
                            <div className="flex items-center justify-center py-2.5 bg-bg-card/40 rounded-r-lg">
                              {item.row.executive ? (
                                <CheckIcon color="#C8F135" />
                              ) : (
                                <CrossIcon />
                              )}
                            </div>
                          </motion.div>
                        </div>
                      );
                    });
                  })()}
                </motion.div>
              </AnimatePresence>

              {/* Expand / Collapse button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 px-6 py-3 rounded-pill border border-border text-white text-sm font-medium hover:bg-white/[0.03] transition-colors"
                >
                  {expanded ? (
                    <>
                      Collapse{' '}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      See Full Comparison{' '}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}

/* ================================================================== */
/* SECTION 2: AI AGENTS                                                */
/* ================================================================== */

function AIAgentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  function getIncludedColor(includedIn: string): string {
    if (includedIn.startsWith('Operator')) return '#7DF9C0';
    if (includedIn.startsWith('Manager')) return '#7C3AED';
    return '#C8F135';
  }

  return (
    <section ref={sectionRef} className="py-section px-6 bg-bg-2">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-4 block">
            AI Agents
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Just need one specific thing?
          </h2>
          <p className="text-dim text-lg max-w-2xl mx-auto">
            Any standalone agent, configured for your business. Or add one to your existing Employee plan.
          </p>
        </motion.div>

        {/* Pricing states */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
        >
          <div className="bg-bg-card border border-border rounded-xl px-5 py-3 text-center">
            <div className="text-white text-sm font-bold">Standalone</div>
            <div className="text-dim text-xs font-mono">$197/mo + $297 setup</div>
          </div>
          <div className="bg-bg-card border border-border rounded-xl px-5 py-3 text-center">
            <div className="text-white text-sm font-bold">Add-on</div>
            <div className="text-dim text-xs font-mono">$97/mo</div>
          </div>
          <div className="bg-bg-card border border-accent-2/25 rounded-xl px-5 py-3 text-center">
            <div className="text-accent-2 text-sm font-bold">Included</div>
            <div className="text-dim text-xs font-mono">$0</div>
          </div>
        </motion.div>

        {/* Agent grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {agentCards.map((agent, i) => {
            const color = getIncludedColor(agent.includedIn);
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  delay: 0.3 + i * 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-bg-card border border-border rounded-xl p-5 hover:border-white/15 transition-all group"
              >
                <h4 className="text-white text-sm font-bold mb-1 group-hover:text-accent transition-colors">
                  {agent.name}
                </h4>
                <p className="text-dim text-xs mb-4 leading-relaxed">
                  {agent.description}
                </p>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: color }}
                  />
                  <span
                    className="text-[11px] font-mono font-medium"
                    style={{ color }}
                  >
                    Included: {agent.includedIn}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Audit CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-bg-card border border-accent/20 rounded-2xl p-8 md:p-10 text-center max-w-3xl mx-auto"
          style={{ boxShadow: '0 0 60px rgba(124, 58, 237, 0.06)' }}
        >
          <p className="text-dim text-sm md:text-base leading-relaxed mb-6">
            Not sure which agents you need? Start with an{' '}
            <span className="text-white font-bold">AI Business Audit</span> — we
            map your workflow and tell you exactly what to activate.{' '}
            <span className="text-accent font-bold font-mono">$497</span>,
            credited to your setup fee.
          </p>
          <MagneticButton
            href="/contact"
            className="bg-accent text-bg font-bold px-8 py-3 rounded-pill text-sm"
          >
            Book an AI Audit
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* SECTION 3: ONE-TIME PROJECTS                                        */
/* ================================================================== */

function OneTimeProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section ref={sectionRef} className="py-section px-6 bg-bg">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-4 block">
            Projects
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            One-time projects
          </h2>
        </motion.div>

        {/* Table */}
        <div className="border border-border rounded-2xl overflow-hidden">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
              className={`flex items-center justify-between px-6 py-5 ${
                i !== projects.length - 1 ? 'border-b border-border' : ''
              } hover:bg-white/[0.02] transition-colors`}
            >
              <span className="text-white text-sm font-medium">
                {project.name}
              </span>
              {project.price === 'Request Quote' ? (
                <Link
                  href="/contact"
                  className="text-accent font-mono text-sm font-bold shrink-0 ml-4 hover:text-accent/80 transition-colors"
                >
                  Request Quote &rarr;
                </Link>
              ) : (
                <span className="text-accent font-mono text-sm font-bold shrink-0 ml-4">
                  {project.price}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* SECTION 4: FAQ                                                      */
/* ================================================================== */

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section ref={sectionRef} className="py-section px-6 bg-bg-2">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-4 block">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Questions? We&apos;ve got answers.
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-white text-sm font-medium pr-4">
                    {faq.q}
                  </span>
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4 text-dim shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="text-dim text-sm leading-relaxed">
                          {faq.a}
                        </p>
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

/* ================================================================== */
/* ORCHESTRATOR                                                        */
/* ================================================================== */

export default function PricingPage() {
  return (
    <>
      <AIEmployeesSection />
      <AIAgentsSection />
      <OneTimeProjectsSection />
      <FAQSection />
    </>
  );
}
