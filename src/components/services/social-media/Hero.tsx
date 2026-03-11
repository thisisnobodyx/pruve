'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import MagneticButton from '@/components/shared/MagneticButton';

const ACCENT = '#EC4899';

/* ─── Platform logos that orbit the feed ─── */
const platforms = [
  { name: 'Instagram', icon: '📸', color: '#E1306C' },
  { name: 'Twitter/X', icon: '𝕏', color: '#1DA1F2' },
  { name: 'LinkedIn', icon: 'in', color: '#0A66C2' },
  { name: 'TikTok', icon: '♪', color: '#69C9D0' },
  { name: 'Facebook', icon: 'f', color: '#1877F2' },
];

/* ─── Mock social post cards ─── */
function InstagramCard() {
  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden w-[260px] shrink-0">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400" />
        <span className="text-white text-xs font-medium">your_brand</span>
      </div>
      {/* Image placeholder */}
      <div className="w-full h-[160px] bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800" />
      {/* Actions */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-3 mb-1.5">
          <span className="text-sm">❤️ 2,847</span>
          <span className="text-sm">💬 184</span>
        </div>
        <p className="text-white/70 text-[11px] line-clamp-2">
          Exciting news! Our latest collection just dropped. Link in bio for exclusive early access...
        </p>
      </div>
    </div>
  );
}

function TwitterCard() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-4 w-[260px] shrink-0">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-[#1DA1F2]/20 flex items-center justify-center text-[11px] font-bold text-[#1DA1F2]">
          𝕏
        </div>
        <div>
          <span className="text-white text-xs font-medium">Your Brand</span>
          <span className="text-dim text-[11px] ml-1">@yourbrand</span>
        </div>
      </div>
      <p className="text-white/80 text-[12px] leading-relaxed mb-2">
        Just shipped our biggest update yet. 3 months of work, 47 features, 0 compromises. Thread below 🧵
      </p>
      <div className="flex items-center gap-4 text-dim text-[11px]">
        <span>🔁 312</span>
        <span>❤️ 1.2K</span>
        <span>📊 45K</span>
      </div>
    </div>
  );
}

function LinkedInCard() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-4 w-[260px] shrink-0">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-[#0A66C2]/20 flex items-center justify-center text-[11px] font-bold text-[#0A66C2]">
          in
        </div>
        <div>
          <span className="text-white text-xs font-medium">Your Brand</span>
          <span className="text-dim text-[11px] block">5,200 followers</span>
        </div>
      </div>
      <div className="bg-white/5 rounded-lg p-3 mb-2">
        <p className="text-white text-[11px] font-semibold mb-1">
          How We Scaled to 10K Users in 30 Days
        </p>
        <p className="text-dim text-[10px]">article &middot; 4 min read</p>
      </div>
      <div className="flex items-center gap-3 text-dim text-[11px]">
        <span>👍 847</span>
        <span>💬 92 comments</span>
      </div>
    </div>
  );
}

function TikTokCard() {
  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden w-[260px] shrink-0">
      <div className="relative h-[180px] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center">
        {/* Play icon */}
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
        </div>
        {/* View count */}
        <div className="absolute bottom-2 left-3 text-white text-[11px] font-medium">
          ▶ 234K views
        </div>
        {/* TikTok badge */}
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] text-white">
          ♪ TikTok
        </div>
      </div>
      <div className="p-3">
        <p className="text-white/70 text-[11px] line-clamp-1">
          POV: When your AI handles your social media 🤖✨
        </p>
      </div>
    </div>
  );
}

function FacebookCard() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-4 w-[260px] shrink-0">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-[#1877F2]/20 flex items-center justify-center text-[11px] font-bold text-[#1877F2]">
          f
        </div>
        <div>
          <span className="text-white text-xs font-medium">Your Brand</span>
          <span className="text-dim text-[11px] ml-1">&middot; Sponsored</span>
        </div>
      </div>
      <p className="text-white/80 text-[12px] leading-relaxed mb-2">
        Limited time offer: Get 20% off your first order. Over 5,000 happy customers and counting!
      </p>
      <div className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
        <div>
          <p className="text-white text-[11px] font-semibold">Shop Now</p>
          <p className="text-dim text-[10px]">yourbrand.com</p>
        </div>
        <div className="text-[10px] text-dim px-2 py-1 border border-border rounded">Learn More</div>
      </div>
    </div>
  );
}

const feedCards = [
  <InstagramCard key="ig" />,
  <TwitterCard key="tw" />,
  <LinkedInCard key="li" />,
  <TikTokCard key="tt" />,
  <FacebookCard key="fb" />,
];

/* ─── Orbiting platform logo ─── */
function OrbitingLogo({
  platform,
  index,
  total,
}: {
  platform: (typeof platforms)[number];
  index: number;
  total: number;
}) {
  const angle = (360 / total) * index;

  return (
    <motion.div
      className="absolute"
      style={{
        top: '50%',
        left: '50%',
      }}
      animate={{
        rotate: [angle, angle + 360],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <div
        className="absolute flex items-center justify-center w-10 h-10 rounded-full border backdrop-blur-sm"
        style={{
          transform: 'translateX(170px) translateY(-50%)',
          background: `${platform.color}15`,
          borderColor: `${platform.color}40`,
        }}
      >
        <motion.span
          className="text-sm font-bold"
          style={{ color: platform.color }}
          animate={{ rotate: [-(angle), -(angle + 360)] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {platform.icon}
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 6);
    rotateX.set(-y * 6);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 60% 40%, ${ACCENT}12 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto w-full">
        {/* Left -- Headline + CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-bg-card/50 mb-6"
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: ACCENT }} />
            <span className="text-dim text-xs font-mono uppercase tracking-wider">
              AI-Powered Social Media
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5">
            Your social media.{' '}
            <span style={{ color: ACCENT }}>On autopilot.</span>
          </h1>
          <p className="text-dim text-lg mb-8 max-w-md mx-auto lg:mx-0">
            AI that creates content, schedules posts, and grows your audience across every platform while you focus on your business.
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
            <MagneticButton
              href="#demo"
              className="px-8 py-4 rounded-full text-black font-semibold text-base transition-all hover:brightness-110"
              style={{ background: ACCENT }}
            >
              Try It Live
            </MagneticButton>
            <MagneticButton
              href="/pricing"
              className="px-8 py-4 rounded-full border border-border text-white font-semibold text-base hover:bg-white/5 transition-all"
            >
              View Pricing &rarr;
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right -- Auto-scrolling social feed with orbiting logos */}
        <div className="relative flex justify-center">
          {/* Orbiting platform logos */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            {platforms.map((p, i) => (
              <OrbitingLogo key={p.name} platform={p} index={i} total={platforms.length} />
            ))}
          </div>

          <motion.div
            style={{ rotateX, rotateY, perspective: 1200 }}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Feed container with vertical marquee */}
            <div
              className="relative h-[420px] w-[280px] overflow-hidden rounded-2xl border border-border bg-bg/80 backdrop-blur-sm group"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
              }}
            >
              <div
                className="flex flex-col gap-4 p-2.5 animate-scroll-up group-hover:[animation-play-state:paused]"
              >
                {/* Render cards twice for seamless loop */}
                {[...feedCards, ...feedCards].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="relative"
                  >
                    {/* Sparkle glow on appearance */}
                    <div
                      className="absolute -inset-1 rounded-xl opacity-0 animate-sparkle pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${ACCENT}20 0%, transparent 70%)`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                    {card}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-dim/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
