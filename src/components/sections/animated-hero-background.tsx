"use client";

import { GraduationCap, Book, Lightbulb, Laptop } from 'lucide-react';
import { useEffect, useState } from 'react';

const icons = [GraduationCap, Book, Lightbulb, Laptop, GraduationCap, Book];

type IconStyle = {
  top: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
};

const AnimatedHeroBackground = () => {
  const [styles, setStyles] = useState<IconStyle[]>([]);

  useEffect(() => {
    const newStyles = icons.map(() => ({
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 10 + 10}s`,
    }));
    setStyles(newStyles);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {styles.map((style, index) => {
        const Icon = icons[index];
        return (
          <Icon
            key={index}
            className="absolute text-white/20"
            style={{
              ...style,
              animationName: 'float',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
            }}
            size={Math.random() * 30 + 40}
            strokeWidth={1}
          />
        );
      })}
    </div>
  );
};

export default AnimatedHeroBackground;
