'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Check,
  MessageCircle,
  Headphones,
  Globe,
  Target,
  PenTool,
  Layout,
  GitBranch,
  Instagram,
  Palette,
  Search,
} from 'lucide-react';
import MagneticButton from '@/components/shared/MagneticButton';
import Starfield from '@/components/shared/Starfield';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  MessageCircle,
  Headphones,
  Globe,
  Target,
  PenTool,
  Layout,
  GitBranch,
  Instagram,
  Palette,
  Search,
};

interface Feature {
  title: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface ServicePageProps {
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accentColor: string;
  features: Feature[];
  howItWorks: Step[];
  benefits: string[];
  demoComponent?: ReactNode;
}

function FeatureCard({ feature, index, accentColor }: { feature: Feature; index: number; accentColor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      className="group bg-bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/10"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
        style={{ backgroundColor: `${accentColor}15` }}
      >
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
      </div>
      <h3 className="font-display text-lg font-bold text-white mb-2">{feature.title}</h3>
      <p className="text-dim text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export default function ServicePageTemplate({
  name,
  tagline,
  description,
  icon: iconName,
  accentColor,
  features,
  howItWorks,
  benefits,
  demoComponent,
}: ServicePageProps) {
  const Icon = iconMap[iconName] || MessageCircle;
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  const { scrollYProgress: featuresProgress } = useScroll({
    target: featuresRef,
    offset: ['start end', 'start 0.3'],
  });
  const featuresTitleY = useTransform(featuresProgress, [0, 1], [60, 0]);
  const featuresTitleOpacity = useTransform(featuresProgress, [0, 0.5], [0, 1]);

  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsRef,
    offset: ['start end', 'start 0.3'],
  });
  const stepsTitleY = useTransform(stepsProgress, [0, 1], [60, 0]);
  const stepsTitleOpacity = useTransform(stepsProgress, [0, 0.5], [0, 1]);

  const { scrollYProgress: benefitsProgress } = useScroll({
    target: benefitsRef,
    offset: ['start end', 'start 0.3'],
  });
  const benefitsTitleY = useTransform(benefitsProgress, [0, 1], [60, 0]);
  const benefitsTitleOpacity = useTransform(benefitsProgress, [0, 0.5], [0, 1]);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center overflow-hidden bg-bg">
        <Starfield className="absolute inset-0 w-full h-full z-0" starCount={200} speed={0.15} />
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[150px]"
            style={{ backgroundColor: `${accentColor}0A` }}
          />
        </div>
        <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--bg)_100%)]" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center py-32"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <Icon className="w-8 h-8" style={{ color: accentColor }} strokeWidth={1.5} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
          >
            {name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl font-display mb-4"
            style={{ color: accentColor }}
          >
            {tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-dim text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton
              href="/contact"
              className="inline-flex items-center justify-center text-white font-semibold rounded-pill px-8 py-4 text-base transition-all duration-300 hover:brightness-110"
              style={{ backgroundColor: accentColor }}
            >
              Get Started
            </MagneticButton>
            <MagneticButton
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 border border-border text-dim font-semibold rounded-pill px-8 py-4 text-base transition-all duration-300 hover:text-white hover:border-white/20"
            >
              View Pricing
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="py-section-mobile md:py-section px-6 bg-bg-2">
        <div className="max-w-6xl mx-auto">
          <motion.div style={{ y: featuresTitleY, opacity: featuresTitleOpacity }} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">What you get</h2>
            <p className="text-dim text-lg max-w-xl mx-auto">Everything included with {name}.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} index={i} accentColor={accentColor} />
            ))}
          </div>
        </div>
      </section>

      {/* Demo (optional) */}
      {demoComponent && (
        <section className="py-section-mobile md:py-section px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">See it in action</h2>
              <p className="text-dim text-lg">Try a live preview right here.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
            >
              {demoComponent}
            </motion.div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section ref={stepsRef} className="py-section-mobile md:py-section px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div style={{ y: stepsTitleY, opacity: stepsTitleOpacity }} className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">How it works</h2>
            <p className="text-dim text-lg">Up and running in days, not months.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.number}
                className="text-center md:text-left"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <span
                  className="block font-display text-6xl md:text-7xl font-extrabold leading-none mb-4 select-none"
                  style={{ color: `${accentColor}20` }}
                >
                  {step.number}
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-dim text-sm leading-relaxed max-w-xs mx-auto md:mx-0">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + CTA */}
      <section ref={benefitsRef} className="py-section-mobile md:py-section px-6 bg-bg-2">
        <div className="max-w-4xl mx-auto">
          <motion.div style={{ y: benefitsTitleY, opacity: benefitsTitleOpacity }} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">
              Why businesses choose this
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 bg-bg-card border border-border rounded-xl p-5"
              >
                <Check className="w-5 h-5 mt-0.5 shrink-0" style={{ color: accentColor }} />
                <span className="text-white text-sm">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-4">
              Ready to get started?
            </h3>
            <p className="text-dim mb-8 max-w-md mx-auto">
              Book a free call and we&apos;ll show you how {name} can transform your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                href="/contact"
                className="inline-flex items-center justify-center bg-accent text-white font-semibold rounded-pill px-8 py-4 text-base transition-all duration-300 hover:brightness-110"
              >
                Book a Free Call
              </MagneticButton>
              <MagneticButton
                href="/services"
                className="inline-flex items-center justify-center gap-2 border border-border text-dim font-semibold rounded-pill px-8 py-4 text-base transition-all duration-300 hover:text-white hover:border-white/20"
              >
                Explore All Services
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
