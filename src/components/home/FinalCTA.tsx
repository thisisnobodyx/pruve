'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';
import MagneticButton from '@/components/shared/MagneticButton';
import ParticleNetwork from '@/components/shared/ParticleNetwork';

export default function FinalCTA() {
  return (
    <section className="py-section px-6 relative overflow-hidden">
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
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-6 text-white">
            Ready to automate your business?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-dim text-xl mb-10">
            Join 200+ businesses running smarter with Pruve.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              href="/contact"
              className="inline-flex items-center justify-center bg-accent text-white font-medium rounded-pill px-8 py-4 text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(124, 58, 237,0.3)] hover:brightness-110"
            >
              Book a Free Call
            </MagneticButton>

            <MagneticButton
              href="/pricing"
              className="inline-flex items-center justify-center bg-transparent border border-border text-white font-medium rounded-pill px-8 py-4 text-lg transition-all duration-300 hover:bg-white/5 hover:border-white/15"
            >
              View Pricing
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
