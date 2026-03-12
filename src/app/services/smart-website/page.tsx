import Hero from '@/components/services/smart-website/Hero';
import ProblemSection from '@/components/services/smart-website/ProblemSection';
import InteractiveDemo from '@/components/services/smart-website/InteractiveDemo';
import HowItWorks from '@/components/services/smart-website/HowItWorks';
import ResultsSection from '@/components/services/smart-website/ResultsSection';
import Testimonials from '@/components/home/Testimonials';
import ScrollToTop from '@/components/shared/ScrollToTop';

export const metadata = {
  title: 'Smart Website — Pruve',
  description:
    'AI-powered websites that chat with visitors, personalize content in real time, capture leads automatically, and convert browsers into buyers.',
};

export default function SmartWebsitePage() {
  return (
    <>
      <ScrollToTop />
      <Hero />
      <ProblemSection />
      <InteractiveDemo />
      <HowItWorks />
      <Testimonials />
      <ResultsSection />
    </>
  );
}
