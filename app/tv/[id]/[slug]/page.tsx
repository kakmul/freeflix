import { Metadata } from 'next';
import { tmdb } from '@/lib/tmdb';
import { Navbar } from '@/components/navbar';
import { VideoPlayer } from '@/components/video-player';
import { MovieVideos } from '@/components/movie-videos';
import { MovieRow } from '@/components/movie-row';
import { notFound, redirect } from 'next/navigation';
import { createMovieSlug } from '@/lib/utils';

interface TVShowPageProps {
  params: {
    id: string;
    slug: string;
  };
  searchParams: {
    lang?: string;
  };
}

export async function generateMetadata({ params, searchParams }: TVShowPageProps): Promise<Metadata> {
  const show = await tmdb.getTVShowDetails(params.id, searchParams.lang as any);
  
  if (!show || !show.id) {
    notFound();
  }
  
  return {
    title: `${show.name} - 123Movies`,
    description: show.overview,
    keywords: `${show.name}, tv show, 123Movies, streaming, ${show.genres?.map((genre:any) => genre.name).join(', ')}`,
    openGraph: {
      title: show.name,
      description: show.overview,
      images: [tmdb.getImageUrl(show.backdrop_path)],
    },
  };
}

export default async function TVShowPage({ params, searchParams }: TVShowPageProps) {
  const [show, videos, recommendations] = await Promise.all([
    tmdb.getTVShowDetails(params.id, searchParams.lang as any),
    tmdb.getTVShowVideos(params.id, searchParams.lang as any),
    tmdb.getTVShowRecommendations(params.id, searchParams.lang as any)
  ]);

  if (!show || !show.name) {
    notFound();
  }

  // Verify the slug matches the show name
  const correctSlug = show.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  if (params.slug !== correctSlug) {
    redirect(`/tv/${params.id}/${correctSlug}${searchParams.lang ? `?lang=${searchParams.lang}` : ''}`);
  }
  
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="relative min-h-[100vh]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${tmdb.getImageUrl(show.backdrop_path)})`,
            }}
          />
          <div className="absolute inset-0 netflix-gradient" />
          <div className="absolute inset-0 netflix-card-gradient" />
        </div>
        
        <div className="relative pt-[20vh] container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-6">{show.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-green-500 font-semibold">
                {Math.round(show.vote_average * 10)}% Match
              </span>
              <span>{new Date(show.first_air_date).getFullYear()}</span>
              <span>{show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''}</span>
              <span className="border border-white/40 px-1 text-sm">HD</span>
            </div>
            
            <p className="text-lg text-white/90 mb-8 line-clamp-3">{show.overview}</p>
            
            <div className="mb-12">
              <VideoPlayer movieId={params.id} movieTitle={show.name} mediaType="tv" />
            </div>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-[auto,1fr] gap-8 items-start">
              <div className="space-y-6">
                <div>
                  <span className="text-white/60">Cast:</span>{' '}
                  <span className="text-white/90">
                    {show.genres?.map((genre:any) => genre.name).join(', ')}
                  </span>
                </div>
                <div>
                  <span className="text-white/60">Genres:</span>{' '}
                  <span className="text-white/90">
                    {show.genres?.map((genre:any) => genre.name).join(', ')}
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