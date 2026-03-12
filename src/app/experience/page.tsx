import type { Metadata } from 'next';
import ScrollToTop from '@/components/shared/ScrollToTop';
import ExperiencePage from '@/components/experience/ExperiencePage';

export const metadata: Metadata = {
  title: 'Experience Your AI Employee — Live Demo',
  description:
    'See your AI employee in action before you hire. Choose your industry and watch a full day simulation of how Pruve AI handles calls, leads, and operations for your business.',
};

export default function Experience() {
  return (
    <>
      <ScrollToTop />
      <ExperiencePage />
    </>
  );
}
