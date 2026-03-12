import ScrollToTop from '@/components/shared/ScrollToTop';
import WebDesignPage from '@/components/services/web-design/WebDesignPage';

export const metadata = {
  title: 'Web Design — Pruve',
  description:
    'Custom-designed, high-converting websites built for speed, mobile, and results. Get a quote from Pruve.',
};

export default function WebDesignRoute() {
  return (
    <main>
      <ScrollToTop />
      <WebDesignPage />
    </main>
  );
}
