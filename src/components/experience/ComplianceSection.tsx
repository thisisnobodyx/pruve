'use client';

import { motion } from 'framer-motion';
import { complianceMap, universalRule, type ComplianceInfo } from './compliance-data';
import { getIndustry } from './industries';

interface ComplianceSectionProps {
  selectedIndustry: string | null;
}

/* Map industry IDs to compliance data keys where they differ */
const industryToComplianceKey: Record<string, string> = {
  yoga: 'gym',
  'property-management': 'realestate',
};

function getComplianceForIndustry(industryId: string): ComplianceInfo | null {
  const key = industryToComplianceKey[industryId] || industryId;
  return complianceMap[key] || null;
}

/* Regulation badge colors */
const regulationColors: Record<string, { bg: string; border: string; text: string }> = {
  HIPAA: { bg: '#3B82F620', border: '#3B82F640', text: '#60A5FA' },
  PHIPA: { bg: '#8B5CF620', border: '#8B5CF640', text: '#A78BFA' },
  PIPEDA: { bg: '#06B6D420', border: '#06B6D440', text: '#22D3EE' },
  default: { bg: '#7C3AED15', border: '#7C3AED30', text: '#A78BFA' },
};

function getRegColor(reg: string) {
  return regulationColors[reg] || regulationColors.default;
}

