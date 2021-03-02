import { PaginableResult } from '../../types';

export interface Configuration {
  change_keys: string[];
  images: ImageConfiguration;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastPerson {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
  department: string;
  job: string;
}

export interface Cast {
  cast: CastPerson[];
  crew: CastPerson[];
}

export interface MovieImage {
  id: number;
  file_path: string;
}

export interface MovieImages {
  backdrops: MovieImage[];
  posters: MovieImage[];
}

export interface MovieVideo {
  id: number;
  name: string;
  key: string;
  type: string;
}

export interface MovieVideoResults {
  results: MovieVideo[];
}

export type MoviesPaginableResult = PaginableResult<IMovie[]>;

export interface IMovie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  formatted_release_date?: string;
  genre_ids: number[];
  genres: Genre[];
  belongs_to_collection?: Record<string, any>;
  budget: number;
  homepage?: string;
  imdb_id?: string;
  popularity: number;
  production_companies: Record<string, any>[];
  production_countries: Record<string, any>[];
  revenue: number;
  runtime: number;
  status: string;
  tagline?: string;
  video: boolean;
  credits: Cast;
  similar: MoviesPaginableResult;
  year: string;
  original_title: string;
  original_language: string;
  videos: MovieVideoResults;
  images: MovieImages;
}
export interface ImageConfiguration {
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
}
