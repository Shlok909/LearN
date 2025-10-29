"use client";
import { useMemo } from 'react';

const NUM_PARTICLES = 150;

// This function is outside the component to avoid being recreated on every render.
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
  // useMemo ensures that the particles are created only once and the array is memoized.
  // This prevents re-creation on re-renders, which was causing the animation to "jump".
  const particles = useMemo(() => 
    Array.from({ length: NUM_PARTICLES }).map((_, i) => createParticle(i)),
    [] // Empty dependency array means this runs only once.
  );

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles}
    </div>
  );
};

export default AnimatedHeroBackground;
