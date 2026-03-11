'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

interface ParticleNetworkProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const CONNECT_DISTANCE = 120;
const REPEL_DISTANCE = 150;
const REPEL_FORCE = 2;
const LINE_COLOR = { r: 79, g: 142, b: 247 }; // accent blue
const PARTICLE_COLOR = 'rgba(242, 240, 235, 0.6)'; // white at 0.6 opacity

function ParticleCanvas({
  particleCount = 150,
  interactive = true,
}: Omit<ParticleNetworkProps, 'className'>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const frameRef = useRef<number>(0);
  const sizeRef = useRef({ width: 0, height: 0 });

  const initParticles = useCallback(
    (width: number, height: number): Particle[] => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
      return particles;
    },
    [particleCount]
  );

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
      const width = rect.width;
      const height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      sizeRef.current = { width, height };

      // Reinitialize particles if needed
      if (particlesRef.current.length === 0) {
        particlesRef.current = initParticles(width, height);
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parent);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
      canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }

    // Animation loop
    const animate = () => {
      const { width, height } = sizeRef.current;
      if (width === 0 || height === 0) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        if (interactive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < REPEL_DISTANCE && dist > 0) {
            const force = (REPEL_DISTANCE - dist) / REPEL_DISTANCE;
            p.vx += (dx / dist) * force * REPEL_FORCE * 0.05;
            p.vy += (dy / dist) * force * REPEL_FORCE * 0.05;
          }
        }

        // Apply velocity with friction
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            const opacity = (1 - dist / CONNECT_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${LINE_COLOR.r}, ${LINE_COLOR.g}, ${LINE_COLOR.b}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      ctx.fillStyle = PARTICLE_COLOR;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [interactive, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

export default function ParticleNetwork({
  className = '',
  particleCount = 150,
  interactive = true,
}: ParticleNetworkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Guard against SSR - only render canvas on client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {mounted && (
        <ParticleCanvas
          particleCount={particleCount}
          interactive={interactive}
        />
      )}
    </div>
  );
}
