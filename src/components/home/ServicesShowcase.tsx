'use client';

import { useRef } from 'react';
import Link from 'next/link';
import {
  UserCheck,
  MessageCircle,
  Headphones,
  Target,
  PenTool,
  Instagram,
  Palette,
  Search,
  type LucideIcon,
} from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

interface Offering {
  icon: LucideIcon;
  name: string;
  description: string;
  href: string;
  accentColor: string;
  tag: 'employee' | 'agent' | 'service';
}

const offerings: Offering[] = [
  {
    icon: UserCheck,
    name: 'The Operator',
    description: 'Your 24/7 front desk — handles every message, books every appointment, remembers every customer.',
    href: '/ai-employees',
    accentColor: '#7DF9C0',
    tag: 'employee',
  },
  {
    icon: UserCheck,
    name: 'The Manager',
    description: 'Everything The Operator does, plus content, reviews, lead follow-up, and weekly reports.',
    href: '/ai-employees',
    accentColor: '#7C3AED',
    tag: 'employee',
  },
  {
    icon: UserCheck,
    name: 'The Executive',
    description: 'Runs the entire operation — competitor monitoring, team management, autonomous workflows.',
    href: '/ai-employees',
    accentColor: '#C8F135',
    tag: 'employee',
  },
  {
    icon: MessageCircle,
    name: 'WhatsApp Agent',
    description: '24/7 AI-powered customer conversations on WhatsApp.',
    href: '/services/whatsapp-agent',
    accentColor: '#25D366',
    tag: 'agent',
  },
  {
    icon: Headphones,
    name: 'AI Receptionist',
    description: 'Your front desk, always open and always helpful.',
    href: '/services/ai-receptionist',
    accentColor: '#C9A84C',
    tag: 'agent',
  },
  {
    icon: Target,
    name: 'Lead Capture',
    description: 'Catch every lead. Follow up automatically. Convert more.',
    href: '/services/lead-capture',
    accentColor: '#C8F135',
    tag: 'agent',
  },
  {
    icon: PenTool,
    name: 'Content Engine',
    description: 'AI-generated posts, blogs, and emails on autopilot.',
    href: '/services/content-engine',
    accentColor: '#F59E0B',
    tag: 'agent',
  },
  {
    icon: Instagram,
    name: 'Social Media AI',
    description: 'Post everywhere. Engage everyone. Do nothing.',
    href: '/services/social-media',
    accentColor: '#EC4899',
    tag: 'agent',
  },
  {
    icon: Palette,
    name: 'Web Design',
    description: 'Custom websites built to convert visitors into customers.',
    href: '/services/web-design',
    accentColor: '#7C3AED',
    tag: 'service',
  },
  {
    icon: Search,
    name: 'SEO Services',
    description: 'Dominate Google and drive organic traffic that converts.',
    href: '/services/seo',
    accentColor: '#C8F135',
    tag: 'service',
  },
];

function OfferingCard({ offering, index }: { offering: Offering; index: number }) {
  const Icon = offering.icon;
  const row = Math.floor(index / 4);
  const delay = row * 0.2 + (index % 4) * 0.08;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true, amount: 0.15 }}
    >
      <Link
        href={offering.href}
        className="group block bg-bg-card border border-border rounded-card p-6 transition-all duration-300 hover:-translate-y-1 h-full"
        style={
          {
            '--service-accent': offering.accentColor,
          } as React.CSSProperties
        }
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            `${offering.accentColor}4D`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = '';
        }}
      >
        {/* Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border"
            style={{
              color: offering.tag === 'employee' ? '#7C3AED' : offering.tag === 'service' ? '#F59E0B' : '#7DF9C0',
              borderColor: offering.tag === 'employee' ? '#7C3AED25' : offering.tag === 'service' ? '#F59E0B25' : '#7DF9C025',
              background: offering.tag === 'employee' ? '#7C3AED08' : offering.tag === 'service' ? '#F59E0B08' : '#7DF9C008',
            }}
          >
            {offering.tag === 'employee' ? 'AI Employee' : offering.tag === 'service' ? 'Service' : 'AI Agent'}
          </span>
        </div>

        {/* Icon */}
        <motion.div
          className="w-10 h-10 flex items-center justify-center mb-4"
          style={{ color: offering.accentColor }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <Icon className="w-10 h-10" strokeWidth={1.5} />
        </motion.div>

        {/* Name */}
        <h3 className="font-display font-bold text-lg text-white mb-2">
          {offering.name}
        </h3>

        {/* Description */}
        <p className="text-dim text-sm font-body leading-relaxed">
          {offering.description}
        </p>

        {/* Explore link */}
        <span
          className="inline-block text-sm mt-4 transition-colors duration-300 group-hover:underline"
          style={{ color: offering.accentColor }}
        >
          Learn more &rarr;
        </span>
      </Link>
    </motion.div>
  );
}

/** Subtle parallax wrapper — rows move at different speeds */
function ParallaxGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yTop = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yMiddle = useTransform(scrollYProgress, [0, 1], [50, -10]);
  const yBottom = useTransform(scrollYProgress, [0, 1], [60, -5]);

  const employees = offerings.filter((o) => o.tag === 'employee');
  const agents = offerings.filter((o) => o.tag === 'agent');
  const services = offerings.filter((o) => o.tag === 'service');

  return (
    <div ref={ref} className="max-w-6xl mx-auto">
      {/* Row 1 — AI Employees */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"
        style={{ y: yTop }}
      >
        {employees.map((offering, index) => (
          <OfferingCard key={offering.name} offering={offering} index={index} />
        ))}
      </motion.div>

      {/* Row 2 — AI Agents */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4"
        style={{ y: yMiddle }}
      >
        {agents.map((offering, index) => (
          <OfferingCard
            key={offering.name}
            offering={offering}
            index={index + 3}
          />
        ))}
      </motion.div>

      {/* Row 3 — Services (Web Design & SEO) */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        style={{ y: yBottom }}
      >
        {services.map((offering, index) => (
          <OfferingCard
            key={offering.name}
            offering={offering}
            index={index + 8}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });

  const titleY = useTransform(sectionProgress, [0, 1], [60, 0]);
  const titleOpacity = useTransform(sectionProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="py-section px-6">
      {/* Section header */}
      <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center mb-16">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4 text-white">
          Everything your business needs.
        </h2>
        <p className="text-dim text-lg font-body max-w-xl mx-auto">
          AI Employees, standalone agents, custom websites, and SEO — all under one roof.
        </p>
      </motion.div>

      {/* Grid */}
      <ParallaxGrid />

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Link
          href="/pricing"
          className="text-accent text-sm font-medium transition-colors duration-300 hover:text-accent/80"
        >
          See full pricing &rarr;
        </Link>
      </motion.div>
    </section>
  );
}
