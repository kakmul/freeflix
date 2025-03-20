const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOThkMTZhYmIzMjMxMjUzMTlhNjkxNzc4YjA3N2E1YSIsIm5iZiI6MTc0MjQ3NDc1NS4xMzUsInN1YiI6IjY3ZGMwZTAzOGFmNDUyZjMwZmU5ZWY5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OFsuD4PBehORMe03Sfg9pR3igHxJJiRkrrsZTLDfGpI';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  genres?: Genre[];
  original_language: string;
  video: boolean;
  media_type?: string;
  runtime?: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const fetchTMDB = async (endpoint: string, params: Record<string, string> = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = `${BASE_URL}${endpoint}?${queryParams}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${TMDB_API_KEY}`,
      'accept': 'application/json'
    },
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

export const tmdb = {
  getFeaturedMovies: (language = 'id-ID') => 
    fetchTMDB('/trending/movie/week', { language }),
  
  getTrendingMovies: (page = '1', language = 'id-ID') => 
    fetchTMDB('/trending/movie/week', { page, language }),
  
  getTopRatedTV: (page = '1', language = 'en-US') => 
    fetchTMDB('/tv/top_rated', { page, language }),
  
  getNowPlaying: (page = '1', language = 'id-ID', region = 'ID') => 
    fetchTMDB('/movie/now_playing', { page, language, region }),
  
  getMovieDetails: (id: string, language = 'id-ID') => 
    fetchTMDB(`/movie/${id}`, { language }),

  searchMovies: (query: string, page = '1', language = 'id-ID') =>
    fetchTMDB('/search/movie', { query, page, language, include_adult: 'false' }),

  getImageUrl: (path: string, size: string = 'original') => 
    `${IMAGE_BASE_URL}/${size}${path}`
};