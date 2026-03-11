import ScrollToTop from '@/components/shared/ScrollToTop';
import Hero from '@/components/services/ai-receptionist/Hero';
import ProblemSection from '@/components/services/ai-receptionist/ProblemSection';
import InteractiveDemo from '@/components/services/ai-receptionist/InteractiveDemo';
import HowItWorks from '@/components/services/ai-receptionist/HowItWorks';
import ResultsSection from '@/components/services/ai-receptionist/ResultsSection';

export const metadata = {
  title: 'AI Receptionist — Pruve',
  description: 'AI receptionist that answers calls 24/7, books appointments, and never puts customers on hold.',
};

export default function AIReceptionistPage() {
  return (
    <main>
      <ScrollToTop />
      <Hero />
      <ProblemSection />
      <InteractiveDemo />
      <HowItWorks />
      <ResultsSection />
    </main>
  );
}
