'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const ACCENT = '#C8F135';

interface AuditItem {
  category: string;
  label: string;
  status: 'pass' | 'warning' | 'fail';
  detail: string;
  score: number;
}

const auditItems: AuditItem[] = [
  { category: 'Speed', label: 'Page Load Time', status: 'fail', detail: '6.3s — should be under 2.5s', score: 25 },
  { category: 'Speed', label: 'Core Web Vitals', status: 'warning', detail: 'LCP: 4.1s, CLS: 0.18', score: 45 },
  { category: 'On-Page', label: 'Meta Titles', status: 'fail', detail: '12 pages missing unique titles', score: 20 },
  { category: 'On-Page', label: 'Header Structure', status: 'warning', detail: 'Multiple H1 tags on 3 pages', score: 55 },
  { category: 'On-Page', label: 'Image Alt Text', status: 'fail', detail: '47 images missing alt attributes', score: 10 },
  { category: 'Technical', label: 'SSL Certificate', status: 'pass', detail: 'Valid HTTPS with HSTS', score: 100 },
  { category: 'Technical', label: 'Sitemap', status: 'fail', detail: 'No sitemap.xml found', score: 0 },
  { category: 'Technical', label: 'Robots.txt', status: 'warning', detail: 'Exists but blocking CSS/JS', score: 50 },
  { category: 'Local', label: 'Google Business', status: 'warning', detail: 'Profile incomplete — 4 fields missing', score: 40 },
  { category: 'Local', label: 'NAP Consistency', status: 'fail', detail: 'Address differs on 6 directories', score: 15 },
];

const categories = ['All', 'Speed', 'On-Page', 'Technical', 'Local'];

function StatusBadge({ status }: { status: 'pass' | 'warning' | 'fail' }) {
  const config = {
    pass: { bg: '#22C55E15', border: '#22C55E30', color: '#22C55E', label: 'PASS' },
    warning: { bg: '#F59E0B15', border: '#F59E0B30', color: '#F59E0B', label: 'WARN' },
    fail: { bg: '#FF454515', border: '#FF454530', color: '#FF4545', label: 'FAIL' },
  }[status];

  return (
    <span
      className="text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider"
      style={{ background: config.bg, borderColor: config.border, color: config.color }}
    >
      {config.label}
    </span>
  );
}

function ScoreBar({ score, delay }: { score: number; delay: number }) {
  const color = score >= 80 ? '#22C55E' : score >= 50 ? '#F59E0B' : '#FF4545';
  return (
    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}

export default function InteractiveDemo() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCount, setScannedCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [inputUrl, setInputUrl] = useState('');

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start 0.3'] });
  const titleY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const filteredItems = activeCategory === 'All'
    ? auditItems
    : auditItems.filter((item) => item.category === activeCategory);

  const overallScore = Math.round(auditItems.reduce((sum, item) => sum + item.score, 0) / auditItems.length);

  const startScan = () => {
    if (!inputUrl.trim()) return;
    setIsScanning(true);
    setShowResults(false);
    setScannedCount(0);

    const interval = setInterval(() => {
      setScannedCount((prev) => {
        if (prev >= auditItems.length) {
          clearInterval(interval);
          setIsScanning(false);
          setShowResults(true);
          return prev;
        }
        return prev + 1;
      });
    }, 300);
  };

  return (
    <section ref={sectionRef} id="demo" className="py-section px-6 bg-bg-2">
      <div className="max-w-4xl mx-auto">
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center mb-12">
          <span className="font-mono text-sm tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>
            SEO AUDIT TOOL
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            See what Google sees.
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            Enter any URL and watch our AI audit it in real time.
          </p>
        </motion.div>

        {/* URL Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-3 mb-8 max-w-xl mx-auto"
        >
          <div className="flex-1 bg-bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-dim shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
            </svg>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && startScan()}
              placeholder="yourbusiness.com"
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-dim"
            />
          </div>
          <motion.button
            onClick={startScan}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-xl font-bold text-sm text-black transition-all"
            style={{ background: ACCENT }}
            disabled={isScanning}
          >
            {isScanning ? 'Scanning...' : 'Audit Now'}
          </motion.button>
        </motion.div>

        {/* Scanning animation */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mb-8"
            >
              <div className="w-full max-w-xs mx-auto h-2 rounded-full bg-white/5 overflow-hidden mb-3">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: ACCENT }}
                  animate={{ width: `${(scannedCount / auditItems.length) * 100}%` }}
                />
              </div>
              <span className="text-dim text-sm">Scanning {scannedCount}/{auditItems.length} checks...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Overall score */}
              <div className="flex items-center justify-center gap-8 mb-8">
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                    <motion.circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke={overallScore >= 70 ? '#22C55E' : overallScore >= 40 ? '#F59E0B' : '#FF4545'}
                      strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={264}
                      initial={{ strokeDashoffset: 264 }}
                      animate={{ strokeDashoffset: 264 - (264 * overallScore) / 100 }}
                      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-extrabold text-white">{overallScore}</span>
                  </div>
                </div>
                <div>
                  <div className="text-white text-lg font-bold">Overall SEO Score</div>
                  <div className="text-dim text-sm">{auditItems.filter((i) => i.status === 'fail').length} critical issues found</div>
                </div>
              </div>

              {/* Category filters */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? 'text-black border-transparent'
                        : 'text-dim border-border hover:border-white/20'
                    }`}
                    style={activeCategory === cat ? { background: ACCENT } : {}}
                  >
                    {cat}
                    {cat !== 'All' && (
                      <span className="ml-1.5 opacity-60">
                        ({auditItems.filter((i) => i.category === cat).length})
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Audit items */}
              <div className="space-y-3">
                <AnimatePresence mode="wait">
                  {filteredItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="bg-bg-card border border-border rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <StatusBadge status={item.status} />
                          <span className="text-white text-sm font-medium">{item.label}</span>
                        </div>
                        <span className="text-dim text-xs font-mono">{item.score}/100</span>
                      </div>
                      <div className="text-dim text-xs mb-2">{item.detail}</div>
                      <ScoreBar score={item.score} delay={i * 0.05} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center p-6 rounded-2xl border"
                style={{ borderColor: `${ACCENT}20`, background: `${ACCENT}05` }}
              >
                <p className="text-white font-bold mb-2">Want us to fix all of this?</p>
                <p className="text-dim text-sm mb-4">Get a full audit + action plan from our SEO team.</p>
                <a
                  href="/contact"
                  className="inline-flex px-6 py-3 rounded-full text-black font-bold text-sm transition-all hover:brightness-110"
                  style={{ background: ACCENT }}
                >
                  Get Full SEO Audit &rarr;
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Powered by */}
        {showResults && (
          <div className="mt-4 text-center">
            <span className="text-dim text-xs">Powered by Pruve AI</span>
          </div>
        )}
      </div>
    </section>
  );
}
