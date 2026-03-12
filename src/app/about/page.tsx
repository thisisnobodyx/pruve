import AboutPage from '@/components/about/AboutPage';
import ScrollToTop from '@/components/shared/ScrollToTop';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet the team behind Pruve. We build AI agents that run your business.',
};

export default function Page() {
  return (
    <>
      <ScrollToTop />
      <AboutPage />
    </>
  );
}
