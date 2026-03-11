import ScrollToTop from '@/components/shared/ScrollToTop';
import Hero from '@/components/services/content-engine/Hero';
import ProblemSection from '@/components/services/content-engine/ProblemSection';
import InteractiveDemo from '@/components/services/content-engine/InteractiveDemo';
import HowItWorks from '@/components/services/content-engine/HowItWorks';
import ResultsSection from '@/components/services/content-engine/ResultsSection';

export const metadata = {
  title: 'Content Engine — Pruve',
  description: 'AI-generated blog posts, social captions, email campaigns, and ad copy — tailored to your brand voice.',
};

export default function ContentEnginePage() {
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
