'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ParticleNetwork from '@/components/shared/ParticleNetwork';
import MagneticButton from '@/components/shared/MagneticButton';
import { tierRoles, type TierRole } from '@/components/ai-employees/data';

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */
const industries = [
  { value: 'restaurant', label: 'Restaurant / Hospitality', emoji: '🍽️' },
  { value: 'healthcare', label: 'Healthcare / Medical', emoji: '🏥' },
  { value: 'realestate', label: 'Real Estate', emoji: '🏠' },
  { value: 'ecommerce', label: 'E-Commerce / Retail', emoji: '🛒' },
  { value: 'professional', label: 'Professional Services', emoji: '💼' },
  { value: 'fitness', label: 'Fitness / Wellness', emoji: '💪' },
  { value: 'education', label: 'Education', emoji: '📚' },
  { value: 'other', label: 'Other', emoji: '🏢' },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  size: string;
  employeeTier: string;
  message: string;
}

/* ------------------------------------------------------------------ */
/* TEAM VISUALIZATION: the "wow" element on the right side             */
/* ------------------------------------------------------------------ */
function TeamVisualization({ step, form }: { step: number; form: FormData }) {
  const selectedRole = tierRoles.find((r) => r.id === form.employeeTier);
  const industry = industries.find((i) => i.value === form.industry);

  // Calculate how many desks to show based on tier
  const deskCount = !selectedRole ? 0 : selectedRole.id === 'operator' ? 1 : selectedRole.id === 'manager' ? 2 : 3;

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-3xl transition-all duration-700"
        style={{
          background: selectedRole
            ? `radial-gradient(ellipse at center, ${selectedRole.color}08 0%, transparent 70%)`
            : 'radial-gradient(ellipse at center, rgba(124,58,237,0.03) 0%, transparent 70%)',
        }}
      />

      {/* Step 1: User avatar */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1-vis"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <div className="w-24 h-24 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">👤</span>
            </div>
            <p className="text-dim text-sm">Tell us about yourself</p>
            {form.name && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white font-bold mt-2"
              >
                {form.name}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Step 2: Industry visualization */}
        {step === 2 && (
          <motion.div
            key="step2-vis"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <motion.div
              key={form.industry || 'default'}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-28 h-28 rounded-2xl bg-bg-card border border-border flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-5xl">{industry?.emoji || '🏢'}</span>
            </motion.div>
            <p className="text-white font-bold">{form.company || 'Your Business'}</p>
            <p className="text-dim text-sm mt-1">{industry?.label || 'Select your industry'}</p>
          </motion.div>
        )}

        {/* Step 3: THE KEY MOMENT — desk visualization */}
        {step === 3 && (
          <motion.div
            key="step3-vis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            {!selectedRole ? (
              <div className="text-center">
                <div className="flex justify-center gap-6 mb-6">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-16 h-16 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center">
                      <span className="text-white/10 text-2xl">?</span>
                    </div>
                  ))}
                </div>
                <p className="text-dim text-sm">Choose your AI Employee tier</p>
              </div>
            ) : (
              <div className="text-center">
                {/* Desks */}
                <div className="flex justify-center gap-4 mb-6">
                  {Array.from({ length: deskCount }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                      className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl border"
                      style={{
                        background: `${selectedRole.color}10`,
                        borderColor: `${selectedRole.color}30`,
                        boxShadow: `0 0 30px ${selectedRole.color}12`,
                      }}
                    >
                      {i === 0 ? (selectedRole.id === 'operator' ? '🎧' : selectedRole.id === 'manager' ? '📊' : '👔') : '💻'}
                    </motion.div>
                  ))}
                </div>

                {/* Employee name */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-white font-extrabold text-lg">{selectedRole.name}</div>
                  <div className="font-mono text-sm mt-1" style={{ color: selectedRole.color }}>
                    ${selectedRole.price}/mo
                  </div>
                </motion.div>

                {/* Capabilities */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap justify-center gap-2 mt-4"
                >
                  {selectedRole.capabilities.map((cap, i) => (
                    <motion.div
                      key={cap}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                      className="text-[9px] px-2 py-1 rounded-full border"
                      style={{ color: selectedRole.color, borderColor: `${selectedRole.color}25`, background: `${selectedRole.color}06` }}
                    >
                      {cap}
                    </motion.div>
                  ))}
                </motion.div>
                <p className="text-dim text-xs mt-3">{selectedRole.capabilities.length} capabilities included</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 4: Speech bubble */}
        {step === 4 && selectedRole && (
          <motion.div
            key="step4-vis"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <div
              className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl mx-auto mb-4 border"
              style={{
                background: `${selectedRole.color}10`,
                borderColor: `${selectedRole.color}30`,
              }}
            >
              {selectedRole.id === 'operator' ? '🎧' : selectedRole.id === 'manager' ? '📊' : '👔'}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-bg-card border border-border rounded-2xl rounded-tl-sm px-5 py-3 inline-block mb-3"
            >
              <p className="text-white text-sm">Your AI team is ready! 🚀</p>
            </motion.div>
            <p className="text-dim text-xs">Just a few more details...</p>
          </motion.div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <motion.div
            key="step5-vis"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            {/* Celebration effect */}
            {tierRoles.map((role, i) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="inline-block mx-3"
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl border animate-pulse"
                  style={{
                    background: `${role.color}15`,
                    borderColor: `${role.color}30`,
                    boxShadow: `0 0 40px ${role.color}20`,
                  }}
                >
                  {role.id === 'operator' ? '🎧' : role.id === 'manager' ? '📊' : '👔'}
                </div>
              </motion.div>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-accent-2 font-bold text-lg mt-6"
            >
              We&apos;re on it! 🎉
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* LIVE PREVIEW CARD: updates in real-time                             */
/* ------------------------------------------------------------------ */
function LivePreviewCard({ form }: { form: FormData }) {
  const selectedRole = tierRoles.find((r) => r.id === form.employeeTier);

  if (!selectedRole) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="bg-bg-card border border-border rounded-xl p-4 mt-4 overflow-hidden"
    >
      <div className="text-[10px] font-mono uppercase tracking-wider text-dim mb-3">YOUR PLAN SUMMARY</div>
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{ background: `${selectedRole.color}15` }}
        >
          {selectedRole.id === 'operator' ? '🎧' : selectedRole.id === 'manager' ? '📊' : '👔'}
        </div>
        <div>
          <div className="text-white text-sm font-bold">{selectedRole.name}</div>
          <div className="text-xs font-mono" style={{ color: selectedRole.color }}>${selectedRole.price}/mo</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {selectedRole.capabilities.map((cap) => (
          <span key={cap} className="text-[9px] px-2 py-0.5 rounded-full border" style={{ color: selectedRole.color, borderColor: `${selectedRole.color}30` }}>
            {cap}
          </span>
        ))}
      </div>
      <div className="text-dim text-[10px]">{selectedRole.capabilities.length} capabilities • 24/7 • 48hr setup</div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN COMPONENT                                                      */
/* ------------------------------------------------------------------ */
export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    size: '',
    employeeTier: '',
    message: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return form.name.trim() && form.email.trim();
      case 2: return form.company.trim();
      case 3: return form.employeeTier;
      case 4: return true;
      default: return true;
    }
  };

  const handleSubmit = () => {
    // TODO: send form data to API
    setStep(5);
  };

  const totalSteps = 4;

  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <ParticleNetwork particleCount={50} />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-sm tracking-widest uppercase text-accent mb-4 block"
          >
            {step < 5 ? 'BUILD YOUR AI TEAM' : 'SUCCESS'}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight"
          >
            {step < 5 ? (
              <>
                Design your custom
                <br />
                <span className="text-accent">AI workforce.</span>
              </>
            ) : (
              <>
                We&apos;ll be in touch
                <br />
                <span className="text-accent">within 24 hours.</span>
              </>
            )}
          </motion.h1>
          {step < 5 && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-dim text-lg"
            >
              4 quick steps. Then we build your AI team in 48 hours.
            </motion.p>
          )}
        </div>
      </div>

      {/* Main content: form left, visualization right */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Form */}
          <div>
            {/* Progress bar */}
            {step <= totalSteps && (
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs text-dim mb-2">
                  <span>Step {step} of {totalSteps}</span>
                  <span>{Math.round((step / totalSteps) * 100)}%</span>
                </div>
                <div className="h-1 bg-bg-card rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  />
                </div>
              </div>
            )}

            {/* Form Steps */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-extrabold text-white mb-1">About you</h2>
                    <p className="text-dim text-sm">Who are we building this for?</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-dim font-mono uppercase tracking-wider mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="John Smith"
                        className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent/40 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-dim font-mono uppercase tracking-wider mb-2">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="john@company.com"
                        className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent/40 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-dim font-mono uppercase tracking-wider mb-2">Phone (optional)</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent/40 transition-colors"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-extrabold text-white mb-1">Your business</h2>
                    <p className="text-dim text-sm">Help us customize your AI team.</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-dim font-mono uppercase tracking-wider mb-2">Company Name *</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => updateField('company', e.target.value)}
                        placeholder="Acme Corp"
                        className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent/40 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-dim font-mono uppercase tracking-wider mb-2">Industry</label>
                      <div className="grid grid-cols-2 gap-2">
                        {industries.map((ind) => (
                          <button
                            key={ind.value}
                            onClick={() => updateField('industry', ind.value)}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left text-xs transition-all ${
                              form.industry === ind.value
                                ? 'border-accent bg-accent/10 text-white'
                                : 'border-border bg-bg-card text-dim hover:border-white/15'
                            }`}
                          >
                            <span className="text-base">{ind.emoji}</span>
                            <span>{ind.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-dim font-mono uppercase tracking-wider mb-2">Team Size</label>
                      <div className="flex gap-2">
                        {['1-5', '6-20', '21-50', '50+'].map((s) => (
                          <button
                            key={s}
                            onClick={() => updateField('size', s)}
                            className={`flex-1 px-3 py-2.5 rounded-xl border text-xs text-center transition-all ${
                              form.size === s
                                ? 'border-accent bg-accent/10 text-white'
                                : 'border-border bg-bg-card text-dim hover:border-white/15'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-extrabold text-white mb-1">Choose your AI Employee</h2>
                    <p className="text-dim text-sm">Each tier includes all agents from the tier below.</p>
                  </div>
                  <div className="space-y-3">
                    {tierRoles.map((role) => {
                      const isSelected = form.employeeTier === role.id;
                      return (
                        <button
                          key={role.id}
                          onClick={() => updateField('employeeTier', role.id)}
                          className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                            isSelected ? 'shadow-lg' : 'hover:border-white/15'
                          }`}
                          style={{
                            background: isSelected ? `${role.color}08` : undefined,
                            borderColor: isSelected ? `${role.color}40` : 'rgba(255,255,255,0.05)',
                            boxShadow: isSelected ? `0 0 40px ${role.color}10` : undefined,
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">
                                {role.id === 'operator' ? '🎧' : role.id === 'manager' ? '📊' : '👔'}
                              </div>
                              <div>
                                <div className="text-white font-extrabold">{role.name}</div>
                                <div className="text-dim text-xs">{role.label}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-mono font-bold" style={{ color: role.color }}>
                                ${role.price}/mo
                              </div>
                            </div>
                          </div>
                          <p className="text-dim text-xs mb-3">{role.shortDesc}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {role.capabilities.map((cap) => (
                              <span
                                key={cap}
                                className="text-[9px] px-2 py-0.5 rounded-full border"
                                style={{ color: role.color, borderColor: `${role.color}25`, background: `${role.color}06` }}
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                          {/* Selection indicator */}
                          <div className="mt-3 flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected ? '' : 'border-white/15'
                              }`}
                              style={isSelected ? { borderColor: role.color } : undefined}
                            >
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-2 h-2 rounded-full"
                                  style={{ background: role.color }}
                                />
                              )}
                            </div>
                            <span className="text-[10px]" style={{ color: isSelected ? role.color : 'rgba(255,255,255,0.3)' }}>
                              {isSelected ? 'Selected' : `Select ${role.name}`}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <LivePreviewCard form={form} />
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="s4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-extrabold text-white mb-1">Almost there!</h2>
                    <p className="text-dim text-sm">Anything else you&apos;d like us to know?</p>
                  </div>
                  <div>
                    <label className="block text-xs text-dim font-mono uppercase tracking-wider mb-2">Message (optional)</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder="Tell us about your challenges, goals, or specific needs..."
                      rows={5}
                      className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent/40 transition-colors resize-none"
                    />
                  </div>
                  <LivePreviewCard form={form} />
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="s5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-accent-2/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-accent-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white mb-3">You&apos;re all set!</h2>
                  <p className="text-dim text-lg mb-4 max-w-md mx-auto">
                    Our team will review your request and reach out within 24 hours to schedule your strategy call.
                  </p>
                  <div className="bg-bg-card border border-border rounded-xl p-4 max-w-sm mx-auto mb-8 text-left">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-dim mb-2">SUMMARY</div>
                    <div className="text-white text-sm mb-1"><strong>Name:</strong> {form.name}</div>
                    <div className="text-white text-sm mb-1"><strong>Company:</strong> {form.company}</div>
                    {form.employeeTier && (
                      <div className="text-white text-sm">
                        <strong>Plan:</strong> {tierRoles.find((r) => r.id === form.employeeTier)?.name}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <MagneticButton href="/" className="bg-accent text-bg font-medium px-8 py-3 rounded-pill text-sm">
                      Back to Home
                    </MagneticButton>
                    <MagneticButton href="/ai-employees" className="bg-white/5 text-white border border-border font-medium px-8 py-3 rounded-pill text-sm hover:bg-white/10">
                      Explore AI Employees
                    </MagneticButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {step <= totalSteps && (
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() => setStep(Math.max(1, step - 1))}
                  className={`text-sm text-dim hover:text-white transition-colors ${step === 1 ? 'invisible' : ''}`}
                >
                  ← Back
                </button>
                <button
                  onClick={() => {
                    if (step === totalSteps) handleSubmit();
                    else setStep(step + 1);
                  }}
                  disabled={!canProceed()}
                  className={`px-8 py-3 rounded-pill font-medium text-sm transition-all duration-300 ${
                    canProceed()
                      ? 'bg-accent text-bg hover:shadow-[0_0_24px_rgba(124,58,237,0.4)] hover:scale-[1.02]'
                      : 'bg-bg-card text-dim border border-border cursor-not-allowed'
                  }`}
                >
                  {step === totalSteps ? 'Submit →' : 'Continue →'}
                </button>
              </div>
            )}
          </div>

          {/* Right: Visualization (sticky on desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="bg-bg-card/50 border border-border rounded-3xl p-8">
                <TeamVisualization step={step} form={form} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
