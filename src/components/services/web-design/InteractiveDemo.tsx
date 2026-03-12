'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import BrowserMockup from '@/components/shared/BrowserMockup';

const ACCENT = '#7C3AED';

interface StyleOption {
  id: string;
  label: string;
  emoji: string;
  primary: string;
  secondary: string;
  font: string;
  layout: 'centered' | 'split' | 'magazine';
}

const styleOptions: StyleOption[] = [
  { id: 'modern', label: 'Modern & Bold', emoji: '🔥', primary: '#7C3AED', secondary: '#C8F135', font: 'Sharp', layout: 'centered' },
  { id: 'elegant', label: 'Elegant & Clean', emoji: '✨', primary: '#C9A84C', secondary: '#FFFFFF', font: 'Serif', layout: 'split' },
  { id: 'vibrant', label: 'Vibrant & Fun', emoji: '🎨', primary: '#EC4899', secondary: '#7DF9C0', font: 'Rounded', layout: 'magazine' },
  { id: 'minimal', label: 'Minimal & Dark', emoji: '🖤', primary: '#FFFFFF', secondary: '#666666', font: 'Mono', layout: 'centered' },
];

interface Industry {
  id: string;
  label: string;
  emoji: string;
  headline: string;
  sub: string;
  cards: string[];
}

const industries: Industry[] = [
  { id: 'restaurant', label: 'Restaurant', emoji: '🍕', headline: 'Farm to Table Dining', sub: 'Reservations · Menu · Events', cards: ['Book a Table', 'View Menu', 'Private Events'] },
  { id: 'fitness', label: 'Fitness', emoji: '💪', headline: 'Transform Your Body', sub: 'Classes · Memberships · Trainers', cards: ['Join Now', 'Class Schedule', 'Free Trial'] },
  { id: 'agency', label: 'Agency', emoji: '🚀', headline: 'We Build Brands', sub: 'Strategy · Design · Growth', cards: ['Our Work', 'Services', 'Get Quote'] },
  { id: 'salon', label: 'Salon', emoji: '💇', headline: 'Look Your Best', sub: 'Cuts · Color · Styling', cards: ['Book Now', 'Our Team', 'Gallery'] },
];

