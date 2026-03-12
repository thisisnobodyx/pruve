/* ================================================================
   EXPERIENCE PAGE — Core Data Module
   Interfaces, capabilities, channels, pricing, and helpers.
   Industry-specific data lives in ./industries/*.ts
   ================================================================ */

/* ------------------------------------------------------------------ */
/* TYPE DEFINITIONS                                                     */
/* ------------------------------------------------------------------ */

export type TierId = 'operator' | 'manager' | 'executive';

export type ChannelType =
  | 'whatsapp'
  | 'instagram'
  | 'phone'
  | 'email'
  | 'system'
  | 'google'
  | 'facebook'
  | 'sms';

export interface DayEvent {
  time: string;
  title: string;
  description: string;
  aiResponse: string;
  channel: ChannelType;
  capability: string;
  tier: TierId;
  stat?: { key: 'messages' | 'bookings' | 'savings'; increment: number };
}

export interface Industry {
  id: string;
  label: string;
  emoji: string;
  category: string;
  tagline: string;
  dayEvents: DayEvent[];
  capabilityExamples: Record<string, string>;
  stats: {
    messagesPerDay: number;
    bookingsPerWeek: number;
    monthlySavings: number;
    responseTime: string;
  };
  recommendedTier: TierId;
  recommendationReason: string;
}

export interface Capability {
  id: string;
  name: string;
  icon: string;
  description: string;
  tier: TierId;
  highlights: string[];
}

export interface ChannelMeta {
  id: ChannelType;
  label: string;
  icon: string;
  color: string;
}

export interface Package {
  id: TierId;
  name: string;
  price: number;
  setup: number;
  tagline: string;
  color: string;
  highlights: string[];
}

/* ------------------------------------------------------------------ */
/* CHANNEL METADATA                                                     */
/* ------------------------------------------------------------------ */

export const channels: Record<ChannelType, ChannelMeta> = {
  whatsapp: { id: 'whatsapp', label: 'WhatsApp', icon: '💬', color: '#25D366' },
  instagram: { id: 'instagram', label: 'Instagram', icon: '📸', color: '#E4405F' },
  phone: { id: 'phone', label: 'Phone Call', icon: '📞', color: '#C9A84C' },
  email: { id: 'email', label: 'Email', icon: '📧', color: '#4A90D9' },
  system: { id: 'system', label: 'System', icon: '⚡', color: '#FF6B35' },
  google: { id: 'google', label: 'Google', icon: '⭐', color: '#4285F4' },
  facebook: { id: 'facebook', label: 'Facebook', icon: '👥', color: '#1877F2' },
  sms: { id: 'sms', label: 'SMS', icon: '✉️', color: '#34B7F1' },
};

/* ------------------------------------------------------------------ */
/* TIER COLORS & LABELS                                                 */
/* ------------------------------------------------------------------ */

export const tierColors: Record<TierId, string> = {
  operator: '#7DF9C0',
  manager: '#7C3AED',
  executive: '#C8F135',
};

export const tierLabels: Record<TierId, string> = {
  operator: 'The Operator',
  manager: 'The Manager',
  executive: 'The Executive',
};

/* ------------------------------------------------------------------ */
/* PACKAGES (updated pricing from content brief)                        */
/* ------------------------------------------------------------------ */

