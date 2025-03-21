import { Metadata } from 'next';
import { tmdb } from '@/lib/tmdb';
import { Navbar } from '@/components/navbar';
import { VideoPlayer } from '@/components/video-player';
import { MovieVideos } from '@/components/movie-videos';
import { MovieRow } from '@/components/movie-row';
import { notFound, redirect } from 'next/navigation';
import { createMovieSlug } from '@/lib/utils';

interface MoviePageProps {
  params: {
    id: string;
    slug: string;
  };
  searchParams: {
    lang?: string;
  };
}

export async function generateMetadata({ params, searchParams }: MoviePageProps): Promise<Metadata> {
  const movie = await tmdb.getMovieDetails(params.id, searchParams.lang as any);
  
  if (!movie || !movie.id) {
    notFound();
  }
  
  return {
    title: `${movie.title} - 123Movies`,
    description: movie.overview,
    keywords: `${movie.title}, movie, 123Movies, streaming, ${movie.genres?.map((genre:any) => genre.name).join(', ')}`,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: [tmdb.getImageUrl(movie.backdrop_path)],
    },
  };
}

export async function generateStaticParams() {
  const [trending, topRated, nowPlaying] = await Promise.all([
    tmdb.getTrendingMovies(),
    tmdb.getTopRatedTV(),
    tmdb.getNowPlaying(),
  ]);

  // Filter out TV shows and only include movies that have a title
  const movies = new Set([
    ...trending.results.filter((item:any)=> 'title' in item),
    ...topRated.results.filter((item:any) => 'title' in item),
    ...nowPlaying.results.filter((item:any) => 'title' in item),
  ]);

  return Array.from(movies).map((movie) => ({
    id: String(movie.id),
    slug: createMovieSlug(movie.title),
  }));
}

export default async function MoviePage({ params, searchParams }: MoviePageProps) {
  const [movie, videos, recommendations] = await Promise.all([
    tmdb.getMovieDetails(params.id, searchParams.lang as any),
    tmdb.getMovieVideos(params.id, searchParams.lang as any),
    tmdb.getMovieRecommendations(params.id, searchParams.lang as any)
  ]);

  if (!movie || !movie.title) {
    notFound();
  }

  // Verify the slug matches the movie title
  const correctSlug = createMovieSlug(movie.title);
  if (params.slug !== correctSlug) {
    redirect(`/movie/${params.id}/${correctSlug}${searchParams.lang ? `?lang=${searchParams.lang}` : ''}`);
  }
  
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="relative min-h-[100vh]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${tmdb.getImageUrl(movie.backdrop_path)})`,
            }}
          />
          <div className="absolute inset-0 netflix-gradient" />
          <div className="absolute inset-0 netflix-card-gradient" />
        </div>
        
        <div className="relative pt-[20vh] container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-6">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-green-500 font-semibold">
                {Math.round(movie.vote_average * 10)}% Match
              </span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
              <span className="border border-white/40 px-1 text-sm">HD</span>
            </div>
            
            <p className="text-lg text-white/90 mb-8 line-clamp-3">{movie.overview}</p>
            
            <div className="mb-12">
              <VideoPlayer movieId={params.id} movieTitle={movie.title} />
            </div>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-[auto,1fr] gap-8 items-start">
              <div className="space-y-6">
                <div>
                  <span className="text-white/60">Cast:</span>{' '}
                  <span className="text-white/90">
                    {movie.genres?.map((genre:any) => genre.name).join(', ')}
                  </span>
                </div>
                <div>
                  <span className="text-white/60">Genres:</span>{' '}
                  <span className="text-white/90">
                    {movie.genres?.map((genre:any) => genre.name).join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {recommendations.results.length > 0 && (
            <div className="mt-12">
              <MovieRow title="More Like This" movies={recommendations.results} />
            </div>
          )}

          <div className="mt-12">
            <MovieVideos videos={videos.results} />
          </div>
        </div>
      </div>
    </main>
  );
}