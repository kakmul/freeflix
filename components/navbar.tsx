"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Heart } from 'lucide-react';
import { LanguageSelector } from '@/components/language-selector';
import { MobileMenu } from '@/components/mobile-menu';
import type { LanguageCode } from '@/lib/tmdb';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams(searchParams.toString());
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}&lang=${params.get('lang') || 'en-US'}`, { scroll: false });
    }
  };

  const handleLanguageChange = (language: LanguageCode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', language);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const getNavLink = (path: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const lang = params.get('lang');
    return `${path}${lang ? `?lang=${lang}` : ''}`;
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <MobileMenu />
            <Link href={getNavLink('/')} scroll={false} className="text-2xl font-bold text-primary">
            123Movies
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href={getNavLink('/')} scroll={false} className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link href={getNavLink('/movies')} scroll={false} className="hover:text-primary transition-colors">
                Movies
              </Link>
              <Link href={getNavLink('/tv')} scroll={false} className="hover:text-primary transition-colors">
                TV Shows
              </Link>
              <Link href={getNavLink('/new')} scroll={false} className="hover:text-primary transition-colors">
                New & Popular
              </Link>
              <Link href={getNavLink('/favorites')} scroll={false} className="hover:text-primary transition-colors">
                My List
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <form onSubmit={handleSearch} className="flex items-center">
                {isSearchOpen && (
                  <Input
                    type="search"
                    placeholder="Titles, people, genres"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 bg-background border-none focus-visible:ring-primary"
                  />
                )}
                <Button
                  type={isSearchOpen ? "submit" : "button"}
                  variant="ghost"
                  size="icon"
                  onClick={() => !isSearchOpen && setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </form>
            </div>

            <Link href={getNavLink('/favorites')} scroll={false}>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            
            <LanguageSelector onLanguageChange={handleLanguageChange} />
          </div>
        </div>
      </div>
    </nav>
  );
}