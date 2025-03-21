import { redirect } from 'next/navigation';
import { tmdb } from '@/lib/tmdb';
import { createMovieSlug } from '@/lib/utils';

interface MovieRedirectPageProps {
  params: {
    id: string;
  };
  searchParams: {
    lang?: string;
  };
}

export default async function MovieRedirectPage({ params, searchParams }: MovieRedirectPageProps) {
  const movie = await tmdb.getMovieDetails(params.id, searchParams.lang as any);
  const slug = createMovieSlug(movie.title);
  redirect(`/movie/${params.id}/${slug}${searchParams.lang ? `?lang=${searchParams.lang}` : ''}`);
}