'use client';

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

function Card({ icon: Icon, title, description }: ServiceCard) {
  return (
    <div className="group relative bg-bg-card border border-border rounded-card p-8 md:p-10 transition-all duration-300 hover:scale-[1.02] hover:border-accent/30 hover:shadow-[0_0_30px_rgba(168, 85, 247,0.1)] overflow-hidden">
      {/* Icon */}
      <div className="w-[60px] h-[60px] rounded-full bg-accent/10 flex items-center justify-center">
        <Icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl font-bold mt-6 mb-3 text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-dim leading-relaxed font-body">{description}</p>

      {/* Bottom accent line — grows on hover */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

export default function WhatWeDo() {
  return (
    <section className="py-section px-6 bg-bg">
      {/* Section header */}
      <ScrollReveal>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-center mb-4 text-white">
          What We Do
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className="text-dim text-center mb-16 text-lg max-w-xl mx-auto font-body">
          Three pillars. One mission. Automate everything.
        </p>
      </ScrollReveal>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <ScrollReveal key={service.title} delay={index * 0.15}>
            <Card {...service} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
