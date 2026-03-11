'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';
import MagneticButton from '@/components/shared/MagneticButton';

interface Plan {
  name: string;
  monthly: number;
  annual: number;
  setup: number;
  features: string[];
  popular?: boolean;
  cta: string;
}

const plans: Plan[] = [
  {
    name: 'Signal',
    monthly: 397,
    annual: 330,
    setup: 797,
    features: [
      '1 AI agent (WhatsApp or Receptionist)',
      'Basic lead capture',
      '8 AI social posts/month',
      'Monthly performance report',
      'Email support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Orbit',
    monthly: 897,
    annual: 747,
    setup: 797,
    popular: true,
    features: [
      'Everything in Signal',
      'Multi-channel bot (2 platforms)',
      'Lead follow-up automation',
      'AI content engine (blog + social + email)',
      '3 workflow automations',
      'Priority support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Apex',
    monthly: 1797,
    annual: 1497,
    setup: 797,
    features: [
      'Everything in Orbit',
      'Unlimited AI agents',
      'Unlimited workflow automations',
      'Custom smart website',
      'AI social media manager',
      'Daily briefings',
      'Monthly strategy call',
      'Dedicated support',
    ],
    cta: 'Get Started',
  },
];

function formatPrice(price: number): string {
  return price.toLocaleString('en-US');
}

export default function PricingPreview() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-section px-6">
      {/* Header */}
      <ScrollReveal>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-center mb-4 text-white">
          Simple pricing. Powerful results.
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className="text-dim text-center mb-8">
          Pick a plan. Start automating.
        </p>
      </ScrollReveal>

      {/* Monthly / Annual Toggle */}
      <ScrollReveal delay={0.15}>
        <div className="flex justify-center mb-16">
          <div className="bg-bg-card border border-border rounded-pill p-1 inline-flex items-center">
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative rounded-pill px-6 py-2 text-sm font-medium transition-all duration-300 ${
                !isAnnual
                  ? 'bg-accent text-white'
                  : 'text-dim hover:text-white/70'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative rounded-pill px-6 py-2 text-sm font-medium transition-all duration-300 ${
                isAnnual
                  ? 'bg-accent text-white'
                  : 'text-dim hover:text-white/70'
              }`}
            >
              Annual
              <span className="ml-2 text-accent-3 text-xs font-bold">
                Save 2 months
              </span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Plan Cards */}
      <ScrollReveal
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start"
        staggerDelay={0.12}
      >
        {plans.map((plan) => {
          const price = isAnnual ? plan.annual : plan.monthly;

          return (
            <div
              key={plan.name}
              className={`relative bg-bg-card rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'border border-accent/30 shadow-[0_0_40px_rgba(124, 58, 237,0.1)] md:scale-105 z-10'
                  : 'border border-border'
              }`}
            >
              {/* Most Popular Badge */}
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-4 py-1 rounded-pill whitespace-nowrap">
                  Most Popular
                </span>
              )}

              {/* Plan Name */}
              <h3 className="font-display text-xl font-bold mb-2 text-white">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${plan.name}-${isAnnual}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="font-display text-4xl font-extrabold text-white"
                  >
                    ${formatPrice(price)}
                  </motion.span>
                </AnimatePresence>
                <span className="text-dim text-lg">/mo</span>
              </div>

              {/* Setup */}
              <p className="text-dim text-sm mb-6">
                Setup: ${formatPrice(plan.setup)}
              </p>

              {/* Divider */}
              <div className="border-t border-border my-6" />

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-dim text-sm"
                  >
                    <Check className="w-4 h-4 text-accent-2 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.popular ? (
                <MagneticButton
                  href="/contact"
                  className="block bg-accent text-white rounded-pill py-3 w-full text-center font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(124, 58, 237,0.3)] hover:brightness-110"
                >
                  {plan.cta}
                </MagneticButton>
              ) : (
                <MagneticButton
                  href="/contact"
                  className="block border border-border rounded-pill py-3 w-full text-center text-white font-medium transition-all duration-300 hover:bg-white/5"
                >
                  {plan.cta}
                </MagneticButton>
              )}
            </div>
          );
        })}
      </ScrollReveal>

      {/* Bottom Link */}
      <ScrollReveal delay={0.4}>
        <div className="text-center mt-8">
          <Link
            href="/pricing"
            className="text-accent text-sm font-medium transition-colors duration-300 hover:text-accent/80"
          >
            See full pricing breakdown &rarr;
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
