'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleNetwork from '@/components/shared/ParticleNetwork';
import MagneticButton from '@/components/shared/MagneticButton';

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
  serviceType: string;
  message: string;
}

/* ------------------------------------------------------------------ */
/* TEAM VISUALIZATION: the "wow" element on the right side             */
/* ------------------------------------------------------------------ */
const serviceOptions = [
  { id: 'ai-employee', emoji: '🤖', label: 'AI Employee', color: '#7C3AED' },
  { id: 'ai-agent', emoji: '⚡', label: 'AI Agent', color: '#7DF9C0' },
  { id: 'web-design', emoji: '🎨', label: 'Web Design', color: '#C8F135' },
  { id: 'seo', emoji: '🔍', label: 'SEO Services', color: '#C8F135' },
];

function TeamVisualization({ step, form }: { step: number; form: FormData }) {
  const selectedService = serviceOptions.find((s) => s.id === form.serviceType);
  const industry = industries.find((i) => i.value === form.industry);

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-3xl transition-all duration-700"
        style={{
          background: selectedService
            ? `radial-gradient(ellipse at center, ${selectedService.color}08 0%, transparent 70%)`
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

        {/* Step 3: Service type visualization */}
        {step === 3 && (
          <motion.div
            key="step3-vis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            {!selectedService ? (
              <div className="text-center">
                <div className="flex justify-center gap-6 mb-6">
                  {serviceOptions.map((s) => (
                    <div key={s.id} className="w-16 h-16 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center">
                      <span className="text-white/10 text-2xl">{s.emoji}</span>
                    </div>
                  ))}
                </div>
                <p className="text-dim text-sm">Select your service type</p>
              </div>
            ) : (
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ ease: [0.34, 1.56, 0.64, 1] }}
                  className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-4 border"
                  style={{
                    background: `${selectedService.color}10`,
                    borderColor: `${selectedService.color}30`,
                    boxShadow: `0 0 30px ${selectedService.color}12`,
                  }}
                >
                  {selectedService.emoji}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-white font-extrabold text-lg">{selectedService.label}</div>
                  <div className="font-mono text-xs mt-1" style={{ color: selectedService.color }}>
                    We&apos;ll find the perfect fit for your business
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 4: Speech bubble */}
        {step === 4 && (
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
                background: selectedService ? `${selectedService.color}10` : 'rgba(124,58,237,0.06)',
                borderColor: selectedService ? `${selectedService.color}30` : 'rgba(124,58,237,0.2)',
              }}
            >
              {selectedService?.emoji || '🤖'}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-bg-card border border-border rounded-2xl rounded-tl-sm px-5 py-3 inline-block mb-3"
            >
              <p className="text-white text-sm">Almost there! 🚀</p>
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
            {serviceOptions.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 30, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="inline-block mx-3"
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl border animate-pulse"
                  style={{
                    background: `${svc.color}15`,
                    borderColor: `${svc.color}30`,
                    boxShadow: `0 0 40px ${svc.color}20`,
                  }}
                >
                  {svc.emoji}
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
  const selectedService = serviceOptions.find((s) => s.id === form.serviceType);

  if (!selectedService) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="bg-bg-card border border-border rounded-xl p-4 mt-4 overflow-hidden"
    >
      <div className="text-[10px] font-mono uppercase tracking-wider text-dim mb-3">YOUR REQUEST</div>
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{ background: `${selectedService.color}15` }}
        >
          {selectedService.emoji}
        </div>
        <div>
          <div className="text-white text-sm font-bold">{selectedService.label}</div>
          <div className="text-dim text-[10px]">We&apos;ll reach out within 24 hours</div>
        </div>
      </div>
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
    serviceType: '',
    message: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return form.name.trim() && form.email.trim();
      case 2: return form.company.trim();
      case 3: return form.serviceType;
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
            {step < 5 ? 'GET STARTED' : 'SUCCESS'}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight"
          >
            {step < 5 ? (
              <>
                Let&apos;s build something
                <br />
                <span className="text-accent">that works for you.</span>
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
              4 quick steps. Then we get to work within 48 hours.
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
                    <p className="text-dim text-sm">Help us understand your needs.</p>
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
                    <h2 className="text-xl font-extrabold text-white mb-1">What are you looking for?</h2>
                    <p className="text-dim text-sm">Select the service that best fits your needs.</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { id: 'ai-employee', emoji: '🤖', label: 'AI Employee', desc: 'A full-time digital worker that handles communication, books appointments, follows up leads, and grows your business 24/7.' },
                      { id: 'ai-agent', emoji: '⚡', label: 'AI Agent', desc: 'A standalone intelligent agent for a specific task — WhatsApp bot, receptionist, lead capture, or content creation.' },
                      { id: 'web-design', emoji: '🎨', label: 'Web Design', desc: 'Custom website design, e-commerce store, or smart website with AI chat — built to convert.' },
                      { id: 'seo', emoji: '🔍', label: 'SEO Services', desc: 'Data-driven SEO to get your business on page one — technical audits, keyword strategy, local SEO, and ongoing optimization.' },
                    ].map((service) => {
                      const isSelected = form.serviceType === service.id;
                      return (
                        <button
                          key={service.id}
                          onClick={() => updateField('serviceType', service.id)}
                          className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                            isSelected ? 'shadow-lg border-accent/40 bg-accent/[0.04]' : 'border-border hover:border-white/15'
                          }`}
                          style={{
                            boxShadow: isSelected ? '0 0 40px rgba(124,58,237,0.1)' : undefined,
                          }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-2xl">{service.emoji}</div>
                            <div className="text-white font-extrabold">{service.label}</div>
                          </div>
                          <p className="text-dim text-xs leading-relaxed">{service.desc}</p>
                          {/* Selection indicator */}
                          <div className="mt-3 flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected ? 'border-accent' : 'border-white/15'
                              }`}
                            >
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-2 h-2 rounded-full bg-accent"
                                />
                              )}
                            </div>
                            <span className="text-[10px]" style={{ color: isSelected ? '#7C3AED' : 'rgba(255,255,255,0.3)' }}>
                              {isSelected ? 'Selected' : `Select ${service.label}`}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
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
                    {form.serviceType && (
                      <div className="text-white text-sm">
                        <strong>Service:</strong> {serviceOptions.find((s) => s.id === form.serviceType)?.label}
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
