import ScrollToTop from '@/components/shared/ScrollToTop';
import Hero from '@/components/services/social-media/Hero';
import ProblemSection from '@/components/services/social-media/ProblemSection';
import InteractiveDemo from '@/components/services/social-media/InteractiveDemo';
import HowItWorks from '@/components/services/social-media/HowItWorks';
import ResultsSection from '@/components/services/social-media/ResultsSection';
import Testimonials from '@/components/home/Testimonials';

export const metadata = {
  title: 'AI Social Media Manager — Post, Engage & Grow on Every Platform',
  description:
    'Your AI social media manager creates content, schedules posts, responds to DMs, and tracks performance across Instagram, Facebook, LinkedIn, and more — all on autopilot.',
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
