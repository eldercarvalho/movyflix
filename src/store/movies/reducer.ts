import {
  MoviesActions,
  MoviesActionsType,
  IMovie,
  Genre,
  Configuration,
  PaginableResult,
} from './actionsTypes';

export interface MoviesState {
  configuration: Configuration;
  trending: IMovie[];
  isFetchingTrending: boolean;
  popular: PaginableResult;
  nowPlaying: PaginableResult;
  upcoming: PaginableResult;
  search: PaginableResult;
  searchLoading: boolean;
  genres: Genre[];
  movieDetails: IMovie;
  isFetchingMovieDetails: boolean;
}

export const initialPaginableResult: PaginableResult = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const initialConfiguration: Configuration = {
  images: {
    secure_base_url: '',
    poster_sizes: [],
    backdrop_sizes: [],
    profile_sizes: [],
    logo_sizes: [],
  },
  change_keys: [],
};

const intitalState = {
  configuration: initialConfiguration,
  trending: [] as IMovie[],
  isFetchingTrending: false,
  popular: initialPaginableResult,
  nowPlaying: initialPaginableResult,
  upcoming: initialPaginableResult,
  search: initialPaginableResult,
  searchLoading: false,
  genres: [] as Genre[],
  movieDetails: {} as IMovie,
  isFetchingMovieDetails: false,
};

export const moviesReducer = (
  state = intitalState,
  action: MoviesActionsType,
): MoviesState => {
  switch (action.type) {
    case MoviesActions.FetchTrending:
      return { ...state, trending: action.payload, isFetchingTrending: false };
    case MoviesActions.IsFetchingTrending:
      return { ...state, isFetchingTrending: true };
    case MoviesActions.FetchPopular:
      return { ...state, popular: action.payload };
    case MoviesActions.FetchNowPlaying:
      return { ...state, nowPlaying: action.payload };
    case MoviesActions.FetchUpcoming:
      return { ...state, upcoming: action.payload };
    case MoviesActions.FetchGenres:
      return { ...state, genres: action.payload };
    case MoviesActions.FetchConfiguration:
      return { ...state, configuration: action.payload };
    case MoviesActions.SetSearchLoading:
      return { ...state, searchLoading: action.payload };
    case MoviesActions.SearchMovies:
      return {
        ...state,
        search:
          action.payload.page > 1
            ? {
                ...action.payload,
                results: [...state.search.results, ...action.payload.results],
              }
            : action.payload,
        searchLoading: false,
      };
    case MoviesActions.FetchMovieDetails:
      return { ...state, movieDetails: action.payload, isFetchingMovieDetails: false };
    case MoviesActions.SetIsFetchingMovieDetails:
      return { ...state, isFetchingMovieDetails: true };
    case MoviesActions.ClearMovieDetails:
      return { ...state, movieDetails: {} as IMovie };
    default:
      return state;
  }
};
