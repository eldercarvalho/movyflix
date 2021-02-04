import { MoviesActions, MoviesActionsType, Movie, Genre } from './actionsTypes';

export interface MoviesState {
  trendingMovies: Movie[];
  genres: Genre[];
}

const intitalState = {
  configuration: [],
  trendingMovies: [] as Movie[],
  genres: [] as Genre[],
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
    default:
      return state;
  }
};
