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
  tag: 'employee' | 'agent';
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
              color: offering.tag === 'employee' ? '#7C3AED' : '#7DF9C0',
              borderColor: offering.tag === 'employee' ? '#7C3AED25' : '#7DF9C025',
              background: offering.tag === 'employee' ? '#7C3AED08' : '#7DF9C008',
            }}
          >
            {offering.tag === 'employee' ? 'AI Employee' : 'AI Agent'}
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

/** Subtle parallax wrapper — bottom-row cards move slightly slower */
function ParallaxGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yTop = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yBottom = useTransform(scrollYProgress, [0, 1], [50, -10]);

  const topRow = offerings.slice(0, 4);
  const bottomRow = offerings.slice(4);

  return (
    <div ref={ref} className="max-w-6xl mx-auto">
      {/* Top row — AI Employees + first agent */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"
        style={{ y: yTop }}
      >
        {topRow.map((offering, index) => (
          <OfferingCard key={offering.name} offering={offering} index={index} />
        ))}
      </motion.div>

      {/* Bottom row — AI Agents */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        style={{ y: yBottom }}
      >
        {bottomRow.map((offering, index) => (
          <OfferingCard
            key={offering.name}
            offering={offering}
            index={index + 4}
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
          AI Employees &amp; Agents.
        </h2>
        <p className="text-dim text-lg font-body max-w-xl mx-auto">
          Hire a full-time AI Employee — or deploy a standalone agent for one specific job.
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
