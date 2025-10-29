"use client";
import { useState, useEffect, useMemo } from 'react';

const NUM_PARTICLES = 150;

const createParticle = (i: number) => {
  const size = Math.random() * 2 + 1;
  const xStart = Math.random() * 100;
  const yStart = Math.random() * 100;
  const xEnd = xStart + (Math.random() - 0.5) * 200;
  const yEnd = yStart + (Math.random() - 0.5) * 200;
  const duration = Math.random() * 10 + 5;
  const delay = Math.random() * 5;
  const color = Math.random() > 0.5 ? 'rgba(0, 194, 255, 0.7)' : 'rgba(255, 255, 255, 0.7)';

  return (
    <div
      key={i}
      className="particle"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${xStart}%`,
        top: `${yStart}%`,
        backgroundColor: color,
        // @ts-ignore
        '--x-end': `${xEnd}px`,
        '--y-end': `${yEnd}px`,
        animation: `particle-animation ${duration}s linear ${delay}s infinite`,
      }}
    />
  );
};

const AnimatedHeroBackground = () => {
  const [particles, setParticles] = useState<React.ReactNode[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This will only run on the client, after the component has mounted.
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      // Generate particles only on the client-side.
      setParticles(Array.from({ length: NUM_PARTICLES }).map((_, i) => createParticle(i)));
    }
  }, [isMounted]);

  if (!isMounted) {
    // Render nothing on the server and during initial client render.
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles}
    </div>
  );
};

export default AnimatedHeroBackground;
