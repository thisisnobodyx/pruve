'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';

interface ScrollPinSectionProps {
  children: (progress: number) => ReactNode;
  pinDuration?: number; // in vh units, how long the section stays pinned
  className?: string;
}

const NAV_HEIGHT = 80; // matches Nav h-20 = 80px

export default function ScrollPinSection({
  children,
  pinDuration = 500,
  className = '',
}: ScrollPinSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!container || !pin) return;

    let trigger: any = null;

    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');

      gsapModule.default.registerPlugin(stModule.ScrollTrigger);

      const pinDistancePx = (pinDuration / 100) * window.innerHeight;

      trigger = stModule.ScrollTrigger.create({
        trigger: container,
        start: `top ${NAV_HEIGHT}px`,
        end: `+=${pinDistancePx}`,
        pin: pin,
        scrub: 1,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });
    };

    // Use requestAnimationFrame to ensure DOM is ready without a long delay
    const raf = requestAnimationFrame(() => {
      initGSAP();
    });

    return () => {
      cancelAnimationFrame(raf);
      if (trigger) {
        trigger.kill();
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
