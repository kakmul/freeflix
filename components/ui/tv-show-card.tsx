"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TVShow } from '@/lib/tmdb_backup';
import { tmdb } from '@/lib/tmdb_backup';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

interface TVShowCardProps {
  show: TVShow;
}

export function TVShowCard({ show }: TVShowCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  useEffect(() => {
    // Preload image
    const img = new Image();
    img.src = tmdb.getImageUrl(show.poster_path, 'w500');
    img.onload = () => setImageLoaded(true);
  }, [show.poster_path]);

  const showUrl = `/tv/${show.id}/${show.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}${lang ? `?lang=${lang}` : ''}`;

  return (
    <div className="relative flex-shrink-0 group/card">
      <Link href={showUrl} scroll={false}>
        <div className="relative w-[200px] h-[300px] overflow-hidden rounded-md bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-muted/60" />
          )}
          <img
            src={tmdb.getImageUrl(show.poster_path, 'w500')}
            alt={show.name}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              !imageLoaded && "opacity-0"
            )}
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover/card:opacity-50 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
            <h3 className="text-white font-semibold text-lg line-clamp-2">{show.name}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-green-500">
                {Math.round(show.vote_average * 10)}%
              </span>
              <span className="text-white/70">
                {new Date(show.first_air_date).getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}