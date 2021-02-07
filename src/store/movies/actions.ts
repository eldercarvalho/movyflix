import { Dispatch } from 'redux';
import { format } from 'date-fns';
import { http } from '../../services/http';

import { MoviesActions, Movie } from './actionsTypes';

export const fetchTrendingMovies = () => async (dispatch: Dispatch): Promise<void> => {
  const response = await http.get('trending/movie/week');
  const movies = response.data.results.slice(0, 5).map((movie: Movie) => {
    const dateArr = movie.release_date?.split('-');
    const year = dateArr ? parseInt(dateArr[0]) : 0;
    const month = dateArr ? parseInt(dateArr[1]) - 1 : 0;
    const day = dateArr ? parseInt(dateArr[2]) : 0;

    movie.formatted_relese_date = format(new Date(year, month, day), 'MMMM dd, yyyy');
    return movie;
  });

  dispatch({
    type: MoviesActions.FetchTrending,
    payload: movies,
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
