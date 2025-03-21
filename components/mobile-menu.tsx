'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useSearchParams } from 'next/navigation';

export function MobileMenu() {
  const searchParams = useSearchParams();

  const getNavLink = (path: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const lang = params.get('lang');
    return `${path}${lang ? `?lang=${lang}` : ''}`;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] bg-background">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-primary">123Movies</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4">
          <Link 
            href={getNavLink('/')} 
            className="text-lg hover:text-primary transition-colors"
            scroll={false}
          >
            Home
          </Link>
          <Link 
            href={getNavLink('/movies')} 
            className="text-lg hover:text-primary transition-colors"
            scroll={false}
          >
            Movies
          </Link>
          <Link 
            href={getNavLink('/tv')} 
            className="text-lg hover:text-primary transition-colors"
            scroll={false}
          >
            TV Shows
          </Link>
          <Link 
            href={getNavLink('/new')} 
            className="text-lg hover:text-primary transition-colors"
            scroll={false}
          >
            New & Popular
          </Link>
          <Link 
            href={getNavLink('/favorites')} 
            className="text-lg hover:text-primary transition-colors"
            scroll={false}
          >
            My List
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}