type SignUpForm = {
  email: string;
  password: string;
  username: string;
};

type FetchData = {
  page: number;
  total_pages: number;
  results: MovieList[];
};

type MovieList = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type: string;
  name: string;
  trailerKey?: string;
  first_air_date: string;
  last_air_date: string;
};

type Genre = {
  id: number;
  name: string;
};

type MovieDetail = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  recommendations: FetchData;
  videos: {
    id: string;
    results: VideoType[];
  };
  credits: {
    cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      character: string;
      credit_id: string;
      order: number;
    }[];
  };
  reviews: {
    page: number;
    results: {
      author: string;
      author_details: {
        name: string;
        username: string;
        avatar_path: string;
        rating: number;
      };
      content: string;
      created_at: string;
      id: string;
      updated_at: string;
      url: string;
    }[];
    total_pages: number;
    total_results: number;
  };
  similar: FetchData;
  first_air_date: string;
  last_air_date: string;
};

type WatchProvider = {
  display_priorities: {};
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
};

type LoginForm = {
  email: string;
  password: string;
};

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

type ForgotPasswordForm = {
  email: string;
};

type VideoType = {
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
};
