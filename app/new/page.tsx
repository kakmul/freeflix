import { Navbar } from '@/components/navbar';
import { MovieCard } from '@/components/ui/movie-card';
import { tmdb } from '@/lib/tmdb';
import type { LanguageCode } from '@/lib/tmdb';

interface NewAndPopularPageProps {
  searchParams: {
    lang?: string;
  };
}

export default async function NewAndPopularPage({ searchParams }: NewAndPopularPageProps) {
  const language = (searchParams.lang || 'en-US') as LanguageCode;
  const [trending, nowPlaying] = await Promise.all([
    tmdb.getTrendingMovies('1', language),
    tmdb.getNowPlaying('1', language),
  ]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-24 pb-16 px-4">
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-8">New Releases</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {nowPlaying.results.slice(0, 10).map((movie:any) => (
              <div key={movie.id} className="w-full">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-bold mb-8">Popular This Week</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {trending.results.slice(0, 10).map((movie:any) => (
              <div key={movie.id} className="w-full">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}