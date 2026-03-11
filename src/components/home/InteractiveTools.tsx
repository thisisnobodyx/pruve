'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, PenTool, GitBranch } from 'lucide-react';
import MagneticButton from '@/components/shared/MagneticButton';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import ScrollReveal from '@/components/shared/ScrollReveal';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type TabId = 'calculator' | 'caption' | 'automation';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: 'calculator', label: 'Revenue Calculator', icon: Calculator },
  { id: 'caption', label: 'AI Caption Generator', icon: PenTool },
  { id: 'automation', label: 'Automation Builder', icon: GitBranch },
];

// ---------------------------------------------------------------------------
// Tab content animation variants
// ---------------------------------------------------------------------------
const contentVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// ---------------------------------------------------------------------------
// Tab 1 — Revenue Leak Calculator
// ---------------------------------------------------------------------------
function RevenueCalculator() {
  const [leads, setLeads] = useState('');
  const [responseTime, setResponseTime] = useState('');
  const [hours, setHours] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculate = useCallback(() => {
    const l = parseFloat(leads) || 0;
    const r = parseFloat(responseTime) || 0;
    const h = parseFloat(hours) || 0;
    const loss = Math.round(l * (r * 0.1) * 150 + h * 35);
    setResult(loss);
    setShowResult(true);
  }, [leads, responseTime, hours]);

  return (
    <div className="bg-bg-card border border-border rounded-2xl p-8 md:p-12">
      <div className="space-y-6">
        {/* Leads input */}
        <div>
          <label className="block text-dim text-sm mb-2">
            How many leads do you get per week?
          </label>
          <input
            type="number"
            placeholder="e.g. 50"
            value={leads}
            onChange={(e) => {
              setLeads(e.target.value);
              setShowResult(false);
            }}
            className="bg-bg border border-border rounded-lg px-4 py-3 text-white w-full placeholder:text-dim/40 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        {/* Response time input */}
        <div>
          <label className="block text-dim text-sm mb-2">
            Average response time (in hours)?
          </label>
          <input
            type="number"
            placeholder="e.g. 4"
            value={responseTime}
            onChange={(e) => {
              setResponseTime(e.target.value);
              setShowResult(false);
            }}
            className="bg-bg border border-border rounded-lg px-4 py-3 text-white w-full placeholder:text-dim/40 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        {/* Repetitive tasks input */}
        <div>
          <label className="block text-dim text-sm mb-2">
            Hours/week on repetitive tasks?
          </label>
          <input
            type="number"
            placeholder="e.g. 15"
            value={hours}
            onChange={(e) => {
              setHours(e.target.value);
              setShowResult(false);
            }}
            className="bg-bg border border-border rounded-lg px-4 py-3 text-white w-full placeholder:text-dim/40 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        {/* Calculate button */}
        <MagneticButton
          onClick={calculate}
          className="w-full bg-accent hover:bg-accent/90 text-white font-medium rounded-pill px-6 py-3.5 mt-2 transition-colors"
        >
          Calculate
        </MagneticButton>
      </div>

      {/* Result */}
      <AnimatePresence>
        {showResult && result !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-10 pt-10 border-t border-border text-center">
              <p className="text-dim text-sm mb-3">You&apos;re losing</p>
              <div className="font-display text-4xl md:text-5xl font-extrabold text-danger mb-3">
                <AnimatedCounter
                  target={result}
                  prefix="$"
                  className="font-display text-4xl md:text-5xl font-extrabold text-danger"
                />
                <span className="text-danger">/month</span>
              </div>
              <p className="text-accent-2 text-sm mt-4">
                That&apos;s ${result.toLocaleString()} you could save with
                Pruve.
              </p>
              <div className="mt-6">
                <MagneticButton
                  href="/contact"
                  className="inline-flex items-center gap-2 text-accent hover:text-white font-medium transition-colors group"
                >
                  Fix this with Pruve
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab 2 — AI Caption Generator
// ---------------------------------------------------------------------------
const industries = [
  'Restaurant',
  'Real Estate',
  'Fitness',
  'Healthcare',
  'E-commerce',
  'Technology',
  'Beauty & Wellness',
  'Education',
];

function CaptionGenerator() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [result, setResult] = useState('');
  const [displayedResult, setDisplayedResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Typing effect
  useEffect(() => {
    if (!result) return;

    let i = 0;
    setDisplayedResult('');

    const type = () => {
      if (i < result.length) {
        setDisplayedResult(result.slice(0, i + 1));
        i++;
        typingRef.current = setTimeout(type, 8);
      }
    };

    type();

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [result]);

  const generate = useCallback(async () => {
    if (!businessName.trim() || !industry) return;
    setLoading(true);
    setResult('');
    setDisplayedResult('');
    setError('');

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt:
            'You are a professional social media manager and copywriter. Given a business name and industry, generate: 1. Three Instagram captions (with hashtags) 2. One email subject line 3. One blog post intro paragraph. Format clearly with labels. Be creative and engaging.',
          messages: [
            {
              role: 'user',
              content: `Business: ${businessName}, Industry: ${industry}`,
            },
          ],
        }),
      });

      if (!res.ok) throw new Error('Failed to generate content');

      const data = await res.json();
      setResult(data.content || 'No content generated.');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [businessName, industry]);

  return (
    <div className="bg-bg-card border border-border rounded-2xl p-8 md:p-12">
      <div className="space-y-6">
        {/* Business name */}
        <div>
          <label className="block text-dim text-sm mb-2">Business name</label>
          <input
            type="text"
            placeholder="e.g. Fresh Bites Cafe"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="bg-bg border border-border rounded-lg px-4 py-3 text-white w-full placeholder:text-dim/40 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block text-dim text-sm mb-2">Industry</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="bg-bg border border-border rounded-lg px-4 py-3 text-white w-full focus:outline-none focus:border-accent/50 transition-colors appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 16px center',
            }}
          >
            <option value="" disabled>
              Select your industry
            </option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Generate button */}
        <MagneticButton
          onClick={generate}
          className="w-full bg-accent hover:bg-accent/90 text-white font-medium rounded-pill px-6 py-3.5 mt-2 transition-colors disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Content'}
        </MagneticButton>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="mt-10 pt-10 border-t border-border">
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-4 bg-white/5 rounded-lg animate-pulse"
                style={{ width: `${100 - n * 15}%` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-6 text-danger text-sm text-center">{error}</div>
      )}

      {/* Result */}
      <AnimatePresence>
        {displayedResult && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-10 pt-10 border-t border-border"
          >
            <pre className="font-mono text-sm text-dim leading-relaxed whitespace-pre-wrap break-words">
              {displayedResult}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  repeatType: 'reverse',
                }}
                className="inline-block w-[2px] h-4 bg-accent ml-0.5 align-middle"
              />
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab 3 — Automation Builder
// ---------------------------------------------------------------------------
const tools = [
  'WhatsApp',
  'Gmail',
  'Shopify',
  'Slack',
  'Instagram',
  'Google Sheets',
  'Calendly',
  'Stripe',
] as const;