export const packages: Package[] = [
  {
    id: 'operator',
    name: 'The Operator',
    price: 297,
    setup: 497,
    tagline: 'Handle all communication and never miss anything',
    color: '#7DF9C0',
    highlights: [
      'One brain across every channel simultaneously',
      'Remembers every customer forever',
      'Morning briefing every day without fail',
      'Books, confirms, reminds, reschedules, fills cancelled slots',
      'Pre-qualifies every lead before you see them',
    ],
  },
  {
    id: 'manager',
    name: 'The Manager',
    price: 597,
    setup: 997,
    tagline: 'Handle communication AND actively grow the business',
    color: '#7C3AED',
    highlights: [
      'Researches every lead before you speak to them',
      'Follows up every lead forever — Day 1, 3, 7, personalized',
      'Manages entire reputation — responds within the hour',
      'Creates and posts all content every week',
      'Weekly Monday report + recovers money left on the table',
    ],
  },
  {
    id: 'executive',
    name: 'The Executive',
    price: 1197,
    setup: 1997,
    tagline: 'Run the entire operation — and keep expanding capabilities',
    color: '#C8F135',
    highlights: [
      'Competitive intelligence every morning',
      'Answers actual phone calls — full conversations',
      'Browses supplier websites and places orders autonomously',
      'Manages the team — owner stops being the bottleneck',
      'Writes its own new skills and gets smarter every month',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 15 CAPABILITIES (from master capability list)                        */
/* ------------------------------------------------------------------ */

export const capabilities: Capability[] = [
  /* ---- OPERATOR TIER ---- */
  {
    id: 'communication',
    name: 'Communication & Channels',
    icon: '💬',
    description: 'One brain across WhatsApp, Instagram, Facebook, iMessage, Telegram, and more.',
    tier: 'operator',
    highlights: [
      'Responds to every channel simultaneously',
      'Full context across channels — knows if someone messaged Instagram yesterday and WhatsApp today',
      'Understands and transcribes voice notes, responds intelligently',
      'Sends voice responses back',
    ],
  },
  {
    id: 'memory',
    name: 'Memory & Intelligence',
    icon: '🧠',
    description: 'Remembers every customer forever — name, history, preferences, complaints.',
    tier: 'operator',
    highlights: [
      'Knows returning vs new customers and responds differently',
      'Detects VIP customers and prioritizes them',
      'Flags previously unhappy customers and handles carefully',
      'Detects emotional tone of every message',
      'Builds a complete second brain from every interaction',
    ],
  },
  {
    id: 'proactive',
    name: 'Proactive & Heartbeat',
    icon: '⏰',
    description: 'Wakes up on schedule, sends morning briefings, flags what needs attention.',
    tier: 'operator',
    highlights: [
      'Morning briefing every day — appointments, urgent flags, new leads',
      'End-of-day summary',
      'Alerts owner immediately when something needs human attention',
      'Detects slow days, sends special offers to regulars',
      'Works overnight while owner sleeps',
    ],
  },
  {
    id: 'bookings',
    name: 'Bookings & Scheduling',
    icon: '📅',
    description: 'Books, confirms, reminds, reschedules — calendar runs itself.',
    tier: 'operator',
    highlights: [
      'Books appointments directly into calendar',
      'Sends confirmations and 24-hour reminders',
      'Handles reschedules and cancellations',
      'Fills cancelled slots automatically',
      'Coordinates schedules across team members',
    ],
  },
  {
    id: 'leads',
    name: 'Lead Management',
    icon: '🧲',
    description: 'Captures every lead, pre-qualifies them, follows up automatically.',
    tier: 'operator',
    highlights: [
      'Captures every lead from every channel',
      'Pre-qualifies leads before they reach the owner',
      'Scores leads by urgency and importance',
      'Sends intake forms and chases completion',
    ],
  },
  /* ---- MANAGER TIER ---- */
  {
    id: 'revenue',
    name: 'Revenue & Finance',
    icon: '💰',
    description: 'Chases invoices, re-engages lapsed customers, recovers revenue.',
    tier: 'manager',
    highlights: [
      'Chases unpaid invoices at 7, 14, 30 days',
      'Re-engages lapsed customers',
      'Broadcasts special offers on slow days',
      'Tracks expenses and organizes receipts',
      'Creates invoices automatically',
    ],
  },
  {
    id: 'reputation',
    name: 'Reputation Management',
    icon: '⭐',
    description: 'Monitors reviews daily, responds within the hour, requests new reviews.',
    tier: 'manager',
    highlights: [
      'Monitors Google, Yelp, Facebook, Tripadvisor daily',
      'Responds to every review within the hour',
      'Flags negative reviews immediately with suggested response',
      'Requests reviews after every completed job',
      'Tracks rating trends weekly',
    ],
  },
  {
    id: 'content',
    name: 'Content & Marketing',
    icon: '✍️',
    description: 'Writes posts, newsletters, ad copy — researches trends, schedules everything.',
    tier: 'manager',
    highlights: [
      'Writes and schedules social media posts weekly',
      'Researches trending topics daily and creates relevant content',
      'Writes email newsletters, WhatsApp broadcasts, blog posts',
      'Creates video scripts for Reels, TikToks, YouTube Shorts',
      'Monthly content performance audit',
    ],
  },
  {
    id: 'reporting',
    name: 'Reporting & Analytics',
    icon: '📊',
    description: 'Weekly reports, monthly audits — ask any question about your business.',
    tier: 'manager',
    highlights: [
      'Weekly Monday report — leads, conversions, content, reputation',
      'Monthly full business health report',
      'Owner can ask any question, gets instant answer',
      'Competitor intelligence report weekly',
    ],
  },
  /* ---- EXECUTIVE TIER ---- */
  {
    id: 'browser',
    name: 'Browser & Web Autonomy',
    icon: '🌐',
    description: 'Controls a real browser — browses competitors, orders supplies, monitors prices.',
    tier: 'executive',
    highlights: [
      'Controls a real browser — clicks, types, fills forms',
      'Browses competitor websites daily',
      'Monitors competitor reviews for weaknesses',
      'Researches and compares supplier prices',
      'Places orders on supplier websites within approved budget',
    ],
  },
  {
    id: 'team',
    name: 'Team Management',
    icon: '👥',
    description: 'Team messages AI directly for answers, schedules, tasks — owner stops being bottleneck.',
    tier: 'executive',
    highlights: [
      'Team members message AI directly for answers, schedules, tasks',
      'Monitors team group chats, flags key decisions to owner',
      'Coordinates tasks across team',
      'Owner voice notes a task → AI delegates and tracks to completion',
    ],
  },
  {
    id: 'workflow',
    name: 'Workflow & Automation',
    icon: '⚙️',
    description: 'Connects all business tools — no manual data entry anywhere.',
    tier: 'executive',
    highlights: [
      'Connects all business tools — no manual data entry',
      'Reads and classifies emails, responds to routine ones',
      'Meeting transcripts → action items → assigned automatically',
      'Syncs data across Notion, Airtable, Google Sheets, Supabase',
    ],
  },
  {
    id: 'voice',
    name: 'Voice & Mobile',
    icon: '🎙️',
    description: 'Answers actual phone calls, wake word activation, voice task execution.',
    tier: 'executive',
    highlights: [
      'Answers actual phone calls — full conversations',
      'Transfers calls to owner when needed, sends full transcript',
      'Wake word activation + push-to-talk',
      'Owner voice notes a task from phone → fully executed',
    ],
  },
  {
    id: 'multiagent',
    name: 'Multi-Agent & Self-Expansion',
    icon: '🤖',
    description: 'Writes its own new skills — in month 6, doing things not yet configured.',
    tier: 'executive',
    highlights: [
      'Runs multiple specialized agents simultaneously',
      'Searches for new skills and installs them automatically',
      'Writes brand new skills from scratch when nothing exists',
      'Updates itself — monthly report of new capabilities added',
    ],
  },
  {
    id: 'environment',
    name: 'Smart Environment',
    icon: '🏠',
    description: 'Controls smart devices, reads notifications, builds its own integrations.',
    tier: 'executive',
    highlights: [
      'Controls smart home and IoT devices',
      'Reads device notifications and location',
      'Found devices on network and built its own control skill',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* INDUSTRY CATEGORIES (for dropdown grouping)                          */
/* ------------------------------------------------------------------ */

export const industryCategories = [
  'Food & Hospitality',
  'Health & Wellness',
  'Home Services',
  'Professional Services',
  'Retail & E-Commerce',
  'Auto',
  'Education & Childcare',
  'Other',
] as const;

/* ------------------------------------------------------------------ */
/* HELPER FUNCTIONS                                                     */
/* ------------------------------------------------------------------ */

export function getCapability(id: string): Capability | undefined {
  return capabilities.find((c) => c.id === id);
}

export function getCapabilitiesByTier(tier: TierId): Capability[] {
  const tierOrder: TierId[] = ['operator', 'manager', 'executive'];
  const maxIndex = tierOrder.indexOf(tier);
  return capabilities.filter((c) => tierOrder.indexOf(c.tier) <= maxIndex);
}

export function getTierForCapability(capId: string): TierId {
  return capabilities.find((c) => c.id === capId)?.tier ?? 'operator';
}

export function getPackage(tier: TierId): Package {
  return packages.find((p) => p.id === tier)!;
}
