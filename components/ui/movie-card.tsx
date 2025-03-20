"use client";

import Link from 'next/link';
import { Movie } from '@/lib/tmdb';
import { tmdb } from '@/lib/tmdb';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="relative flex-shrink-0 group/card">
      <Link href={`/movie/${movie.id}`}>
        <div className="relative w-[200px] h-[300px] overflow-hidden rounded-md">
          <img
            src={tmdb.getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover/card:opacity-50 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
            <h3 className="text-white font-semibold text-lg line-clamp-2">{movie.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-green-500">
                {Math.round(movie.vote_average * 10)}%
              </span>
              <span className="text-white/70">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}