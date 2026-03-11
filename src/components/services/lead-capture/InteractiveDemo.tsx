'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { LoaderCircle, Crosshair } from 'lucide-react';

const ACCENT = '#C8F135';

const sources = ['Website', 'Social Media', 'Referral', 'Google Ads', 'Cold Outreach'] as const;
const companySizes = ['1-10', '11-50', '51-200', '200+'] as const;

type Source = (typeof sources)[number];
type CompanySize = (typeof companySizes)[number];

interface ScoreResult {
  score: number;
  temperature: string;
  actions: string[];
}

function getTemperatureColor(temp: string) {
  switch (temp.toLowerCase()) {
    case 'hot':
      return '#FF4545';
    case 'warm':
      return '#F59E0B';
    case 'cold':
      return '#60A5FA';
    default:
      return ACCENT;
  }
}

/* ─── Circular progress ring ─── */
function ScoreRing({ score, temperature }: { score: number; temperature: string }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = score / 100;
  const offset = circumference * (1 - progress);
  const color = getTemperatureColor(temperature);

  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 140 140" className="w-44 h-44 -rotate-90">
        {/* Background circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          <span className="text-4xl font-extrabold text-white tabular-nums">{score}</span>
        </motion.div>
        <span className="text-dim text-xs mt-1">out of 100</span>
      </div>
    </div>
  );
}

export default function InteractiveDemo() {
  const [source, setSource] = useState<Source>('Website');
  const [pagesVisited, setPagesVisited] = useState(5);
  const [timeOnSite, setTimeOnSite] = useState(10);
  const [emailProvided, setEmailProvided] = useState(false);
  const [companySize, setCompanySize] = useState<CompanySize>('11-50');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const sectionScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  async function scoreLead() {
    if (loading) return;
    setLoading(true);
    setResult(null);

    try {
      const systemPrompt = `You are a lead scoring AI. Score this lead from 0-100 based on these details:
- Source: ${source}
- Pages visited: ${pagesVisited}
- Time on site: ${timeOnSite} minutes
- Email provided: ${emailProvided ? 'Yes' : 'No'}
- Company size: ${companySize} employees

Return ONLY a JSON object (no other text) with these exact keys:
- "score": number from 0-100
- "temperature": exactly one of "Cold", "Warm", or "Hot" (Cold < 30, Warm 30-70, Hot > 70)
- "actions": array of exactly 3 short suggested follow-up action strings (each under 60 chars)

Example: {"score": 75, "temperature": "Hot", "actions": ["Send personalized demo invite", "Assign to senior sales rep", "Trigger premium nurture sequence"]}`;

      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Score this lead.' }],
          systemPrompt,
        }),
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();

      const content = data.content || '';
      // Try to extract JSON object from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as ScoreResult;
        // Validate and normalize
        const score = Math.max(0, Math.min(100, Math.round(parsed.score || 0)));
        let temperature = parsed.temperature || 'Warm';
        if (!['Cold', 'Warm', 'Hot'].includes(temperature)) {
          temperature = score < 30 ? 'Cold' : score <= 70 ? 'Warm' : 'Hot';
        }
        const actions = Array.isArray(parsed.actions)
          ? parsed.actions.slice(0, 3)
          : ['Follow up within 24 hours', 'Add to nurture campaign', 'Send relevant case study'];

        setResult({ score, temperature, actions });
      } else {
        throw new Error('Could not parse score data');
      }
    } catch {
      // Fallback scoring logic
      let score = 30;
      if (source === 'Referral') score += 20;
      else if (source === 'Google Ads') score += 15;
      else if (source === 'Website') score += 10;
      else if (source === 'Social Media') score += 8;

      score += Math.min(pagesVisited * 2, 20);
      score += Math.min(timeOnSite * 1.5, 20);
      if (emailProvided) score += 15;
      if (companySize === '200+') score += 10;
      else if (companySize === '51-200') score += 7;
      else if (companySize === '11-50') score += 4;

      score = Math.min(100, Math.round(score));
      const temperature = score < 30 ? 'Cold' : score <= 70 ? 'Warm' : 'Hot';

      setResult({
        score,
        temperature,
        actions: [
          score > 70
            ? 'Assign to senior sales rep immediately'
            : 'Add to automated nurture sequence',
          emailProvided
            ? 'Send personalized follow-up email'
            : 'Retarget with lead capture form',
          'Schedule follow-up in CRM pipeline',
        ],
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section ref={sectionRef} id="demo" className="py-section px-6 bg-bg-2">
      <motion.div
        style={{ opacity: sectionOpacity, scale: sectionScale }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            LEAD SCORE CALCULATOR
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Score any lead{' '}
            <span style={{ color: ACCENT }}>instantly.</span>
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            Enter lead details and watch our AI qualify and score them in real-time with actionable next steps.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left: Inputs */}
          <div className="space-y-6">
            {/* Source dropdown */}
            <div>
              <label className="text-dim text-xs font-mono uppercase tracking-wide mb-2 block">
                Lead Source
              </label>
              <div className="flex flex-wrap gap-2">
                {sources.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSource(s)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      source === s
                        ? 'text-black'
                        : 'bg-bg-card border border-border text-dim hover:text-white hover:border-white/20'
                    }`}
                    style={source === s ? { background: ACCENT } : {}}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Pages visited slider */}
            <div>
              <label className="text-dim text-xs font-mono uppercase tracking-wide mb-2 block">
                Pages Visited: <span className="text-white font-bold">{pagesVisited}</span>
              </label>
              <input
                type="range"
                min={1}
                max={20}
                value={pagesVisited}
                onChange={(e) => setPagesVisited(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${ACCENT} 0%, ${ACCENT} ${(pagesVisited / 20) * 100}%, rgba(255,255,255,0.08) ${(pagesVisited / 20) * 100}%, rgba(255,255,255,0.08) 100%)`,
                }}
              />
              <div className="flex justify-between text-dim text-[10px] mt-1">
                <span>1</span>
                <span>20</span>
              </div>
            </div>

            {/* Time on site slider */}
            <div>
              <label className="text-dim text-xs font-mono uppercase tracking-wide mb-2 block">
                Time on Site: <span className="text-white font-bold">{timeOnSite} min</span>
              </label>
              <input
                type="range"
                min={0}
                max={30}
                value={timeOnSite}
                onChange={(e) => setTimeOnSite(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${ACCENT} 0%, ${ACCENT} ${(timeOnSite / 30) * 100}%, rgba(255,255,255,0.08) ${(timeOnSite / 30) * 100}%, rgba(255,255,255,0.08) 100%)`,
                }}
              />
              <div className="flex justify-between text-dim text-[10px] mt-1">
                <span>0 min</span>
                <span>30 min</span>
              </div>
            </div>

            {/* Email provided checkbox */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  className="w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all"
                  style={{
                    borderColor: emailProvided ? ACCENT : 'rgba(255,255,255,0.15)',
                    background: emailProvided ? ACCENT : 'transparent',
                  }}
                >
                  {emailProvided && (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="black" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={emailProvided}
                  onChange={(e) => setEmailProvided(e.target.checked)}
                  className="sr-only"
                />
                <span className="text-dim text-sm group-hover:text-white transition-colors">
                  Email Provided
                </span>
              </label>
            </div>

            {/* Company size */}
            <div>
              <label className="text-dim text-xs font-mono uppercase tracking-wide mb-2 block">
                Company Size
              </label>
              <div className="flex flex-wrap gap-2">
                {companySizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setCompanySize(size)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      companySize === size
                        ? 'text-black'
                        : 'bg-bg-card border border-border text-dim hover:text-white hover:border-white/20'
                    }`}
                    style={companySize === size ? { background: ACCENT } : {}}
                  >
                    {size} employees
                  </button>
                ))}
              </div>
            </div>

            {/* Score button */}
            <button
              onClick={scoreLead}
              disabled={loading}
              className="w-full py-4 rounded-full text-black font-semibold text-base transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: ACCENT }}
            >
              {loading ? (
                <>
                  <LoaderCircle className="w-5 h-5 animate-spin" />
                  Scoring...
                </>
              ) : (
                <>
                  <Crosshair className="w-5 h-5" />
                  Score This Lead
                </>
              )}
            </button>
          </div>

          {/* Right: Results */}
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="bg-bg-card border border-border rounded-2xl p-8 w-full text-center"
                >
                  {/* Score ring */}
                  <div className="flex justify-center mb-6">
                    <ScoreRing score={result.score} temperature={result.temperature} />
                  </div>

                  {/* Temperature badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                    style={{
                      borderColor: `${getTemperatureColor(result.temperature)}40`,
                      background: `${getTemperatureColor(result.temperature)}10`,
                    }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: getTemperatureColor(result.temperature) }}
                    />
                    <span
                      className="text-sm font-bold uppercase tracking-wide"
                      style={{ color: getTemperatureColor(result.temperature) }}
                    >
                      {result.temperature} Lead
                    </span>
                  </motion.div>

                  {/* Suggested actions */}
                  <div className="space-y-3 text-left">
                    <h4 className="text-dim text-xs font-mono uppercase tracking-wide">
                      Suggested Actions
                    </h4>
                    {result.actions.map((action, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.15 }}
                        className="flex items-start gap-3 bg-bg/50 rounded-lg px-4 py-3"
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5"
                          style={{ background: `${ACCENT}20`, color: ACCENT }}
                        >
                          {i + 1}
                        </div>
                        <span className="text-white text-sm">{action}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-bg-card border border-border rounded-2xl p-12 w-full text-center"
                >
                  <div
                    className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center border"
                    style={{ background: `${ACCENT}10`, borderColor: `${ACCENT}30` }}
                  >
                    <Crosshair className="w-9 h-9" style={{ color: ACCENT }} />
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2">Lead Score Preview</h3>
                  <p className="text-dim text-sm max-w-xs mx-auto">
                    Configure the lead details on the left and click &quot;Score This Lead&quot; to see the AI-powered qualification in action.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Powered by */}
        {result && (
          <div className="flex items-center justify-center gap-2 text-dim/50 text-xs mt-6">
            <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
            Powered by Pruve AI &mdash; Scored with Claude
          </div>
        )}
      </motion.div>
    </section>
  );
}
