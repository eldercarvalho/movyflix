import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../../services/http';
import { formatReleaseDate } from '../../../utils/formatReleaseDate';
import { reduceCrewByDepartment } from '../../../utils/reduceCrewByDepartment';
import { IMovie, Configuration, Genre } from './types';
import { PaginableResult } from '../../types';

export * from './types';

export interface MoviesState {
  isFetching: boolean;
  configuration: Configuration;
  trending: IMovie[];
  isFetchingTrending: boolean;
  popular: PaginableResult<IMovie[]>;
  nowPlaying: PaginableResult<IMovie[]>;
  upcoming: PaginableResult<IMovie[]>;
  topRated: PaginableResult<IMovie[]>;
  search: PaginableResult<IMovie[]>;
  searchLoading: boolean;
  genres: Genre[];
  movieDetails: IMovie;
  isFetchingMovieDetails: boolean;
}

export const initialPaginableResult: PaginableResult<IMovie[]> = {
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

const initialState: MoviesState = {
  isFetching: false,
  isFetchingTrending: false,
  isFetchingMovieDetails: false,
  searchLoading: false,
  configuration: initialConfiguration,
  trending: [] as IMovie[],
  popular: initialPaginableResult,
  nowPlaying: initialPaginableResult,
  upcoming: initialPaginableResult,
  topRated: initialPaginableResult,
  search: initialPaginableResult,
  genres: [] as Genre[],
  movieDetails: {} as IMovie,
};

export const fetchConfigs = createAsyncThunk('movies/FETCH_CONFIGS', async () => {
  const response = await http.get<Configuration>('configuration');

  return response.data;
});

export const fetchTrendingMovies = createAsyncThunk(
  'movies/FETCH_TRENDING_MOVIES',
  async () => {
    const response = await http.get<PaginableResult<IMovie[]>>('trending/movie/week');

    return response.data.results;
  },
);

export const fetchPopularMovies = createAsyncThunk(
  'movies/FETCH_POPULAR_MOVIES',
  async () => {
    const response = await http.get<PaginableResult<IMovie[]>>('movie/popular');

    return response.data;
  },
);

export const fetchNowPlayngMovies = createAsyncThunk(
  'movies/FETCH_NOW_PLAYING_MOVIES',
  async () => {
    const response = await http.get<PaginableResult<IMovie[]>>('movie/now_playing');

    return response.data;
  },
);

export const fetchUpcomingMovies = createAsyncThunk(
  'movies/FETCH_UPCOMING_MOVIES',
  async () => {
    const response = await http.get<PaginableResult<IMovie[]>>('movie/upcoming');

    return response.data;
  },
);

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/FETCH_TOP_RATED_MOVIES',
  async (page: number) => {
    const response = await http.get<PaginableResult<IMovie[]>>(
      `movie/top_rated?page=${page}`,
    );

    response.data.results = response.data.results.map((movie: IMovie) => {
      movie.year = formatReleaseDate(movie.release_date, 'yyyy');
      return movie;
    });

    return response.data;
  },
);

type SearchMoviesArgs = {
  query: string;
  page: number;
};

export const searchMovies = createAsyncThunk(
  'movies/SEARCH_MOVIES',
  async ({ query, page }: SearchMoviesArgs) => {
    const response = await http.get<PaginableResult<IMovie[]>>(
      `search/movie?query=${query}&page=${page}`,
    );

    return response.data;
  },
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/FETCH_MOVIE_DETAILS',
  async (movieId: string) => {
    const response = await http.get<IMovie>(
      `/movie/${movieId}?&append_to_response=credits,similar,videos,images,recommendations,external_ids`,
    );

    response.data.year = formatReleaseDate(response.data.release_date, 'yyyy');
    response.data.credits.crew = reduceCrewByDepartment(response.data.credits.crew);

    return response.data;
  },
);

export const fetchGenres = createAsyncThunk('movies/FETCH_GENRES', async () => {
  const response = await http.get('genre/movie/list');

  return response.data.genres as Genre[];
});

const { actions, reducer } = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovieDetails(state) {
      state.movieDetails = {} as IMovie;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrendingMovies.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
      state.isFetching = false;
      state.trending = action.payload;
    });

    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.popular = action.payload;
    });

    builder.addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
      state.upcoming = action.payload;
    });

    builder.addCase(fetchNowPlayngMovies.fulfilled, (state, action) => {
      state.nowPlaying = action.payload;
    });

    builder.addCase(fetchTopRatedMovies.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
      state.isFetching = false;

      if (action.payload.page > 1) {
        action.payload.results = [...state.topRated.results, ...action.payload.results];
      }

      state.topRated = action.payload;
    });

    builder.addCase(searchMovies.pending, (state) => {
      state.searchLoading = true;
    });
    builder.addCase(searchMovies.fulfilled, (state, action) => {
      state.searchLoading = false;

      if (action.payload.page > 1) {
        action.payload.results = [...state.search.results, ...action.payload.results];
      }

      state.search = action.payload;
    });

    builder.addCase(fetchMovieDetails.pending, (state) => {
      state.isFetchingMovieDetails = true;
    });
    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.isFetchingMovieDetails = false;
      state.movieDetails = action.payload;
    });

    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
    });
  },
});

export const { clearMovieDetails } = actions;

export default reducer;
