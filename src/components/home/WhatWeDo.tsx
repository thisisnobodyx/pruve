'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot, Zap, TrendingUp, type LucideIcon } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

interface ServiceCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: ServiceCard[] = [
  {
    icon: Bot,
    title: 'AI Agents',
    description:
      'Intelligent agents that talk to your customers 24/7 across WhatsApp, Telegram, Discord and more.',
  },
  {
    icon: Zap,
    title: 'Automation',
    description:
      'End-to-end workflow automation that eliminates repetitive tasks and connects all your tools.',
  },
  {
    icon: TrendingUp,
    title: 'Growth',
    description:
      'AI-powered content, ads, and marketing that runs on autopilot and scales without extra headcount.',
  },
];

function Card({
  icon: Icon,
  title,
  description,
  index,
}: ServiceCard & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative bg-bg-card border border-border rounded-card p-8 md:p-10 transition-all duration-300 hover:scale-[1.02] hover:border-accent/30 hover:shadow-[0_0_30px_rgba(124, 58, 237,0.1)] overflow-hidden"
    >
      {/* Icon — rotates into view */}
      <motion.div
        className="w-[60px] h-[60px] rounded-full bg-accent/10 flex items-center justify-center"
        initial={{ rotate: -90, opacity: 0 }}
        whileInView={{ rotate: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: index * 0.15 + 0.2,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
      </motion.div>

      {/* Title */}
      <h3 className="font-display text-2xl font-bold mt-6 mb-3 text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-dim leading-relaxed font-body">{description}</p>

      {/* Bottom accent line — grows on hover */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}

/** Gradient text reveal — opacity wipes left-to-right */
function GradientRevealText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      {/* Base text (dimmed) */}
      <span className="text-white/10">{children}</span>
      {/* Revealed text with clip-path wipe */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.span>
    </div>
  );
}

export default function WhatWeDo() {
  return (
    <section className="py-section px-6 bg-bg">
      {/* Section header — gradient reveal */}
      <ScrollReveal>
        <GradientRevealText className="font-display text-4xl md:text-5xl font-extrabold text-center mb-4">
          What We Do
        </GradientRevealText>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className="text-dim text-center mb-16 text-lg max-w-xl mx-auto font-body">
          Three pillars. One mission. Automate everything.
        </p>
      </ScrollReveal>

      {/* Cards grid — scale + fade in */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <Card key={service.title} {...service} index={index} />
        ))}
      </div>
    </section>
  );
}
