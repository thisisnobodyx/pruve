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

/** Animated price counter that counts up when visible */
function AnimatedPrice({ price }: { price: number }) {
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
    <span ref={ref} className="font-display text-4xl font-extrabold text-white">
      $0
    </span>
  );
}

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

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]);
  const cardScale = useTransform(
    scrollYProgress,
    [0.2, 0.5, 0.8],
    plan.popular ? [0.98, 1.03, 0.98] : [1, 1, 1]
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true, amount: 0.15 }}
      style={{
        rotateX,
        scale: cardScale,
        transformStyle: 'preserve-3d',
      }}
      className={`relative bg-bg-card rounded-2xl p-8 transition-colors duration-300 flex flex-col ${
        plan.popular
          ? 'border border-accent/30 shadow-[0_0_40px_rgba(124,58,237,0.1)] z-10'
          : 'border border-border'
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-pill whitespace-nowrap">
          Most Popular
        </span>
      )}

      <h3 className="font-display text-xl font-bold mb-2 text-white">
        {plan.name}
      </h3>

      <div className="flex items-baseline gap-1 mb-1">
        <AnimatedPrice price={price} />
        <span className="text-dim text-lg">/mo</span>
      </div>

      <p className="text-dim text-sm mb-6">
        Setup: ${plan.setup.toLocaleString('en-US')}
      </p>

      <div className="border-t border-border my-6" />

      <ul className="space-y-3 mb-10 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-dim text-sm">
            <Check className="w-4 h-4 text-accent-2 mt-0.5 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button — consistent large size */}
      <MagneticButton
        href="/contact"
        className={`block w-full text-center font-semibold rounded-pill py-4 px-6 text-base transition-all duration-300 ${
          plan.popular
            ? 'bg-accent text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:brightness-110'
            : 'border border-border text-white hover:bg-white/5 hover:border-white/15'
        }`}
      >
        {plan.cta}
      </MagneticButton>
    </motion.div>
  );
}

export default function PricingPreview() {
  const [isAnnual, setIsAnnual] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="py-section px-6">
      {/* Header — parallax entrance */}
      <motion.div style={{ y: titleY, opacity: titleOpacity }}>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-center mb-4 text-white">
          Simple pricing. Powerful results.
        </h2>
        <p className="text-dim text-center mb-8">
          Pick a plan. Start automating.
        </p>
      </motion.div>

      {/* Monthly / Annual Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="flex justify-center mb-16"
      >
        <div className="bg-bg-card border border-border rounded-pill p-1 inline-flex items-center">
          <button
            onClick={() => setIsAnnual(false)}
            className={`relative rounded-pill px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
              !isAnnual ? 'bg-accent text-white' : 'text-dim hover:text-white/70'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`relative rounded-pill px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
              isAnnual ? 'bg-accent text-white' : 'text-dim hover:text-white/70'
            }`}
          >
            Annual
            <span className="ml-2 text-accent-3 text-xs font-bold">
              Save 2 months
            </span>
          </button>
        </div>
      </motion.div>

      {/* Plan Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch"
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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <Link
          href="/pricing"
          className="text-accent text-sm font-medium transition-colors duration-300 hover:text-accent/80"
        >
          See full pricing breakdown &rarr;
        </Link>
      </motion.div>
    </section>
  );
}
