'use client';

import Link from 'next/link';
import {
  MessageCircle,
  Headphones,
  Globe,
  Target,
  PenTool,
  Layout,
  GitBranch,
  Instagram,
  type LucideIcon,
} from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

interface Service {
  icon: LucideIcon;
  name: string;
  description: string;
  href: string;
  accentColor: string;
}

const services: Service[] = [
  {
    icon: MessageCircle,
    name: 'WhatsApp Agent',
    description: '24/7 AI-powered customer conversations on WhatsApp',
    href: '/services/whatsapp-agent',
    accentColor: '#25D366',
  },
  {
    icon: Headphones,
    name: 'AI Receptionist',
    description: 'Your front desk, always open and always helpful',
    href: '/services/ai-receptionist',
    accentColor: '#C9A84C',
  },
  {
    icon: Globe,
    name: 'Multi-Channel Bot',
    description: 'One AI brain across WhatsApp, Telegram, Discord & more',
    href: '/services/multi-channel',
    accentColor: '#7C3AED',
  },
  {
    icon: Target,
    name: 'Lead Capture',
    description: 'Catch every lead. Follow up automatically. Convert more.',
    href: '/services/lead-capture',
    accentColor: '#C8F135',
  },
  {
    icon: PenTool,
    name: 'Content Engine',
    description: 'AI-generated posts, blogs, and emails on autopilot',
    href: '/services/content-engine',
    accentColor: '#F59E0B',
  },
  {
    icon: Layout,
    name: 'Smart Website',
    description: 'Websites that think, chat, and convert visitors',
    href: '/services/smart-website',
    accentColor: '#A855F7',
  },
  {
    icon: GitBranch,
    name: 'Workflow Automation',
    description: 'Connect your tools. Eliminate busywork. Scale faster.',
    href: '/services/workflow',
    accentColor: '#FF6B35',
  },
  {
    icon: Instagram,
    name: 'Social Media AI',
    description: 'Post everywhere. Engage everyone. Do nothing.',
    href: '/services/social-media',
    accentColor: '#EC4899',
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <ScrollReveal delay={index * 0.08}>
      <Link
        href={service.href}
        className="group block bg-bg-card border border-border rounded-card p-6 transition-all duration-300 hover:-translate-y-1 h-full"
        style={
          {
            '--service-accent': service.accentColor,
          } as React.CSSProperties
        }
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            `${service.accentColor}4D`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = '';
        }}
      >
        {/* Icon */}
        <div
          className="w-10 h-10 flex items-center justify-center mb-4"
          style={{ color: service.accentColor }}
        >
          <Icon className="w-10 h-10" strokeWidth={1.5} />
        </div>

        {/* Name */}
        <h3 className="font-display font-bold text-lg text-white mb-2">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-dim text-sm font-body leading-relaxed">
          {service.description}
        </p>

        {/* Explore link */}
        <span
          className="inline-block text-sm mt-4 transition-colors duration-300 group-hover:underline"
          style={{ color: service.accentColor }}
        >
          Explore &rarr;
        </span>
      </Link>
    </ScrollReveal>
  );
}

export default function ServicesShowcase() {
  return (
    <section className="py-section px-6">
      {/* Section header */}
      <ScrollReveal>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-center mb-4 text-white">
          Everything you need to automate.
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className="text-dim text-center mb-16 text-lg font-body">
          Eight AI-powered services. One agency.
        </p>
      </ScrollReveal>

      {/* Services grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard key={service.name} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
