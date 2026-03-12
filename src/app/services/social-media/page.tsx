import ScrollToTop from '@/components/shared/ScrollToTop';
import Hero from '@/components/services/social-media/Hero';
import ProblemSection from '@/components/services/social-media/ProblemSection';
import InteractiveDemo from '@/components/services/social-media/InteractiveDemo';
import HowItWorks from '@/components/services/social-media/HowItWorks';
import ResultsSection from '@/components/services/social-media/ResultsSection';
import Testimonials from '@/components/home/Testimonials';

export const metadata = {
  title: 'Social Media AI — Pruve',
  description:
    'AI social media manager that creates content, schedules posts, and grows your audience across every platform.',
};

export default function SocialMediaPage() {
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
