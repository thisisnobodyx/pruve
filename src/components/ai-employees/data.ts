// Shared data for AI Employees page — new positioning

export interface TierRole {
  id: string;
  name: string;
  label: string;
  price: number;
  color: string;
  shortDesc: string;
  fullDesc: string;
  capabilities: string[];
}

export const tierRoles: TierRole[] = [
  {
    id: 'operator',
    name: 'The Operator',
    label: 'Communication',
    price: 297,
    color: '#7DF9C0',
    shortDesc: 'Handles all communication across every channel, 24/7.',
    fullDesc:
      'The Operator handles every inbound and outbound message your business receives. WhatsApp, Instagram DMs, Telegram, email — it responds instantly, books appointments, answers FAQs, remembers every customer by name, and never lets a message slip through the cracks. Your customers think they are talking to your best employee.',
    capabilities: [
      'Responds to WhatsApp, Instagram, and Telegram instantly',
      'Books appointments and manages your calendar',
      'Remembers every customer and their history',
      'Sends follow-up messages automatically',
      'Handles FAQs with perfect brand voice',
      'Escalates to you only when needed',
    ],
  },
  {
    id: 'manager',
    name: 'The Manager',
    label: 'Growth',
    price: 597,
    color: '#7C3AED',
    shortDesc: 'Everything the Operator does, plus it grows your business.',
    fullDesc:
      'The Manager does everything the Operator does — and then it goes further. It creates and posts content on your social media, follows up on every lead until they convert, monitors your online reviews, sends your customers re-engagement campaigns, and briefs you every morning on what happened overnight. It does not just communicate — it sells.',
    capabilities: [
      'Everything The Operator does',
      'Creates and posts social media content',
      'Follows up on every lead automatically',
      'Monitors and responds to online reviews',
      'Sends weekly performance reports',
      'Runs re-engagement campaigns for past customers',
    ],
  },
  {
    id: 'executive',
    name: 'The Executive',
    label: 'Autonomous Ops',
    price: 1197,
    color: '#C8F135',
    shortDesc: 'Runs your entire operation autonomously.',
    fullDesc:
      'The Executive runs your business while you sleep. It does everything the Manager does, plus it monitors your competitors, automates your internal workflows, generates strategic reports, manages vendor communications, and learns new skills on its own as your business evolves. You wake up to a morning briefing — not a to-do list.',
    capabilities: [
      'Everything The Manager does',
      'Monitors competitors and alerts you to changes',
      'Automates internal workflows end-to-end',
      'Delivers daily morning briefings via voice note',
      'Manages vendor and partner communications',
      'Learns new skills as your business evolves',
    ],
  },
];

export interface HowItWorksStep {
  id: string;
  title: string;
  description: string;
  icons: string[];
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: 'lives-in-apps',
    title: 'It lives in your apps',
    description:
      'Your AI Employee operates inside the tools you already use. No new dashboards. No logins. Just WhatsApp, Instagram, and Telegram.',
    icons: ['💬', '📸', '✈️'],
  },
  {
    id: 'handles-everything',
    title: 'It handles everything',
    description:
      'Messages, bookings, leads, reviews, content, invoices. One employee. Every channel. 24/7.',
    icons: ['📥', '📅', '🧲', '⭐', '✍️', '📄'],
  },
  {
    id: 'gets-smarter',
    title: 'It gets smarter',
    description:
      'Every interaction teaches it more about your business. By month 3, it handles things you didn\'t even configure.',
    icons: ['🧠', '📈', '⚡'],
  },
  {
    id: 'stay-in-control',
    title: 'You stay in control',
    description:
      'Morning briefings. Instant alerts. Voice note commands. You\'re always the boss — but you\'re never the bottleneck.',
    icons: ['☀️', '🔔', '🎙️'],
  },
];

export interface ComparisonItem {
  label: string;
  chatbot: string;
  aiEmployee: string;
}

export const comparisonItems: ComparisonItem[] = [
  { label: 'Initiative', chatbot: 'Waits for commands', aiEmployee: 'Works without being asked' },
  { label: 'Interface', chatbot: 'Needs a dashboard', aiEmployee: 'Lives in your apps' },
  { label: 'Adaptability', chatbot: 'Breaks after updates', aiEmployee: 'Gets smarter every month' },
  { label: 'Personalization', chatbot: 'Generic responses', aiEmployee: 'Knows your customers by name' },
  { label: 'Management', chatbot: 'You manage it', aiEmployee: 'Manages itself' },
];

export interface TechStackItem {
  name: string;
  description: string;
  color: string;
}

export const techStack: TechStackItem[] = [
  {
    name: 'OpenClaw',
    description: 'The brain — browses the web, remembers everything, writes its own new skills',
    color: '#7DF9C0',
  },
  {
    name: 'Claude',
    description: 'The intelligence — understands context, generates human-quality responses',
    color: '#7C3AED',
  },
  {
    name: 'n8n',
    description: 'The nervous system — connects every tool, automates every workflow',
    color: '#C8F135',
  },
];
