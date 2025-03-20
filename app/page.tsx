import { tmdb } from '@/lib/tmdb';
import { Navbar } from '@/components/navbar';
import { FeaturedMovie } from '@/components/featured-movie';
import { MovieRow } from '@/components/movie-row';

export const metadata = {
  title: 'GratisFlix | Stream HD Movies & TV Shows Online for Free',
  description: 'Enjoy unlimited streaming of the latest movies and TV shows on GratisFlix. Watch in HD quality on any device, anytime, anywhere. No subscriptions, no fees!',
  keywords: 'free movies, free tv shows, streaming, HD movies, online movies, watch free, GratisFlix, no subscription, no ads',
  openGraph: {
    title: 'GratisFlix | Stream HD Movies & TV Shows Online for Free',
    description: 'Enjoy unlimited streaming of the latest movies and TV shows on GratisFlix. Watch in HD quality on any device, anytime, anywhere. No subscriptions, no fees!',
    images: [
      {
        url: 'https://www.gratisflix.com/og-image.jpg', // Ganti dengan URL gambar OpenGraph Anda
        width: 1200,
        height: 630,
        alt: 'GratisFlix - Stream Free Movies & TV Shows',
      },
    ],
    siteName: 'GratisFlix',
    type: 'website',
    url: 'https://www.gratisflix.com', // Ganti dengan URL website Anda
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GratisFlix | Stream HD Movies & TV Shows Online for Free',
    description: 'Enjoy unlimited streaming of the latest movies and TV shows on GratisFlix. Watch in HD quality on any device, anytime, anywhere. No subscriptions, no fees!',
    images: ['https://www.gratisflix.com/twitter-image.jpg'], // Ganti dengan URL gambar Twitter Anda
  },
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