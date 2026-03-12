'use client';

import { useState, useRef } from 'react';
import IndustrySelector from './IndustrySelector';
import DaySimulation from './DaySimulation';
import CapabilityExplorer from './CapabilityExplorer';
import ImpactSection from './ImpactSection';

export default function ExperiencePage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const simulationRef = useRef<HTMLDivElement>(null);

  const handleIndustrySelect = (id: string) => {
    setSelectedIndustry(id);
    // Smooth scroll to simulation after short delay for state to update
    setTimeout(() => {
      simulationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  return (
    <>
      <IndustrySelector
        selectedIndustry={selectedIndustry}
        onSelect={handleIndustrySelect}
      />
      <div ref={simulationRef}>
        {selectedIndustry && <DaySimulation industryId={selectedIndustry} />}
      </div>
      <CapabilityExplorer selectedIndustry={selectedIndustry} />
      <ImpactSection selectedIndustry={selectedIndustry} />
    </>
  );
}
