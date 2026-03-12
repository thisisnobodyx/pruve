import ScrollToTop from '@/components/shared/ScrollToTop';
import Hero from '@/components/services/workflow/Hero';
import ProblemSection from '@/components/services/workflow/ProblemSection';
import InteractiveDemo from '@/components/services/workflow/InteractiveDemo';
import HowItWorks from '@/components/services/workflow/HowItWorks';
import ResultsSection from '@/components/services/workflow/ResultsSection';
import Testimonials from '@/components/home/Testimonials';

export const metadata = {
  title: 'Workflow Automation — Connect Your Tools & Eliminate Manual Work',
  description:
    'Custom AI workflow automations that connect all your tools, eliminate manual data entry, classify emails, and keep your business running like clockwork. Zero busywork.',
};

export default function WorkflowPage() {
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
