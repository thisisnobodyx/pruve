'use client';

import { useState, useRef, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion';
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

/** Animated price counter that counts up when visible */
function AnimatedPrice({
  price,
  planName,
  isAnnual,
}: {
  price: number;
  planName: string;
  isAnnual: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { damping: 30, stiffness: 80 });
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (isInView && !hasTriggered.current) {
      hasTriggered.current = true;
      motionVal.set(price);
    }
  }, [isInView, motionVal, price]);

  // When toggle changes, animate to new price
  useEffect(() => {
    if (hasTriggered.current) {
      motionVal.set(price);
    }
  }, [price, motionVal]);

  useEffect(() => {
    const unsubscribe = springVal.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `$${Math.round(latest).toLocaleString('en-US')}`;
      }
    });
    return unsubscribe;
  }, [springVal]);

  return (
    <span
      ref={ref}
      className="font-display text-4xl font-extrabold text-white"
    >
      $0
    </span>
  );
}

/** 3D tilt card that reacts to scroll position */
function PricingCard({
  plan,
  index,
  isAnnual,
}: {
  plan: Plan;
  index: number;
  isAnnual: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const price = isAnnual ? plan.annual : plan.monthly;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Subtle 3D tilt based on scroll position
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]);
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index === 0 ? 3 : index === 2 ? -3 : 0, 0, index === 0 ? -3 : index === 2 ? 3 : 0]
  );

  // Popular card scales up when centered in viewport
  const cardScale = useTransform(
    scrollYProgress,
    [0.2, 0.5, 0.8],
    plan.popular ? [1.0, 1.05, 1.0] : [1, 1, 1]
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true, amount: 0.15 }}
      style={{
        rotateX,
        rotateY,
        scale: cardScale,
        transformStyle: 'preserve-3d',
        perspective: '1200px',
      }}
      className={`relative bg-bg-card rounded-2xl p-8 transition-colors duration-300 ${
        plan.popular
          ? 'border border-accent/30 shadow-[0_0_40px_rgba(124, 58, 237,0.1)] z-10'
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

      {/* Price — counting animation */}
      <div className="flex items-baseline gap-1 mb-1">
        <AnimatedPrice
          price={price}
          planName={plan.name}
          isAnnual={isAnnual}
        />
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
    </motion.div>
  );
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

      {/* Plan Cards — 3D tilt + counting prices */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start"
        style={{ perspective: '1200px' }}
      >
        {plans.map((plan, index) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            index={index}
            isAnnual={isAnnual}
          />
        ))}
      </div>

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
