import { Movie } from './tmdb';

const FAVORITES_KEY = 'favorite_movies';

export function getFavoriteMovies(): Movie[] {
  if (typeof window === 'undefined') return [];
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

export function toggleFavoriteMovie(movie: Movie): boolean {
  const favorites = getFavoriteMovies();
  const index = favorites.findIndex((m) => m.id === movie.id);
  
  if (index === -1) {
    favorites.push(movie);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } else {
    favorites.splice(index, 1);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }

  // Dispatch a custom event to notify about favorites changes
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('favoritesUpdated'));
  }

  return index === -1;
}

export function isFavoriteMovie(movieId: number): boolean {
  const favorites = getFavoriteMovies();
  return favorites.some((movie) => movie.id === movieId);
}