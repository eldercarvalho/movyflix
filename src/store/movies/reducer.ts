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
}

export const initialPaginableResult: PaginableResult = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

const intitalState = {
  configuration: {} as Configuration,
  trending: [] as IMovie[],
  isFetchingTrending: false,
  popular: initialPaginableResult,
  nowPlaying: initialPaginableResult,
  upcoming: initialPaginableResult,
  search: initialPaginableResult,
  searchLoading: false,
  genres: [] as Genre[],
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
      return { ...state, search: action.payload, searchLoading: false };
    default:
      return state;
  }
};
