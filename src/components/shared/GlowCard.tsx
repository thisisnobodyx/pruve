'use client';

import {
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type MouseEvent,
  type ElementType,
  type ComponentPropsWithoutRef,
} from 'react';

interface GlowCardBaseProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

type GlowCardProps<T extends ElementType = 'div'> = GlowCardBaseProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof GlowCardBaseProps | 'as'>;

const DEFAULT_GLOW_COLOR = '#A855F7';

export default function GlowCard<T extends ElementType = 'div'>({
  children,
  className = '',
  glowColor = DEFAULT_GLOW_COLOR,
  as,
  ...rest
}: GlowCardProps<T>) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const Component = as || 'div';

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden bg-bg-card border border-border rounded-card ${className}`}
      {...rest}
    >
      {/* Glow gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-card transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}10, transparent 40%)`,
        }}
      />

      {/* Border glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-card transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}30, transparent 40%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* Content - above glow layers */}
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
