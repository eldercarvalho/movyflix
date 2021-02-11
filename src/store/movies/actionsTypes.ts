export enum MoviesActions {
  FetchTrending = 'FETCH_TRENDING',
  FetchPopular = 'FETCH_POPULAR',
  FetchNowPlaying = 'FETCH_NOW_PLAYNG',
  FetchUpcoming = 'FETCH_UPCOMING',
  FetchGenres = 'FETCH_GENRES',
  FetchConfiguration = 'FETCH_CONFIGURATION',
  SearchMovies = 'SEARCH_MOVIES',
  SetSearchLoading = 'SET_SEARCH_LOADING',
}

export interface IMovie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  formatted_release_date?: string;
  genre_ids: number[];
}

export interface PaginableResult {
  page: number;
  results: IMovie[];
  dates?: Record<string, string>;
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
  payload: IMovie[];
}

export interface FetchPopularAction {
  type: MoviesActions.FetchPopular;
  payload: PaginableResult;
}

export interface FetchUpcomingAction {
  type: MoviesActions.FetchUpcoming;
  payload: PaginableResult;
}

export interface FetchNowPlayingAction {
  type: MoviesActions.FetchNowPlaying;
  payload: PaginableResult;
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
  payload: PaginableResult;
}

export interface SetSearchLoadingAction {
  type: MoviesActions.SetSearchLoading;
  payload: boolean;
}

export type MoviesActionsType =
  | FetchTrendingAction
  | FetchPopularAction
  | FetchUpcomingAction
  | FetchNowPlayingAction
  | FetchGenresAction
  | FetchConfigurationAction
  | SearchMoviesAction
  | SetSearchLoadingAction;
