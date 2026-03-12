'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Copy,
  Check,
  Loader2,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
} from 'lucide-react';

const ACCENT = '#EC4899';

const industries = ['Restaurant', 'Fitness', 'E-commerce', 'Real Estate', 'Tech Startup'] as const;
const vibes = ['Professional', 'Casual', 'Bold', 'Witty'] as const;

type Industry = (typeof industries)[number];
type Vibe = (typeof vibes)[number];

interface CalendarDay {
  day: string;
  platform: string;
  caption: string;
  hashtags: string;
}

function getPlatformIcon(platform: string) {
  const lower = platform.toLowerCase();
  if (lower.includes('instagram')) return <Instagram className="w-4 h-4" />;
  if (lower.includes('linkedin')) return <Linkedin className="w-4 h-4" />;
  if (lower.includes('twitter') || lower.includes('x')) return <Twitter className="w-4 h-4" />;
  if (lower.includes('facebook')) return <Facebook className="w-4 h-4" />;
  if (lower.includes('tiktok')) return <span className="text-sm font-bold">&#9835;</span>;
  return <Calendar className="w-4 h-4" />;
}

function getPlatformColor(platform: string) {
  const lower = platform.toLowerCase();
  if (lower.includes('instagram')) return '#E1306C';
  if (lower.includes('linkedin')) return '#0A66C2';
  if (lower.includes('twitter') || lower.includes('x')) return '#1DA1F2';
  if (lower.includes('facebook')) return '#1877F2';
  if (lower.includes('tiktok')) return '#69C9D0';
  return ACCENT;
}

function getDayAbbr(day: string) {
  return day.slice(0, 3).toUpperCase();
}

