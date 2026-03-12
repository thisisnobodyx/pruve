import ScrollToTop from '@/components/shared/ScrollToTop';
import WebDesignHero from '@/components/services/web-design/Hero';
import ProblemSection from '@/components/services/web-design/ProblemSection';
import InteractiveDemo from '@/components/services/web-design/InteractiveDemo';
import HowItWorks from '@/components/services/web-design/HowItWorks';
import ResultsSection from '@/components/services/web-design/ResultsSection';
import Testimonials from '@/components/home/Testimonials';

export const metadata = {
  title: 'Web Design — Pruve',
  description:
    'Custom-designed, high-converting websites built for speed, mobile, and results. Get a quote from Pruve.',
};

export default function WebDesignRoute() {
  return (
    <main>
      <ScrollToTop />
      <WebDesignHero />
      <ProblemSection />
      <InteractiveDemo />
      <HowItWorks />
      <Testimonials />
      <ResultsSection />
    </main>
  );
}