function LivePreview({ style, industry }: { style: StyleOption; industry: Industry }) {
  return (
    <div
      className="h-[380px] overflow-hidden transition-colors duration-500 relative"
      style={{ background: style.id === 'minimal' ? '#111' : '#0f0a1a' }}
    >
      <div className="p-5 h-full flex flex-col">
        {/* Nav */}
        <motion.div
          key={`nav-${style.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between mb-6"
        >
          <div
            className="h-3 rounded font-bold"
            style={{
              width: style.font === 'Mono' ? 60 : 80,
              background: `${style.primary}60`,
            }}
          />
          <div className="flex gap-3 items-center">
            <div className="w-8 h-1.5 rounded bg-white/10" />
            <div className="w-8 h-1.5 rounded bg-white/10" />
            <div
              className="w-16 h-6 rounded-full text-[9px] flex items-center justify-center font-bold"
              style={{ background: style.primary, color: style.id === 'minimal' ? '#000' : '#fff' }}
            >
              Contact
            </div>
          </div>
        </motion.div>

        {/* Hero */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`hero-${style.id}-${industry.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className={`flex-1 flex ${style.layout === 'split' ? 'flex-row items-center gap-6' : 'flex-col'} ${style.layout === 'centered' ? 'items-center text-center' : ''}`}
          >
            <div className={style.layout === 'split' ? 'flex-1' : ''}>
              {/* Industry tag */}
              <motion.div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border mb-3 text-[9px]"
                style={{ borderColor: `${style.primary}30`, color: style.primary }}
              >
                <span>{industry.emoji}</span>
                <span className="uppercase tracking-wider font-bold">{industry.label}</span>
              </motion.div>

              {/* Headline */}
              <div
                className="text-lg font-extrabold leading-tight mb-2"
                style={{ color: style.primary === '#FFFFFF' ? '#fff' : style.primary }}
              >
                {industry.headline}
              </div>
              <div className="text-white/40 text-[11px] mb-4">{industry.sub}</div>

              {/* CTA */}
              <div className="flex gap-2">
                <motion.div
                  className="px-4 py-2 rounded-full text-[10px] font-bold"
                  style={{
                    background: style.primary,
                    color: style.id === 'minimal' ? '#000' : '#fff',
                  }}
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    boxShadow: [
                      `0 0 0px ${style.primary}00`,
                      `0 0 25px ${style.primary}50`,
                      `0 0 0px ${style.primary}00`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Get Started
                </motion.div>
                <div className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-[10px]">
                  Learn More
                </div>
              </div>
            </div>

            {style.layout === 'split' && (
              <div
                className="w-28 h-28 rounded-2xl"
                style={{ background: `linear-gradient(135deg, ${style.primary}30, ${style.secondary}20)` }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Cards row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`cards-${style.id}-${industry.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className={`grid ${style.layout === 'magazine' ? 'grid-cols-2' : 'grid-cols-3'} gap-2 mt-auto`}
          >
            {industry.cards.map((card, i) => (
              <motion.div
                key={card}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="rounded-lg p-3 border"
                style={{
                  borderColor: `${style.primary}15`,
                  background: `${style.primary}05`,
                }}
              >
                <div className="w-5 h-5 rounded mb-2" style={{ background: `${style.secondary}25` }} />
                <div className="text-white text-[10px] font-bold">{card}</div>
                <div className="w-full h-1 rounded bg-white/5 mt-1.5" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Accent glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${style.primary}10 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}

export default function InteractiveDemo() {
  const [selectedStyle, setSelectedStyle] = useState(styleOptions[0]);
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} id="demo" className="py-section px-6 bg-bg-2">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center mb-12">
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            LIVE CONFIGURATOR
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Design it your way.
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            Pick a style and industry — watch your website come to life instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Controls panel */}
          <div className="space-y-6">
            {/* Style selector */}
            <div>
              <h4 className="text-white text-sm font-bold mb-3 uppercase tracking-wider">Style</h4>
              <div className="space-y-2">
                {styleOptions.map((opt) => (
                  <motion.button
                    key={opt.id}
                    onClick={() => setSelectedStyle(opt)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                      selectedStyle.id === opt.id
                        ? 'border-white/20 bg-white/5'
                        : 'border-border hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className="text-lg">{opt.emoji}</span>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{opt.label}</div>
                      <div className="text-dim text-[10px] mt-0.5">{opt.font} · {opt.layout}</div>
                    </div>
                    {selectedStyle.id === opt.id && (
                      <motion.div
                        layoutId="style-check"
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: opt.primary }}
                      >
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Industry selector */}
            <div>
              <h4 className="text-white text-sm font-bold mb-3 uppercase tracking-wider">Industry</h4>
              <div className="grid grid-cols-2 gap-2">
                {industries.map((ind) => (
                  <motion.button
                    key={ind.id}
                    onClick={() => setSelectedIndustry(ind)}
                    whileTap={{ scale: 0.95 }}
                    className={`text-center px-3 py-3 rounded-xl border transition-all ${
                      selectedIndustry.id === ind.id
                        ? 'border-white/20 bg-white/5'
                        : 'border-border hover:border-white/10'
                    }`}
                  >
                    <div className="text-xl mb-1">{ind.emoji}</div>
                    <div className="text-white text-[11px] font-medium">{ind.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Color preview */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-bg-card border border-border">
              <div className="w-6 h-6 rounded-full border border-white/10" style={{ background: selectedStyle.primary }} />
              <div className="w-6 h-6 rounded-full border border-white/10" style={{ background: selectedStyle.secondary }} />
              <span className="text-dim text-xs ml-2">Active palette</span>
            </div>
          </div>

          {/* Live preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <BrowserMockup url={`${selectedIndustry.id}.pruve.co`} className="w-full">
              <LivePreview style={selectedStyle} industry={selectedIndustry} />
            </BrowserMockup>

            {/* Powered by */}
            <div className="mt-4 text-center">
              <span className="text-dim text-xs">Powered by Pruve AI</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
