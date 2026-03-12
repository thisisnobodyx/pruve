'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import MagneticButton from '@/components/shared/MagneticButton';
import ParticleNetwork from '@/components/shared/ParticleNetwork';

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });

  // Heading scales from 0.8 to 1.0 as it enters the viewport
  const headingScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="py-section-mobile md:py-section px-6 relative overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleNetwork
        className="absolute inset-0 w-full h-full z-0"
        particleCount={80}
        interactive
      />

      {/* Gradient overlay — fades particles at edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg z-[1] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Heading — scales in on scroll */}
        <motion.div
          style={{ scale: headingScale, opacity: headingOpacity }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-6 text-white">
            Ready to hire your AI Employee?
          </h2>
        </motion.div>

        <ScrollReveal delay={0.1}>
          <p className="text-dim text-xl mb-10">
            See what your AI Employee can do for your specific business — in 60 seconds.
          </p>
        </ScrollReveal>

        {/* Buttons — fade in from below with bounce easing */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.25,
            ease: [0.34, 1.56, 0.64, 1], // bounce easing
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Pulsing glow ring behind primary CTA */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-pill bg-accent/20 blur-xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <MagneticButton
              href="/contact"
              className="relative inline-flex items-center justify-center bg-accent text-white font-medium rounded-pill px-8 py-4 text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(124, 58, 237,0.3)] hover:brightness-110"
            >
              Book a Free Call
            </MagneticButton>
          </div>

          <MagneticButton
            href="/experience"
            className="inline-flex items-center justify-center bg-transparent border border-border text-white font-medium rounded-pill px-8 py-4 text-lg transition-all duration-300 hover:bg-white/5 hover:border-white/15"
          >
            Experience It Live
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
