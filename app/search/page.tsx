import { Suspense } from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { MovieCard } from '@/components/ui/movie-card';
import { TVShowCard } from '@/components/ui/tv-show-card';
import { tmdb } from '@/lib/tmdb';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchPageProps {
  searchParams: {
    q: string;
    type?: 'movie' | 'tv';
    page?: string;
    lang?: string;
  };
}

export const metadata: Metadata = {
  title: 'Search - 123Movies',
  description: 'Search for movies and TV shows on 123Movies',
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q;
  const type = searchParams.type || 'movie';
  const page = searchParams.page || '1';
  const language = searchParams.lang || 'en-US';
  
  if (!query) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <h1 className="text-4xl font-bold mb-4">Search</h1>
          <p>Please enter a search term to find movies or TV shows.</p>
        </div>
      </main>
    );
  }

  const [movieResults, tvResults] = await Promise.all([
    tmdb.searchMovies(query, page, language as any),
    tmdb.searchTV(query, page, language as any)
  ]);

  const totalPages = Math.min(
    type === 'movie' ? movieResults.total_pages : tvResults.total_pages,
    500
  );

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold mb-4">Search Results</h1>
        <p className="text-muted-foreground mb-8">
          Found {type === 'movie' ? movieResults.total_results : tvResults.total_results} results for "{query}"
        </p>

        <Tabs defaultValue={type} className="mb-8">
          <TabsList>
            <TabsTrigger value="movie" asChild>
              <Link href={`/search?q=${query}&type=movie${language ? `&lang=${language}` : ''}`}>
                Movies ({movieResults.total_results})
              </Link>
            </TabsTrigger>
            <TabsTrigger value="tv" asChild>
              <Link href={`/search?q=${query}&type=tv${language ? `&lang=${language}` : ''}`}>
                TV Shows ({tvResults.total_results})
              </Link>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="movie" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movieResults.results.map((movie:any) => (
                <div key={movie.id} className="w-full">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tv" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {tvResults.results.map((show:any) => (
                <div key={show.id} className="w-full">
                  <TVShowCard show={show} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 mb-8">
            {Number(page) > 1 && (
              <Link href={`/search?q=${query}&type=${type}&page=${Number(page) - 1}${language ? `&lang=${language}` : ''}`}>
                <Button variant="outline">Previous</Button>
              </Link>
            )}
            <span className="text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            {Number(page) < totalPages && (
              <Link href={`/search?q=${query}&type=${type}&page=${Number(page) + 1}${language ? `&lang=${language}` : ''}`}>
                <Button variant="outline">Next</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}