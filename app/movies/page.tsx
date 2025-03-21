import { Suspense } from 'react';
import { Navbar } from '@/components/navbar';
import { MovieCard } from '@/components/ui/movie-card';
import { tmdb } from '@/lib/tmdb';
import { MoviePagination } from '@/components/movie-pagination';
import type { LanguageCode } from '@/lib/tmdb';

interface MoviesPageProps {
  searchParams: {
    page?: string;
    lang?: string;
  };
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const page = searchParams.page || '1';
  const language = (searchParams.lang || 'en-US') as LanguageCode;
  const trending = await tmdb.getTrendingMovies(page, language);
  const totalPages = Math.min(trending.total_pages, 500); // TMDB API limits to 500 pages

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-24 pb-16 px-4">
        <h1 className="text-4xl font-bold mb-8">Trending Movies</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trending.results.map((movie:any) => (
            <div key={movie.id} className="w-full">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        <MoviePagination currentPage={Number(page)} totalPages={totalPages} />
      </div>
    </main>
  );
}