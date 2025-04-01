"use client";

import { Movie } from '@/lib/tmdb_backup';
import { tmdb } from '@/lib/tmdb_backup';
import { Button } from '@/components/ui/button';
import { Play, Info } from 'lucide-react';
import Link from 'next/link';

interface FeaturedMovieProps {
  movie: Movie;
}

export function FeaturedMovie({ movie }: FeaturedMovieProps) {
  return (
    <div className="relative h-[80vh] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${tmdb.getImageUrl(movie.backdrop_path)})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
            <p className="text-lg mb-6">{movie.overview}</p>
            <div className="flex gap-4">
              <Link href={`/movie/${movie.id}`}>
                <Button size="lg">
                  <Play className="mr-2 h-5 w-5" />
                  Play
                </Button>
              </Link>
              <Link href={`/movie/${movie.id}`}>
                <Button variant="secondary" size="lg">
                  <Info className="mr-2 h-5 w-5" />
                  More Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}