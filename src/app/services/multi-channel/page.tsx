import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const metadata = {
  title: 'Multi-Channel Agent',
  description:
    'Deploy a single AI agent across WhatsApp, Telegram, Discord, Instagram DMs, and your website — with unified conversation history.',
};

export default function MultiChannelPage() {
  return (
    <ServicePageTemplate
      name="Multi-Channel Agent"
      tagline="One brain. Every platform."
      description="Deploy a single AI agent across WhatsApp, Telegram, Discord, Instagram DMs, and your website — with unified conversation history."
      icon="Globe"
      accentColor="#7C3AED"
      features={[
        {
          title: 'Unified Conversation History',
          description:
            'Every customer interaction is stored in one timeline, regardless of channel. Switch from WhatsApp to email without losing a single detail.',
        },
        {
          title: 'One-Click Deployment',
          description:
            'Connect new channels in minutes, not weeks. Add WhatsApp, Telegram, Discord, Instagram, or web chat from a single dashboard.',
        },
        {
          title: 'Consistent Brand Voice',
          description:
            'The same AI personality, knowledge base, and response quality across every platform — so your brand feels seamless everywhere.',
        },
        {
          title: 'Channel-Aware Responses',
          description:
            'Automatically adapt message format, length, and media to suit each platform. Rich cards on web, concise text on SMS, images on Instagram.',
        },
        {
          title: 'Cross-Channel Handoffs',
          description:
            'Start a conversation on Instagram and continue it on WhatsApp without repeating context. The agent remembers everything across platforms.',
        },
        {
          title: 'Centralized Analytics',
          description:
            'Compare performance across all channels in one dashboard. Identify where customers engage most and optimize your presence accordingly.',
        },
      ]}
      howItWorks={[
        {
          number: '01',
          title: 'Connect Your Channels',
          description:
            'Link your WhatsApp, Telegram, Discord, Instagram, and website chat accounts through our integration dashboard. Setup takes minutes per channel.',
        },
        {
          number: '02',
          title: 'Configure Your Agent',
          description:
            'Set your knowledge base, brand voice, and channel-specific rules once. The AI adapts its behavior automatically for each platform.',
        },
        {
          number: '03',
          title: 'Manage From One Place',
          description:
            'Monitor all conversations, review analytics, and manage escalations from a single unified inbox. No more switching between apps.',
        },
      ]}
      benefits={[
        'Reach customers on their preferred platform',
        'Eliminate siloed conversations across channels',
        'Reduce tool sprawl with one dashboard',
        'Maintain brand consistency automatically',
        'Scale to new channels without extra cost',
        'Complete customer context in every interaction',
        'Cut average response time by 80%',
        'One knowledge base powers every channel',
      ]}
    />
  );
}
