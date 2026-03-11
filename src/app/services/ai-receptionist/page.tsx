import ServicePageTemplate from '@/components/services/ServicePageTemplate';

export const metadata = {
  title: 'AI Receptionist',
  description:
    'An intelligent AI receptionist that answers calls, schedules appointments, routes inquiries, and never takes a day off.',
};

export default function AIReceptionistPage() {
  return (
    <ServicePageTemplate
      name="AI Receptionist"
      tagline="Your front desk, always open."
      description="An intelligent AI receptionist that answers calls, schedules appointments, routes inquiries, and never takes a day off."
      icon="Headphones"
      accentColor="#C9A84C"
      features={[
        {
          title: 'Natural Voice Interaction',
          description:
            'Greet callers with a warm, human-like voice that understands context, handles interruptions, and adapts tone to match the situation.',
        },
        {
          title: 'Appointment Scheduling',
          description:
            'Book, reschedule, and confirm appointments in real time. Syncs directly with Google Calendar, Outlook, or your custom scheduling system.',
        },
        {
          title: 'Intelligent Call Routing',
          description:
            'Identify caller intent instantly and route to the right department or team member — no phone trees, no hold music, no frustration.',
        },
        {
          title: 'After-Hours Coverage',
          description:
            'Never miss a call again. The AI receptionist handles inquiries 24/7, capturing messages and booking appointments even at midnight.',
        },
        {
          title: 'Caller Identification',
          description:
            'Recognize returning callers automatically, pull up their history, and deliver personalized greetings that make every interaction feel premium.',
        },
        {
          title: 'Live Transcription & Logs',
          description:
            'Every call is transcribed and logged with timestamps, summaries, and action items so your team has full context without listening to recordings.',
        },
      ]}
      howItWorks={[
        {
          number: '01',
          title: 'Set Up Your Receptionist',
          description:
            'Define your business hours, services, team directory, and greeting scripts. We configure the AI to represent your brand exactly how you want.',
        },
        {
          number: '02',
          title: 'Route Your Calls',
          description:
            'Forward your business line or set up a dedicated number. Calls are answered instantly with no wait time and no missed opportunities.',
        },
        {
          number: '03',
          title: 'Review & Refine',
          description:
            'Monitor call logs, review transcriptions, and fine-tune responses. The AI continuously learns from interactions to improve over time.',
        },
      ]}
      benefits={[
        'Answer every call within two rings',
        'Eliminate hold times for your customers',
        'Save thousands on front-desk staffing',
        'Consistent professional experience every call',
        'Instant handoff to staff when needed',
        'Detailed call summaries delivered automatically',
        'Scales from ten to ten thousand calls',
        'Works with any existing phone system',
      ]}
    />
  );
}
