import type { Metadata } from 'next';
import ScrollToTop from '@/components/shared/ScrollToTop';
import ExperiencePage from '@/components/experience/ExperiencePage';

export const metadata: Metadata = {
  title: 'Experience | Pruve.co',
  description:
    'See your AI Employee in action. Choose your industry and watch a full day simulation of how AI transforms your business.',
};

export default function Experience() {
  return (
    <>
      <ScrollToTop />
      <ExperiencePage />
    </>
  );
}