export default function ComplianceSection({ selectedIndustry }: ComplianceSectionProps) {
  const industry = selectedIndustry ? getIndustry(selectedIndustry) : null;
  const compliance = selectedIndustry ? getComplianceForIndustry(selectedIndustry) : null;

  // Don't render at all if no industry selected
  if (!selectedIndustry) return null;

  return (
    <section className="py-section px-6 bg-bg-2">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-accent mb-3 block">
            COMPLIANCE & SECURITY
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            {compliance
              ? `Built for ${industry?.label || 'your industry'} compliance.`
              : 'Built with compliance in mind.'}
          </h2>
          <p className="text-dim text-lg max-w-2xl mx-auto">
            {compliance
              ? 'Your AI Employee operates through your existing compliant systems. Regulated data never leaves your software.'
              : 'Every AI Employee follows strict data handling protocols to protect your business and customers.'}
          </p>
        </motion.div>

        {compliance ? (
          <RegulatedIndustryView compliance={compliance} industryLabel={industry?.label || ''} />
        ) : (
          <UniversalOnlyView />
        )}

        {/* Universal rules — always shown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-bg-card border border-border rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-lg">
              🛡️
            </div>
            <div>
              <h3 className="text-white font-bold text-base">{universalRule.title}</h3>
              <p className="text-dim text-xs">These rules apply to every AI Employee we deploy.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {universalRule.rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-accent mt-0.5 text-sm">✓</span>
                <span className="text-dim text-sm">{rule}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* REGULATED INDUSTRY VIEW                                              */
/* ------------------------------------------------------------------ */
function RegulatedIndustryView({
  compliance,
  industryLabel,
}: {
  compliance: ComplianceInfo;
  industryLabel: string;
}) {
  return (
    <div className="space-y-8">
      {/* Regulation badges row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        {compliance.regulations.map((reg) => {
          const c = getRegColor(reg);
          return (
            <div
              key={reg}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-bold tracking-wide"
              style={{ background: c.bg, borderColor: c.border, color: c.text }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 1l6 3v5c0 4.418-2.686 8.166-6 10-3.314-1.834-6-5.582-6-10V4l6-3zm-1 9.586L6.707 8.293l-1.414 1.414L8.586 13l5.707-5.707-1.414-1.414L9 9.586z"
                  clipRule="evenodd"
                />
              </svg>
              {reg}
            </div>
          );
        })}
      </motion.div>

      {/* Regulatory bodies */}
      {compliance.regulatoryBodies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-dim text-xs">
            Regulated by:{' '}
            {compliance.regulatoryBodies.map((body, i) => (
              <span key={i} className="text-white/70 font-medium">
                {body}
                {i < compliance.regulatoryBodies.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
        </motion.div>
      )}

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: How AI operates + what it does */}
        <div className="space-y-6">
          {/* AI Operation Model */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-base">
                ⚙️
              </div>
              <h3 className="text-white font-bold text-sm">How AI Operates</h3>
            </div>
            <p className="text-dim text-sm leading-relaxed mb-4">
              {compliance.aiOperationModel}
            </p>
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
                AI HANDLES
              </div>
              {compliance.aiExamples.map((ex, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-[#22C55E15] flex items-center justify-center">
                    <span className="text-[#22C55E] text-[10px]">✓</span>
                  </span>
                  <span className="text-dim text-xs">{ex}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Restricted topics */}
          {compliance.restrictedTopics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#FF454515] flex items-center justify-center text-base">
                  🔒
                </div>
                <h3 className="text-white font-bold text-sm">Restricted to Professionals</h3>
              </div>
              <p className="text-dim text-[11px] mb-4">
                These topics are strictly handled by licensed professionals — AI will never provide guidance on:
              </p>
              <div className="space-y-2">
                {compliance.restrictedTopics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#FF454515] flex items-center justify-center">
                      <span className="text-[#FF4545] text-[10px]">✕</span>
                    </span>
                    <span className="text-dim text-xs">{topic}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                  AI RESPONSE WHEN ASKED
                </div>
                <p className="text-white/60 text-xs italic">&ldquo;{compliance.aiResponseRule}&rdquo;</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Compliant software */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-bg-card border border-border rounded-2xl p-6"
        >
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-base">
              🔗
            </div>
            <h3 className="text-white font-bold text-sm">Compliant Software We Integrate</h3>
          </div>
          <p className="text-dim text-[11px] mb-5">
            Your AI Employee logs into these {industryLabel.toLowerCase()}-approved platforms to perform
            tasks — your data never leaves these systems.
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {compliance.compliantSoftware.map((sw, i) => (
              <motion.div
                key={sw.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-accent/5 flex items-center justify-center text-[11px] font-bold text-accent shrink-0">
                  {sw.name.charAt(0)}
                </div>
                <span className="text-white/70 text-xs font-medium truncate">{sw.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* UNIVERSAL ONLY VIEW (non-regulated industries)                       */
/* ------------------------------------------------------------------ */
function UniversalOnlyView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-bg-card border border-border rounded-2xl p-6 md:p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-base">
              ⚙️
            </div>
            <h3 className="text-white font-bold text-sm">How AI Operates</h3>
          </div>
          <p className="text-dim text-sm leading-relaxed mb-5">
            Your AI Employee connects to your existing business tools and operates through them.
            Customer data stays inside your systems — AI never stores sensitive information externally.
          </p>
          <div className="space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
              OPERATIONAL TASKS
            </div>
            {universalRule.operationalTasks.map((task, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-[#22C55E15] flex items-center justify-center">
                  <span className="text-[#22C55E] text-[10px]">✓</span>
                </span>
                <span className="text-dim text-xs">{task}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-base">
              🔐
            </div>
            <h3 className="text-white font-bold text-sm">Data Security</h3>
          </div>
          <div className="space-y-3">
            {[
              { icon: '🔒', title: 'End-to-end encryption', desc: 'All communications between AI and your tools are encrypted.' },
              { icon: '🏠', title: 'Your system of record', desc: 'Your existing software remains the single source of truth.' },
              { icon: '🚫', title: 'No external storage', desc: 'AI processes data in real-time — nothing stored outside your tools.' },
              { icon: '👤', title: 'Human oversight', desc: 'Critical decisions are always flagged for human review.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                <span className="text-base mt-0.5">{item.icon}</span>
                <div>
                  <div className="text-white text-xs font-medium mb-0.5">{item.title}</div>
                  <div className="text-dim text-[11px]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