type ToolName = (typeof tools)[number];

// Pre-defined connection descriptions for tool pairs
const connectionLabels: Record<string, string> = {
  'WhatsApp-Gmail': 'New email → WhatsApp alert',
  'WhatsApp-Shopify': 'New order → WhatsApp confirmation',
  'WhatsApp-Slack': 'Customer message → Slack notification',
  'WhatsApp-Instagram': 'DM received → WhatsApp follow-up',
  'WhatsApp-Google Sheets': 'Chat log → Update spreadsheet',
  'WhatsApp-Calendly': 'Booking confirmed → WhatsApp reminder',
  'WhatsApp-Stripe': 'Payment received → WhatsApp receipt',
  'Gmail-Shopify': 'New order → Email confirmation',
  'Gmail-Slack': 'Important email → Slack ping',
  'Gmail-Instagram': 'New follower → Welcome email',
  'Gmail-Google Sheets': 'Form submission → Log to sheet',
  'Gmail-Calendly': 'Meeting booked → Email summary',
  'Gmail-Stripe': 'Invoice paid → Email receipt',
  'Shopify-Slack': 'New order → Team notification',
  'Shopify-Instagram': 'New product → Auto-post',
  'Shopify-Google Sheets': 'Sale completed → Update inventory',
  'Shopify-Calendly': 'High-value order → Schedule call',
  'Shopify-Stripe': 'Subscription renewed → Sync payment',
  'Slack-Instagram': 'Post published → Slack update',
  'Slack-Google Sheets': 'Daily report → Post to Slack',
  'Slack-Calendly': 'Meeting reminder → Slack alert',
  'Slack-Stripe': 'Payment alert → Slack channel',
  'Instagram-Google Sheets': 'Engagement data → Track in sheet',
  'Instagram-Calendly': 'DM inquiry → Book a call',
  'Instagram-Stripe': 'Link in bio sale → Process payment',
  'Google Sheets-Calendly': 'New lead row → Schedule meeting',
  'Google Sheets-Stripe': 'Revenue data → Auto-reconcile',
  'Calendly-Stripe': 'Paid consultation → Charge client',
};

function getConnectionLabel(a: string, b: string): string {
  return (
    connectionLabels[`${a}-${b}`] ||
    connectionLabels[`${b}-${a}`] ||
    `${a} ↔ ${b} sync`
  );
}

// Node positions around a center point (3 outer nodes)
function getNodePositions(count: number) {
  const positions: { x: number; y: number }[] = [];
  const radius = 140;
  const startAngle = -Math.PI / 2;
  for (let i = 0; i < count; i++) {
    const angle = startAngle + (i * 2 * Math.PI) / count;
    positions.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    });
  }
  return positions;
}

