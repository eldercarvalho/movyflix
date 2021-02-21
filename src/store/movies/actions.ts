import { Dispatch } from 'redux';
import { http } from '../../services/http';
import { formatReleaseDate } from '../../utils/formatReleaseDate';

import { MoviesActions, IMovie, CastPerson } from './actionsTypes';
import { initialPaginableResult } from './reducer';

const reduceCrewByDepartment = (crew: CastPerson[]) => {
  const filteredDepartments = ['Director', 'Story', 'Screenplay', 'Characters', 'Writer'];

  const reducedCrew = crew
    .filter((person) => filteredDepartments.includes(person.job))
    .reduce((acum, cur) => {
      if (acum.some((person) => person.id === cur.id)) {
        const personIndex = acum.findIndex((person) => person.id === cur.id);
        acum[personIndex].job += `, ${cur.job}`;
        return acum;
      }

      acum.push(cur);

      return acum;
    }, [] as CastPerson[]);

  return reducedCrew;
};

export const IsFetchingTrending = () => {
  return {
    type: MoviesActions.IsFetchingTrending,
  };
};

export const fetchTrendingMovies = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch(IsFetchingTrending());

  const response = await http.get('trending/movie/week');
  const movies = response.data.results.map((movie: IMovie) => {
    movie.formatted_release_date = formatReleaseDate(movie.release_date, 'MMMM dd, yyyy');
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

export const setSearchLoading = (payload: boolean) => {
  return {
    type: MoviesActions.SetSearchLoading,
    payload,
  };
};

export const searchMovies = (query: string) => async (
  dispatch: Dispatch,
): Promise<void> => {
  if (query) {
    dispatch(setSearchLoading(true));
    const response = await http.get(`search/movie?query=${query}`);

    dispatch({
      type: MoviesActions.SearchMovies,
      payload: response.data,
    });
    return;
  }

  dispatch({
    type: MoviesActions.SearchMovies,
    payload: initialPaginableResult,
  });
};

export const setIsFetchingMovieDetails = () => ({
  type: MoviesActions.SetIsFetchingMovieDetails,
});

export const fetchMovieDetails = (movieId: string) => async (
  dispatch: Dispatch,
): Promise<void> => {
  dispatch(setIsFetchingMovieDetails());
  const response = await http.get<IMovie>(
    `/movie/${movieId}?&append_to_response=credits,similar,videos,images,recommendations,external_ids`,
  );

  response.data.year = formatReleaseDate(response.data.release_date, 'yyyy');
  response.data.credits.crew = reduceCrewByDepartment(response.data.credits.crew);

  dispatch({
    type: MoviesActions.FetchMovieDetails,
    payload: response.data,
  });
};

export const clearMovieDetails = () => {
  return {
    type: MoviesActions.ClearMovieDetails,
  };
};
