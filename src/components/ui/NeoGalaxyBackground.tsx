'use client';

import React, { useRef, useEffect } from 'react';

// --- Tweakable Parameters ---

// --- Starfield ---
const STAR_LAYERS = [
  { count: 150, speed: 0.05, size: [0.3, 0.8], opacity: [0.2, 0.7] }, // Background layer
  { count: 70, speed: 0.1, size: [0.5, 1.2], opacity: [0.5, 0.9] },  // Mid-ground layer
  { count: 20, speed: 0.15, size: [0.8, 1.5], opacity: [0.7, 1.0] }, // Foreground layer
];
const STAR_TWINKLE_SPEED = 0.005;

// --- Shooting Stars ---
const SHOOTING_STAR_FREQUENCY = 0.015; // Chance per frame for a new star
const MAX_CONCURRENT_SHOOTING_STARS = 3;
const SHOOTING_STAR_SPEED = 10;
const SHOOTING_STAR_LENGTH = 150;
const SHOOTING_STAR_TRAIL_COLORS = [
  { stop: 0, color: 'rgba(102, 252, 241, 0.8)' }, // Cyan
  { stop: 0.5, color: 'rgba(191, 102, 252, 0.4)' }, // Purple
  { stop: 1, color: 'rgba(191, 102, 252, 0)' },     // Transparent
];

// --- Nebulas ---
const NEBULA_COUNT = 3;
const NEBULA_BASE_RADIUS = 300; // Base size in pixels
const NEBULA_SPEED = 0.03;
const NEBULA_COLORS = [
    { stop: 0, color: 'rgba(2, 6, 23, 0.6)' },       // navy-900/60
    { stop: 0.5, color: 'rgba(26, 0, 42, 0.4)' },    // like indigo-950/40
    { stop: 1, color: 'rgba(85, 0, 68, 0.2)' },      // like magenta-950/20
];


// --- Interfaces for our objects ---
interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  twinkleDirection: number;
}

interface ShootingStar {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  opacity: number;
  trail: { x: number, y: number }[];
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

const NeoGalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // --- Object Creation ---
    const starLayers: Star[][] = STAR_LAYERS.map(layer =>
      Array.from({ length: layer.count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (layer.size[1] - layer.size[0]) + layer.size[0],
        speed: layer.speed,
        opacity: Math.random() * (layer.opacity[1] - layer.opacity[0]) + layer.opacity[0],
        twinkleDirection: Math.random() > 0.5 ? 1 : -1,
      }))
    );

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
            y: Math.random() * canvas.height * 0.6, // Spawn in upper 60%
            angle: fromLeft ? Math.PI / 6 + (Math.random() * 0.1 - 0.05) : 5 * Math.PI / 6 + (Math.random() * 0.1 - 0.05),
            speed: SHOOTING_STAR_SPEED,
            length: SHOOTING_STAR_LENGTH,
            opacity: 1,
            trail: [],
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

    const drawStars = () => {
        starLayers.forEach((stars) => {
          stars.forEach(star => {
            if(!ctx) return;
            star.x += star.speed;
            if (star.x > canvas.width) star.x = 0;
            
            // Twinkle
            star.opacity += star.twinkleDirection * STAR_TWINKLE_SPEED;
            if (star.opacity > 1 || star.opacity < 0.2) star.twinkleDirection *= -1;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
          });
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

            // Remove if off-screen
            if (star.x < -star.length || star.x > canvas.width + star.length || star.y > canvas.height + star.length) {
                shootingStars.splice(index, 1);
            }
        });
    };


    // --- Main Animation Loop ---
    const animate = () => {
      if (!ctx) return;

      // Clear canvas with a dark background
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawNebulas();
      drawStars();
      drawShootingStars();
      
      // Spawn new shooting stars
      if (Math.random() < SHOOTING_STAR_FREQUENCY && shootingStars.length < MAX_CONCURRENT_SHOOTING_STARS) {
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

export default NeoGalaxyBackground;
