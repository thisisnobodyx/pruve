import ScrollToTop from '@/components/shared/ScrollToTop';
import Hero from '@/components/services/lead-capture/Hero';
import ProblemSection from '@/components/services/lead-capture/ProblemSection';
import InteractiveDemo from '@/components/services/lead-capture/InteractiveDemo';
import HowItWorks from '@/components/services/lead-capture/HowItWorks';
import ResultsSection from '@/components/services/lead-capture/ResultsSection';
import Testimonials from '@/components/home/Testimonials';

export const metadata = {
  title: 'AI Lead Capture — Qualify, Score & Follow Up Automatically',
  description:
    'Never lose a lead again. Pruve\'s AI captures every inquiry, scores and qualifies them, sends intake forms, and follows up on autopilot until they convert.',
};

export default function LeadCapturePage() {
  return (
    <main>
      <ScrollToTop />
      <Hero />
      <ProblemSection />
      <InteractiveDemo />
      <HowItWorks />
      <Testimonials />
      <ResultsSection />
    </main>
  );
}
