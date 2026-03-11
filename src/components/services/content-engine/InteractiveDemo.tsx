'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Copy, RefreshCw, Sparkles } from 'lucide-react';

const ACCENT = '#F59E0B';

const industries = ['Tech', 'Restaurant', 'Fitness', 'Real Estate', 'Fashion', 'Healthcare'] as const;
type Industry = (typeof industries)[number];

const contentTypes = ['Blog Intro', 'Instagram Caption', 'Email Subject', 'LinkedIn Post', 'Ad Copy'] as const;
type ContentType = (typeof contentTypes)[number];

const systemPrompts: Record<ContentType, (name: string, industry: Industry) => string> = {
  'Blog Intro': (name, industry) =>
    `Generate a compelling blog post introduction for a ${industry} business called "${name}". Include a hook, context, and a transition to the main content. Keep it to 2-3 sentences. Write in a professional yet engaging tone.`,
  'Instagram Caption': (name, industry) =>
    `Generate a professional Instagram caption for a ${industry} business called "${name}". Include relevant emojis and 3-5 hashtags. Keep under 150 characters for the main caption.`,
  'Email Subject': (name, industry) =>
    `Generate 3 compelling email subject lines for a ${industry} business called "${name}". Each should be under 60 characters, create urgency or curiosity, and be optimized for open rates. Format as a numbered list.`,
  'LinkedIn Post': (name, industry) =>
    `Generate a professional LinkedIn post for a ${industry} business called "${name}". Include a strong opening hook, 2-3 sentences of value, and a call to action. Use line breaks for readability. Keep under 200 words.`,
  'Ad Copy': (name, industry) =>
    `Generate a short, punchy ad copy for a ${industry} business called "${name}". Include a headline (under 30 chars), body (under 90 chars), and a call to action. Format with labels: Headline, Body, CTA.`,
};

/* ---- Mockup frames for each content type ---- */

function BlogMockup({ content }: { content: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#1E1535] overflow-hidden">
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
      <div className="p-5">
        <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}

function InstagramMockup({ content }: { content: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#1E1535] overflow-hidden max-w-sm mx-auto">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-2 border-b border-white/5">
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-pink-500" />
        <span className="text-white text-xs font-semibold">your_brand</span>
      </div>
      {/* Image placeholder */}
      <div className="aspect-square bg-gradient-to-br from-amber-900/20 to-amber-700/10 flex items-center justify-center">
        <svg className="w-12 h-12 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
        </svg>
      </div>
      {/* Caption */}
      <div className="p-4">
        <p className="text-white text-xs leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}

function EmailMockup({ content }: { content: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#1E1535] overflow-hidden">
      <div className="px-5 py-3 bg-[#150E2B] border-b border-white/5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${ACCENT}20` }}>
          <svg className="w-4 h-4" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </div>
        <div>
          <div className="text-white text-xs font-medium">Email Subject Lines</div>
          <div className="text-dim text-[10px]">Optimized for open rates</div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}

function LinkedInMockup({ content }: { content: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#1E1535] overflow-hidden">
      <div className="px-5 py-3 flex items-center gap-3 border-b border-white/5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
          <span className="text-white text-xs font-bold">YB</span>
        </div>
        <div>
          <div className="text-white text-xs font-semibold">Your Brand</div>
          <div className="text-dim text-[10px]">Just now</div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}

function AdCopyMockup({ content }: { content: string }) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: `${ACCENT}30` }}>
      <div
        className="px-5 py-3 text-center text-[10px] font-mono uppercase tracking-wider"
        style={{ background: `${ACCENT}10`, color: ACCENT }}
      >
        Sponsored Ad Preview
      </div>
      <div className="bg-[#1E1535] p-5">
        <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        <div
          className="mt-4 inline-block px-5 py-2 rounded-full text-black text-xs font-semibold"
          style={{ background: ACCENT }}
        >
          Learn More
        </div>
      </div>
    </div>
  );
}

const mockupComponents: Record<ContentType, React.FC<{ content: string }>> = {
  'Blog Intro': BlogMockup,
  'Instagram Caption': InstagramMockup,
  'Email Subject': EmailMockup,
  'LinkedIn Post': LinkedInMockup,
  'Ad Copy': AdCopyMockup,
};

export default function InteractiveDemo() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState<Industry>('Tech');
  const [contentType, setContentType] = useState<ContentType>('Blog Intro');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const sectionScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  async function generate() {
    if (!businessName.trim() || loading) return;
    setLoading(true);
    setGeneratedContent('');
    setCopied(false);

    try {
      const systemPrompt = systemPrompts[contentType](businessName.trim(), industry);
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: `Generate ${contentType.toLowerCase()} content for my ${industry.toLowerCase()} business called "${businessName.trim()}".` }],
          systemPrompt,
        }),
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      setGeneratedContent(data.content || 'Unable to generate content. Please try again.');
    } catch {
      setGeneratedContent('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }

  const MockupComponent = mockupComponents[contentType];

  return (
    <section ref={sectionRef} id="demo" className="py-section px-6 bg-bg-2">
      <motion.div style={{ opacity: sectionOpacity, scale: sectionScale }} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            LIVE DEMO
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Generate content. <span style={{ color: ACCENT }}>Right now.</span>
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            Enter your business details, pick a content type, and see AI-generated content instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left -- Controls */}
          <div className="space-y-6">
            {/* Business name */}
            <div>
              <label className="text-dim text-xs font-mono uppercase tracking-wide mb-2 block">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Sunrise Cafe"
                className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-dim/50 outline-none focus:border-white/20 transition-colors"
              />
            </div>

            {/* Industry chips */}
            <div>
              <label className="text-dim text-xs font-mono uppercase tracking-wide mb-3 block">Industry</label>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setIndustry(ind)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      industry === ind
                        ? 'text-black'
                        : 'bg-bg-card border border-border text-dim hover:text-white hover:border-white/20'
                    }`}
                    style={industry === ind ? { background: ACCENT } : {}}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            {/* Content type tabs */}
            <div>
              <label className="text-dim text-xs font-mono uppercase tracking-wide mb-3 block">Content Type</label>
              <div className="flex flex-wrap gap-2">
                {contentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setContentType(type);
                      setGeneratedContent('');
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      contentType === type
                        ? 'text-black'
                        : 'bg-bg-card border border-border text-dim hover:text-white hover:border-white/20'
                    }`}
                    style={contentType === type ? { background: ACCENT } : {}}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={generate}
              disabled={!businessName.trim() || loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-black font-semibold text-base transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: ACCENT }}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate
                </>
              )}
            </button>

            {/* Powered by badge */}
            <div className="flex items-center gap-2 text-dim/50 text-xs">
              <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
              Powered by Pruve AI &mdash; Responses from Claude
            </div>
          </div>

          {/* Right -- Generated content */}
          <div>
            {generatedContent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <MockupComponent content={generatedContent} />

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={generate}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card border border-border text-dim text-sm hover:text-white hover:border-white/20 transition-all disabled:opacity-40"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card border border-border text-dim text-sm hover:text-white hover:border-white/20 transition-all"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/10 bg-bg-card/30 flex flex-col items-center justify-center p-12 text-center min-h-[300px]">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${ACCENT}10` }}
                >
                  <Sparkles className="w-8 h-8" style={{ color: `${ACCENT}60` }} />
                </div>
                <p className="text-dim text-sm">
                  {loading ? 'Generating your content...' : 'Enter your details and hit Generate to see AI content here.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
