"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Globe, Search, Heart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LANGUAGES = [
  { code: 'id-ID', label: 'Indonesia' },
  { code: 'en-US', label: 'English' },
];

const REGIONS = [
  { code: 'ID', label: 'Indonesia' },
  { code: 'US', label: 'United States' },
];

export function Navbar() {
  const router = useRouter();
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
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-primary">
            123Movies
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/movies" className="hover:text-primary transition-colors">
                Movies
              </Link>
              <Link href="/tv" className="hover:text-primary transition-colors">
                TV Shows
              </Link>
              <Link href="/new" className="hover:text-primary transition-colors">
                New & Popular
              </Link>
              <Link href="/favorites" className="hover:text-primary transition-colors">
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

            <Link href="/favorites">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="p-2">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Language
                  </div>
                  {LANGUAGES.map((lang) => (
                    <DropdownMenuItem key={lang.code}>
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </div>
                <div className="p-2 border-t">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Region
                  </div>
                  {REGIONS.map((region) => (
                    <DropdownMenuItem key={region.code}>
                      {region.label}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}