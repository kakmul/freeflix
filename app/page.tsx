import { tmdb } from '@/lib/tmdb';
import { Navbar } from '@/components/navbar';
import { FeaturedMovie } from '@/components/featured-movie';
import { MovieRow } from '@/components/movie-row';

export const metadata = {
  title: 'Netflix Clone - Watch Movies & TV Shows',
  description: 'Watch the latest movies and TV shows on our Netflix clone. Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.',
  keywords: 'netflix, movies, tv shows, streaming, watch movies, watch tv shows',
};

export default async function Home() {
  const [featured, trending, topRated, nowPlaying] = await Promise.all([
    tmdb.getFeaturedMovies(),
    tmdb.getTrendingMovies(),
    tmdb.getTopRatedTV(),
    tmdb.getNowPlaying(),
  ]);

  const featuredMovie = featured.results[0];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <FeaturedMovie movie={featuredMovie} />
      <div className="container mx-auto space-y-8 pb-16">
        <MovieRow title="Trending Now" movies={trending.results} />
        <MovieRow title="Top Rated TV Shows" movies={topRated.results} />
        <MovieRow title="Now Playing" movies={nowPlaying.results} />
      </div>
    </main>
  );
}