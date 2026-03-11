'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import MagneticButton from '@/components/shared/MagneticButton';
import TypewriterText from '@/components/shared/TypewriterText';

const ACCENT = '#F59E0B';

interface ContentFrame {
  id: string;
  label: string;
  text: string;
}

const contentFrames: ContentFrame[] = [
  {
    id: 'instagram',
    label: 'Instagram Caption',
    text: 'Discover our new collection \u2014 crafted for those who value quality over quantity. Link in bio \ud83d\udd17 #luxury #handmade',
  },
  {
    id: 'blog',
    label: 'Blog Post',
    text: '5 Ways AI Is Transforming Small Business Marketing in 2025 \u2014 From automated content creation to predictive analytics...',
  },
  {
    id: 'email',
    label: 'Email Subject',
    text: "Subject: Your exclusive early access is waiting \u2014 Don\u2019t miss 40% off this weekend only",
  },
  {
    id: 'linkedin',
    label: 'LinkedIn Post',
    text: "Excited to share that we\u2019ve helped 200+ businesses automate their content workflow this quarter. Here\u2019s what we learned...",
  },
];

/* ---- Phone-shaped frame (Instagram) ---- */
function PhoneFrame({ text }: { text: string }) {
  return (
    <div className="w-[260px] h-[440px] mx-auto rounded-[32px] border border-white/10 bg-[#1a1a1a] p-[10px] shadow-2xl shadow-black/60">
      <div className="relative bg-black rounded-[24px] overflow-hidden h-full flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-black w-[90px] h-[24px] rounded-b-xl flex items-center justify-center">
            <div className="w-[6px] h-[6px] rounded-full bg-[#1a1a1a] ring-1 ring-white/5" />
          </div>
        </div>
        {/* Instagram header */}
        <div className="pt-8 px-4 pb-2 flex items-center gap-2 border-b border-white/5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-pink-500" />
          <span className="text-white text-xs font-semibold">your_brand</span>
        </div>
        {/* Image placeholder */}
        <div className="flex-1 bg-gradient-to-br from-amber-900/30 to-amber-700/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
          </svg>
        </div>
        {/* Caption area */}
        <div className="p-3 space-y-1">
          <div className="flex items-center gap-3 mb-1">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.126A59.768 59.768 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.876L5.999 12Zm0 0h7.5" />
            </svg>
          </div>
          <p className="text-white text-[11px] leading-relaxed">
            <TypewriterText text={text} speed={30} key={text} />
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---- Browser-shaped frame (Blog) ---- */
function BlogFrame({ text }: { text: string }) {
  return (
    <div className="w-[340px] mx-auto rounded-xl border border-white/10 bg-[#1E1535] overflow-hidden shadow-2xl shadow-black/40">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#150E2B] border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-bg/60 rounded-md px-3 py-1 text-[10px] text-dim">yourbrand.com/blog</div>
        </div>
      </div>
      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full" style={{ background: `${ACCENT}30` }} />
          <span className="text-dim text-[10px]">Published 2 min ago</span>
        </div>
        <p className="text-white text-sm font-semibold leading-snug">
          <TypewriterText text={text} speed={25} key={text} />
        </p>
        <div className="flex gap-2 mt-3">
          <div className="h-2 w-full bg-white/5 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-2 w-3/4 bg-white/5 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-2 w-5/6 bg-white/5 rounded" />
        </div>
      </div>
    </div>
  );
}

/* ---- Email-style card ---- */
function EmailFrame({ text }: { text: string }) {
  return (
    <div className="w-[340px] mx-auto rounded-xl border border-white/10 bg-[#1E1535] overflow-hidden shadow-2xl shadow-black/40">
      {/* Email header */}
      <div className="px-5 py-3 bg-[#150E2B] border-b border-white/5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${ACCENT}20` }}>
          <svg className="w-4 h-4" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </div>
        <div>
          <div className="text-white text-xs font-medium">Your Brand</div>
          <div className="text-dim text-[10px]">to: customer@email.com</div>
        </div>
      </div>
      {/* Email body */}
      <div className="p-5">
        <p className="text-white text-sm font-semibold leading-snug mb-3">
          <TypewriterText text={text} speed={25} key={text} />
        </p>
        <div className="space-y-2 mt-4">
          <div className="h-2 w-full bg-white/5 rounded" />
          <div className="h-2 w-4/5 bg-white/5 rounded" />
          <div className="h-2 w-3/5 bg-white/5 rounded" />
        </div>
        <div
          className="mt-4 inline-block px-4 py-2 rounded-full text-black text-xs font-semibold"
          style={{ background: ACCENT }}
        >
          Shop Now
        </div>
      </div>
    </div>
  );
}

/* ---- LinkedIn-style card ---- */
function LinkedInFrame({ text }: { text: string }) {
  return (
    <div className="w-[340px] mx-auto rounded-xl border border-white/10 bg-[#1E1535] overflow-hidden shadow-2xl shadow-black/40">
      {/* LinkedIn header */}
      <div className="px-5 py-3 flex items-center gap-3 border-b border-white/5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
          <span className="text-white text-xs font-bold">YB</span>
        </div>
        <div>
          <div className="text-white text-xs font-semibold">Your Brand</div>
          <div className="text-dim text-[10px]">1,234 followers</div>
          <div className="text-dim text-[10px]">Just now</div>
        </div>
      </div>
      {/* Post body */}
      <div className="p-5">
        <p className="text-white text-[13px] leading-relaxed">
          <TypewriterText text={text} speed={25} key={text} />
        </p>
        {/* Engagement bar */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5 text-dim text-[10px]">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m7.723 2.27V18.75m0 0H13.5" />
            </svg>
            Like
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
            Comment
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.935-2.186 2.25 2.25 0 0 0-3.935 2.186Z" />
            </svg>
            Share
          </span>
        </div>
      </div>
    </div>
  );
}

const frameComponents = [PhoneFrame, BlogFrame, EmailFrame, LinkedInFrame];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % contentFrames.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, 4000);
    return () => clearInterval(timer);
  }, [advance]);

  const current = contentFrames[activeIndex];
  const FrameComponent = frameComponents[activeIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
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
            <span className="text-dim text-xs font-mono uppercase tracking-wider">AI-POWERED CONTENT</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-5">
            Your content engine.{' '}
            <span style={{ color: ACCENT }}>Always running.</span>
          </h1>
          <p className="text-dim text-lg mb-8 max-w-md mx-auto lg:mx-0">
            AI-generated blog posts, social captions, email campaigns, and ad copy &mdash; tailored to your brand voice and delivered on autopilot.
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

        {/* Right -- Morphing content frames */}
        <div className="relative flex justify-center">
          {/* Ambient glow behind the frame */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: ACCENT }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Content type indicator pills */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {contentFrames.map((frame, i) => (
                <button
                  key={frame.id}
                  onClick={() => setActiveIndex(i)}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all ${
                    i === activeIndex
                      ? 'text-black'
                      : 'text-dim bg-bg-card border border-border hover:text-white'
                  }`}
                  style={i === activeIndex ? { background: ACCENT } : {}}
                >
                  {frame.label}
                </button>
              ))}
            </div>

            {/* AnimatePresence for morphing frames */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                layoutId="content-frame"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <FrameComponent text={current.text} />
              </motion.div>
            </AnimatePresence>
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
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-6 h-6 text-dim/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
