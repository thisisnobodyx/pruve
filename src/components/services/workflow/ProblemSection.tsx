'use client';

import { motion } from 'framer-motion';
import ScrollPinSection from '@/components/shared/ScrollPinSection';
import { Clock, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

const ACCENT = '#FF6B35';

const manualSteps = [
  { label: 'Receive email', time: '2 min' },
  { label: 'Copy data', time: '3 min' },
  { label: 'Open spreadsheet', time: '5 min' },
  { label: 'Paste & format', time: '10 min' },
  { label: 'Send Slack message', time: '5 min' },
  { label: 'Update CRM', time: '20 min' },
];

export default function ProblemSection() {
  return (
    <ScrollPinSection pinDuration={500} className="bg-bg">
      {(progress) => {
        // Phase 1: 0-0.25 — Manual steps appear one by one
        // Phase 2: 0.25-0.45 — Error appears, total time counter
        // Phase 3: 0.45-0.7 — Steps rewind/collapse into single flow
        // Phase 4: 0.7-1.0 — All steps burst with green checks

        const phase1 = Math.min(progress / 0.25, 1);
        const phase2 = progress > 0.25 ? Math.min((progress - 0.25) / 0.2, 1) : 0;
        const phase3 = progress > 0.45 ? Math.min((progress - 0.45) / 0.25, 1) : 0;
        const phase4 = progress > 0.7 ? Math.min((progress - 0.7) / 0.3, 1) : 0;

        const visibleSteps = Math.floor(phase1 * manualSteps.length);
        const showError = phase2 > 0.5;
        const isCollapsing = phase3 > 0;
        const isResolved = phase4 > 0;

        // Calculate running time total
        const times = [2, 3, 5, 10, 5, 20];
        const runningTotal = times.slice(0, visibleSteps).reduce((a, b) => a + b, 0);

        return (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div
              className="absolute inset-0 transition-all duration-700"
              style={{
                background: isResolved
                  ? `radial-gradient(ellipse at center, ${ACCENT}08 0%, transparent 70%)`
                  : showError && !isCollapsing
                    ? 'radial-gradient(ellipse at center, #FF454508 0%, transparent 70%)'
                    : 'transparent',
              }}
            />

            {/* Section label */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20">
              <span className="font-mono text-sm tracking-widest uppercase" style={{ color: ACCENT }}>
                {isResolved ? 'THE SOLUTION' : 'THE PROBLEM'}
              </span>
            </div>

            {/* Phase 1 & 2: Manual steps appearing */}
            {!isResolved && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: isCollapsing ? 1 - phase3 : 1 }}
              >
                <div className="max-w-lg w-full px-6">
                  {/* Title */}
                  <motion.h2
                    className="text-2xl md:text-3xl font-extrabold text-white text-center mb-8"
                    style={{ opacity: phase1 > 0.1 ? 1 : 0 }}
                  >
                    Manual workflows are <span className="text-[#FF4545]">slow and fragile</span>
                  </motion.h2>

                  {/* Steps */}
                  <div className="space-y-3">
                    {manualSteps.slice(0, visibleSteps).map((step, i) => {
                      const isLastVisible = i === visibleSteps - 1;
                      const hasError = showError && i === manualSteps.length - 1 && visibleSteps === manualSteps.length;

                      return (
                        <motion.div
                          key={step.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex items-center gap-4 bg-bg-card border rounded-xl px-5 py-3 ${
                            hasError ? 'border-[#FF4545]/50' : 'border-border'
                          }`}
                        >
                          {/* Step number */}
                          <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-[11px] font-mono text-dim">
                            {i + 1}
                          </div>

                          {/* Label */}
                          <span className="text-white text-sm font-medium flex-1">{step.label}</span>

                          {/* Time / Error */}
                          {hasError ? (
                            <div className="flex items-center gap-1.5 text-[#FF4545]">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-xs font-bold">ERROR!</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-dim">
                              <Clock className="w-3.5 h-3.5" />
                              <span className="text-xs font-mono">{step.time}</span>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Running total */}
                  {visibleSteps > 0 && (
                    <motion.div
                      className="text-center mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className={`text-lg font-bold ${showError ? 'text-[#FF4545]' : 'text-dim'}`}>
                        {showError
                          ? '45 minutes of manual work. One error ruins everything.'
                          : `${runningTotal} minutes and counting...`}
                      </div>
                    </motion.div>
                  )}

                  {/* Connection arrows between steps */}
                  {visibleSteps > 1 && (
                    <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none" style={{ opacity: 0.3 }}>
                      {/* Vertical flow hint - shown via the step numbering */}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Phase 3: Collapsing animation - brief transition */}
            {isCollapsing && !isResolved && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: phase3 }}
              >
                <motion.div
                  className="text-center"
                  animate={{ scale: [1, 0.9, 1.1, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <Zap className="w-16 h-16 mx-auto mb-4" style={{ color: ACCENT }} />
                  <div className="text-xl font-bold text-white">Automating...</div>
                </motion.div>
              </div>
            )}

            {/* Phase 4: Resolved state - all green */}
            {isResolved && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: phase4 }}
              >
                <div className="max-w-lg w-full px-6">
                  <motion.h2
                    className="text-2xl md:text-3xl font-extrabold text-white text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={phase4 > 0.1 ? { opacity: 1, y: 0 } : {}}
                  >
                    One workflow. <span style={{ color: ACCENT }}>Zero effort.</span>
                  </motion.h2>

                  {/* All steps completed instantly */}
                  <div className="space-y-2">
                    {manualSteps.map((step, i) => (
                      <motion.div
                        key={`done-${step.label}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={phase4 > 0.1 + i * 0.08 ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-4 bg-bg-card border rounded-xl px-5 py-3"
                        style={{ borderColor: `${ACCENT}30` }}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: `${ACCENT}20` }}
                        >
                          <CheckCircle className="w-4 h-4" style={{ color: ACCENT }} />
                        </div>
                        <span className="text-white/80 text-sm font-medium flex-1">{step.label}</span>
                        <span className="text-xs font-mono" style={{ color: ACCENT }}>Instant</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Time comparison */}
                  <motion.div
                    className="text-center mt-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={phase4 > 0.7 ? { opacity: 1, scale: 1 } : {}}
                  >
                    <div className="inline-flex items-center gap-4 bg-bg-card border rounded-full px-8 py-4" style={{ borderColor: `${ACCENT}30` }}>
                      <span className="text-[#FF4545] line-through text-lg font-bold">45 min</span>
                      <span className="text-dim">&rarr;</span>
                      <span className="text-2xl font-extrabold" style={{ color: ACCENT }}>3 seconds</span>
                    </div>
                    <div className="text-dim text-sm mt-3">Zero errors. Every single time.</div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </ScrollPinSection>
  );
}
