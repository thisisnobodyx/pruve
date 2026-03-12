import ContactPage from '@/components/contact/ContactPage';
import ScrollToTop from '@/components/shared/ScrollToTop';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Pruve. Book a strategy call or send us a message.',
};

export default function Page() {
  return (
    <>
      <ScrollToTop />
      <ContactPage />
    </>
  );
}
