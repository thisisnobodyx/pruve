import ScrollToTop from '@/components/shared/ScrollToTop';
import SEOHero from '@/components/services/seo/Hero';
import ProblemSection from '@/components/services/seo/ProblemSection';
import InteractiveDemo from '@/components/services/seo/InteractiveDemo';
import HowItWorks from '@/components/services/seo/HowItWorks';
import ResultsSection from '@/components/services/seo/ResultsSection';
import Testimonials from '@/components/home/Testimonials';

export const metadata = {
  title: 'SEO Services — Get Found on Google and Drive Organic Traffic',
  description:
    'Data-driven SEO that gets your business to the top of Google. Technical audits, keyword strategy, content optimization, and local SEO. Request a free SEO audit from Pruve.',
};

export default function SEORoute() {
  return (
    <main>
      <ScrollToTop />
      <SEOHero />
      <ProblemSection />
      <InteractiveDemo />
      <HowItWorks />
      <Testimonials />
      <ResultsSection />
    </main>
  );
}