function AutomationBuilder() {
  const [selected, setSelected] = useState<ToolName[]>([]);
  const [showMap, setShowMap] = useState(false);

  const toggleTool = useCallback(
    (tool: ToolName) => {
      setShowMap(false);
      setSelected((prev) => {
        if (prev.includes(tool)) return prev.filter((t) => t !== tool);
        if (prev.length >= 3) return prev;
        return [...prev, tool];
      });
    },
    []
  );

  const buildMap = useCallback(() => {
    setShowMap(true);
  }, []);

  const nodePositions = getNodePositions(selected.length);

  return (
    <div className="bg-bg-card border border-border rounded-2xl p-8 md:p-12">
      <p className="text-dim mb-6">Select 3 tools you use:</p>

      {/* Tool grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {tools.map((tool) => {
          const isSelected = selected.includes(tool);
          return (
            <motion.button
              key={tool}
              onClick={() => toggleTool(tool)}
              whileTap={{ scale: 0.97 }}
              className={`rounded-lg py-3 px-4 text-sm text-center border transition-all duration-200 ${
                isSelected
                  ? 'border-accent bg-accent/10 text-white'
                  : 'bg-bg border-border text-dim hover:text-white hover:border-white/20'
              }`}
            >
              {tool}
            </motion.button>
          );
        })}
      </div>

      {/* Build button */}
      <AnimatePresence>
        {selected.length === 3 && !showMap && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <MagneticButton
              onClick={buildMap}
              className="w-full bg-accent hover:bg-accent/90 text-white font-medium rounded-pill px-6 py-3.5 transition-colors"
            >
              Build Automation Map
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Automation map */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 bg-bg rounded-2xl border border-border p-8 relative overflow-hidden"
          >
            {/* Background grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #F2F0EB 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Map container */}
            <div className="relative mx-auto" style={{ height: '380px' }}>
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="-200 -200 400 400"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Animated connection lines from center to each node */}
                {nodePositions.map((pos, i) => (
                  <motion.line
                    key={`line-${i}`}
                    x1={0}
                    y1={0}
                    x2={pos.x}
                    y2={pos.y}
                    stroke="rgba(124, 58, 237, 0.3)"
                    strokeWidth={2}
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3 + i * 0.2,
                      ease: 'easeOut',
                    }}
                  />
                ))}

                {/* Animated dots traveling along lines */}
                {nodePositions.map((pos, i) => (
                  <motion.circle
                    key={`dot-${i}`}
                    r={3}
                    fill="#7C3AED"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      cx: [0, pos.x * 0.33, pos.x * 0.66, pos.x],
                      cy: [0, pos.y * 0.33, pos.y * 0.66, pos.y],
                    }}
                    transition={{
                      duration: 2,
                      delay: 1 + i * 0.3,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: 'linear',
                    }}
                  />
                ))}
              </svg>

              {/* Center node — Pruve AI */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: 'backOut' }}
              >
                <div className="w-24 h-24 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center shadow-[0_0_40px_rgba(124, 58, 237,0.15)]">
                  <span className="font-display text-sm font-bold text-white">
                    Pruve AI
                  </span>
                </div>
              </motion.div>

              {/* Outer tool nodes */}
              {selected.map((tool, i) => {
                const pos = nodePositions[i];
                // Convert SVG coords to percentage-based positioning
                // SVG viewBox is -200 to 200 (400 units), map to 0-100%
                const pctX = ((pos.x + 200) / 400) * 100;
                const pctY = ((pos.y + 200) / 400) * 100;

                return (
                  <motion.div
                    key={tool}
                    className="absolute z-10"
                    style={{
                      left: `${pctX}%`,
                      top: `${pctY}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + i * 0.15,
                      ease: 'backOut',
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-full bg-bg-card border border-border flex items-center justify-center">
                        <span className="text-white text-xs font-medium text-center leading-tight px-1">
                          {tool}
                        </span>
                      </div>
                      <motion.span
                        className="text-[10px] text-dim text-center max-w-[120px] leading-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 + i * 0.2 }}
                      >
                        {getConnectionLabel('Pruve AI', tool).replace(
                          'Pruve AI',
                          tool
                        )}
                      </motion.span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Connection descriptions */}
            <motion.div
              className="mt-4 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {selected.map((tool, i) => (
                <div
                  key={tool}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  <span className="text-dim">
                    <span className="text-white">{tool}</span>
                    {' → '}
                    {getConnectionLabel(
                      selected[(i + 1) % selected.length],
                      tool
                    )}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function InteractiveTools() {
  const [activeTab, setActiveTab] = useState<TabId>('calculator');

  return (
    <section className="py-section px-6 bg-bg-2">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-center text-white mb-4">
            See what Pruve can do — right now.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1} direction="up">
          <p className="text-dim text-center mb-12">
            No signup. No sales call. Try it live.
          </p>
        </ScrollReveal>

        {/* Tab buttons */}
        <ScrollReveal delay={0.2} direction="up">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-pill px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-accent text-white shadow-[0_0_20px_rgba(124, 58, 237,0.2)]'
                      : 'bg-bg-card border border-border text-dim hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {activeTab === 'calculator' && <RevenueCalculator />}
            {activeTab === 'caption' && <CaptionGenerator />}
            {activeTab === 'automation' && <AutomationBuilder />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
