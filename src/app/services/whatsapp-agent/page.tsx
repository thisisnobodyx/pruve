import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const metadata = {
  title: 'WhatsApp Agent',
  description:
    'An AI-powered WhatsApp agent that responds to customers instantly, captures leads, takes bookings, and handles FAQs — all without human intervention.',
};

export default function WhatsAppAgentPage() {
  return (
    <ServicePageTemplate
      name="WhatsApp Agent"
      tagline="Your 24/7 customer conversations, handled."
      description="An AI-powered WhatsApp agent that responds to customers instantly, captures leads, takes bookings, and handles FAQs — all without human intervention."
      icon="MessageCircle"
      accentColor="#25D366"
      features={[
        {
          title: 'Instant Auto-Replies',
          description:
            'Respond to every incoming message within seconds, day or night. Customers never wait, and you never miss an opportunity.',
        },
        {
          title: 'Smart Lead Capture',
          description:
            'Automatically collect contact details, preferences, and buying intent through natural conversation — no forms required.',
        },
        {
          title: 'Booking Management',
          description:
            'Let customers schedule, reschedule, or cancel appointments directly in WhatsApp. Syncs with your calendar in real time.',
        },
        {
          title: 'Intelligent FAQ Handling',
          description:
            'Train the agent on your knowledge base so it answers product questions, pricing inquiries, and policy details accurately every time.',
        },
        {
          title: 'Multi-Language Support',
          description:
            'Engage customers in their preferred language with automatic detection and fluent responses in over 50 languages.',
        },
        {
          title: 'Conversation Analytics',
          description:
            'Track response times, resolution rates, and customer sentiment with a real-time dashboard that surfaces actionable insights.',
        },
      ]}
      howItWorks={[
        {
          number: '01',
          title: 'Connect Your Number',
          description:
            'Link your existing WhatsApp Business number in minutes. We handle the API setup, verification, and configuration so you can focus on your business.',
        },
        {
          number: '02',
          title: 'Train Your Agent',
          description:
            'Upload your FAQs, product catalog, and brand guidelines. The AI learns your tone of voice and business rules to respond just like your best team member.',
        },
        {
          number: '03',
          title: 'Go Live & Optimize',
          description:
            'Launch your agent and watch it handle conversations autonomously. Review analytics, refine responses, and scale confidently as volume grows.',
        },
      ]}
      benefits={[
        'Respond to customers in under 3 seconds',
        'Capture leads around the clock automatically',
        'Reduce support costs by up to 70%',
        'Handle unlimited concurrent conversations',
        'Seamless handoff to human agents when needed',
        'No app downloads required for customers',
        'Works with your existing WhatsApp number',
        'GDPR-compliant data handling built in',
      ]}
    />
  );
}
