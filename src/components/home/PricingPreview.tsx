'use client';

import { useRef, useEffect } from 'react';
import {
  motion,
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
  subtitle: string;
  monthly: number;
  setup: number;
  features: string[];
  popular?: boolean;
  cta: string;
  color: string;
}

const plans: Plan[] = [
  {
    name: 'The Operator',
    subtitle: 'Communication',
    monthly: 297,
    setup: 497,
    color: '#7DF9C0',
    features: [
      'Responds to WhatsApp, Instagram & Telegram',
      'Books appointments automatically',
      'Remembers every customer by name',
      'Handles FAQs with your brand voice',
      'Sends follow-up messages automatically',
    ],
    cta: 'Get Started',
  },
  {
    name: 'The Manager',
    subtitle: 'Growth',
    monthly: 597,
    setup: 997,
    popular: true,
    color: '#7C3AED',
    features: [
      'Everything in The Operator',
      'Creates & posts social media content',
      'Follows up on every lead until they convert',
      'Monitors & responds to online reviews',
      'Sends weekly performance reports',
      'Runs re-engagement campaigns',
    ],
    cta: 'Get Started',
  },
  {
    name: 'The Executive',
    subtitle: 'Autonomous Ops',
    monthly: 1197,
    setup: 1997,
    color: '#C8F135',
    features: [
      'Everything in The Manager',
      'Monitors competitors automatically',
      'Automates internal workflows end-to-end',
      'Daily morning briefings via voice note',
      'Manages vendor & partner communications',
      'Learns new skills as your business evolves',
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
}: {
  plan: Plan;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const price = plan.monthly;

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

      <div
        className="font-mono text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color: plan.color }}
      >
        {plan.subtitle}
      </div>
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="py-section-mobile md:py-section px-6">
      {/* Header — parallax entrance */}
      <motion.div style={{ y: titleY, opacity: titleOpacity }}>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-center mb-4 text-white">
          One AI Employee. Three scopes.
        </h2>
        <p className="text-dim text-center mb-16 text-lg max-w-xl mx-auto">
          Choose the level of autonomy your business needs.
        </p>
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