export default function InteractiveDemo() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState<Industry>('Restaurant');
  const [vibe, setVibe] = useState<Vibe>('Professional');
  const [loading, setLoading] = useState(false);
  const [calendar, setCalendar] = useState<CalendarDay[] | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const sectionScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  async function generateCalendar() {
    if (!businessName.trim() || loading) return;
    setLoading(true);
    setCalendar(null);
    setExpandedDay(null);

    try {
      const systemPrompt = `You are a social media content strategist. Generate a 7-day social media content calendar for a ${industry} business called "${businessName.trim()}" with a ${vibe.toLowerCase()} tone.

Return ONLY a valid JSON array of exactly 7 objects. Each object must have these exact keys:
- "day": one of "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
- "platform": one of "Instagram", "Twitter", "LinkedIn", "Facebook", "TikTok" (vary across the week)
- "caption": a compelling post caption (50-120 characters)
- "hashtags": 3-4 relevant hashtags as a single string (e.g. "#food #restaurant #yum")

Return ONLY the JSON array. No markdown, no explanation, no code fences.`;

      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Generate my 7-day content calendar now.' }],
          systemPrompt,
        }),
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();

      const content = data.content || '';
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as CalendarDay[];
        if (Array.isArray(parsed) && parsed.length === 7) {
          setCalendar(parsed);
        } else {
          throw new Error('Invalid calendar data');
        }
      } else {
        throw new Error('Could not parse calendar data');
      }
    } catch {
      // Fallback calendar
      const tag = industry.replace(/[\s-]+/g, '');
      setCalendar([
        { day: 'Monday', platform: 'Instagram', caption: `Start your week strong with ${businessName}! New energy, new goals.`, hashtags: `#MondayMotivation #${tag} #NewWeek` },
        { day: 'Tuesday', platform: 'Twitter', caption: `Quick tip Tuesday: Here&apos;s how ${businessName} makes your life easier.`, hashtags: `#TipTuesday #${tag} #ProTips` },
        { day: 'Wednesday', platform: 'LinkedIn', caption: `Behind the scenes at ${businessName} \u2014 our team is what makes us special.`, hashtags: `#BehindTheScenes #TeamWork #${tag}` },
        { day: 'Thursday', platform: 'Facebook', caption: `Throwback to one of our proudest moments at ${businessName}.`, hashtags: `#TBT #Throwback #${tag}` },
        { day: 'Friday', platform: 'TikTok', caption: `Friday vibes at ${businessName}! Who is ready for the weekend?`, hashtags: `#FridayVibes #WeekendReady #${tag}` },
        { day: 'Saturday', platform: 'Instagram', caption: `Weekend special from ${businessName} \u2014 you do not want to miss this!`, hashtags: `#WeekendVibes #Special #${tag}` },
        { day: 'Sunday', platform: 'LinkedIn', caption: `Setting goals for the week ahead. ${businessName} is ready to deliver.`, hashtags: `#SundayPrep #Goals #${tag}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy(index: number) {
    if (!calendar) return;
    const day = calendar[index];
    const text = `${day.caption}\n\n${day.hashtags}`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  return (
    <section ref={sectionRef} id="demo" className="py-section px-6 bg-bg-2">
      <motion.div
        style={{ opacity: sectionOpacity, scale: sectionScale }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="font-mono text-sm tracking-widest uppercase mb-3 block"
            style={{ color: ACCENT }}
          >
            INTERACTIVE DEMO
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Generate a week of{' '}
            <span style={{ color: ACCENT }}>content.</span>
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            Enter your business details and let AI create a full 7-day content
            calendar optimized for every platform.
          </p>
        </div>

        {/* Inputs */}
        <div className="max-w-2xl mx-auto space-y-6 mb-10">
          {/* Business name */}
          <div>
            <label className="text-dim text-xs font-mono uppercase tracking-wide mb-2 block">
              Business Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Sunrise Cafe"
              className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-white placeholder:text-dim/50 outline-none focus:border-white/20 transition-colors"
              onKeyDown={(e) => {
                if (e.key === 'Enter') generateCalendar();
              }}
            />
          </div>

          {/* Industry chips */}
          <div>
            <label className="text-dim text-xs font-mono uppercase tracking-wide mb-2 block">
              Industry
            </label>
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

          {/* Vibe chips */}
          <div>
            <label className="text-dim text-xs font-mono uppercase tracking-wide mb-2 block">
              Vibe
            </label>
            <div className="flex flex-wrap gap-2">
              {vibes.map((v) => (
                <button
                  key={v}
                  onClick={() => setVibe(v)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    vibe === v
                      ? 'text-black'
                      : 'bg-bg-card border border-border text-dim hover:text-white hover:border-white/20'
                  }`}
                  style={vibe === v ? { background: ACCENT } : {}}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={generateCalendar}
            disabled={!businessName.trim() || loading}
            className="w-full py-4 rounded-full text-black font-semibold text-base transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ background: ACCENT }}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating your week...
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5" />
                Generate Week
              </>
            )}
          </button>
        </div>

        {/* Calendar grid */}
        <AnimatePresence mode="wait">
          {calendar && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3"
            >
              {calendar.map((day, i) => {
                const platformColor = getPlatformColor(day.platform);
                const isExpanded = expandedDay === i;

                return (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.12,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    style={{ perspective: 800 }}
                    layout
                    onClick={() => setExpandedDay(isExpanded ? null : i)}
                    className={`bg-bg-card border border-border rounded-xl p-4 cursor-pointer transition-all hover:border-white/15 ${
                      isExpanded
                        ? 'col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-7'
                        : ''
                    }`}
                  >
                    {/* Day badge + platform icon */}
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                        style={{
                          color: platformColor,
                          background: `${platformColor}15`,
                        }}
                      >
                        {getDayAbbr(day.day)}
                      </div>
                      <div
                        className="flex items-center gap-1"
                        style={{ color: platformColor }}
                      >
                        {getPlatformIcon(day.platform)}
                      </div>
                    </div>

                    {/* Platform name */}
                    <div
                      className="text-xs font-medium mb-2"
                      style={{ color: platformColor }}
                    >
                      {day.platform}
                    </div>

                    {/* Caption */}
                    <p
                      className={`text-white text-xs leading-relaxed mb-2 ${
                        isExpanded ? '' : 'line-clamp-3'
                      }`}
                    >
                      {day.caption}
                    </p>

                    {/* Hashtags */}
                    <p
                      className="text-[10px] leading-relaxed"
                      style={{ color: `${ACCENT}cc` }}
                    >
                      {day.hashtags}
                    </p>

                    {/* Expanded: full caption + copy button */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-border"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(i);
                            }}
                            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-border hover:bg-white/5 transition-all"
                            style={{
                              color: copiedIndex === i ? ACCENT : 'white',
                            }}
                          >
                            {copiedIndex === i ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                Copy Caption
                              </>
                            )}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Powered by */}
        {calendar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-2 text-dim/50 text-xs mt-6"
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: ACCENT }}
            />
            Powered by Pruve AI
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
