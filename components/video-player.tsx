"use client";

import { useState } from 'react';
import { Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  movieId: string;
  movieTitle: string;
}

export function VideoPlayer({ movieId, movieTitle }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        <Button 
          variant="ghost" 
          className="absolute top-4 right-4 text-white"
          onClick={() => setIsPlaying(false)}
        >
          Close
        </Button>
        <iframe
          src={`https://vidsrc.xyz/embed/movie/${movieId}`}
          className="w-full h-full"
          allowFullScreen
          title={`Watch ${movieTitle}`}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Button 
        size="lg" 
        className="bg-primary hover:bg-primary/90 text-white"
        onClick={() => setIsPlaying(true)}
      >
        <Play className="mr-2 h-5 w-5" />
        Play
      </Button>
      <Button 
        size="lg" 
        variant="secondary" 
        className="bg-white/30 hover:bg-white/20"
      >
        <Info className="mr-2 h-5 w-5" />
        More Info
      </Button>
    </div>
  );
}