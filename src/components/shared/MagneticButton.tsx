'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import Link from 'next/link';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  style?: React.CSSProperties;
}

const springConfig = { damping: 15, stiffness: 200, mass: 0.5 };
const MAX_DISPLACEMENT = 15;

function useMagneticEffect() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDist = Math.max(rect.width, rect.height);

    const factor = Math.min(distance / maxDist, 1);
    const clampedX = (deltaX / maxDist) * MAX_DISPLACEMENT * factor * 2;
    const clampedY = (deltaY / maxDist) * MAX_DISPLACEMENT * factor * 2;

    x.set(Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, clampedX)));
    y.set(Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, clampedY)));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    isHovered,
    x,
    y,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}

interface MagneticWrapperProps {
  children: ReactNode;
  x: MotionValue<number>;
  y: MotionValue<number>;
  handlers: {
    onMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  wrapperRef: React.RefObject<HTMLDivElement>;
}

function MagneticWrapper({ children, x, y, handlers, wrapperRef }: MagneticWrapperProps) {
  // Apply counter-movement to text content for a subtle parallax feel
  const childX = useTransform(x, (v) => v * 0.35);
  const childY = useTransform(y, (v) => v * 0.35);

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handlers.onMouseMove}
      onMouseEnter={handlers.onMouseEnter}
      onMouseLeave={handlers.onMouseLeave}
      className="relative inline-block"
      style={{ padding: '20px', margin: '-20px' }}
    >
      <motion.div style={{ x, y }} data-magnetic>
        <motion.span
          className="inline-flex items-center justify-center"
          style={{ x: childX, y: childY }}
        >
          {children}
        </motion.span>
      </motion.div>
    </div>
  );
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  style,
}: MagneticButtonProps) {
  const { ref, x, y, handlers } = useMagneticEffect();

  if (href) {
    return (
      <MagneticWrapper x={x} y={y} handlers={handlers} wrapperRef={ref}>
        <Link
          href={href}
          onClick={onClick}
          className={className}
          style={style}
          data-magnetic
        >
          {children}
        </Link>
      </MagneticWrapper>
    );
  }

  return (
    <MagneticWrapper x={x} y={y} handlers={handlers} wrapperRef={ref}>
      <motion.button
        onClick={onClick}
        className={className}
        style={style}
        data-magnetic
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.button>
    </MagneticWrapper>
  );
}
