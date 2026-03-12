'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ParticleNetwork from '@/components/shared/ParticleNetwork';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import MagneticButton from '@/components/shared/MagneticButton';

/* ------------------------------------------------------------------ */
/* HERO: Word-by-word reveal with particle background                  */
/* ------------------------------------------------------------------ */
function AboutHero() {
  const words = ['We', 'build', 'AI', 'employees', 'that', 'run', 'your', 'business.'];

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 pt-28 pb-20 overflow-hidden">
      <ParticleNetwork particleCount={120} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-sm tracking-widest uppercase text-accent mb-6 block"
        >
          ABOUT PRUVE
        </motion.span>

        {/* Word-by-word animation */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className={`inline-block mr-3 md:mr-4 ${
                word === 'AI' || word === 'employees' ? 'text-accent' : 'text-white'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-dim text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Pruve is an AI automation agency. We build, deploy, and manage autonomous AI workers for small-to-medium businesses.
        </motion.p>

        {/* Hero stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="inline-flex items-center gap-3 bg-bg-card border border-border rounded-full px-6 py-3"
        >
          <span className="text-accent font-mono font-extrabold text-2xl">
            <AnimatedCounter target={10847} />
          </span>
          <span className="text-dim text-sm">conversations handled and counting</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* LIVE METRICS DASHBOARD: 4 animated metric cards                     */
/* ------------------------------------------------------------------ */
function LiveMetrics() {
  const [tickingConvos, setTickingConvos] = useState(10847);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickingConvos((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { value: tickingConvos, label: 'Conversations Handled', color: '#7C3AED', suffix: '' },
    { value: 2.3, label: 'Avg Response Time', color: '#7DF9C0', suffix: 's', isDecimal: true },
    { value: 97, label: 'Client Satisfaction', color: '#C8F135', suffix: '%' },
    { value: 50, label: 'Businesses Automated', color: '#F59E0B', suffix: '+' },
  ];

  return (
    <section className="py-section px-6 bg-bg-2">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            LIVE METRICS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            The numbers speak.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-bg-card border border-border rounded-2xl p-6 text-center group hover:shadow-lg transition-shadow"
              style={{ boxShadow: `0 0 0 0 ${metric.color}00` }}
            >
              {/* Sparkline mini viz */}
              <div className="flex items-end justify-center gap-0.5 h-8 mb-3">
                {Array.from({ length: 12 }).map((_, j) => (
                  <motion.div
                    key={j}
                    className="w-1.5 rounded-full"
                    style={{ background: `${metric.color}40` }}
                    initial={{ height: 4 }}
                    whileInView={{ height: 4 + Math.random() * 24 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.03, duration: 0.5 }}
                  />
                ))}
              </div>

              <div className="font-mono text-2xl md:text-3xl font-extrabold mb-1" style={{ color: metric.color }}>
                {metric.isDecimal ? (
                  <>{metric.value}{metric.suffix}</>
                ) : (
                  <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                )}
              </div>
              <div className="text-dim text-xs">{metric.label}</div>

              {/* Live indicator for conversations */}
              {i === 0 && (
                <div className="flex items-center justify-center gap-1 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-2 animate-pulse" />
                  <span className="text-accent-2 text-[9px] font-mono">Live</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* WHY AI EMPLOYEES: Problem → Solution scroll narrative               */
/* ------------------------------------------------------------------ */
function WhyAIEmployees() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.7], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.3], [40, 0]);

  return (
    <section ref={sectionRef} className="py-section px-6 bg-bg">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            THE PROBLEM
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Small businesses lose
            <br />
            <span className="text-[#FF4545]">$14,800/month</span> on average.
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            Missed calls. Unanswered messages. Forgotten follow-ups. It all adds up to lost revenue that your competitors are capturing.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {[
            { icon: '📞', stat: '62%', label: 'of calls go unanswered', color: '#FF4545' },
            { icon: '💬', stat: '4.2h', label: 'average response time', color: '#F59E0B' },
            { icon: '🧲', stat: '78%', label: 'of leads never followed up', color: '#FF4545' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-bg-card border border-border rounded-2xl p-6 text-center"
            >
              <span className="text-3xl mb-3 block">{item.icon}</span>
              <div className="text-2xl font-extrabold mb-1" style={{ color: item.color }}>{item.stat}</div>
              <div className="text-dim text-sm">{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Solution */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent-2 mb-3 block">
            THE SOLUTION
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            What if you could hire a team
            <br />
            <span className="text-accent">that never sleeps?</span>
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            AI Employees with a name, a job title, memory, and a daily schedule. They answer calls in 2 seconds, reply to messages instantly, and never forget a follow-up.
          </p>
        </motion.div>

        {/* Solution employees */}
        <div className="flex justify-center gap-6 flex-wrap">
          {[
            { name: 'The Operator', emoji: '🎧', color: '#7DF9C0', desc: 'Your Front Desk' },
            { name: 'The Manager', emoji: '📊', color: '#7C3AED', desc: 'Your Operations Manager' },
            { name: 'The Executive', emoji: '👔', color: '#C8F135', desc: 'Your COO' },
          ].map((emp, i) => (
            <motion.div
              key={emp.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-center"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 border"
                style={{ background: `${emp.color}10`, borderColor: `${emp.color}30`, boxShadow: `0 0 30px ${emp.color}12` }}
              >
                {emp.emoji}
              </div>
              <div className="text-white font-extrabold text-sm">{emp.name}</div>
              <div className="text-dim text-xs">{emp.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* TIMELINE: Our Journey                                               */
/* ------------------------------------------------------------------ */
const timelineItems = [
  { year: '2024 Q1', title: 'Founded', desc: 'Started with a simple idea: every business deserves an AI workforce.', icon: '🚀' },
  { year: '2024 Q3', title: 'First 50 Clients', desc: 'Deployed AI agents for restaurants, clinics, and real estate firms.', icon: '🏪' },
  { year: '2025 Q1', title: 'Platform Launch', desc: 'Launched our full AI Employee platform with 8 specialized agents.', icon: '⚡' },
  { year: '2025 Q2', title: '10K+ Conversations', desc: 'Our AI agents handle over 10,000 customer conversations per month.', icon: '💬' },
  { year: 'Next', title: 'What\'s Next', desc: 'Expanding to new industries. Building smarter, more autonomous AI.', icon: '🔮' },
];

function Timeline() {
  return (
    <section className="py-section px-6 bg-bg-2">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            OUR JOURNEY
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            From idea to impact.
          </h2>
        </motion.div>

        {/* Horizontal timeline */}
        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-6 left-0 right-0 h-px bg-border" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {timelineItems.map((item, i) => {
              const isLast = i === timelineItems.length - 1;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Node */}
                  <div className="flex justify-center mb-6">
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border z-10 ${
                        isLast ? 'animate-pulse' : ''
                      }`}
                      style={{
                        background: isLast ? 'rgba(124,58,237,0.15)' : 'var(--color-bg-card)',
                        borderColor: isLast ? 'rgba(124,58,237,0.4)' : 'var(--color-border)',
                        boxShadow: isLast ? '0 0 30px rgba(124,58,237,0.2)' : 'none',
                      }}
                      whileInView={{ scale: [0.8, 1.1, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <div className="text-accent text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                      {item.year}
                    </div>
                    <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-dim text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* VALUE CARDS: Animated micro-interactions                             */
/* ------------------------------------------------------------------ */
function ValueCards() {
  return (
    <section className="py-section px-6 bg-bg">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            OUR VALUES
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            What drives us.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Speed Over Perfection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-bg-card border border-border rounded-2xl p-8 group"
          >
            <h3 className="text-xl font-extrabold text-white mb-4">⚡ Speed Over Perfection</h3>
            <p className="text-dim text-sm leading-relaxed mb-6">
              We ship fast, iterate faster. Your AI agents are live in days, not months.
            </p>
            {/* Mini animation: race bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-dim mb-1">
                  <span>Human Setup</span>
                  <span>3 weeks</span>
                </div>
                <div className="h-2 bg-bg rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white/20 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: 'linear' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-accent-2">AI Setup</span>
                  <span className="text-accent-2">48 hours</span>
                </div>
                <div className="h-2 bg-bg rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: 'linear' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI-First Thinking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-bg-card border border-border rounded-2xl p-8"
          >
            <h3 className="text-xl font-extrabold text-white mb-4">🤖 AI-First Thinking</h3>
            <p className="text-dim text-sm leading-relaxed mb-6">
              Every solution starts with &ldquo;can AI do this?&rdquo; — because usually, it can.
            </p>
            {/* Decision tree */}
            <div className="space-y-2">
              <div className="bg-bg rounded-lg px-4 py-2 text-sm text-white inline-block">
                Can AI do this? 🤔
              </div>
              <div className="flex items-center gap-3 pl-6">
                <div className="w-px h-6 bg-accent" />
              </div>
              <div className="pl-6 flex items-center gap-3">
                <div className="bg-accent/15 border border-accent/30 rounded-lg px-4 py-2 text-sm text-accent inline-block">
                  Yes → Ship it. ✅
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results, Not Reports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-bg-card border border-border rounded-2xl p-8"
          >
            <h3 className="text-xl font-extrabold text-white mb-4">📊 Results, Not Reports</h3>
            <p className="text-dim text-sm leading-relaxed mb-6">
              We measure success by revenue gained and hours saved, not slide decks.
            </p>
            {/* Dashboard mini */}
            <div className="bg-bg rounded-xl p-4">
              <div className="text-[10px] text-dim font-mono uppercase tracking-wider mb-3">THIS MONTH</div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-accent-2 font-mono text-lg font-extrabold">$23K</div>
                  <div className="text-dim text-[9px]">Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-accent font-mono text-lg font-extrabold">347</div>
                  <div className="text-dim text-[9px]">Leads</div>
                </div>
                <div className="text-center">
                  <div className="text-accent-3 font-mono text-lg font-extrabold">98%</div>
                  <div className="text-dim text-[9px]">Replied</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Partnership, Not Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-bg-card border border-border rounded-2xl p-8"
          >
            <h3 className="text-xl font-extrabold text-white mb-4">🤝 Partnership, Not Projects</h3>
            <p className="text-dim text-sm leading-relaxed mb-6">
              We grow with your business. Your AI team evolves as you scale.
            </p>
            {/* Timeline mini */}
            <div className="flex items-center gap-2">
              {['Month 1', 'Month 3', 'Month 6', 'Month 12'].map((month, i) => (
                <motion.div
                  key={month}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex-1 text-center"
                >
                  <div
                    className="h-8 rounded-lg mb-1 flex items-center justify-center"
                    style={{
                      background: `rgba(124, 58, 237, ${0.08 + i * 0.08})`,
                      border: `1px solid rgba(124, 58, 237, ${0.15 + i * 0.1})`,
                    }}
                  >
                    <span className="text-[9px]">{['🎧', '🎧📊', '🎧📊👔', '🎧📊👔⭐'][i]}</span>
                  </div>
                  <span className="text-dim text-[9px]">{month}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* BOTTOM CTA                                                          */
/* ------------------------------------------------------------------ */
function AboutCTA() {
  return (
    <section className="relative py-section px-6 bg-bg-2 overflow-hidden">
      <ParticleNetwork particleCount={60} />
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Ready to meet your AI team?
        </h2>
        <p className="text-dim text-lg mb-10 max-w-lg mx-auto">
          Book a strategy call. We&apos;ll design your custom AI workforce in 48 hours.
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
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <LiveMetrics />
      <WhyAIEmployees />
      <Timeline />
      <ValueCards />
      <AboutCTA />
    </>
  );
}
