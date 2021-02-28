import { Dispatch } from 'redux';
import { ProfileState, store } from '..';
import { http } from '../../services/http';
import { addToast, ToastData } from '../feedback';
import { ProfileActions } from './actionsTypes';

export const fetchLists = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch({
    type: ProfileActions.FetchListsRequest,
  });

  const { account } = store.getState().profile as ProfileState;

  const response = await http.get(`/account/${account?.id}/lists`);

  dispatch({
    type: ProfileActions.FetchListsSuccess,
    payload: response.data.results,
  });
};

export const addMovieToList = (movieId: number, listId: number) => async (
  dispatch: Dispatch,
): Promise<void> => {
  try {
    const { account } = store.getState().profile as ProfileState;

    dispatch({ type: ProfileActions.SetIsFetching, payload: true });

    await http.post(`/list/${listId}/add_item`, { media_id: movieId });
    const response = await http.get(`/account/${account?.id}/lists`);

    dispatch({ type: ProfileActions.SetIsFetching, payload: false });

    const toastData = {
      type: 'success',
      title: 'Adicionado!',
      message: 'O filme foi adicionado a lista.',
    } as Omit<ToastData, 'id'>;

    dispatch(addToast(toastData));

    dispatch({ type: ProfileActions.AddMovieToListSuccess });
    dispatch({
      type: ProfileActions.FetchListsSuccess,
      payload: response.data.results,
    });
  } catch (err) {
    dispatch({ type: ProfileActions.SetIsFetching, payload: false });
    dispatch({ type: ProfileActions.AddMovieToListError });

    if (err.response.data.status_code === 8) {
      const toastData = {
        type: 'error',
        title: 'Ooops!',
        message: 'Este filme já foi adicionado à esta lista.',
      } as Omit<ToastData, 'id'>;

      dispatch(addToast(toastData));
    }
  }
};

export const resetAddMovieToListSuccess = () => ({
  type: ProfileActions.ResetAddToMovieListSuccess,
});

export const addMovieToFavorites = (movieId: number, isFavorite: boolean) => async (
  dispatch: Dispatch,
) => {
  dispatch({ type: ProfileActions.SetIsFetching, payload: true });

  const accountId = (store.getState().profile as ProfileState).account?.id;

  await http.post(`/account/${accountId}/favorite`, {
    media_id: movieId,
    media_type: 'movie',
    favorite: isFavorite,
  });

  dispatch({ type: ProfileActions.SetIsFetching, payload: false });
};
