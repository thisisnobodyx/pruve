import ScrollToTop from '@/components/shared/ScrollToTop';
import SEOPage from '@/components/services/seo/SEOPage';

export const metadata = {
  title: 'SEO Services — Pruve',
  description:
    'Dominate search results with data-driven SEO. Technical audits, keyword strategy, content optimization, and local SEO. Get a quote from Pruve.',
};

export default function SEORoute() {
  return (
    <main>
      <ScrollToTop />
      <SEOPage />
    </main>
  );
}
