'use client';

const ROW_1_ITEMS = [
  'AI Agents',
  'Workflow Automation',
  'WhatsApp Bots',
  'Lead Capture',
  'Content Engine',
  '10+ Years',
  '200+ Clients',
  'pruve.co',
];

const ROW_2_ITEMS = [
  '200+ Clients',
  'Content Engine',
  'AI Agents',
  'Lead Capture',
  '10+ Years',
  'WhatsApp Bots',
  'pruve.co',
  'Workflow Automation',
];

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-4 shrink-0">
      <span className="whitespace-nowrap">{item}</span>
      <span className="text-accent" aria-hidden="true">
        &middot;
      </span>
    </span>
  ));

  return (
    <div className="overflow-hidden w-full group">
      <div
        className={`flex gap-4 w-max ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } group-hover:[animation-play-state:paused]`}
      >
        {/* First copy */}
        <div className="flex gap-4 shrink-0">{content}</div>
        {/* Second copy for seamless loop */}
        <div className="flex gap-4 shrink-0" aria-hidden="true">
          {content}
        </div>
      </div>
    </div>
  );
}

export default function MarqueeBar() {
  return (
    <section className="w-full py-6 border-y border-border bg-bg-2 overflow-hidden">
      <div className="flex flex-col gap-4 text-dim uppercase tracking-widest text-sm font-display select-none">
        <MarqueeRow items={ROW_1_ITEMS} />
        <MarqueeRow items={ROW_2_ITEMS} reverse />
      </div>
    </section>
  );
}
