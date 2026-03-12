import ScrollToTop from '@/components/shared/ScrollToTop';
import Hero from '@/components/services/content-engine/Hero';
import ProblemSection from '@/components/services/content-engine/ProblemSection';
import InteractiveDemo from '@/components/services/content-engine/InteractiveDemo';
import HowItWorks from '@/components/services/content-engine/HowItWorks';
import ResultsSection from '@/components/services/content-engine/ResultsSection';
import Testimonials from '@/components/home/Testimonials';

export const metadata = {
  title: 'AI Content Engine — Blog Posts, Social Media & Email on Autopilot',
  description:
    'AI-powered content creation tailored to your brand voice. Automated blog posts, social captions, email campaigns, and ad copy — produced daily without lifting a finger.',
};

export default function ContentEnginePage() {
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
