'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, UserCheck, Send, Database, Bell } from 'lucide-react';
import MagneticButton from '@/components/shared/MagneticButton';

const ACCENT = '#FF6B35';

interface WorkflowNode {
  id: string;
  label: string;
  icon: typeof Mail;
  x: number;
  y: number;
}

const nodes: WorkflowNode[] = [
  { id: 'lead', label: 'New Lead', icon: UserCheck, x: 40, y: 30 },
  { id: 'qualify', label: 'Qualify', icon: Database, x: 180, y: 100 },
  { id: 'email', label: 'Send Email', icon: Mail, x: 320, y: 40 },
  { id: 'crm', label: 'Update CRM', icon: Send, x: 460, y: 120 },
  { id: 'notify', label: 'Notify Team', icon: Bell, x: 560, y: 40 },
];

const connections: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
];

function getPath(from: WorkflowNode, to: WorkflowNode): string {
  const x1 = from.x + 55;
  const y1 = from.y + 25;
  const x2 = to.x;
  const y2 = to.y + 25;
  const cpx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${cpx} ${y1}, ${cpx} ${y2}, ${x2} ${y2}`;
}

function FlowingDot({ path, delay }: { path: string; delay: number }) {
  return (
    <motion.circle
      r={4}
      fill={ACCENT}
      filter="url(#glow)"
      initial={{ offsetDistance: '0%', opacity: 0 }}
      animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: 'easeInOut',
      }}
      style={{
        offsetPath: `path('${path}')`,
      }}
    />
  );
}

function NodeGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const svgWidth = 640;
  const svgHeight = 200;

  return (
    <div className="relative w-full max-w-[640px] mx-auto">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connection lines */}
        {connections.map(([fromIdx, toIdx], i) => {
          const from = nodes[fromIdx];
          const to = nodes[toIdx];
          const path = getPath(from, to);
          return (
            <g key={`conn-${i}`}>
              <motion.path
                d={path}
                fill="none"
                stroke={`${ACCENT}30`}
                strokeWidth={2}
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: i * 0.2 + 0.5 }}
              />
              <FlowingDot path={path} delay={i * 0.6 + 1.5} />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const Icon = node.icon;
          const isHovered = hoveredNode === node.id;
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <motion.rect
                x={node.x}
                y={node.y}
                width={110}
                height={50}
                rx={12}
                fill={isHovered ? `${ACCENT}20` : 'rgba(255,255,255,0.04)'}
                stroke={isHovered ? ACCENT : 'rgba(255,255,255,0.1)'}
                strokeWidth={1.5}
                animate={{
                  fill: isHovered ? `${ACCENT}20` : 'rgba(255,255,255,0.04)',
                  stroke: isHovered ? ACCENT : 'rgba(255,255,255,0.1)',
                }}
                transition={{ duration: 0.2 }}
              />
              <foreignObject x={node.x} y={node.y} width={110} height={50}>
                <div className="w-full h-full flex items-center justify-center gap-2 pointer-events-none">
                  <Icon
                    className="w-4 h-4 shrink-0"
                    style={{ color: isHovered ? ACCENT : 'rgba(255,255,255,0.5)' }}
                  />
                  <span
                    className="text-[11px] font-medium whitespace-nowrap"
                    style={{ color: isHovered ? '#fff' : 'rgba(255,255,255,0.7)' }}
                  >
                    {node.label}
                  </span>
                </div>
              </foreignObject>
            </motion.g>
          );
        })}
      </svg>

      {/* Subtle ambient glow behind the graph */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${ACCENT}, transparent 70%)`,
        }}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 60% 40%, ${ACCENT}12 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto w-full">
        {/* Left - Headline + CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-bg-card/50 mb-6"
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: ACCENT }} />
            <span className="text-dim text-xs font-mono uppercase tracking-wider">Workflow Automation</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5">
            Connect everything.{' '}
            <span style={{ color: ACCENT }}>Automate anything.</span>
          </h1>
          <p className="text-dim text-lg mb-8 max-w-md mx-auto lg:mx-0">
            Custom workflow automations that connect your tools, eliminate manual busywork, and keep your business running like clockwork.
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
            <MagneticButton
              href="#demo"
              className="px-8 py-4 rounded-full text-white font-semibold text-base transition-all hover:brightness-110"
              style={{ background: ACCENT }}
            >
              See It in Action
            </MagneticButton>
            <MagneticButton
              href="/pricing"
              className="px-8 py-4 rounded-full border border-border text-white font-semibold text-base hover:bg-white/5 transition-all"
            >
              View Pricing &rarr;
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right - Interactive Node Graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex justify-center"
        >
          <div className="bg-bg-card/50 border border-border rounded-3xl p-8 backdrop-blur-sm w-full max-w-[700px]">
            <div className="text-[11px] font-mono uppercase tracking-wider text-dim mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live Workflow
            </div>
            <NodeGraph />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-6 h-6 text-dim/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
