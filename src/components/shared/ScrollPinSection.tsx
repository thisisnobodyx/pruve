'use client';

import { useRef, useEffect, useState, useCallback, type ReactNode } from 'react';

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
  const [isMobile, setIsMobile] = useState(false);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Throttle React state updates to ~30fps max to prevent excessive re-renders
  const scheduleUpdate = useCallback((value: number) => {
    progressRef.current = value;
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        setProgress(progressRef.current);
        rafRef.current = null;
      });
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!container || !pin) return;

    // On mobile, use reduced pin duration for better UX
    const mobileDuration = Math.min(pinDuration, 250);
    const effectiveDuration = isMobile ? mobileDuration : pinDuration;

    let trigger: any = null;

    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');

      gsapModule.default.registerPlugin(stModule.ScrollTrigger);

      const pinDistancePx = (effectiveDuration / 100) * window.innerHeight;

      trigger = stModule.ScrollTrigger.create({
        trigger: container,
        start: `top ${NAV_HEIGHT}px`,
        end: `+=${pinDistancePx}`,
        pin: pin,
        scrub: 0.5,
        onUpdate: (self) => {
          scheduleUpdate(self.progress);
        },
      });
    };

    const raf = requestAnimationFrame(() => {
      initGSAP();
    });

    return () => {
      cancelAnimationFrame(raf);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (trigger) {
        trigger.kill();
      }
    };
  }, [pinDuration, scheduleUpdate, isMobile]);

  return (
    <div ref={containerRef} className={className}>
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden">
        {children(progress)}
      </div>
    </div>
  );
}
