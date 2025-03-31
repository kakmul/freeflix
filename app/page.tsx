import { tmdb } from '@/lib/tmdb';
import { Navbar } from '@/components/navbar';
import { FeaturedMovie } from '@/components/featured-movie';
import { MovieRow } from '@/components/movie-row';
import InvalidLicenseModal from '@/components/InvalidLicenseModal';

export const metadata = {
  title: 'Netflix Clone - Watch Movies & TV Shows',
  description: 'Watch the latest movies and TV shows on our Netflix clone. Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.',
  keywords: 'netflix, movies, tv shows, streaming, watch movies, watch tv shows',
};

export default async function Home({
  searchParams
}: {
  searchParams: { lang?: string }
}) {
  const language = searchParams.lang || 'en-US';

  // Fetch satu per satu agar bisa console.log
  const featured = await tmdb.getFeaturedMovies(language as any);
  //console.log('📽️ Featured Response:', featured);

  const trending = await tmdb.getTrendingMovies('1', language as any);
  //console.log('🔥 Trending Response:', trending);

  const topRated = await tmdb.getTopRatedTV('1', language as any);
  //console.log('⭐ Top Rated TV Response:', topRated);

  const nowPlaying = await tmdb.getNowPlaying('1', language as any);
  //console.log('🎬 Now Playing Response:', nowPlaying);

  const hasLicenseError =
  'error' in featured ||
  'error' in trending ||
  'error' in topRated ||
  'error' in nowPlaying;

if (hasLicenseError) {
  return <InvalidLicenseModal />;
}

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
