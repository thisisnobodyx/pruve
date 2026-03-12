'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Starfield from '@/components/shared/Starfield';
import TypewriterText from '@/components/shared/TypewriterText';
import MagneticButton from '@/components/shared/MagneticButton';
import { employees, getAgentsByIds } from './data';

export default function OrgChartHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const chartY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const chartOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      <Starfield speed={0.3} />

      {/* Accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <motion.div style={{ y: chartY, opacity: chartOpacity }} className="relative z-10 w-full max-w-4xl">
        {/* Org Chart SVG */}
        <div className="relative mx-auto" style={{ width: '100%', maxWidth: 700 }}>
          {/* "Your Business" top node */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-bg-card border border-border rounded-2xl px-8 py-4 text-center shadow-xl">
              <div className="text-white font-extrabold text-lg">Your Business</div>
              <div className="text-dim text-xs mt-1">Powered by AI Employees</div>
            </div>
          </motion.div>

          {/* Connecting lines */}
          <svg className="absolute top-[72px] left-0 w-full h-16 pointer-events-none" viewBox="0 0 700 60" preserveAspectRatio="none">
            {employees.map((emp, i) => {
              const startX = 350;
              const endX = i === 0 ? 116 : i === 1 ? 350 : 584;
              return (
                <motion.line
                  key={emp.id}
                  x1={startX} y1={0} x2={endX} y2={55}
                  stroke={emp.color}
                  strokeWidth={2}
                  strokeOpacity={0.4}
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                />
              );
            })}
          </svg>

          {/* Three employee nodes */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {employees.map((emp, i) => {
              const empAgents = getAgentsByIds(emp.agentIds);
              return (
                <motion.div
                  key={emp.id}
                  initial={{ opacity: 0, scale: 0.7, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                  className="group flex flex-col items-center"
                >
                  {/* Employee card */}
                  <div
                    className="relative bg-bg-card border rounded-2xl px-4 py-5 text-center w-full cursor-pointer transition-all duration-300 hover:shadow-lg"
                    style={{
                      borderColor: `${emp.color}30`,
                      boxShadow: `0 0 30px ${emp.color}08`,
                    }}
                  >
                    {/* Pulse ring on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: `0 0 40px ${emp.color}20, inset 0 0 40px ${emp.color}05` }}
                    />

                    <div className="text-2xl mb-2">{emp.id === 'operator' ? '🎧' : emp.id === 'manager' ? '📊' : '👔'}</div>
                    <div className="font-extrabold text-white text-sm md:text-base">{emp.name}</div>
                    <div className="text-dim text-[10px] md:text-xs mt-0.5">{emp.title}</div>
                    <div className="font-mono text-xs mt-2" style={{ color: emp.color }}>
                      ${emp.price}/mo
                    </div>
                  </div>

                  {/* Agent badges cascade */}
                  <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                    {empAgents.map((agent, j) => (
                      <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.3 + i * 0.15 + j * 0.05 }}
                        className="relative group/badge"
                      >
                        <div
                          className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-sm cursor-pointer transition-transform hover:scale-125"
                          style={{ background: `${agent.color}15`, border: `1px solid ${agent.color}25` }}
                          title={agent.name}
                        >
                          {agent.icon}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center mt-16"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
            Hire AI employees that
            <br />
            <span className="text-accent">
              <TypewriterText
                text={[
                  'handle your calls.',
                  'close your leads.',
                  'write your content.',
                  'run your ops.',
                  'never call in sick.',
                ]}
                speed={60}
                loop
                pauseBetween={2000}
              />
            </span>
          </h1>
          <p className="text-dim text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Not software. Not chatbots. Autonomous AI workers with a job title, memory, and a daily schedule. You manage them like staff.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <MagneticButton href="#demo" className="bg-accent text-bg font-medium px-8 py-3 rounded-pill text-sm">
              See a live demo
            </MagneticButton>
            <MagneticButton href="/contact" className="bg-white/5 text-white border border-border font-medium px-8 py-3 rounded-pill text-sm hover:bg-white/10">
              Hire an employee
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dim"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
