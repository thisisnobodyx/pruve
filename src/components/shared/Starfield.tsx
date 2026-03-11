'use client';

import { useEffect, useRef, useState } from 'react';

interface StarfieldProps {
  className?: string;
  starCount?: number;
  speed?: number;
}

interface Star {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
  size: number;
  brightness: number;
}

function StarfieldCanvas({
  starCount = 300,
  speed = 0.3,
}: Omit<StarfieldProps, 'className'>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const frameRef = useRef<number>(0);
  const sizeRef = useRef({ width: 0, height: 0 });
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      sizeRef.current = { width: rect.width, height: rect.height };
    };

    const initStars = () => {
      const { width, height } = sizeRef.current;
      const stars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        const x = (Math.random() - 0.5) * width * 2;
        const y = (Math.random() - 0.5) * height * 2;
        const z = Math.random() * 1000;
        stars.push({
          x, y, z,
          prevX: x, prevY: y,
          size: Math.random() * 1.5 + 0.5,
          brightness: Math.random() * 0.5 + 0.5,
        });
      }
      starsRef.current = stars;
    };

    handleResize();
    initStars();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parent);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      const { width, height } = sizeRef.current;
      if (width === 0 || height === 0) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const stars = starsRef.current;

      // Mouse influence — subtle parallax shift
      const mx = (mouseRef.current.x - 0.5) * 40;
      const my = (mouseRef.current.y - 0.5) * 40;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Store previous screen position for trails
        const prevScale = 500 / (s.z + 0.1);
        s.prevX = s.x * prevScale + cx + mx;
        s.prevY = s.y * prevScale + cy + my;

        // Move star closer (z decreases)
        s.z -= speed;

        // Reset star when it passes the camera
        if (s.z <= 0) {
          s.x = (Math.random() - 0.5) * width * 2;
          s.y = (Math.random() - 0.5) * height * 2;
          s.z = 1000;
          s.prevX = s.x * (500 / s.z) + cx + mx;
          s.prevY = s.y * (500 / s.z) + cy + my;
        }

        // Project to screen
        const scale = 500 / s.z;
        const screenX = s.x * scale + cx + mx;
        const screenY = s.y * scale + cy + my;

        // Calculate size based on depth
        const depthFactor = 1 - s.z / 1000;
        const size = s.size * depthFactor * 2.5 + 0.3;
        const alpha = depthFactor * s.brightness;

        // Draw motion trail
        const trailAlpha = alpha * 0.3;
        if (trailAlpha > 0.02) {
          ctx.beginPath();
          ctx.moveTo(s.prevX, s.prevY);
          ctx.lineTo(screenX, screenY);
          ctx.strokeStyle = `rgba(200, 200, 255, ${trailAlpha})`;
          ctx.lineWidth = size * 0.5;
          ctx.stroke();
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 220, 255, ${alpha})`;
        ctx.fill();

        // Add glow to brighter/closer stars
        if (size > 1.5) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(124, 58, 237, ${alpha * 0.15})`;
          ctx.fill();
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [starCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

export default function Starfield({
  className = '',
  starCount = 300,
  speed = 0.3,
}: StarfieldProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className={`relative ${className}`}>
      {mounted && <StarfieldCanvas starCount={starCount} speed={speed} />}
    </div>
  );
}
