import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const metadata = {
  title: 'Smart Website',
  description:
    'AI-powered websites that chat with visitors, personalize content in real time, capture leads automatically, and convert browsers into buyers.',
};

export default function SmartWebsitePage() {
  return (
    <ServicePageTemplate
      name="Smart Website"
      tagline="Websites that think."
      description="AI-powered websites that chat with visitors, personalize content in real time, capture leads automatically, and convert browsers into buyers."
      icon="Layout"
      accentColor="#7C3AED"
      features={[
        {
          title: 'AI Chat Assistant',
          description:
            'A built-in conversational agent that answers visitor questions instantly, guides them to the right products, and captures contact details — 24/7.',
        },
        {
          title: 'Dynamic Personalization',
          description:
            'Pages adapt in real time based on visitor behavior, location, and referral source. Every user sees the most relevant content and offers.',
        },
        {
          title: 'Automatic Lead Capture',
          description:
            'Smart forms and chat prompts appear at the perfect moment to collect leads. Contact data syncs directly to your CRM without manual entry.',
        },
        {
          title: 'Conversion Optimization',
          description:
            'AI-powered A/B testing continuously experiments with layouts, copy, and CTAs to maximize conversion rates without any manual intervention.',
        },
        {
          title: 'Blazing-Fast Performance',
          description:
            'Built on modern frameworks with edge delivery for sub-second load times. Fast sites rank higher and keep visitors engaged longer.',
        },
        {
          title: 'Analytics Dashboard',
          description:
            'Understand exactly how visitors interact with your site. Track conversations, heatmaps, conversion funnels, and revenue attribution in one place.',
        },
      ]}
      howItWorks={[
        {
          number: '01',
          title: 'Strategy & Design',
          description:
            'We map your customer journey and design a site architecture that guides visitors toward conversion. You approve the look and feel before we build.',
        },
        {
          number: '02',
          title: 'Build & Train',
          description:
            'We develop your site with AI features baked in and train the chat assistant on your products, services, and FAQs so it responds accurately from day one.',
        },
        {
          number: '03',
          title: 'Launch & Evolve',
          description:
            'Your smart website goes live and starts learning immediately. It gets smarter with every visit, continuously improving personalization and conversions.',
        },
      ]}
      benefits={[
        'Convert visitors while you sleep',
        'Personalized experience for every user',
        'Instant answers without human support staff',
        'Leads captured and synced automatically',
        'Higher rankings with faster load times',
        'Continuous A/B testing runs on autopilot',
        'Real-time analytics and revenue tracking',
        'Scales effortlessly as your traffic grows',
      ]}
    />
  );
}
