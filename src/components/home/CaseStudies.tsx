'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

interface Stat {
  target: number;
  suffix: string;
  label: string;
}

interface CaseStudy {
  industry: string;
  title: string;
  result: string;
  description: string;
}

const stats: Stat[] = [
  { target: 10, suffix: '+', label: 'Years' },
  { target: 200, suffix: '+', label: 'Clients' },
  { target: 8, suffix: '', label: 'AI Services' },
  { target: 5, suffix: '', label: 'Countries' },
];

const caseStudies: CaseStudy[] = [
  {
    industry: 'Local Restaurant',
    title: 'WhatsApp AI Agent',
    result: '40% faster response',
    description:
      'Automated order confirmations and reservations via WhatsApp, handling 200+ messages daily.',
  },
  {
    industry: 'Real Estate Agency',
    title: 'Lead Capture System',
    result: '3x more conversions',
    description:
      'Automated lead qualification and follow-up across email, WhatsApp, and SMS.',
  },
  {
    industry: 'Fitness Studio',
    title: 'Full Automation Suite',
    result: '$4,200/mo saved',
    description:
      'AI receptionist, class booking automation, and social media content engine.',
  },
];

export default function CaseStudies() {
  return (
    <>
      {/* Part 1: Stats Bar */}
      <section className="w-full py-16 px-6 bg-bg-2 border-y border-border">
        <ScrollReveal
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center"
          staggerDelay={0.1}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <AnimatedCounter
                target={stat.target}
                suffix={stat.suffix}
                className="font-display text-4xl md:text-5xl font-extrabold text-white"
              />
              <p className="text-dim text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </ScrollReveal>
      </section>

      {/* Part 2: Case Studies */}
      <section className="py-section px-6">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-center mb-16 text-white">
            Results that speak.
          </h2>
        </ScrollReveal>

        <ScrollReveal
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          staggerDelay={0.12}
        >
          {caseStudies.map((study) => (
            <div
              key={study.title}
              className="group bg-bg-card border border-border rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-accent/20 hover:shadow-[0_0_30px_rgba(124, 58, 237,0.06)]"
            >
              {/* Industry Badge */}
              <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 block">
                {study.industry}
              </span>

              {/* Title */}
              <h3 className="font-display text-lg font-bold mb-3 text-white">
                {study.title}
              </h3>

              {/* Result Metric */}
              <p className="text-accent-2 text-2xl font-display font-bold mb-2">
                {study.result}
              </p>

              {/* Description */}
              <p className="text-dim text-sm leading-relaxed">
                {study.description}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </section>
    </>
  );
}
