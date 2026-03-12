'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { employees, getAgentsByIds } from './data';

const deskWidgets: Record<string, { icon: string; label: string; detail: string }[]> = {
  operator: [
    { icon: '💬', label: 'WhatsApp Live', detail: '12 conversations today' },
    { icon: '📅', label: 'Bookings', detail: '8 appointments scheduled' },
    { icon: '📥', label: 'Inbox', detail: '0 unread messages' },
  ],
  manager: [
    { icon: '💬', label: 'WhatsApp Live', detail: '12 conversations today' },
    { icon: '📅', label: 'Bookings', detail: '8 appointments scheduled' },
    { icon: '📥', label: 'Inbox', detail: '0 unread messages' },
    { icon: '✍️', label: 'Content Calendar', detail: '7 posts queued this week' },
    { icon: '📱', label: 'Social Media', detail: '3 posts published today' },
    { icon: '🧲', label: 'Lead Pipeline', detail: '14 warm leads in nurture' },
  ],
  executive: [
    { icon: '💬', label: 'WhatsApp Live', detail: '12 conversations today' },
    { icon: '📅', label: 'Bookings', detail: '8 appointments scheduled' },
    { icon: '📥', label: 'Inbox', detail: '0 unread messages' },
    { icon: '✍️', label: 'Content Calendar', detail: '7 posts queued this week' },
    { icon: '📱', label: 'Social Media', detail: '3 posts published today' },
    { icon: '🧲', label: 'Lead Pipeline', detail: '14 warm leads in nurture' },
    { icon: '⚡', label: 'Automations', detail: '23 workflows running' },
    { icon: '🔍', label: 'Competitor Intel', detail: 'New pricing alert detected' },
  ],
};

export default function EmployeeTierSelector() {
  const [activeId, setActiveId] = useState('operator');
  const active = employees.find((e) => e.id === activeId)!;
  const activeAgents = getAgentsByIds(active.agentIds);
  const widgets = deskWidgets[activeId];

  // Determine which layers to show (for the "everything below" effect)
  const layerIndices = activeId === 'operator' ? [] : activeId === 'manager' ? [0] : [0, 1];

  return (
    <section className="py-section px-6 bg-bg-2">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            MEET YOUR TEAM
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Three employees. One mission.
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            Each employee uses specialized AI agents as tools. Click to see their workspace.
          </p>
        </motion.div>

        {/* Employee tabs */}
        <div className="flex justify-center gap-3 md:gap-4 mb-12">
          {employees.map((emp) => {
            const isActive = activeId === emp.id;
            return (
              <button
                key={emp.id}
                onClick={() => setActiveId(emp.id)}
                className={`relative px-5 md:px-8 py-4 rounded-2xl border text-center transition-all duration-300 ${
                  isActive
                    ? 'bg-bg-card shadow-xl'
                    : 'bg-transparent border-border hover:bg-bg-card/50'
                }`}
                style={{
                  borderColor: isActive ? `${emp.color}40` : undefined,
                  boxShadow: isActive ? `0 0 40px ${emp.color}12` : undefined,
                }}
              >
                <div className="text-2xl mb-1">{emp.id === 'operator' ? '🎧' : emp.id === 'manager' ? '📊' : '👔'}</div>
                <div className="text-white font-bold text-xs md:text-sm">{emp.name}</div>
                <div className="font-mono text-[10px] md:text-xs mt-1" style={{ color: emp.color }}>
                  ${emp.price}/mo
                </div>
                {isActive && (
                  <motion.div
                    layoutId="tier-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
                    style={{ background: emp.color }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Desk workspace */}
        <div className="relative">
          {/* Background layers (everything below effect) */}
          {layerIndices.map((idx) => {
            const layerEmp = employees[idx];
            return (
              <div
                key={layerEmp.id}
                className="absolute inset-0 bg-bg-card border border-border rounded-3xl"
                style={{
                  opacity: idx === 0 ? (activeId === 'executive' ? 0.08 : 0.12) : 0.12,
                  transform: `scale(${1 - (layerIndices.length - layerIndices.indexOf(idx)) * 0.02}) translateY(${(layerIndices.length - layerIndices.indexOf(idx)) * -12}px)`,
                  borderColor: `${layerEmp.color}15`,
                }}
              />
            );
          })}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative bg-bg-card border rounded-3xl p-8 md:p-10"
              style={{ borderColor: `${active.color}20` }}
            >
              {/* Employee info header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-extrabold text-white">{active.name}</h3>
                  <p className="text-dim text-sm mt-1 max-w-lg">{active.fullDesc}</p>
                </div>
                <div className="flex items-center gap-2">
                  {activeAgents.map((agent) => (
                    <div
                      key={agent.id}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                      style={{ background: `${agent.color}15`, border: `1px solid ${agent.color}25` }}
                      title={agent.name}
                    >
                      {agent.icon}
                    </div>
                  ))}
                </div>
              </div>

              {/* Workspace widgets grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {widgets.map((widget, i) => (
                  <motion.div
                    key={widget.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="bg-bg/50 border border-border rounded-xl p-4 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{widget.icon}</span>
                      <span className="text-white text-xs font-bold">{widget.label}</span>
                    </div>
                    <p className="text-dim text-[11px]">{widget.detail}</p>
                    {/* Activity indicator */}
                    <div className="flex items-center gap-1 mt-2">
                      <div className="w-1 h-1 rounded-full bg-accent-2 animate-pulse" />
                      <span className="text-accent-2 text-[9px] font-mono">Active</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Agent tools footer */}
              <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-dim text-xs mb-1">
                    {active.name} uses <strong className="text-white">{activeAgents.length} AI agents</strong> as tools
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeAgents.map((agent) => (
                      <Link
                        key={agent.id}
                        href={agent.href}
                        className="text-[10px] px-2 py-1 rounded-full border transition-colors hover:text-white"
                        style={{ color: agent.color, borderColor: `${agent.color}30`, background: `${agent.color}08` }}
                      >
                        {agent.name} →
                      </Link>
                    ))}
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="px-6 py-2.5 rounded-pill text-sm font-medium transition-all hover:scale-[1.02]"
                  style={{ background: active.color, color: '#0F0A1E' }}
                >
                  Hire {active.name}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
