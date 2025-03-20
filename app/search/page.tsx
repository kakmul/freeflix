import { Suspense } from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { MovieCard } from '@/components/ui/movie-card';
import { tmdb } from '@/lib/tmdb';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: {
    q: string;
    page?: string;
  };
}

export const metadata: Metadata = {
  title: 'Search Movies - Netflix',
  description: 'Search for movies on Netflix',
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q;
  const page = searchParams.page || '1';
  
  if (!query) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <h1 className="text-4xl font-bold mb-4">Search Movies</h1>
          <p>Please enter a search term to find movies.</p>
        </div>
      </main>
    );
  }

  const results = await tmdb.searchMovies(query, page);
  const totalPages = Math.min(results.total_pages, 500); // TMDB API limits to 500 pages

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold mb-4">Search Results</h1>
        <p className="text-muted-foreground mb-8">
          Found {results.total_results} results for "{query}"
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {results.results.map((movie) => (
            <div key={movie.id} className="w-full">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 mb-8">
            {Number(page) > 1 && (
              <Link href={`/search?q=${query}&page=${Number(page) - 1}`}>
                <Button variant="outline">Previous</Button>
              </Link>
            )}
            <span className="text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            {Number(page) < totalPages && (
              <Link href={`/search?q=${query}&page=${Number(page) + 1}`}>
                <Button variant="outline">Next</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}