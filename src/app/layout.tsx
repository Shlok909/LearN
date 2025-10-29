import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import AnimatedHeroBackground from '@/components/sections/animated-hero-background';

export const metadata: Metadata = {
  title: 'LearNova - Your Gateway to Learning',
  description: 'A modern educational resources website for college students, offering curated courses and personalized content recommendations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div
          className="fixed inset-0 z-[-1] bg-cover bg-center"
          style={{
            backgroundImage: "url('https://img.freepik.com/free-vector/glowing-grid-lines-geometric-wallpaper-neon-style_1017-53633.jpg?semt=ais_hybrid&w=740&q=80')",
          }}
        />
        <AnimatedHeroBackground />
        <div className="relative z-10">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
