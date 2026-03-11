'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const SPRING_CONFIG = { damping: 30, stiffness: 80, duration: 2 };

export default function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, SPRING_CONFIG);

  // Track if we've already triggered
  const hasTriggered = useRef(false);

  // Start counting when in view
  useEffect(() => {
    if (isInView && !hasTriggered.current) {
      hasTriggered.current = true;
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  // Update displayed text when spring value changes
  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        const rounded = Math.round(latest);
        ref.current.textContent = `${prefix}${rounded.toLocaleString()}${suffix}`;
      }
    });

    return unsubscribe;
  }, [springValue, suffix, prefix]);

  return (
    <motion.span
      ref={ref}
      className={className}
    >
      {prefix}0{suffix}
    </motion.span>
  );
}
