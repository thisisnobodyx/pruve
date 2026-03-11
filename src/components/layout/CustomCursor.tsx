'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CURSOR_SIZE = 8;
const RING_SIZE = 40;
const RING_HOVER_SIZE = 60;

const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(true);

  // Raw mouse position for the dot
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring-smoothed position for the ring
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  // Check for pointer device
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    setIsPointerDevice(!mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsPointerDevice(!e.matches);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Track mouse movement
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    },
    [cursorX, cursorY, visible]
  );

  // Hide cursor when it leaves the window
  const handleMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!isPointerDevice) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isPointerDevice, handleMouseMove, handleMouseLeave, handleMouseEnter]);

  // Detect hoverable elements
  useEffect(() => {
    if (!isPointerDevice) return;

    const hoverableSelector = 'a, button, [data-magnetic], input, textarea, select, [role="button"]';

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(hoverableSelector)) {
        setHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement | null;
      if (
        target.closest(hoverableSelector) &&
        (!related || !related.closest(hoverableSelector))
      ) {
        setHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isPointerDevice]);

  // Don't render on touch devices
  if (!isPointerDevice) return null;

  const ringCurrentSize = hovering ? RING_HOVER_SIZE : RING_SIZE;

  return (
    <>
      {/* Dot - follows mouse exactly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          zIndex: 9999,
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          className="bg-white rounded-full"
          style={{
            width: CURSOR_SIZE,
            height: CURSOR_SIZE,
            marginLeft: -CURSOR_SIZE / 2,
            marginTop: -CURSOR_SIZE / 2,
          }}
        />
      </motion.div>

      {/* Ring - follows with spring lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          zIndex: 9999,
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: ringCurrentSize,
            height: ringCurrentSize,
            marginLeft: -ringCurrentSize / 2,
            marginTop: -ringCurrentSize / 2,
            borderWidth: hovering ? 1.5 : 1.5,
            borderColor: hovering
              ? 'rgba(124, 58, 237, 0.6)'
              : 'rgba(242, 240, 235, 0.5)',
            backgroundColor: hovering
              ? 'rgba(124, 58, 237, 0.2)'
              : 'transparent',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            mass: 0.4,
          }}
          style={{
            borderStyle: 'solid',
          }}
        />
      </motion.div>
    </>
  );
}
