import { redirect } from 'next/navigation';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_UR;

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

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  genres?: Genre[];
  original_language: string;
  media_type?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
}

export interface MovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface MovieVideoResponse {
  id: number;
  results: MovieVideo[];
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface TVResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}

export interface ErrorResponse {
  error?: string;
  success?: boolean;
  status_message?: string;
}

// Supported languages based on TMDB API
export const SUPPORTED_LANGUAGES = {
  'ar-AE': 'Arabic',
  'az-AZ': 'Azerbaijani',
  'bg-BG': 'Bulgarian',
  'bn-BD': 'Bengali',
  'ca-ES': 'Catalan',
  'ch-GU': 'Chamorro',
  'cs-CZ': 'Czech',
  'da-DK': 'Danish',
  'de-DE': 'German',
  'el-GR': 'Greek',
  'en-US': 'English (US)',
  'en-GB': 'English (UK)',
  'eo-EO': 'Esperanto',
  'es-ES': 'Spanish (Spain)',
  'es-MX': 'Spanish (Mexico)',
  'et-EE': 'Estonian',
  'eu-ES': 'Basque',
  'fa-IR': 'Persian',
  'fi-FI': 'Finnish',
  'fr-FR': 'French',
  'he-IL': 'Hebrew',
  'hi-IN': 'Hindi',
  'hu-HU': 'Hungarian',
  'id-ID': 'Indonesian',
  'it-IT': 'Italian',
  'ja-JP': 'Japanese',
  'ka-GE': 'Georgian',
  'kk-KZ': 'Kazakh',
  'kn-IN': 'Kannada',
  'ko-KR': 'Korean',
  'lt-LT': 'Lithuanian',
  'lv-LV': 'Latvian',
  'ml-IN': 'Malayalam',
  'mn-MN': 'Mongolian',
  'ms-MY': 'Malay',
  'nb-NO': 'Norwegian',
  'nl-NL': 'Dutch',
  'pl-PL': 'Polish',
  'pt-PT': 'Portuguese (Portugal)',
  'pt-BR': 'Portuguese (Brazil)',
  'ro-RO': 'Romanian',
  'ru-RU': 'Russian',
  'si-LK': 'Sinhala',
  'sk-SK': 'Slovak',
  'sl-SI': 'Slovenian',
  'sq-AL': 'Albanian',
  'sr-RS': 'Serbian',
  'sv-SE': 'Swedish',
  'ta-IN': 'Tamil',
  'te-IN': 'Telugu',
  'th-TH': 'Thai',
  'tr-TR': 'Turkish',
  'uk-UA': 'Ukrainian',
  'vi-VN': 'Vietnamese',
  'zh-CN': 'Chinese (Simplified)',
  'zh-TW': 'Chinese (Traditional)'
} as const;

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES;

/**
 * Fungsi untuk memvalidasi response dari TMDB API
 * Akan melakukan redirect ke halaman lisensi tidak valid jika terdapat error
 */
const validateResponse = (json: any) => {
  // Cek apakah response memiliki field error
  if (json.error) {
    console.error('[LICENSE ERROR]', json.error);
    redirect('/invalid-license');
  }
  
  // Cek beberapa format error lain yang mungkin
  if (json.success === false && json.status_message) {
    console.error('[API ERROR]', json.status_message);
    
    // Jika pesan error terkait lisensi atau domain
    if (
      json.status_message.toLowerCase().includes('invalid') || 
      json.status_message.toLowerCase().includes('license') ||
      json.status_message.toLowerCase().includes('domain') ||
      json.status_message.toLowerCase().includes('purchase') ||
      json.status_message.toLowerCase().includes('email')
    ) {
      redirect('/invalid-license');
    }
  }
  
  return json;
};

const fetchTMDB = async (
  endpoint: string,
  params: Record<string, string> = {}
) => {
  const queryParams = new URLSearchParams({
    ...params,
    purchasedCode: 'PQR556677889',
    email: 'themasmul@gmail.com'
  }).toString();

  const url = `${BASE_URL}${endpoint}?${queryParams}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${TMDB_API_KEY}`,
        'accept': 'application/json',
      },
      cache: 'no-store'
      //next: { revalidate: 3600 } // Cache for 1 hour
    });

    const json = await response.json();

    // 🪵 Log the full request and response
    console.log(`url`, url);
    console.log(`[TMDB RESPONSE]`, JSON.stringify(json, null, 2));

    // Validasi response sebelum mengembalikan hasilnya
    return validateResponse(json);
  } catch (error) {
    console.error('[FETCH ERROR]', error);
    // Jika terjadi error saat fetching, asumsikan ada masalah dengan lisensi
    redirect('/invalid-license');
  }
};

export const tmdb = {
  getFeaturedMovies: (language: LanguageCode = 'en-US') => 
    fetchTMDB('/trending/movie/week', { language }),
  
  getTrendingMovies: (page = '1', language: LanguageCode = 'en-US') => 
    fetchTMDB('/trending/movie/week', { page, language }),
  
  getTopRatedTV: (page = '1', language: LanguageCode = 'en-US') => 
    fetchTMDB('/tv/top_rated', { page, language }),
  
  getNowPlaying: (page = '1', language: LanguageCode = 'en-US') => 
    fetchTMDB('/movie/now_playing', { page, language }),
  
  getMovieDetails: (id: string, language: LanguageCode = 'en-US') => 
    fetchTMDB(`/movie/${id}`, { language }),

  getMovieVideos: (id: string, language: LanguageCode = 'en-US') =>
    fetchTMDB(`/movie/${id}/videos`, { language }),

  getMovieRecommendations: (id: string, language: LanguageCode = 'en-US', page = '1') =>
    fetchTMDB(`/movie/${id}/recommendations`, { language, page }),

  getTVShowDetails: (id: string, language: LanguageCode = 'en-US') =>
    fetchTMDB(`/tv/${id}`, { language }),

  getTVShowVideos: (id: string, language: LanguageCode = 'en-US') =>
    fetchTMDB(`/tv/${id}/videos`, { language }),

  getTVShowRecommendations: (id: string, language: LanguageCode = 'en-US', page = '1') =>
    fetchTMDB(`/tv/${id}/recommendations`, { language, page }),

  searchMovies: (query: string, page = '1', language: LanguageCode = 'en-US') =>
    fetchTMDB('/search/movie', { query, page, language, include_adult: 'false' }),

  searchTV: (query: string, page = '1', language: LanguageCode = 'en-US') =>
    fetchTMDB('/search/tv', { query, page, language, include_adult: 'false' }),

  searchMulti: (query: string, page = '1', language: LanguageCode = 'en-US') =>
    fetchTMDB('/search/multi', { query, page, language, include_adult: 'false' }),

  getImageUrl: (path: string, size: string = 'original') => 
    `${IMAGE_BASE_URL}/${size}${path}`,

  // Helper function to get available languages
  getAvailableLanguages: () => SUPPORTED_LANGUAGES
};