"use client";

import Link from 'next/link';
import { Movie } from '@/lib/tmdb';
import { tmdb } from '@/lib/tmdb';
import { Heart } from 'lucide-react';
import { toggleFavoriteMovie, isFavoriteMovie } from '@/lib/favorites';
import { useState, useEffect } from 'react';
import { cn, createMovieSlug } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  useEffect(() => {
    setIsFavorite(isFavoriteMovie(movie.id));
  }, [movie.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const isNowFavorite = toggleFavoriteMovie(movie);
    setIsFavorite(isNowFavorite);
  };

  const movieUrl = `/movie/${movie.id}/${createMovieSlug(movie.title)}${lang ? `?lang=${lang}` : ''}`;

  return (
    <div className="relative flex-shrink-0 group/card">
      <Link href={movieUrl} scroll={false}>
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
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute top-2 right-2 p-2 rounded-full bg-black/50 transition-opacity",
              "opacity-0 group-hover/card:opacity-100 hover:bg-black/70"
            )}
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-colors",
                isFavorite ? "fill-red-500 stroke-red-500" : "fill-none stroke-white"
              )}
            />
          </button>
        </div>
      </Link>
    </div>
  );
}