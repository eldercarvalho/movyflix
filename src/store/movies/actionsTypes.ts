export enum MoviesActions {
  FetchTrending = 'FETCH_TRENDING',
  FetchGenres = 'FETCH_GENRES',
  FetchConfiguration = 'FETCH_CONFIGURATION',
  SearchMovies = 'SEARCH_MOVIES',
}

export interface Movie {
  id?: number;
  poster_path?: string;
  backdrop_path?: string;
  title?: string;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  formatted_relese_date?: string;
}

export interface PaginatedResult {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export interface ImageConfiguration {
  [key: string]: string[];
}

export interface Configuration {
  change_keys: string[];
  images: ImageConfiguration;
}

export interface Genre {
  id: number;
  name: string;
}

export interface FetchTrendingAction {
  type: MoviesActions.FetchTrending;
  payload: Movie[];
}

export interface FetchConfigurationAction {
  type: MoviesActions.FetchConfiguration;
  payload: Configuration;
}

export interface FetchGenresAction {
  type: MoviesActions.FetchGenres;
  payload: Genre[];
}

export interface SearchMoviesAction {
  type: MoviesActions.SearchMovies;
  payload: Genre[];
}

export type MoviesActionsType =
  | FetchTrendingAction
  | FetchGenresAction
  | FetchConfigurationAction
  | SearchMoviesAction;
