'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';

interface ScrollPinSectionProps {
  children: (progress: number) => ReactNode;
  pinDuration?: number; // in vh units, how long the section stays pinned
  className?: string;
}

export default function ScrollPinSection({
  children,
  pinDuration = 200,
  className = '',
}: ScrollPinSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!container || !pin) return;

    // Delay GSAP init to prevent scroll position interference on page load
    const timer = setTimeout(async () => {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');

      gsapModule.default.registerPlugin(stModule.ScrollTrigger);

      const trigger = stModule.ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${pinDuration}vh`,
        pin: pin,
        scrub: 0.5,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });

      // Store for cleanup
      (container as any).__gsapTrigger = trigger;
    }, 500);

    return () => {
      clearTimeout(timer);
      const trigger = (container as any).__gsapTrigger;
      if (trigger) {
        trigger.kill();
        delete (container as any).__gsapTrigger;
      }
    };
  }, [pinDuration]);

  return (
    <div ref={containerRef} className={className}>
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden">
        {children(progress)}
      </div>
    </div>
  );
}
