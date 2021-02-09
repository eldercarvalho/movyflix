import { Dispatch } from 'redux';
import { format } from 'date-fns';
import { http } from '../../services/http';

import { MoviesActions, IMovie } from './actionsTypes';

const formatReleaseDate = (date: string): string => {
  const dateArr = date.split('-');
  const year = dateArr ? parseInt(dateArr[0]) : 0;
  const month = dateArr ? parseInt(dateArr[1]) - 1 : 0;
  const day = dateArr ? parseInt(dateArr[2]) : 0;

  return format(new Date(year, month, day), 'MMMM dd, yyyy');
};

export const fetchTrendingMovies = () => async (dispatch: Dispatch): Promise<void> => {
  const response = await http.get('trending/movie/week');
  const movies = response.data.results.map((movie: IMovie) => {
    movie.formatted_release_date = formatReleaseDate(movie.release_date);
    return movie;
  });

  dispatch({
    type: MoviesActions.FetchTrending,
    payload: movies,
  });
};

export const fetchPopularMovies = () => async (dispatch: Dispatch): Promise<void> => {
  const response = await http.get('movie/popular');

  dispatch({
    type: MoviesActions.FetchPopular,
    payload: response.data,
  });
};

export const fetchNowPlayngMovies = () => async (dispatch: Dispatch): Promise<void> => {
  const response = await http.get('movie/now_playing');

  dispatch({
    type: MoviesActions.FetchNowPlaying,
    payload: response.data,
  });
};

export const fetchUpcomingMovies = () => async (dispatch: Dispatch): Promise<void> => {
  const response = await http.get('movie/upcoming');

  dispatch({
    type: MoviesActions.FetchUpcoming,
    payload: response.data,
  });
};

export const fetchGenres = () => async (dispatch: Dispatch): Promise<void> => {
  const response = await http.get('genre/movie/list');
  dispatch({
    type: MoviesActions.FetchGenres,
    payload: response.data.genres,
  });
};

export const fetchConfigs = () => async (dispatch: Dispatch): Promise<void> => {
  const response = await http.get('configuration');
  dispatch({
    type: MoviesActions.FetchConfiguration,
    payload: response.data,
  });
};

export const searchMovies = (query: string) => async (
  dispatch: Dispatch,
): Promise<void> => {
  const response = await http.get(`search/movie?query=${query}`);

  dispatch({
    type: MoviesActions.SearchMovies,
    payload: response.data,
  });
};
