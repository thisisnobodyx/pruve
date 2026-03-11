'use client';

import { useRef } from 'react';
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
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
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
    accentColor: '#7C3AED',
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
  const row = Math.floor(index / 4); // 0 for first row, 1 for second

  // Staggered reveal: second row starts later
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
        {/* Icon — spring scale on hover */}
        <motion.div
          className="w-10 h-10 flex items-center justify-center mb-4"
          style={{ color: service.accentColor }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <Icon className="w-10 h-10" strokeWidth={1.5} />
        </motion.div>

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
    </motion.div>
  );
}

/** Subtle parallax wrapper — bottom-row cards move slightly slower */
function ParallaxGrid({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Top row moves faster (more positive), bottom row moves slower
  const yTop = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yBottom = useTransform(scrollYProgress, [0, 1], [50, -10]);

  // Split services into two rows
  const topRow = services.slice(0, 4);
  const bottomRow = services.slice(4);

  return (
    <div ref={ref} className="max-w-6xl mx-auto">
      {/* Top row */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"
        style={{ y: yTop }}
      >
        {topRow.map((service, index) => (
          <ServiceCard key={service.name} service={service} index={index} />
        ))}
      </motion.div>

      {/* Bottom row — slightly slower parallax */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        style={{ y: yBottom }}
      >
        {bottomRow.map((service, index) => (
          <ServiceCard
            key={service.name}
            service={service}
            index={index + 4}
          />
        ))}
      </motion.div>
    </div>
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

      {/* Services grid — parallax rows + staggered reveal */}
      <ParallaxGrid>
        {services.map((service, index) => (
          <ServiceCard key={service.name} service={service} index={index} />
        ))}
      </ParallaxGrid>
    </section>
  );
}
