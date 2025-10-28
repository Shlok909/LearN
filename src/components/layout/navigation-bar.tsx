"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetClose, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '#courses' },
  { name: 'About Us', href: '#why-us' },
  { name: 'Contact', href: '#contact' },
];

const NavigationBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[1000] h-[70px] bg-gradient-to-r from-primary to-secondary shadow-md">
      <nav className="container mx-auto flex h-full items-center justify-between px-4">
        <Link href="/" className="text-[28px] font-bold text-white">
          LearnNova
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden items-center space-x-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="nav-link text-base font-medium">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-gradient-to-b from-primary to-secondary p-0">
              <div className="flex h-full flex-col">
                <SheetHeader className="flex flex-row items-center justify-between border-b border-white/20 p-4">
                   <SheetTitle asChild>
                    <Link href="/" className="text-2xl font-bold text-white">
                      LearnNova
                    </Link>
                   </SheetTitle>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </SheetHeader>
                <div className="flex flex-col space-y-4 p-4">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        href={item.href}
                        className="rounded-md px-3 py-2 text-lg font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
