'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import IndustrySelector from './IndustrySelector';
import DaySimulation from './DaySimulation';
import CapabilityExplorer from './CapabilityExplorer';
import ComplianceSection from './ComplianceSection';
import ImpactSection from './ImpactSection';
import type { Industry } from './experience-data';

export default function ExperiencePage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [customPlan, setCustomPlan] = useState<Industry | null>(null);
  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState('');
  const simulationRef = useRef<HTMLDivElement>(null);

  const handleIndustrySelect = async (id: string) => {
    setCustomPlan(null);
    setCustomError('');

    // Standard industry from the list
    if (!id.startsWith('custom:')) {
      setSelectedIndustry(id);
      setTimeout(() => {
        simulationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
      return;
    }

    // Custom industry — fetch an AI-generated plan
    const industryName = id.slice(7);
    setSelectedIndustry(id);
    setCustomLoading(true);

    setTimeout(() => {
      simulationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30_000); // 30s max

      const res = await fetch('/api/experience-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry: industryName }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const data = await res.json();
      if (data.plan) {
        setCustomPlan(data.plan);
      } else {
        setCustomError(data.error || 'Could not generate plan — please try again');
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setCustomError('Request timed out — please try again');
      } else {
        setCustomError('Network error — please try again');
      }
    }
    setCustomLoading(false);
  };

  // The effective industry ID passed to sub-components
  // For custom plans, use the generated plan's id once loaded, else keep the custom: id
  const effectiveId = customPlan ? customPlan.id : selectedIndustry;

  return (
    <>
      <IndustrySelector
        selectedIndustry={selectedIndustry}
        onSelect={handleIndustrySelect}
      />

      <div ref={simulationRef}>
        {/* Loading state for custom AI plan */}
        {customLoading && selectedIndustry?.startsWith('custom:') && (
          <div className="min-h-[50vh] flex flex-col items-center justify-center gap-6 px-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
              <span className="absolute inset-0 flex items-center justify-center text-2xl">✨</span>
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-lg mb-2">
                Building your AI employee experience...
              </p>
              <p className="text-dim text-sm">
                Generating a custom simulation for &ldquo;{selectedIndustry.slice(7)}&rdquo;
              </p>
            </div>
            {/* Shimmer skeleton */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 rounded-2xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error state */}
        {customError && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-red-400 text-sm">{customError}</p>
            <button
              onClick={() => selectedIndustry && handleIndustrySelect(selectedIndustry)}
              className="text-accent text-sm underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Custom plan loaded — inject it directly */}
        {customPlan && !customLoading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <DaySimulation industryId={customPlan.id} customIndustry={customPlan} />
          </motion.div>
        )}

        {/* Standard industry from list */}
        {effectiveId && !selectedIndustry?.startsWith('custom:') && (
          <DaySimulation industryId={effectiveId} />
        )}
      </div>

      <CapabilityExplorer selectedIndustry={effectiveId} customIndustry={customPlan ?? undefined} />
      <ComplianceSection selectedIndustry={effectiveId} />
      <ImpactSection selectedIndustry={effectiveId} customIndustry={customPlan ?? undefined} />
    </>
  );
}
