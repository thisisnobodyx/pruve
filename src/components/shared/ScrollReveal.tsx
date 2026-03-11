'use client';

import { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  duration?: number;
  once?: boolean;
  staggerDelay?: number;
}

function getDirectionOffset(direction: Direction): { x: number; y: number } {
  switch (direction) {
    case 'up':
      return { x: 0, y: 30 };
    case 'down':
      return { x: 0, y: -30 };
    case 'left':
      return { x: 30, y: 0 };
    case 'right':
      return { x: -30, y: 0 };
  }
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
  staggerDelay,
}: ScrollRevealProps) {
  const offset = getDirectionOffset(direction);

  // If staggerDelay is provided, use container + child variant pattern
  if (staggerDelay !== undefined) {
    const containerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: delay,
        },
      },
    };

    const childVariants: Variants = {
      hidden: {
        opacity: 0,
        x: offset.x,
        y: offset.y,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          ease: [0.25, 0.1, 0.25, 1], // easeOut
        },
      },
    };

    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.1 }}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div key={i} variants={childVariants}>
                {child}
              </motion.div>
            ))
          : (
              <motion.div variants={childVariants}>{children}</motion.div>
            )}
      </motion.div>
    );
  }

  // Single element reveal
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
