import {
  MoviesActions,
  MoviesActionsType,
  IMovie,
  Genre,
  Configuration,
} from './actionsTypes';

export interface MoviesState {
  configuration: Configuration;
  trendingMovies: IMovie[];
  searchedMovies: IMovie[];
  genres: Genre[];
}

const intitalState = {
  configuration: {} as Configuration,
  trendingMovies: [] as IMovie[],
  genres: [] as Genre[],
  searchedMovies: [] as IMovie[],
};

export const moviesReducer = (
  state = intitalState,
  action: MoviesActionsType,
): MoviesState => {
  switch (action.type) {
    case MoviesActions.FetchTrending:
      return { ...state, trendingMovies: action.payload };
    case MoviesActions.FetchGenres:
      return { ...state, genres: action.payload };
    case MoviesActions.FetchConfiguration:
      return { ...state, configuration: action.payload };
    case MoviesActions.SearchMovies:
      return { ...state, searchedMovies: action.payload };
    default:
      return state;
  }
};
