import ScrollToTop from '@/components/shared/ScrollToTop';
import Hero from '@/components/services/lead-capture/Hero';
import ProblemSection from '@/components/services/lead-capture/ProblemSection';
import InteractiveDemo from '@/components/services/lead-capture/InteractiveDemo';
import HowItWorks from '@/components/services/lead-capture/HowItWorks';
import ResultsSection from '@/components/services/lead-capture/ResultsSection';
import Testimonials from '@/components/home/Testimonials';

export const metadata = {
  title: 'Lead Capture — Pruve',
  description:
    'Automated lead capture, qualification, and follow-up sequences that ensure no potential customer slips through the cracks.',
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
