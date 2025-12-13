"use client";

import React, { useRef, useEffect } from 'react';

// Star interface
interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  twinkleDirection: number;
}

// Shooting Star interface
interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  opacity: number;
  trail: { x: number; y: number }[];
}

const ShootingStarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // --- Tweakable Parameters ---
    const STAR_COUNT = 300; // Number of static stars
    const STAR_TWINKLE_SPEED = 0.05; // How fast stars twinkle
    const SHOOTING_STAR_FREQUENCY = 0.015; // Chance of a new shooting star each frame
    const SHOOTING_STAR_SPEED = 15; // Pixels per frame
    const SHOOTING_STAR_LENGTH = 150; // Length of the star's trail

    // --- Colors ---
    // Background gradient colors
    const BG_COLOR_1 = '#000000';
    const BG_COLOR_2 = '#0c0c1d';
    const BG_COLOR_3 = '#191938';
    // Star and shooting star colors
    const STAR_COLOR = 'rgba(255, 255, 255, 0.7)';
    const SHOOTING_STAR_COLOR = 'rgba(255, 255, 255, 1)';


    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create static stars
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.1 + 0.5, // Tweak star size
      alpha: Math.random() * 0.5 + 0.5,
      twinkleSpeed: Math.random() * STAR_TWINKLE_SPEED,
      twinkleDirection: Math.random() < 0.5 ? 1 : -1,
    }));

    // Create shooting stars array
    let shootingStars: ShootingStar[] = [];

    const drawStars = () => {
      stars.forEach(star => {
        if(!ctx) return;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        // Twinkle effect
        star.alpha += star.twinkleSpeed * star.twinkleDirection;
        if (star.alpha <= 0.5 || star.alpha >= 1) {
          star.twinkleDirection *= -1;
        }
      });
    };

    const drawShootingStars = () => {
        shootingStars.forEach((star, index) => {
            if(!ctx) return;
            // Add current position to the trail
            star.trail.push({ x: star.x, y: star.y });
            if (star.trail.length > star.len / SHOOTING_STAR_SPEED * 5) { // Keep trail length manageable
                star.trail.shift();
            }

            // Create gradient for the trail
            const trailGradient = ctx.createLinearGradient(
                star.x, star.y,
                star.trail[0].x, star.trail[0].y
            );
            trailGradient.addColorStop(0, SHOOTING_STAR_COLOR);
            trailGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.strokeStyle = trailGradient;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            // Draw line through trail points for a smooth curve
            for (let i = star.trail.length - 1; i > 0; i--) {
                ctx.lineTo(star.trail[i].x, star.trail[i].y);
            }
            ctx.stroke();

            // Move the star
            star.x += Math.cos(star.angle) * star.speed;
            star.y += Math.sin(star.angle) * star.speed;

            // Remove if it's off-screen
            if (star.x < -star.len || star.x > canvas.width + star.len || star.y > canvas.height + star.len) {
                shootingStars.splice(index, 1);
            }
        });
    };


    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: -10,
        len: SHOOTING_STAR_LENGTH,
        speed: SHOOTING_STAR_SPEED,
        angle: Math.PI / 4, // Diagonal angle
        opacity: 1,
        trail: [],
      });
    };

    const draw = () => {
      if (!ctx) return;
      
      // Draw background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height, 0,
        canvas.width / 2, canvas.height, canvas.height
      );
      gradient.addColorStop(0, BG_COLOR_3);
      gradient.addColorStop(0.4, BG_COLOR_2);
      gradient.addColorStop(1, BG_COLOR_1);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawStars();
      drawShootingStars();

      // Randomly create new shooting stars
      if (Math.random() < SHOOTING_STAR_FREQUENCY) {
        createShootingStar();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default ShootingStarsBackground;
