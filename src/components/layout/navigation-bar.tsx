
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, LogOut, User as UserIcon, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/#courses' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '#contact' },
];

const NavigationBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/login');
    }
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;

    const isHashLink = href.startsWith('#') || href.startsWith('/#');
    if (!isHashLink) {
      if (href.startsWith('/')) router.push(href);
      return;
    }

    e.preventDefault();
    const targetId = href.replace('/#', '').replace('#', '');

    if (pathname === '/') {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/${href.startsWith('#') ? '' : '#'}${targetId}`);
    }
  };

  return (
    <header className="sticky top-0 z-[1000] h-[70px] bg-transparent backdrop-blur-sm shadow-md">
      <nav className="container mx-auto flex h-full items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-white md:text-[28px]">
          LearNova
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleScroll}
              className="nav-link text-base font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {isUserLoading ? (
              <div className="h-10 w-24 rounded-md bg-gray-700 animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-white">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                      <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] bg-primary/95 p-0 backdrop-blur-md">
                <SheetHeader className="border-b border-white/20 p-4">
                  <SheetTitle className="text-2xl font-bold text-white">LearNova</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 p-4">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        href={item.href}
                        className="rounded-md px-3 py-2 text-lg font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={(e) => {
                          handleScroll(e);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                  {!isUserLoading && user && (
                    <SheetClose asChild>
                      <Link
                        href="/dashboard"
                        className="rounded-md px-3 py-2 text-lg font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </SheetClose>
                  )}
                  <div className="border-t border-white/20 pt-4">
                    {isUserLoading ? (
                      <div className="h-10 w-full rounded-md bg-gray-700 animate-pulse" />
                    ) : user ? (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full justify-start text-white/90 hover:bg-white/10 hover:text-white"
                      >
                        <LogOut className="mr-2 h-5 w-5" />
                        Sign Out
                      </Button>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <SheetClose asChild>
                          <Link
                            href="/login"
                            className="w-full text-center rounded-md bg-white/90 px-3 py-2 text-lg font-medium text-primary transition-colors hover:bg-white"
                          >
                            Login
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/signup"
                            className="w-full text-center rounded-md bg-secondary px-3 py-2 text-lg font-medium text-white transition-colors hover:bg-secondary/90"
                          >
                            Sign Up
                          </Link>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
