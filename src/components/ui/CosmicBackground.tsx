'use client';

import React, { useRef, useEffect } from 'react';

// --- Tweakable Parameters ---

// --- Starfield ---
const STATIC_STAR_COUNT = 200;
const PARALLAX_STAR_COUNT = 50;
const STAR_TWINKLE_SPEED = 0.005;
const STATIC_STAR_OPACITY = { min: 0.1, max: 0.6 };
const PARALLAX_STAR_OPACITY = { min: 0.4, max: 0.9 };
const PARALLAX_LAYER_SPEED = 0.2;

// --- Shooting Stars ---
const SHOOTING_STAR_FREQUENCY = 0.01; // Chance per frame
const MAX_SHOOTING_STARS = 2;
const SHOOTING_STAR_SPEED = 12;
const SHOOTING_STAR_LENGTH = 120;
const SHOOTING_STAR_TRAIL_COLORS = [
  { stop: 0, color: 'rgba(102, 252, 241, 0.8)' }, // Cyan-ish
  { stop: 0.5, color: 'rgba(191, 102, 252, 0.4)' }, // Purple-ish
  { stop: 1, color: 'rgba(191, 102, 252, 0)' },
];

// --- Nebulas ---
const NEBULA_COUNT = 3;
const NEBULA_BASE_RADIUS = 350;
const NEBULA_SPEED = 0.04;
const NEBULA_COLORS = [
    { stop: 0, color: 'rgba(2, 6, 23, 0.6)' },
    { stop: 0.5, color: 'rgba(26, 0, 42, 0.4)' },
    { stop: 1, color: 'rgba(85, 0, 68, 0.2)' },
];

// --- Interfaces ---
interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDirection: number;
}

interface ParallaxStar extends Star {
  speed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
}

interface Nebula {
    x: number;
    y: number;
    radius: number;
    speed: number;
    angle: number;
    xScale: number;
    yScale: number;
}


const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let animationFrameId: number;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // --- Object Creation ---
    const staticStars: Star[] = Array.from({ length: STATIC_STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * (STATIC_STAR_OPACITY.max - STATIC_STAR_OPACITY.min) + STATIC_STAR_OPACITY.min,
      twinkleDirection: Math.random() > 0.5 ? 1 : -1,
    }));

    const parallaxStars: ParallaxStar[] = Array.from({ length: PARALLAX_STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * (PARALLAX_STAR_OPACITY.max - PARALLAX_STAR_OPACITY.min) + PARALLAX_STAR_OPACITY.min,
      twinkleDirection: Math.random() > 0.5 ? 1 : -1,
      speed: Math.random() * PARALLAX_LAYER_SPEED + 0.1,
    }));

    const nebulas: Nebula[] = Array.from({ length: NEBULA_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 150 + NEBULA_BASE_RADIUS,
        speed: Math.random() * 0.1 + NEBULA_SPEED,
        angle: Math.random() * 2 * Math.PI,
        xScale: Math.random() * 0.5 + 0.5,
        yScale: Math.random() * 0.5 + 0.5,
    }));

    let shootingStars: ShootingStar[] = [];

    const createShootingStar = () => {
        const fromLeft = Math.random() > 0.5;
        shootingStars.push({
            x: fromLeft ? 0 : canvas.width,
            y: Math.random() * canvas.height * 0.7,
            angle: fromLeft ? Math.PI / 6 + (Math.random() * 0.1 - 0.05) : 5 * Math.PI / 6 + (Math.random() * 0.1 - 0.05),
            speed: SHOOTING_STAR_SPEED,
            length: SHOOTING_STAR_LENGTH,
        });
    }

    // --- Draw Functions ---

    const drawNebulas = () => {
      nebulas.forEach(nebula => {
        if(!ctx) return;
        nebula.x += Math.cos(nebula.angle) * nebula.speed;
        nebula.y += Math.sin(nebula.angle) * nebula.speed;

        if (nebula.x - nebula.radius > canvas.width) nebula.x = -nebula.radius;
        if (nebula.x + nebula.radius < 0) nebula.x = canvas.width + nebula.radius;
        if (nebula.y - nebula.radius > canvas.height) nebula.y = -nebula.radius;
        if (nebula.y + nebula.radius < 0) nebula.y = canvas.height + nebula.radius;

        ctx.save();
        ctx.translate(nebula.x, nebula.y);
        ctx.scale(nebula.xScale, nebula.yScale);
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, nebula.radius);
        NEBULA_COLORS.forEach(color => gradient.addColorStop(color.stop, color.color));
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    const drawStars = (stars: Star[]) => {
      stars.forEach(star => {
        if(!ctx) return;
        star.opacity += star.twinkleDirection * STAR_TWINKLE_SPEED;
        if (star.opacity > 1 || star.opacity < 0.1) star.twinkleDirection *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
    };

    const drawParallaxStars = () => {
      parallaxStars.forEach(star => {
        if(!ctx) return;
        star.x += star.speed;
        if (star.x > canvas.width) star.x = 0;
        star.opacity += star.twinkleDirection * STAR_TWINKLE_SPEED;
        if (star.opacity > 1 || star.opacity < 0.1) star.twinkleDirection *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
    };

    const drawShootingStars = () => {
      shootingStars.forEach((star, index) => {
        if(!ctx) return;
        const trailStartX = star.x - star.length * Math.cos(star.angle);
        const trailStartY = star.y - star.length * Math.sin(star.angle);
        const gradient = ctx.createLinearGradient(star.x, star.y, trailStartX, trailStartY);
        SHOOTING_STAR_TRAIL_COLORS.forEach(c => gradient.addColorStop(c.stop, c.color));

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(trailStartX, trailStartY);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        if (star.x < -star.length || star.x > canvas.width + star.length || star.y > canvas.height + star.length) {
            shootingStars.splice(index, 1);
        }
      });
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set the base dark gradient background color for the canvas
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawNebulas();
      drawStars(staticStars);
      drawParallaxStars();
      drawShootingStars();
      
      if (Math.random() < SHOOTING_STAR_FREQUENCY && shootingStars.length < MAX_SHOOTING_STARS) {
        createShootingStar();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
};

export default CosmicBackground;
