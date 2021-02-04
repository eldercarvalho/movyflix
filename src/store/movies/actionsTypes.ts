export enum MoviesActions {
  FetchTrending = 'FETCH_TRENDING',
  FetchGenres = 'FETCH_GENRES',
  FetchConfiguration = 'FETCH_CONFIGURATION',
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

export interface Genre {
  id: number;
  name: string;
}

export interface FetchTrendingAction {
  type: MoviesActions.FetchTrending;
  payload: Movie[];
}

export interface FetchGenresAction {
  type: MoviesActions.FetchGenres;
  payload: Genre[];
}

export interface FetchConfigurationAction {
  type: MoviesActions.FetchConfiguration;
}

export type MoviesActionsType =
  | FetchTrendingAction
  | FetchGenresAction
  | FetchConfigurationAction;
