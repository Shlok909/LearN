import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import AnimatedHeroBackground from '@/components/sections/animated-hero-background';
import { FirebaseClientProvider } from '@/firebase';
import AuthGuard from '@/components/auth-guard';

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
        <FirebaseClientProvider>
          <AuthGuard>
            <div id="background-container" />
            <AnimatedHeroBackground />
            <div className="relative z-10">
              {children}
            </div>
            <Toaster />
          </AuthGuard>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
