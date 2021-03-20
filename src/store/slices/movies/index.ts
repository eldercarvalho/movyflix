import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { http } from '../../../services/http';
import { formatReleaseDate } from '../../../utils/formatReleaseDate';
import { reduceCrewByDepartment } from '../../../utils/reduceCrewByDepartment';
import { IMovie, Configuration, Genre, MovieAccountState, CastPerson } from './types';
import { PaginableResult } from '../../types';
import { RootState } from '../..';

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
  discover: PaginableResult<IMovie[]>;
  searchLoading: boolean;
  genres: Genre[];
  movieDetails: IMovie;
  personDetails: CastPerson;
  isFetchingDetails: boolean;
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
  isFetchingDetails: false,
  searchLoading: false,
  configuration: initialConfiguration,
  trending: [] as IMovie[],
  popular: initialPaginableResult,
  nowPlaying: initialPaginableResult,
  upcoming: initialPaginableResult,
  topRated: initialPaginableResult,
  search: initialPaginableResult,
  discover: initialPaginableResult,
  genres: [] as Genre[],
  movieDetails: {} as IMovie,
  personDetails: {} as CastPerson,
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
  async (movieId: string, { getState }) => {
    const { auth } = getState() as RootState;

    const response = await http.get<IMovie>(
      `/movie/${movieId}?&append_to_response=credits,similar,videos,images,recommendations,external_ids,account_states`,
    );

    response.data.year = formatReleaseDate(response.data.release_date, 'yyyy');
    response.data.credits.crew = reduceCrewByDepartment(response.data.credits.crew);

    if (auth.isUserLoggedIn) {
      const movieAccountStateResponse = await http.get<MovieAccountState>(
        `/movie/${movieId}/account_states`,
      );

      response.data.isFavorite = movieAccountStateResponse.data.favorite;
      response.data.isInWatchList = movieAccountStateResponse.data.watchlist;
    }

    return response.data;
  },
);

type FetchMovieAccountStateArgs = {
  movieId: number;
  context: string;
};

export const fetchMovieAccountState = createAsyncThunk(
  'movies/FETCH_MOVIE_ACCOUNT_STATE',
  async ({ movieId, context }: FetchMovieAccountStateArgs) => {
    const movieAccountStateResponse = await http.get<MovieAccountState>(
      `/movie/${movieId}/account_states`,
    );

    return {
      movieId,
      accountState: movieAccountStateResponse.data,
      context,
    };
  },
);

export const fetchGenres = createAsyncThunk('movies/FETCH_GENRES', async () => {
  const response = await http.get('genre/movie/list');

  return response.data.genres as Genre[];
});

type AddMovieToFavoritesArgs = {
  movieId: number;
  isFavorite: boolean;
  context: string;
};

export const addMovieToFavorites = createAsyncThunk(
  'profile/ADD_TO_FAVORITES',
  async ({ movieId, isFavorite, context }: AddMovieToFavoritesArgs, { getState }) => {
    const { profile } = getState() as RootState;

    await http.post(`/account/${profile.account?.id}/favorite`, {
      media_id: movieId,
      media_type: 'movie',
      favorite: isFavorite,
    });

    return {
      movieId,
      isFavorite,
      context,
    };
  },
);

type AddMovieToWatchlistArgs = {
  movieId: number;
  isInWatchList: boolean;
  context: string;
};

export const addMovieToWatchList = createAsyncThunk(
  'profile/ADD_TO_WATCHLIST',
  async ({ movieId, isInWatchList, context }: AddMovieToWatchlistArgs, { getState }) => {
    const { profile } = getState() as RootState;

    await http.post(`/account/${profile.account?.id}/watchlist`, {
      media_id: movieId,
      media_type: 'movie',
      watchlist: isInWatchList,
    });

    return {
      movieId,
      isInWatchList,
      context,
    };
  },
);

export const fetchPersonDetails = createAsyncThunk(
  'movies/FETCH_PERSON_DETAILS',
  async (personId: number) => {
    const response = await http.get<CastPerson>(
      `/person/${personId}?append_to_response=external_ids`,
    );

    return response.data;
  },
);

type FetchDiscoverArgs = {
  genreId: number;
  page: number;
};

export const fetchDiscover = createAsyncThunk(
  'movies/FETCH_DISCOVER',
  async ({ genreId, page }: FetchDiscoverArgs) => {
    const response = await http.get<PaginableResult<IMovie[]>>(
      `/discover/movie?with_genres=${genreId}&page=${page}`,
    );

    return response.data;
  },
);

const { actions, reducer } = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovieDetails(state) {
      state.movieDetails = {} as IMovie;
    },
    setMovieDetailsBackdrop(state, action: PayloadAction<string>) {
      state.movieDetails.backdrop_path = action.payload;
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
      state.isFetchingDetails = true;
    });
    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.isFetchingDetails = false;
      state.movieDetails = action.payload;
    });

    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
    });

    builder.addCase(addMovieToFavorites.fulfilled, (state, action) => {
      const { movieId, isFavorite, context } = action.payload;

      if (context === 'movieDetails') {
        state.movieDetails.isFavorite = isFavorite;
      }

      if (context === 'topRated') {
        state.topRated.results = state.topRated.results.map((movie) => {
          if (movie.id === movieId) {
            movie.isFavorite = isFavorite;
          }

          return movie;
        });
      }
    });
    builder.addCase(addMovieToWatchList.fulfilled, (state, action) => {
      const { movieId, isInWatchList, context } = action.payload;

      if (context === 'movieDetails') {
        state.movieDetails.isInWatchList = isInWatchList;
      }

      if (context === 'topRated') {
        state.topRated.results = state.topRated.results.map((movie) => {
          if (movie.id === movieId) {
            movie.isInWatchList = isInWatchList;
          }

          return movie;
        });
      }
    });

    builder.addCase(fetchMovieAccountState.fulfilled, (state, action) => {
      const { movieId, context, accountState } = action.payload;

      if (context === 'topRated') {
        state.topRated.results = state.topRated.results.map((movie) => {
          if (movie.id === movieId) {
            movie.isFavorite = accountState.favorite;
            movie.isInWatchList = accountState.watchlist;
          }

          return movie;
        });
      }
    });

    builder.addCase(fetchPersonDetails.pending, (state) => {
      state.isFetchingDetails = true;
    });
    builder.addCase(fetchPersonDetails.fulfilled, (state, action) => {
      state.isFetchingDetails = false;
      state.personDetails = action.payload;
    });

    builder.addCase(fetchDiscover.pending, (state) => {
      state.isFetchingDetails = true;
    });
    builder.addCase(fetchDiscover.fulfilled, (state, action) => {
      state.isFetching = false;

      if (action.payload.page > 1) {
        action.payload.results = [...state.discover.results, ...action.payload.results];
      }

      state.discover = action.payload;
    });
  },
});

export const { clearMovieDetails, setMovieDetailsBackdrop } = actions;

export default reducer;
