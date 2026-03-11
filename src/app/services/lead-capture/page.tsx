import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const metadata = {
  title: 'Lead Capture',
  description:
    'Automated lead capture, qualification, and follow-up sequences that ensure no potential customer slips through the cracks.',
};

export default function LeadCapturePage() {
  return (
    <ServicePageTemplate
      name="Lead Capture"
      tagline="Catch every lead. Convert more."
      description="Automated lead capture, qualification, and follow-up sequences that ensure no potential customer slips through the cracks."
      icon="Target"
      accentColor="#C8F135"
      features={[
        {
          title: 'Conversational Lead Forms',
          description:
            'Replace static forms with AI-driven conversations that ask the right questions at the right time, increasing completion rates dramatically.',
        },
        {
          title: 'Instant Lead Qualification',
          description:
            'Score and segment leads automatically based on responses, behavior, and fit. Your sales team only sees the opportunities worth pursuing.',
        },
        {
          title: 'Automated Follow-Up Sequences',
          description:
            'Trigger personalized follow-up messages via WhatsApp, email, or SMS based on lead status. No manual effort, no leads forgotten.',
        },
        {
          title: 'CRM Integration',
          description:
            'Push qualified leads directly into HubSpot, Salesforce, Pipedrive, or your preferred CRM with all conversation context attached.',
        },
        {
          title: 'Smart Re-Engagement',
          description:
            'Automatically re-engage cold leads with targeted messages at optimal intervals, bringing dormant prospects back into your pipeline.',
        },
        {
          title: 'Pipeline Analytics',
          description:
            'Visualize your entire lead funnel from first touch to conversion. Identify bottlenecks, measure ROI, and forecast revenue with confidence.',
        },
      ]}
      howItWorks={[
        {
          number: '01',
          title: 'Define Your Ideal Lead',
          description:
            'Set your qualification criteria, scoring rules, and target customer profile. The AI uses this to prioritize high-value prospects automatically.',
        },
        {
          number: '02',
          title: 'Deploy Capture Points',
          description:
            'Add AI-powered lead capture to your website, WhatsApp, social media, and landing pages. Every touchpoint becomes a conversion opportunity.',
        },
        {
          number: '03',
          title: 'Nurture & Convert',
          description:
            'Qualified leads enter automated follow-up sequences while your sales team receives real-time alerts for the hottest opportunities.',
        },
      ]}
      benefits={[
        'Never lose a lead to slow follow-up',
        'Increase conversion rates by up to 3x',
        'Qualify leads instantly without manual effort',
        'Sync seamlessly with your existing CRM',
        'Re-engage cold leads on autopilot',
        'Capture leads from every customer touchpoint',
        'Personalized outreach at massive scale',
        'Full visibility from first touch to close',
      ]}
    />
  );
}
