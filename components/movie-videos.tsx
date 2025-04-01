"use client";

import { MovieVideo } from '@/lib/tmdb_backup';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { Button } from './ui/button';

interface MovieVideosProps {
  videos: MovieVideo[];
}

export function MovieVideos({ videos }: MovieVideosProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  if (!videos.length) return null;

  return (
    <section className="relative py-6">
      <h2 className="text-2xl font-bold mb-4">Videos</h2>
      <div className="group/row relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/row:opacity-100 transition-opacity bg-black/50 hover:bg-black/70"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {videos.map((video) => (
            <div key={video.id} className="flex-none w-[400px]">
              <div className="relative pb-[56.25%]">
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  className="absolute inset-0 w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
              <h3 className="mt-2 text-sm font-medium line-clamp-1">{video.name}</h3>
              <p className="text-xs text-muted-foreground">{video.type}</p>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/row:opacity-100 transition-opacity bg-black/50 hover:bg-black/70"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
}