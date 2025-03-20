'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { MovieCard } from '@/components/ui/movie-card';
import { getFavoriteMovies } from '@/lib/favorites';
import { Movie } from '@/lib/tmdb';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    setFavorites(getFavoriteMovies());
  }, []);

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setFavorites(getFavoriteMovies());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favoritesUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleStorageChange);
    };
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-24 pb-16 px-4">
        <h1 className="text-4xl font-bold mb-8">My Favorite Movies</h1>
        {favorites.length === 0 ? (
          <p className="text-muted-foreground">No favorite movies yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <div key={movie.id} className="w-full">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}